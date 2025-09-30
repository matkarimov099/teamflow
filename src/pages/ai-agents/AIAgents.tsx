import { LazyComponent } from '@/components/common/lazy-component.tsx';
import { lazy } from 'react';

// Lazy load the heavy agents table component
const AgentsTable = lazy(() => import('@/features/ai-agents/components/agents-table.tsx'));

const AIAgents = () => {
  return (
    <div>
      {/* DataTable with custom configuration */}
      <LazyComponent>
        <AgentsTable />
      </LazyComponent>
    </div>
  );
};

export default AIAgents;
