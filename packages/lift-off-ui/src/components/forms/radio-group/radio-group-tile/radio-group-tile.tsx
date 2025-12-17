import { LucideIcon } from 'lucide-react';
import { ReactElement } from 'react';

import { Body } from '@/components/typography/body/body';
import { Label } from '@/components/ui/shadcn/label';
import { RadioGroupItem } from '@/components/ui/shadcn/radio-group';
import { cn } from '@/utils/class-names';

export type RadioGroupTileProps = {
  icon: LucideIcon;
  label: string;
  value: string;
  selected: boolean;
  onClick: (value: string) => void;
};

export function RadioGroupTile({
  icon: Icon,
  label,
  value,
  onClick,
  selected,
}: RadioGroupTileProps): ReactElement {
  return (
    <div className="w-full">
      <RadioGroupItem value={label} className="peer sr-only" />
      <Label
        htmlFor={label}
        className={cn(
          'w-full rounded-xl border p-4 flex flex-col items-start hover:border-black hover:outline-black hover:outline-1 transition cursor-pointer',
          {
            'border-tertiary-selected outline-1 bg-bg-tertiary-selected':
              selected,
            'border-border-tertiary': !selected,
          }
        )}
        onClick={() => onClick(value)}
      >
        <div className="w-12 h-12 flex justify-start">
          <Icon
            className={cn('transition-all duration-300', {
              'animate-icon-size': selected,
              'size-[30px]': !selected,
            })}
            size={30}
          />
        </div>
        <Body size="base-lg" font-weight="semibold" text-align="left">
          {label}
        </Body>
      </Label>
    </div>
  );
}
