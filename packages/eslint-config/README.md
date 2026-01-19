# @mrpharderwijk/eslint-config

Base ESLint configuration using flat config format for TypeScript/JavaScript projects.

## Installation

This package is published to GitHub Packages. Follow the setup guide below to install and configure it in your project.

## Peer Dependencies

This package requires the following peer dependencies:

- `eslint` (^9.0.0)

## Step-by-Step Setup Guide

### Step 1: Configure GitHub Packages Authentication

Since this package is published to GitHub Packages, you need to authenticate with npm to install it.

#### Option A: Using .npmrc file (Recommended)

Create or update a `.npmrc` file in your project root with the following content:

```
@mrpharderwijk:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

Then set the `GITHUB_TOKEN` environment variable with a GitHub Personal Access Token that has `read:packages` permission:

```bash
export GITHUB_TOKEN=your_github_token_here
```

#### Option B: Using npm login

Alternatively, you can authenticate using npm:

```bash
npm login --scope=@mrpharderwijk --registry=https://npm.pkg.github.com
```

You'll be prompted for:

- Username: Your GitHub username
- Password: Your GitHub Personal Access Token (not your GitHub password)
- Email: Your GitHub email

### Step 2: Install the Package

Install the package as a dev dependency:

```bash
npm install --save-dev @mrpharderwijk/eslint-config
# or
yarn add --dev @mrpharderwijk/eslint-config
# or
pnpm add -D @mrpharderwijk/eslint-config
```

### Step 3: Create ESLint Configuration File

Create an ESLint configuration file in your project root. The file name depends on your project's module system:

#### For ES Modules (ESM) Projects

If your `package.json` has `"type": "module"` or you're using `.mjs` files, create `eslint.config.mjs`:

```javascript
import eslintConfig from "@mrpharderwijk/eslint-config";

export default eslintConfig;
```

#### For CommonJS Projects

If you're using CommonJS, create `eslint.config.js`:

```javascript
const eslintConfig = require("@mrpharderwijk/eslint-config");

module.exports = eslintConfig;
```

**Note:** Since this package uses ES modules, you may need to use dynamic import in CommonJS projects:

```javascript
// eslint.config.js
module.exports = async () => {
  const eslintConfig = await import("@mrpharderwijk/eslint-config");
  return eslintConfig.default;
};
```

### Step 4: Extend with Your Own Configuration (Optional)

You can extend the base configuration by spreading it and adding your own rules:

```javascript
// eslint.config.mjs (ESM)
import eslintConfig from "@mrpharderwijk/eslint-config";

export default [
  ...eslintConfig,
  {
    rules: {
      // Your custom rules here
      "no-console": "warn",
    },
  },
];
```

### Step 5: Add Framework-Specific Configuration (Optional)

#### For TypeScript Projects

```javascript
// eslint.config.mjs
import eslintConfig from "@mrpharderwijk/eslint-config";
import tseslint from "typescript-eslint";

export default [
  ...eslintConfig,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/explicit-function-return-type": "warn",
    },
  },
];
```

#### For Next.js Projects

```javascript
// eslint.config.mjs
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import { fixupConfigRules } from "@eslint/compat";
import eslintConfig from "@mrpharderwijk/eslint-config";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default [...eslintConfig, ...fixupConfigRules(compat.extends("next")), ...fixupConfigRules(compat.extends("next/core-web-vitals")), { ignores: [".next/**/*"] }];
```

#### For React Projects

```javascript
// eslint.config.mjs
import eslintConfig from "@mrpharderwijk/eslint-config";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";

export default [
  ...eslintConfig,
  {
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
    },
  },
];
```

### Step 6: Verify the Setup

Test that ESLint is working correctly:

```bash
npx eslint --version
npx eslint . --ext .js,.jsx,.ts,.tsx
```

Or run it on a specific file:

```bash
npx eslint src/index.ts
```

### Step 7: Configure VS Code Settings (Recommended)

To ensure VS Code formats your code correctly using ESLint (which includes Prettier rules), you can extend the recommended settings from this package.

Create or update `.vscode/settings.json` in your project root:

```json
{
  "eslint.enable": true,
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[javascript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "[typescript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  }
}
```

**Why use ESLint as the formatter?**

This configuration uses ESLint as the formatter (instead of Prettier directly) because:

- It ensures formatting matches your ESLint Prettier rules (single quotes, no semicolons, etc.)
- It prevents conflicts between Prettier extension and ESLint Prettier rules
- It automatically fixes ESLint issues on save, including formatting

You can extend these settings with your own preferences. For example, if you want to keep Prettier for other file types:

```json
{
  "eslint.enable": true,
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "[typescript]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "dbaeumer.vscode-eslint"
  }
}
```

**Note:** Make sure you have the [ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) installed in VS Code.

### Step 8: Add Scripts to package.json (Optional)

Add ESLint scripts to your `package.json` for convenience:

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

Then run:

```bash
npm run lint
npm run lint:fix
```

## Usage

Create an `eslint.config.js` (or `eslint.config.mjs` for ESM) file in your project root:

```javascript
import eslintConfig from "@mrpharderwijk/eslint-config";

export default eslintConfig;
```

### Extending the Configuration

You can extend the base configuration by spreading it and adding your own rules:

```javascript
import eslintConfig from "@mrpharderwijk/eslint-config";

export default [
  ...eslintConfig,
  {
    rules: {
      // Your custom rules here
      "no-console": "warn",
    },
  },
];
```

### TypeScript Projects

For TypeScript projects, you may want to add TypeScript-specific rules:

```javascript
import eslintConfig from "@mrpharderwijk/eslint-config";
import tseslint from "typescript-eslint";

export default [
  ...eslintConfig,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/explicit-function-return-type": "warn",
    },
  },
];
```

## Included Plugins

This configuration includes:

- `@eslint/js` - ESLint's recommended rules
- `eslint-config-prettier` - Disables ESLint rules that conflict with Prettier
- `eslint-plugin-prettier` - Runs Prettier as an ESLint rule
- `eslint-plugin-simple-import-sort` - Automatically sorts imports
- `eslint-plugin-unused-imports` - Finds and removes unused imports

## Configuration Details

### Prettier Integration

The configuration includes Prettier with the following settings:

- `trailingComma: 'all'`
- `tabWidth: 2`
- `useTabs: false`
- `semi: false`
- `singleQuote: true`
- `endOfLine: 'auto'`

### Import Sorting

Imports are automatically sorted with the following groups:

1. External dependencies (packages starting with `\w` or `@\w`)
2. Local dependencies (relative imports `../` and `./`)
3. CSS modules (always last)

### Unused Imports

The configuration automatically removes unused imports and warns about unused variables. Variables and arguments starting with `_` are ignored.

## License

MIT
