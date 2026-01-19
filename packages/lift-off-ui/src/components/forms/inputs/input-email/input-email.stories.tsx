import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { InputEmail, InputEmailProps } from './input-email';
import { Box } from '@/components/layout';
import { Button } from '@/components/ui/buttons/button';
import { XIcon } from 'lucide-react';

const meta: Meta<typeof InputEmail> = {
  title: 'Components/Forms/Inputs/InputEmail',
  component: InputEmail,
  args: {
    id: 'example-email',
    label: 'Email',
    placeholder: 'Enter your email',
    value: '',
    disabled: false,
    error: '',
    disableError: false,
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof InputEmail>;

const Template: StoryFn<InputEmailProps> = (args: InputEmailProps) => {
  const [value, setValue] = useState(args.value ?? '');

  return (
    <Box margin={4}>
      <InputEmail
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
  label: 'Email Address',
};

export const WithValue = Template.bind({});
WithValue.args = {
  value: 'test@example.com',
  label: 'Email Address',
};

export const WithError = Template.bind({});
WithError.args = {
  value: 'invalid email',
  error: 'Please enter a valid email address.',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  value: 'john.doe@example.com',
  label: 'Disabled Email',
  placeholder: 'Email input (disabled)',
};

export const FloatingLabel = Template.bind({});
FloatingLabel.args = {
  value: 'test@example.com',
  label: 'Email Address',
  placeholder: 'Will float label',
};

export const WithCustomAction: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value ?? '');

    function handleOnClear(): void {
      setValue('');
    }

    return (
      <Box margin={4}>
        <InputEmail
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          customAction={
            !!value && (
              <Button
                onClick={handleOnClear}
                icon={XIcon}
                variant="quaternary"
                icon-only
              />
            )
          }
        />
      </Box>
    );
  },
  args: {
    value: 'test@example.com',
    label: 'Email Address',
    placeholder: 'Email input with action',
  },
};
