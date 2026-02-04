'use client';

import { useState, useEffect } from 'react';
import { Copy, Download, Upload, QrCode, CheckCircle, ArrowUpRight, ArrowDownRight, Loader2, LogIn } from 'lucide-react';
import { walletApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { userWallets as fallbackWallets } from '@/lib/mock/data';
import { Wallet, WalletTransaction } from '@/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function WalletPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch wallets when authenticated
  useEffect(() => {
    async function fetchWallets() {
      if (!isAuthenticated) {
        setWallets([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const [walletsRes, transactionsRes] = await Promise.all([
          walletApi.getBalances(),
          walletApi.getTransactions(),
        ]);

        if (walletsRes.success && walletsRes.data) {
          setWallets(walletsRes.data);
          if (walletsRes.data.length > 0) {
            setSelectedWallet(walletsRes.data[0]);
          }
        } else {
          // Use fallback data for demo
          setWallets(fallbackWallets);
          setSelectedWallet(fallbackWallets[0]);
        }

        if (transactionsRes.success && transactionsRes.data) {
          setTransactions(transactionsRes.data.transactions || []);
        }
      } catch (err) {
        console.error('Failed to fetch wallets:', err);
        // Use fallback data
        setWallets(fallbackWallets);
        setSelectedWallet(fallbackWallets[0]);
      } finally {
        setIsLoading(false);
      }
    }

    if (!authLoading) {
      fetchWallets();
    }
  }, [isAuthenticated, authLoading]);

  const totalBalance = wallets.reduce((sum, w) => {
    // Simple USD conversion (mock)
    const rate = w.currency.code === 'BTC' ? 97000 : w.currency.code === 'ETH' ? 3400 : 1;
    return sum + (w.balance + w.lockedBalance) * rate;
  }, 0);

  const copyAddress = () => {
    if (!selectedWallet) return;
    navigator.clipboard.writeText(selectedWallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (authLoading || isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-2">Internal Wallet</h1>
        <p className="text-[#848e9c] mb-8">Manage your crypto balances</p>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-[#f0b90b]" size={32} />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-2">Internal Wallet</h1>
        <p className="text-[#848e9c] mb-8">Manage your crypto balances</p>

        <div className="bg-[#1e2329] rounded-xl p-8 text-center">
          <LogIn className="mx-auto text-[#f0b90b] mb-4" size={48} />
          <h3 className="text-xl font-semibold text-white mb-2">Sign in to access your wallet</h3>
          <p className="text-[#848e9c] mb-6">Log in to view your balances and manage your funds</p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#f0b90b] text-black font-semibold rounded-lg hover:bg-[#d9a60a] transition-colors"
          >
            <LogIn size={18} />
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Internal Wallet</h1>
      <p className="text-[#848e9c] mb-8">Manage your crypto balances</p>

      {/* Total Balance */}
      <div className="bg-gradient-to-r from-[#f0b90b]/20 to-[#f0b90b]/5 rounded-2xl p-6 mb-8">
        <div className="text-[#848e9c] text-sm mb-1">Total Balance</div>
        <div className="text-3xl font-bold text-white">${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Wallet List */}
        <div className="lg:col-span-1">
          <h3 className="text-lg font-semibold text-white mb-4">Your Wallets</h3>
          <div className="space-y-2">
            {wallets.map((wallet) => (
              <button
                key={wallet.id}
                onClick={() => setSelectedWallet(wallet)}
                className={cn(
                  'w-full flex items-center justify-between p-4 rounded-xl transition-colors',
                  selectedWallet?.id === wallet.id
                    ? 'bg-[#f0b90b]/10 border border-[#f0b90b]'
                    : 'bg-[#1e2329] hover:bg-[#2b3139]'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#f0b90b]/20 rounded-full flex items-center justify-center text-sm font-bold text-[#f0b90b]">
                    {wallet.currency.code.slice(0, 2)}
                  </div>
                  <div className="text-left">
                    <div className="text-white font-medium">{wallet.currency.code}</div>
                    <div className="text-xs text-[#848e9c]">{wallet.currency.name}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">{wallet.balance.toFixed(wallet.balance < 1 ? 8 : 4)}</div>
                  {wallet.lockedBalance > 0 && (
                    <div className="text-xs text-[#f0b90b]">+{wallet.lockedBalance} locked</div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Wallet Details */}
        <div className="lg:col-span-2 space-y-6">
          {selectedWallet && (
            <>
              {/* Deposit Address */}
              <div className="bg-[#1e2329] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                  Deposit {selectedWallet.currency.code}
                </h3>

                <div className="flex items-center gap-4 mb-4">
                  <div className="w-24 h-24 bg-white rounded-xl flex items-center justify-center">
                    <QrCode size={64} className="text-black" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-[#848e9c] mb-2">Deposit Address</div>
                    <div className="flex items-center gap-2">
                      <code className="flex-1 bg-[#2b3139] px-3 py-2 rounded text-white text-sm break-all">
                        {selectedWallet.address}
                      </code>
                      <button
                        onClick={copyAddress}
                        className="p-2 bg-[#2b3139] rounded hover:bg-[#3a4149] transition-colors"
                      >
                        {copied ? (
                          <CheckCircle size={18} className="text-[#0ecb81]" />
                        ) : (
                          <Copy size={18} className="text-[#848e9c]" />
                        )}
                      </button>
                    </div>
                    {selectedWallet.currency.network && (
                      <div className="text-xs text-[#f0b90b] mt-2">
                        Network: {selectedWallet.currency.network}
                      </div>
                    )}
                  </div>
                </div>
              </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 p-4 bg-[#0ecb81] text-white font-medium rounded-xl hover:bg-[#0ecb81]/90 transition-colors">
              <Download size={20} />
              Deposit
            </button>
            <button className="flex items-center justify-center gap-2 p-4 bg-[#1e2329] text-white font-medium rounded-xl hover:bg-[#2b3139] transition-colors">
              <Upload size={20} />
              Withdraw
            </button>
          </div>

              {/* Transaction History */}
              <div className="bg-[#1e2329] rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Transactions</h3>
                {transactions.length > 0 ? (
                  <div className="space-y-3">
                    {transactions.map((tx) => (
                      <div key={tx.id} className="flex items-center justify-between py-3 border-b border-[#2b3139] last:border-0">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            'w-10 h-10 rounded-full flex items-center justify-center',
                            tx.type === 'deposit' ? 'bg-[#0ecb81]/10' : 'bg-[#f6465d]/10'
                          )}>
                            {tx.type === 'deposit' ? (
                              <ArrowDownRight className="text-[#0ecb81]" size={20} />
                            ) : (
                              <ArrowUpRight className="text-[#f6465d]" size={20} />
                            )}
                          </div>
                          <div>
                            <div className="text-white font-medium capitalize">{tx.type}</div>
                            <div className="text-xs text-[#848e9c]">{new Date(tx.createdAt).toLocaleDateString()}</div>
                          </div>
                        </div>
                        <div className={cn(
                          'font-medium',
                          tx.type === 'deposit' ? 'text-[#0ecb81]' : 'text-[#f6465d]'
                        )}>
                          {tx.type === 'deposit' ? '+' : '-'}{tx.amount} {tx.currencyCode}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-[#848e9c]">
                    No transactions yet
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
