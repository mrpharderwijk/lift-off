import { AlertCircle } from 'lucide-react';
import {
  ChangeEvent,
  ReactElement,
  RefCallback,
  RefObject,
  SelectHTMLAttributes,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import { format, setMonth } from 'date-fns';
import { enUS, Locale } from 'date-fns/locale';

import { FlexBox } from '@/components/layout';
import { PropsWithRef } from '@/types/props-with-ref';
import { cn } from '@/utils/class-names';
import { Field, FieldError, FieldLabel } from '@/components/shadcn/field';

export type SelectMonthProps = Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  'value' | 'onChange'
> &
  PropsWithRef<HTMLSelectElement> & {
    id: string;
    label: string;
    value?: string | number; // Accepts "YYYY-MM" format or month number (1-12)
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
    error?: string;
    disableError?: boolean;
    locale?: Locale;
    placeholder?: string;
    monthFormat?: 'MM' | 'MMM' | 'MMMM'; // MM = numbers (01-12), MMM = short names (Jan), MMMM = full names (January)
  };

/**
 * InputMonth component - A WCAG compliant month selector with locale support
 *
 * Features:
 * - Supports different month formats (MM, MMM, MMMM)
 * - Locale-aware month names using date-fns
 * - WCAG 2.1 AA compliant with proper ARIA attributes
 * - Follows the same styling pattern as other input components
 *
 * @example
 * ```tsx
 * <SelectMonth
 *   id="birth-month"
 *   label="Birth Month"
 *   value="2024-03"
 *   onChange={(e) => setValue(e.target.value)}
 *   monthFormat="MMMM"
 *   locale={nl}
 * />
 * ```
 */
export function SelectMonth({
  label,
  placeholder,
  value,
  error,
  ref,
  onChange,
  id,
  disabled,
  disableError = false,
  locale = enUS,
  monthFormat = 'MMMM',
  required,
  ...props
}: SelectMonthProps): ReactElement {
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLSelectElement>(null);
  const errorId = `${id}-error`;
  const isFloating = isFocused || !!value || !!error || !!placeholder;

  // Create a ref callback that handles both internal ref and forwarded ref
  const setSelectRef = useCallback(
    (node: HTMLSelectElement | null) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (selectRef as any).current = node;
      // Handle forwarded ref if provided (function refs only)
      // For ref objects, React will handle them automatically via the ref prop
      if (typeof ref === 'function') {
        ref(node);
      }
    },
    [ref]
  );

  // Combine aria-describedby from props with error ID
  const describedByParts: string[] = [];
  if (error && !disableError) {
    describedByParts.push(errorId);
  }
  if (props['aria-describedby']) {
    // Split existing aria-describedby and add each ID
    const existingIds = props['aria-describedby'].split(/\s+/).filter(Boolean);
    describedByParts.push(...existingIds);
  }
  const ariaDescribedByValue = describedByParts.length > 0
    ? [...new Set(describedByParts)].join(' ') // Remove duplicates
    : undefined;

  const hasError = !!error;

  // Generate month options based on format and locale
  const monthOptions = useMemo(() => {
    const options: Array<{ value: string; label: string }> = [];
    const baseDate = new Date(2024, 0, 1); // Use a fixed year for consistency

    for (let month = 0; month < 12; month++) {
      const monthDate = setMonth(baseDate, month);
      const monthNumber = month + 1;
      const monthValue = String(monthNumber).padStart(2, '0'); // "01" to "12"

      let monthLabel: string;
      if (monthFormat === 'MM') {
        monthLabel = monthValue;
      } else {
        monthLabel = format(monthDate, monthFormat, { locale });
      }

      options.push({
        value: monthValue,
        label: monthLabel,
      });
    }

    return options;
  }, [monthFormat, locale]);

  // Parse value to get month number (1-12)
  // Supports both "YYYY-MM" format and direct month number
  const selectedMonth = useMemo(() => {
    if (!value) {
      return '';
    }

    if (typeof value === 'number') {
      return String(value).padStart(2, '0');
    }

    // If value is "YYYY-MM" format, extract the month part
    if (typeof value === 'string' && value.includes('-')) {
      const parts = value.split('-');
      const monthPart = parts[parts.length - 1];
      return monthPart.padStart(2, '0');
    }

    // If value is just a month number string
    return String(value).padStart(2, '0');
  }, [value]);

  const inputContainerClassName = cn(
    'flex flex-row items-center justify-start p-2 pl-2 pr-0 gap-2 w-full h-14 border border-border-quarternary rounded-lg transition-all duration-200 outline-offset-2',
    {
      'border-border-secondary-error outline-2 !outline-border-secondary-error':
        hasError && isFocused,
      'border-border-secondary-error bg-bg-primary-error':
        hasError && !isFocused,
      'bg-bg-primary-disabled cursor-not-allowed': !!disabled,
      'outline-2 outline-offset-2': !hasError && isFocused,
    }
  );
  const selectClassName = cn(
    'w-full h-14 pt-5 px-4 pb-1 rounded-lg transition-all duration-200 text-base-lg font-medium text-text-primary outline-none bg-transparent appearance-none cursor-pointer',
    {
      'cursor-not-allowed': !!disabled,
    }
  );
  const labelClassName = cn(
    'absolute pointer-events-none transition-all duration-200 font-medium',
    {
      'text-xs top-2 left-4 text-text-secondary': isFloating,
      'text-text-primary-error font-bold': hasError,
      'text-base-lg top-1/2 -translate-y-1/2 left-4 text-text-secondary':
        !isFloating,
    }
  );

  function handleFocus(): void {
    setIsFocused(true);
  }

  function handleBlur(): void {
    setIsFocused(false);
  }

  function handleChange(e: ChangeEvent<HTMLSelectElement>): void {
    onChange?.(e);
  }

  return (
    <Field>
      <FlexBox flex-direction="col" gap={2} width="full">
        <div ref={containerRef} className={inputContainerClassName}>
          <FlexBox.Item flex="auto" position="relative">
            <FieldLabel htmlFor={id} className={labelClassName}>
              {label}
            </FieldLabel>
            <select
              {...props}
              id={id}
              ref={setSelectRef}
              value={selectedMonth}
              aria-invalid={hasError}
              aria-describedby={ariaDescribedByValue}
              aria-required={required}
              aria-label={props['aria-label'] || label}
              className={selectClassName}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              disabled={disabled}
            >
              {!required && (
                <option value="" aria-label="No month selected">
                  {placeholder || ''}
                </option>
              )}
              {required && !selectedMonth && (
                <option value="" disabled hidden aria-label="No month selected">
                  {placeholder || ''}
                </option>
              )}
              {monthOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {/* Custom dropdown arrow */}
            <div
              className={cn(
                'absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none transition-transform duration-200',
                {
                  'text-text-secondary': !hasError,
                  'text-text-primary-error': hasError,
                }
              )}
              aria-hidden="true"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </FlexBox.Item>
        </div>
        {error && !disableError && (
          <FieldError>
            <div role="alert" aria-live="polite">
              <FlexBox
                flex-direction="row"
                align-items="center"
                justify-content="start"
                gap={1}
              >
                <div className="text-xs text-text-primary-error">
                  <AlertCircle size={16} aria-hidden="true" />
                </div>
                <div id={errorId} className="text-xs text-text-primary-error">
                  {error}
                </div>
              </FlexBox>
            </div>
          </FieldError>
        )}
      </FlexBox>
    </Field>
  );
}
