import type { Meta, StoryFn } from '@storybook/react';

import { TextArea, TextAreaProps } from './text-area';
import { useState } from 'react';
import { Box } from '@/components/layout/box/box';

export default {
  title: 'Components/Forms/TextArea',
  component: TextArea,
} as Meta<typeof TextArea>;

const Template: StoryFn<TextAreaProps> = (args: TextAreaProps) => {
  const [value, setValue] = useState(args.value ?? '');
  console.log(args);
  return (
    <Box margin={4}>
      <TextArea
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  value: '',
  label: 'Input',
};

export const WithValue = Template.bind({});
WithValue.args = {
  value: 'Some text',
  label: 'Input',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  value: 'Disabled input',
  label: 'Input',
};

export const WithError = Template.bind({});
WithError.args = {
  error: 'This field is required.',
  value: '',
  label: 'Input',
};

export const WithCharacterCount = Template.bind({});
WithCharacterCount.args = {
  value: '',
  label: 'Input',
  charCount: true,
  maxLength: 150,
};
