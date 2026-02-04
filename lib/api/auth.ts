import apiClient from './config';
import { User, AuthSession, LoginRequest, RegisterRequest } from '@/types';

export const authApi = {
  // Register new account
  register: (data: RegisterRequest) =>
    apiClient.post<{ message: string }>('/user/auth/register', data),

  // Confirm registration
  confirmRegistration: (token: string) =>
    apiClient.get<{ message: string }>(`/user/auth/register/confirm?token=${token}`),

  // Login
  login: (data: LoginRequest) =>
    apiClient.post<AuthSession>('/user/auth/sign-in', data),

  // Login via Telegram
  loginTelegram: (data: { initData: string }) =>
    apiClient.post<AuthSession>('/user/auth/sign-in/telegram', data),

  // Get current session
  getSession: () =>
    apiClient.get<{ user: User }>('/user/auth/session/get'),

  // Logout
  logout: () =>
    apiClient.delete<{ message: string }>('/user/auth/session/destroy'),

  // Get WebSocket token
  getSocketToken: () =>
    apiClient.post<{ token: string }>('/user/auth/socket/get/token'),

  // Init password reset
  resetPassword: (email: string) =>
    apiClient.post<{ message: string }>('/user/auth/reset-password', { email }),

  // Confirm password reset
  confirmResetPassword: (token: string, password: string) =>
    apiClient.post<{ message: string }>('/user/auth/reset-password/confirm', { token, password }),
};

export default authApi;
