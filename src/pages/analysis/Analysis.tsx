import { LazyComponent } from '@/components/common/lazy-component.tsx';
import { lazy } from 'react';

// Lazy load the heavy analysis table component
const AnalysisTable = lazy(() => import('@/features/analysis/components/analysis-table.tsx'));

const Analysis = () => {
  return (
    <div>
      <LazyComponent>
        <AnalysisTable />
      </LazyComponent>
    </div>
  );
};

export default Analysis;
