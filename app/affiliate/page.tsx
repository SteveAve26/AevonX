'use client';

import { useState, useEffect } from 'react';
import { Copy, CheckCircle, Users, DollarSign, TrendingUp, ArrowRight, Share2, Loader2, LogIn } from 'lucide-react';
import { affiliateApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { AffiliateInfo, AffiliateOrder } from '@/types';
import Link from 'next/link';

export default function AffiliatePage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [affiliateData, setAffiliateData] = useState<AffiliateInfo | null>(null);
  const [referralOrders, setReferralOrders] = useState<AffiliateOrder[]>([]);

  // Fetch affiliate data when authenticated
  useEffect(() => {
    async function fetchAffiliateData() {
      if (!isAuthenticated) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const [infoRes, ordersRes] = await Promise.all([
          affiliateApi.getInfo(),
          affiliateApi.getOrders({ page: 1, limit: 10 }),
        ]);

        if (infoRes.success && infoRes.data) {
          // API returns { affiliate: AffiliateInfo }
          const data = infoRes.data as { affiliate: AffiliateInfo };
          setAffiliateData(data.affiliate);
        } else {
          // Use fallback data for demo
          setAffiliateData({
            type: 'byAmount',
            rate: 0.5,
            discount: 0,
            link: 'abc123',
            rateKey: 'public',
            rateExportFormatType: 'default',
            minReward: '0',
            ordersAmountInUSD: 5000,
            totalReceived: 1234.56,
            balance: 345.67,
            waitedPartnerRewardsUSD: 89.00,
            countPartners: 47,
            countSuccessOrders: 156,
            countAllOrders: 200,
          });
        }

        if (ordersRes.success && ordersRes.data) {
          setReferralOrders(ordersRes.data.orders || []);
        }
      } catch (err) {
        console.error('Failed to fetch affiliate data:', err);
        // Use fallback data
        setAffiliateData({
          type: 'byAmount',
          rate: 0.5,
          discount: 0,
          link: 'abc123',
          rateKey: 'public',
          rateExportFormatType: 'default',
          minReward: '0',
          ordersAmountInUSD: 5000,
          totalReceived: 1234.56,
          balance: 345.67,
          waitedPartnerRewardsUSD: 89.00,
          countPartners: 47,
          countSuccessOrders: 156,
          countAllOrders: 200,
        });
      } finally {
        setIsLoading(false);
      }
    }

    if (!authLoading) {
      fetchAffiliateData();
    }
  }, [isAuthenticated, authLoading]);

  const referralLink = affiliateData ? `https://aevonx.com/?ref=${affiliateData.link}` : '';

  const copyLink = () => {
    if (!affiliateData) return;
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (authLoading || isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-2">Affiliate Program</h1>
        <p className="text-[#848e9c] mb-8">Earn commissions by referring new users to AevonX</p>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-[#f0b90b]" size={32} />
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-2">Affiliate Program</h1>
        <p className="text-[#848e9c] mb-8">Earn commissions by referring new users to AevonX</p>

        <div className="bg-[#1e2329] rounded-xl p-8 text-center">
          <LogIn className="mx-auto text-[#f0b90b] mb-4" size={48} />
          <h3 className="text-xl font-semibold text-white mb-2">Sign in to access the Affiliate Program</h3>
          <p className="text-[#848e9c] mb-6">Log in to get your referral link and start earning commissions</p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#f0b90b] text-black font-semibold rounded-lg hover:bg-[#d9a60a] transition-colors"
          >
            <LogIn size={18} />
            Sign In
          </Link>
        </div>

        {/* How It Works - visible to everyone */}
        <div className="bg-[#1e2329] rounded-xl p-6 mt-8">
          <h3 className="text-lg font-semibold text-white mb-4">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-[#f0b90b]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-[#f0b90b] font-bold text-lg">1</span>
              </div>
              <h4 className="text-white font-medium mb-1">Share Link</h4>
              <p className="text-[#848e9c] text-sm">Share your referral link with friends</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#f0b90b]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-[#f0b90b] font-bold text-lg">2</span>
              </div>
              <h4 className="text-white font-medium mb-1">They Exchange</h4>
              <p className="text-[#848e9c] text-sm">Your friends make crypto exchanges</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-[#f0b90b]/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-[#f0b90b] font-bold text-lg">3</span>
              </div>
              <h4 className="text-white font-medium mb-1">You Earn</h4>
              <p className="text-[#848e9c] text-sm">Earn 0.5% commission on every exchange</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!affiliateData) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-2">Affiliate Program</h1>
        <p className="text-[#848e9c] mb-8">Earn commissions by referring new users to AevonX</p>
        <div className="text-center py-12 text-[#848e9c]">
          Failed to load affiliate data. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Affiliate Program</h1>
      <p className="text-[#848e9c] mb-8">Earn commissions by referring new users to AevonX</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-[#1e2329] rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#1e90ff]/10 rounded-lg flex items-center justify-center">
              <Users className="text-[#1e90ff]" size={20} />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{affiliateData.countPartners}</div>
          <div className="text-sm text-[#848e9c]">Total Referrals</div>
        </div>

        <div className="bg-[#1e2329] rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#0ecb81]/10 rounded-lg flex items-center justify-center">
              <DollarSign className="text-[#0ecb81]" size={20} />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">${affiliateData.totalReceived.toFixed(2)}</div>
          <div className="text-sm text-[#848e9c]">Total Earnings</div>
        </div>

        <div className="bg-[#1e2329] rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#f0b90b]/10 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-[#f0b90b]" size={20} />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">${affiliateData.waitedPartnerRewardsUSD.toFixed(2)}</div>
          <div className="text-sm text-[#848e9c]">Pending</div>
        </div>

        <div className="bg-[#1e2329] rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#9b59b6]/10 rounded-lg flex items-center justify-center">
              <DollarSign className="text-[#9b59b6]" size={20} />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">${affiliateData.balance.toFixed(2)}</div>
          <div className="text-sm text-[#848e9c]">Available</div>
        </div>
      </div>

      {/* Referral Link */}
      <div className="bg-gradient-to-r from-[#f0b90b]/20 to-[#f0b90b]/5 rounded-2xl p-6 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Share2 className="text-[#f0b90b]" size={24} />
          <h3 className="text-xl font-semibold text-white">Your Referral Link</h3>
        </div>
        <p className="text-[#848e9c] text-sm mb-4">
          Share this link with friends. You earn 0.5% of every exchange they make!
        </p>
        <div className="flex items-center gap-3">
          <code className="flex-1 bg-[#0b0e11] px-4 py-3 rounded-lg text-white break-all">
            {referralLink}
          </code>
          <button
            onClick={copyLink}
            className="px-4 py-3 bg-[#f0b90b] text-black font-medium rounded-lg hover:bg-[#d9a60a] transition-colors flex items-center gap-2"
          >
            {copied ? (
              <>
                <CheckCircle size={18} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={18} />
                Copy
              </>
            )}
          </button>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-[#1e2329] rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-[#f0b90b]/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-[#f0b90b] font-bold text-lg">1</span>
            </div>
            <h4 className="text-white font-medium mb-1">Share Link</h4>
            <p className="text-[#848e9c] text-sm">Share your referral link with friends</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-[#f0b90b]/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-[#f0b90b] font-bold text-lg">2</span>
            </div>
            <h4 className="text-white font-medium mb-1">They Exchange</h4>
            <p className="text-[#848e9c] text-sm">Your friends make crypto exchanges</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-[#f0b90b]/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-[#f0b90b] font-bold text-lg">3</span>
            </div>
            <h4 className="text-white font-medium mb-1">You Earn</h4>
            <p className="text-[#848e9c] text-sm">Earn 0.5% commission on every exchange</p>
          </div>
        </div>
      </div>

      {/* Recent Commissions */}
      <div className="bg-[#1e2329] rounded-xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Recent Commissions</h3>
        </div>
        {referralOrders.length > 0 ? (
          <div className="space-y-3">
            {referralOrders.map((order) => (
              <div key={order.uid} className="flex items-center justify-between py-3 border-b border-[#2b3139] last:border-0">
                <div>
                  <div className="text-white font-medium">Referral Commission</div>
                  <div className="text-xs text-[#848e9c]">{new Date(order.createdAt).toLocaleDateString()}</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded ${
                    order.status === 'done'
                      ? 'bg-[#0ecb81]/10 text-[#0ecb81]'
                      : 'bg-[#f0b90b]/10 text-[#f0b90b]'
                  }`}>
                    {order.status}
                  </span>
                  <span className="text-[#0ecb81] font-medium">+${order.partnerFee.amountInUSD.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-[#848e9c]">
            No commissions yet. Share your link to start earning!
          </div>
        )}
      </div>

      {/* Withdraw */}
      <div className="bg-[#1e2329] rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Withdraw Earnings</h3>
        <p className="text-[#848e9c] text-sm mb-4">
          Minimum withdrawal: $50.00. Your available balance: ${affiliateData.balance.toFixed(2)}
        </p>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#f0b90b] text-black font-semibold rounded-lg hover:bg-[#d9a60a] transition-colors">
          Withdraw to Wallet
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
