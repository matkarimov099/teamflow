import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { Analysis } from '@/features/analysis/types';
import { useDisclosure } from '@/hooks/use-disclosure';
import type { Row, Table as TanstackTable } from '@tanstack/react-table';

import { DownloadIcon, EllipsisIcon, EyeIcon, TrashIcon } from 'lucide-react';
import { DeleteAnalysis } from './actions/DeleteAnalysis';
import { ViewAnalysis } from './actions/ViewAnalysis';

interface DataTableRowActionsProps {
  row: Row<Analysis>;
  table: TanstackTable<Analysis>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const {
    isOpen: deleteDialogOpen,
    onOpen: openDeleteDialog,
    onOpenChange: setDeleteDialogOpen,
  } = useDisclosure();

  const {
    isOpen: viewDialogOpen,
    onOpen: openViewDialog,
    onOpenChange: setViewDialogOpen,
  } = useDisclosure();

  const analysis = row.original;

  const handleDownload = () => {
    const blob = new Blob([analysis.response], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analysis-${analysis.project.name}-${analysis.dateFrom}-${analysis.dateTo}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
          <DropdownMenuItem onClick={openViewDialog} className="flex items-center gap-2">
            <EyeIcon className="h-4 w-4" />
            View Details
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDownload} className="flex items-center gap-2">
            <DownloadIcon className="h-4 w-4" />
            Download Report
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

      <ViewAnalysis open={viewDialogOpen} onOpenChange={setViewDialogOpen} analysis={analysis} />

      <DeleteAnalysis
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        analysisId={analysis.id}
        projectName={analysis.project.name}
      />
    </>
  );
}
