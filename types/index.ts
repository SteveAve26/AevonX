// ============ Auth Types ============
export interface User {
  id: string;
  email: string;
  username?: string;
  partnerLink?: string;
  isVerified: boolean;
  otpEnabled: boolean;
  createdAt: string;
}

export interface AuthSession {
  token: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// ============ Exchanger Types ============
export interface Currency {
  id: string;
  code: string;
  name: string;
  icon?: string;
  type: 'crypto' | 'fiat';
  network?: string;
}

export interface ExchangeRoute {
  id: string;
  fromCurrency: Currency;
  toCurrency: Currency;
  rate: number;
  minAmount: number;
  maxAmount: number;
  reserve: number;
  isActive: boolean;
}

export interface ExchangeOrder {
  id: string;
  status: 'pending' | 'waiting' | 'confirming' | 'exchanging' | 'completed' | 'failed' | 'cancelled';
  fromCurrency: Currency;
  toCurrency: Currency;
  fromAmount: number;
  toAmount: number;
  rate: number;
  fromAddress?: string;
  toAddress: string;
  txHash?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderRequest {
  routeId: string;
  fromAmount: number;
  toAddress: string;
  email?: string;
}

// ============ Wallet Types ============
export interface Wallet {
  id: string;
  currency: Currency;
  address: string;
  balance: number;
  lockedBalance: number;
}

export interface WalletTransaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'exchange';
  currency?: Currency;
  currencyCode: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  txHash?: string;
  createdAt: string;
}

// ============ Affiliate Types ============
export interface AffiliateInfo {
  partnerLink: string;
  totalReferrals: number;
  totalEarnings: number;
  pendingEarnings: number;
  availableBalance: number;
}

export interface AffiliateOrder {
  id: string;
  orderId: string;
  commission: number;
  status: string;
  createdAt: string;
}

export interface AffiliateChartData {
  date: string;
  earnings: number;
  orders: number;
}

// ============ News Types ============
export interface NewsArticle {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image?: string;
  publishedAt: string;
  commentsCount: number;
}

export interface NewsComment {
  id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
}

// ============ FAQ Types ============
export interface FAQGroup {
  id: string;
  name: string;
  order: number;
}

export interface FAQItem {
  id: string;
  groupId: string;
  question: string;
  answer: string;
  order: number;
}

// ============ Review Types ============
export interface Review {
  id: string;
  author: string;
  rating: number;
  content: string;
  createdAt: string;
  isVerified: boolean;
}

// ============ Support Types ============
export interface SupportTicket {
  id: string;
  subject: string;
  message: string;
  email: string;
  status: 'open' | 'pending' | 'resolved' | 'closed';
  createdAt: string;
}

// ============ Verification Types ============
export interface VerificationStatus {
  level: number;
  status: 'none' | 'pending' | 'approved' | 'rejected';
  limits: {
    daily: number;
    monthly: number;
  };
}

// ============ Contact Types ============
export interface Contact {
  id: string;
  type: 'email' | 'telegram' | 'phone' | 'address';
  value: string;
  label?: string;
}

// ============ Page Types ============
export interface StaticPage {
  id: string;
  slug: string;
  title: string;
  content: string;
}

// ============ Alert Types ============
export interface WebAlert {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  isActive: boolean;
}

// ============ General Types ============
export interface SiteStatus {
  isOnline: boolean;
  maintenanceMessage?: string;
}

export interface Language {
  code: string;
  name: string;
  isDefault: boolean;
}
