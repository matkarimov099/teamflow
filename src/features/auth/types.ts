import type { Role } from '@/types/common.ts';

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface CurrentUser {
  id: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: Role;
  isGithubMember: boolean;
  position: string;
  avatarUrl?: string;
}
