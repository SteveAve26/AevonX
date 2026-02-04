import {
  Currency,
  ExchangeRoute,
  Review,
  NewsArticle,
  ApiCurrency,
  ApiRoute,
  ApiReview,
  ApiNewsArticle,
} from '@/types';

const API_IMAGE_BASE = 'https://www.develop.exchange';

// Transform API currency to internal Currency type
export function transformCurrency(apiCurrency: ApiCurrency): Currency {
  const imageFile = apiCurrency.image?.files?.find(f => f.type === 'small' || f.type === 'medium');

  return {
    id: apiCurrency.xml,
    code: apiCurrency.symbol,
    name: apiCurrency.name,
    icon: imageFile ? `${API_IMAGE_BASE}${imageFile.url}` : undefined,
    type: ['UAH', 'USD', 'EUR', 'RUB', 'PLN'].includes(apiCurrency.symbol) ? 'fiat' : 'crypto',
    network: apiCurrency.xml.includes('TRC20') ? 'TRC20' :
             apiCurrency.xml.includes('ERC20') ? 'ERC20' :
             apiCurrency.xml.includes('BEP20') ? 'BEP20' : undefined,
  };
}

// Transform API route to internal ExchangeRoute type
export function transformRoute(apiRoute: ApiRoute, index: number): ExchangeRoute {
  return {
    id: `${apiRoute.from.xml}-${apiRoute.to.xml}`,
    fromCurrency: transformCurrency(apiRoute.from),
    toCurrency: transformCurrency(apiRoute.to),
    rate: apiRoute.out / apiRoute.in || 1,
    minAmount: parseFloat(apiRoute.from.min) || 0,
    maxAmount: parseFloat(apiRoute.from.max) || 100000,
    reserve: apiRoute.amount || 0,
    isActive: true,
  };
}

// Currencies to exclude
const EXCLUDED_CURRENCIES = ['UAH', 'KZT'];

// Transform array of API routes (filtering out excluded currencies)
export function transformRoutes(apiRoutes: ApiRoute[]): ExchangeRoute[] {
  return apiRoutes
    .filter(route =>
      !EXCLUDED_CURRENCIES.includes(route.from.symbol) &&
      !EXCLUDED_CURRENCIES.includes(route.to.symbol)
    )
    .map((route, index) => transformRoute(route, index));
}

// Transform API review to internal Review type
export function transformReview(apiReview: ApiReview, index: number): Review {
  return {
    id: `review-${index}`,
    author: apiReview.name,
    rating: 5, // API doesn't provide rating, default to 5
    content: apiReview.message,
    createdAt: apiReview.createdAt,
    isVerified: true,
  };
}

// Transform array of API reviews
export function transformReviews(apiReviews: ApiReview[]): Review[] {
  return apiReviews.map((review, index) => transformReview(review, index));
}

// Transform API news article to internal NewsArticle type
export function transformNewsArticle(apiArticle: ApiNewsArticle): NewsArticle {
  return {
    id: apiArticle._id,
    title: apiArticle.title,
    slug: apiArticle._id,
    excerpt: apiArticle.description,
    content: apiArticle.content || apiArticle.description,
    publishedAt: apiArticle.createdAt,
    commentsCount: 0,
  };
}

// Transform array of API news articles
export function transformNewsArticles(apiArticles: ApiNewsArticle[]): NewsArticle[] {
  return apiArticles.map(article => transformNewsArticle(article));
}
