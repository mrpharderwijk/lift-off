import { Meta, StoryFn } from '@storybook/react';
import { Loader, LoaderProps } from '@/components/ui/loader/loader';

export default {
  title: 'Components/Ui/Loader',
  component: Loader,
} as Meta;

const Template: StoryFn = (args: LoaderProps) => (
  <div className="relative w-32 h-32 bg-gray-800">
    <Loader {...args} />
  </div>
);

export const Small = Template.bind({});
Small.args = {
  size: 'sm',
};

export const Medium = Template.bind({});
Medium.args = {
  size: 'md',
};

export const Large = Template.bind({});
Large.args = {
  size: 'lg',
};
