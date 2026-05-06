import { createClient } from '@/utils/supabase/server';
import SermonCard from '@/components/SermonCard';
import BookCard from '@/components/BookCard';
import Link from 'next/link';
import Image from 'next/image';
import FeaturedSermonPlayer from '@/components/FeaturedSermonPlayer';

export default async function Home() {
  const supabase = await createClient();

  // Featured sermon
  const { data: featuredSermon } = await supabase
    .from('sermons')
    .select('*, sermon_series(name)')
    .eq('is_featured', true)
    .eq('status', 'published')
    .single();

  // Last 3 published sermons
  const { data: recentSermons } = await supabase
    .from('sermons')
    .select('*, sermon_series(name)')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(3);

  // Published books
  const { data: books } = await supabase
    .from('books')
    .select('*')
    .eq('status', 'published')
    .order('display_order', { ascending: true })
    .limit(4);

  return (
    <div className="min-h-screen flex flex-col pt-[68px]">

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
              {['Pastor', 'Teacher', 'Leadership Mentor', 'Author', 'Conference Speaker'].map((tag) => (
                <span key={tag} className="text-[11.5px] font-medium text-white/45 bg-white/5 border border-white/10 px-[12px] py-[4px] rounded-full tracking-[0.03em]">{tag}</span>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="rounded-[14px] overflow-hidden aspect-[3/4] bg-[#2a3c11] border border-lime/20 flex flex-col justify-end relative">
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src="/rev-ebenezer-ocran.jpeg"
                  alt="Pastor Ebenezer Ocran"
                  fill
                  className="object-cover object-top"
                />
              </div>
              <div className="w-full grid grid-cols-3 bg-[#111111]/80 backdrop-blur-md border-t border-lime/10 relative z-10">
                <div className="p-4 text-center border-r border-lime/10">
                  <div className="font-serif text-[22px] font-bold text-lime leading-none">10+</div>
                  <div className="text-[10px] text-white/35 mt-[3px] tracking-[0.06em] uppercase font-medium">Years Ministry</div>
                </div>
                <div className="p-4 text-center border-r border-lime/10">
                  <div className="font-serif text-[22px] font-bold text-lime leading-none">6</div>
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
          <FeaturedSermonPlayer sermon={featuredSermon} />
          <div>
            <div className="text-[11px] font-bold text-lime tracking-[0.14em] uppercase mb-[10px]">Latest Sermon</div>
            {featuredSermon ? (
              <>
                <h2 className="font-serif text-[30px] font-bold text-white leading-[1.2] mb-[14px]">
                  {featuredSermon.title}
                </h2>
                {featuredSermon.scripture_ref && (
                  <p className="text-[13.5px] text-white/45 italic border-l-2 border-lime pl-[11px] mb-[18px] leading-[1.6]">
                    "{featuredSermon.scripture_ref}"
                  </p>
                )}
                {featuredSermon.description && (
                  <p className="text-[14.5px] text-white/50 leading-[1.75] font-light mb-[26px]">
                    {featuredSermon.description}
                  </p>
                )}
                <div className="flex gap-[11px] flex-wrap">
                  <Link href="/sermons" className="text-[13px] font-semibold bg-lime text-black px-[20px] py-[10px] rounded-[7px] hover:bg-lime-dk transition-colors">
                    Full Sermon Library
                  </Link>
                  {featuredSermon.notes_url && (
                    <a href={featuredSermon.notes_url} target="_blank" rel="noopener noreferrer"
                      className="text-[13px] font-semibold bg-white/10 text-white border border-white/20 px-[20px] py-[10px] rounded-[7px] hover:bg-white/15 transition-colors no-underline">
                      Download Notes
                    </a>
                  )}
                </div>
              </>
            ) : (
              <div>
                <h2 className="font-serif text-[30px] font-bold text-white leading-[1.2] mb-[14px]">
                  Sermons & Teachings
                </h2>
                <p className="text-[14.5px] text-white/50 leading-[1.75] font-light mb-[26px]">
                  Life-changing messages to grow your faith and strengthen your walk with God.
                </p>
                <Link href="/sermons" className="text-[13px] font-semibold bg-lime text-black px-[20px] py-[10px] rounded-[7px] hover:bg-lime-dk transition-colors">
                  Full Sermon Library
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ABOUT STRIP */}
      <div className="bg-g50 py-[68px]">
        <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-[60px] items-start">
          <div className="bg-g100 rounded-[12px] aspect-[9/16] border border-lime/20 overflow-hidden relative">
            <Image src="/rev-ebenezer-ocran-life-II.jpeg" alt="Rev. Ebenezer Ocran" fill className="object-cover" />
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
              Beyond the pulpit, he is a trained accountant with many years of professional working experience. He is happily married to <strong>Lady Grace Ocran</strong>, and they are blessed with four daughters.
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
            {recentSermons && recentSermons.length > 0 ? (
              recentSermons.map((s) => (
                <SermonCard
                  key={s.id}
                  type={s.type}
                  series={s.sermon_series?.name || ''}
                  title={s.title}
                  scripture_ref={s.scripture_ref}
                  description={s.description}
                  youtube_url={s.youtube_url}
                  notes_url={s.notes_url}
                  podbean_url={s.podbean_url}
                />
              ))
            ) : (
              // Fallback placeholders when no sermons in DB yet
              <>
                <SermonCard type="Video" series="Servant Leadership" title="The Heart of the Shepherd" script="John 10:11" desc="A powerful teaching on servant leadership and Christ-centered shepherding." />
                <SermonCard type="Series" series="Spiritual Growth" title="Becoming an Extraordinary Christian" script="2 Peter 1:3–4" desc="A transformational series focused on spiritual discipline, conviction, and growth." />
                <SermonCard type="Teaching" series="Holy Spirit" title="The Ministry of the Holy Spirit" script="John 16:13" desc="An in-depth teaching on the work and activation of the Holy Spirit in believers." />
              </>
            )}
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[28px]">
            {books && books.length > 0 ? (
              books.map((b) => (
                <a key={b.id} href={`/books/${b.slug}`} className="no-underline group cursor-pointer">
                  <div className="transition-transform duration-200 group-hover:-translate-y-1">
                    <div className="rounded-lg overflow-hidden aspect-[9/16] relative shadow-[0_8px_28px_rgba(0,0,0,0.12)] mb-[12px]">
                      {b.cover_image_url ? (
                        <img
                          src={b.cover_image_url}
                          alt={b.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <div
                          className="absolute inset-0 flex flex-col justify-end p-4"
                          style={{ background: `linear-gradient(160deg, ${b.color || '#1a2d0a'} 0%, #111 100%)` }}
                        >
                          <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-lime/40"></div>
                          <div className="font-serif text-[14px] font-bold text-white leading-[1.2] relative z-10">{b.title}</div>
                          <div className="text-[9px] text-white/40 uppercase tracking-[0.08em] mt-1 relative z-10">Rev. Ebenezer Ocran</div>
                        </div>
                      )}
                      {b.badge && (
                        <div className="absolute top-[10px] right-[10px] bg-lime text-black text-[9px] font-bold px-[7px] py-[3px] rounded-[3px] tracking-[0.08em] uppercase z-10">
                          {b.badge}
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <span className="bg-lime text-black text-[11px] font-bold px-[12px] py-[6px] rounded-full">Learn More</span>
                      </div>
                    </div>
                    <div className="font-serif text-[14px] font-semibold text-black leading-[1.3] group-hover:text-lime-dk transition-colors">
                      {b.title}
                    </div>
                  </div>
                </a>
              ))
            ) : (
              <>
                <BookCard title="Becoming an Extraordinary Christian" color="#1a2d0a" badge="Featured" />
                <BookCard title="The Leadership Mandate" color="#0d1f2d" />
                <BookCard title="Praying with Authority" color="#2d1a0a" />
                <BookCard title="Covenant Living" color="#1a0d2d" badge="New" />
              </>
            )}
          </div>
        </div>
      </div>

      {/* PRAYER BANNER */}
      <div className="bg-lime py-[52px] text-center px-8">
        <div className="max-w-[520px] mx-auto">
          <h2 className="font-serif text-[26px] font-bold text-black mb-[7px]">Share Your Prayer Request</h2>
          <p className="text-[15px] text-black/55 mb-[18px] font-light">Our team prays over every request. You are not alone in your need.</p>
          <Link href="/contact" className="inline-block text-[13.5px] font-bold bg-black text-white px-[26px] py-[12px] rounded-[7px] hover:bg-charcoal transition-colors">
            Submit a Prayer Request
          </Link>
        </div>
      </div>

      {/* NEWSLETTER */}
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

    </div>
  );
}
