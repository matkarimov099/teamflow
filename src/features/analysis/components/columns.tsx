import { DataTableColumnHeader } from '@/components/data-table/column-header';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import type { Analysis } from '@/features/analysis/types.ts';
import { humanizeDateTime } from '@/utils/humanize.ts';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from './row-actions';

export const getColumns = (
  handleRowDeselection: ((rowId: string) => void) | null | undefined
): ColumnDef<Analysis>[] => {
  const baseColumns: ColumnDef<Analysis>[] = [
    {
      id: 'rowNumber',
      header: ({ column }) => <DataTableColumnHeader column={column} title="№" />,
      cell: ({ row }) => row.index + 1,
      size: 70,
    },
    {
      accessorKey: 'project.name',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Project" />,
      cell: ({ row }) => (
        <div className="truncate text-left font-medium">{row.original.project.name}</div>
      ),
      size: 200,
    },
    {
      accessorKey: 'agent.name',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Agent" />,
      cell: ({ row }) => <div className="truncate text-left">{row.original.agent.name}</div>,
      size: 150,
    },
    {
      accessorKey: 'users',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Users" />,
      cell: ({ row }) => {
        const userCount = row.original.users.length;
        const firstUser = row.original.users[0];
        return (
          <div className="truncate text-left">
            {userCount > 1
              ? `${firstUser?.firstName} ${firstUser?.lastName} +${userCount - 1} more`
              : `${firstUser?.firstName} ${firstUser?.lastName}`}
          </div>
        );
      },
      size: 200,
    },
    {
      accessorKey: 'dateRange',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Date Range" />,
      cell: ({ row }) => (
        <div className="truncate text-left">
          {row.original.dateFrom} - {row.original.dateTo}
        </div>
      ),
      size: 150,
    },
    {
      accessorKey: 'durationSeconds',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Duration" />,
      cell: ({ row }) => {
        const seconds = row.original.durationSeconds;
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return (
          <div className="truncate text-left">
            {minutes > 0 ? `${minutes}m ` : ''}
            {remainingSeconds}s
          </div>
        );
      },
      size: 100,
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
      cell: ({ row }) => (
        <div className="truncate text-left">{humanizeDateTime(row.original.createdAt)}</div>
      ),
      size: 150,
    },
    {
      id: 'actions',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Actions" />,
      cell: ({ row, table }) => <DataTableRowActions row={row} table={table} />,
      size: 100,
    },
  ];

  if (handleRowDeselection !== null) {
    return [
      {
        id: 'select',
        header: ({ table }) => (
          <div className="truncate pl-2">
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected() ||
                (table.getIsSomePageRowsSelected() && 'indeterminate')
              }
              onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
              aria-label="Select all"
              className="translate-y-0.5 cursor-pointer"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="truncate">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={value => {
                if (value) {
                  row.toggleSelected(true);
                } else {
                  row.toggleSelected(false);
                  if (handleRowDeselection) {
                    handleRowDeselection(row.id);
                  }
                }
              }}
              aria-label="Select row"
              className="translate-y-0.5 cursor-pointer"
            />
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
        size: 50,
      },
      ...baseColumns,
    ];
  }

  return baseColumns;
};
