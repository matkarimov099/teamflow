import { DataTableColumnHeader } from '@/components/data-table/column-header';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Typography } from '@/components/ui/typography';
import type { Agent } from '@/features/ai-agents/types.ts';
import { humanizeDateTime } from '@/utils/humanize.ts';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTableRowActions } from './row-actions';

export const getColumns = (
  handleRowDeselection: ((rowId: string) => void) | null | undefined
): ColumnDef<Agent>[] => {
  // Base columns without the select column
  const baseColumns: ColumnDef<Agent>[] = [
    {
      id: 'rowNumber',
      header: ({ column }) => <DataTableColumnHeader column={column} title="№" />,
      cell: ({ row }) => row.index + 1,
      size: 70,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
      cell: ({ row }) => <div className="truncate text-left font-medium">{row.original.name}</div>,
      size: 200,
    },
    {
      accessorKey: 'description',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Description" />,
      cell: ({ row }) => {
        const description = row.original.description;
        if (!description) {
          return <div className="text-muted-foreground italic">No description</div>;
        }

        const truncatedDescription =
          description.length > 40 ? `${description.substring(0, 40)}...` : description;

        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center truncate cursor-help">
                  <span className="truncate">{truncatedDescription}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-md max-h-60 overflow-y-auto">
                <Typography variant="p" className="whitespace-pre-wrap">
                  {description}
                </Typography>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
      size: 250,
    },
    {
      accessorKey: 'prompt',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Prompt" />,
      cell: ({ row }) => {
        const prompt = row.original.prompt;
        const truncatedPrompt = prompt.length > 50 ? `${prompt.substring(0, 50)}...` : prompt;

        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center truncate cursor-help">
                  <span className="truncate">{truncatedPrompt}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-md max-h-60 overflow-y-auto">
                <Typography variant="p" className="whitespace-pre-wrap">
                  {prompt}
                </Typography>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
      size: 300,
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Created At" />,
      cell: ({ row }) => {
        return (
          <div className="max-w-full truncate text-left">
            {humanizeDateTime(row.original.createdAt)}
          </div>
        );
      },
      size: 120,
    },
    {
      id: 'actions',
      header: ({ column }) => <DataTableColumnHeader column={column} title="Actions" />,
      cell: ({ row, table }) => <DataTableRowActions row={row} table={table} />,
      size: 100,
    },
  ];

  // Only include the select column if row selection is enabled
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
                  // If we have a deselection handler, use it for better cross-page tracking
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

  // Return only the base columns if row selection is disabled
  return baseColumns;
};
