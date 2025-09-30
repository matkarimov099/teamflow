import type { PaginationFilter, Position, Role } from '@/types/common.ts';

export interface User {
  id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: Role;
  position?: Position;
  isGithubMember: boolean;
  avatarUrl?: string;
}

export interface UserCreate {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role: Role;
  position?: Position;
}

export interface UserFilter extends PaginationFilter {
  fullName?: string;
  role?: Role;
  position?: Position;
}

export interface UserUpdate {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  role?: Role;
  position?: Position;
}
