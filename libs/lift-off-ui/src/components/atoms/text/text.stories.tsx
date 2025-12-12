import { Meta, type StoryObj } from '@storybook/react';
import { Text, type TextProps } from './text';
import { StoryFn } from 'storybook/internal/types';

export default {
  title: 'Components/Atoms/Text',
  component: Text,
} as Meta<typeof Text>;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    // Add default props here
    as: 'p',
    children: 'Hello World!',
  },
  parameters: {
    docs: {
      source: {
        code: `
<Text padding={4}>
  Hello World!
</Text>
        `,
        language: 'tsx',
        type: 'auto',
      },
    },
  },
};
