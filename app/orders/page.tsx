'use client';

import { useState, useEffect } from 'react';
import { Search, ArrowRight, Clock, CheckCircle, XCircle, AlertCircle, ExternalLink, Loader2, LogIn } from 'lucide-react';
import { exchangerApi } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { recentOrders as fallbackOrders } from '@/lib/mock/data';
import { ExchangeOrder } from '@/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const statusConfig: Record<string, { icon: typeof Clock; color: string; bg: string }> = {
  pending: { icon: Clock, color: 'text-[#848e9c]', bg: 'bg-[#848e9c]/10' },
  waiting: { icon: Clock, color: 'text-[#f0b90b]', bg: 'bg-[#f0b90b]/10' },
  confirming: { icon: AlertCircle, color: 'text-[#f0b90b]', bg: 'bg-[#f0b90b]/10' },
  exchanging: { icon: AlertCircle, color: 'text-[#1e90ff]', bg: 'bg-[#1e90ff]/10' },
  completed: { icon: CheckCircle, color: 'text-[#0ecb81]', bg: 'bg-[#0ecb81]/10' },
  failed: { icon: XCircle, color: 'text-[#f6465d]', bg: 'bg-[#f6465d]/10' },
  cancelled: { icon: XCircle, color: 'text-[#f6465d]', bg: 'bg-[#f6465d]/10' },
};

export default function OrdersPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [orders, setOrders] = useState<ExchangeOrder[]>([]);
  const [searchId, setSearchId] = useState('');
  const [filter, setFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [trackOrderId, setTrackOrderId] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<ExchangeOrder | null>(null);
  const [trackError, setTrackError] = useState('');
  const [isTracking, setIsTracking] = useState(false);

  // Fetch orders when authenticated
  useEffect(() => {
    async function fetchOrders() {
      if (!isAuthenticated) {
        setOrders([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const response = await exchangerApi.getOrderHistory();
        if (response.success && response.data) {
          setOrders(response.data.orders || []);
        }
      } catch (err) {
        console.error('Failed to fetch orders:', err);
        // Use fallback data for demo
        setOrders(fallbackOrders);
      } finally {
        setIsLoading(false);
      }
    }
    if (!authLoading) {
      fetchOrders();
    }
  }, [isAuthenticated, authLoading]);

  // Track single order by ID
  const handleTrackOrder = async () => {
    if (!trackOrderId.trim()) return;

    setIsTracking(true);
    setTrackError('');
    setTrackedOrder(null);

    try {
      const response = await exchangerApi.getOrder(trackOrderId.trim());
      if (response.success && response.data) {
        setTrackedOrder(response.data);
      } else {
        setTrackError(response.error || 'Order not found');
      }
    } catch (err) {
      setTrackError('Failed to track order. Please check the ID and try again.');
    } finally {
      setIsTracking(false);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (searchId && !order.id.toLowerCase().includes(searchId.toLowerCase())) {
      return false;
    }
    if (filter !== 'all' && order.status !== filter) {
      return false;
    }
    return true;
  });

  if (authLoading || isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-2">Order History</h1>
        <p className="text-[#848e9c] mb-8">Track and manage your exchange orders</p>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-[#f0b90b]" size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Order History</h1>
      <p className="text-[#848e9c] mb-8">Track and manage your exchange orders</p>

      {/* Login Prompt for unauthenticated users */}
      {!isAuthenticated && (
        <div className="bg-[#1e2329] rounded-xl p-6 mb-8 text-center">
          <LogIn className="mx-auto text-[#f0b90b] mb-4" size={48} />
          <h3 className="text-lg font-semibold text-white mb-2">Sign in to view your orders</h3>
          <p className="text-[#848e9c] mb-4">Log in to see your complete order history</p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#f0b90b] text-black font-semibold rounded-lg hover:bg-[#d9a60a] transition-colors"
          >
            <LogIn size={18} />
            Sign In
          </Link>
        </div>
      )}

      {/* Search & Filter - only show when authenticated */}
      {isAuthenticated && (
        <>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#848e9c]" size={18} />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="Search by Order ID..."
                className="w-full pl-11 pr-4 py-3 bg-[#1e2329] border border-[#2b3139] rounded-xl text-white placeholder-[#848e9c] focus:outline-none focus:border-[#f0b90b]"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-3 bg-[#1e2329] border border-[#2b3139] rounded-xl text-white focus:outline-none focus:border-[#f0b90b]"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="waiting">Waiting</option>
              <option value="exchanging">Exchanging</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
            </select>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const status = statusConfig[order.status] || statusConfig.pending;
              const StatusIcon = status.icon;

              return (
                <div key={order.id} className="bg-[#1e2329] rounded-xl p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <code className="text-[#848e9c] text-sm">#{order.id}</code>
                      <div className={cn('flex items-center gap-1 px-2 py-1 rounded text-xs font-medium', status.bg, status.color)}>
                        <StatusIcon size={12} />
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </div>
                    </div>
                    <div className="text-sm text-[#848e9c]">
                      {new Date(order.createdAt).toLocaleString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex-1 bg-[#2b3139] rounded-lg p-3">
                      <div className="text-xs text-[#848e9c] mb-1">You Send</div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-[#f0b90b]/20 rounded-full flex items-center justify-center text-xs font-bold text-[#f0b90b]">
                          {order.fromCurrency.code.slice(0, 2)}
                        </div>
                        <span className="text-white font-medium">
                          {order.fromAmount} {order.fromCurrency.code}
                        </span>
                      </div>
                    </div>

                    <ArrowRight className="text-[#848e9c] flex-shrink-0" size={20} />

                    <div className="flex-1 bg-[#2b3139] rounded-lg p-3">
                      <div className="text-xs text-[#848e9c] mb-1">You Receive</div>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-[#0ecb81]/20 rounded-full flex items-center justify-center text-xs font-bold text-[#0ecb81]">
                          {order.toCurrency.code.slice(0, 2)}
                        </div>
                        <span className="text-white font-medium">
                          {order.toAmount.toLocaleString()} {order.toCurrency.code}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="text-[#848e9c]">
                      Rate: 1 {order.fromCurrency.code} = {order.rate.toFixed(order.rate >= 1 ? 2 : 8)} {order.toCurrency.code}
                    </div>
                    <button className="flex items-center gap-1 text-[#f0b90b] hover:underline">
                      View Details
                      <ExternalLink size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12 bg-[#1e2329] rounded-xl">
              <p className="text-[#848e9c]">No orders found</p>
            </div>
          )}
        </>
      )}

      {/* Track Order by ID */}
      <div className="mt-12 bg-[#1e2329] rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Track Order</h3>
        <p className="text-[#848e9c] text-sm mb-4">
          Enter your order ID to track its status without logging in.
        </p>
        <div className="flex gap-3">
          <input
            type="text"
            value={trackOrderId}
            onChange={(e) => setTrackOrderId(e.target.value)}
            placeholder="Enter Order ID"
            className="flex-1 px-4 py-3 bg-[#2b3139] rounded-lg text-white placeholder-[#848e9c] focus:outline-none focus:ring-2 focus:ring-[#f0b90b]"
          />
          <button
            onClick={handleTrackOrder}
            disabled={isTracking || !trackOrderId.trim()}
            className="px-6 py-3 bg-[#f0b90b] text-black font-medium rounded-lg hover:bg-[#d9a60a] transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {isTracking ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Tracking...
              </>
            ) : (
              'Track'
            )}
          </button>
        </div>

        {/* Track Error */}
        {trackError && (
          <div className="mt-4 p-3 bg-[#f6465d]/10 border border-[#f6465d]/20 rounded-lg text-[#f6465d] text-sm">
            {trackError}
          </div>
        )}

        {/* Tracked Order Result */}
        {trackedOrder && (
          <div className="mt-4 bg-[#2b3139] rounded-xl p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <code className="text-[#848e9c] text-sm">#{trackedOrder.id}</code>
                {(() => {
                  const status = statusConfig[trackedOrder.status] || statusConfig.pending;
                  const StatusIcon = status.icon;
                  return (
                    <div className={cn('flex items-center gap-1 px-2 py-1 rounded text-xs font-medium', status.bg, status.color)}>
                      <StatusIcon size={12} />
                      {trackedOrder.status.charAt(0).toUpperCase() + trackedOrder.status.slice(1)}
                    </div>
                  );
                })()}
              </div>
              <div className="text-sm text-[#848e9c]">
                {new Date(trackedOrder.createdAt).toLocaleString()}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex-1 bg-[#1e2329] rounded-lg p-3">
                <div className="text-xs text-[#848e9c] mb-1">You Send</div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#f0b90b]/20 rounded-full flex items-center justify-center text-xs font-bold text-[#f0b90b]">
                    {trackedOrder.fromCurrency.code.slice(0, 2)}
                  </div>
                  <span className="text-white font-medium">
                    {trackedOrder.fromAmount} {trackedOrder.fromCurrency.code}
                  </span>
                </div>
              </div>

              <ArrowRight className="text-[#848e9c] flex-shrink-0" size={20} />

              <div className="flex-1 bg-[#1e2329] rounded-lg p-3">
                <div className="text-xs text-[#848e9c] mb-1">You Receive</div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#0ecb81]/20 rounded-full flex items-center justify-center text-xs font-bold text-[#0ecb81]">
                    {trackedOrder.toCurrency.code.slice(0, 2)}
                  </div>
                  <span className="text-white font-medium">
                    {trackedOrder.toAmount.toLocaleString()} {trackedOrder.toCurrency.code}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
