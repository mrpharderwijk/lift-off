import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { InputEmail } from './input-email';

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

export const Basic: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value as string);
    return (
      <InputEmail
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    value: '',
  },
};

export const WithError: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value as string);
    return (
      <InputEmail
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        error="Please enter a valid email address."
      />
    );
  },
  args: {
    value: 'invalid email',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: '',
    label: 'Disabled Email',
    placeholder: 'Email input (disabled)',
  },
};

export const FloatingLabel: Story = {
  args: {
    value: 'test@example.com',
    placeholder: 'Will float label',
    label: 'Email Address',
  },
};

export const WithCustomAction: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value as string);
    return (
      <InputEmail
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        customAction={
          <button
            type="button"
            style={{
              height: 36,
              marginRight: 8,
              background: '#eee',
              border: 'none',
              borderRadius: 4,
              padding: '0 12px',
              cursor: 'pointer',
            }}
            onClick={() => {
              setValue('');
            }}
          >
            Clear
          </button>
        }
      />
    );
  },
  args: {
    label: 'Email with Action',
    placeholder: 'Email input with action',
    value: 'test@example.com',
  },
};
