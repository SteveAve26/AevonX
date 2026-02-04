import apiClient from './config';
import { AffiliateInfo, AffiliateOrder, AffiliateChartData, ExchangeRoute } from '@/types';

export const affiliateApi = {
  // Get basic affiliate info
  getInfo: () =>
    apiClient.get<AffiliateInfo>('/user/affiliate/basic/get'),

  // Get today's affiliate stats
  getTodayStats: () =>
    apiClient.get<AffiliateInfo>('/user/affiliate/today/get'),

  // Get chart data
  getChartData: (params?: { period?: string }) =>
    apiClient.get<AffiliateChartData[]>('/user/affiliate/chart', params as Record<string, string>),

  // Get partner orders history
  getOrders: (params?: { page?: number; limit?: number }) =>
    apiClient.get<{ orders: AffiliateOrder[]; total: number }>('/user/affiliate/orders', params as Record<string, string>),

  // ========== Partner Withdrawal ==========

  // Get withdrawal routes
  getWithdrawalRoutes: () =>
    apiClient.get<ExchangeRoute[]>('/user/exchanger/partner-route/get'),

  // Get one withdrawal route
  getWithdrawalRoute: (id: string) =>
    apiClient.get<ExchangeRoute>('/user/exchanger/partner-route/get/one', { id }),

  // Get withdrawal statistics
  getWithdrawalStats: () =>
    apiClient.get<{ total: number; pending: number }>('/user/exchanger/partner-route/statistic'),

  // Create withdrawal order
  createWithdrawal: (data: { routeId: string; amount: number; address: string }) =>
    apiClient.post<{ orderId: string }>('/user/exchanger/order/partner/create', data),

  // Get withdrawal order
  getWithdrawalOrder: (id: string) =>
    apiClient.get<AffiliateOrder>('/user/exchanger/order/partner/get', { id }),

  // Get withdrawal history
  getWithdrawalHistory: (params?: { page?: number; limit?: number }) =>
    apiClient.get<{ orders: AffiliateOrder[]; total: number }>('/user/exchanger/order/partner/history', params as Record<string, string>),
};

export default affiliateApi;
