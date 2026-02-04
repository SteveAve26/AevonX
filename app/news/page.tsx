'use client';

import { useState, useEffect } from 'react';
import { Calendar, MessageCircle, ArrowRight, Loader2 } from 'lucide-react';
import { publicApi } from '@/lib/api';
import { newsArticles as fallbackArticles } from '@/lib/mock/data';
import { NewsArticle } from '@/types';
import Link from 'next/link';

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>(fallbackArticles);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      setIsLoading(true);
      try {
        const response = await publicApi.getNews();
        if (response.success && response.data) {
          setArticles(response.data);
        }
      } catch (err) {
        console.error('Failed to fetch news:', err);
        // Use fallback data
      } finally {
        setIsLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-2">News & Updates</h1>
        <p className="text-[#848e9c] mb-8">Stay informed about AevonX updates and crypto news</p>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-[#f0b90b]" size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">News & Updates</h1>
      <p className="text-[#848e9c] mb-8">Stay informed about AevonX updates and crypto news</p>

      {/* News List */}
      <div className="space-y-6">
        {articles.map((article) => (
          <article
            key={article.id}
            className="bg-[#1e2329] rounded-xl overflow-hidden hover:bg-[#1e2329]/80 transition-colors"
          >
            <div className="p-6">
              <div className="flex items-center gap-4 text-sm text-[#848e9c] mb-3">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle size={14} />
                  <span>{article.commentsCount} comments</span>
                </div>
              </div>

              <h2 className="text-xl font-semibold text-white mb-2">
                {article.title}
              </h2>

              <p className="text-[#848e9c] mb-4">
                {article.excerpt}
              </p>

              <Link
                href={`/news/${article.slug}`}
                className="inline-flex items-center gap-2 text-[#f0b90b] font-medium hover:underline"
              >
                Read More
                <ArrowRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>

      {articles.length === 0 && (
        <div className="text-center py-12 text-[#848e9c]">
          No news articles yet. Check back later!
        </div>
      )}
    </div>
  );
}
