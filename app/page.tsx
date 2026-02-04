'use client';

import { useState, useEffect } from 'react';
import { Shield, Zap, Clock, TrendingUp, ArrowRight, Star, CheckCircle, Users, Globe, Sparkles, ChevronRight } from 'lucide-react';
import ExchangeForm from '@/components/exchange/ExchangeForm';
import { recentOrders, reviews, exchangeRoutes } from '@/lib/mock/data';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { FadeIn, ScaleIn, StaggeredList, GlowCard, AnimatedCounter } from '@/components/ui/Animations';
import { useScrollAnimation } from '@/hooks/useAnimations';

// Animated Crypto Icons - positioned around the exchange form only
function CryptoIconsAnimation() {
  const cryptoIcons = [
    { symbol: 'BTC', color: '#F7931A', size: 36, x: -6, y: 8, delay: 0.2 },
    { symbol: 'ETH', color: '#627EEA', size: 32, x: 95, y: 12, delay: 0.4 },
    { symbol: 'USDT', color: '#26A17B', size: 28, x: 98, y: 55, delay: 0.6 },
    { symbol: 'BNB', color: '#F0B90B', size: 30, x: -4, y: 65, delay: 0.3 },
    { symbol: 'SOL', color: '#9945FF', size: 26, x: 92, y: 88, delay: 0.5 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {cryptoIcons.map((crypto, index) => (
        <div
          key={crypto.symbol}
          className="absolute animate-float-crypto hidden lg:block"
          style={{
            left: `${crypto.x}%`,
            top: `${crypto.y}%`,
            animationDelay: `${crypto.delay}s`,
            animationDuration: `${4 + index * 0.3}s`,
          }}
        >
          <div
            className="rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10"
            style={{
              width: crypto.size,
              height: crypto.size,
              background: `linear-gradient(135deg, ${crypto.color}30, ${crypto.color}10)`,
              boxShadow: `0 0 20px ${crypto.color}20`,
            }}
          >
            <span
              className="font-bold text-[10px]"
              style={{ color: crypto.color }}
            >
              {crypto.symbol}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

// Animated Hero Text Component
function AnimatedHeroText() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative z-10">
      {/* Dive into - small text */}
      <div
        className={cn(
          "flex items-center gap-3 mb-5 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        <span className="w-10 h-[2px] bg-gradient-to-r from-[#f0b90b] to-transparent" />
        <span className="text-[#f0b90b] text-sm font-semibold tracking-[0.2em] uppercase">
          Dive into
        </span>
      </div>

      {/* Main headline - clean three-line layout */}
      <h1 className="mb-6">
        <span
          className={cn(
            "block text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white transition-all duration-700 leading-[1.1]",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
          style={{ transitionDelay: '0.15s' }}
        >
          NEW ERA OF
        </span>
        <span
          className={cn(
            "block text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white transition-all duration-700 leading-[1.1]",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
          style={{ transitionDelay: '0.3s' }}
        >
          CRYPTOCURRENCY
        </span>
        <span
          className={cn(
            "block text-4xl md:text-5xl lg:text-[3.5rem] font-bold transition-all duration-700 leading-[1.1]",
            "bg-gradient-to-r from-[#f0b90b] via-[#fcd435] to-[#f0b90b] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
          style={{ transitionDelay: '0.45s' }}
        >
          EXCHANGE
        </span>
      </h1>

      {/* Subtitle */}
      <p
        className={cn(
          "text-[#b7bdc6] text-base md:text-lg max-w-lg leading-relaxed mb-8 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
        style={{ transitionDelay: '0.6s' }}
      >
        Swap Bitcoin, Ethereum, USDT and 50+ cryptocurrencies in seconds.
        <span className="text-white font-medium"> No registration. No limits.</span>
      </p>

      {/* CTA Buttons */}
      <div
        className={cn(
          "flex flex-wrap items-center gap-4 mb-10 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
        style={{ transitionDelay: '0.75s' }}
      >
        <button
          onClick={() => document.getElementById('exchange-form')?.scrollIntoView({ behavior: 'smooth' })}
          className="group relative px-6 py-3 bg-gradient-to-r from-[#f0b90b] to-[#d9a60a] text-black font-bold rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#f0b90b]/30 hover:scale-[1.02]"
        >
          <span className="relative z-10 flex items-center gap-2">
            Start Exchange
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </button>

        <Link
          href="/faq"
          className="px-6 py-3 border border-[#2b3139] text-white font-medium rounded-xl hover:border-[#f0b90b]/50 hover:bg-[#f0b90b]/5 transition-all duration-300"
        >
          Learn More
        </Link>
      </div>

      {/* Stats row */}
      <div
        className={cn(
          "flex flex-wrap items-center gap-6 md:gap-8 pt-6 border-t border-[#2b3139]/50 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
        style={{ transitionDelay: '0.9s' }}
      >
        {[
          { value: '156K+', label: 'Exchanges' },
          { value: '45K+', label: 'Users' },
          { value: '99.9%', label: 'Uptime' },
        ].map((stat) => (
          <div key={stat.label}>
            <div className="text-xl md:text-2xl font-bold text-white">{stat.value}</div>
            <div className="text-[#848e9c] text-sm">{stat.label}</div>
          </div>
        ))}

        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="text-[#f0b90b] fill-[#f0b90b]" />
            ))}
          </div>
          <span className="text-[#848e9c] text-sm">4.9/5</span>
        </div>
      </div>
    </div>
  );
}

// Stats bar component with scroll animations
function StatsBar() {
  const stats = [
    { label: 'Total Exchanges', value: 156000, suffix: '+', icon: TrendingUp },
    { label: 'Active Users', value: 45000, suffix: '+', icon: Users },
    { label: 'Countries', value: 120, suffix: '+', icon: Globe },
    { label: 'Uptime', value: 99, suffix: '.9%', icon: Shield },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {stats.map((stat, index) => (
        <FadeIn key={stat.label} direction="up" delay={index * 100}>
          <div className="group relative bg-[#1e2329]/80 backdrop-blur-sm rounded-2xl p-4 md:p-5 border border-[#2b3139] hover:border-[#f0b90b]/30 transition-all duration-300 hover:-translate-y-1 card-3d">
            <div className="absolute inset-0 bg-gradient-to-br from-[#f0b90b]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            <div className="relative">
              <stat.icon className="text-[#f0b90b] mb-2 group-hover:animate-bounce-subtle" size={20} />
              <div className="text-2xl md:text-3xl font-bold text-white">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-[#848e9c] text-sm">{stat.label}</div>
            </div>
          </div>
        </FadeIn>
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
        <FadeIn key={feature.title} direction="up" delay={index * 100} duration={600}>
          <GlowCard className="h-full">
            <div
              className={cn(
                'group relative h-full rounded-2xl p-6 overflow-hidden transition-all duration-300'
              )}
            >
              {/* Background gradient */}
              <div className={cn('absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500', feature.color)} />

              <div className="relative">
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3', feature.iconBg)}>
                  <feature.icon className={cn(feature.iconColor, 'transition-all duration-300')} size={24} />
                </div>
                <h3 className="text-white font-semibold mb-2 group-hover:text-[#f0b90b] transition-colors">{feature.title}</h3>
                <p className="text-[#848e9c] text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          </GlowCard>
        </FadeIn>
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

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0b0e11]">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#f0b90b]/3 via-transparent to-[#0ecb81]/3" />
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#f0b90b]/5 rounded-full blur-[80px] animate-pulse-scale" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#0ecb81]/5 rounded-full blur-[60px] animate-pulse-scale" style={{ animationDelay: '1s' }} />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            {/* Left - Animated Text */}
            <div>
              <AnimatedHeroText />
            </div>

            {/* Right - Exchange Form */}
            <div
              id="exchange-form"
              className="relative animate-scale-fade [animation-delay:0.5s]"
            >
              {/* Crypto icons around the form */}
              <CryptoIconsAnimation />

              <div className="relative group">
                {/* Glow effect behind form */}
                <div className="absolute -inset-3 bg-gradient-to-r from-[#f0b90b]/15 via-[#f0b90b]/5 to-[#0ecb81]/15 rounded-2xl blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                <div className="relative bg-[#1e2329] backdrop-blur-xl rounded-2xl border border-[#2b3139] hover:border-[#f0b90b]/20 transition-colors duration-500 shadow-2xl shadow-black/30">
                  <ExchangeForm />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center pb-4">
          <div className="w-4 h-7 border border-[#2b3139] rounded-full flex justify-center pt-1 opacity-40 hover:opacity-80 transition-opacity cursor-pointer" onClick={() => window.scrollBy({ top: 300, behavior: 'smooth' })}>
            <div className="w-0.5 h-1 bg-[#f0b90b] rounded-full animate-scroll-indicator" />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 py-12 -mt-4">
        <StatsBar />
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <FadeIn direction="up" className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3">Why Choose AevonX?</h2>
          <p className="text-[#848e9c] max-w-2xl mx-auto">
            We've built the fastest, most secure crypto exchange platform. Here's what makes us different.
          </p>
        </FadeIn>
        <Features />
      </div>

      {/* Recent & Popular */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-6">
          <FadeIn direction="left">
            <RecentExchanges />
          </FadeIn>
          <FadeIn direction="right" delay={100}>
            <PopularPairs />
          </FadeIn>
        </div>
      </div>

      {/* Reviews */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <FadeIn direction="up">
          <ReviewsPreview />
        </FadeIn>
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
