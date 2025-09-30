import { AuthContext } from '@/context/auth-context';
import { useCurrentUser, useLogout } from '@/features/auth/hooks/use-auth.ts';
import type { CurrentUser } from '@/features/auth/types.ts';
import { clearAuth, isAuthenticated } from '@/lib/auth';
import type { Role } from '@/types/common.ts';
import { type PropsWithChildren, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [authToken, setAuthToken] = useState(() =>
    isAuthenticated() ? localStorage.getItem('accessToken') : null
  );
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const navigate = useNavigate();

  const { mutate: logoutUser, isPending: logoutPending } = useLogout();
  const { data: userData, isPending: userPending } = useCurrentUser();

  const logout = () =>
    logoutUser(undefined, {
      onSuccess: () => {
        clearAuth();
        setAuthToken(null);
        setCurrentUser(null);
        navigate('/auth/login');
      },
    });

  const hasRole = (roles: Role | Role[]) => {
    const role = currentUser?.role;
    return !!role && (Array.isArray(roles) ? roles.includes(role) : role === roles);
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token && isAuthenticated() && token !== authToken) {
      setAuthToken(token);
    }
    if (userData?.data) setCurrentUser(userData.data);
  }, [userData, authToken]);

  return (
    <AuthContext.Provider
      value={{
        authToken,
        currentUser,
        role: currentUser?.role || null,
        hasRole,
        logout,
        isLoading: logoutPending || !!(authToken && userPending && !currentUser),
        isSuccessLogout: false,
        isErrorLogout: false,
        isLoggedIn: !!(authToken && isAuthenticated()),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
