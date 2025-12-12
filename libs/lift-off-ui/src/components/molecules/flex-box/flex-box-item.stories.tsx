import { Meta, StoryFn } from '@storybook/react';
import { FlexBox } from './flex-box';
import { BorderBox } from '../../../../.storybook/components/border-box';
import { Rectangle } from '../../../../.storybook/components/rectangle';
import { MarginBox } from '../../../../.storybook/components/margin-box';
import { Box } from '../../atoms/box/box';
import { FlexBoxItem, FlexBoxItemProps } from './flex-box-item';
import { flexBasisVariants } from '../../../utils/variants/flex-box/flex-basis';

const flexBasisArgTypes = Object.keys(flexBasisVariants).reduce(
  (accVariant, currVariant) => {
    return {
      ...accVariant,
      [currVariant]: {
        control: 'select',
        options: Object.keys(
          flexBasisVariants[currVariant as keyof typeof flexBasisVariants]
        ),
      },
    };
  },
  {}
);

export default {
  title: 'Components/Molecules/FlexBoxItem',
  component: FlexBoxItem,
  argTypes: {
    ...flexBasisArgTypes,
  },
} as Meta;

const TemplateRow: StoryFn = (args: FlexBoxItemProps) => (
  <BorderBox position="relative">
    <MarginBox />
    <FlexBox gap={4} padding={4}>
      <FlexBox.Item {...args}>
        <Rectangle>
          <Box padding={4}>
            <BorderBox
              position="absolute"
              top={0}
              right={0}
              bottom={0}
              left={0}
              zIndex={10}
            />
            <Box position="relative" zIndex={30}>
              <FlexBox justifyContent="around" gap={4}>
                <FlexBox.Item>FlexBox.Item</FlexBox.Item>
                <FlexBox.Item>
                  <dl>
                    <dt>FlexBasis:</dt>
                    <dd>{args.flex}</dd>
                  </dl>
                </FlexBox.Item>
              </FlexBox>
            </Box>
          </Box>
        </Rectangle>
      </FlexBox.Item>
      <FlexBox.Item {...args}>
        <Rectangle>
          <Box padding={4}>
            <BorderBox
              position="absolute"
              top={0}
              right={0}
              bottom={0}
              left={0}
              zIndex={10}
            />
            <Box position="relative" zIndex={30}>
              <FlexBox flexDirection="col" justifyContent="around" gap={4}>
                <FlexBox.Item>FlexBox.Item</FlexBox.Item>
                <FlexBox.Item>
                  <dl className="flex gap-4">
                    <dt>FlexBasis:</dt>
                    <dd>{args.flex}</dd>
                  </dl>
                </FlexBox.Item>
              </FlexBox>
            </Box>
          </Box>
        </Rectangle>
      </FlexBox.Item>
    </FlexBox>
  </BorderBox>
);

export const FlexBoxRowItems = TemplateRow.bind({});
FlexBoxRowItems.parameters = {
  docs: {
    source: {
      code: `
<FlexBox gap={4} padding={4}>
  <FlexBox.Item flex="initial" padding={4} position="relative">
    Hello
  </FlexBox.Item>
  <FlexBox.Item flex="auto" padding={4}>
    World!
  </FlexBox.Item>
</FlexBox>
      `,
      language: 'tsx',
      type: 'auto',
    },
  },
};
FlexBoxRowItems.args = {
  flex: 'initial',
};

const TemplateColumn: StoryFn = (args: FlexBoxItemProps) => (
  <BorderBox position="relative">
    <MarginBox />
    <FlexBox flexDirection="col" gap={4} padding={4}>
      <FlexBox.Item {...args}>
        <Rectangle position="absolute" spread />
        <BorderBox position="absolute" zIndex={20} spread />
        <Box position="relative" zIndex={30}>
          <FlexBox justifyContent="around">
            <FlexBox.Item>FlexBox.Item</FlexBox.Item>
            <FlexBox.Item>
              <dl>
                <dt>FlexBasis:</dt>
                <dd>{args.flexBasis}</dd>
              </dl>
            </FlexBox.Item>
          </FlexBox>
        </Box>
      </FlexBox.Item>
      <FlexBox.Item {...args}>
        <Rectangle position="absolute" spread />
        <BorderBox position="absolute" zIndex={20} spread />
        <Box position="relative" zIndex={30}>
          <FlexBox justifyContent="around">
            <FlexBox.Item>FlexBox.Item</FlexBox.Item>
            <FlexBox.Item>
              <dl>
                <dt>FlexBasis:</dt>
                <dd>{args.flexBasis}</dd>
              </dl>
            </FlexBox.Item>
          </FlexBox>
        </Box>
      </FlexBox.Item>
    </FlexBox>
  </BorderBox>
);

export const FlexBoxColumnItems = TemplateColumn.bind({});
FlexBoxColumnItems.parameters = {
  docs: {
    source: {
      code: `
<FlexBox flexDirection="col" gap={4} padding={4}>
  <FlexBox.Item flex="auto" padding={4} position="relative">
    Hello
  </FlexBox.Item>
  <FlexBox.Item flex="auto" padding={4}>
    World!
  </FlexBox.Item>
</FlexBox>
      `,
      language: 'tsx',
      type: 'auto',
    },
  },
};
FlexBoxColumnItems.args = {
  flexBasis: '1/2',
  padding: 4,
};
