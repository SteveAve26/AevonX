'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, Search, Loader2 } from 'lucide-react';
import { publicApi } from '@/lib/api';
import { faqGroups as fallbackGroups, faqItems as fallbackItems } from '@/lib/mock/data';
import { FAQGroup, FAQItem } from '@/types';
import { cn } from '@/lib/utils';

export default function FAQPage() {
  const [groups, setGroups] = useState<FAQGroup[]>(fallbackGroups);
  const [items, setItems] = useState<FAQItem[]>(fallbackItems);
  const [activeGroup, setActiveGroup] = useState<string>('');
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch FAQ groups and items
  useEffect(() => {
    async function fetchFAQ() {
      setIsLoading(true);
      try {
        const [groupsRes, itemsRes] = await Promise.all([
          publicApi.getFaqGroups(),
          publicApi.getFaqList(),
        ]);

        if (groupsRes.success && groupsRes.data) {
          setGroups(groupsRes.data);
          if (groupsRes.data.length > 0 && !activeGroup) {
            setActiveGroup(groupsRes.data[0].id);
          }
        }

        if (itemsRes.success && itemsRes.data) {
          setItems(itemsRes.data);
        }
      } catch (err) {
        console.error('Failed to fetch FAQ:', err);
        // Use fallback data
        if (fallbackGroups.length > 0) {
          setActiveGroup(fallbackGroups[0].id);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchFAQ();
  }, []);

  // Set initial active group when groups load
  useEffect(() => {
    if (groups.length > 0 && !activeGroup) {
      setActiveGroup(groups[0].id);
    }
  }, [groups, activeGroup]);

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

  const filteredItems = items.filter((item) => {
    const matchesGroup = !search && item.groupId === activeGroup;
    const matchesSearch =
      search &&
      (item.question.toLowerCase().includes(search.toLowerCase()) ||
        item.answer.toLowerCase().includes(search.toLowerCase()));
    return matchesGroup || matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-white mb-2">Frequently Asked Questions</h1>
        <p className="text-[#848e9c] mb-8">Find answers to common questions about AevonX</p>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="animate-spin text-[#f0b90b]" size={32} />
        </div>
      </div>
    );
  }

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
      {!search && (
        <div className="flex flex-wrap gap-2 mb-8">
          {groups.map((group) => (
            <button
              key={group.id}
              onClick={() => setActiveGroup(group.id)}
              className={cn(
                'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                activeGroup === group.id
                  ? 'bg-[#f0b90b] text-black'
                  : 'bg-[#1e2329] text-[#848e9c] hover:text-white'
              )}
            >
              {group.name}
            </button>
          ))}
        </div>
      )}

      {/* FAQ Items */}
      <div className="space-y-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="bg-[#1e2329] rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleItem(item.id)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <span className="text-white font-medium pr-4">{item.question}</span>
              <ChevronDown
                size={20}
                className={cn(
                  'text-[#848e9c] transition-transform flex-shrink-0',
                  openItems.has(item.id) && 'rotate-180'
                )}
              />
            </button>
            {openItems.has(item.id) && (
              <div className="px-5 pb-5 text-[#848e9c] border-t border-[#2b3139] pt-4">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 text-[#848e9c]">
          No questions found matching your search.
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
