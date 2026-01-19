import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { InputNumber, InputNumberProps } from './input-number';
import { Box } from '@/components/layout/box/box';

const meta: Meta<typeof InputNumber> = {
  title: 'Components/Forms/Inputs/InputNumber',
  component: InputNumber,
  args: {
    value: 0,
    min: undefined,
    max: undefined,
    disabled: false,
    error: '',
    decimalPlaces: 2,
  },
  tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof InputNumber>;

const Template: StoryFn<InputNumberProps> = (args: InputNumberProps) => {
  const [value, setValue] = useState(args.value ?? 0);

  return (
    <Box margin={4}>
      <InputNumber
        {...args}
        value={value}
        onChange={(value) => setValue(value)}
      />
    </Box>
  );
};

export const Default = Template.bind({});
Default.args = {
  value: 0,
};

export const WithValue = Template.bind({});
WithValue.args = {
  value: 123.45,
};

export const WithMinMax = Template.bind({});
WithMinMax.args = {
  value: 5,
  min: 2,
  max: 10,
};

export const WithError = Template.bind({});
WithError.args = {
  value: 99,
  error: 'Value is out of range.',
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  value: 42,
};

export const DecimalPlaces = Template.bind({});
DecimalPlaces.args = {
  value: 3.141592,
  decimalPlaces: 4,
};

export const WithPrefixSuffix: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value ?? 0);

    return (
      <Box margin={4}>
        <InputNumber
          {...args}
          value={value}
          onChange={(value) => setValue(value)}
          prefix={<span>$</span>}
          suffix={<span>.00</span>}
        />
      </Box>
    );
  },
  args: {
    value: 99.99,
  },
};
