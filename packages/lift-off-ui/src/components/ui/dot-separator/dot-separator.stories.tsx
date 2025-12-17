import { Meta, StoryFn } from '@storybook/react';
import { DotSeparator } from '@/components/ui/dot-separator/dot-separator';

export default {
  title: 'Components/Ui/DotSeparator',
  component: DotSeparator,
} as Meta;

const Template: StoryFn = () => {
  return (
    <div className="flex items-center gap-2">
      I'm a dot separator. As <DotSeparator /> you <DotSeparator /> can{' '}
      <DotSeparator /> see <DotSeparator />.
    </div>
  );
};

export const Default = Template.bind({});
