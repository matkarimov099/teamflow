import { useMemo } from 'react';

/**
 * Default export configuration for the agents data table
 */
export function useExportConfig() {
  // Column mapping for export
  const columnMapping = useMemo(() => {
    return {
      id: 'ID',
      name: 'Name',
      description: 'Description',
      prompt: 'Prompt',
      createdAt: 'Created Date',
    };
  }, []);

  // Column widths for Excel export
  const columnWidths = useMemo(() => {
    return [
      { wch: 10 }, // ID
      { wch: 25 }, // Name
      { wch: 40 }, // Description
      { wch: 50 }, // Prompt
      { wch: 20 }, // Created At
    ];
  }, []);

  // Headers for CSV export
  const headers = useMemo(() => {
    return ['id', 'name', 'description', 'prompt', 'createdAt'];
  }, []);

  return {
    columnMapping,
    columnWidths,
    headers,
    entityName: 'agents',
  };
}
