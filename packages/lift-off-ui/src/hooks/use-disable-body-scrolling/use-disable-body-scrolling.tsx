import { useEffect } from 'react';

export type UseDisableBodyScrollingParams = {
  disabled: boolean;
};

// Reference counter to track how many instances are disabling body scrolling
let disableCount = 0;

export function useDisableBodyScrolling({
  disabled,
}: UseDisableBodyScrollingParams): void {
  useEffect(() => {
    if (disabled) {
      disableCount++;
      document.body.style.overflow = 'hidden';
    }

    if (disableCount === 0) {
      // If no instances are disabling, ensure overflow is auto
      document.body.style.overflow = 'auto';
    }

    return (): void => {
      if (disabled) {
        disableCount--;
        // Only enable scrolling if no instances are still disabling it
        if (disableCount === 0) {
          document.body.style.overflow = 'auto';
        }
      }
    };
  }, [disabled]);
}
