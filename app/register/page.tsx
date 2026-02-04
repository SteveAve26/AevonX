'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, ArrowRight, CheckCircle, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isAuthenticated } = useAuth();
  const [form, setForm] = useState({ email: '', password: '', confirmPassword: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Redirect if already logged in
  if (isAuthenticated) {
    router.push('/');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (form.password.length < 8) {
      setError('Password must be at least 8 characters');
      setLoading(false);
      return;
    }

    const result = await register(form.email, form.password);

    if (result.success) {
      setSuccess(true);
    } else {
      setError(result.error || 'Registration failed');
    }

    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md text-center">
          <CheckCircle size={64} className="text-[#0ecb81] mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-white mb-2">Registration Successful!</h1>
          <p className="text-[#848e9c] mb-6">
            We&apos;ve sent a confirmation email to <strong className="text-white">{form.email}</strong>.
            Please check your inbox to verify your account.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#f0b90b] text-black font-semibold rounded-lg hover:bg-[#d9a60a] transition-colors"
          >
            Go to Login
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-[#f0b90b] rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-xl">A</span>
            </div>
            <span className="text-2xl font-bold text-white">AevonX</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-[#848e9c]">Start exchanging crypto in minutes</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#1e2329] rounded-xl p-6 space-y-4">
          {error && (
            <div className="p-3 bg-[#f6465d]/10 border border-[#f6465d]/20 rounded-lg text-[#f6465d] text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="text-sm text-[#848e9c] mb-2 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#848e9c]" size={18} />
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                required
                className="w-full pl-11 pr-4 py-3 bg-[#2b3139] rounded-lg text-white placeholder-[#848e9c] focus:outline-none focus:ring-2 focus:ring-[#f0b90b]"
                placeholder="your@email.com"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-[#848e9c] mb-2 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#848e9c]" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm((prev) => ({ ...prev, password: e.target.value }))}
                required
                className="w-full pl-11 pr-12 py-3 bg-[#2b3139] rounded-lg text-white placeholder-[#848e9c] focus:outline-none focus:ring-2 focus:ring-[#f0b90b]"
                placeholder="Min 8 characters"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#848e9c] hover:text-white"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm text-[#848e9c] mb-2 block">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#848e9c]" size={18} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={(e) => setForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                required
                className="w-full pl-11 pr-4 py-3 bg-[#2b3139] rounded-lg text-white placeholder-[#848e9c] focus:outline-none focus:ring-2 focus:ring-[#f0b90b]"
                placeholder="Repeat password"
              />
            </div>
          </div>

          <label className="flex items-start gap-2 cursor-pointer">
            <input type="checkbox" required className="mt-1 rounded bg-[#2b3139] border-[#2b3139]" />
            <span className="text-sm text-[#848e9c]">
              I agree to the{' '}
              <Link href="/terms" className="text-[#f0b90b] hover:underline">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/privacy" className="text-[#f0b90b] hover:underline">Privacy Policy</Link>
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full py-3 bg-[#f0b90b] text-black font-semibold rounded-lg hover:bg-[#d9a60a] transition-colors disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Creating account...
              </>
            ) : (
              <>
                Create Account
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-[#848e9c]">
          Already have an account?{' '}
          <Link href="/login" className="text-[#f0b90b] hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
