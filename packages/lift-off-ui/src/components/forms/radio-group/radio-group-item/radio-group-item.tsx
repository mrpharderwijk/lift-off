import { FormLabel } from '@/components/forms/form-label/form-label';
import { FlexBox } from '@/components/layout';
import { RadioGroupItem as ShadcnRadioGroupItem } from '@/components/shadcn/radio-group';
import { cn } from '@/utils';
import { useId } from 'react';

export type RadioGroupItemProps = {
  label: string;
  value: string;
  disabled?: boolean;
};

export function RadioGroupItem({ label, value, disabled = false }: RadioGroupItemProps) {
  // Generate a unique ID for the radio button to associate with the label
  // This ensures WCAG 4.1.2 compliance (Name, Role, Value)
  const radioId = useId();
  const radioGroupItemClassName = cn('fill-red-500');

  return (
    <FormLabel display="flex" flex-direction="row" gap={2} htmlFor={radioId}>
      <FlexBox.Item flex="initial" display="flex" align-items="center" justify-content="center">
        <ShadcnRadioGroupItem
          id={radioId}
          className={radioGroupItemClassName}
          value={value}
          disabled={disabled}
          aria-label={label}
        />
      </FlexBox.Item>
      <FlexBox.Item flex="auto">{label}</FlexBox.Item>
    </FormLabel>
  );
}
