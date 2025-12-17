import { Meta, StoryFn } from '@storybook/react';
import { DotLoader } from '@/components/ui/dot-loader/dot-loader';
import { DotLoaderProps } from './dot-loader';

export default {
  title: 'Components/Ui/DotLoader',
  component: DotLoader,
} as Meta;

const Template: StoryFn = (args: DotLoaderProps) => <DotLoader {...args} />;

export const Small = Template.bind({});
Small.args = {
  size: 'sm',
  color: 'black',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'md',
  color: 'black',
};

export const Large = Template.bind({});
Large.args = {
  size: 'lg',
  color: 'black',
};
