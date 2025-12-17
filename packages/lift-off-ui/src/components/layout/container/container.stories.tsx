import { Meta, StoryObj } from '@storybook/react';

import { Container } from './container';

import { BorderBox } from '../../../../.storybook/components/border-box';
import { PaddingBox } from '../../../../.storybook/components/padding-box';
import { Rectangle } from '../../../../.storybook/components/rectangle';

export default {
  title: 'Components/Layout/Container',
  component: Container,
} as Meta<typeof Container>;

type Story = StoryObj<typeof Container>;

export const Default: Story = {
  render: () => (
    <Container data-testid="container">
      <PaddingBox />
      <Rectangle>
        <span className="relative">Hello, World!</span>
      </Rectangle>
    </Container>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Container>
  Hello, World!
</Container>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const Padding: Story = {
  render: () => (
    <Container data-testid="container" padding>
      <PaddingBox />
      <Rectangle>
        <span className="relative">Container with Padding</span>
      </Rectangle>
    </Container>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Container padding>
  Container with Padding
</Container>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const NoPadding: Story = {
  render: () => (
    <Container padding={false}>
      <Rectangle>
        <span className="relative">No Padding</span>
      </Rectangle>
    </Container>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Container padding={false}>
  No Padding
</Container>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const FullWidth: Story = {
  render: () => (
    <Container fullWidth>
      <Rectangle>
        <span className="relative">Full Width Container</span>
      </Rectangle>
    </Container>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Container fullWidth>
  Full Width Container
</Container>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const NarrowSmall: Story = {
  render: () => (
    <Container narrow="sm">
      <Rectangle>
        <span className="relative">Narrow Container</span>
      </Rectangle>
    </Container>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Container narrow>
  Narrow Container
</Container>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const FullHeight: Story = {
  render: () => (
    <Container bg-color="danger" fullHeight min-height={500}>
      <Rectangle>
        <span className="relative">Full Height Container</span>
      </Rectangle>
    </Container>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Container fullHeight>
  Full Height Container
</Container>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const CenterContent: Story = {
  render: () => (
    <Container center bg-color="primary" min-height={500}>
      <Rectangle>
        <span className="relative">Center Content</span>
      </Rectangle>
    </Container>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Container center>
  Center Content
</Container>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};

export const CustomTag: Story = {
  render: () => (
    <Container tag="section" padding>
      <BorderBox />
      <span className="relative">Section Tag</span>
    </Container>
  ),
  parameters: {
    docs: {
      source: {
        code: `
<Container tag="section" padding>
  Section Tag
</Container>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};
