import type { PaginationFilter } from '@/types/common.ts';

export interface Agent {
  id: string;
  createdAt: string;
  name: string;
  prompt: string;
  description?: string;
}

export interface AgentCreate {
  name: string;
  prompt: string;
  description?: string;
}

export interface AgentFilter extends PaginationFilter {
  name?: string;
}

export interface AgentUpdate {
  name?: string;
  prompt?: string;
  description?: string;
}
