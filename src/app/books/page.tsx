import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookCard from '@/components/BookCard';
import Link from 'next/link';

export default function Books() {
  const books = [
    {title:'The Leadership Mandate',blurb:'Biblical principles for godly leadership across every sphere of influence.',color:'#0d1f2d',badge:''},
    {title:'Praying with Authority',blurb:'Unlock your covenant rights in prayer and intercession.',color:'#2d1a0a',badge:''},
    {title:'Covenant Living',blurb:'What it means to live as a covenant child of God in every area of life.',color:'#1a0d2d',badge:'New'},
    {title:'Faith That Moves',blurb:'Mountain-moving faith — what it is, how it grows, how to walk in it.',color:'#0d2d1a',badge:''},
    {title:'Positioned for Destiny',blurb:'God has a specific place and assignment for your life. Find and fulfil it.',color:'#2d1a1a',badge:''},
    {title:'The Generous Life',blurb:'Biblical principles of giving and how generosity unlocks God\'s blessing.',color:'#1a1a2d',badge:''},
  ];

  return (
    <div className="min-h-screen flex flex-col pt-[68px]">
      <Navbar />

      <div className="bg-dark pt-[48px] pb-[48px]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-[11px] font-bold text-lime tracking-[0.14em] uppercase mb-[10px]">Published Works</div>
          <h1 className="font-serif text-[44px] font-bold text-white leading-[1.1] mb-[10px]">Books by Rev. Ocran</h1>
          <p className="text-[15px] text-white/50 font-light max-w-[520px] leading-[1.65]">Seven books designed to equip believers, develop leaders, and deepen your walk with God. All available on Amazon.</p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-8 flex-1 w-full">
        {/* FEATURED BOOK */}
        <div className="bg-white border border-g100 rounded-[14px] p-9 my-10 grid grid-cols-1 md:grid-cols-[200px_1fr] gap-9 items-center shadow-sm">
          <div 
            className="rounded-lg overflow-hidden aspect-[2/3] flex flex-col justify-end px-4 py-5 relative shadow-[0_8px_28px_rgba(0,0,0,0.12)] mb-0"
            style={{ background: `linear-gradient(160deg, #1a2d0a 0%, #111 100%)` }}
          >
            <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-lime/40"></div>
            <div className="absolute top-[10px] right-[10px] bg-lime text-black text-[9px] font-bold px-[7px] py-[3px] rounded-[3px] tracking-[0.08em] uppercase">Featured</div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent/55"></div>
            <div className="font-serif text-[16px] font-bold text-white leading-[1.2] mb-[6px] relative z-10">Becoming an Extraordinary Christian</div>
            <div className="text-[10px] text-white/45 font-normal tracking-[0.08em] uppercase relative z-10">Rev. Ebenezer Ocran</div>
          </div>
          <div>
            <div className="text-[11px] font-bold text-lime-dk tracking-[0.14em] uppercase mb-[10px]">Featured Book</div>
            <h2 className="font-serif text-[26px] font-bold text-black mb-[10px]">Becoming an Extraordinary Christian</h2>
            <p className="text-[15px] text-g500 leading-[1.7] font-light mb-[20px] max-w-[600px]">
              A practical guide to developing spiritual maturity, character, and kingdom influence. This book has shaped the faith journey of countless believers, offering clear, actionable biblical insight for everyday Christian living.
            </p>
            <div className="flex gap-[10px] items-center">
              <button className="inline-flex items-center gap-[6px] text-[13.5px] font-semibold text-black bg-lime px-[20px] py-[11px] rounded-[6px] border-none cursor-pointer transition-colors duration-150 hover:bg-lime-dk">
                <span className="bg-[#ff9900] text-black rounded-sm px-[5px] py-[1px] text-[9px] font-extrabold">a</span> Order on Amazon
              </button>
              <span className="text-[12.5px] text-g500">Order coming soon</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[28px] py-[32px]">
          {books.map((b, idx) => (
             <BookCard key={idx} {...b} />
          ))}
        </div>
      </div>

      <div className="bg-dark py-[52px] border-t border-lime/10 text-center">
        <div className="max-w-[520px] mx-auto px-8">
          <div className="font-serif text-[24px] font-bold text-white mb-[8px]">Bulk Orders & Ministry Use</div>
          <p className="text-[14px] text-white/40 mb-[18px] font-light">Looking to order books in bulk for your church, conference, or ministry?</p>
          <Link href="/contact" className="inline-block font-sans text-[14px] font-semibold bg-lime text-black px-[26px] py-[13px] rounded-[7px] cursor-pointer transition-all duration-200 hover:bg-lime-dk hover:-translate-y-0.5">
            Contact for Bulk Orders
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
