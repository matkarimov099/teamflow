import { format } from 'date-fns';

export function humanizeDate(date: string | number | Date) {
  if (!date) return '—';
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return 'Invalid date';
  return format(parsedDate, 'dd-MM-yyyy');
}

export function humanizeDateTime(date: string | number | Date) {
  if (!date) return '—'; // Handle null/undefined
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return 'Invalid date'; // Handle invalid dates

  return format(parsedDate, 'dd/MM/yyyy HH:mm'); // Format valid date
}

export function humanizeBirthday(date: string | number | Date) {
  if (!date) return '—';
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return 'Invalid date';
  return format(parsedDate, 'dd/MM/yyyy');
}

export function humanizeCurrency(amount: number) {
  return amount.toLocaleString('uz-UZ');
}

export const formatNumber = (
  value: number | undefined,
  format: 'space' | 'dot' | 'comma',
  currencySymbol?: string,
  disableDecimals: boolean = Boolean(true) // Default to no decimals
): string => {
  if (value === undefined || value === null) return '';

  const formatter = new Intl.NumberFormat('uz-UZ', {
    minimumFractionDigits: disableDecimals ? 0 : 2,
    maximumFractionDigits: disableDecimals ? 0 : 2,
  });

  let formattedValue = formatter.format(value);

  switch (format) {
    case 'space':
      formattedValue = formattedValue.replace(/,/g, ' '); // 1 000 000
      break;
    case 'dot':
      formattedValue = formattedValue.replace(/,/g, '.'); // 1.000.000
      break;
    default:
      break; // "comma" remains unchanged, so no need to assign it to itself
  }

  return currencySymbol ? `${formattedValue} ${currencySymbol}` : formattedValue; // Append currency
};

/**
 * Formats a number into a compact, human-readable string representation
 * @param value - The number to format
 * @param options - Formatting options
 * @returns Formatted string (e.g., "1.5K", "2.3M", "500")
 *
 * @example
 * humanizeCompactNumber(1500) // "1.5K"
 * humanizeCompactNumber(2300000) // "2.3M"
 * humanizeCompactNumber(500) // "500"
 * humanizeCompactNumber(1500, { decimals: 0 }) // "2K"
 * humanizeCompactNumber(1500000, { notation: 'standard' }) // "1,500,000"
 */
export function humanizeCompactNumber(
  value: number | undefined | null,
  options?: {
    decimals?: number;
    locale?: string;
    notation?: 'compact' | 'standard';
    useGrouping?: boolean;
  }
): string {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return '0';
  }

  const {
    decimals = 1,
    locale = 'en-US',
    notation = 'compact',
    useGrouping = true,
  } = options || {};

  // For compact notation, use Intl.NumberFormat with compact display
  if (notation === 'compact') {
    const formatter = new Intl.NumberFormat(locale, {
      notation: 'compact',
      compactDisplay: 'short',
      maximumFractionDigits: decimals,
      minimumFractionDigits: 0,
      useGrouping: false,
    });

    return formatter.format(value);
  }

  // For standard notation with grouping
  const formatter = new Intl.NumberFormat(locale, {
    notation: 'standard',
    maximumFractionDigits: decimals,
    minimumFractionDigits: 0,
    useGrouping,
  });

  return formatter.format(value);
}
