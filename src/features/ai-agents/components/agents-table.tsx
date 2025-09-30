import { LazyComponent } from '@/components/common/lazy-component.tsx';
import { DataTable } from '@/components/data-table/data-table.tsx';
import { getColumns } from '@/features/ai-agents/components/columns.tsx';
import type { Agent } from '@/features/ai-agents/types.ts';
import { useExportConfig } from '@/features/ai-agents/utils/config.ts';
import { agentsTableConfig } from '@/features/ai-agents/utils/table-config.ts';
import { lazy } from 'react';
import { useAgentsData } from '../utils/data-fetching';

const ToolbarOptions = lazy(() => import('@/features/ai-agents/components/toolbar-options.tsx'));

const AgentsTable = () => {
  const {
    agents,
    total,
    isFetching,
    currentPage,
    pageSize,
    onPageChange,
    onPageSizeChange,
    sorting,
    onSortingChange,
    search,
    onSearchChange,
  } = useAgentsData();

  const exportConfig = useExportConfig();

  return (
    <DataTable<Agent>
      getColumns={getColumns}
      data={agents}
      totalItems={total}
      isLoading={isFetching}
      currentPage={currentPage}
      pageSize={pageSize}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      sorting={sorting}
      onSortingChange={onSortingChange}
      searchValue={search}
      onSearchChange={onSearchChange}
      exportConfig={exportConfig}
      idField="id"
      pageSizeOptions={[10, 20, 30, 40, 50, 100, 150]}
      renderToolbarContent={() => (
        <LazyComponent>
          <ToolbarOptions />
        </LazyComponent>
      )}
      config={agentsTableConfig}
    />
  );
};

export default AgentsTable;
