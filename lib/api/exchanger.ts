import apiClient from './config';
import {
  CreateOrderRequest,
  ApiRoute,
  RoutesV2Response,
  RouteDetailResponse,
  OrderResponse,
  LastOrdersResponse,
  OrderHistoryResponse,
  OrderChartResponse,
  FavoriteRatesResponse,
} from '@/types';

export const exchangerApi = {
  // ========== Routes ==========

  // Get all available exchange routes
  // @param fromCurrencyId - Filter by source currency ObjectID (optional)
  // @param toCurrencyId - Filter by destination currency ObjectID (optional)
  getRoutes: (params?: { fromCurrencyId?: string; toCurrencyId?: string }) =>
    apiClient.get<{ routes: ApiRoute[]; cache?: boolean }>('/public/exchanger/route/get', params as Record<string, string>),

  // Get routes v2 (with currencies map, better for caching)
  // @param fromCurrencyIds - Array of source currency IDs (optional)
  // @param toCurrencyIds - Array of destination currency IDs (optional)
  getRoutesV2: (params?: { fromCurrencyIds?: string[]; toCurrencyIds?: string[] }) =>
    apiClient.get<RoutesV2Response>('/public/exchanger/route-v2/get', params as Record<string, string>),

  // Get one route by ID
  // @param id - Route ObjectID
  // @param lang - Language code (max 20 chars, optional)
  getRoute: (id: string, lang?: string) =>
    apiClient.get<RouteDetailResponse>('/public/exchanger/route/get/one', { id, ...(lang && { lang }) }),

  // Get route by XML codes
  // @param xmlIn - Source currency XML code (max 50 chars)
  // @param xmlOut - Destination currency XML code (max 50 chars)
  // @param lang - Language code (optional)
  getRouteByXml: (xmlIn: string, xmlOut: string, lang?: string) =>
    apiClient.get<RouteDetailResponse>('/public/exchanger/route/get/one/by-xml', { xmlIn, xmlOut, ...(lang && { lang }) }),

  // Get route by friendly URL
  // @param friendlyURL - SEO-friendly URL slug (max 90 chars)
  // @param lang - Language code (optional)
  getRouteByFriendlyUrl: (friendlyURL: string, lang?: string) =>
    apiClient.get<RouteDetailResponse>('/public/exchanger/route/get/one/by-friendlyURL', { friendlyURL, ...(lang && { lang }) }),

  // ========== Orders ==========

  // Create new exchange order
  createOrder: (data: CreateOrderRequest) =>
    apiClient.post<OrderResponse>('/public/exchanger/order/create', data),

  // Get order by UID and secret
  // @param orderUID - Order UID (integer, max 11 digits)
  // @param orderSecret - Order secret (max 50 chars)
  // @param type - Order type: "order" or "payment" (optional, defaults to "order")
  getOrder: (orderUID: number, orderSecret: string, type?: 'order' | 'payment') =>
    apiClient.get<OrderResponse>('/public/exchanger/order/get', {
      orderUID: String(orderUID),
      orderSecret,
      ...(type && { type }),
    }),

  // Get last completed orders (public)
  // @param limit - Number of orders to return (max 20, default 3)
  getLastOrders: (limit?: number) =>
    apiClient.get<LastOrdersResponse>('/public/exchanger/order/get-lasts', limit ? { limit: String(limit) } : undefined),

  // Update order status (only from waitPayment/new status)
  // @param orderUID - Order UID (integer, max 11 digits)
  // @param orderSecret - Order secret (max 50 chars)
  // @param status - New status (cannot be: inProgressPayout, done, hold)
  updateOrderStatus: (orderUID: number, orderSecret: string, status: string) =>
    apiClient.put<{ success: boolean }>('/public/exchanger/order/update-status', {
      orderUID: String(orderUID),
      orderSecret,
      status,
    }),

  // Upload files for order verification
  // @param orderId - Order ObjectID
  // @param files - FormData with files
  uploadOrderFiles: (orderId: string, files: FormData) => {
    // Files need to be sent as FormData
    files.append('orderId', orderId);
    return apiClient.post<{ success: boolean }>('/public/exchanger/order/files/create', files);
  },

  // Get favorite/featured rates (popular exchange rates displayed on homepage)
  // Returns rates calculated from parsers or routes
  getFavoriteRates: () =>
    apiClient.get<FavoriteRatesResponse>('/public/exchanger/favorite/get'),

  // ========== User endpoints (require auth) ==========

  // Get user order history
  // @param page - Page number
  // @param limit - Items per page
  getOrderHistory: (params?: { page?: number; limit?: number }) =>
    apiClient.get<OrderHistoryResponse>('/user/exchanger/order/history', params as Record<string, string>),

  // Get order chart data for user
  getOrderChart: () =>
    apiClient.get<OrderChartResponse>('/user/exchanger/order/chart'),

  // Update order owner (claim order to current user)
  // @param orderUID - Order UID
  // @param orderSecret - Order secret
  updateOrderOwner: (orderUID: number, orderSecret: string) =>
    apiClient.put<{ success: boolean }>('/user/exchanger/order/update/owner', {
      orderUID: String(orderUID),
      orderSecret,
    }),
};

export default exchangerApi;
