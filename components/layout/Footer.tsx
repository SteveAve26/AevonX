'use client';

import Link from 'next/link';
import { Mail, MessageCircle, Twitter, Send, Github, ArrowUpRight, Shield, Zap, Clock, Globe } from 'lucide-react';
import Logo from '@/components/ui/Logo';

const footerLinks = {
  exchange: [
    { label: 'Exchange', href: '/' },
    { label: 'Popular Pairs', href: '/#popular' },
    { label: 'Rates', href: '/#rates' },
    { label: 'Reserve', href: '/#reserve' },
  ],
  support: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Support', href: '/support' },
    { label: 'Contact Us', href: '/support' },
    { label: 'Reviews', href: '/reviews' },
  ],
  legal: [
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'AML/KYC Policy', href: '/terms#aml' },
  ],
  account: [
    { label: 'Sign In', href: '/login' },
    { label: 'Register', href: '/register' },
    { label: 'My Orders', href: '/orders' },
    { label: 'Affiliate', href: '/affiliate' },
  ],
};

const socialLinks = [
  { label: 'Twitter', href: '#', icon: Twitter },
  { label: 'Telegram', href: '#', icon: Send },
  { label: 'Email', href: 'mailto:support@aevonx.com', icon: Mail },
];

const features = [
  { icon: Shield, label: 'Secure', desc: '256-bit SSL' },
  { icon: Zap, label: 'Fast', desc: '5-30 min' },
  { icon: Clock, label: '24/7', desc: 'Support' },
  { icon: Globe, label: 'Global', desc: '150+ Countries' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0b0e11] border-t border-[#2b3139] mt-auto">
      {/* Features Bar */}
      <div className="border-b border-[#2b3139]">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature) => (
              <div
                key={feature.label}
                className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-[#1e2329] to-[#181c21] border border-[#2b3139] group hover:border-[#f0b90b]/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#f0b90b]/10 flex items-center justify-center group-hover:bg-[#f0b90b]/20 transition-colors">
                  <feature.icon size={20} className="text-[#f0b90b]" />
                </div>
                <div>
                  <div className="text-white font-medium">{feature.label}</div>
                  <div className="text-xs text-[#848e9c]">{feature.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2">
            <Logo size="lg" />
            <p className="mt-4 text-[#848e9c] text-sm leading-relaxed max-w-xs">
              Fast, secure, and reliable cryptocurrency exchange. Trade 100+ crypto pairs with the best rates and instant transactions.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-[#1e2329] hover:bg-[#2b3139] border border-[#2b3139] hover:border-[#f0b90b]/30 flex items-center justify-center transition-all duration-200 group"
                  aria-label={social.label}
                >
                  <social.icon size={18} className="text-[#848e9c] group-hover:text-[#f0b90b] transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Exchange Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Exchange</h3>
            <ul className="space-y-3">
              {footerLinks.exchange.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#848e9c] text-sm hover:text-[#f0b90b] transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#848e9c] text-sm hover:text-[#f0b90b] transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#848e9c] text-sm hover:text-[#f0b90b] transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Account</h3>
            <ul className="space-y-3">
              {footerLinks.account.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#848e9c] text-sm hover:text-[#f0b90b] transition-colors flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-[#1e2329] to-[#181c21] border border-[#2b3139]">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-white font-semibold">Stay Updated</h3>
              <p className="text-sm text-[#848e9c] mt-1">Get the latest news and updates from AevonX</p>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-[#2b3139] rounded-xl text-white text-sm placeholder-[#848e9c] focus:outline-none focus:ring-2 focus:ring-[#f0b90b]/50 min-w-[240px]"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-[#f0b90b] to-[#d9a60a] text-black font-semibold rounded-xl hover:shadow-lg hover:shadow-[#f0b90b]/25 transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#2b3139]">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-[#848e9c]">
            <p>&copy; {currentYear} AevonX. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#0ecb81] animate-pulse" />
                All systems operational
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#f0b90b]/30 to-transparent" />
    </footer>
  );
}
