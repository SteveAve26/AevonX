import apiClient from './config';

// Admin login response
export interface AdminLoginResponse {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  affiliate: {
    type: string;
    rate: number;
    link: string;
  };
  createdAt: string;
  updatedAt: string;
  active: boolean;
  adminLvl?: number;
  deleted: boolean;
  deleted_reason?: string;
  partner?: string;
  // Token auth response (if tokenAuth: true)
  token?: string;
  tokenSecret?: string;
  // Device info
  os: string;
  osVersion: string;
  browser: string;
  browserVersion: string;
}

export const adminApi = {
  // ========== Admin Auth ==========

  // Admin login
  // @param email - Admin email (max 90 chars)
  // @param password - Admin password (max 255 chars)
  // @param code - 2FA code (optional, required if 2FA enabled)
  // @param tokenAuth - If true, returns token instead of session cookie
  login: (data: {
    email: string;
    password: string;
    code?: number;
    tokenAuth?: boolean;
  }) =>
    apiClient.post<AdminLoginResponse>('/admin/auth/sign-in', data),

  // Get WebSocket token for admin
  // Returns 'public' if not authenticated
  getSocketToken: () =>
    apiClient.post<{ token: string }>('/admin/auth/socket/get/token'),

  // TODO: Add more admin endpoints when documentation is provided
  // - Get admin session
  // - Admin logout
  // - Admin user management
  // - Admin order management
  // - Admin settings
};

export default adminApi;
