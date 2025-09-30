import type { Table } from '@tanstack/react-table';
import { Settings, Undo2, X } from 'lucide-react';

import { SearchInput } from '@/components/custom/search-input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Typography } from '@/components/ui/typography';
import type { ReactNode } from 'react';
import { DataTableExport } from './data-export';
import type { TableConfig } from './utils/table-config';
import { DataTableViewOptions } from './view-options';

// Helper functions for component sizing
const getButtonSizeClass = (size: 'sm' | 'default' | 'lg') => {
  switch (size) {
    case 'sm':
      return 'h-8 px-3';
    case 'lg':
      return 'h-11 px-5';
    default:
      return '';
  }
};

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  totalSelectedItems?: number;
  deleteSelection?: () => void;
  getSelectedItems?: () => Promise<TData[]>;
  getAllItems?: () => TData[];
  config: TableConfig;
  resetColumnSizing?: () => void;
  resetColumnOrder?: () => void;
  entityName?: string;
  columnMapping?: Record<string, string>;
  columnWidths?: Array<{ wch: number }>;
  headers?: string[];
  customToolbarComponent?: ReactNode;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export function DataTableToolbar<TData>({
  table,
  getSelectedItems,
  getAllItems,
  config,
  resetColumnSizing,
  resetColumnOrder,
  entityName,
  columnMapping,
  columnWidths,
  headers,
  customToolbarComponent,
  searchValue,
  onSearchChange,
}: Omit<DataTableToolbarProps<TData>, 'totalSelectedItems' | 'deleteSelection'>) {
  const isFiltered =
    table.getState().columnFilters.length > 0 ||
    table.getState().globalFilter ||
    (config.manualSearching && searchValue);

  return (
    <div className="flex flex-col gap-3">
      {/* Desktop layout */}
      <div className="hidden lg:flex lg:items-center lg:justify-between">
        {/* Left side - Search */}
        <div className="flex flex-1 items-center gap-2">
          {config.enableSearch && (
            <SearchInput
              placeholder="Search..."
              value={
                config.manualSearching
                  ? (searchValue ?? '')
                  : ((table.getState().globalFilter as string) ?? '')
              }
              onValueChange={value => {
                if (config.manualSearching && onSearchChange) {
                  onSearchChange(value);
                } else {
                  table.setGlobalFilter(value);
                }
              }}
            />
          )}
          {/* Clear filters */}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => {
                table.resetColumnFilters();
                if (config.manualSearching && onSearchChange) {
                  onSearchChange('');
                } else {
                  table.setGlobalFilter('');
                }
              }}
              leftIcon={<X className="h-4 w-4" />}
              hideIcon={false}
              className="h-8 px-2"
              aria-label="Clear all filters"
            />
          )}
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2">
          {/* Custom toolbar component */}
          {customToolbarComponent}

          {config.enableExport && getAllItems && (
            <DataTableExport<TData>
              table={table}
              data={getAllItems()}
              selectedData={[]}
              getSelectedItems={getSelectedItems}
              entityName={entityName}
              columnMapping={columnMapping}
              columnWidths={columnWidths}
              headers={headers}
              size={config.size}
            />
          )}

          {/* Column visibility */}
          {config.enableColumnVisibility && (
            <DataTableViewOptions table={table} size={config.size} />
          )}

          {/* Table settings */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size={config.size === 'sm' ? 'sm' : 'default'}
                leftIcon={<Settings className="h-4 w-4" />}
                hideIcon={false}
                className={`${getButtonSizeClass(config.size)}`}
                aria-label="Open table settings"
              />
            </PopoverTrigger>
            <PopoverContent align="end" className="w-fit">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Typography variant="h4">Table Settings</Typography>
                  <Typography variant="small" className="text-muted-foreground">
                    Manage table layout and column settings
                  </Typography>
                </div>
                <div className="grid gap-2">
                  {config.enableColumnResizing && resetColumnSizing && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetColumnSizing}
                      className="justify-start"
                    >
                      <Undo2 className="mr-2 h-4 w-4" />
                      Reset Column Sizes
                    </Button>
                  )}
                  {resetColumnOrder && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetColumnOrder}
                      className="justify-start"
                    >
                      <Undo2 className="mr-2 h-4 w-4" />
                      Reset Column Order
                    </Button>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex flex-col gap-3 lg:hidden">
        {/* First row - Search and table controls */}
        <div className="flex items-center gap-2">
          {config.enableSearch && (
            <SearchInput
              placeholder="Search..."
              value={
                config.manualSearching
                  ? (searchValue ?? '')
                  : ((table.getState().globalFilter as string) ?? '')
              }
              onValueChange={value => {
                if (config.manualSearching && onSearchChange) {
                  onSearchChange(value);
                } else {
                  table.setGlobalFilter(value);
                }
              }}
              className="flex-1"
              inputClassName="w-full"
            />
          )}

          {/* Clear filters */}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => {
                table.resetColumnFilters();
                if (config.manualSearching && onSearchChange) {
                  onSearchChange('');
                } else {
                  table.setGlobalFilter('');
                }
              }}
              leftIcon={<X className="h-4 w-4" />}
              hideIcon={false}
              className="h-8 px-2"
              aria-label="Clear all filters"
            />
          )}

          {/* Table controls */}
          <div className="flex items-center gap-2">
            {config.enableExport && getAllItems && (
              <DataTableExport<TData>
                table={table}
                data={getAllItems()}
                selectedData={[]}
                getSelectedItems={getSelectedItems}
                entityName={entityName}
                columnMapping={columnMapping}
                columnWidths={columnWidths}
                headers={headers}
                size={config.size}
              />
            )}

            {/* Column visibility */}
            {config.enableColumnVisibility && (
              <DataTableViewOptions table={table} size={config.size} />
            )}

            {/* Table settings */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size={config.size === 'sm' ? 'sm' : 'default'}
                  leftIcon={<Settings className="h-4 w-4" />}
                  hideIcon={false}
                  className={`${getButtonSizeClass(config.size)}`}
                  aria-label="Open table settings"
                />
              </PopoverTrigger>
              <PopoverContent align="end" className="w-fit">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Typography variant="h4">Table Settings</Typography>
                    <Typography variant="small" className="text-muted-foreground">
                      Manage table layout and column settings
                    </Typography>
                  </div>
                  <div className="grid gap-2">
                    {config.enableColumnResizing && resetColumnSizing && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={resetColumnSizing}
                        className="justify-start"
                      >
                        <Undo2 className="mr-2 h-4 w-4" />
                        Reset Column Sizes
                      </Button>
                    )}
                    {resetColumnOrder && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={resetColumnOrder}
                        className="justify-start"
                      >
                        <Undo2 className="mr-2 h-4 w-4" />
                        Reset Column Order
                      </Button>
                    )}
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Second row - Custom toolbar component (full width) */}
        {customToolbarComponent && <div className="w-full">{customToolbarComponent}</div>}
      </div>
    </div>
  );
}
