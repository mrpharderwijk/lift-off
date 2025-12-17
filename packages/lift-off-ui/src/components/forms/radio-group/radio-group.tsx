import { PropsWithChildren, ReactElement } from 'react';
import { RadioGroup as ShadcnRadioGroup } from '@/components/ui/shadcn/radio-group';

export type RadioGroupProps = PropsWithChildren<{
  value: string;
  onChange: (value?: any) => void;
}>;

export function RadioGroup({
  children,
  value,
  onChange,
}: RadioGroupProps): ReactElement {
  return (
    <ShadcnRadioGroup value={value ?? ''} onValueChange={onChange}>
      {children}
    </ShadcnRadioGroup>
  );
}
