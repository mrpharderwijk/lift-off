import { Meta, type StoryObj } from '@storybook/react';

import { FlexBox } from '../../layout/flex-box/flex-box';
import { FlexBoxItem } from '../../layout/flex-box/flex-box-item/flex-box-item';
import { Heading, LikeEnumValues, type HeadingProps } from './heading';

export default {
  title: 'Components/Typography/Heading',
  component: Heading,
} as Meta<typeof Heading>;

type Story = StoryObj<typeof Heading>;

const defaultText = 'The quick brown fox jumps over the lazy dog';

export const Overview: Story = {
  render: () => {
    return (
      <FlexBox flex-direction="col">
        {LikeEnumValues.map((like, index) => (
          <FlexBoxItem>
            <Heading key={index} like={like as HeadingProps['like']}>
              {defaultText}
            </Heading>
          </FlexBoxItem>
        ))}
      </FlexBox>
    );
  },
};

export const H1: Story = {
  args: {
    children: defaultText,
  },
  parameters: {
    source: `
<Heading>${defaultText}</Heading>
// or
<Heading as='h1'>${defaultText}</Heading>
    `,
    language: 'tsx',
    type: 'auto',
  },
};

export const H2: Story = {
  args: {
    tag: 'h2',
    children: defaultText,
  },
  parameters: {
    source: `
<Heading tag="h2">${defaultText}</Heading>
    `,
    language: 'tsx',
    type: 'auto',
  },
};

export const H3: Story = {
  args: {
    tag: 'h3',
    children: defaultText,
  },
  parameters: {
    source: `
<Heading tag="h3">${defaultText}</Heading>
    `,
    language: 'tsx',
    type: 'auto',
  },
};

export const H4: Story = {
  args: {
    tag: 'h4',
    children: defaultText,
  },
  parameters: {
    source: `
<Heading tag="h4">${defaultText}</Heading>
    `,
    language: 'tsx',
    type: 'auto',
  },
};

export const H5: Story = {
  args: {
    tag: 'h5',
    children: defaultText,
  },
  parameters: {
    source: `
<Heading tag="h5">${defaultText}</Heading>
    `,
    language: 'tsx',
    type: 'auto',
  },
};

export const H6: Story = {
  args: {
    tag: 'h6',
    children: defaultText,
  },
  parameters: {
    source: `
<Heading tag="h6">${defaultText}</Heading>
    `,
    language: 'tsx',
    type: 'auto',
  },
};
