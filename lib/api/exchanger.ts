import apiClient from './config';
import { ExchangeRoute, ExchangeOrder, CreateOrderRequest } from '@/types';

export const exchangerApi = {
  // Get all available exchange routes
  getRoutes: () =>
    apiClient.get<ExchangeRoute[]>('/public/exchanger/route/get'),

  // Get routes v2 (alternative endpoint)
  getRoutesV2: () =>
    apiClient.get<ExchangeRoute[]>('/public/exchanger/route-v2/get'),

  // Get one route by ID
  getRoute: (id: string) =>
    apiClient.get<ExchangeRoute>('/public/exchanger/route/get/one', { id }),

  // Get route by XML ID
  getRouteByXml: (xmlId: string) =>
    apiClient.get<ExchangeRoute>('/public/exchanger/route/get/one/by-xml', { xmlId }),

  // Get route by friendly URL
  getRouteByFriendlyUrl: (url: string) =>
    apiClient.get<ExchangeRoute>('/public/exchanger/route/get/one/by-friendlyURL', { url }),

  // Create new exchange order
  createOrder: (data: CreateOrderRequest) =>
    apiClient.post<ExchangeOrder>('/public/exchanger/order/create', data),

  // Get order by ID
  getOrder: (id: string) =>
    apiClient.get<ExchangeOrder>('/public/exchanger/order/get', { id }),

  // Get last orders (public)
  getLastOrders: () =>
    apiClient.get<ExchangeOrder[]>('/public/exchanger/order/get-lasts'),

  // Update order status
  updateOrderStatus: (id: string, status: string) =>
    apiClient.put<ExchangeOrder>('/public/exchanger/order/update-status', { id, status }),

  // Upload files for order
  uploadOrderFiles: (orderId: string, files: FormData) =>
    apiClient.post<{ message: string }>('/public/exchanger/order/files/create', { orderId, files }),

  // Get favorite rates
  getFavoriteRates: () =>
    apiClient.get<ExchangeRoute[]>('/public/exchanger/favorite/get'),

  // ========== User endpoints (require auth) ==========

  // Get user order history
  getOrderHistory: (params?: { page?: number; limit?: number }) =>
    apiClient.get<{ orders: ExchangeOrder[]; total: number }>('/user/exchanger/order/history', params as Record<string, string>),

  // Get order chart data
  getOrderChart: () =>
    apiClient.get<{ data: { date: string; count: number; volume: number }[] }>('/user/exchanger/order/chart'),

  // Update order owner
  updateOrderOwner: (orderId: string) =>
    apiClient.put<ExchangeOrder>('/user/exchanger/order/update/owner', { orderId }),
};

export default exchangerApi;
