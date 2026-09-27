import { apiClient, authToken } from '../lib/api-client';
import type { AuthResponse, AuthUser, LoginPayload, RegisterPayload } from '../types/user';

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const res = await apiClient.post<AuthResponse>('/auth/login', payload);
    authToken.set(res.token);
    return res;
  },

  register: async (payload: RegisterPayload): Promise<AuthResponse> => {
    const res = await apiClient.post<AuthResponse>('/auth/register', payload);
    authToken.set(res.token);
    return res;
  },

  logout: (): void => {
    authToken.clear();
  },

  /** Fetches the current user from the token already stored client-side. */
  me: (): Promise<AuthUser> => apiClient.get<AuthUser>('/auth/me'),

  isAuthenticated: (): boolean => Boolean(authToken.get()),
};
