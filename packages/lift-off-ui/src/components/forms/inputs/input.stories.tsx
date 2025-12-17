import type { Meta, StoryFn } from '@storybook/react';

import { Input, InputProps } from './input';
import { useState } from 'react';
import { Box } from '@/components/layout/box/box';

export default {
  title: 'Components/Forms/Inputs/Input',
  component: Input,
} as Meta<typeof Input>;

const Template: StoryFn<InputProps> = (args: InputProps) => {
  const [value, setValue] = useState(args.value ?? '');

  return (
    <Box margin={4}>
      <Input
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

export const WithCustomAction = Template.bind({});
WithCustomAction.args = {
  customAction: <button type="button">Action</button>,
  value: 'With action',
  label: 'Input',
};

export const Password = Template.bind({});
Password.args = {
  type: 'password',
  label: 'Password',
  placeholder: 'Enter your password',
  value: '',
  autocomplete: 'current-password',
  passwordrules: 'minlength: 8;',
};
