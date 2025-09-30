import * as React from 'react';
import { forwardRef } from 'react';

import { Typography } from '@/components/ui/typography';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { cn } from '@/utils/utils';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  inputSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | string;
  label?: string;
  error?: string;
  helperText?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      inputSize = 'md',
      label,
      error,
      helperText,
      id,
      'aria-describedby': ariaDescribedBy,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const generatedId = React.useId();
    const inputId = id || generatedId;
    const errorId = error ? `${inputId}-error` : undefined;
    const helperTextId = helperText ? `${inputId}-helper` : undefined;

    const describedBy =
      [ariaDescribedBy, errorId, helperTextId].filter(Boolean).join(' ') || undefined;

    // Apply reduced motion classes if the user prefers reduced motion
    const motionAwareClassName = React.useMemo(() => {
      return cn(
        'flex w-full bg-control border-control rounded-md text-primary font file:border-0 file:bg-transparent file:font-medium file:text-primary placeholder:text-secondary placeholder:opacity-75 placeholder:text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 appearance-none',
        // Focus styles - blue focus ring (smaller)
        'focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0 focus:border-blue-500',
        // Transition with conditional duration
        prefersReducedMotion ? 'transition-colors duration-0' : 'transition-fast',
        // Size-specific classes
        inputSize === 'xs' && 'h-7 text-xs px-2 py-1 rounded-sm',
        inputSize === 'sm' && 'h-8 text-sm px-3 py-1.5 rounded-md',
        inputSize === 'md' && 'h-9 text-base px-4 py-2 rounded-md',
        inputSize === 'lg' && 'h-11 text-lg px-5 py-2.5 rounded-lg',
        inputSize === 'xl' && 'h-12 text-xl px-6 py-3 rounded-lg',
        // Error state
        error && 'border-[var(--system-red)] focus:border-[var(--system-red)]',
        className
      );
    }, [inputSize, className, prefersReducedMotion, error]);

    return (
      <div className="space-y-1">
        {label && (
          <label htmlFor={inputId} className="block font text-primary text-sm">
            {label}
            {props.required && (
              <span className="ml-1 text-red" aria-label="required">
                *
              </span>
            )}
          </label>
        )}

        <input
          type={type}
          id={inputId}
          data-size={inputSize}
          className={motionAwareClassName}
          ref={ref}
          aria-describedby={describedBy}
          aria-invalid={error ? 'true' : undefined}
          {...props}
        />

        {error && (
          <Typography
            id={errorId}
            variant="small"
            className="font text-red"
            role="alert"
            aria-live="polite"
          >
            {error}
          </Typography>
        )}

        {helperText && !error && (
          <Typography id={helperTextId} variant="small" className="font text-secondary">
            {helperText}
          </Typography>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
