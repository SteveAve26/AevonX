'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { User, Menu, X, ChevronDown, Wallet, History, Users, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
  { href: '/', label: 'Exchange' },
  { href: '/faq', label: 'FAQ' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/news', label: 'News' },
  { href: '/support', label: 'Support' },
];

const userMenuItems = [
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/orders', label: 'My Orders', icon: History },
  { href: '/wallet', label: 'Wallet', icon: Wallet },
  { href: '/affiliate', label: 'Affiliate', icon: Users },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isAuthenticated, logout, isLoading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#0b0e11] border-b border-[#2b3139]">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#f0b90b] rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-white">AevonX</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#f0b90b] bg-[#f0b90b]/10'
                      : 'text-[#848e9c] hover:text-white hover:bg-[#2b3139]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {isLoading ? (
            <div className="w-20 h-10 bg-[#1e2329] rounded-lg animate-pulse" />
          ) : isAuthenticated ? (
            <>
              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 bg-[#1e2329] rounded-lg text-white hover:bg-[#2b3139] transition-colors"
                >
                  <div className="w-6 h-6 bg-[#f0b90b] rounded-full flex items-center justify-center text-xs font-bold text-black">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="hidden sm:inline text-sm max-w-[100px] truncate">
                    {user?.username || user?.email?.split('@')[0] || 'Account'}
                  </span>
                  <ChevronDown size={14} className={`transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-[#1e2329] border border-[#2b3139] rounded-xl shadow-xl overflow-hidden z-50">
                      <div className="px-4 py-3 border-b border-[#2b3139]">
                        <div className="text-white font-medium truncate">{user?.email}</div>
                      </div>
                      {userMenuItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 text-sm text-[#eaecef] hover:bg-[#2b3139] transition-colors"
                        >
                          <item.icon size={16} className="text-[#848e9c]" />
                          {item.label}
                        </Link>
                      ))}
                      <hr className="border-[#2b3139]" />
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#f6465d] hover:bg-[#2b3139] transition-colors"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Login / Register */}
              <Link
                href="/login"
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm text-[#848e9c] hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-2 px-4 py-2 bg-[#f0b90b] rounded-lg text-black text-sm font-medium hover:bg-[#d9a60a] transition-colors"
              >
                <User size={16} />
                <span className="hidden sm:inline">Register</span>
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-[#848e9c] hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#2b3139] bg-[#0b0e11]">
          <nav className="flex flex-col p-4 gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#f0b90b] bg-[#f0b90b]/10'
                      : 'text-[#848e9c] hover:text-white hover:bg-[#2b3139]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {isAuthenticated ? (
              <>
                <hr className="border-[#2b3139] my-2" />
                {userMenuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-lg text-sm font-medium text-[#848e9c] hover:text-white hover:bg-[#2b3139] transition-colors flex items-center gap-3"
                  >
                    <item.icon size={16} />
                    {item.label}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-[#f6465d] hover:bg-[#2b3139] transition-colors flex items-center gap-3"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <hr className="border-[#2b3139] my-2" />
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm font-medium text-[#848e9c] hover:text-white hover:bg-[#2b3139] transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-lg text-sm font-medium bg-[#f0b90b] text-black hover:bg-[#d9a60a] transition-colors text-center"
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
