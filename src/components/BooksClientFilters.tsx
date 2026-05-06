'use client';

import { useState, useMemo } from 'react';
import BookCard from '@/components/BookCard';
import Link from 'next/link';

interface Book {
  id: string;
  title: string;
  blurb?: string;
  slug?: string;
  cover_image_url?: string;
  badge?: string;
  amazon_url?: string;
  book_topics?: { name: string };
}

interface Topic {
  id: string;
  name: string;
}

export default function BooksClientFilters({
  books,
  topicsList,
  currentPage,
  totalPages,
  initialTopic,
  initialQuery,
}: {
  books: Book[];
  topicsList: Topic[];
  currentPage: number;
  totalPages: number;
  initialTopic: string;
  initialQuery: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [activeTopic, setActiveTopic] = useState(initialTopic);

  const filtered = useMemo(() => {
    return books.filter((b) => {
      const matchesQuery =
        !query || b.title.toLowerCase().includes(query.toLowerCase());
      const matchesTopic =
        !activeTopic || b.book_topics?.name === activeTopic;
      return matchesQuery && matchesTopic;
    });
  }, [books, query, activeTopic]);

  return (
    <div className="max-w-[1200px] mx-auto px-8 py-8">
      {/* Search + Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        {/* Search */}
        <div className="relative flex-1 max-w-[360px]">
          <i className="ph ph-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-g300 text-[16px]"></i>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search books..."
            className="w-full bg-white border-[1.5px] border-g100 rounded-[8px] pl-[36px] pr-[14px] py-[10px] text-[14px] outline-none focus:border-lime transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-g300 hover:text-black border-none bg-transparent cursor-pointer"
            >
              <i className="ph ph-x text-[14px]"></i>
            </button>
          )}
        </div>

        {/* Topic filter */}
        {topicsList.length > 0 && (
          <div className="flex gap-2 flex-wrap items-center">
            <button
              onClick={() => setActiveTopic('')}
              className={`text-[12.5px] font-medium px-[14px] py-[9px] rounded-[6px] border cursor-pointer transition-all ${
                !activeTopic
                  ? 'bg-lime border-lime text-black font-semibold'
                  : 'border-g100 bg-white text-g700 hover:border-lime hover:bg-lime-pale'
              }`}
            >
              All Topics
            </button>
            {topicsList.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTopic(activeTopic === t.name ? '' : t.name)}
                className={`text-[12.5px] font-medium px-[14px] py-[9px] rounded-[6px] border cursor-pointer transition-all ${
                  activeTopic === t.name
                    ? 'bg-lime border-lime text-black font-semibold'
                    : 'border-g100 bg-white text-g700 hover:border-lime hover:bg-lime-pale'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>
        )}

        <span className="ml-auto text-[12px] text-g300 self-center whitespace-nowrap">
          {filtered.length} book{filtered.length !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Books grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-[24px]">
          {filtered.map((b) => (
            <BookCard
              key={b.id}
              title={b.title}
              blurb={b.blurb}
              slug={b.slug}
              cover_image_url={b.cover_image_url}
              badge={b.badge}
              amazon_url={b.amazon_url}
            />
          ))}
        </div>
      ) : (
        <div className="py-[80px] text-center text-g500 text-[15px]">
          No books found{query ? ` for "${query}"` : ''}.
          {(query || activeTopic) && (
            <button
              onClick={() => { setQuery(''); setActiveTopic(''); }}
              className="ml-2 text-lime-dk font-semibold underline cursor-pointer border-none bg-transparent"
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {/* Pagination — only shown when not filtering client-side */}
      {!query && !activeTopic && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-12">
          {currentPage > 1 && (
            <Link
              href={`/books?page=${currentPage - 1}`}
              className="px-[16px] py-[9px] text-[13px] font-semibold bg-white border border-g100 rounded-[7px] text-g700 hover:border-lime hover:text-black no-underline transition-colors"
            >
              ← Previous
            </Link>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <Link
              key={p}
              href={`/books?page=${p}`}
              className={`w-[38px] h-[38px] flex items-center justify-center text-[13px] font-semibold rounded-[7px] border no-underline transition-colors ${
                p === currentPage
                  ? 'bg-lime border-lime text-black'
                  : 'bg-white border-g100 text-g700 hover:border-lime hover:text-black'
              }`}
            >
              {p}
            </Link>
          ))}

          {currentPage < totalPages && (
            <Link
              href={`/books?page=${currentPage + 1}`}
              className="px-[16px] py-[9px] text-[13px] font-semibold bg-white border border-g100 rounded-[7px] text-g700 hover:border-lime hover:text-black no-underline transition-colors"
            >
              Next →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
