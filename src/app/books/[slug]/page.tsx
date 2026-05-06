import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import BookCard from '@/components/BookCard';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data: book } = await supabase
    .from('books')
    .select('title, blurb')
    .eq('slug', slug)
    .single();

  return {
    title: book ? `${book.title} | Rev. Ebenezer Ocran` : 'Book Not Found',
    description: book?.blurb || '',
  };
}

export default async function BookDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = await createClient();

  // Fetch the book
  const { data: book } = await supabase
    .from('books')
    .select('*, book_topics(id, name)')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (!book) notFound();

  // Fetch related books:
  // 1. Admin override — use related_book_ids if set
  // 2. Auto — same topic, exclude current book
  let relatedBooks: any[] = [];

  if (book.related_book_ids && book.related_book_ids.length > 0) {
    const { data } = await supabase
      .from('books')
      .select('id, title, blurb, slug, cover_image_url, badge, amazon_url, book_topics(name)')
      .in('id', book.related_book_ids)
      .eq('status', 'published')
      .limit(4);
    relatedBooks = data || [];
  } else if (book.book_topics?.id) {
    const { data } = await supabase
      .from('books')
      .select('id, title, blurb, slug, cover_image_url, badge, amazon_url, book_topics(name)')
      .eq('topic_id', book.book_topics.id)
      .eq('status', 'published')
      .neq('id', book.id)
      .limit(4);
    relatedBooks = data || [];
  }

  return (
    <div className="min-h-screen flex flex-col pt-[68px]">

      {/* Hero — book cover + key info */}
      <div className="bg-dark pt-[56px] pb-[56px]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-[48px] items-start">

            {/* Cover */}
            <div className="mx-auto md:mx-0">
              <div className="w-[200px] aspect-[9/16] rounded-[10px] overflow-hidden relative shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
                {book.cover_image_url ? (
                  <Image src={book.cover_image_url} alt={book.title} fill className="object-cover" />
                ) : (
                  <div
                    className="w-full h-full flex flex-col justify-end p-5"
                    style={{ background: 'linear-gradient(160deg, #1a2d0a 0%, #111 100%)' }}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-lime/40"></div>
                    <div className="font-serif text-[15px] font-bold text-white leading-[1.2] relative z-10">{book.title}</div>
                    <div className="text-[9px] text-white/40 uppercase tracking-[0.08em] mt-1 relative z-10">Rev. Ebenezer Ocran</div>
                  </div>
                )}
                {book.badge && (
                  <div className="absolute top-[10px] right-[10px] bg-lime text-black text-[9px] font-bold px-[7px] py-[3px] rounded-[3px] tracking-[0.08em] uppercase z-10">
                    {book.badge}
                  </div>
                )}
              </div>
            </div>

            {/* Info */}
            <div>
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-[12px] text-white/30 mb-[16px]">
                <Link href="/books" className="hover:text-lime transition-colors no-underline">Books</Link>
                <span>/</span>
                <span className="text-white/50">{book.title}</span>
              </div>

              {book.book_topics?.name && (
                <span className="text-[11px] font-bold bg-lime/10 text-lime px-[10px] py-[4px] rounded-full uppercase tracking-wider mb-[14px] inline-block">
                  {book.book_topics.name}
                </span>
              )}

              <h1 className="font-serif text-[38px] md:text-[46px] font-bold text-white leading-[1.1] mb-[14px]">
                {book.title}
              </h1>

              <div className="text-[13px] text-white/40 uppercase tracking-[0.1em] font-semibold mb-[20px]">
                Rev. Ebenezer Ocran
              </div>

              {book.blurb && (
                <p className="text-[16px] text-white/60 leading-[1.7] font-light max-w-[560px] mb-[28px]">
                  {book.blurb}
                </p>
              )}

              {/* CTAs */}
              <div className="flex gap-[12px] flex-wrap">
                {book.amazon_url && (
                  <a
                    href={book.amazon_url.startsWith('http') ? book.amazon_url : `https://${book.amazon_url}`}
                    target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-[8px] text-[14px] font-semibold text-black bg-lime px-[24px] py-[13px] rounded-[7px] hover:bg-lime-dk transition-colors no-underline"
                  >
                    <span className="bg-[#ff9900] text-black rounded-sm px-[5px] py-[2px] text-[10px] font-extrabold">a</span>
                    Buy on Amazon
                  </a>
                )}
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-[8px] text-[14px] font-semibold text-white bg-white/10 border border-white/20 px-[24px] py-[13px] rounded-[7px] hover:bg-white/15 hover:border-lime/40 transition-colors no-underline"
                >
                  <i className="ph ph-map-pin text-[16px]"></i>
                  Buy Locally
                </Link>
                <Link
                  href="/books"
                  className="inline-flex items-center gap-[8px] text-[14px] font-medium text-white/50 hover:text-white transition-colors no-underline"
                >
                  ← All Books
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full Description */}
      {book.full_description && (
        <div className="bg-white py-[64px]">
          <div className="max-w-[760px] mx-auto px-8">
            <div className="text-[11px] font-bold text-lime-dk tracking-[0.14em] uppercase mb-[14px]">About This Book</div>
            <div className="font-serif text-[22px] font-bold text-black mb-[20px] leading-[1.3]">
              {book.title}
            </div>
            <div className="prose prose-lg max-w-none text-g700 leading-[1.85] font-light text-[15.5px] whitespace-pre-line">
              {book.full_description}
            </div>

            {/* Buy locally callout */}
            <div className="mt-[40px] bg-g50 border border-g100 rounded-[12px] p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-[42px] h-[42px] rounded-full bg-lime/15 flex items-center justify-center text-lime-dk text-xl shrink-0">
                <i className="ph ph-map-pin"></i>
              </div>
              <div className="flex-1">
                <div className="font-semibold text-[14px] text-black mb-[2px]">Prefer to buy locally?</div>
                <p className="text-[13px] text-g500 font-light">
                  Contact us directly to purchase a physical copy or enquire about bulk orders for your church or ministry.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-[13px] font-semibold bg-black text-white px-[20px] py-[10px] rounded-[7px] hover:bg-g900 transition-colors no-underline whitespace-nowrap"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Related Books */}
      {relatedBooks.length > 0 && (
        <div className="bg-g50 py-[64px] border-t border-g100">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="text-[11px] font-bold text-lime-dk tracking-[0.14em] uppercase mb-[10px]">
              You May Also Like
            </div>
            <h2 className="font-serif text-[28px] font-bold text-black mb-[32px]">Similar Books</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-[28px]">
              {relatedBooks.map((b) => (
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
          </div>
        </div>
      )}

      {/* Bottom CTA */}
      <div className="bg-dark py-[52px] text-center px-8 border-t border-lime/10">
        <div className="max-w-[520px] mx-auto">
          <h2 className="font-serif text-[26px] font-bold text-white mb-[8px]">Explore All Books</h2>
          <p className="text-[14px] text-white/40 mb-[20px] font-light">
            Browse the full collection of books by Rev. Ebenezer Ocran.
          </p>
          <Link
            href="/books"
            className="inline-block font-sans text-[14px] font-semibold bg-lime text-black px-[26px] py-[13px] rounded-[7px] hover:bg-lime-dk transition-all no-underline"
          >
            View All Books
          </Link>
        </div>
      </div>
    </div>
  );
}
