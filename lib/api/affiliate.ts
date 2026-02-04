import apiClient from './config';
import {
  AffiliateInfo,
  AffiliateTodayStats,
  AffiliateOrdersResponse,
  AffiliateChartData,
  PartnerRoute,
  PartnerVisitorStats,
  CreatePartnerWithdrawalRequest,
  CreatePartnerWithdrawalResponse,
  PartnerWithdrawalOrder,
  PartnerWithdrawalHistoryResponse,
} from '@/types';

export const affiliateApi = {
  // ========== Affiliate Stats ==========

  // Get basic affiliate info (commission rate, balance, stats)
  getInfo: () =>
    apiClient.get<{ affiliate: AffiliateInfo }>('/user/affiliate/basic/get'),

  // Get today's affiliate stats
  getTodayStats: () =>
    apiClient.get<{ affiliate: AffiliateTodayStats }>('/user/affiliate/today/get'),

  // Get chart data (last 3 months of partner statistics)
  getChartData: () =>
    apiClient.get<{ statistics: AffiliateChartData[] }>('/user/affiliate/chart'),

  // Get partner orders history
  // @param page - Page number (required)
  // @param limit - Items per page (required)
  // @param allOrders - If true, show all orders; if false, only "done" orders
  getOrders: (params: { page: number; limit: number; allOrders?: boolean }) =>
    apiClient.get<AffiliateOrdersResponse>('/user/affiliate/orders', {
      page: String(params.page),
      limit: String(params.limit),
      ...(params.allOrders !== undefined && { allOrders: String(params.allOrders) }),
    }),

  // ========== Partner Withdrawal Routes ==========

  // Get list of withdrawal routes for affiliate balance
  getWithdrawalRoutes: () =>
    apiClient.get<{ routes: PartnerRoute[] }>('/user/exchanger/partner-route/get'),

  // Get one withdrawal route details
  getWithdrawalRoute: (id: string) =>
    apiClient.get<{ route: PartnerRoute }>('/user/exchanger/partner-route/get/one', { id }),

  // Get visitor statistics for partner link
  // @param startAt - Start date (optional, defaults to 1 month ago)
  // @param endAt - End date (optional, defaults to now)
  // Note: Maximum period is 92 days
  getVisitorStats: (params?: { startAt?: string; endAt?: string }) =>
    apiClient.get<PartnerVisitorStats>('/user/exchanger/partner-route/statistic', params as Record<string, string>),

  // ========== Partner Link ==========

  // Edit partner/affiliate link (max 30 chars, must be unique)
  editPartnerLink: (affiliateLink: string) =>
    apiClient.put<{ ok: number }>('/user/profile/edit/partner-link', { affiliateLink }),

  // ========== Partner Withdrawal Orders ==========

  // Create partner withdrawal order
  // Note: 60 second cooldown between orders, must accept agreement
  // @param routeId - Route ObjectID
  // @param amount - Amount in USD to withdraw
  // @param toValues - Destination fields [{key: fieldId, value: 'address'}]
  // @param routeValues - Route fields [{key: fieldId, value: 'value'}]
  // @param agreement - Must be true
  createWithdrawal: (data: CreatePartnerWithdrawalRequest) =>
    apiClient.post<CreatePartnerWithdrawalResponse>('/user/exchanger/order/partner/create', data),

  // Get partner withdrawal order details
  // @param orderUID - Order UID (integer)
  // @param orderSecret - Order secret string
  getWithdrawalOrder: (orderUID: number, orderSecret: string) =>
    apiClient.get<{ order: PartnerWithdrawalOrder }>('/user/exchanger/order/partner/get', {
      orderUID: String(orderUID),
      orderSecret,
    }),

  // Get partner withdrawal order history
  // @param page - Page number (required)
  // @param limit - Items per page (required)
  getWithdrawalHistory: (params: { page: number; limit: number }) =>
    apiClient.get<PartnerWithdrawalHistoryResponse>('/user/exchanger/order/partner/history', {
      page: String(params.page),
      limit: String(params.limit),
    }),
};

export default affiliateApi;
