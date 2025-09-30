import { useGetAgents } from '@/features/ai-agents/hooks/use-agents';
import { useDebounce } from '@/hooks/use-debounce.tsx';
import type { PaginationState, SortingState } from '@tanstack/react-table';
import { useState } from 'react';

export function useAgentsData() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 30,
  });

  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  // Derived values from pagination and sorting for easier access
  const currentPage = pagination.pageIndex + 1;
  const pageSize = pagination.pageSize;

  // Handlers for pagination changes
  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, pageIndex: page - 1 }));
  };

  const handlePageSizeChange = (size: number) => {
    setPagination(prev => ({ ...prev, pageSize: size, pageIndex: 0 }));
  };

  // Handler for sorting changes
  const handleSortingChange = (
    updaterOrValue: SortingState | ((prev: SortingState) => SortingState)
  ) => {
    const newSorting =
      typeof updaterOrValue === 'function' ? updaterOrValue(sorting) : updaterOrValue;
    setSorting(newSorting);
    // Reset to the first page when sorting changes
    setPagination(prev => ({ ...prev, pageIndex: 0 }));
  };

  // Handler for search changes
  const handleSearchChange = (searchValue: string) => {
    setSearch(searchValue);
    // Reset to the first page when search changes
    setPagination(prev => ({ ...prev, pageIndex: 0 }));
  };

  const {
    data: agents,
    isFetching,
    refetch,
  } = useGetAgents({
    page: currentPage,
    limit: pageSize,
    ...(debouncedSearch.length >= 3 ? { name: debouncedSearch } : {}),
    // Add sorting parameters if needed
    ...(sorting.length > 0
      ? {
          sortBy: sorting[0].id,
          sortOrder: sorting[0].desc ? 'desc' : 'asc',
        }
      : {}),
  });

  return {
    // Data
    agents: agents?.data ?? [],
    total: agents?.total ?? 0,
    isFetching,
    refetch,

    // Pagination state and handlers
    pagination,
    setPagination,
    currentPage,
    pageSize,
    onPageChange: handlePageChange,
    onPageSizeChange: handlePageSizeChange,

    // Sorting state and handlers
    sorting,
    setSorting,
    onSortingChange: handleSortingChange,

    // Search state and handlers
    search,
    setSearch,
    onSearchChange: handleSearchChange,
  };
}
