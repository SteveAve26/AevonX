'use client';

import { useState, useEffect } from 'react';
import { Star, CheckCircle, Send, Loader2 } from 'lucide-react';
import { publicApi } from '@/lib/api';
import { transformReviews } from '@/lib/api/transformers';
import { reviews as fallbackReviews } from '@/lib/mock/data';
import { Review, ApiReview } from '@/types';
import { cn } from '@/lib/utils';

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>(fallbackReviews);
  const [newReview, setNewReview] = useState({ author: '', rating: 5, content: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Fetch reviews
  useEffect(() => {
    async function fetchReviews() {
      setIsLoading(true);
      try {
        const response = await publicApi.getReviews();
        if (response.success && response.data) {
          const apiReviews = response.data as unknown as ApiReview[];
          const transformedReviews = transformReviews(apiReviews);
          setReviews(transformedReviews);
        }
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
        // Use fallback data
      } finally {
        setIsLoading(false);
      }
    }
    fetchReviews();
  }, []);

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await publicApi.createReview({
        author: newReview.author,
        rating: newReview.rating,
        content: newReview.content,
        email: newReview.email || undefined,
      });

      if (response.success) {
        setSubmitted(true);
        setNewReview({ author: '', rating: 5, content: '', email: '' });
        // Refresh reviews
        const refreshed = await publicApi.getReviews();
        if (refreshed.success && refreshed.data) {
          setReviews(refreshed.data);
        }
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        setSubmitError(response.error || 'Failed to submit review');
      }
    } catch (err) {
      setSubmitError('Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-2">Customer Reviews</h1>
        <p className="text-[#848e9c] mb-8">See what our customers say about AevonX</p>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-[#f0b90b]" size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Customer Reviews</h1>
      <p className="text-[#848e9c] mb-8">See what our customers say about AevonX</p>

      {/* Rating Overview */}
      <div className="bg-[#1e2329] rounded-xl p-6 mb-8">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-5xl font-bold text-white mb-1">{averageRating.toFixed(1)}</div>
            <div className="flex items-center gap-1 justify-center mb-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={i < Math.round(averageRating) ? 'text-[#f0b90b] fill-[#f0b90b]' : 'text-[#848e9c]'}
                />
              ))}
            </div>
            <div className="text-[#848e9c] text-sm">{reviews.length} reviews</div>
          </div>
          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = reviews.filter((r) => r.rating === rating).length;
              const percentage = (count / reviews.length) * 100;
              return (
                <div key={rating} className="flex items-center gap-2 mb-1">
                  <span className="text-[#848e9c] text-sm w-3">{rating}</span>
                  <Star size={12} className="text-[#f0b90b] fill-[#f0b90b]" />
                  <div className="flex-1 h-2 bg-[#2b3139] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#f0b90b]"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-[#848e9c] text-sm w-8">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4 mb-12">
        {reviews.map((review) => (
          <div key={review.id} className="bg-[#1e2329] rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#2b3139] rounded-full flex items-center justify-center text-white font-semibold">
                  {review.author.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{review.author}</span>
                    {review.isVerified && (
                      <CheckCircle size={14} className="text-[#0ecb81]" />
                    )}
                  </div>
                  <div className="text-xs text-[#848e9c]">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < review.rating ? 'text-[#f0b90b] fill-[#f0b90b]' : 'text-[#848e9c]'}
                  />
                ))}
              </div>
            </div>
            <p className="text-[#eaecef]">{review.content}</p>
          </div>
        ))}
      </div>

      {/* Write Review Form */}
      <div className="bg-[#1e2329] rounded-xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Write a Review</h3>

        {submitted ? (
          <div className="text-center py-8">
            <CheckCircle size={48} className="text-[#0ecb81] mx-auto mb-4" />
            <p className="text-white font-medium">Thank you for your review!</p>
            <p className="text-[#848e9c] text-sm">Your feedback helps us improve.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {submitError && (
              <div className="p-3 bg-[#f6465d]/10 border border-[#f6465d]/20 rounded-lg text-[#f6465d] text-sm">
                {submitError}
              </div>
            )}

            <div>
              <label className="text-sm text-[#848e9c] mb-2 block">Your Rating</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setNewReview((prev) => ({ ...prev, rating }))}
                    className="p-1"
                  >
                    <Star
                      size={28}
                      className={cn(
                        'transition-colors',
                        rating <= newReview.rating
                          ? 'text-[#f0b90b] fill-[#f0b90b]'
                          : 'text-[#848e9c] hover:text-[#f0b90b]'
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm text-[#848e9c] mb-2 block">Your Name</label>
              <input
                type="text"
                value={newReview.author}
                onChange={(e) => setNewReview((prev) => ({ ...prev, author: e.target.value }))}
                required
                className="w-full px-4 py-3 bg-[#2b3139] rounded-lg text-white placeholder-[#848e9c] focus:outline-none focus:ring-2 focus:ring-[#f0b90b]"
                placeholder="John D."
              />
            </div>

            <div>
              <label className="text-sm text-[#848e9c] mb-2 block">Email (optional)</label>
              <input
                type="email"
                value={newReview.email}
                onChange={(e) => setNewReview((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full px-4 py-3 bg-[#2b3139] rounded-lg text-white placeholder-[#848e9c] focus:outline-none focus:ring-2 focus:ring-[#f0b90b]"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="text-sm text-[#848e9c] mb-2 block">Your Review</label>
              <textarea
                value={newReview.content}
                onChange={(e) => setNewReview((prev) => ({ ...prev, content: e.target.value }))}
                required
                rows={4}
                className="w-full px-4 py-3 bg-[#2b3139] rounded-lg text-white placeholder-[#848e9c] focus:outline-none focus:ring-2 focus:ring-[#f0b90b] resize-none"
                placeholder="Tell us about your experience..."
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
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit Review
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
