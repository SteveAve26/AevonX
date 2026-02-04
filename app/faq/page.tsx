'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Search, Loader2 } from 'lucide-react';
import { publicApi } from '@/lib/api';
import { FAQItem, FAQGroupItem } from '@/types';
import { cn } from '@/lib/utils';

export default function FAQPage() {
  const [groups, setGroups] = useState<FAQGroupItem[]>([]);
  const [items, setItems] = useState<FAQItem[]>([]);
  const [activeGroup, setActiveGroup] = useState<string>('');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  // Fetch FAQ groups on mount
  useEffect(() => {
    async function fetchGroups() {
      try {
        const response = await publicApi.getFaqGroups({ lang: 'en' });
        if (response.success && response.data?.faqGroups) {
          setGroups(response.data.faqGroups);
          // Set first group as active
          if (response.data.faqGroups.length > 0) {
            setActiveGroup(response.data.faqGroups[0].groupName);
          }
        }
      } catch (err) {
        console.error('Failed to fetch FAQ groups:', err);
      }
    }
    fetchGroups();
  }, []);

  // Fetch FAQ items when group changes or search
  useEffect(() => {
    async function fetchItems() {
      setIsLoading(true);
      try {
        const response = await publicApi.getFaqList({
          page: 1,
          limit: 50,
          lang: 'en',
          ...(activeGroup && !search && { group: activeGroup }),
          ...(search && { search }),
        });

        if (response.success && response.data) {
          setItems(response.data.faq || []);
          setTotalCount(response.data.count?.total || 0);
        }
      } catch (err) {
        console.error('Failed to fetch FAQ items:', err);
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    }

    // Only fetch if we have an active group or search term
    if (activeGroup || search) {
      fetchItems();
    }
  }, [activeGroup, search]);

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Debounce search
  const [debouncedSearch, setDebouncedSearch] = useState('');
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

  // Use debounced search for API calls
  useEffect(() => {
    if (debouncedSearch !== search) return;
  }, [debouncedSearch, search]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">Frequently Asked Questions</h1>
      <p className="text-[#848e9c] mb-8">Find answers to common questions about AevonX</p>

      {/* Search */}
      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#848e9c]" size={20} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search questions..."
          className="w-full pl-12 pr-4 py-3 bg-[#1e2329] border border-[#2b3139] rounded-xl text-white placeholder-[#848e9c] focus:outline-none focus:border-[#f0b90b]"
        />
      </div>

      {/* Category Tabs */}
      {!search && groups.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {groups.map((group) => (
            <button
              key={group.groupName}
              onClick={() => setActiveGroup(group.groupName)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                activeGroup === group.groupName
                  ? 'bg-[#f0b90b] text-black'
                  : 'bg-[#1e2329] text-[#848e9c] hover:text-white'
              )}
            >
              {group.groupName}
              <span className="ml-2 text-xs opacity-70">({group.count})</span>
            </button>
          ))}
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-[#f0b90b]" size={32} />
        </div>
      )}

      {/* FAQ Items */}
      {!isLoading && (
        <div className="space-y-3">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-[#1e2329] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleItem(item._id)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-white font-medium pr-4">{item.title}</span>
                <ChevronDown
                  size={20}
                  className={cn(
                    'text-[#848e9c] transition-transform flex-shrink-0',
                    openItems.has(item._id) && 'rotate-180'
                  )}
                />
              </button>
              {openItems.has(item._id) && (
                <div
                  className="px-5 pb-5 text-[#848e9c] border-t border-[#2b3139] pt-4 prose prose-invert prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      {/* No Results */}
      {!isLoading && items.length === 0 && (
        <div className="text-center py-12 text-[#848e9c]">
          {search ? 'No questions found matching your search.' : 'No questions available in this category.'}
        </div>
      )}

      {/* Results Count */}
      {!isLoading && items.length > 0 && (
        <div className="mt-4 text-sm text-[#848e9c]">
          Showing {items.length} of {totalCount} questions
        </div>
      )}

      {/* Contact Support */}
      <div className="mt-12 bg-[#1e2329] rounded-xl p-6 text-center">
        <h3 className="text-white font-semibold mb-2">Still have questions?</h3>
        <p className="text-[#848e9c] mb-4">Our support team is here to help</p>
        <a
          href="/support"
          className="inline-flex items-center px-6 py-2 bg-[#f0b90b] text-black font-medium rounded-lg hover:bg-[#d9a60a] transition-colors"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
