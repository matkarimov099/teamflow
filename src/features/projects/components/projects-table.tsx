import { LazyComponent } from '@/components/common/lazy-component.tsx';
import { DataTable } from '@/components/data-table/data-table.tsx';
import { getColumns } from '@/features/projects/components/columns.tsx';
import type { Project } from '@/features/projects/types.ts';
import { useExportConfig } from '@/features/projects/utils/config.ts';
import { projectsTableConfig } from '@/features/projects/utils/table-config.ts';
import { lazy } from 'react';
import { useProjectsData } from '../utils/data-fetching';

const ToolbarOptions = lazy(() => import('@/features/projects/components/toolbar-options.tsx'));

const ProjectsTable = () => {
  const {
    projects,
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
  } = useProjectsData();

  const exportConfig = useExportConfig();

  return (
    <DataTable<Project>
      getColumns={getColumns}
      data={projects}
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
      config={projectsTableConfig}
    />
  );
};

export default ProjectsTable;
