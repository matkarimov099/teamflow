import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
} from 'date-fns';
import { formatInTimeZone, toDate } from 'date-fns-tz';
import { CalendarIcon, X } from 'lucide-react';
import * as React from 'react';
import type { DateRange } from 'react-day-picker';

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

interface CalendarDatePickerProps extends React.HTMLAttributes<HTMLButtonElement> {
  id?: string;
  className?: string;
  date: DateRange;
  closeOnSelect?: boolean;
  numberOfMonths?: 1 | 2;
  yearsRange?: number;
  onDateSelect: (range: { from: Date | undefined; to: Date | undefined }) => void;
  placeholder?: string;
  allowClear?: boolean;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

export const CalendarDatePicker = React.forwardRef<HTMLButtonElement, CalendarDatePickerProps>(
  (
    {
      id = 'calendar-date-picker',
      className,
      date,
      closeOnSelect = false,
      numberOfMonths = 2,
      yearsRange = 10,
      onDateSelect,
      variant = 'outline',
      placeholder,
      allowClear = true,
      ...props
    },
    ref
  ) => {
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [selectedRange, setSelectedRange] = React.useState<string | null>(
      numberOfMonths === 2 ? 'This Year' : 'Today'
    );
    const [monthFrom, setMonthFrom] = React.useState<Date | undefined>(date?.from);
    const [yearFrom, setYearFrom] = React.useState<number | undefined>(date?.from?.getFullYear());
    const [monthTo, setMonthTo] = React.useState<Date | undefined>(
      numberOfMonths === 2 ? date?.to : date?.from
    );
    const [yearTo, setYearTo] = React.useState<number | undefined>(
      numberOfMonths === 2 ? date?.to?.getFullYear() : date?.from?.getFullYear()
    );
    const [highlightedPart, setHighlightedPart] = React.useState<string | null>(null);

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

    const handleTogglePopover = () => setIsPopoverOpen(prev => !prev);

    const handleClearSelection = (e: React.MouseEvent) => {
      e.stopPropagation();
      // Reset too undefined to clear selection
      onDateSelect({ from: undefined, to: undefined });
      setSelectedRange(null);
      setMonthFrom(new Date());
      setYearFrom(new Date().getFullYear());
      setMonthTo(new Date());
      setYearTo(new Date().getFullYear());
    };

    const selectDateRange = (from: Date, to: Date, range: string) => {
      const startDate = startOfDay(toDate(from, { timeZone }));
      const endDate = numberOfMonths === 2 ? endOfDay(toDate(to, { timeZone })) : startDate;
      onDateSelect({ from: startDate, to: endDate });
      setSelectedRange(range);
      setMonthFrom(from);
      setYearFrom(from.getFullYear());
      setMonthTo(to);
      setYearTo(to.getFullYear());
      if (closeOnSelect) setIsPopoverOpen(false);
    };

    const handleDateSelect = (range: DateRange | undefined) => {
      if (range) {
        let from = startOfDay(toDate(range.from as Date, { timeZone }));
        let to = range.to ? endOfDay(toDate(range.to, { timeZone })) : from;
        if (numberOfMonths === 1) {
          if (range.from !== date.from) {
            to = from;
          } else {
            from = startOfDay(toDate(range.to as Date, { timeZone }));
          }
        }
        onDateSelect({ from, to });
        setMonthFrom(from);
        setYearFrom(from.getFullYear());
        setMonthTo(to);
        setYearTo(to.getFullYear());
      }
      setSelectedRange(null);
    };

    const handleMonthChange = React.useCallback(
      (newMonthIndex: number, part: string) => {
        setSelectedRange(null);
        if (part === 'from') {
          if (yearFrom !== undefined) {
            if (newMonthIndex < 0 || newMonthIndex > yearsRange + 1) return;
            const newMonth = new Date(yearFrom, newMonthIndex, 1);
            const from =
              numberOfMonths === 2
                ? startOfMonth(toDate(newMonth, { timeZone }))
                : date?.from
                  ? new Date(date.from.getFullYear(), newMonth.getMonth(), date.from.getDate())
                  : newMonth;
            const to =
              numberOfMonths === 2
                ? date.to
                  ? endOfDay(toDate(date.to, { timeZone }))
                  : endOfMonth(toDate(newMonth, { timeZone }))
                : from;
            if (from <= to) {
              onDateSelect({ from, to });
              setMonthFrom(newMonth);
              setMonthTo(date.to);
            }
          }
        } else if (yearTo !== undefined) {
          if (newMonthIndex < 0 || newMonthIndex > yearsRange + 1) return;
          const newMonth = new Date(yearTo, newMonthIndex, 1);
          const from = date.from
            ? startOfDay(toDate(date.from, { timeZone }))
            : startOfMonth(toDate(newMonth, { timeZone }));
          const to = numberOfMonths === 2 ? endOfMonth(toDate(newMonth, { timeZone })) : from;
          if (from <= to) {
            onDateSelect({ from, to });
            setMonthTo(newMonth);
            setMonthFrom(date.from);
          }
        }
      },
      [yearFrom, yearsRange, numberOfMonths, timeZone, onDateSelect, yearTo, date?.from, date.to]
    );

    const handleYearChange = React.useCallback(
      (newYear: number, part: string) => {
        setSelectedRange(null);
        if (part === 'from') {
          if (years.includes(newYear)) {
            const newMonth = monthFrom
              ? new Date(newYear, monthFrom ? monthFrom.getMonth() : 0, 1)
              : new Date(newYear, 0, 1);
            const from =
              numberOfMonths === 2
                ? startOfMonth(toDate(newMonth, { timeZone }))
                : date.from
                  ? new Date(newYear, newMonth.getMonth(), date.from.getDate())
                  : newMonth;
            const to =
              numberOfMonths === 2
                ? date.to
                  ? endOfDay(toDate(date.to, { timeZone }))
                  : endOfMonth(toDate(newMonth, { timeZone }))
                : from;
            if (from <= to) {
              onDateSelect({ from, to });
              setYearFrom(newYear);
              setMonthFrom(newMonth);
              setYearTo(date.to?.getFullYear());
              setMonthTo(date.to);
            }
          }
        } else if (years.includes(newYear)) {
          const newMonth = monthTo
            ? new Date(newYear, monthTo.getMonth(), 1)
            : new Date(newYear, 0, 1);
          const from = date.from
            ? startOfDay(toDate(date.from, { timeZone }))
            : startOfMonth(toDate(newMonth, { timeZone }));
          const to = numberOfMonths === 2 ? endOfMonth(toDate(newMonth, { timeZone })) : from;
          if (from <= to) {
            onDateSelect({ from, to });
            setYearTo(newYear);
            setMonthTo(newMonth);
            setYearFrom(date.from?.getFullYear());
            setMonthFrom(date.from);
          }
        }
      },
      [years, monthFrom, numberOfMonths, timeZone, onDateSelect, monthTo, date.from, date.to]
    );

    const dateRanges = React.useMemo(
      () => [
        { label: 'Today', start: today, end: today },
        {
          label: 'Yesterday',
          start: subDays(today, 1),
          end: subDays(today, 1),
        },
        {
          label: 'This Week',
          start: startOfWeek(today, { weekStartsOn: 1 }),
          end: endOfWeek(today, { weekStartsOn: 1 }),
        },
        {
          label: 'Last Week',
          start: subDays(startOfWeek(today, { weekStartsOn: 1 }), 7),
          end: subDays(endOfWeek(today, { weekStartsOn: 1 }), 7),
        },
        {
          label: 'Last 7 Days',
          start: subDays(today, 6),
          end: today,
        },
        {
          label: 'This Month',
          start: startOfMonth(today),
          end: endOfMonth(today),
        },
        {
          label: 'Last Month',
          start: startOfMonth(subDays(today, today.getDate())),
          end: endOfMonth(subDays(today, today.getDate())),
        },
        {
          label: 'This Year',
          start: startOfYear(today),
          end: endOfYear(today),
        },
        {
          label: 'Last Year',
          start: startOfYear(subDays(today, 365)),
          end: endOfYear(subDays(today, 365)),
        },
      ],
      [today]
    );

    const handleMouseOver = (part: string) => {
      setHighlightedPart(part);
    };

    const handleMouseLeave = () => {
      setHighlightedPart(null);
    };

    const handleWheel = React.useCallback(
      (event: React.WheelEvent) => {
        event.preventDefault();
        setSelectedRange(null);
        if (highlightedPart === 'firstDay') {
          const newDate = new Date(date.from as Date);
          const increment = event.deltaY > 0 ? -1 : 1;
          newDate.setDate(newDate.getDate() + increment);
          if (newDate <= (date.to as Date)) {
            if (numberOfMonths === 2) {
              onDateSelect({ from: newDate, to: new Date(date.to as Date) });
            } else {
              onDateSelect({ from: newDate, to: newDate });
            }
            setMonthFrom(newDate);
          } else if (newDate > (date.to as Date) && numberOfMonths === 1) {
            onDateSelect({ from: newDate, to: newDate });
            setMonthFrom(newDate);
          }
        } else if (highlightedPart === 'firstMonth') {
          const currentMonth = monthFrom ? monthFrom.getMonth() : 0;
          const newMonthIndex = currentMonth + (event.deltaY > 0 ? -1 : 1);
          handleMonthChange(newMonthIndex, 'from');
        } else if (highlightedPart === 'firstYear' && yearFrom !== undefined) {
          const newYear = yearFrom + (event.deltaY > 0 ? -1 : 1);
          handleYearChange(newYear, 'from');
        } else if (highlightedPart === 'secondDay') {
          const newDate = new Date(date.to as Date);
          const increment = event.deltaY > 0 ? -1 : 1;
          newDate.setDate(newDate.getDate() + increment);
          if (newDate >= (date.from as Date)) {
            onDateSelect({ from: new Date(date.from as Date), to: newDate });
            setMonthTo(newDate);
          }
        } else if (highlightedPart === 'secondMonth') {
          const currentMonth = monthTo ? monthTo.getMonth() : 0;
          const newMonthIndex = currentMonth + (event.deltaY > 0 ? -1 : 1);
          handleMonthChange(newMonthIndex, 'to');
        } else if (highlightedPart === 'secondYear' && yearTo !== undefined) {
          const newYear = yearTo + (event.deltaY > 0 ? -1 : 1);
          handleYearChange(newYear, 'to');
        }
      },
      [
        highlightedPart,
        numberOfMonths,
        onDateSelect,
        monthFrom,
        yearFrom,
        monthTo,
        yearTo,
        handleMonthChange,
        handleYearChange,
        date.from,
        date.to,
      ]
    );

    React.useEffect(() => {
      const firstDayElement = document.getElementById(`firstDay-${id}`);
      const firstMonthElement = document.getElementById(`firstMonth-${id}`);
      const firstYearElement = document.getElementById(`firstYear-${id}`);
      const secondDayElement = document.getElementById(`secondDay-${id}`);
      const secondMonthElement = document.getElementById(`secondMonth-${id}`);
      const secondYearElement = document.getElementById(`secondYear-${id}`);

      const elements = [
        firstDayElement,
        firstMonthElement,
        firstYearElement,
        secondDayElement,
        secondMonthElement,
        secondYearElement,
      ];

      const addPassiveEventListener = (element: HTMLElement | null) => {
        if (element) {
          element.addEventListener('wheel', handleWheel as unknown as EventListener, {
            passive: false,
          });
        }
      };

      for (const element of elements) {
        addPassiveEventListener(element);
      }

      return () => {
        for (const element of elements) {
          if (element) {
            element.removeEventListener('wheel', handleWheel as unknown as EventListener);
          }
        }
      };
      // Only depend on id and handleWheel to avoid unnecessary reruns
    }, [handleWheel, id]);

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
              size="default"
              onClick={handleTogglePopover}
              suppressHydrationWarning
              aria-label={placeholder || 'Select a date'}
              aria-expanded={isPopoverOpen}
              aria-haspopup="dialog"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span className="flex-1">
                {date?.from ? (
                  date.to ? (
                    <>
                      {' '}
                      <span
                        id={`firstDay-${id}`}
                        className={cn(
                          'date-part',
                          highlightedPart === 'firstDay' && 'font-bold underline'
                        )}
                        onMouseOver={() => handleMouseOver('firstDay')}
                        onFocus={() => handleMouseOver('firstDay')}
                        onMouseLeave={handleMouseLeave}
                        onBlur={handleMouseLeave}
                      >
                        {formatWithTz(date.from, 'dd')}
                      </span>{' '}
                      <span
                        id={`firstMonth-${id}`}
                        className={cn(
                          'date-part',
                          highlightedPart === 'firstMonth' && 'font-bold underline'
                        )}
                        onMouseOver={() => handleMouseOver('firstMonth')}
                        onFocus={() => handleMouseOver('firstMonth')}
                        onMouseLeave={handleMouseLeave}
                        onBlur={handleMouseLeave}
                      >
                        {formatWithTz(date.from, 'LLL')}
                      </span>
                      ,{' '}
                      <span
                        id={`firstYear-${id}`}
                        className={cn(
                          'date-part',
                          highlightedPart === 'firstYear' && 'font-bold underline'
                        )}
                        onMouseOver={() => handleMouseOver('firstYear')}
                        onFocus={() => handleMouseOver('firstYear')}
                        onMouseLeave={handleMouseLeave}
                        onBlur={handleMouseLeave}
                      >
                        {formatWithTz(date.from, 'y')}
                      </span>
                      {numberOfMonths === 2 && (
                        <>
                          {' - '}
                          <span
                            id={`secondDay-${id}`}
                            className={cn(
                              'date-part',
                              highlightedPart === 'secondDay' && 'font-bold underline'
                            )}
                            onMouseOver={() => handleMouseOver('secondDay')}
                            onFocus={() => handleMouseOver('secondDay')}
                            onMouseLeave={handleMouseLeave}
                            onBlur={handleMouseLeave}
                          >
                            {formatWithTz(date.to, 'dd')}
                          </span>{' '}
                          <span
                            id={`secondMonth-${id}`}
                            className={cn(
                              'date-part',
                              highlightedPart === 'secondMonth' && 'font-bold underline'
                            )}
                            onMouseOver={() => handleMouseOver('secondMonth')}
                            onFocus={() => handleMouseOver('secondMonth')}
                            onMouseLeave={handleMouseLeave}
                            onBlur={handleMouseLeave}
                          >
                            {formatWithTz(date.to, 'LLL')}
                          </span>
                          ,{' '}
                          <span
                            id={`secondYear-${id}`}
                            className={cn(
                              'date-part',
                              highlightedPart === 'secondYear' && 'font-bold underline'
                            )}
                            onMouseOver={() => handleMouseOver('secondYear')}
                            onFocus={() => handleMouseOver('secondYear')}
                            onMouseLeave={handleMouseLeave}
                            onBlur={handleMouseLeave}
                          >
                            {formatWithTz(date.to, 'y')}
                          </span>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <span
                        id="day"
                        className={cn(
                          'date-part',
                          highlightedPart === 'day' && 'font-bold underline'
                        )}
                        onMouseOver={() => handleMouseOver('day')}
                        onFocus={() => handleMouseOver('day')}
                        onMouseLeave={handleMouseLeave}
                        onBlur={handleMouseLeave}
                      >
                        {formatWithTz(date.from, 'dd')}
                      </span>{' '}
                      <span
                        id="month"
                        className={cn(
                          'date-part',
                          highlightedPart === 'month' && 'font-bold underline'
                        )}
                        onMouseOver={() => handleMouseOver('month')}
                        onFocus={() => handleMouseOver('month')}
                        onMouseLeave={handleMouseLeave}
                        onBlur={handleMouseLeave}
                      >
                        {formatWithTz(date.from, 'LLL')}
                      </span>
                      ,{' '}
                      <span
                        id="year"
                        className={cn(
                          'date-part',
                          highlightedPart === 'year' && 'font-bold underline'
                        )}
                        onMouseOver={() => handleMouseOver('year')}
                        onFocus={() => handleMouseOver('year')}
                        onMouseLeave={handleMouseLeave}
                        onBlur={handleMouseLeave}
                      >
                        {formatWithTz(date.from, 'y')}
                      </span>
                    </>
                  )
                ) : (
                  <span>{placeholder || 'Select a date'}</span>
                )}
              </span>
              {allowClear && date?.from && (
                <button
                  type="button"
                  onClick={handleClearSelection}
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 z-10 bg-background"
                  aria-label={'Clear'}
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </Button>
          </PopoverTrigger>
          {isPopoverOpen && (
            <PopoverContent
              className={cn('w-fit p-0')}
              align="center"
              avoidCollisions={true}
              onInteractOutside={handleClose}
              onEscapeKeyDown={handleClose}
              style={{
                maxHeight: 'var(--radix-popover-content-available-height)',
                overflowY: 'auto',
              }}
              aria-label={'Select a date'}
            >
              <div
                className={cn(
                  'flex',
                  numberOfMonths === 2
                    ? 'flex-col sm:flex-row gap-2 sm:gap-4 p-2 sm:p-4'
                    : 'flex-col p-4'
                )}
              >
                {numberOfMonths === 2 && (
                  <div className="grid grid-cols-2 gap-1 sm:flex sm:flex-col border-foreground/10 sm:border-r pr-0 sm:pr-4 pb-2 sm:pb-0 border-b sm:border-b-0 text-left min-w-0 sm:min-w-[180px]">
                    {dateRanges.map(({ label, start, end }) => (
                      <Button
                        key={label}
                        variant="ghost"
                        size="sm"
                        className={cn(
                          'justify-start hover:bg-primary hover:text-primary-foreground hover:shadow-sm text-sm',
                          selectedRange === label &&
                            'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground'
                        )}
                        onClick={() => {
                          selectDateRange(start, end, label);
                          setMonthFrom(start);
                          setYearFrom(start.getFullYear());
                          setMonthTo(end);
                          setYearTo(end.getFullYear());
                        }}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                )}
                <div className="flex flex-col flex-1">
                  <div
                    className={cn(
                      'flex items-center gap-4 mb-4',
                      numberOfMonths === 1 ? 'justify-center' : 'flex-col sm:flex-row'
                    )}
                  >
                    <div className="flex gap-2 w-full sm:w-auto justify-center sm:justify-start">
                      <Select
                        onValueChange={value => {
                          handleMonthChange(months.indexOf(value), 'from');
                          setSelectedRange(null);
                        }}
                        value={monthFrom ? months[monthFrom.getMonth()] : undefined}
                      >
                        <SelectTrigger className="w-full sm:w-fit font-medium hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
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
                          handleYearChange(Number(value), 'from');
                          setSelectedRange(null);
                        }}
                        value={yearFrom ? yearFrom.toString() : undefined}
                      >
                        <SelectTrigger className="w-full sm:w-fit font-medium hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
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
                    {numberOfMonths === 2 && (
                      <div className="flex gap-2 w-full sm:w-auto justify-center sm:justify-start">
                        <Select
                          onValueChange={value => {
                            handleMonthChange(months.indexOf(value), 'to');
                            setSelectedRange(null);
                          }}
                          value={monthTo ? months[monthTo.getMonth()] : undefined}
                        >
                          <SelectTrigger className="w-full sm:w-fit font-medium hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
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
                            handleYearChange(Number(value), 'to');
                            setSelectedRange(null);
                          }}
                          value={yearTo ? yearTo.toString() : undefined}
                        >
                          <SelectTrigger className="w-full sm:w-fit font-medium hover:bg-accent hover:text-accent-foreground focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
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
                    )}
                  </div>
                  <div className="w-full">
                    <Calendar
                      mode="range"
                      defaultMonth={monthFrom}
                      month={monthFrom}
                      onMonthChange={setMonthFrom}
                      selected={date}
                      onSelect={handleDateSelect}
                      numberOfMonths={numberOfMonths}
                      showOutsideDays={false}
                      size="large"
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
            </PopoverContent>
          )}
        </Popover>
      </>
    );
  }
);

CalendarDatePicker.displayName = 'CalendarDatePicker';
