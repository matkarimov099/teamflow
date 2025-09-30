import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Agent } from '@/features/ai-agents/types';
import { useDisclosure } from '@/hooks/use-disclosure';
import type { Row, Table as TanstackTable } from '@tanstack/react-table';

import { CopyIcon, EditIcon, EllipsisIcon, HeartIcon, TrashIcon } from 'lucide-react';
import { DeleteAgent } from './actions/DeleteAgent';
import { UpdateAgent } from './actions/UpdateAgent';

interface DataTableRowActionsProps {
  row: Row<Agent>;
  table: TanstackTable<Agent>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const {
    isOpen: deleteDialogOpen,
    onOpen: openDeleteDialog,
    onOpenChange: setDeleteDialogOpen,
  } = useDisclosure();

  const {
    isOpen: updateDialogOpen,
    onOpen: openUpdateDialog,
    onOpenChange: setUpdateDialogOpen,
  } = useDisclosure();

  const agent = row.original;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <EllipsisIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={openUpdateDialog} className="flex items-center gap-2">
            <EditIcon className="h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <CopyIcon className="h-4 w-4" />
            Make a copy
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2">
            <HeartIcon className="h-4 w-4" />
            Favorite
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={openDeleteDialog}
            className="flex items-center gap-2 text-destructive focus:text-destructive"
          >
            <TrashIcon className="h-4 w-4" />
            Delete
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <UpdateAgent open={updateDialogOpen} onOpenChange={setUpdateDialogOpen} agent={agent} />

      <DeleteAgent
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        agentId={agent.id}
        agentName={agent.name}
      />
    </>
  );
}
