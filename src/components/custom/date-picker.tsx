import { formatInTimeZone, toDate } from 'date-fns-tz';
import { CalendarIcon, X } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/utils/utils';

interface DatePickerProps extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string;
  date?: Date;
  closeOnSelect?: boolean;
  yearsRange?: number;
  onDateSelect: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  allowClear?: boolean;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'xs' | 'default' | 'sm' | 'lg' | 'md' | 'xl';
}

export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      className,
      date,
      closeOnSelect = true,
      yearsRange = 10,
      onDateSelect,
      variant = 'outline',
      placeholder,
      disabled = false,
      allowClear = true,
      size = 'default',
      ...props
    },
    ref
  ) => {
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [selectedMonth, setSelectedMonth] = React.useState<Date | undefined>(date || new Date());
    const [selectedYear, setSelectedYear] = React.useState<number | undefined>(
      date?.getFullYear() || new Date().getFullYear()
    );

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const today = React.useMemo(() => new Date(), []);
    const years = React.useMemo(
      () =>
        Array.from({ length: yearsRange + 1 }, (_, i) => today.getFullYear() - yearsRange / 2 + i),
      [yearsRange, today]
    );

    const months = React.useMemo(
      () => [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
      []
    );

    const handleClose = () => setIsPopoverOpen(false);

    const handleTogglePopover = () => {
      if (!disabled) {
        setIsPopoverOpen(prev => !prev);
      }
    };

    const handleClearSelection = (e: React.MouseEvent) => {
      e.stopPropagation();
      onDateSelect(undefined);
    };

    const handleDateSelect = (selectedDate: Date | undefined) => {
      if (selectedDate) {
        const processedDate = toDate(selectedDate, { timeZone });
        onDateSelect(processedDate);
        setSelectedMonth(selectedDate);
        setSelectedYear(selectedDate.getFullYear());
        if (closeOnSelect) {
          setIsPopoverOpen(false);
        }
      }
    };

    const handleMonthChange = React.useCallback(
      (newMonthIndex: number) => {
        if (selectedYear !== undefined) {
          if (newMonthIndex < 0 || newMonthIndex > 11) return;
          const newMonth = new Date(selectedYear, newMonthIndex, 1);
          setSelectedMonth(newMonth);
        }
      },
      [selectedYear]
    );

    const handleYearChange = React.useCallback(
      (newYear: number) => {
        if (years.includes(newYear)) {
          const currentMonth = selectedMonth ? selectedMonth.getMonth() : 0;
          const newMonth = new Date(newYear, currentMonth, 1);
          setSelectedMonth(newMonth);
          setSelectedYear(newYear);
        }
      },
      [years, selectedMonth]
    );

    const formatWithTz = React.useCallback(
      (date: Date, fmt: string) => {
        // Custom formatting for different locales
        if (fmt === 'dd') {
          return date.getDate().toString().padStart(2, '0');
        }

        if (fmt === 'LLL') {
          const monthNames = {
            en: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
            ],
            ru: [
              'Янв',
              'Фев',
              'Мар',
              'Апр',
              'Май',
              'Июн',
              'Июл',
              'Авг',
              'Сен',
              'Окт',
              'Ноя',
              'Дек',
            ],
            uz: [
              'Yan',
              'Fev',
              'Mar',
              'Apr',
              'May',
              'Iyun',
              'Iyul',
              'Avg',
              'Sen',
              'Okt',
              'Noy',
              'Dek',
            ],
          };
          const currentLang = 'en' as keyof typeof monthNames;
          const months = monthNames[currentLang] || monthNames.en;
          return months[date.getMonth()];
        }

        if (fmt === 'y') {
          return date.getFullYear().toString();
        }

        return formatInTimeZone(date, timeZone, fmt);
      },
      [timeZone]
    );

    return (
      <>
        <style>
          {`
            .date-part {
              touch-action: none;
            }
          `}
        </style>
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              id="date"
              ref={ref}
              {...props}
              variant={variant}
              className={cn('w-auto justify-start text-left font-normal relative pr-8', className)}
              size={size}
              onClick={handleTogglePopover}
              disabled={disabled}
              suppressHydrationWarning
              aria-label={placeholder || 'Select a date'}
              aria-expanded={isPopoverOpen}
              aria-haspopup="dialog"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span className="flex-1">
                {date ? (
                  <>
                    <span className="date-part">{formatWithTz(date, 'dd')}</span>{' '}
                    <span className="date-part">{formatWithTz(date, 'LLL')}</span>,{' '}
                    <span className="date-part">{formatWithTz(date, 'y')}</span>
                  </>
                ) : (
                  <span>{placeholder || 'Select a date'}</span>
                )}
              </span>
              {allowClear && date && (
                <button
                  type="button"
                  onClick={handleClearSelection}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 z-10 bg-background"
                  aria-label={'Clear'}
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </Button>
          </PopoverTrigger>
          {isPopoverOpen && (
            <PopoverContent
              className="w-fit p-0"
              align="center"
              avoidCollisions={false}
              onInteractOutside={handleClose}
              onEscapeKeyDown={handleClose}
              style={{
                maxHeight: 'var(--radix-popover-content-available-height)',
                overflowY: 'auto',
              }}
              aria-label={placeholder || 'Select a date'}
            >
              <div className="flex flex-col p-4">
                <div className="flex items-center gap-4 mb-4 justify-center">
                  <div className="flex gap-2">
                    <Select
                      onValueChange={value => {
                        handleMonthChange(months.indexOf(value));
                      }}
                      value={selectedMonth ? months[selectedMonth.getMonth()] : undefined}
                    >
                      <SelectTrigger className="w-fit font-medium hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                        <SelectValue placeholder={'Month'} />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map(month => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select
                      onValueChange={value => {
                        handleYearChange(Number(value));
                      }}
                      value={selectedYear ? selectedYear.toString() : undefined}
                    >
                      <SelectTrigger className="w-fit font-medium hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                        <SelectValue placeholder={'Year'} />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map(year => (
                          <SelectItem key={year} value={year.toString()}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="w-full">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={handleDateSelect}
                    month={selectedMonth}
                    onMonthChange={setSelectedMonth}
                    showOutsideDays={false}
                    size="full"
                    className={className}
                  />
                </div>
              </div>
            </PopoverContent>
          )}
        </Popover>
      </>
    );
  }
);

DatePicker.displayName = 'DatePicker';
