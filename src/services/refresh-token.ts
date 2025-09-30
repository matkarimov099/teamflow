import type { AuthToken } from '@/features/auth/types.ts';
import { clearAuth, setAuthTokens } from '@/lib/auth';
import { publicAxiosClient } from '@/plugins/axios.ts';

export async function refreshToken(): Promise<AuthToken | null> {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token');

    const { data } = await publicAxiosClient.get<AuthToken>('/auth/refresh', {
      headers: { Authorization: `Bearer ${refreshToken}` },
    });

    if (data?.accessToken && data?.refreshToken) {
      setAuthTokens(data.accessToken, data.refreshToken);
      return data;
    }
    throw new Error('Invalid response');
  } catch {
    clearAuth();
    window.location.href = '/auth/login';
    return null;
  }
}
