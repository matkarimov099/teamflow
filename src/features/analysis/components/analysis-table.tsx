import { LazyComponent } from '@/components/common/lazy-component.tsx';
import { DataTable } from '@/components/data-table/data-table.tsx';
import { getColumns } from '@/features/analysis/components/columns.tsx';
import type { Analysis } from '@/features/analysis/types.ts';
import { useExportConfig } from '@/features/analysis/utils/config.ts';
import { analysisTableConfig } from '@/features/analysis/utils/table-config.ts';
import { lazy } from 'react';
import { useAnalysesData } from '../utils/data-fetching';

const ToolbarOptions = lazy(() => import('@/features/analysis/components/toolbar-options.tsx'));

const AiReportsTable = () => {
  const {
    analyses,
    total,
    isFetching,
    currentPage,
    pageSize,
    onPageChange,
    onPageSizeChange,
    sorting,
    onSortingChange,
  } = useAnalysesData();

  const exportConfig = useExportConfig();

  return (
    <DataTable<Analysis>
      getColumns={getColumns}
      data={analyses}
      totalItems={total}
      isLoading={isFetching}
      currentPage={currentPage}
      pageSize={pageSize}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      sorting={sorting}
      onSortingChange={onSortingChange}
      exportConfig={exportConfig}
      idField="id"
      pageSizeOptions={[10, 20, 30, 40, 50, 100, 150]}
      renderToolbarContent={() => (
        <LazyComponent>
          <ToolbarOptions />
        </LazyComponent>
      )}
      config={analysisTableConfig}
    />
  );
};

export default AiReportsTable;
