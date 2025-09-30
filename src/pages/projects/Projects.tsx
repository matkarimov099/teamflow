import { LazyComponent } from '@/components/common/lazy-component.tsx';
import { lazy } from 'react';

// Lazy load the heavy projects table component
const ProjectsTable = lazy(() => import('@/features/projects/components/projects-table.tsx'));

const Projects = () => {
  return (
    <div>
      {/* DataTable with custom configuration */}
      <LazyComponent>
        <ProjectsTable />
      </LazyComponent>
    </div>
  );
};

export default Projects;
