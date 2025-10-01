import type { RadioOptionProps } from '@/features/time-tracking/types';
import { cn } from '@/utils/utils';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Check } from 'lucide-react';
import { forwardRef } from 'react';

export const RadioOption = forwardRef<HTMLButtonElement, RadioOptionProps>(
  ({ value, label, icon: Icon, className, description }, ref) => {
    return (
      <RadioGroupPrimitive.Item
        ref={ref}
        value={value}
        className={cn(
          'group relative flex items-center gap-3 p-3.5 rounded-lg border-2 transition-all cursor-pointer',
          'border-border bg-card hover:bg-accent/50',
          'data-[state=checked]:border-blue-500 dark:data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-50 dark:data-[state=checked]:bg-blue-950/50 data-[state=checked]:shadow-sm',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          className
        )}
      >
        {/* Custom Radio Visual */}
        <div className="relative flex items-center justify-center size-5 shrink-0">
          <div
            className={cn(
              'size-5 rounded-full border-2 transition-all flex items-center justify-center',
              'border-border',
              'group-data-[state=checked]:border-blue-600 dark:group-data-[state=checked]:border-blue-400 group-data-[state=checked]:bg-blue-600 dark:group-data-[state=checked]:bg-blue-500'
            )}
          >
            <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
              <Check className="size-3 text-white" strokeWidth={3} />
            </RadioGroupPrimitive.Indicator>
          </div>
        </div>

        {/* Icon */}
        {Icon && (
          <div
            className={cn(
              'p-2.5 rounded-lg transition-all',
              'bg-muted',
              'group-data-[state=checked]:bg-blue-200 dark:group-data-[state=checked]:bg-blue-800/80 group-data-[state=checked]:shadow-sm'
            )}
          >
            <Icon
              className={cn(
                'size-5 transition-colors',
                'text-muted-foreground',
                'group-data-[state=checked]:text-blue-700 dark:group-data-[state=checked]:text-blue-300'
              )}
            />
          </div>
        )}

        {/* Label Text */}
        <div className="flex-1">
          <p
            className={cn(
              'font-medium text-sm transition-colors',
              'text-foreground',
              'group-data-[state=checked]:text-blue-700 dark:group-data-[state=checked]:text-blue-300'
            )}
          >
            {label}
          </p>
          {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
        </div>
      </RadioGroupPrimitive.Item>
    );
  }
);

RadioOption.displayName = 'RadioOption';
