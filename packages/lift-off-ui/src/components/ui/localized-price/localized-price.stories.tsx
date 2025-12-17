import type { Meta, StoryObj } from '@storybook/react';
import { LocalizedPrice } from '@/components/ui/localized-price';

const meta: Meta<typeof LocalizedPrice> = {
  title: 'Components/Ui/LocalizedPrice',
  component: LocalizedPrice,
  tags: ['autodocs'],
  args: {
    price: 1234.56,
    locale: 'en-US',
    currency: 'USD',
    minFractionDigits: 2,
    maxFractionDigits: 2,
  },
  argTypes: {
    price: { control: { type: 'number' } },
    locale: { control: { type: 'text' } },
    currency: { control: { type: 'text' } },
    minFractionDigits: {
      control: { type: 'number', min: 0, max: 10, step: 1 },
    },
    maxFractionDigits: {
      control: { type: 'number', min: 0, max: 10, step: 1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LocalizedPrice>;

export const USDDollars: Story = {
  args: {
    price: 1234.56,
    locale: 'en-US',
    currency: 'USD',
  },
};

export const EuroDE: Story = {
  args: {
    price: 1234.56,
    locale: 'de-DE',
    currency: 'EUR',
  },
};

export const YenJP: Story = {
  args: {
    price: 1234.56,
    locale: 'ja-JP',
    currency: 'JPY',
    minFractionDigits: 0,
    maxFractionDigits: 0,
  },
};

export const CustomFractionDigits: Story = {
  args: {
    price: 1234.56789,
    locale: 'en-US',
    currency: 'USD',
    minFractionDigits: 3,
    maxFractionDigits: 5,
  },
};

export const StringPrice: Story = {
  args: {
    price: '1599.99',
    locale: 'en-GB',
    currency: 'GBP',
    minFractionDigits: 2,
    maxFractionDigits: 2,
  },
};
