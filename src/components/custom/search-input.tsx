import { Search, X } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/utils/utils';

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'> {
  value?: string;
  onValueChange?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  showClearButton?: boolean;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      value = '',
      onValueChange,
      onClear,
      placeholder = 'Search...',
      className,
      inputClassName,
      showClearButton = true,
      ...props
    },
    ref
  ) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      onValueChange?.(event.target.value);
    };

    const handleClear = () => {
      onValueChange?.('');
      onClear?.();
    };

    return (
      <div className={cn('relative', className)}>
        <Search className="absolute top-2.5 left-2 h-4 w-4 text-gray-500" />
        <Input
          ref={ref}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          className={cn(
            'w-[300px] rounded-md border border-[var(--control-border)] bg-background/80 pl-8 text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-blue-500 focus-visible:ring-offset-0 focus:border-blue-500',
            inputClassName
          )}
          {...props}
        />
        {showClearButton && value && (
          <Button
            variant="ghost"
            onClick={handleClear}
            className="absolute top-0 right-0 h-full px-3 py-0 hover:bg-transparent"
            type="button"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';

export { SearchInput };
