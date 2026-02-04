'use client';

import { useState, useEffect } from 'react';
import { Shield, Zap, Clock, TrendingUp, ArrowRight, Star, CheckCircle, Users, Globe, Sparkles, ChevronRight } from 'lucide-react';
import ExchangeForm from '@/components/exchange/ExchangeForm';
import { recentOrders, reviews, exchangeRoutes } from '@/lib/mock/data';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Animated counter component
function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

// Stats bar component
function StatsBar() {
  const stats = [
    { label: 'Total Exchanges', value: 156000, suffix: '+', icon: TrendingUp },
    { label: 'Active Users', value: 45000, suffix: '+', icon: Users },
    { label: 'Countries', value: 120, suffix: '+', icon: Globe },
    { label: 'Uptime', value: 99.9, suffix: '%', icon: Shield },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group relative bg-[#1e2329]/80 backdrop-blur-sm rounded-2xl p-4 md:p-5 border border-[#2b3139] hover:border-[#f0b90b]/30 transition-all duration-300"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#f0b90b]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
          <div className="relative">
            <stat.icon className="text-[#f0b90b] mb-2" size={20} />
            <div className="text-2xl md:text-3xl font-bold text-white">
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
            </div>
            <div className="text-[#848e9c] text-sm">{stat.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function RecentExchanges() {
  const [exchanges, setExchanges] = useState(recentOrders.slice(0, 5));

  return (
    <div className="bg-[#1e2329] rounded-2xl p-6 border border-[#2b3139]">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <span className="w-2 h-2 bg-[#0ecb81] rounded-full animate-pulse" />
          Live Exchanges
        </h3>
        <Link href="/orders" className="text-[#f0b90b] text-sm hover:underline flex items-center gap-1">
          View All <ChevronRight size={14} />
        </Link>
      </div>
      <div className="space-y-2">
        {exchanges.map((order, index) => (
          <div
            key={order.id}
            className="group flex items-center justify-between py-3 px-3 rounded-xl hover:bg-[#2b3139]/50 transition-all duration-200 cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <div className="w-9 h-9 bg-gradient-to-br from-[#f0b90b]/30 to-[#f0b90b]/10 rounded-full flex items-center justify-center text-xs font-bold text-[#f0b90b] border border-[#f0b90b]/20">
                  {order.fromCurrency.code.slice(0, 2)}
                </div>
                <div className="w-6 h-6 bg-[#2b3139] rounded-full flex items-center justify-center -ml-2 z-10">
                  <ArrowRight size={12} className="text-[#848e9c]" />
                </div>
                <div className="w-9 h-9 bg-gradient-to-br from-[#0ecb81]/30 to-[#0ecb81]/10 rounded-full flex items-center justify-center text-xs font-bold text-[#0ecb81] border border-[#0ecb81]/20 -ml-2">
                  {order.toCurrency.code.slice(0, 2)}
                </div>
              </div>
              <div>
                <div className="text-white text-sm font-medium group-hover:text-[#f0b90b] transition-colors">
                  {order.fromAmount} {order.fromCurrency.code}
                </div>
                <div className="text-xs text-[#848e9c]">
                  → {order.toAmount.toLocaleString()} {order.toCurrency.code}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={cn(
                'text-xs px-2.5 py-1 rounded-full font-medium',
                order.status === 'completed'
                  ? 'bg-[#0ecb81]/10 text-[#0ecb81] border border-[#0ecb81]/20'
                  : 'bg-[#f0b90b]/10 text-[#f0b90b] border border-[#f0b90b]/20'
              )}>
                {order.status === 'completed' ? 'Done' : 'Processing'}
              </div>
              <div className="text-xs text-[#848e9c] mt-1">
                {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PopularPairs() {
  return (
    <div className="bg-[#1e2329] rounded-2xl p-6 border border-[#2b3139]">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Sparkles className="text-[#f0b90b]" size={18} />
          Popular Pairs
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {exchangeRoutes.slice(0, 6).map((route, index) => (
          <Link
            href="/"
            key={route.id}
            className="group flex items-center justify-between p-4 bg-[#2b3139]/50 rounded-xl hover:bg-[#2b3139] border border-transparent hover:border-[#f0b90b]/20 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 bg-[#f0b90b]/20 rounded-full flex items-center justify-center text-xs font-bold text-[#f0b90b] border-2 border-[#1e2329]">
                  {route.fromCurrency.code.slice(0, 2)}
                </div>
                <div className="w-8 h-8 bg-[#0ecb81]/20 rounded-full flex items-center justify-center text-xs font-bold text-[#0ecb81] border-2 border-[#1e2329]">
                  {route.toCurrency.code.slice(0, 2)}
                </div>
              </div>
              <div>
                <span className="text-white font-medium text-sm group-hover:text-[#f0b90b] transition-colors">
                  {route.fromCurrency.code}/{route.toCurrency.code}
                </span>
                <div className="text-xs text-[#848e9c]">Exchange pair</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-[#0ecb81] font-semibold text-sm">
                {route.rate >= 1 ? route.rate.toFixed(2) : route.rate.toFixed(6)}
              </div>
              <div className="text-xs text-[#848e9c]">Rate</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Features() {
  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Exchange completed in minutes, not hours. Average time: 5 min.',
      color: 'from-[#f0b90b]/20 to-[#f0b90b]/5',
      iconBg: 'bg-[#f0b90b]/10',
      iconColor: 'text-[#f0b90b]',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'No registration required. Your data and funds are always safe.',
      color: 'from-[#0ecb81]/20 to-[#0ecb81]/5',
      iconBg: 'bg-[#0ecb81]/10',
      iconColor: 'text-[#0ecb81]',
    },
    {
      icon: Clock,
      title: '24/7 Available',
      description: 'Exchange anytime, anywhere. We never sleep, so you don\'t have to wait.',
      color: 'from-[#3b82f6]/20 to-[#3b82f6]/5',
      iconBg: 'bg-[#3b82f6]/10',
      iconColor: 'text-[#3b82f6]',
    },
    {
      icon: TrendingUp,
      title: 'Best Rates',
      description: 'Competitive rates with transparent fees. No hidden charges ever.',
      color: 'from-[#a855f7]/20 to-[#a855f7]/5',
      iconBg: 'bg-[#a855f7]/10',
      iconColor: 'text-[#a855f7]',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {features.map((feature, index) => (
        <div
          key={feature.title}
          className={cn(
            'group relative bg-[#1e2329] rounded-2xl p-6 border border-[#2b3139] overflow-hidden transition-all duration-300 hover:border-[#f0b90b]/30 hover:-translate-y-1'
          )}
        >
          {/* Background gradient */}
          <div className={cn('absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity', feature.color)} />

          <div className="relative">
            <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4', feature.iconBg)}>
              <feature.icon className={feature.iconColor} size={24} />
            </div>
            <h3 className="text-white font-semibold mb-2 group-hover:text-[#f0b90b] transition-colors">{feature.title}</h3>
            <p className="text-[#848e9c] text-sm leading-relaxed">{feature.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function ReviewsPreview() {
  return (
    <div className="bg-[#1e2329] rounded-2xl p-6 border border-[#2b3139]">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-semibold text-white">Customer Reviews</h3>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="text-[#f0b90b] fill-[#f0b90b]" />
              ))}
            </div>
            <span className="text-[#848e9c] text-sm">4.9 out of 5</span>
          </div>
        </div>
        <Link href="/reviews" className="text-[#f0b90b] text-sm hover:underline flex items-center gap-1">
          View All <ChevronRight size={14} />
        </Link>
      </div>
      <div className="space-y-4">
        {reviews.slice(0, 3).map((review) => (
          <div key={review.id} className="p-4 bg-[#2b3139]/50 rounded-xl hover:bg-[#2b3139] transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-[#f0b90b] to-[#d9a60a] rounded-full flex items-center justify-center text-sm font-bold text-black">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{review.author}</span>
                    {review.isVerified && (
                      <span className="flex items-center gap-1 text-xs text-[#0ecb81]">
                        <CheckCircle size={12} />
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-[#848e9c]">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={i < review.rating ? 'text-[#f0b90b] fill-[#f0b90b]' : 'text-[#848e9c]'}
                  />
                ))}
              </div>
            </div>
            <p className="text-[#b7bdc6] text-sm leading-relaxed">{review.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Floating particles background - using fixed positions to avoid hydration mismatch
const particlePositions = [
  { left: 5, top: 10, delay: 0.5, duration: 3 },
  { left: 15, top: 85, delay: 1.2, duration: 4 },
  { left: 25, top: 30, delay: 0.8, duration: 3.5 },
  { left: 35, top: 60, delay: 2.1, duration: 2.5 },
  { left: 45, top: 15, delay: 1.5, duration: 4.5 },
  { left: 55, top: 75, delay: 0.3, duration: 3.2 },
  { left: 65, top: 45, delay: 2.5, duration: 2.8 },
  { left: 75, top: 20, delay: 1.8, duration: 3.8 },
  { left: 85, top: 90, delay: 0.9, duration: 4.2 },
  { left: 95, top: 50, delay: 2.2, duration: 3 },
  { left: 10, top: 40, delay: 1.1, duration: 3.6 },
  { left: 20, top: 70, delay: 2.8, duration: 2.9 },
  { left: 30, top: 5, delay: 0.6, duration: 4.1 },
  { left: 40, top: 95, delay: 1.9, duration: 3.3 },
  { left: 50, top: 25, delay: 2.4, duration: 2.7 },
  { left: 60, top: 55, delay: 0.7, duration: 4.4 },
  { left: 70, top: 80, delay: 1.3, duration: 3.1 },
  { left: 80, top: 35, delay: 2.6, duration: 2.6 },
  { left: 90, top: 65, delay: 1.0, duration: 3.9 },
  { left: 98, top: 8, delay: 2.0, duration: 3.4 },
];

function ParticlesBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particlePositions.map((particle, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-[#f0b90b]/30 rounded-full animate-pulse"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b0e11]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f0b90b]/10 via-transparent to-[#0ecb81]/5" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#f0b90b]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#0ecb81]/5 rounded-full blur-3xl" />
        <ParticlesBackground />

        <div className="relative max-w-7xl mx-auto px-4 py-12 lg:py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left - Text */}
            <div className="lg:pt-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#f0b90b]/10 rounded-full border border-[#f0b90b]/20 mb-6">
                <span className="w-2 h-2 bg-[#0ecb81] rounded-full animate-pulse" />
                <span className="text-[#f0b90b] text-sm font-medium">Trusted by 45,000+ users worldwide</span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Exchange Crypto
                <br />
                <span className="bg-gradient-to-r from-[#f0b90b] to-[#d9a60a] bg-clip-text text-transparent">
                  Instantly & Securely
                </span>
              </h1>

              <p className="text-[#b7bdc6] text-lg mb-8 max-w-lg leading-relaxed">
                Swap Bitcoin, Ethereum, USDT, and 50+ cryptocurrencies in seconds.
                No registration. No limits. Best rates guaranteed.
              </p>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2 text-[#b7bdc6]">
                  <CheckCircle className="text-[#0ecb81]" size={18} />
                  <span>No KYC Required</span>
                </div>
                <div className="flex items-center gap-2 text-[#b7bdc6]">
                  <CheckCircle className="text-[#0ecb81]" size={18} />
                  <span>5 Min Avg. Time</span>
                </div>
                <div className="flex items-center gap-2 text-[#b7bdc6]">
                  <CheckCircle className="text-[#0ecb81]" size={18} />
                  <span>24/7 Support</span>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 mt-8 pt-8 border-t border-[#2b3139]">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="text-[#f0b90b] fill-[#f0b90b]" />
                  ))}
                </div>
                <div>
                  <span className="text-white font-semibold">4.9</span>
                  <span className="text-[#848e9c]"> / 5 from </span>
                  <span className="text-white font-semibold">2,500+ reviews</span>
                </div>
              </div>
            </div>

            {/* Right - Exchange Form */}
            <div className="lg:pl-4">
              <div className="relative">
                {/* Glow effect behind form */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#f0b90b]/20 to-[#0ecb81]/20 rounded-3xl blur-2xl opacity-50" />
                <div className="relative bg-[#1e2329] rounded-2xl p-1 border border-[#2b3139]">
                  <ExchangeForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 py-12 -mt-4">
        <StatsBar />
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">Why Choose AevonX?</h2>
          <p className="text-[#848e9c] max-w-2xl mx-auto">
            We've built the fastest, most secure crypto exchange platform. Here's what makes us different.
          </p>
        </div>
        <Features />
      </div>

      {/* Recent & Popular */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-6">
          <RecentExchanges />
          <PopularPairs />
        </div>
      </div>

      {/* Reviews */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <ReviewsPreview />
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="relative overflow-hidden bg-gradient-to-r from-[#1e2329] to-[#2b3139] rounded-3xl p-8 lg:p-12 border border-[#2b3139]">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#f0b90b]/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#0ecb81]/10 rounded-full blur-3xl" />

          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">
                Ready to Start Exchanging?
              </h2>
              <p className="text-[#b7bdc6] max-w-lg">
                Join thousands of satisfied users. Fast, secure, and always reliable.
                Your crypto journey starts here.
              </p>
            </div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group relative flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#f0b90b] to-[#d9a60a] text-black font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#f0b90b]/25 hover:scale-[1.02]"
            >
              <span className="relative z-10">Start Exchange Now</span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              {/* Shine effect */}
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Spacer for footer */}
      <div className="h-8" />
    </div>
  );
}
