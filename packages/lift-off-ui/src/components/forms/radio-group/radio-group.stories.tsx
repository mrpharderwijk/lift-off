import type { Meta, StoryFn } from '@storybook/react';

import { RadioGroup, RadioGroupProps } from './radio-group';
import { useState } from 'react';
import { Box } from '@/components/layout/box/box';
import { RadioGroupItem, RadioGroupTile } from '@/components/forms/radio-group';
import { CaravanIcon, PaperclipIcon, UserIcon } from 'lucide-react';

export default {
  title: 'Components/Forms/RadioGroup',
  component: RadioGroup,
} as Meta<typeof RadioGroup>;

const TemplateWithRadioGroupTiles: StoryFn<RadioGroupProps> = (
  args: RadioGroupProps
) => {
  const [value, setValue] = useState(args.value ?? '');

  const handleChange = (value: string) => {
    setValue(value);
    console.log(value);
  };

  return (
    <Box margin={4}>
      <RadioGroup value={value} onChange={handleChange}>
        <RadioGroupTile
          icon={UserIcon}
          label="First"
          selected={value === 'first'}
          value="first"
          onClick={handleChange}
        />
        <RadioGroupTile
          icon={PaperclipIcon}
          label="Second"
          value="second"
          selected={value === 'second'}
          onClick={handleChange}
        />

        <RadioGroupTile
          icon={CaravanIcon}
          label="Third"
          value="third"
          selected={value === 'third'}
          onClick={handleChange}
        />
      </RadioGroup>
    </Box>
  );
};

export const RadioGroupWithRadioGroupTiles = TemplateWithRadioGroupTiles.bind(
  {}
);
RadioGroupWithRadioGroupTiles.args = {
  value: 'first',
};

const TemplateWithRadioGroupItems: StoryFn<RadioGroupProps> = (
  args: RadioGroupProps
) => {
  const [value, setValue] = useState(args.value ?? '');

  const handleChange = (value: string) => {
    setValue(value);
    console.log(value);
  };

  return (
    <Box margin={4}>
      <RadioGroup value={value} onChange={handleChange}>
        <RadioGroupItem value="male" label="Male" />
        <RadioGroupItem value="female" label="Female" />
      </RadioGroup>
    </Box>
  );
};

export const RadioGroupWithRadioGroupItems = TemplateWithRadioGroupItems.bind(
  {}
);
RadioGroupWithRadioGroupItems.args = {
  value: 'first',
};
