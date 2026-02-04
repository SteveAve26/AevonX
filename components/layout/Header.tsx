'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { User, Menu, X, ChevronDown, Wallet, History, Users, LogOut, Settings, ArrowRightLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/ui/Logo';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'Exchange', icon: ArrowRightLeft },
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
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    setUserMenuOpen(false);
    router.push('/');
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#0b0e11]/95 backdrop-blur-md border-b border-[#2b3139] shadow-lg shadow-black/20'
          : 'bg-[#0b0e11] border-b border-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="group flex items-center gap-2 transition-transform hover:scale-[1.02]">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'text-[#f0b90b]'
                      : 'text-[#848e9c] hover:text-white'
                  )}
                >
                  {link.label}
                  {/* Active indicator */}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#f0b90b] rounded-full" />
                  )}
                  {/* Hover effect */}
                  <span
                    className={cn(
                      'absolute inset-0 rounded-lg bg-[#f0b90b]/0 transition-all duration-200',
                      !isActive && 'group-hover:bg-[#f0b90b]/5 hover:bg-[#f0b90b]/10'
                    )}
                  />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {isLoading ? (
            <div className="w-24 h-10 bg-[#1e2329] rounded-lg animate-pulse" />
          ) : isAuthenticated ? (
            <>
              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-200',
                    userMenuOpen
                      ? 'bg-[#2b3139] ring-2 ring-[#f0b90b]/20'
                      : 'bg-[#1e2329] hover:bg-[#2b3139]'
                  )}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-[#f0b90b] to-[#d9a60a] rounded-full flex items-center justify-center text-sm font-bold text-black shadow-lg shadow-[#f0b90b]/20">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="hidden sm:block text-left">
                    <div className="text-sm font-medium text-white max-w-[100px] truncate">
                      {user?.first_name || user?.email?.split('@')[0] || 'Account'}
                    </div>
                    <div className="text-xs text-[#848e9c]">Personal</div>
                  </div>
                  <ChevronDown
                    size={16}
                    className={cn(
                      'text-[#848e9c] transition-transform duration-200',
                      userMenuOpen && 'rotate-180'
                    )}
                  />
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-[#1e2329] border border-[#2b3139] rounded-2xl shadow-xl shadow-black/30 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      {/* User Info Header */}
                      <div className="px-4 py-4 bg-gradient-to-r from-[#f0b90b]/10 to-transparent border-b border-[#2b3139]">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-[#f0b90b] to-[#d9a60a] rounded-full flex items-center justify-center text-lg font-bold text-black">
                            {user?.email?.charAt(0).toUpperCase() || 'U'}
                          </div>
                          <div>
                            <div className="text-white font-medium truncate max-w-[150px]">
                              {user?.first_name || 'User'}
                            </div>
                            <div className="text-xs text-[#848e9c] truncate max-w-[150px]">
                              {user?.email}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        {userMenuItems.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm text-[#eaecef] hover:bg-[#2b3139] transition-colors group"
                          >
                            <item.icon size={18} className="text-[#848e9c] group-hover:text-[#f0b90b] transition-colors" />
                            {item.label}
                          </Link>
                        ))}
                      </div>

                      {/* Logout */}
                      <div className="border-t border-[#2b3139] py-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#f6465d] hover:bg-[#f6465d]/10 transition-colors"
                        >
                          <LogOut size={18} />
                          Sign Out
                        </button>
                      </div>
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
                className="hidden sm:flex items-center gap-2 px-4 py-2 text-sm font-medium text-[#eaecef] hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="group relative flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#f0b90b] to-[#d9a60a] rounded-xl text-black text-sm font-semibold overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#f0b90b]/25 hover:scale-[1.02]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <User size={16} />
                  <span className="hidden sm:inline">Get Started</span>
                  <span className="sm:hidden">Join</span>
                </span>
                {/* Shine effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </Link>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-[#848e9c] hover:text-white hover:bg-[#1e2329] rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          'md:hidden border-t border-[#2b3139] bg-[#0b0e11] overflow-hidden transition-all duration-300',
          mobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <nav className="flex flex-col p-4 gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'text-[#f0b90b] bg-[#f0b90b]/10'
                    : 'text-[#848e9c] hover:text-white hover:bg-[#1e2329]'
                )}
              >
                {link.label}
              </Link>
            );
          })}

          {isAuthenticated ? (
            <>
              <hr className="border-[#2b3139] my-3" />
              {userMenuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-xl text-sm font-medium text-[#848e9c] hover:text-white hover:bg-[#1e2329] transition-colors flex items-center gap-3"
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-3 rounded-xl text-sm font-medium text-[#f6465d] hover:bg-[#f6465d]/10 transition-colors flex items-center gap-3"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </>
          ) : (
            <>
              <hr className="border-[#2b3139] my-3" />
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-medium text-[#848e9c] hover:text-white hover:bg-[#1e2329] transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-[#f0b90b] to-[#d9a60a] text-black text-center"
              >
                Get Started
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
