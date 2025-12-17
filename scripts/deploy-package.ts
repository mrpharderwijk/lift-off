#!/usr/bin/env node

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { config } from 'dotenv';

// Load environment variables from .env file
config();

const PACKAGE_DIR = path.join(__dirname, '../packages/lift-off-ui');
const DIST_DIR = path.join(__dirname, '../dist/packages/lift-off-ui');
const PACKAGE_JSON_PATH = path.join(PACKAGE_DIR, 'package.json');
const DIST_PACKAGE_JSON_PATH = path.join(DIST_DIR, 'package.json');

type VersionType = 'patch' | 'minor' | 'major';

// Get version bump type from command line argument
const versionType: VersionType = (process.argv[2] as VersionType) || 'minor'; // default to minor

// Validate version type
const validVersionTypes: VersionType[] = ['patch', 'minor', 'major'];
if (!validVersionTypes.includes(versionType)) {
  console.error(`❌ Invalid version type: ${versionType}`);
  console.error(`   Valid types: ${validVersionTypes.join(', ')}`);
  process.exit(1);
}

console.log('🚀 Starting manual deployment...\n');

// Check for GITHUB_TOKEN or NODE_AUTH_TOKEN early
// This prevents Yarn from failing when parsing .npmrc with ${GITHUB_TOKEN}
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

interface PackageJson {
  version: string;
  [key: string]: unknown;
}

try {
  // Step 1: Build the library
  console.log('📦 Building library...');
  execSync('npx nx build lift-off-ui', {
    stdio: 'inherit',
    cwd: path.join(__dirname, '..'),
  });
  console.log('✅ Build completed\n');

  // Step 2: Check if dist directory exists
  if (!fs.existsSync(DIST_DIR)) {
    console.error(`❌ Build output directory not found: ${DIST_DIR}`);
    process.exit(1);
  }

  // Step 3: Read current package.json
  const packageJson: PackageJson = JSON.parse(
    fs.readFileSync(PACKAGE_JSON_PATH, 'utf8')
  );
  const currentVersion = packageJson.version;
  console.log(`📋 Current version: ${currentVersion}`);

  // Step 4: Bump version
  console.log(`🔢 Bumping ${versionType} version...`);
  execSync(`npm version ${versionType} --no-git-tag-version`, {
    stdio: 'inherit',
    cwd: PACKAGE_DIR,
  });

  // Read the new version
  const updatedPackageJson: PackageJson = JSON.parse(
    fs.readFileSync(PACKAGE_JSON_PATH, 'utf8')
  );
  const newVersion = updatedPackageJson.version;
  console.log(`✅ Version bumped to: ${newVersion}\n`);

  // Step 5: Copy package.json and README to dist
  console.log('📋 Copying package.json and README to dist...');
  fs.copyFileSync(PACKAGE_JSON_PATH, DIST_PACKAGE_JSON_PATH);

  const readmePath = path.join(PACKAGE_DIR, 'README.md');
  const distReadmePath = path.join(DIST_DIR, 'README.md');
  if (fs.existsSync(readmePath)) {
    fs.copyFileSync(readmePath, distReadmePath);
    console.log('✅ Files copied\n');
  } else {
    console.log('⚠️  README.md not found, skipping\n');
  }

  // Step 6: Create .npmrc in dist directory for publishing
  console.log('🔐 Setting up authentication...');
  const distNpmrcPath = path.join(DIST_DIR, '.npmrc');
  const npmrcContent = `@mrpharderwijk:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${token}
`;
  fs.writeFileSync(distNpmrcPath, npmrcContent);
  console.log('✅ Authentication configured\n');

  // Step 7: Publish to GitHub Packages
  console.log('📤 Publishing to GitHub Packages...');
  execSync('npm publish', {
    stdio: 'inherit',
    cwd: DIST_DIR,
  });

  // Clean up .npmrc after publishing (optional, for security)
  if (fs.existsSync(distNpmrcPath)) {
    fs.unlinkSync(distNpmrcPath);
  }

  console.log(
    `\n✅ Successfully published @mrpharderwijk/lift-off-ui@${newVersion} to GitHub Packages!`
  );
  console.log(`\n💡 To install in other projects:`);
  console.log(`   npm install @mrpharderwijk/lift-off-ui@${newVersion}`);
  console.log(`   or`);
  console.log(`   yarn add @mrpharderwijk/lift-off-ui@${newVersion}`);
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.error('\n❌ Deployment failed:', errorMessage);
  process.exit(1);
}
