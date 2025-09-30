import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Table } from '@tanstack/react-table';
import { DownloadIcon, Loader2 } from 'lucide-react';
import { type JSX, useState } from 'react';
import { toast } from 'sonner';
import { exportData, exportToCSV, exportToExcel } from './utils/export-utils';

interface DataTableExportProps<TData> {
  table: Table<TData>;
  data: TData[];
  selectedData?: TData[];
  getSelectedItems?: () => Promise<TData[]>;
  getAllItems?: () => Promise<TData[]>;
  entityName?: string;
  columnMapping?: Record<string, string>;
  columnWidths?: Array<{ wch: number }>;
  headers?: string[];
  size?: 'sm' | 'default' | 'lg';
}

export function DataTableExport<TData>({
  table,
  data,
  selectedData,
  getSelectedItems,
  getAllItems,
  entityName = 'items',
  columnMapping,
  columnWidths,
  // headers,
  size = 'default',
}: DataTableExportProps<TData>): JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  const handleExport = async (type: 'csv' | 'excel') => {
    if (isLoading) return; // Prevent multiple export requests

    // Create a data fetching function based on the current state
    const fetchExportData = async (): Promise<TData[]> => {
      // If we have selected items and a function to get their complete data
      if (getSelectedItems && selectedData && selectedData.length > 0) {
        // Check if data is on the current page or needs to be fetched
        if (selectedData.some(item => Object.keys(item as object).length === 0)) {
          // We have placeholder data, need to fetch complete data
          toast.loading('Preparing export', {
            description: `Fetching ${entityName} data`,
            id: 'export-data-toast',
          });
        }

        // Fetch complete data for selected items
        const selectedItems = await getSelectedItems();

        if (selectedItems.length === 0) {
          throw new Error(`Failed to retrieve ${entityName} data`);
        }

        // Order the items according to the current sorting in the table
        // This preserves the table's page order in the exported data
        const sortedItems = [...selectedItems];
        const sorting = table.getState().sorting;

        if (sorting.length > 0) {
          const { id: sortField, desc: isDescending } = sorting[0];

          sortedItems.sort((a, b) => {
            const valueA = a[sortField as keyof TData];
            const valueB = b[sortField as keyof TData];

            if (valueA === valueB) return 0;

            if (valueA === null || valueA === undefined) return isDescending ? 1 : -1;
            if (valueB === null || valueB === undefined) return isDescending ? -1 : 1;

            if (typeof valueA === 'string' && typeof valueB === 'string') {
              return isDescending ? valueB.localeCompare(valueA) : valueA.localeCompare(valueB);
            }

            return isDescending ? (valueB > valueA ? 1 : -1) : valueA > valueB ? 1 : -1;
          });
        }

        return sortedItems;
      }

      if (getAllItems && !selectedData?.length) {
        // If we're exporting all data and have a method to get it with proper ordering
        toast.loading('Preparing export', {
          description: `Fetching all ${entityName} data`,
          id: 'export-data-toast',
        });

        // Fetch all data with server-side sorting applied
        const allItems = await getAllItems();

        if (allItems.length === 0) {
          throw new Error(`No ${entityName} data available`);
        }

        return allItems;
      }

      // Otherwise use the provided data (current page data)
      if (!data || data.length === 0) {
        throw new Error('No data to export');
      }
      return selectedData && selectedData.length > 0 ? selectedData : data;
    };

    try {
      // Get visible columns from the table
      const visibleColumns = table
        .getAllColumns()
        .filter(column => column.getIsVisible())
        .filter(column => column.id !== 'actions' && column.id !== 'select');

      // Generate export options based on visible columns and respect column order
      const columnOrder = table.getState().columnOrder;
      const orderedVisibleColumns =
        columnOrder.length > 0
          ? [...visibleColumns].sort((a, b) => {
              const aIndex = columnOrder.indexOf(a.id);
              const bIndex = columnOrder.indexOf(b.id);
              // If the column isn't in the order array, put it at the end
              if (aIndex === -1) return 1;
              if (bIndex === -1) return -1;
              return aIndex - bIndex;
            })
          : visibleColumns;

      // Generate export headers based on ordered columns
      const exportHeaders = orderedVisibleColumns.map(column => column.id);

      // Auto-generate column mapping from table headers if not provided
      const exportColumnMapping =
        columnMapping ||
        (() => {
          const mapping: Record<string, string> = {};
          for (const column of orderedVisibleColumns) {
            // Try to get header text if available
            const headerText = column.columnDef.header as string;

            if (headerText) {
              mapping[column.id] = headerText;
            } else {
              // Fallback to formatted column ID
              mapping[column.id] = column.id
                .split(/(?=[A-Z])|_/)
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
            }
          }
          return mapping;
        })();

      // Filter column widths to match visible columns and their order
      const exportColumnWidths = columnWidths
        ? orderedVisibleColumns.map(column => {
            const originalIndex = visibleColumns.findIndex(vc => vc.id === column.id);
            return columnWidths[originalIndex] || { wch: 15 };
          })
        : orderedVisibleColumns.map(() => ({ wch: 15 }));

      // Use the generic export function with proper options
      await exportData(
        type,
        fetchExportData as () => Promise<Record<string, unknown>[]>,
        () => setIsLoading(true),
        () => setIsLoading(false),
        {
          entityName,
          headers: exportHeaders,
          columnMapping: exportColumnMapping,
          columnWidths: exportColumnWidths,
        }
      );
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Export failed', {
        description: 'Please try again',
        id: 'export-data-toast',
      });
      setIsLoading(false);
    }
  };

  const exportAllPages = async (type: 'csv' | 'excel') => {
    if (isLoading || !getAllItems) return;
    setIsLoading(true);

    try {
      // Show toast for long operations
      toast.loading('Preparing export', {
        description: `Fetching all ${entityName} data`,
        id: 'export-data-toast',
      });

      // Fetch all data with server-side sorting
      const allData = await getAllItems();

      if (allData.length === 0) {
        toast.error('Export failed', {
          description: 'No data to export',
          id: 'export-data-toast',
        });
        return;
      }

      // Get visible columns and apply export
      const visibleColumns = table
        .getAllColumns()
        .filter(column => column.getIsVisible())
        .filter(column => column.id !== 'actions' && column.id !== 'select');

      const exportHeaders = visibleColumns.map(column => column.id);
      const exportColumnMapping =
        columnMapping ||
        (() => {
          const mapping: Record<string, string> = {};
          for (const column of visibleColumns) {
            const headerText = column.columnDef.header as string;

            if (headerText) {
              mapping[column.id] = headerText;
            } else {
              mapping[column.id] = column.id
                .split(/(?=[A-Z])|_/)
                .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                .join(' ');
            }
          }
          return mapping;
        })();

      const exportColumnWidths = columnWidths
        ? visibleColumns.map((_, index) => columnWidths[index] || { wch: 15 })
        : visibleColumns.map(() => ({ wch: 15 }));

      // Update toast for processing
      toast.loading('Processing data', {
        description: 'Generating file',
        id: 'export-data-toast',
      });

      // Generate timestamp for filename
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `${entityName}-all-pages-export-${timestamp}`;

      // Export based on type
      let success: boolean;
      if (type === 'csv') {
        success = exportToCSV(allData as Record<string, unknown>[], filename, exportHeaders);
      } else {
        success = await exportToExcel(
          allData as Record<string, unknown>[],
          filename,
          exportColumnMapping,
          exportColumnWidths,
          exportHeaders
        );
      }

      if (success) {
        toast.success('Export successful', {
          description: 'All data exported successfully'
            .replace('{count}', allData.length.toString())
            .replace('{entity}', entityName)
            .replace('{format}', type.toUpperCase()),
          id: 'export-data-toast',
        });
      }
    } catch (error) {
      console.error('Error exporting all pages:', error);
      toast.error('Export failed', {
        description: 'Please try again',
        id: 'export-data-toast',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Check if any rows are selected
  const hasSelection = selectedData && selectedData.length > 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={size}
          disabled={isLoading}
          leftIcon={
            isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <DownloadIcon className="h-4 w-4" />
            )
          }
          hideIcon={false}
          aria-label={hasSelection ? `Export selected ${entityName}` : `Export all ${entityName}`}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {hasSelection ? (
          <>
            <DropdownMenuItem onClick={() => handleExport('csv')} disabled={isLoading}>
              {'Export Selected as CSV'}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('excel')} disabled={isLoading}>
              {'Export Selected as Excel'}
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuItem
              className="px-2"
              onClick={() => handleExport('csv')}
              disabled={isLoading}
            >
              {'Export Current Page as CSV'}
            </DropdownMenuItem>
            <DropdownMenuItem
              className="px-2"
              onClick={() => handleExport('excel')}
              disabled={isLoading}
            >
              {'Export Current Page as Excel'}
            </DropdownMenuItem>
            {getAllItems && (
              <>
                <DropdownMenuItem
                  className="px-2"
                  onClick={() => exportAllPages('csv')}
                  disabled={isLoading}
                >
                  {'Export All Pages as CSV'}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="px-2"
                  onClick={() => exportAllPages('excel')}
                  disabled={isLoading}
                >
                  {'Export All Pages as Excel'}
                </DropdownMenuItem>
              </>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
