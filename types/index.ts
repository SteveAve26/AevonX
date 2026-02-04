// ============ Auth Types ============
export interface User {
  _id: string;
  uid: number;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  accountType: 'personal' | 'business';
  companyName?: string;
  dob?: string;
  address_line1?: string;
  address_line2?: string;
  address_country?: string;
  address_city?: string;
  address_zip?: string;
  affiliate: {
    type: string;
    rate: number;
    discount: number;
    link: string;
    rateKey: string;
    rateExportFormatType: string;
    minReward: number;
    totalReceived: { usd: number };
    balance: { usd: number };
  };
  secure2fa: { active: boolean; type?: string };
  verificationPhone?: { status: string };
  verificationPerson?: { status: string };
  createdAt: string;
  updatedAt: string;
  notifyChangePass: boolean;
  notifyLogin: boolean;
  crispEmailHash?: string;
}

export interface AuthSession {
  token?: string;
  tokenSecret?: string;
  user?: User;
}

export interface RegisterRequest {
  email: string;                    // Required, max 200 chars
  password: string;                 // Required, max 100 chars, min 5
  partner_code?: string;            // Optional referral code, max 150 chars
  first_name?: string;              // Optional, max 100 chars
  last_name?: string;               // Optional, max 100 chars
  phone?: string;                   // Optional, max 30 chars
  return_to?: string;               // Optional redirect URL after confirm, max 250
  accountType?: 'personal' | 'business';  // Optional, defaults to 'personal'
  companyName?: string;             // Optional, max 400 chars (for business accounts)
}

export interface RegisterResponse {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  active: boolean;
  apiKey?: { key: string; secret: string };  // Only for internal registration
  verificationEmailExpiresAt?: string;
}

export interface LoginRequest {
  email: string;                    // Required, max 200 chars
  password: string;                 // Required, max 255 chars
  code?: number;                    // Optional 2FA code
  tokenAuth?: boolean;              // If true, returns token instead of session
  apiAuth?: boolean;                // If true, creates and returns API key
}

export interface LoginResponse {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  os: string;
  osVersion: string;
  browser: string;
  browserVersion: string;
  affiliate: {
    type: string;
    rate: number;
    link: string;
    totalReceived: { usd: number };
    balance: { usd: number };
  };
  secure2fa: { active: boolean; type?: string };
  partner_id?: string;
  verificationPhone?: { status: string };
  verificationPerson?: { status: string };
  notifyChangePass: boolean;
  notifyLogin: boolean;
  token?: string;                   // If tokenAuth: true
  tokenSecret?: string;             // If tokenAuth: true
  apiKey?: { key: string; secret: string };  // If apiAuth: true
}

export interface TelegramLoginRequest {
  initData: string;                 // Telegram WebApp init data, max 2000 chars
  tokenAuth?: boolean;
}

export interface TelegramLoginResponse {
  ok: number;
  isNewUser: boolean;
  userId: string;
  email: string;
  first_name: string;
  last_name: string;
  telegramId: string;
  telegramUsername: string | null;
  telegramPhotoUrl: string | null;
  affiliate?: {
    type: string;
    rate: number;
    link: string;
  };
  secure2fa: { active: boolean; type?: string };
  partner_id?: string;
  verificationPhone?: { status: string };
  verificationPerson?: { status: string };
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

// ============ API Response Types (raw from backend) ============
export interface ApiCurrency {
  name: string;
  symbol: string;
  xml: string;
  decimal: number;
  min: string;
  max: string;
  verification?: boolean;
  image?: {
    files: { type: string; url: string }[];
  };
}

export interface ApiRoute {
  from: ApiCurrency;
  to: ApiCurrency;
  in: number;
  out: number;
  amount: number;
  minamount?: number;
  maxamount?: number;
}

export interface ApiReview {
  name: string;
  email?: string;
  message: string;
  createdAt: string;
}

export interface ApiFaqGroup {
  groupName: string;
  lang: string;
  count: number;
}

export interface ApiFaqItem {
  _id: string;
  question: string;
  answer: string;
  groupName: string;
}

export interface ApiNewsArticle {
  _id: string;
  title: string;
  description: string;
  content?: string;
  createdAt: string;
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
  routeId: string;                  // Route ObjectID
  amount: number;                   // Positive = "from" amount, Negative = "to" amount
  partner?: string;                 // Partner/referral code (max 100)
  fromValues?: Array<{ key: string; value: string }>;   // "From" currency fields
  toValues?: Array<{ key: string; value: string }>;     // "To" currency fields (e.g., address)
  routeValues?: Array<{ key: string; value: string }>;  // Route-specific fields
  lang?: string;                    // Language code (max 3)
  agreement: boolean;               // Must be true
  hideOutData?: boolean;            // Hide output data
  disableEmailNotify?: boolean;     // Disable email notifications
  skipPreview?: boolean;            // Skip preview step
  clientCallbackUrl?: string;       // Client callback URL (max 200)
  ipnUrl?: string;                  // IPN webhook URL (max 200)
  ipnSecret?: string;               // IPN secret for verification (max 200)
  additionalServices?: string[];    // Additional service IDs
  extraData?: Record<string, unknown>; // Extra custom data
}

export interface OrderFilesRequest {
  orderId: string;
  fileIds?: string[];
  status?: string;
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
  type: string;                     // Affiliate type
  rate: number;                     // Commission rate (%)
  discount: number;                 // Discount for referrals (%)
  link: string;                     // Partner referral link
  rateKey: string;                  // "public" or custom rate key
  rateExportFormatType: string;     // "default" or custom format
  minReward: string | number;       // Minimum reward threshold
  ordersAmountInUSD: number;        // Total orders volume in USD
  totalReceived: number;            // Total received earnings in USD
  balance: number;                  // Current available balance in USD
  waitedPartnerRewardsUSD: number;  // Pending rewards in USD
  countPartners: number;            // Number of referred users
  countSuccessOrders: number;       // Completed orders count
  countAllOrders: number;           // All orders count
}

export interface AffiliateOrder {
  uid: string;
  rid: string;
  utm: {
    source: string;
    medium: string;
    campaign: string;
    content: string;
    term: string;
    gclid: string;
    gbraid: string;
    fbclid: string;
    session_id: string;
    external_id: string;
  };
  outAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  partnerFee: {
    type: string;
    percent: number;
    amountOut: number;
    amountInUSD: number;
  };
  route: {
    routeId: string;
    from: {
      name: string;
      symbol: string;
      xml: string;
      decimal: number;
      image?: { files: { type: string; url: string }[] };
    };
    to: {
      name: string;
      symbol: string;
      xml: string;
      decimal: number;
      image?: { files: { type: string; url: string }[] };
    };
  };
  expiresAt: string;
}

export interface AffiliateOrdersResponse {
  orders: AffiliateOrder[];
  count: {
    total: number;
    pages: number;
    select_page: number;
    limit: number;
    offset: number;
  };
}

export interface AffiliateChartData {
  date: string;              // "YYYY-MM-DD"
  sumAmountsUSD: number;     // Total amount in USD
  avgAmountsUSD: number;     // Average amount in USD
  doneOrders: number;        // Completed orders count
  count: number;             // Total orders count
}

// Today's affiliate stats
export interface AffiliateTodayStats {
  totalPartners: number;
  totalOrders: number;
  todayExchangedInUSD: number;
  todayPartners: number;
  todaySuccessOrders: number;
}

// Partner withdrawal route
export interface PartnerRoute {
  routeId: string;
  to: {
    name: string;
    symbol: string;
    xml: string;
    decimal: number;
    min?: number;
    max?: number;
    payoutEnabled?: boolean;
    payout?: string;
    verification?: boolean;
    fields?: Array<{ name: string; type: string; required: boolean }>;
    usd?: { rate: number };
    image?: { files: { type: string; url: string }[] };
  };
  fields?: Array<{ name: string; type: string; required: boolean }>;
  rate: {
    in: number;
    out: number;
    amount: number;
    outFeeAmount: number;
    changeFeePercent?: number;
  };
  isAutoPayout?: boolean;
  orderTTL?: number;
}

// Partner visitor statistics
export interface PartnerVisitorStats {
  partners: Array<{ date: string; total_count: number }>;
  date: {
    periodInDays: number;
    fromDate: string;
    toDate: string;
  };
}

// Partner withdrawal order creation request
export interface CreatePartnerWithdrawalRequest {
  routeId: string;              // ObjectID of the route
  amount: number;               // Amount in USD to withdraw
  toValues: Array<{ key: string; value: string }>;      // Destination fields (address, etc.)
  routeValues: Array<{ key: string; value: string }>;   // Route-specific fields
  agreement: boolean;           // Must be true
}

// Partner withdrawal order creation response
export interface CreatePartnerWithdrawalResponse {
  uid: number;
  secret: string;
  route: {
    to: { name: string; symbol: string };
    inAmount: number;   // USD amount
    outAmount: number;  // Crypto amount
  };
}

// Partner withdrawal order details
export interface PartnerWithdrawalOrder {
  _id: string;
  uid: number;
  secret?: string;
  inAmount: number;
  outAmount: number;
  toValues?: Array<{ field: string; name: string; value: string }>;
  routeValues?: Array<{ field: string; name: string; value: string }>;
  partner?: string;
  client?: string;
  status: string;
  route: {
    routeId: string;
    instructions?: string;
    to: {
      name: string;
      symbol: string;
      xml?: string;
      decimal?: number;
      image?: { files: { type: string; url: string }[] };
    };
  };
  expiresAt: string;
  createdAt?: string;
  updatedAt?: string;
}

// Partner withdrawal history response
export interface PartnerWithdrawalHistoryResponse {
  orders: PartnerWithdrawalOrder[];
  count: {
    total: number;
    pages: number;
    select_page: number;
    limit: number;
    offset: number;
  };
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

// Single FAQ item from the API
export interface FAQItem {
  _id: string;
  title: string;
  content: string;
  link?: string;
  group?: string;
  lang?: string;
  position_sort?: number;
  status?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// FAQ list response with pagination
export interface FAQListResponse {
  faq: FAQItem[];
  count: {
    total: number;
    pages: number;
    select_page: number;
    limit: number;
    offset: number;
  };
}

// FAQ group item
export interface FAQGroupItem {
  groupName: string;
  lang: string;
  count: number;
}

// FAQ groups response
export interface FAQGroupsResponse {
  faqGroups: FAQGroupItem[];
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
  _id: string;
  name: string;
  value: string;
  link?: string;
  image?: {
    files: { type: string; url: string }[];
  };
  size?: string;
  lang: string;
  positionSort: number;
  createdAt: string;
  updatedAt: string;
}

export interface OnlineChat {
  type?: string;
  api?: string;
  secret?: string;
  status: boolean;
}

export interface ContactsResponse {
  contacts: Contact[];
  infoText: string;
  onlineChat: OnlineChat;
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

// ============ API Keys Types ============
export interface ApiKeyAccess {
  key: string;              // e.g., 'EX_ABC123...'
  isActive: boolean;
  secret?: string;          // Only returned on creation (save immediately!)
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

// ============ Exchanger Response Types ============

// Routes V2 response with currencies map
export interface RoutesV2Response {
  isUpdated: boolean;
  currencies: Record<string, {
    id: string;
    xml: string;
    name: string;
    symbol: string;
    image: string;
    positionIn: number;
    positionOut: number;
    reserveAmount: number;
    isActive: boolean;
  }>;
  routes: Array<{
    routeId: string;
    from: string;           // Currency ID
    to: string;             // Currency ID
    isShowWeb: boolean;
    isShowBot: boolean;
    reserveAmountAdditional: number;
    seoFriendlyURL: string;
  }>;
}

// Route detail response
export interface RouteDetailResponse {
  route: {
    routeId: string;
    instructions?: string;
    requiredDocuments?: string;
    from: {
      _id?: string;
      name: string;
      symbol: string;
      xml: string;
      decimal: number;
      verification?: boolean;
      verificationText?: string;
      discounts?: Array<{ minAmount: number; maxAmount: number; percent: number }>;
      fields?: RouteField[];
      paymentDetails?: {
        merchantEnabled?: boolean;
        merchant?: {
          template: string;
          data: unknown;
        };
        amlEnabled?: boolean;
        aml?: unknown;
      };
      min?: number;
      max?: number;
      image?: { files: { type: string; url: string }[] };
      usdRate?: number;
    };
    to: {
      _id?: string;
      name: string;
      symbol: string;
      xml: string;
      decimal: number;
      verificationPayout?: boolean;
      verificationPayoutText?: string;
      payoutEnabled?: boolean;
      payout?: string;
      fields?: RouteField[];
      image?: { files: { type: string; url: string }[] };
      usdRate?: number;
      minFee?: number;
      amlPayoutEnabled?: boolean;
      amlPayout?: unknown;
    };
    fields?: RouteField[];
    rate: {
      in: number;
      out: number;
      rateFullNumber?: string;
      typeCalculate?: string;
      changePercentReCalculate?: number;
      amount?: number;
      outFeeAmount?: number;
      outFeeMinimal?: number;
      changeFeePercent?: number;
      lossFeePercent?: number;
      lossFeeAmount?: number;
      sourceType?: string;
      specialReserve?: number;
    };
    additionalServices?: Array<{
      _id: string;
      title: string;
      description: string;
      amount: number;
    }>;
    verification?: boolean;
    verificationText?: string;
    verificationRequiredImagesCount?: number;
    requiredVerificationUser?: boolean;
    requiredVerificationPhone?: boolean;
    requiredOnlyForAuthed?: boolean;
    isAutoPayout?: boolean;
    seo?: { friendlyURL: string };
    orderTTL?: number;
    disableUserDiscounts?: boolean;
  };
}

// Route field definition
export interface RouteField {
  _id: string;
  name: string;
  type: string;
  required: boolean;
  placeholder?: string;
  description?: string;
  regex?: string;
  min?: number;
  max?: number;
  options?: string[];
}

// Order response (create/get)
export interface OrderResponse {
  order: {
    TYPE?: string;
    _id: string;
    rid: string;
    uid: number;
    partner?: string;
    inAmount: number;
    outAmount: number;
    fromValues?: Array<{ field?: string; name?: string; key?: string; value: string }>;
    toValues?: Array<{ field?: string; name?: string; key?: string; value: string }>;
    routeValues?: Array<{ field?: string; name?: string; key?: string; value: string }>;
    status: string;
    createdAt: string;
    clientCallbackUrl?: string;
    comment?: string;
    route: {
      routeId: string;
      instructions?: string;
      requiredDocuments?: string;
      from: {
        _id?: string;
        name: string;
        symbol: string;
        xml: string;
        decimal: number;
        verification?: boolean;
        verificationText?: string;
        paymentDetails?: {
          merchantEnabled?: boolean;
          merchant?: {
            template: string;
            data: unknown;
          };
        };
        image?: { files: { type: string; url: string }[] };
      };
      to: {
        _id?: string;
        name: string;
        symbol: string;
        xml: string;
        decimal: number;
        verificationPayout?: boolean;
        verificationPayoutText?: string;
        image?: { files: { type: string; url: string }[] };
      };
      verification?: boolean;
      verificationText?: string;
      verificationRequiredImagesCount?: number;
    };
    expiresAt: string;
    telegram?: unknown;
    rate: number;
    rateTypeCalculate?: string;
    feeToAmount?: number;
    additionalParams?: unknown;
  };
  verifications?: Array<{
    _id: string;
    status: string;
    type: string;
  }>;
}

// Order create response (simplified)
export interface OrderCreateResponse {
  uid: number;
  secret: string;
  rid: string;
  status: string;
  route: {
    from: { name: string; symbol: string };
    to: { name: string; symbol: string };
    inAmount: number;
    outAmount: number;
  };
  expiresAt: string;
}

// Last orders response
export interface LastOrdersResponse {
  orders: Array<{
    typeClient: string;
    inAmount: number;
    outAmount: number;
    createdAt: string;
    route: {
      routeId: string;
      from: {
        name: string;
        symbol: string;
        xml: string;
        decimal: number;
        image?: { files: { type: string; url: string }[] };
      };
      to: {
        name: string;
        symbol: string;
        xml: string;
        decimal: number;
        image?: { files: { type: string; url: string }[] };
      };
    };
  }>;
  disable: boolean;
}

// Order history response
export interface OrderHistoryResponse {
  orders: Array<{
    _id: string;
    uid: number;
    rid: string;
    status: string;
    inAmount: number;
    outAmount: number;
    createdAt: string;
    updatedAt?: string;
    route: {
      routeId: string;
      from: {
        name: string;
        symbol: string;
        xml: string;
        decimal: number;
        image?: { files: { type: string; url: string }[] };
      };
      to: {
        name: string;
        symbol: string;
        xml: string;
        decimal: number;
        image?: { files: { type: string; url: string }[] };
      };
    };
    expiresAt?: string;
  }>;
  count: {
    total: number;
    pages: number;
    select_page: number;
    limit: number;
    offset: number;
  };
}

// Order chart data response
export interface OrderChartResponse {
  statistics: Array<{
    date: string;
    sumAmountsUSD: number;
    avgAmountsUSD: number;
    doneOrders: number;
    count: number;
  }>;
}

// Favorite rate item (popular/featured rates)
export interface FavoriteRate {
  name: string;           // Display name for the rate
  rate: number;           // Exchange rate value
  service?: string;       // Service name (optional)
}

// Favorite rates response
export interface FavoriteRatesResponse {
  rates: FavoriteRate[];
}
