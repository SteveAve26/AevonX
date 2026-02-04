import apiClient from './config';
import { Wallet, WalletTransaction } from '@/types';

export const walletApi = {
  // Get user wallets/balances
  getBalances: () =>
    apiClient.get<Wallet[]>('/user/wallets/balance'),

  // Get wallet address for a currency
  getAddress: (currencyId: string) =>
    apiClient.get<{ address: string; currency: string }>('/user/wallets/address', { currencyId }),

  // Get transactions
  getTransactions: (params?: { page?: number; limit?: number; currencyId?: string }) =>
    apiClient.get<{ transactions: WalletTransaction[]; total: number }>('/user/wallets/transaction/list', params as Record<string, string>),
};

export default walletApi;
