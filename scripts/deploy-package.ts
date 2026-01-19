#!/usr/bin/env node

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import * as readline from 'readline';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

type VersionType = 'patch' | 'minor' | 'major';

interface ProjectJson {
  name: string;
  [key: string]: unknown;
}

interface PackageJson {
  version: string;
  name: string;
  [key: string]: unknown;
}

interface PackageInfo {
  projectName: string;
  packageDir: string;
  distDir: string;
  packageJsonPath: string;
  distPackageJsonPath: string;
}

// Parse command line arguments
function parseArgs(): { version: VersionType | null; package: string } {
  const args = process.argv.slice(2);
  let version: VersionType | null = null;
  let packageName = '';

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--version' && args[i + 1]) {
      version = args[i + 1] as VersionType;
      i++;
    } else if (args[i] === '--package' && args[i + 1]) {
      packageName = args[i + 1];
      i++;
    }
  }

  return { version, package: packageName };
}

// Prompt user for version type
async function promptVersionType(): Promise<VersionType> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(
      'Select version type (patch/minor/major) [default: patch]: ',
      (answer) => {
        rl.close();
        const trimmed = answer.trim().toLowerCase();
        if (trimmed === '' || trimmed === 'patch') {
          resolve('patch');
        } else if (trimmed === 'minor') {
          resolve('minor');
        } else if (trimmed === 'major') {
          resolve('major');
        } else {
          console.log('⚠️  Invalid choice, defaulting to patch');
          resolve('patch');
        }
      }
    );
  });
}

// Discover all packages by scanning packages directory
function discoverPackages(): Map<string, PackageInfo> {
  const packagesDir = path.join(__dirname, '../packages');
  const packages = new Map<string, PackageInfo>();

  if (!fs.existsSync(packagesDir)) {
    return packages;
  }

  const entries = fs.readdirSync(packagesDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const projectJsonPath = path.join(
        packagesDir,
        entry.name,
        'project.json'
      );

      if (fs.existsSync(projectJsonPath)) {
        try {
          const projectJson: ProjectJson = JSON.parse(
            fs.readFileSync(projectJsonPath, 'utf8')
          );
          const projectName = projectJson.name;

          const packageDir = path.join(packagesDir, entry.name);
          const distDir = path.join(__dirname, '../dist/packages', entry.name);
          const packageJsonPath = path.join(packageDir, 'package.json');
          const distPackageJsonPath = path.join(distDir, 'package.json');

          packages.set(projectName, {
            projectName,
            packageDir,
            distDir,
            packageJsonPath,
            distPackageJsonPath,
          });
        } catch (error) {
          console.warn(
            `⚠️  Failed to parse project.json for ${entry.name}:`,
            error
          );
        }
      }
    }
  }

  return packages;
}

// Extract registry scope from package name (e.g., @scope/package -> @scope)
function getRegistryScope(packageName: string): string {
  if (packageName.startsWith('@')) {
    const scope = packageName.split('/')[0];
    return scope;
  }
  // Default scope if package doesn't have one
  return '@lift-off';
}

// Deploy a single package
function deployPackage(
  packageInfo: PackageInfo,
  versionType: VersionType,
  token: string
): void {
  const {
    projectName,
    packageDir,
    distDir,
    packageJsonPath,
    distPackageJsonPath,
  } = packageInfo;

  console.log(`\n📦 Deploying ${projectName}...\n`);

  // Step 1: Build the library
  console.log(`📦 Building ${projectName}...`);
  execSync(`npx nx build ${projectName}`, {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
  });
  console.log(`✅ Build completed for ${projectName}\n`);

  // Step 2: Check if dist directory exists
  if (!fs.existsSync(distDir)) {
    throw new Error(`Build output directory not found: ${distDir}`);
  }

  // Step 3: Read current package.json
  const packageJson: PackageJson = JSON.parse(
    fs.readFileSync(packageJsonPath, 'utf8')
  );
  const currentVersion = packageJson.version;
  const packageName = packageJson.name;
  console.log(`📋 Current version: ${currentVersion}`);

  // Step 4: Bump version
  console.log(`🔢 Bumping ${versionType} version...`);
  execSync(`npm version ${versionType} --no-git-tag-version`, {
    stdio: 'inherit',
    cwd: packageDir,
  });

  // Read the new version
  const updatedPackageJson: PackageJson = JSON.parse(
    fs.readFileSync(packageJsonPath, 'utf8')
  );
  const newVersion = updatedPackageJson.version;
  console.log(`✅ Version bumped to: ${newVersion}\n`);

  // Step 5: Copy package.json and README to dist
  console.log('📋 Copying package.json and README to dist...');
  fs.copyFileSync(packageJsonPath, distPackageJsonPath);

  const readmePath = path.join(packageDir, 'README.md');
  const distReadmePath = path.join(distDir, 'README.md');
  if (fs.existsSync(readmePath)) {
    fs.copyFileSync(readmePath, distReadmePath);
    console.log('✅ Files copied\n');
  } else {
    console.log('⚠️  README.md not found, skipping\n');
  }

  // Step 6: Create .npmrc in dist directory for publishing
  console.log('🔐 Setting up authentication...');
  const distNpmrcPath = path.join(distDir, '.npmrc');
  const registryScope = getRegistryScope(packageName);
  const npmrcContent = `${registryScope}:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${token}
`;
  fs.writeFileSync(distNpmrcPath, npmrcContent);
  console.log('✅ Authentication configured\n');

  // Step 7: Publish to GitHub Packages
  console.log('📤 Publishing to GitHub Packages...');
  execSync('npm publish', {
    stdio: 'inherit',
    cwd: distDir,
  });

  // Clean up .npmrc after publishing (optional, for security)
  if (fs.existsSync(distNpmrcPath)) {
    fs.unlinkSync(distNpmrcPath);
  }

  console.log(
    `\n✅ Successfully published ${packageName}@${newVersion} to GitHub Packages!`
  );
  console.log(`\n💡 To install in other projects:`);
  console.log(`   npm install ${packageName}@${newVersion}`);
  console.log(`   or`);
  console.log(`   yarn add ${packageName}@${newVersion}`);
}

// Main execution
async function main() {
  const { version: versionArg, package: packageArg } = parseArgs();

  // Prompt for version if not provided
  let version: VersionType;
  if (versionArg === null || versionArg === undefined) {
    version = await promptVersionType();
  } else {
    version = versionArg;
  }

  // Validate version type
  const validVersionTypes: VersionType[] = ['patch', 'minor', 'major'];
  if (!validVersionTypes.includes(version)) {
    console.error(`❌ Invalid version type: ${version}`);
    console.error(`   Valid types: ${validVersionTypes.join(', ')}`);
    process.exit(1);
  }

  // Check for GITHUB_TOKEN or NODE_AUTH_TOKEN early
  const token = process.env.GITHUB_TOKEN || process.env.NODE_AUTH_TOKEN;
  if (!token) {
    console.error('❌ No authentication token found!');
    console.error(
      '   Please set GITHUB_TOKEN or NODE_AUTH_TOKEN environment variable'
    );
    console.error('   Example: export GITHUB_TOKEN=your_token_here');
    console.error('   Or add it to a .env file in the project root');
    console.error('\n   Note: If you have .npmrc with ${GITHUB_TOKEN},');
    console.error('   make sure to set the token before running this command.');
    process.exit(1);
  }

  // Discover all available packages
  const availablePackages = discoverPackages();

  if (availablePackages.size === 0) {
    console.error('❌ No packages found in packages directory');
    process.exit(1);
  }

  // Display available packages
  const packageNames = Array.from(availablePackages.keys());
  console.log('📋 Available packages:', packageNames.join(', '));
  console.log('');

  // Determine which packages to deploy
  let packagesToDeploy: PackageInfo[] = [];

  if (!packageArg) {
    console.error('❌ --package flag is required');
    console.error(`   Available options: ${packageNames.join(', ')}, all`);
    console.error(
      `   Example: ts-node --project scripts/tsconfig.json scripts/deploy-package.ts --version ${version} --package ${packageNames[0]}`
    );
    process.exit(1);
  }

  if (packageArg === 'all') {
    packagesToDeploy = Array.from(availablePackages.values());
    console.log(`🚀 Deploying all packages (${packagesToDeploy.length})...\n`);
  } else {
    const packageInfo = availablePackages.get(packageArg);
    if (!packageInfo) {
      console.error(`❌ Package "${packageArg}" not found`);
      console.error(`   Available packages: ${packageNames.join(', ')}, all`);
      process.exit(1);
    }
    packagesToDeploy = [packageInfo];
    console.log(`🚀 Starting deployment for ${packageArg}...\n`);
  }

  // Deploy packages
  try {
    for (const packageInfo of packagesToDeploy) {
      deployPackage(packageInfo, version, token);
    }

    if (packagesToDeploy.length > 1) {
      console.log(
        `\n🎉 Successfully deployed ${packagesToDeploy.length} packages!`
      );
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('\n❌ Deployment failed:', errorMessage);
    process.exit(1);
  }
}

// Run main function
main().catch((error) => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
