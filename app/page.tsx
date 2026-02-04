'use client';

import { useState, useEffect } from 'react';
import { Shield, Zap, Clock, TrendingUp, ArrowRight, Star, CheckCircle } from 'lucide-react';
import ExchangeForm from '@/components/exchange/ExchangeForm';
import { recentOrders, reviews, exchangeRoutes } from '@/lib/mock/data';
import Link from 'next/link';

function RecentExchanges() {
  return (
    <div className="bg-[#1e2329] rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Recent Exchanges</h3>
      <div className="space-y-3">
        {recentOrders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between py-3 border-b border-[#2b3139] last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-[#f0b90b]/20 rounded-full flex items-center justify-center text-xs font-bold text-[#f0b90b]">
                  {order.fromCurrency.code.slice(0, 2)}
                </div>
                <ArrowRight size={14} className="mx-2 text-[#848e9c]" />
                <div className="w-8 h-8 bg-[#0ecb81]/20 rounded-full flex items-center justify-center text-xs font-bold text-[#0ecb81]">
                  {order.toCurrency.code.slice(0, 2)}
                </div>
              </div>
              <div>
                <div className="text-white text-sm">
                  {order.fromAmount} {order.fromCurrency.code} → {order.toAmount.toLocaleString()} {order.toCurrency.code}
                </div>
                <div className="text-xs text-[#848e9c]">
                  {new Date(order.createdAt).toLocaleTimeString()}
                </div>
              </div>
            </div>
            <div className={`text-xs px-2 py-1 rounded ${
              order.status === 'completed'
                ? 'bg-[#0ecb81]/20 text-[#0ecb81]'
                : 'bg-[#f0b90b]/20 text-[#f0b90b]'
            }`}>
              {order.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PopularPairs() {
  return (
    <div className="bg-[#1e2329] rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Popular Pairs</h3>
      <div className="grid grid-cols-2 gap-3">
        {exchangeRoutes.slice(0, 6).map((route) => (
          <div
            key={route.id}
            className="flex items-center justify-between p-3 bg-[#2b3139] rounded-lg hover:bg-[#3a4149] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <span className="text-white font-medium text-sm">
                {route.fromCurrency.code}
              </span>
              <ArrowRight size={12} className="text-[#848e9c]" />
              <span className="text-white font-medium text-sm">
                {route.toCurrency.code}
              </span>
            </div>
            <div className="text-right">
              <div className="text-[#0ecb81] text-xs">
                {route.rate >= 1 ? route.rate.toFixed(2) : route.rate.toFixed(6)}
              </div>
            </div>
          </div>
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
      description: 'Exchange completed in minutes, not hours',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'No registration required, your data stays safe',
    },
    {
      icon: Clock,
      title: '24/7 Available',
      description: 'Exchange anytime, anywhere in the world',
    },
    {
      icon: TrendingUp,
      title: 'Best Rates',
      description: 'Competitive rates with no hidden fees',
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="bg-[#1e2329] rounded-xl p-5 text-center"
        >
          <div className="w-12 h-12 bg-[#f0b90b]/10 rounded-xl flex items-center justify-center mx-auto mb-3">
            <feature.icon className="text-[#f0b90b]" size={24} />
          </div>
          <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
          <p className="text-[#848e9c] text-sm">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}

function ReviewsPreview() {
  return (
    <div className="bg-[#1e2329] rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Customer Reviews</h3>
        <Link href="/reviews" className="text-[#f0b90b] text-sm hover:underline">
          View All
        </Link>
      </div>
      <div className="space-y-4">
        {reviews.slice(0, 3).map((review) => (
          <div key={review.id} className="border-b border-[#2b3139] pb-4 last:border-0">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-white font-medium">{review.author}</span>
                {review.isVerified && (
                  <CheckCircle size={14} className="text-[#0ecb81]" />
                )}
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < review.rating ? 'text-[#f0b90b] fill-[#f0b90b]' : 'text-[#848e9c]'}
                  />
                ))}
              </div>
            </div>
            <p className="text-[#848e9c] text-sm">{review.content}</p>
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
        <div className="absolute inset-0 bg-gradient-to-br from-[#f0b90b]/5 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                Fast & Secure
                <br />
                <span className="text-[#f0b90b]">Crypto Exchange</span>
              </h1>
              <p className="text-[#848e9c] text-lg mb-8 max-w-lg">
                Exchange Bitcoin, Ethereum, and 50+ cryptocurrencies instantly.
                No registration required. Best rates guaranteed.
              </p>
              <div className="flex items-center gap-6 text-sm text-[#848e9c]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#0ecb81] rounded-full" />
                  <span>5,000+ exchanges today</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#f0b90b] rounded-full" />
                  <span>4.9 rating</span>
                </div>
              </div>
            </div>

            {/* Right - Exchange Form */}
            <div className="lg:pl-8">
              <ExchangeForm />
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 py-12">
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
        <div className="bg-gradient-to-r from-[#f0b90b]/20 to-[#f0b90b]/5 rounded-2xl p-8 lg:p-12 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-4">
            Ready to Exchange?
          </h2>
          <p className="text-[#848e9c] mb-6 max-w-lg mx-auto">
            Join thousands of users who trust AevonX for their crypto exchanges.
            Fast, secure, and always reliable.
          </p>
          <Link
            href="#"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#f0b90b] text-black font-semibold rounded-xl hover:bg-[#d9a60a] transition-colors"
          >
            Start Exchange
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
