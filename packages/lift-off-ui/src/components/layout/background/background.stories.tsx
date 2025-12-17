import { Meta, StoryFn } from '@storybook/react';
import { Background, BackgroundProps } from './background';

export default {
  title: 'Components/Layout/Background',
  component: Background,
} as Meta;

const backgroundVariants = [
  { 'bg-color': 'primary' as BackgroundProps['bg-color'] },
  { 'bg-color': 'secondary' as BackgroundProps['bg-color'] },
];

const OverviewTemplate: StoryFn<BackgroundProps> = (args) => (
  <div className="space-y-4">
    {backgroundVariants.map((variant, i) => (
      <Background key={i} {...args} {...variant}>
        <div className="p-6 text-base">Background</div>
      </Background>
    ))}
  </div>
);

export const Overview = OverviewTemplate.bind({});
Overview.args = {};

const Template: StoryFn<BackgroundProps> = (args) => (
  <Background {...args}>
    <div className="p-6">Content inside Background</div>
  </Background>
);

export const WithPrimaryColor = Template.bind({});
WithPrimaryColor.args = {
  'bg-color': 'primary',
  children: 'Primary background',
};

export const WithSecondaryColor = Template.bind({});
WithSecondaryColor.args = {
  'bg-color': 'secondary',
  children: 'Secondary background',
};
