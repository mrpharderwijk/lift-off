import { LucideIcon } from 'lucide-react';
import { ReactElement, useId } from 'react';

import { Body } from '@/components/core/typography/body/body';
import { Label } from '@/components/shadcn/label';
import { RadioGroupItem } from '@/components/shadcn/radio-group';
import { cn } from '@/utils/class-names';

export type RadioGroupTileProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  selected: boolean;
  onClick: (value: string) => void;
  disabled?: boolean;
};

export function RadioGroupTile({
  icon: Icon,
  label,
  value,
  onClick,
  selected,
  disabled = false,
}: RadioGroupTileProps): ReactElement {
  // Generate a unique ID for the radio button to associate with the label
  // This ensures WCAG 4.1.2 compliance (Name, Role, Value)
  const radioId = useId();

  const handleLabelClick = (e: React.MouseEvent<HTMLLabelElement>) => {
    // Only trigger onClick if the radio button itself wasn't clicked
    // This prevents double-triggering and ensures proper keyboard navigation
    if (e.target !== e.currentTarget.querySelector(`#${radioId}`)) {
      onClick(value);
    }
  };

  return (
    <div className="w-full">
      <RadioGroupItem
        id={radioId}
        value={value}
        className="peer sr-only"
        disabled={disabled}
        aria-label={label}
      />
      <Label
        htmlFor={radioId}
        className={cn(
          'w-full rounded-xl border p-4 flex flex-col items-start hover:border-black hover:outline-black hover:outline-1 transition cursor-pointer',
          {
            'border-tertiary-selected outline-1 bg-bg-tertiary-selected':
              selected,
            'border-border-tertiary': !selected,
            'cursor-not-allowed opacity-50': disabled,
          }
        )}
        onClick={handleLabelClick}
        aria-disabled={disabled}
      >
        <div className="w-12 h-12 flex justify-start">
          <Icon
            className={cn('transition-all duration-300', {
              'animate-icon-size': selected,
              'size-[30px]': !selected,
            })}
            size={30}
            aria-hidden="true"
          />
        </div>
        <Body size="base-lg" font-weight="semibold" text-align="left">
          {label}
        </Body>
      </Label>
    </div>
  );
}
