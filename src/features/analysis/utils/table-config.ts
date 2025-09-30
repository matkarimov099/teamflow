import type { TableConfig } from '@/components/data-table/utils/table-config';

export const analysisTableConfig: Partial<TableConfig> = {
  enableRowSelection: true,
  enableClickRowSelect: false,
  enableKeyboardNavigation: true,
  enableSearch: false,
  enableDateFilter: false,
  enableColumnFilters: false,
  enableColumnVisibility: true,
  enableToolbar: true,
  enablePagination: true,
  enableExport: true,
  enableUrlState: false,
  enableColumnResizing: true,
  columnResizingTableId: 'analysis-table',
  size: 'default',
  manualPagination: true,
  manualSorting: true,
  manualFiltering: true,
  manualSearching: true,
};
