'use client';

import { useState } from 'react';
import { Send, CheckCircle, Mail, MessageCircle, Phone, Loader2, AlertCircle } from 'lucide-react';
import { publicApi } from '@/lib/api';

export default function SupportPage() {
  const [form, setForm] = useState({ subject: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await publicApi.createTicket({
        subject: form.subject,
        email: form.email,
        message: form.message,
      });

      if (response.success) {
        setSubmitted(true);
      } else {
        setError(response.error || 'Failed to submit ticket. Please try again.');
      }
    } catch (err) {
      setError('Network error. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <CheckCircle size={64} className="text-[#0ecb81] mx-auto mb-6" />
        <h1 className="text-2xl font-bold text-white mb-2">Message Sent!</h1>
        <p className="text-[#848e9c] mb-6">
          We&apos;ve received your message and will get back to you within 24 hours.
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setForm({ subject: '', email: '', message: '' });
          }}
          className="px-6 py-2 bg-[#f0b90b] text-black font-medium rounded-lg hover:bg-[#d9a60a] transition-colors"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Contact Support</h1>
      <p className="text-[#848e9c] mb-8">We&apos;re here to help. Send us a message and we&apos;ll respond as soon as possible.</p>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="space-y-4">
          <div className="bg-[#1e2329] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#f0b90b]/10 rounded-lg flex items-center justify-center">
                <Mail className="text-[#f0b90b]" size={20} />
              </div>
              <div>
                <div className="text-white font-medium">Email</div>
                <div className="text-[#848e9c] text-sm">support@aevonx.com</div>
              </div>
            </div>
          </div>

          <div className="bg-[#1e2329] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#0ecb81]/10 rounded-lg flex items-center justify-center">
                <MessageCircle className="text-[#0ecb81]" size={20} />
              </div>
              <div>
                <div className="text-white font-medium">Live Chat</div>
                <div className="text-[#848e9c] text-sm">24/7 Available</div>
              </div>
            </div>
          </div>

          <div className="bg-[#1e2329] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#1e90ff]/10 rounded-lg flex items-center justify-center">
                <Phone className="text-[#1e90ff]" size={20} />
              </div>
              <div>
                <div className="text-white font-medium">Telegram</div>
                <div className="text-[#848e9c] text-sm">@aevonx_support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-[#1e2329] rounded-xl p-6 space-y-4">
            {error && (
              <div className="p-3 bg-[#f6465d]/10 border border-[#f6465d]/20 rounded-lg text-[#f6465d] text-sm flex items-center gap-2">
                <AlertCircle size={16} />
                {error}
              </div>
            )}

            <div>
              <label className="text-sm text-[#848e9c] mb-2 block">Subject</label>
              <input
                type="text"
                value={form.subject}
                onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
                required
                className="w-full px-4 py-3 bg-[#2b3139] rounded-lg text-white placeholder-[#848e9c] focus:outline-none focus:ring-2 focus:ring-[#f0b90b]"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label className="text-sm text-[#848e9c] mb-2 block">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
                required
                className="w-full px-4 py-3 bg-[#2b3139] rounded-lg text-white placeholder-[#848e9c] focus:outline-none focus:ring-2 focus:ring-[#f0b90b]"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="text-sm text-[#848e9c] mb-2 block">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm((prev) => ({ ...prev, message: e.target.value }))}
                required
                rows={6}
                className="w-full px-4 py-3 bg-[#2b3139] rounded-lg text-white placeholder-[#848e9c] focus:outline-none focus:ring-2 focus:ring-[#f0b90b] resize-none"
                placeholder="Describe your issue or question in detail..."
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center justify-center gap-2 w-full py-3 bg-[#f0b90b] text-black font-semibold rounded-lg hover:bg-[#d9a60a] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
