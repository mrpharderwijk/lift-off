import { Box, FlexBox } from '@/components/layout';
import { RadioGroupItem as ShadcnRadioGroupItem } from '@/components/ui/shadcn/radio-group';
import { cn } from '@/utils';

export type RadioGroupItemProps = {
  label: string;
  value: string;
};

export function RadioGroupItem({ label, value }: RadioGroupItemProps) {
  const radioGroupItemClassName = cn('fill-red-500');

  return (
    <FlexBox>
      <FlexBox.Item>
        <ShadcnRadioGroupItem
          className={radioGroupItemClassName}
          value={value}
        />
      </FlexBox.Item>
      <FlexBox.Item>{label}</FlexBox.Item>
    </FlexBox>
  );
}
