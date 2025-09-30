import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/utils/utils';
import type { Column } from '@tanstack/react-table';
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon, EyeOffIcon } from 'lucide-react';
import type { HTMLAttributes } from 'react';

interface DataTableColumnHeaderProps<TData, TValue> extends HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  // Get the current sort direction for this column
  const currentDirection = column.getIsSorted();

  // Use direct method to set sort with an explicit direction
  const setSorting = (direction: 'asc' | 'desc' | false) => {
    // If we're clearing a sort, use an empty array
    if (direction === false) {
      column.toggleSorting(undefined, false);
      return;
    }

    // Set explicit sort with the direction
    // The second param (false) prevents multi-sort
    column.toggleSorting(direction === 'desc', false);
  };

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 text-foreground transition-colors duration-200 hover:bg-[color-mix(in_srgb,var(--system-blue)_8%,transparent)] focus-visible:ring-2 focus-visible:ring-blue-500 data-[state=open]:bg-[color-mix(in_srgb,var(--system-blue)_8%,transparent)]"
          >
            <span>{title}</span>
            {currentDirection === 'desc' ? (
              <ArrowDownIcon className="ml-2 h-4 w-4" />
            ) : currentDirection === 'asc' ? (
              <ArrowUpIcon className="ml-2 h-4 w-4" />
            ) : (
              <ChevronsUpDownIcon className="ml-2 h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          <DropdownMenuItem onClick={() => setSorting('asc')}>
            <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSorting('desc')}>
            <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-border" />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOffIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground" />
            Hide
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
