import { Currency, ExchangeRoute, ExchangeOrder, Wallet, Review, FAQItem, FAQGroup, NewsArticle } from '@/types';

// ============ Currencies ============
export const currencies: Currency[] = [
  { id: 'btc', code: 'BTC', name: 'Bitcoin', type: 'crypto', network: 'Bitcoin' },
  { id: 'eth', code: 'ETH', name: 'Ethereum', type: 'crypto', network: 'ERC-20' },
  { id: 'usdt-erc20', code: 'USDT', name: 'Tether ERC-20', type: 'crypto', network: 'ERC-20' },
  { id: 'usdt-trc20', code: 'USDT', name: 'Tether TRC-20', type: 'crypto', network: 'TRC-20' },
  { id: 'ltc', code: 'LTC', name: 'Litecoin', type: 'crypto', network: 'Litecoin' },
  { id: 'xrp', code: 'XRP', name: 'Ripple', type: 'crypto', network: 'XRP Ledger' },
  { id: 'sol', code: 'SOL', name: 'Solana', type: 'crypto', network: 'Solana' },
  { id: 'bnb', code: 'BNB', name: 'BNB', type: 'crypto', network: 'BEP-20' },
  { id: 'trx', code: 'TRX', name: 'TRON', type: 'crypto', network: 'TRC-20' },
  { id: 'usd', code: 'USD', name: 'US Dollar', type: 'fiat' },
  { id: 'eur', code: 'EUR', name: 'Euro', type: 'fiat' },
  { id: 'rub', code: 'RUB', name: 'Russian Ruble', type: 'fiat' },
];

// ============ Exchange Routes ============
export const exchangeRoutes: ExchangeRoute[] = [
  {
    id: 'btc-usdt',
    fromCurrency: currencies[0], // BTC
    toCurrency: currencies[2], // USDT ERC-20
    rate: 97234.56,
    minAmount: 0.001,
    maxAmount: 10,
    reserve: 500000,
    isActive: true,
  },
  {
    id: 'eth-usdt',
    fromCurrency: currencies[1], // ETH
    toCurrency: currencies[2], // USDT ERC-20
    rate: 3456.78,
    minAmount: 0.01,
    maxAmount: 100,
    reserve: 250000,
    isActive: true,
  },
  {
    id: 'usdt-btc',
    fromCurrency: currencies[2], // USDT ERC-20
    toCurrency: currencies[0], // BTC
    rate: 0.0000103,
    minAmount: 100,
    maxAmount: 100000,
    reserve: 5.5,
    isActive: true,
  },
  {
    id: 'usdt-eth',
    fromCurrency: currencies[2], // USDT ERC-20
    toCurrency: currencies[1], // ETH
    rate: 0.000289,
    minAmount: 50,
    maxAmount: 50000,
    reserve: 75,
    isActive: true,
  },
  {
    id: 'ltc-usdt',
    fromCurrency: currencies[4], // LTC
    toCurrency: currencies[2], // USDT
    rate: 125.45,
    minAmount: 0.1,
    maxAmount: 500,
    reserve: 100000,
    isActive: true,
  },
  {
    id: 'sol-usdt',
    fromCurrency: currencies[6], // SOL
    toCurrency: currencies[2], // USDT
    rate: 198.50,
    minAmount: 0.5,
    maxAmount: 1000,
    reserve: 150000,
    isActive: true,
  },
  {
    id: 'xrp-usdt',
    fromCurrency: currencies[5], // XRP
    toCurrency: currencies[2], // USDT
    rate: 2.35,
    minAmount: 50,
    maxAmount: 50000,
    reserve: 200000,
    isActive: true,
  },
  {
    id: 'bnb-usdt',
    fromCurrency: currencies[7], // BNB
    toCurrency: currencies[2], // USDT
    rate: 645.30,
    minAmount: 0.1,
    maxAmount: 200,
    reserve: 80000,
    isActive: true,
  },
];

// ============ Recent Orders (public) ============
export const recentOrders: ExchangeOrder[] = [
  {
    id: 'ord-001',
    status: 'completed',
    fromCurrency: currencies[0],
    toCurrency: currencies[2],
    fromAmount: 0.5,
    toAmount: 48617.28,
    rate: 97234.56,
    toAddress: '0x1234...5678',
    createdAt: new Date(Date.now() - 300000).toISOString(),
    updatedAt: new Date(Date.now() - 60000).toISOString(),
  },
  {
    id: 'ord-002',
    status: 'completed',
    fromCurrency: currencies[1],
    toCurrency: currencies[2],
    fromAmount: 2.5,
    toAmount: 8641.95,
    rate: 3456.78,
    toAddress: '0xabcd...efgh',
    createdAt: new Date(Date.now() - 600000).toISOString(),
    updatedAt: new Date(Date.now() - 300000).toISOString(),
  },
  {
    id: 'ord-003',
    status: 'exchanging',
    fromCurrency: currencies[6],
    toCurrency: currencies[2],
    fromAmount: 50,
    toAmount: 9925,
    rate: 198.50,
    toAddress: '0x9876...5432',
    createdAt: new Date(Date.now() - 120000).toISOString(),
    updatedAt: new Date(Date.now() - 60000).toISOString(),
  },
];

// ============ User Wallets ============
export const userWallets: Wallet[] = [
  {
    id: 'wallet-btc',
    currency: currencies[0],
    address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    balance: 0.0234,
    lockedBalance: 0,
  },
  {
    id: 'wallet-eth',
    currency: currencies[1],
    address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0Ab3d',
    balance: 1.567,
    lockedBalance: 0.5,
  },
  {
    id: 'wallet-usdt',
    currency: currencies[2],
    address: '0x742d35Cc6634C0532925a3b844Bc9e7595f0Ab3d',
    balance: 5420.50,
    lockedBalance: 100,
  },
];

// ============ Reviews ============
export const reviews: Review[] = [
  {
    id: 'rev-1',
    author: 'John D.',
    rating: 5,
    content: 'Fast and reliable exchange service. Completed my BTC to USDT swap in minutes!',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    isVerified: true,
  },
  {
    id: 'rev-2',
    author: 'Maria S.',
    rating: 5,
    content: 'Great rates and excellent customer support. Highly recommended!',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    isVerified: true,
  },
  {
    id: 'rev-3',
    author: 'Alex K.',
    rating: 4,
    content: 'Good service overall. The interface is easy to use.',
    createdAt: new Date(Date.now() - 259200000).toISOString(),
    isVerified: false,
  },
];

// ============ FAQ ============
export const faqGroups: FAQGroup[] = [
  { id: 'general', name: 'General Questions', order: 1 },
  { id: 'exchange', name: 'Exchange Process', order: 2 },
  { id: 'security', name: 'Security', order: 3 },
  { id: 'fees', name: 'Fees & Limits', order: 4 },
];

export const faqItems: FAQItem[] = [
  {
    id: 'faq-1',
    groupId: 'general',
    question: 'What is AevonX?',
    answer: 'AevonX is a fast and secure cryptocurrency exchange platform that allows you to swap between various cryptocurrencies and fiat currencies with competitive rates.',
    order: 1,
  },
  {
    id: 'faq-2',
    groupId: 'general',
    question: 'Do I need to register to make an exchange?',
    answer: 'No, you can make exchanges without registration. However, creating an account gives you access to order history, affiliate program, and better limits.',
    order: 2,
  },
  {
    id: 'faq-3',
    groupId: 'exchange',
    question: 'How long does an exchange take?',
    answer: 'Most exchanges are completed within 5-30 minutes, depending on the blockchain network congestion and the currencies involved.',
    order: 1,
  },
  {
    id: 'faq-4',
    groupId: 'exchange',
    question: 'What happens if I send the wrong amount?',
    answer: 'If you send a different amount than specified, the exchange will be recalculated based on the actual amount received, minus any applicable fees.',
    order: 2,
  },
  {
    id: 'faq-5',
    groupId: 'security',
    question: 'Is my data secure?',
    answer: 'Yes, we use industry-standard encryption and security measures to protect your data. We do not store sensitive information longer than necessary.',
    order: 1,
  },
  {
    id: 'faq-6',
    groupId: 'fees',
    question: 'What are the exchange fees?',
    answer: 'Our fees are already included in the exchange rate you see. There are no hidden fees. Network fees for blockchain transactions are separate.',
    order: 1,
  },
];

// ============ News ============
export const newsArticles: NewsArticle[] = [
  {
    id: 'news-1',
    title: 'AevonX Adds Support for Solana (SOL)',
    slug: 'aevonx-adds-solana-support',
    excerpt: 'We are excited to announce that Solana (SOL) is now available for exchange on our platform.',
    content: 'We are excited to announce that Solana (SOL) is now available for exchange on our platform. You can now swap SOL with other supported cryptocurrencies at competitive rates.',
    image: '/news/solana.jpg',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    commentsCount: 5,
  },
  {
    id: 'news-2',
    title: 'Reduced Fees for High Volume Traders',
    slug: 'reduced-fees-high-volume',
    excerpt: 'Introducing our new tiered fee structure with discounts for high volume traders.',
    content: 'We are introducing a new tiered fee structure that rewards our high volume traders with reduced fees. Check out the new fee schedule in your account settings.',
    image: '/news/fees.jpg',
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    commentsCount: 12,
  },
];

// ============ Helper to simulate price changes ============
export function simulatePriceChange(routes: ExchangeRoute[]): ExchangeRoute[] {
  return routes.map(route => ({
    ...route,
    rate: route.rate * (1 + (Math.random() - 0.5) * 0.002),
  }));
}
