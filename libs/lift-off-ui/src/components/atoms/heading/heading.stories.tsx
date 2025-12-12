import { Meta, type StoryObj } from '@storybook/react';
import { Heading, type HeadingProps } from './Heading';
import { StoryFn } from 'storybook/internal/types';

export default {
  title: 'Components/Atoms/Heading',
  component: Heading,
} as Meta<typeof Heading>;

type Story = StoryObj<typeof Heading>;

const TemplateDefault: StoryFn = (args: HeadingProps) => <Heading {...args} />;

export const H1: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog',
  },
  parameters: {
    source: `
<Heading>The quick brown fox jumps over the lazy dog</Heading>
    `,
    language: 'tsx',
    type: 'auto',
  },
};

export const H2: Story = {
  args: {
    as: 'h2',
    children: 'The quick brown fox jumps over the lazy dog',
  },
  parameters: {
    source: `
<Heading as="h2">The quick brown fox jumps over the lazy dog</Heading>
    `,
    language: 'tsx',
    type: 'auto',
  },
};
