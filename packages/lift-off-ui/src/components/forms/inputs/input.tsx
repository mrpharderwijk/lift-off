import { AlertCircle } from 'lucide-react';
import {
  ChangeEvent,
  InputHTMLAttributes,
  ReactElement,
  useState,
} from 'react';

import { FlexBox } from '@/components/layout';
import { PropsWithRef } from '@/types/props-with-ref';
import { cn } from '@/utils/class-names';
import { Field, FieldLabel } from '@/components/ui/shadcn/field';

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
  PropsWithRef<HTMLInputElement> & {
    id: string;
    label: string;
    formatPrice?: boolean;
    error?: string;
    customAction?: ReactElement | boolean;
    disableError?: boolean;
    autocomplete?: string;
    passwordrules?: string;
  };

export function Input({
  label,
  placeholder,
  ref,
  value,
  error,
  onChange,
  id,
  disabled,
  customAction = false,
  disableError = false,
  ...props
}: InputProps): ReactElement {
  const [isFocused, setIsFocused] = useState(false);
  const errorId = `${id}-error`;
  const isFloating = isFocused || !!value || !!error;
  const [hasPatternError, setHasPatternError] = useState(
    !!value &&
      !!props.pattern &&
      !new RegExp(props.pattern).test(value?.toString())
  );

  const hasError = !!error || hasPatternError;
  const inputContainerClassName = cn(
    'flex flex-row items-center justify-start p-2 gap-2 w-full h-14 border border-border-quarternary rounded-lg transition-all duration-200 outline-offset-2',
    {
      'border-border-secondary-error outline-2 !outline-border-secondary-error':
        hasError && isFocused,
      'border-border-secondary-error bg-bg-primary-error':
        hasError && !isFocused,
      'bg-bg-primary-disabled cursor-not-allowed': !!disabled,
      'outline-2 outline-offset-2': !hasError && isFocused,
    }
  );
  const inputClassName = cn(
    'w-full h-14 pt-5 px-4 pb-1 rounded-lg transition-all duration-200 text-base-lg font-medium text-text-primary outline-none'
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

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    const newValue = e.target.value;

    if (props.pattern) {
      setHasPatternError(
        !!newValue &&
          !!props.pattern &&
          !new RegExp(props.pattern).test(newValue.toString())
      );
    }

    onChange?.(e);
  }

  return (
    <Field>
      <FlexBox flex-direction="col" gap={2} width="full">
        <div className={inputContainerClassName}>
          <FlexBox.Item flex="auto" position="relative">
            <FieldLabel htmlFor={id} className={labelClassName}>
              {label}
            </FieldLabel>
            <input
              {...props}
              id={id}
              ref={ref}
              value={value}
              placeholder={isFloating ? placeholder : ''}
              aria-invalid={hasError}
              aria-describedby={hasError ? errorId : undefined}
              className={inputClassName}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={handleChange}
              disabled={disabled}
            />
          </FlexBox.Item>
          {!!customAction && (
            <FlexBox.Item flex="initial">{customAction}</FlexBox.Item>
          )}
        </div>
        {error && !disableError && (
          <FlexBox
            flex-direction="row"
            align-items="center"
            justify-content="start"
            gap={1}
          >
            <div
              id={errorId}
              className="text-xs text-text-primary-error"
              role="alert"
            >
              <AlertCircle size={16} />
            </div>
            <div className="text-xs text-text-primary-error">{error}</div>
          </FlexBox>
        )}
      </FlexBox>
    </Field>
  );
}
