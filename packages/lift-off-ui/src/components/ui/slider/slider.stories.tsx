import { Meta, StoryFn } from '@storybook/react';
import { Slider } from './slider';

export default {
  title: 'Components/Ui/Slider',
  component: Slider,
} as Meta;

const TemplateRow: StoryFn = (args) => <Slider />;

export const SliderDefault = TemplateRow.bind({});
