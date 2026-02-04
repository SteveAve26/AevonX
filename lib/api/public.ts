import apiClient from './config';
import {
  NewsArticle,
  NewsComment,
  FAQItem,
  FAQListResponse,
  FAQGroupsResponse,
  Review,
  ContactsResponse,
  StaticPage,
  WebAlert,
  Language,
  SiteStatus
} from '@/types';

export const publicApi = {
  // ========== News ==========
  getNews: (params?: { page?: number; limit?: number }) =>
    apiClient.get<NewsArticle[]>('/public/news/list/basic', params as Record<string, string>),

  getNewsFull: (params?: { page?: number; limit?: number }) =>
    apiClient.get<NewsArticle[]>('/public/news/list/full', params as Record<string, string>),

  getNewsArticle: (id: string) =>
    apiClient.get<NewsArticle>('/public/news/get/one', { id }),

  getNewsComments: (newsId: string) =>
    apiClient.get<NewsComment[]>('/public/news/comment/get', { newsId }),

  // ========== FAQ ==========

  // Get one FAQ question by ID or link
  // @param id - FAQ ObjectID (optional)
  // @param link - FAQ link/slug (max 100 chars, optional)
  // Note: Either id or link must be provided
  getFaqItem: (params: { id?: string; link?: string }) =>
    apiClient.get<FAQItem>('/public/faq/get/one', params as Record<string, string>),

  // Get list of FAQ questions with pagination and filtering
  // @param page - Page number (required)
  // @param limit - Items per page (required)
  // @param lang - Language code (max 5 chars, optional, 'all' for all languages)
  // @param search - Search query (max 255 chars, optional)
  // @param sortKey - Sort field (optional)
  // @param sortType - Sort direction: 'asc' or 'desc' (optional)
  // @param group - Filter by group name (max 255 chars, optional, 'all' for all groups)
  getFaqList: (params: {
    page: number;
    limit: number;
    lang?: string;
    search?: string;
    sortKey?: string;
    sortType?: 'asc' | 'desc';
    group?: string;
  }) =>
    apiClient.get<FAQListResponse>('/public/faq/get/list', {
      page: String(params.page),
      limit: String(params.limit),
      ...(params.lang && { lang: params.lang }),
      ...(params.search && { search: params.search }),
      ...(params.sortKey && { sortKey: params.sortKey }),
      ...(params.sortType && { sortType: params.sortType }),
      ...(params.group && { group: params.group }),
    }),

  // Get list of FAQ groups
  // @param lang - Language code (max 5 chars, optional)
  // @param search - Search query (max 60 chars, optional)
  getFaqGroups: (params?: { lang?: string; search?: string }) =>
    apiClient.get<FAQGroupsResponse>('/public/faq/get/group', params as Record<string, string>),

  // ========== Reviews ==========
  getReviews: (params?: { page?: number; limit?: number }) =>
    apiClient.get<Review[]>('/public/reviews/get', params as Record<string, string>),

  createReview: (data: { author: string; rating: number; content: string; email?: string }) =>
    apiClient.post<{ message: string }>('/public/reviews/create', data),

  // ========== Contacts ==========
  // Get contacts list with optional language filter
  // @param lang - Language code (optional, 'all' for all languages)
  getContacts: (lang?: string) =>
    apiClient.get<ContactsResponse>('/public/contacts/list', lang ? { lang } : undefined),

  // ========== Pages ==========
  getStaticPages: () =>
    apiClient.get<StaticPage[]>('/public/site/page/static/list'),

  getStaticPage: (slug: string) =>
    apiClient.get<StaticPage>('/public/site/page/static/content', { slug }),

  // ========== Rules & Policy ==========
  getRules: () =>
    apiClient.get<{ id: string; title: string }[]>('/public/rule/list'),

  getRule: (id: string) =>
    apiClient.get<{ title: string; content: string }>('/public/rule/get', { id }),

  // ========== Web Alerts ==========
  getAlerts: () =>
    apiClient.get<WebAlert[]>('/public/web-alerts/get/list'),

  // ========== General ==========
  getLanguages: () =>
    apiClient.get<Language[]>('/public/server/lang/all'),

  getSiteStatus: () =>
    apiClient.get<SiteStatus>('/public/site/status/get'),

  // ========== Support ==========
  createTicket: (data: { subject: string; message: string; email: string }) =>
    apiClient.post<{ ticketId: string }>('/public/ticket/create', data),

  // ========== Social Networks ==========
  getSocialNetworks: () =>
    apiClient.get<{ id: string; name: string; url: string; icon: string }[]>('/public/social-networks/list'),

  // ========== Partners Block ==========
  getPartnersBlock: () =>
    apiClient.get<{ id: string; name: string; logo: string; url: string }[]>('/public/partners-block/list'),

  // ========== Products ==========
  getProducts: () =>
    apiClient.get<{ id: string; name: string; description: string; price: number }[]>('/public/products/list'),

  getProduct: (id: string) =>
    apiClient.get<{ id: string; name: string; description: string; price: number }>('/public/products/one', { id }),

  // ========== Analytics ==========
  // Register visitor statistics
  // @param refUrl - Referrer URL (max 250 chars)
  // @param code - Partner/affiliate code (max 200 chars)
  registerVisit: (data: { refUrl?: string; code?: string }) =>
    apiClient.post<Record<string, never>>('/public/visits/register', data),

  // ========== Verification (public) ==========
  uploadVerification: (data: FormData) =>
    apiClient.post<{ id: string }>('/public/exchanger/verification/create', data),

  findVerification: (email: string) =>
    apiClient.get<{ status: string }>('/public/exchanger/verification/find', { email }),

  findVerificationByOrder: (orderId: string) =>
    apiClient.get<{ status: string }>('/public/exchanger/verification/find/by-order-id', { orderId }),
};

export default publicApi;
