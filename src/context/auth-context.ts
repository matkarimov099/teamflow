import type { CurrentUser } from '@/features/auth/types.ts';
import type { Role } from '@/types/common.ts';
import { createContext } from 'react';

interface AuthContext {
  authToken?: string | null;
  currentUser?: CurrentUser | null;
  role?: Role | null;
  hasRole: (roles: Role | Role[]) => boolean;
  logout: () => void;
  isLoading: boolean;
  isSuccessLogout: boolean;
  isErrorLogout: boolean;
  isLoggedIn: boolean;
}

export const AuthContext = createContext<AuthContext | undefined>(undefined);
