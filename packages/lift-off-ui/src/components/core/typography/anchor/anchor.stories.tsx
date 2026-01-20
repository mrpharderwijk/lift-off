import { Meta, StoryObj } from '@storybook/react';

import { Anchor } from './anchor';

export default {
  title: 'Components/Core/Typography/Anchor',
  component: Anchor,
} as Meta<typeof Anchor>;

type Story = StoryObj<typeof Anchor>;

export const Default: Story = {
  render: () => (
  <>
    The quick brown
    <Anchor href="#" data-testid="anchor">
      fox
    </Anchor>
    jumps over the lazy dog
  </>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<>
  The quick brown
  <Anchor href="#" data-testid="anchor">
    fox
  </Anchor>
  jumps over the lazy dog
</>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const SizeBaseXs: Story = {
  render: () => (
    <>
      The quick brown
      <Anchor href="#" font-size="base-xs" data-testid="anchor">
        fox
      </Anchor>
      jumps over the lazy dog
    </>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<>
  The quick brown
  <Anchor href="#" data-testid="anchor">
    fox
  </Anchor>
  jumps over the lazy dog
</>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const SizeBaseSm: Story = {
  render: () => (
    <>
      The quick brown
      <Anchor href="#" font-size="base-sm" data-testid="anchor">
        fox
      </Anchor>
      jumps over the lazy dog
    </>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<>
  The quick brown
  <Anchor href="#" font-size="base-sm" data-testid="anchor">
    fox
  </Anchor>
  jumps over the lazy dog
</>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const SizeBaseMd: Story = {
  render: () => (
    <>
      The quick brown
      <Anchor href="#" font-size="base-md" data-testid="anchor">
        fox
      </Anchor>
      jumps over the lazy dog
    </>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<>
  The quick brown
  <Anchor href="#" font-size="base-md" data-testid="anchor">
    fox
  </Anchor>
  jumps over the lazy dog
</>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const SizeBaseLg: Story = {
  render: () => (
    <>
      The quick brown
      <Anchor href="#" font-size="base-lg" data-testid="anchor">
        fox
      </Anchor>
      jumps over the lazy dog
    </>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<>
  The quick brown
  <Anchor href="#" font-size="base-lg" data-testid="anchor">
    fox
  </Anchor>
  jumps over the lazy dog
</>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const SizeBaseXl: Story = {
  render: () => (
    <>
    The quick brown
    <Anchor href="#" font-size="base-xl" data-testid="anchor">
      fox
    </Anchor>
    jumps over the lazy dog
  </>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<>
  The quick brown
<Anchor href="#" font-size="base-xl" data-testid="anchor">
    fox
  </Anchor>
  jumps over the lazy dog
</>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const ColorPrimary: Story = {
  render: () => (
    <>
      The quick brown
      <Anchor href="#" text-color="primary" data-testid="anchor">
        fox
      </Anchor>
      jumps over the lazy dog
    </>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<>
  The quick brown
  <Anchor href="#" text-color="primary" data-testid="anchor">
    fox
  </Anchor>
  jumps over the lazy dog
</>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const ColorSecondary: Story = {
  render: () => (
    <>
      The quick brown
      <Anchor href="#" text-color="secondary" data-testid="anchor">
        fox
      </Anchor>
      jumps over the lazy dog
    </>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<>
  The quick brown
  <Anchor href="#" text-color="secondary" data-testid="anchor">
    fox
  </Anchor>
  jumps over the lazy dog
</>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const ColorGray: Story = {
  render: () => (
    <>
      The quick brown
      <Anchor href="#" text-color="gray" data-testid="anchor">
        fox
      </Anchor>
      jumps over the lazy dog
    </>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<>
  The quick brown
  <Anchor href="#" text-color="gray" data-testid="anchor">
    fox
  </Anchor>
  jumps over the lazy dog
</>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const WeightNormal: Story = {
  render: () => (
    <>
      The quick brown
      <Anchor href="#" font-weight="normal" data-testid="anchor">
        fox
      </Anchor>
      jumps over the lazy dog
    </>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<>
  The quick brown
  <Anchor href="#" font-weight="normal" data-testid="anchor">
    fox
  </Anchor>
  jumps over the lazy dog
</>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const WeightMedium: Story = {
  render: () => (
    <>
      The quick brown
      <Anchor href="#" font-weight="medium" data-testid="anchor">
        fox
      </Anchor>
      jumps over the lazy dog
    </>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<>
  The quick brown
  <Anchor href="#" font-weight="medium" data-testid="anchor">
    fox
  </Anchor>
  jumps over the lazy dog
</>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const WeightSemibold: Story = {
  render: () => (
    <>
      The quick brown
      <Anchor href="#" font-weight="semibold" data-testid="anchor">
        fox
      </Anchor>
      jumps over the lazy dog
    </>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<>
  The quick brown
  <Anchor href="#" font-weight="semibold" data-testid="anchor">
    fox
  </Anchor>
  jumps over the lazy dog
</>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const WeightBold: Story = {
  render: () => (
    <>
      The quick brown
      <Anchor href="#" font-weight="bold" data-testid="anchor">
        fox
      </Anchor>
      jumps over the lazy dog
    </>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<>
  The quick brown
  <Anchor href="#" font-weight="bold" data-testid="anchor">
  fox
  </Anchor>
  jumps over the lazy dog
</>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const ExternalLink: Story = {
  render: () => (
    <>
      The quick brown
      <Anchor href="https://example.com" target="_blank" rel="noopener noreferrer" data-testid="anchor">
        External Link
      </Anchor>
      jumps over the lazy dog
    </>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<>
  The quick brown
  <Anchor href="https://example.com" target="_blank" rel="noopener noreferrer" data-testid="anchor">
    External Link
  </Anchor>
  jumps over the lazy dog
</>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const ResponsiveSize: Story = {
  render: () => (
    <>
      The quick brown
      <Anchor href="#" font-size="base-sm" font-size-md="base-md" font-size-lg="base-lg" data-testid="anchor">
        fox
      </Anchor>
    jumps over the lazy dog
  </>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<>
  The quick brown
  <Anchor href="#" font-size="base-sm" font-size-md="base-md" font-size-lg="base-lg" data-testid="anchor">
  fox
  </Anchor>
  jumps over the lazy dog
</>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const ResponsiveWeight: Story = {
  render: () => (
    <>
      The quick brown
      <Anchor href="#" font-weight="normal" font-weight-md="medium" font-weight-lg="semibold" data-testid="anchor">
        fox
      </Anchor>
      jumps over the lazy dog
    </>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<>
  The quick brown
  <Anchor href="#" font-weight="normal" font-weight-md="medium" font-weight-lg="semibold" data-testid="anchor">
    fox
  </Anchor>
  jumps over the lazy dog
</>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};
