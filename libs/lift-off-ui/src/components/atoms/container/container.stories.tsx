import { Meta, StoryFn } from '@storybook/react';
import { Container, type ContainerProps } from './container';
import { MarginBox } from '../../../../.storybook/components/margin-box';
import { Rectangle } from '../../../../.storybook/components/rectangle';
import { BorderBox } from '../../../../.storybook/components/border-box';
import { Box } from '../box/box';

export default {
  title: 'Components/Atoms/Container',
  component: Container,
} as Meta;

const Template: StoryFn = (args: ContainerProps) => (
  <MarginBox position="relative">
    <Container {...args} />
  </MarginBox>
);

export const FullWidthMobileConstrained = Template.bind({});
FullWidthMobileConstrained.args = {
  as: 'div',
  mobileFullWidth: true,
  children: (
    <Rectangle>
      <Box height={80}>
        <BorderBox />
      </Box>
    </Rectangle>
  ),
};

export const Constrained = Template.bind({});
Constrained.args = {
  as: 'div',
  children: (
    <Rectangle>
      <Box height={80}>
        <BorderBox />
      </Box>
    </Rectangle>
  ),
};

export const FullWidthMobileConstrainedBreakpoint = Template.bind({});
FullWidthMobileConstrainedBreakpoint.args = {
  as: 'div',
  mobileFullWidth: true,
  constrainBreakpoint: true,
  children: (
    <Rectangle>
      <Box height={80}>
        <BorderBox />
      </Box>
    </Rectangle>
  ),
};

export const ConstrainedBreakpoint = Template.bind({});
ConstrainedBreakpoint.args = {
  as: 'div',
  mobileFullWidth: true,
  constrainBreakpoint: true,
  children: (
    <Rectangle>
      <Box height={80}>
        <BorderBox />
      </Box>
    </Rectangle>
  ),
};
