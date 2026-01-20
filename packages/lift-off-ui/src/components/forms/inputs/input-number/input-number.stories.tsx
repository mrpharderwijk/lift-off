import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { InputNumber, InputNumberProps } from './input-number';
import { Box } from '@/components/layout/box/box';
import { Button } from '@/components/ui/buttons/button';

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
        onChange={(value) => setValue(Number(value))}
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
          onChange={(value) => setValue(Number(value))}
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

export const WithReactHookForm: Story = {
  render: () => {
    type FormData = {
      amount: number;
      quantity: number;
      price: number;
    };

    const {
      control,
      handleSubmit,
      formState: { errors },
      watch,
    } = useForm<FormData>({
      defaultValues: {
        amount: 0,
        quantity: 1,
        price: 10.99,
      },
      mode: 'onChange',
    });

    const onSubmit = (data: FormData) => {
      alert(`Form submitted with values:\n${JSON.stringify(data, null, 2)}`);
    };

    const watchedValues = watch();

    return (
      <Box margin={4}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box display="flex" flex-direction="col" gap={4}>
            <Box display="flex" flex-direction="col" gap={2}>
              <label htmlFor="amount" className="text-sm font-semibold">
                Amount (min: 0, max: 1000, step: 10)
              </label>
              <Controller
                name="amount"
                control={control}
                rules={{
                  required: 'Amount is required',
                  min: {
                    value: 0,
                    message: 'Amount must be at least 0',
                  },
                  max: {
                    value: 1000,
                    message: 'Amount must be at most 1000',
                  },
                }}
                render={({ field }) => (
                  <InputNumber
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    onBlur={field.onBlur}
                    min={0}
                    max={1000}
                    step={10}
                    error={errors.amount?.message}
                    ariaLabel="Amount"
                  />
                )}
              />
            </Box>

            <Box display="flex" flex-direction="col" gap={2}>
              <label htmlFor="quantity" className="text-sm font-semibold">
                Quantity (min: 1, max: 100, step: 1)
              </label>
              <Controller
                name="quantity"
                control={control}
                rules={{
                  required: 'Quantity is required',
                  min: {
                    value: 1,
                    message: 'Quantity must be at least 1',
                  },
                  max: {
                    value: 100,
                    message: 'Quantity must be at most 100',
                  },
                }}
                render={({ field }) => (
                  <InputNumber
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    onBlur={field.onBlur}
                    min={1}
                    max={100}
                    step={1}
                    decimalPlaces={0}
                    error={errors.quantity?.message}
                    ariaLabel="Quantity"
                  />
                )}
              />
            </Box>

            <Box display="flex" flex-direction="col" gap={2}>
              <label htmlFor="price" className="text-sm font-semibold">
                Price (min: 0.01, max: 999.99, step: 0.01)
              </label>
              <Controller
                name="price"
                control={control}
                rules={{
                  required: 'Price is required',
                  min: {
                    value: 0.01,
                    message: 'Price must be at least 0.01',
                  },
                  max: {
                    value: 999.99,
                    message: 'Price must be at most 999.99',
                  },
                }}
                render={({ field }) => (
                  <InputNumber
                    value={field.value}
                    onChange={(value) => field.onChange(value)}
                    onBlur={field.onBlur}
                    min={0.01}
                    max={999.99}
                    step={0.01}
                    decimalPlaces={2}
                    prefix={<span>$</span>}
                    error={errors.price?.message}
                    ariaLabel="Price"
                  />
                )}
              />
            </Box>

            <Box display="flex" flex-direction="col" gap={2}>
              <Button type="submit">Submit Form</Button>
            </Box>

            <div className="flex flex-col gap-1 p-3 bg-bg-primary-quaternary rounded-lg">
              <div className="text-sm font-semibold">Form Values:</div>
              <pre className="text-xs overflow-auto">
                {JSON.stringify(watchedValues, null, 2)}
              </pre>
            </div>
          </Box>
        </form>
      </Box>
    );
  },
};
