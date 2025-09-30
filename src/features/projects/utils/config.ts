import { useMemo } from 'react';

/**
 * Default export configuration for the project data table
 */
export function useExportConfig() {
  // Column mapping for export
  const columnMapping = useMemo(() => {
    return {
      id: 'ID',
      name: 'Name',
      url: 'URL',
      createdAt: 'Created Date',
    };
  }, []);

  // Column widths for Excel export
  const columnWidths = useMemo(() => {
    return [
      { wch: 10 }, // ID
      { wch: 25 }, // Name
      { wch: 50 }, // URL
      { wch: 20 }, // Created At
    ];
  }, []);

  // Headers for CSV export
  const headers = useMemo(() => {
    return ['id', 'name', 'url', 'createdAt'];
  }, []);

  return {
    columnMapping,
    columnWidths,
    headers,
    entityName: 'projects',
  };
}
