import { CheckIcon, ChevronDown, XCircle, XIcon } from 'lucide-react';
import * as React from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/utils/utils.ts';

/**
 * Simple option interface
 */
interface MultiSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

/**
 * Simplified props interface
 */
interface MultiSelectProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onValueChange'> {
  options: MultiSelectOption[];
  onValueChange: (value: string[]) => void;
  defaultValue?: string[];
  placeholder?: string;
  maxCount?: number;
  disabled?: boolean;
  className?: string;
  searchable?: boolean;
  emptyIndicator?: React.ReactNode;
  size?: 'xs' | 'default' | 'sm' | 'lg' | 'md' | 'xl';
}

/**
 * Simplified MultiSelect component
 */
const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options = [],
      size = 'default',
      onValueChange,
      defaultValue = [],
      placeholder = 'Select options...',
      maxCount = 3,
      disabled = false,
      className,
      searchable = true,
      emptyIndicator = 'No results found.',
      ...props
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValue);
    const [isOpen, setIsOpen] = React.useState(false);
    const [searchValue, setSearchValue] = React.useState('');

    const handleSelect = React.useCallback(
      (value: string) => {
        setSelectedValues(prev => {
          const newSelected = prev.includes(value)
            ? prev.filter(item => item !== value)
            : [...prev, value];
          onValueChange(newSelected);
          return newSelected;
        });
      },
      [onValueChange]
    );

    const handleClear = React.useCallback(() => {
      setSelectedValues([]);
      onValueChange([]);
    }, [onValueChange]);

    const filteredOptions = React.useMemo(() => {
      if (!searchable || !searchValue) return options;
      return options.filter(option =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      );
    }, [options, searchValue, searchable]);

    const displayedValues = selectedValues.slice(0, maxCount);
    const extraCount = selectedValues.length - maxCount;

    return (
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            size={size}
            ref={ref}
            variant="outline"
            aria-expanded={isOpen}
            disabled={disabled}
            className={cn(
              ' flex min-h-fit w-full items-center justify-start rounded-md border border-input bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              className
            )}
            {...props}
          >
            <div className="flex-1 pr-8 py-2 text-left">
              {selectedValues.length === 0 ? (
                <span className="text-sm block text-left ">{placeholder}</span>
              ) : (
                <div className="flex flex-wrap items-center gap-1 overflow-hidden">
                  {displayedValues.map(value => {
                    const option = options.find(opt => opt.value === value);
                    if (!option) return null;

                    return (
                      <Badge
                        key={value}
                        variant="outline"
                        className={cn('flex items-center gap-1')}
                      >
                        <span>{option.label}</span>
                        <button
                          type="button"
                          onClick={e => {
                            e.stopPropagation();
                            handleSelect(value);
                          }}
                          className="cursor-pointer rounded-sm p-0.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 border-0 bg-transparent"
                          aria-label={`Remove ${option.label}`}
                        >
                          <XCircle className="h-3 w-3" />
                        </button>
                      </Badge>
                    );
                  })}

                  {extraCount > 0 && (
                    <Badge variant="default" className={cn('flex items-center gap-1')}>
                      <span>+{extraCount} more</span>
                      <button
                        type="button"
                        onClick={e => {
                          e.stopPropagation();
                          handleClear();
                        }}
                        className="h-4 w-4 cursor-pointer hover:opacity-70"
                        aria-label="Clear all extra selections"
                      >
                        <XCircle className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}

                  {selectedValues.length > 0 && (
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        handleClear();
                      }}
                      className="h-4 w-4 cursor-pointer text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 rounded-sm ml-1"
                      aria-label="Clear all selections"
                    >
                      <XIcon className="h-4 w-4" />
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <ChevronDown className="h-4 w-4 opacity-50" />
            </div>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <Command>
            {searchable && (
              <CommandInput
                placeholder="Search options..."
                value={searchValue}
                onValueChange={setSearchValue}
              />
            )}
            <CommandList>
              <CommandEmpty>{emptyIndicator}</CommandEmpty>
              <CommandGroup>
                {filteredOptions.map(option => {
                  const isSelected = selectedValues.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => handleSelect(option.value)}
                      disabled={option.disabled}
                      className="flex items-center justify-between"
                    >
                      <span>{option.label}</span>
                      {isSelected && <CheckIcon className="h-4 w-4 text-primary" />}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

MultiSelect.displayName = 'MultiSelect';

export { MultiSelect, type MultiSelectOption, type MultiSelectProps };
