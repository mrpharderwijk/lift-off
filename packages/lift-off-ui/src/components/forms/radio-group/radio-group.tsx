import { PropsWithChildren, ReactElement } from 'react';
import { RadioGroup as ShadcnRadioGroup } from '@/components/shadcn/radio-group';

export type RadioGroupProps = PropsWithChildren<{
  value: string;
  onChange: (value?: any) => void;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  required?: boolean;
  ariaInvalid?: boolean;
  ariaErrorMessage?: string;
  name?: string;
  orientation?: 'horizontal' | 'vertical';
}>;

export function RadioGroup({
  children,
  value,
  onChange,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  required = false,
  ariaInvalid = false,
  ariaErrorMessage,
  name,
  orientation = 'vertical',
}: RadioGroupProps): ReactElement {
  // Ensure either ariaLabel or ariaLabelledBy is provided for accessibility
  if (!ariaLabel && !ariaLabelledBy) {
    console.warn(
      'RadioGroup: Either ariaLabel or ariaLabelledBy should be provided for accessibility compliance (WCAG 4.1.2)'
    );
  }

  return (
    <ShadcnRadioGroup
      value={value ?? ''}
      onValueChange={onChange}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-describedby={ariaDescribedBy}
      aria-required={required}
      aria-invalid={ariaInvalid}
      aria-errormessage={ariaErrorMessage}
      name={name}
      orientation={orientation}
    >
      {children}
    </ShadcnRadioGroup>
  );
}
