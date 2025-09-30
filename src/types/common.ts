export interface PaginationFilter {
  limit?: number;
  page?: number;
}

export interface PaginatedResponse<A> {
  data: A[];
  total: number;
}

export interface ServerError {
  message: string;
  error_code?: string;
}

export interface ApiResponse {
  id: string;
  message: string;
}

// Role constants
export const Role = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  DEVELOPER: 'developer',
} as const;

// Union type
export type Role = (typeof Role)[keyof typeof Role];

// Select options (label/value)
export const RoleOptions: { label: string; value: Role }[] = [
  { label: 'Admin', value: Role.ADMIN },
  { label: 'Manager', value: Role.MANAGER },
  { label: 'Developer', value: Role.DEVELOPER },
];

// Position constants
export const Position = {
  PROJECT_MANAGER: 'project_manager',
  FULL_STACK_DEVELOPER: 'fullstack_developer',
  FRONTEND_DEVELOPER: 'frontend_developer',
  BACKEND_DEVELOPER: 'backend_developer',
  AI_ENGINEER: 'ai_engineer',
  DATA_ANALYST: 'data_analyst',
  DATA_ENGINEER: 'data_engineer',
  QA: 'qa',
  DESIGNER: 'designer',
  HR: 'hr',
  ACCOUNTANT: 'accountant',
  OTHER: 'other',
} as const;

// Union type
export type Position = (typeof Position)[keyof typeof Position];

export const PositionOptions: { label: string; value: Position }[] = [
  { label: 'Project Manager', value: Position.PROJECT_MANAGER },
  { label: 'Full Stack Developer', value: Position.FULL_STACK_DEVELOPER },
  { label: 'Frontend Developer', value: Position.FRONTEND_DEVELOPER },
  { label: 'Backend Developer', value: Position.BACKEND_DEVELOPER },
  { label: 'AI Engineer', value: Position.AI_ENGINEER },
  { label: 'Data Analyst', value: Position.DATA_ANALYST },
  { label: 'Data Engineer', value: Position.DATA_ENGINEER },
  { label: 'QA', value: Position.QA },
  { label: 'Designer', value: Position.DESIGNER },
  { label: 'HR', value: Position.HR },
  { label: 'Accountant', value: Position.ACCOUNTANT },
  { label: 'Other', value: Position.OTHER },
];
