import { useMemo } from 'react';

/**
 * Default export configuration for the analysis data table
 */
export function useExportConfig() {
  // Column mapping for export
  const columnMapping = useMemo(() => {
    return {
      id: 'ID',
      'project.name': 'Project',
      'agent.name': 'Agent',
      users: 'Users',
      dateFrom: 'From Date',
      dateTo: 'To Date',
      durationSeconds: 'Duration (seconds)',
      created_at: 'Created At',
      response: 'Analysis Report',
    };
  }, []);

  // Column widths for Excel export
  const columnWidths = useMemo(() => {
    return [
      { wch: 15 }, // ID
      { wch: 20 }, // Project
      { wch: 20 }, // Agent
      { wch: 30 }, // Users
      { wch: 12 }, // From Date
      { wch: 12 }, // To Date
      { wch: 15 }, // Duration
      { wch: 20 }, // Created At
      { wch: 50 }, // Analysis Report
    ];
  }, []);

  // Headers for CSV export
  const headers = useMemo(() => {
    return [
      'id',
      'project.name',
      'agent.name',
      'users',
      'dateFrom',
      'dateTo',
      'durationSeconds',
      'created_at',
      'response',
    ];
  }, []);

  return {
    columnMapping,
    columnWidths,
    headers,
    entityName: 'analysis',
  };
}
