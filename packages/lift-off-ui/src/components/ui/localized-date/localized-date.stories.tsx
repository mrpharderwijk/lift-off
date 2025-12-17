import type { Meta, StoryObj } from '@storybook/react';
import { LocalizedDate } from './localized-date';

const meta: Meta<typeof LocalizedDate> = {
  title: 'Components/Ui/LocalizedDate',
  component: LocalizedDate,
  tags: ['autodocs'],
  args: {
    date: new Date('2024-04-30T11:42:00Z'),
    locale: 'en-US',
  },
  argTypes: {
    date: { control: { type: 'date' } },
    locale: { control: { type: 'text' } },
  },
};

export default meta;
type Story = StoryObj<typeof LocalizedDate>;

export const EnglishUS: Story = {
  args: {
    date: new Date('2024-04-30T11:42:00Z'),
    locale: 'en-US',
  },
  render: (args) => <>{LocalizedDate({ ...args })}</>,
};

export const FrenchFR: Story = {
  args: {
    date: new Date('2024-04-30T11:42:00Z'),
    locale: 'fr-FR',
  },
  render: (args) => <>{LocalizedDate({ ...args })}</>,
};

export const GermanDE: Story = {
  args: {
    date: new Date('2024-04-30T11:42:00Z'),
    locale: 'de-DE',
  },
  render: (args) => <>{LocalizedDate({ ...args })}</>,
};

export const DutchNL: Story = {
  args: {
    date: new Date('2024-12-02T11:42:00Z'),
    locale: 'nl-NL',
  },
  render: (args) => <>{LocalizedDate({ ...args })}</>,
};

export const ShorthandEN: Story = {
  args: {
    date: new Date('2023-01-05T00:00:00Z'),
    locale: 'en',
  },
  render: (args) => <>{LocalizedDate({ ...args })}</>,
};

export const InvalidLocale: Story = {
  args: {
    date: new Date('2023-08-15T00:00:00Z'),
    locale: 'invalid-locale',
  },
  render: (args) => <>{LocalizedDate({ ...args })}</>,
};

export const NullDate: Story = {
  args: {
    // @ts-expect-error
    date: null,
    locale: 'en-US',
  },
  render: (args) => <>{String(LocalizedDate({ ...args }))}</>,
};
