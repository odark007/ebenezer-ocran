import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SermonCard from '@/components/SermonCard';
import BookCard from '@/components/BookCard';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col pt-[68px]">
      <Navbar />

      {/* HERO SECTION */}
      <section className="min-h-screen flex flex-col justify-center bg-dark relative overflow-hidden flex-1">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_68%_50%,rgba(197,247,72,0.08)_0%,transparent_65%)] pointer-events-none"></div>
        <div className="max-w-[1200px] mx-auto px-8 w-full grid grid-cols-1 md:grid-cols-[1fr_400px] gap-[72px] items-center py-12 md:py-0">
          <div>
            <div className="inline-flex items-center gap-2 bg-lime/10 border border-lime/25 rounded-full px-[14px] py-[6px] mb-[24px]">
              <span className="w-1.5 h-1.5 bg-lime rounded-full animate-pulse"></span>
              <span className="text-[11px] font-bold text-lime tracking-[0.1em] uppercase">Available for Ministry</span>
            </div>
            <h1 className="font-serif text-[42px] md:text-[58px] font-bold text-white leading-[1.06] mb-[22px]">
              Proclaiming Truth,<br /><em className="text-lime not-italic italic">Transforming Lives.</em>
            </h1>
            <p className="text-[16.5px] text-white/55 leading-[1.75] max-w-[480px] mb-[36px] font-light">
              Senior Pastor of ICGC NewLife Temple, Oyibi — Ghana. Bridging scriptural truth and everyday living for over a decade, helping believers discover their Kingdom identity.
            </p>
            <div className="flex gap-3 flex-wrap mb-[32px]">
              <Link href="/sermons" className="font-sans text-[14px] font-semibold bg-lime text-black px-[26px] py-[13px] rounded-[7px] cursor-pointer transition-all duration-200 hover:bg-lime-dk hover:-translate-y-0.5">
                Watch Sermons
              </Link>
              <Link href="/contact" className="font-sans text-[14px] font-medium bg-transparent text-white border border-white/20 px-[26px] py-[13px] rounded-[7px] cursor-pointer transition-all duration-200 hover:border-lime hover:text-lime">
                Book for Ministry
              </Link>
            </div>
            <div className="flex flex-wrap gap-[7px]">
              <span className="text-[11.5px] font-medium text-white/45 bg-white/5 border border-white/10 px-[12px] py-[4px] rounded-full tracking-[0.03em]">Pastor</span>
              <span className="text-[11.5px] font-medium text-white/45 bg-white/5 border border-white/10 px-[12px] py-[4px] rounded-full tracking-[0.03em]">Teacher</span>
              <span className="text-[11.5px] font-medium text-white/45 bg-white/5 border border-white/10 px-[12px] py-[4px] rounded-full tracking-[0.03em]">Leadership Mentor</span>
              <span className="text-[11.5px] font-medium text-white/45 bg-white/5 border border-white/10 px-[12px] py-[4px] rounded-full tracking-[0.03em]">Author</span>
              <span className="text-[11.5px] font-medium text-white/45 bg-white/5 border border-white/10 px-[12px] py-[4px] rounded-full tracking-[0.03em]">Conference Speaker</span>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="rounded-[14px] overflow-hidden aspect-[3/4] bg-gradient-to-br from-[#1c2b0a] via-[#2a3c11] to-[#171e09] border border-lime/20 flex flex-col items-center justify-between relative">
              <div className="flex-1 flex flex-col items-center justify-center gap-[10px]">
                <div className="w-[72px] h-[72px] rounded-full bg-lime/10 border-2 border-lime/20 flex items-center justify-center text-[30px]">
                  <i className="ph ph-user text-lime/80 text-4xl"></i>
                </div>
                <span className="text-[11px] text-white/25">Pastor Photo</span>
              </div>
              <div className="w-full grid grid-cols-3 bg-lime/5 border-t border-lime/10">
                <div className="p-4 text-center border-r border-lime/10">
                  <div className="font-serif text-[22px] font-bold text-lime leading-none">10+</div>
                  <div className="text-[10px] text-white/35 mt-[3px] tracking-[0.06em] uppercase font-medium">Years Ministry</div>
                </div>
                <div className="p-4 text-center border-r border-lime/10">
                  <div className="font-serif text-[22px] font-bold text-lime leading-none">7</div>
                  <div className="text-[10px] text-white/35 mt-[3px] tracking-[0.06em] uppercase font-medium">Books</div>
                </div>
                <div className="p-4 text-center">
                  <div className="font-serif text-[22px] font-bold text-lime leading-none">ICGC</div>
                  <div className="text-[10px] text-white/35 mt-[3px] tracking-[0.06em] uppercase font-medium">NewLife Temple</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED SERMON */}
      <div className="bg-dark py-[68px]">
        <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 md:grid-cols-[1.15fr_1fr] gap-[56px] items-center">
          <div className="hidden md:block bg-lime/5 border border-lime/15 rounded-[14px] overflow-hidden">
            <div className="bg-black/40 p-[24px] flex items-center gap-[18px]">
              <div className="w-[52px] h-[52px] bg-lime rounded-full flex items-center justify-center cursor-pointer shrink-0">
                <div className="w-0 h-0 border-solid border-t-[9px] border-t-transparent border-b-[9px] border-b-transparent border-l-[17px] border-l-black ml-1"></div>
              </div>
              <div>
                <div className="font-serif text-[15px] font-semibold text-white mb-[3px]">The Heart of the Shepherd</div>
                <div className="text-[12px] text-lime font-medium">Servant Leadership Series</div>
              </div>
            </div>
            <div className="bg-white px-[24px] py-[14px] flex items-center gap-[12px]">
              <span className="text-[11px] text-[#999] font-medium">08:22</span>
              <div className="flex-1 h-1 bg-g100 rounded-full overflow-hidden cursor-pointer">
                <div className="w-[32%] h-full bg-lime-dk rounded-full"></div>
              </div>
              <span className="text-[11px] text-[#999] font-medium">44:15</span>
            </div>
          </div>
          <div>
            <div className="text-[11px] font-bold text-lime tracking-[0.14em] uppercase mb-[10px]">Latest Sermon</div>
            <h2 className="font-serif text-[30px] font-bold text-white leading-[1.2] mb-[14px]">The Heart of<br />the Shepherd</h2>
            <p className="text-[13.5px] text-white/45 italic border-l-2 border-lime pl-[11px] mb-[18px] leading-[1.6]">
              "The good shepherd lays down his life for the sheep." — John 10:11
            </p>
            <p className="text-[14.5px] text-white/50 leading-[1.75] font-light mb-[26px]">
              A powerful teaching on servant leadership and Christ-centered shepherding — what it means to lead not from position, but from genuine love for God&apos;s people.
            </p>
            <div className="flex gap-[11px] flex-wrap">
              <Link href="/sermons" className="font-sans text-[13px] font-semibold bg-lime text-black px-[22px] py-[11px] rounded-[7px] cursor-pointer transition-all duration-200 hover:bg-lime-dk">
                Full Sermon Library
              </Link>
              <button className="font-sans text-[13px] font-medium bg-transparent text-white/60 border border-white/15 px-[22px] py-[11px] rounded-[7px] cursor-pointer transition-all duration-200 hover:border-lime hover:text-lime">
                Download Notes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT STRIP */}
      <div className="bg-g50 py-[68px]">
        <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-[60px] items-start">
          <div className="bg-g100 rounded-[12px] aspect-[4/3] flex items-center justify-center text-[52px] border border-lime/20 text-lime-dk/50">
            <i className="ph ph-book-open"></i>
          </div>
          <div>
            <div className="text-[11px] font-bold text-lime-dk tracking-[0.14em] uppercase mb-[10px]">About the Pastor</div>
            <h2 className="font-serif text-[36px] font-bold text-black leading-[1.15] mb-[14px]">A Life Poured Out<br />for the Kingdom</h2>
            <p className="text-[15.5px] text-g700 leading-[1.75] mb-[16px] font-light">
              Rev. Ebenezer Ocran is the Senior Pastor of ICGC NewLife Temple, Oyibi–Ghana. For over a decade, he has faithfully served the congregation, leading them in spiritual growth, community impact, and Kingdom advancement.
            </p>
            <p className="text-[15.5px] text-g700 leading-[1.75] mb-[16px] font-light">
              He is widely known for practical, Bible-based teaching that effectively bridges scriptural truth and everyday living. His passion is to help believers discover their Kingdom identity and walk in the fullness of God&apos;s purpose.
            </p>
            <p className="text-[15.5px] text-g700 leading-[1.75] mb-[16px] font-light">
              Beyond the pulpit, he is a trained accountant with many years of professional working experience — successfully combining ministry with corporate and financial practice. He is happily married to <strong>Lady Grace Ocran</strong>, and they are blessed with four daughters.
            </p>
            <div className="flex flex-wrap gap-[8px] my-[18px] mb-[24px]">
              {['Expository Preaching', 'Leadership Development', 'Published Author (7 books)', 'Conference Speaker', 'Chartered Accountant'].map((pillar, i) => (
                <span key={i} className="flex items-center gap-[6px] text-[13px] font-medium text-g700">
                  <span className="w-[7px] h-[7px] bg-lime rounded-full shrink-0"></span> {pillar}
                </span>
              ))}
            </div>
            <Link href="/ministry" className="font-sans text-[13.5px] font-semibold bg-lime text-black px-[26px] py-[13px] rounded-[7px] cursor-pointer transition-all duration-200 hover:bg-lime-dk inline-block">
              Explore Ministry
            </Link>
          </div>
        </div>
      </div>

      {/* RECENT SERMONS */}
      <div className="bg-white py-[72px]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex justify-between items-end flex-wrap gap-[14px] mb-[32px]">
            <div>
              <div className="text-[11px] font-bold text-lime-dk tracking-[0.14em] uppercase mb-[10px]">Recent Teachings</div>
              <h2 className="font-serif text-[36px] font-bold text-black leading-[1.15]">Sermons & Teachings</h2>
            </div>
            <Link href="/sermons" className="font-sans text-[12.5px] font-semibold bg-lime text-black px-[20px] py-[10px] rounded-[7px] cursor-pointer transition-all duration-200 hover:bg-lime-dk">
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px]">
            <SermonCard
              type="Video" series="Servant Leadership" title="The Heart of the Shepherd"
              desc="A powerful teaching on servant leadership and Christ-centered shepherding."
              date="Recent" script="John 10:11"
            />
            <SermonCard
              type="Series" series="Spiritual Growth" title="Becoming an Extraordinary Christian"
              desc="A transformational series focused on spiritual discipline, conviction, and growth."
              date="Ongoing" script="2 Peter 1:3–4"
            />
            <SermonCard
              type="Teaching" series="Holy Spirit" title="The Ministry of the Holy Spirit"
              desc="An in-depth teaching on the work and activation of the Holy Spirit in believers."
              date="Recent" script="John 16:13"
            />
          </div>
        </div>
      </div>

      {/* BOOKS TEASER */}
      <div className="bg-g50 py-[72px]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex justify-between items-end flex-wrap gap-[14px] mb-[32px]">
            <div>
              <div className="text-[11px] font-bold text-lime-dk tracking-[0.14em] uppercase mb-[10px]">Published Works</div>
              <h2 className="font-serif text-[36px] font-bold text-black leading-[1.15]">Books by Rev. Ocran</h2>
            </div>
            <Link href="/books" className="font-sans text-[12.5px] font-semibold bg-lime text-black px-[20px] py-[10px] rounded-[7px] cursor-pointer transition-all duration-200 hover:bg-lime-dk">
              All Books →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-[28px]">
            <BookCard title="Becoming an Extraordinary Christian" color="#1a2d0a" badge="Featured" />
            <BookCard title="The Leadership Mandate" color="#0d1f2d" />
            <BookCard title="Praying with Authority" color="#2d1a0a" />
            <BookCard title="Covenant Living" color="#1a0d2d" badge="New" />
          </div>
        </div>
      </div>

      {/* PRAYER BANNER & NEWSLETTER */}
      <div className="bg-lime py-[52px] text-center px-8">
        <div className="max-w-[520px] mx-auto">
          <h2 className="font-serif text-[26px] font-bold text-black mb-[7px]">Share Your Prayer Request</h2>
          <p className="text-[15px] text-black/55 mb-[18px] font-light">Our team prays over every request. You are not alone in your need.</p>
          <Link href="/contact" className="inline-block text-[13.5px] font-bold bg-black text-white px-[26px] py-[12px] rounded-[7px] hover:bg-charcoal transition-colors">
            Submit a Prayer Request
          </Link>
        </div>
      </div>
      <div className="bg-g50 py-[52px] border-t border-g100">
        <div className="max-w-[560px] mx-auto px-8 text-center">
          <h2 className="font-serif text-[24px] font-bold text-black mb-[7px]">Stay Connected</h2>
          <p className="text-[14px] text-g500 mb-[22px] font-light">Receive devotionals, sermon notes, event updates and ministry resources in your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-[9px]">
            <input type="email" placeholder="your@email.com" className="flex-1 p-[11px_15px] text-[14px] font-sans border-[1.5px] border-g100 rounded-[7px] outline-none text-black bg-white focus:border-lime" />
            <button className="px-[20px] py-[11px] text-[13.5px] font-bold bg-black text-white border-none rounded-[7px] whitespace-nowrap hover:bg-charcoal transition-colors">Subscribe</button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
