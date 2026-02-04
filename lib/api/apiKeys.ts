import apiClient from './config';

// API Key response structure (on creation - includes secret)
export interface ApiKeyAccess {
  key: string;              // e.g., 'EX_ABC123...'
  isActive: boolean;
  secret?: string;          // Only returned on creation
  permissions: string[];
  permission: {             // Deprecated format (kept for compatibility)
    DEPRECATED: boolean;
    base: boolean;
    withdrawal: boolean;
  };
  whitelistIPs: string[];
  lastUse: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

// API Key list item (secret is never returned in list)
export interface ApiKeyListItem {
  key: string;
  isActive: boolean;
  permissions: string[];
  permission: {
    DEPRECATED: boolean;
    base: boolean;
    withdrawal: boolean;
  };
  whitelistIPs: string[];
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface CreateApiKeyResponse {
  access: ApiKeyAccess;
}

export const apiKeysApi = {
  // Create new API key (max 5 per user)
  // Returns the secret only once - must be saved by user
  create: () =>
    apiClient.post<CreateApiKeyResponse>('/user/auth/api/create'),

  // List all API keys (secret is NOT returned here - only on creation)
  list: () =>
    apiClient.get<{ keys: ApiKeyListItem[] }>('/user/auth/api/get/list'),

  // Delete API key by key string (e.g., 'EX_ABC123...')
  delete: (apiKey: string) =>
    apiClient.delete<Record<string, never>>(`/user/auth/api/delete?apiKey=${apiKey}`),

  // TODO: Add when documentation is provided
  // Update API key (permissions, whitelist IPs, active status)
  // update: (apiKey: string, data: { permissions?: string[]; whitelistIPs?: string[]; isActive?: boolean }) =>
  //   apiClient.put<ApiKeyAccess>('/user/auth/api/update', { apiKey, ...data }),
};

export default apiKeysApi;
