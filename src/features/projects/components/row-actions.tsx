import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Project } from '@/features/projects/types';
import { useDisclosure } from '@/hooks/use-disclosure';
import type { Row, Table as TanstackTable } from '@tanstack/react-table';

import { CopyIcon, EditIcon, EllipsisIcon, ExternalLinkIcon, TrashIcon } from 'lucide-react';
import { DeleteProject } from './actions/DeleteProject';
import { UpdateProject } from './actions/UpdateProject';

interface DataTableRowActionsProps {
  row: Row<Project>;
  table: TanstackTable<Project>;
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

  const project = row.original;

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(project.url);
  };

  const handleOpenUrl = () => {
    window.open(project.url, '_blank', 'noopener,noreferrer');
  };

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
          <DropdownMenuItem onClick={handleCopyUrl} className="flex items-center gap-2">
            <CopyIcon className="h-4 w-4" />
            Copy URL
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleOpenUrl} className="flex items-center gap-2">
            <ExternalLinkIcon className="h-4 w-4" />
            Open URL
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

      <UpdateProject open={updateDialogOpen} onOpenChange={setUpdateDialogOpen} project={project} />

      <DeleteProject
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        projectId={project.id}
        projectName={project.name || project.url}
      />
    </>
  );
}
