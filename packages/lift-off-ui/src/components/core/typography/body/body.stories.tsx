import { Meta, StoryObj } from '@storybook/react';

import { Body } from './body';

export default {
  title: 'Components/Core/Typography/Body',
  component: Body,
} as Meta<typeof Body>;

type Story = StoryObj<typeof Body>;

const defaultText = 'The quick brown fox jumps over the lazy dog';

export const Default: Story = {
  render: () => (
    <Body data-testid="body">
      {defaultText}
    </Body>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Body>
  ${defaultText}
</Body>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const SizeBaseXs: Story = {
  render: () => (
    <Body size="base-xs" data-testid="body">
      {defaultText}
    </Body>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Body size="base-xs">
  ${defaultText}
</Body>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const SizeBaseSm: Story = {
  render: () => (
    <Body size="base-sm" data-testid="body">
      {defaultText}
    </Body>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Body size="base-sm">
  ${defaultText}
</Body>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const SizeBaseMd: Story = {
  render: () => (
    <Body size="base-md" data-testid="body">
      {defaultText}
    </Body>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Body size="base-md">
  ${defaultText}
</Body>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const SizeBaseLg: Story = {
  render: () => (
    <Body size="base-lg" data-testid="body">
      {defaultText}
    </Body>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Body size="base-lg">
  ${defaultText}
</Body>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const SizeBaseXl: Story = {
  render: () => (
    <Body size="base-xl" data-testid="body">
      {defaultText}
    </Body>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Body size="base-xl">
  ${defaultText}
</Body>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const ColorPrimary: Story = {
  render: () => (
    <Body color="primary" data-testid="body">
      {defaultText}
    </Body>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Body color="primary">
  ${defaultText}
</Body>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const ColorSecondary: Story = {
  render: () => (
    <Body color="secondary" data-testid="body">
      {defaultText}
    </Body>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Body color="secondary">
  ${defaultText}
</Body>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const ColorGray: Story = {
  render: () => (
    <Body color="gray" data-testid="body">
      {defaultText}
    </Body>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Body color="gray">
  ${defaultText}
</Body>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const WeightNormal: Story = {
  render: () => (
    <Body font-weight="normal" data-testid="body">
      {defaultText}
    </Body>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Body weight="normal">
  ${defaultText}
</Body>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const WeightMedium: Story = {
  render: () => (
    <Body font-weight="medium" data-testid="body">
      {defaultText}
    </Body>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Body weight="medium">
  ${defaultText}
</Body>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const WeightSemibold: Story = {
  render: () => (
    <Body font-weight="semibold" data-testid="body">
      {defaultText}
    </Body>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Body weight="semibold">
  ${defaultText}
</Body>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const WeightBold: Story = {
  render: () => (
    <Body font-weight="bold" data-testid="body">
      {defaultText}
    </Body>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Body weight="bold">
  ${defaultText}
</Body>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const CustomTag: Story = {
  render: () => (
    <Body tag="span" data-testid="body">
      {defaultText}
    </Body>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Body tag="span">
  ${defaultText}
</Body>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const ResponsiveSize: Story = {
  render: () => (
    <Body size="base-sm" size-md="base-md" size-lg="base-lg" data-testid="body">
      {defaultText}
    </Body>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Body size="base-sm" size-md="base-md" size-lg="base-lg">
  ${defaultText}
</Body>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const ResponsiveWeight: Story = {
  render: () => (
    <Body font-weight="normal" font-weight-md="medium" font-weight-lg="semibold" data-testid="body">
      {defaultText}
    </Body>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Body weight="normal" weight-md="medium" weight-lg="semibold">
  ${defaultText}
</Body>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};
