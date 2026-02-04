import apiClient from './config';
import {
  User,
  AuthSession,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  TelegramLoginRequest,
  TelegramLoginResponse,
} from '@/types';

export const authApi = {
  // Register new account
  // @param email - Required, max 200 chars
  // @param password - Required, max 100 chars, min 5 chars
  // @param partner_code - Optional referral code
  // @param first_name, last_name - Optional name fields
  // @param phone - Optional phone number
  // @param accountType - 'personal' or 'business'
  // @param companyName - For business accounts
  // @param return_to - Redirect URL after email confirmation (supports {status} placeholder)
  register: (data: RegisterRequest) =>
    apiClient.post<RegisterResponse>('/user/auth/register', data),

  // Confirm registration (usually called via email link redirect)
  // @param token - Confirmation token from email
  // @param return_to - Optional redirect URL
  confirmRegistration: (token: string, return_to?: string) =>
    apiClient.get<{ message: string }>('/user/auth/register/confirm', {
      token,
      ...(return_to && { return_to })
    }),

  // Login with email/password
  // @param email - Required
  // @param password - Required
  // @param code - Optional 2FA code (if 2FA enabled)
  // @param tokenAuth - If true, returns token/tokenSecret instead of session cookie
  // @param apiAuth - If true, creates and returns new API key
  // Rate limited + captcha required (unless 2FA code provided)
  login: (data: LoginRequest) =>
    apiClient.post<LoginResponse>('/user/auth/sign-in', data),

  // Login or register via Telegram WebApp
  // Auto-creates account if user doesn't exist
  // @param initData - Telegram WebApp init data (validated server-side)
  // @param tokenAuth - Optional token auth mode
  loginTelegram: (data: TelegramLoginRequest) =>
    apiClient.post<TelegramLoginResponse>('/user/auth/sign-in/telegram', data),

  // Get current session (returns full user profile)
  // Sets CSRF cookie for protection
  getSession: () =>
    apiClient.get<User>('/user/auth/session/get'),

  // Logout - destroys session
  logout: () =>
    apiClient.delete<Record<string, never>>('/user/auth/session/destroy'),

  // Get WebSocket token
  getSocketToken: () =>
    apiClient.post<{ token: string }>('/user/auth/socket/get/token'),

  // ========== Password Reset ==========

  // Init password reset - sends email with reset link (valid 1 hour)
  // Note: Returns empty {} even if email doesn't exist (security)
  // Rate limited + captcha required
  resetPassword: (email: string) =>
    apiClient.post<Record<string, never>>('/user/auth/reset-password', { email }),

  // Confirm password reset and set new password
  // Auto-logs in user after successful reset
  // Destroys all existing sessions
  // @param token - Reset token from email link
  // @param password - New password (max 80 chars)
  confirmResetPassword: (token: string, password: string) =>
    apiClient.post<{ resultAuth: AuthSession | false }>('/user/auth/reset-password/confirm', { token, password }),
};

export default authApi;
