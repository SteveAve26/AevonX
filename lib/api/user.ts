import apiClient from './config';
import { User, VerificationStatus, FileUploadResponse } from '@/types';

export const userApi = {
  // Get profile details
  getProfile: () =>
    apiClient.get<User>('/user/profile/details/get'),

  // Update main profile info
  updateProfile: (data: { username?: string }) =>
    apiClient.post<User>('/user/profile/edit/main', data),

  // Init email change
  changeEmail: (newEmail: string) =>
    apiClient.put<{ message: string }>('/user/profile/edit/email', { email: newEmail }),

  // Change password
  changePassword: (oldPassword: string, newPassword: string) =>
    apiClient.put<{ message: string }>('/user/profile/edit/password', { oldPassword, newPassword }),

  // Edit partner link (moved to affiliateApi.editPartnerLink)
  // Use affiliateApi.editPartnerLink(affiliateLink) instead

  // Block account (7 days)
  blockAccount: () =>
    apiClient.put<{ message: string }>('/user/profile/access/block'),

  // Delete account
  deleteAccount: () =>
    apiClient.delete<{ message: string }>('/user/profile/access/delete'),

  // ========== 2FA / OTP ==========

  // Init OTP setup
  initOtp: () =>
    apiClient.post<{ secret: string; qrCode: string }>('/user/profile/secure/otp/create'),

  // Confirm OTP
  confirmOtp: (code: string) =>
    apiClient.post<{ message: string }>('/user/profile/secure/otp/confirm', { code }),

  // Delete OTP
  deleteOtp: (code: string) =>
    apiClient.delete<{ message: string }>(`/user/profile/secure/otp/delete?code=${code}`),

  // ========== Verification ==========

  // Get verification status
  getVerification: () =>
    apiClient.get<VerificationStatus>('/user/verification/get'),

  // Get one verification level
  getVerificationLevel: (level: number) =>
    apiClient.get<VerificationStatus>('/user/verification/get/one', { level: level.toString() }),

  // Init verification process
  initVerification: (level: number) =>
    apiClient.post<{ message: string }>('/user/verification/init', { level }),

  // ========== Files ==========

  // Upload image file
  // @param image - Image file to upload
  // @param type - Image type enum (e.g., 'avatar', 'verification', etc.)
  uploadImage: (image: File, type: string) => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('type', type);
    return apiClient.post<FileUploadResponse>('/user/files/upload/image', formData);
  },
};

export default userApi;
