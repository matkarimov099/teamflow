import { type JwtPayload, jwtDecode } from 'jwt-decode';

const TOKEN_KEY = 'accessToken';
const REFRESH_KEY = 'refreshToken';

export function isAuthenticated(): boolean {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return false;
    const { exp } = jwtDecode<JwtPayload>(token);
    return (exp ?? 0) > Date.now() / 1000;
  } catch {
    return false;
  }
}

export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
};

export const setAuthTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
};
