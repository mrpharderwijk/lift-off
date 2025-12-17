import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-vite',
    options: {
      builder: {
        viteConfigPath: 'vite.config.mjs',
      },
    },
  },
  typescript: {
    // Enables the `react-docgen-typescript` parser.
    // See https://storybook.js.org/docs/api/main-config/main-config-typescript for more information about this option.
    reactDocgen: 'react-docgen-typescript',
  },
  async viteFinal(config) {
    // Ensure alias is configured (vite.config.mjs should already have it, but ensure it's correct)
    const path = await import('path');
    const { fileURLToPath } = await import('url');
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const packageRoot = path.resolve(__dirname, '..');
    
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(packageRoot, 'src'),
    };

    // Ensure Tailwind CSS plugin is present (it should already be in vite.config.mjs, but this ensures it)
    const plugins = config.plugins || [];
    const hasTailwind = plugins.some(
      (p) =>
        p &&
        typeof p === 'object' &&
        'name' in p &&
        p.name === '@tailwindcss/vite'
    );

    if (!hasTailwind) {
      const tailwindcss = (await import('@tailwindcss/vite')).default;
      plugins.push(tailwindcss());
      config.plugins = plugins;
    }

    return config;

    return config;
  },
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
