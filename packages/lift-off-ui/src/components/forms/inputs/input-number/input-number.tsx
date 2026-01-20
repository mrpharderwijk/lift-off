'use client';

import { AlertCircle } from 'lucide-react';
import type React from 'react';
import {
  type ChangeEvent,
  HTMLAttributes,
  type KeyboardEvent,
  type ReactElement,
  useId,
  useRef,
  useState,
} from 'react';

import { Box } from '@/components/layout/box/box';
import { FlexBox } from '@/components/layout/flex-box/flex-box';
import { FlexBoxItem } from '@/components/layout/flex-box/flex-box-item/flex-box-item';
import { cn } from '@/utils/class-names';

export type InputNumberProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'prefix' | 'suffix'
> & {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  id?: string;
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  ariaRequired?: boolean;
  error?: string;
  prefix?: ReactElement;
  suffix?: ReactElement;
  decimalPlaces?: number;
};

export function InputNumber({
  value,
  onChange,
  min,
  max,
  step = 1,
  disabled = false,
  id,
  ariaLabel,
  ariaLabelledBy,
  ariaDescribedBy,
  ariaRequired = false,
  error,
  prefix,
  suffix,
  decimalPlaces = 2,
  ...props
}: InputNumberProps): ReactElement {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const inputRef = useRef<HTMLInputElement>(null);
  const [displayValue, setDisplayValue] = useState(
    value.toFixed(decimalPlaces)
  );
  const [isFocused, setIsFocused] = useState(false);
  const hasError = !!error;

  // Build aria-describedby: combine error, step info, and custom describedBy
  const describedByParts: string[] = [];
  if (hasError) {
    describedByParts.push(errorId);
  }
  if (ariaDescribedBy) {
    describedByParts.push(ariaDescribedBy);
  }
  const ariaDescribedByValue = describedByParts.length > 0
    ? describedByParts.join(' ')
    : undefined;

  // Calculate current numeric value for aria attributes
  const normalizedValue = displayValue.replace(',', '.');
  const currentNumericValue = parseFloat(normalizedValue);
  const isValidValue = !isNaN(currentNumericValue) && displayValue !== '';

  // Generate aria-valuetext for better screen reader support
  // Provides human-readable value text (useful for formatted numbers with prefix/suffix)
  const ariaValueText = isValidValue
    ? String(currentNumericValue)
    : undefined;
  const inputContainerClassName = cn(
    'w-40 h-12 border border-border-quarternary rounded-lg transition-all duration-200 overflow-hidden',
    {
      'outline-2 outline-offset-2 outline-black': isFocused,
      'border-border-secondary-error outline-2 !outline-border-secondary-error':
        hasError && isFocused,
      'border-border-secondary-error bg-bg-primary-error outline-black':
        hasError && !isFocused,
      'bg-bg-primary-disabled cursor-not-allowed': !!disabled,
    }
  );
  const inputClassName = cn(
    'w-full text-base-lg h-12 pt-2 pb-2 px-4 font-semibold text-text-primary outline-none focus-visible:outline-none!',
    {
      'pl-2': !!prefix,
      'pr-2': !!suffix,
      'border-border-secondary-error bg-bg-primary-error outline-black':
        hasError && !isFocused,
      'bg-bg-primary-disabled cursor-not-allowed': !!disabled,
    }
  );

  function handleInputKeyDown(e: KeyboardEvent<HTMLInputElement>): void {
    if (disabled) return;

    // Allow: backspace, delete, tab, escape, enter
    if (
      e.key === 'Backspace' ||
      e.key === 'Delete' ||
      e.key === 'Tab' ||
      e.key === 'Escape' ||
      e.key === 'Enter'
    ) {
      return;
    }

    // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
    if (
      (e.ctrlKey || e.metaKey) &&
      (e.key === 'a' || e.key === 'c' || e.key === 'v' || e.key === 'x')
    ) {
      return;
    }

    // Allow: arrow keys (left/right for navigation)
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      return;
    }

    // Handle: arrow up/down for step increment/decrement
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();

      // Get current value from display or use the prop value
      const normalizedValue = displayValue.replace(',', '.');
      let currentValue = parseFloat(normalizedValue);

      if (isNaN(currentValue)) {
        currentValue = value;
      }

      // Calculate new value based on step
      let newValue = e.key === 'ArrowUp'
        ? currentValue + step
        : currentValue - step;

      // Apply min/max constraints
      if (min !== undefined) {
        newValue = Math.max(min, newValue);
      }
      if (max !== undefined) {
        newValue = Math.min(max, newValue);
      }

      // Round to the specified number of decimal places
      const multiplier = Math.pow(10, decimalPlaces);
      newValue = Math.round(newValue * multiplier) / multiplier;

      // Update display value and trigger onChange
      setDisplayValue(newValue.toFixed(decimalPlaces));
      onChange(newValue);

      return;
    }

    // Allow decimal point or comma only if neither is already present
    if (
      (e.key === '.' || e.key === ',') &&
      !e.currentTarget.value.includes('.') &&
      !e.currentTarget.value.includes(',')
    ) {
      return;
    }

    // Block any other key that is not a number
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>): void {
    if (disabled) {
      return;
    }

    const inputValue = e.target.value;

    // Allow empty input for better UX
    if (inputValue === '') {
      setDisplayValue('');
      return;
    }

    // Update display value and trigger onChange
    setDisplayValue(inputValue);
    const numberValue = parseFloat(inputValue);
    if (!isNaN(numberValue)) {
      onChange(numberValue);
    }
  }

  function handleInputBlur(): void {
    if (disabled) {
      return;
    }

    // Replace comma with dot before parsing
    const normalizedValue = displayValue.replace(',', '.');
    let newValue = parseFloat(normalizedValue);

    if (isNaN(newValue)) {
      newValue = value;
    } else if (min !== undefined || max !== undefined) {
      // Only apply min/max constraints if they are defined
      const minValue = min ?? -Infinity;
      const maxValue = max ?? Infinity;
      newValue = Math.max(minValue, Math.min(maxValue, newValue));
    }

    // Round to the specified number of decimal places
    const multiplier = Math.pow(10, decimalPlaces);
    newValue = Math.round(newValue * multiplier) / multiplier;

    // Check if the input has exactly the specified number of decimal places
    const decimalRegex = new RegExp(`^\\d+\\.\\d{${decimalPlaces}}$`);
    const hasCorrectDecimals = decimalRegex.test(normalizedValue);

    // If it's not a decimal with exactly the specified places, format it
    if (!hasCorrectDecimals) {
      setDisplayValue(newValue.toFixed(decimalPlaces));
    } else {
      setDisplayValue(normalizedValue);
    }

    onChange(newValue);
    setIsFocused(false);
  }

  function handleInputFocus(): void {
    inputRef.current?.select();
    setIsFocused(true);
  }

  return (
    <FlexBox flex-direction="col" align-items="start" gap={2}>
      <div className={inputContainerClassName}>
        <Box
          display="flex"
          flex-direction="row"
          gap={2}
          align-items="center"
          justify-content="start"
          overflow="hidden"
        >
          {!!prefix && (
            <Box
              display="flex"
              flex="initial"
              bg-color="quaternary"
              align-self="stretch"
              align-items="center"
              justify-content="center"
              padding-x={2}
            >
              {prefix}
            </Box>
          )}
          <FlexBoxItem flex="auto">
            <input
              {...props}
              id={inputId}
              className={inputClassName}
              ref={inputRef}
              type="text"
              inputMode="decimal"
              value={displayValue}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              onKeyDown={handleInputKeyDown}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              aria-label={ariaLabel}
              aria-labelledby={ariaLabelledBy}
              aria-describedby={ariaDescribedByValue}
              aria-required={ariaRequired}
              aria-invalid={hasError}
              role="spinbutton"
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={isValidValue ? currentNumericValue : undefined}
              aria-valuetext={ariaValueText}
            />
          </FlexBoxItem>
          {!!suffix && <FlexBoxItem flex="initial">{suffix}</FlexBoxItem>}
        </Box>
      </div>
      {error && (
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
      )}
    </FlexBox>
  );
}
