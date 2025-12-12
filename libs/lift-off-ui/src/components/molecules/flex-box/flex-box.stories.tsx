import { Meta, StoryFn } from '@storybook/react';
import { FlexBox, FlexBoxProps } from './flex-box';
import { BorderBox } from '../../../../.storybook/components/border-box';
import { Rectangle } from '../../../../.storybook/components/rectangle';
import { MarginBox } from '../../../../.storybook/components/margin-box';
import { Box } from '../../atoms/box/box';

export default {
  title: 'Components/Molecules/FlexBox',
  component: FlexBox,
} as Meta;

const Template: StoryFn = (args: FlexBoxProps) => (
  <BorderBox position="relative">
    <MarginBox />
    <FlexBox {...args} />
  </BorderBox>
);

export const FlexBoxRow = Template.bind({});
FlexBoxRow.parameters = {
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
FlexBoxRow.args = {
  gap: 4,
  padding: 4,
  children: (
    <>
      <FlexBox.Item flex="initial" position="relative">
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

            <span className="relative z-10">Hello</span>
          </Box>
        </Rectangle>
      </FlexBox.Item>
      <FlexBox.Item flex="auto">
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
            <span className="relative z-10">World!</span>
          </Box>
        </Rectangle>
      </FlexBox.Item>
    </>
  ),
};

export const FlexBoxColumn = Template.bind({});
FlexBoxColumn.parameters = {
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
FlexBoxColumn.args = {
  gap: 4,
  padding: 4,
  flexDirection: 'col',
  children: (
    <>
      <FlexBox.Item flex="initial" position="relative">
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

            <span className="relative z-10">Hello</span>
          </Box>
        </Rectangle>
      </FlexBox.Item>
      <FlexBox.Item flex="auto">
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
            <span className="relative z-10">World!</span>
          </Box>
        </Rectangle>
      </FlexBox.Item>
    </>
  ),
};
