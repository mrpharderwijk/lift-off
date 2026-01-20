import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { ComponentProps } from 'react';

import { InputPassword } from './input-password';
import { Box } from '@/components/layout/box/box';

const meta: Meta<typeof InputPassword> = {
  title: 'Components/Forms/Inputs/InputPassword',
  component: InputPassword,
  args: {
    id: 'password-input',
    label: 'Password',
    value: '',
    passwordVisible: false,
    toggleVisibility: false,
    disableFeedback: false,
    touched: false,
    dirty: false,
    disabled: false,
    error: '',
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof InputPassword>;
type InputPasswordProps = ComponentProps<typeof InputPassword>;

const Template: StoryFn<InputPasswordProps> = (args: InputPasswordProps) => {
  const [value, setValue] = useState(args.value?.toString() ?? '');
  const [passwordVisible, setPasswordVisible] = useState(
    args.passwordVisible ?? false
  );

  return (
    <Box margin={4}>
      <InputPassword
        {...args}
        value={value}
        passwordVisible={passwordVisible}
        onChange={(e) => setValue(e.target.value)}
        onChangePasswordVisibility={setPasswordVisible}
      />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  id: 'password-input-default',
  label: 'Password',
  value: '',
};

export const WithValue = Template.bind({});
WithValue.args = {
  id: 'password-input-with-value',
  label: 'Password',
  value: 'MyPassword123',
};

export const WithToggleVisibility = Template.bind({});
WithToggleVisibility.args = {
  id: 'password-input-toggle',
  label: 'Password',
  value: 'MyPassword123',
  toggleVisibility: true,
};

export const WithPasswordFeedback = Template.bind({});
WithPasswordFeedback.args = {
  id: 'password-input-feedback',
  label: 'Password',
  value: 'pass',
  dirty: true,
  disableFeedback: false,
};

export const WithValidPassword = Template.bind({});
WithValidPassword.args = {
  id: 'password-input-valid',
  label: 'Password',
  value: 'MySecureP@ssw0rd',
  dirty: true,
  disableFeedback: false,
};

export const WithError = Template.bind({});
WithError.args = {
  id: 'password-input-error',
  label: 'Password',
  value: 'short',
  error: 'Password is too short.',
};

export const Disabled = Template.bind({});
Disabled.args = {
  id: 'password-input-disabled',
  label: 'Password',
  value: 'MyPassword123',
  disabled: true,
};

export const PasswordVisible: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value?.toString() ?? '');
    const [passwordVisible, setPasswordVisible] = useState(true);

    return (
      <Box margin={4}>
        <InputPassword
          {...args}
          value={value}
          passwordVisible={passwordVisible}
          toggleVisibility={true}
          onChange={(e) => setValue(e.target.value)}
          onChangePasswordVisibility={setPasswordVisible}
        />
      </Box>
    );
  },
  args: {
    id: 'password-input-visible',
    label: 'Password',
    value: 'MyPassword123',
    toggleVisibility: true,
  },
};

export const WithToggleAndFeedback: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value?.toString() ?? '');
    const [passwordVisible, setPasswordVisible] = useState(
      args.passwordVisible ?? false
    );

    return (
      <Box margin={4}>
        <InputPassword
          {...args}
          value={value}
          passwordVisible={passwordVisible}
          onChange={(e) => setValue(e.target.value)}
          onChangePasswordVisibility={setPasswordVisible}
        />
      </Box>
    );
  },
  args: {
    id: 'password-input-toggle-feedback',
    label: 'Password',
    value: 'pass',
    toggleVisibility: true,
    dirty: true,
    disableFeedback: false,
  },
};
