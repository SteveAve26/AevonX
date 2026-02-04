import apiClient from './config';
import {
  NewsArticle,
  NewsComment,
  FAQGroup,
  FAQItem,
  Review,
  Contact,
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
  getFaqGroups: () =>
    apiClient.get<FAQGroup[]>('/public/faq/get/group'),

  getFaqList: (groupId?: string) =>
    apiClient.get<FAQItem[]>('/public/faq/get/list', groupId ? { groupId } : undefined),

  getFaqItem: (id: string) =>
    apiClient.get<FAQItem>('/public/faq/get/one', { id }),

  // ========== Reviews ==========
  getReviews: (params?: { page?: number; limit?: number }) =>
    apiClient.get<Review[]>('/public/reviews/get', params as Record<string, string>),

  createReview: (data: { author: string; rating: number; content: string; email?: string }) =>
    apiClient.post<{ message: string }>('/public/reviews/create', data),

  // ========== Contacts ==========
  getContacts: () =>
    apiClient.get<Contact[]>('/public/contacts/list'),

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
  registerVisit: (data: { page: string; referrer?: string }) =>
    apiClient.post<void>('/public/visits/register', data),

  // ========== Verification (public) ==========
  uploadVerification: (data: FormData) =>
    apiClient.post<{ id: string }>('/public/exchanger/verification/create', data),

  findVerification: (email: string) =>
    apiClient.get<{ status: string }>('/public/exchanger/verification/find', { email }),

  findVerificationByOrder: (orderId: string) =>
    apiClient.get<{ status: string }>('/public/exchanger/verification/find/by-order-id', { orderId }),
};

export default publicApi;
