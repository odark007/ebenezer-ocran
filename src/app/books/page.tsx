import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import BookCard from '@/components/BookCard';
import BooksClientFilters from '@/components/BooksClientFilters';
import Image from 'next/image';

export const metadata = {
  title: 'Books | Rev. Ebenezer Ocran',
};

const BOOKS_PER_PAGE = 20;

export default async function Books({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; topic?: string; q?: string }>;
}) {
  const supabase = await createClient();
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const offset = (page - 1) * BOOKS_PER_PAGE;

  // Featured book
  const { data: featuredBook } = await supabase
    .from('books')
    .select('*, book_topics(name)')
    .eq('is_featured', true)
    .eq('status', 'published')
    .single();

  // All published books for client filtering + pagination
  const { data: allBooks, count } = await supabase
    .from('books')
    .select('*, book_topics(name)', { count: 'exact' })
    .eq('status', 'published')
    .order('display_order', { ascending: true })
    .range(offset, offset + BOOKS_PER_PAGE - 1);

  // Topics for filter dropdown
  const { data: topicsList } = await supabase
    .from('book_topics')
    .select('id, name')
    .order('display_order', { ascending: true });

  const totalPages = Math.ceil((count || 0) / BOOKS_PER_PAGE);

  return (
    <div className="min-h-screen flex flex-col pt-[68px]">
      {/* Hero */}
      <div className="bg-dark pt-[48px] pb-[48px]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-[11px] font-bold text-lime tracking-[0.14em] uppercase mb-[10px]">Published Works</div>
          <h1 className="font-serif text-[44px] font-bold text-white leading-[1.1] mb-[10px]">Books by Rev. Ocran</h1>
          <p className="text-[15px] text-white/50 font-light max-w-[520px] leading-[1.65]">
            Resources designed to equip believers, develop leaders, and deepen your walk with God.
          </p>
        </div>
      </div>

      {/* Featured Book */}
      {featuredBook && (
        <div className="bg-white border-b border-g100">
          <div className="max-w-[1200px] mx-auto px-8 py-10">
            <div className="bg-white border border-g100 rounded-[14px] p-8 grid grid-cols-1 md:grid-cols-[180px_1fr] gap-8 items-center shadow-sm">
              <div className="w-[160px] aspect-[9/16] rounded-lg overflow-hidden relative shadow-[0_8px_28px_rgba(0,0,0,0.12)] mx-auto md:mx-0">
                {featuredBook.cover_image_url ? (
                  <Image src={featuredBook.cover_image_url} alt={featuredBook.title} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#1a2d0a] to-[#111] flex items-end p-4">
                    <div className="font-serif text-[14px] font-bold text-white">{featuredBook.title}</div>
                  </div>
                )}
                {featuredBook.badge && (
                  <div className="absolute top-[10px] right-[10px] bg-lime text-black text-[9px] font-bold px-[7px] py-[3px] rounded-[3px] tracking-[0.08em] uppercase z-10">
                    {featuredBook.badge}
                  </div>
                )}
              </div>
              <div>
                <div className="text-[11px] font-bold text-lime-dk tracking-[0.14em] uppercase mb-[10px]">Featured Book</div>
                <h2 className="font-serif text-[26px] font-bold text-black mb-[10px]">{featuredBook.title}</h2>
                {featuredBook.book_topics?.name && (
                  <span className="text-[11px] font-bold bg-lime/10 text-black px-[10px] py-[4px] rounded-full uppercase tracking-wider mb-[12px] inline-block">
                    {featuredBook.book_topics.name}
                  </span>
                )}
                {featuredBook.blurb && (
                  <p className="text-[15px] text-g500 leading-[1.7] font-light mb-[20px] max-w-[600px]">{featuredBook.blurb}</p>
                )}
                <div className="flex gap-[10px] flex-wrap">
                  {featuredBook.amazon_url && (
                    <a href={featuredBook.amazon_url.startsWith('http') ? featuredBook.amazon_url : `https://${featuredBook.amazon_url}`}
                      target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-[6px] text-[13.5px] font-semibold text-black bg-lime px-[20px] py-[11px] rounded-[6px] hover:bg-lime-dk no-underline">
                      <span className="bg-[#ff9900] text-black rounded-sm px-[5px] py-[1px] text-[9px] font-extrabold">a</span>
                      Order on Amazon
                    </a>
                  )}
                  {featuredBook.slug && (
                    <Link href={`/books/${featuredBook.slug}`}
                      className="inline-flex items-center gap-[6px] text-[13.5px] font-semibold text-g700 bg-g100 px-[20px] py-[11px] rounded-[6px] hover:bg-g300 hover:text-black no-underline">
                      <i className="ph ph-info text-[15px]"></i> Learn More
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search + Filter + Grid — client component */}
      <div className="flex-1 bg-g50">
        <BooksClientFilters
          books={allBooks || []}
          topicsList={topicsList || []}
          currentPage={page}
          totalPages={totalPages}
          initialTopic={params.topic || ''}
          initialQuery={params.q || ''}
        />
      </div>

      {/* Bulk Orders CTA */}
      <div className="bg-dark py-[52px] border-t border-lime/10 text-center">
        <div className="max-w-[520px] mx-auto px-8">
          <div className="font-serif text-[24px] font-bold text-white mb-[8px]">Bulk Orders & Ministry Use</div>
          <p className="text-[14px] text-white/40 mb-[18px] font-light">
            Looking to order books in bulk for your church, conference, or ministry?
          </p>
          <Link href="/contact"
            className="inline-block font-sans text-[14px] font-semibold bg-lime text-black px-[26px] py-[13px] rounded-[7px] hover:bg-lime-dk hover:-translate-y-0.5 transition-all">
            Contact for Bulk Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
