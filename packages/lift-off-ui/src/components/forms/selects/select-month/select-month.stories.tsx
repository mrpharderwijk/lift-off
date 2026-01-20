import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { ComponentProps } from 'react';
import { enUS, nl, de, fr, es, it, pt, ja, ko, zhCN } from 'date-fns/locale';

import { SelectMonth } from './select-month';
import { Box } from '@/components/layout/box/box';
import { Button } from '@/components/ui/buttons/button';
import { XIcon } from 'lucide-react';

const meta: Meta<typeof SelectMonth> = {
  title: 'Components/Forms/Selects/SelectMonth',
  component: SelectMonth,
  args: {
    id: 'example-month',
    label: 'Month',
    placeholder: 'Select a month',
    value: '',
    disabled: false,
    error: '',
    disableError: false,
    monthFormat: 'MMMM',
    locale: enUS,
  },
  tags: ['autodocs'],
  argTypes: {
    monthFormat: {
      control: 'select',
      options: ['MM', 'MMM', 'MMMM'],
      description: 'Format for displaying months: MM (numbers), MMM (short names), MMMM (full names)',
    },
  },
};
export default meta;

type Story = StoryObj<typeof SelectMonth>;
type SelectMonthProps = ComponentProps<typeof SelectMonth>;

const Template: StoryFn<SelectMonthProps> = (args: SelectMonthProps) => {
  const [value, setValue] = useState(args.value ?? '');

  return (
    <Box margin={4}>
      <SelectMonth
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
  label: 'Select Month',
};

export const WithValue = Template.bind({});
WithValue.args = {
  value: '2024-03',
  label: 'Birth Month',
};

export const WithValueAsNumber = Template.bind({});
WithValueAsNumber.args = {
  value: 6,
  label: 'Month',
};

export const FullMonthNames = Template.bind({});
FullMonthNames.args = {
  value: '',
  label: 'Month (Full Names)',
  monthFormat: 'MMMM',
  locale: enUS,
};

export const ShortMonthNames = Template.bind({});
ShortMonthNames.args = {
  value: '',
  label: 'Month (Short Names)',
  monthFormat: 'MMM',
  locale: enUS,
};

export const MonthNumbers = Template.bind({});
MonthNumbers.args = {
  value: '',
  label: 'Month (Numbers)',
  monthFormat: 'MM',
};

export const DutchLocale = Template.bind({});
DutchLocale.args = {
  value: '',
  label: 'Maand',
  monthFormat: 'MMMM',
  locale: nl,
};

export const GermanLocale = Template.bind({});
GermanLocale.args = {
  value: '',
  label: 'Monat',
  monthFormat: 'MMMM',
  locale: de,
};

export const FrenchLocale = Template.bind({});
FrenchLocale.args = {
  value: '',
  label: 'Mois',
  monthFormat: 'MMMM',
  locale: fr,
};

export const SpanishLocale = Template.bind({});
SpanishLocale.args = {
  value: '',
  label: 'Mes',
  monthFormat: 'MMMM',
  locale: es,
};

export const JapaneseLocale = Template.bind({});
JapaneseLocale.args = {
  value: '',
  label: '月',
  monthFormat: 'MMMM',
  locale: ja,
};

export const WithError = Template.bind({});
WithError.args = {
  value: '',
  error: 'Please select a valid month.',
};

export const Required = Template.bind({});
Required.args = {
  value: '',
  label: 'Required Month',
  required: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  value: '2024-06',
  label: 'Disabled Month',
};

export const FloatingLabel = Template.bind({});
FloatingLabel.args = {
  value: '2024-09',
  label: 'Month',
  placeholder: 'Select a month',
};

export const WithCustomAction: Story = {
  render: (args) => {
    const [value, setValue] = useState(args.value ?? '');

    function handleOnClear(): void {
      setValue('');
    }

    return (
      <Box margin={4}>
        <SelectMonth
          {...args}
          value={value}
          onChange={(e) => setValue(e.target.value)}

        />
      </Box>
    );
  },
  args: {
    value: '2024-03',
    label: 'Month',
    placeholder: 'Select a month',
  },
};

export const FormatComparison: Story = {
  render: () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');

    return (
      <Box margin={4}>
        <Box display="flex" flex-direction="col" gap={4}>
          <SelectMonth
            id="format-full"
            label="Full Month Names (MMMM)"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            monthFormat="MMMM"
            locale={enUS}
          />
          <SelectMonth
            id="format-short"
            label="Short Month Names (MMM)"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            monthFormat="MMM"
            locale={enUS}
          />
          <SelectMonth
            id="format-numbers"
            label="Month Numbers (MM)"
            value={value3}
            onChange={(e) => setValue3(e.target.value)}
            monthFormat="MM"
          />
        </Box>
      </Box>
    );
  },
};

export const LocaleComparison: Story = {
  render: () => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');

    return (
      <Box margin={4}>
        <Box display="flex" flex-direction="col" gap={4}>
          <SelectMonth
            id="locale-english"
            label="English (US)"
            value={value1}
            onChange={(e) => setValue1(e.target.value)}
            monthFormat="MMMM"
            locale={enUS}
          />
          <SelectMonth
            id="locale-dutch"
            label="Dutch"
            value={value2}
            onChange={(e) => setValue2(e.target.value)}
            monthFormat="MMMM"
            locale={nl}
          />
          <SelectMonth
            id="locale-german"
            label="German"
            value={value3}
            onChange={(e) => setValue3(e.target.value)}
            monthFormat="MMMM"
            locale={de}
          />
        </Box>
      </Box>
    );
  },
};

export const AccessibilityExample: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <Box margin={4}>
        <Box display="flex" flex-direction="col" gap={2}>
          <p className="text-sm text-text-secondary">
            This component is WCAG 2.1 AA compliant with proper ARIA attributes:
          </p>
          <ul className="text-sm text-text-secondary list-disc list-inside space-y-1">
            <li>aria-label for screen readers</li>
            <li>aria-required for required fields</li>
            <li>aria-invalid for error states</li>
            <li>aria-describedby for error messages</li>
            <li>Proper label association</li>
            <li>Keyboard navigation support</li>
          </ul>
          <SelectMonth
            id="accessibility-month"
            label="Accessible Month Selector"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            monthFormat="MMMM"
            locale={enUS}
            required
            aria-describedby="month-help"
          />
          {value}
          <p id="month-help" className="text-xs text-text-secondary">
            Select the month for your birth date. This field is required.
          </p>
        </Box>
      </Box>
    );
  },
};
