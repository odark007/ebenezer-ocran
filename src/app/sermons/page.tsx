'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SermonCard from '@/components/SermonCard';
import { useState } from 'react';

export default function Sermons() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Video', 'Audio', 'Series', 'Notes Only'];

  const sermons = [
    {type:'Video',series:'Servant Leadership',title:'The Heart of the Shepherd',date:'Recent',dur:'44 min',script:'John 10:11'},
    {type:'Series',series:'Spiritual Growth',title:'Becoming an Extraordinary Christian',date:'Ongoing',dur:'Multiple',script:'2 Peter 1:3–4'},
    {type:'Teaching',series:'Holy Spirit',title:'The Ministry of the Holy Spirit',date:'Recent',dur:'52 min',script:'John 16:13'},
    {type:'Video',series:'Kingdom Identity',title:'Walking in Divine Purpose',date:'',dur:'41 min',script:'Ephesians 2:10'},
    {type:'Audio',series:'Prayer',title:'Prevailing in Prayer',date:'',dur:'48 min',script:'Luke 18:1–8'},
    {type:'Teaching',series:'Character',title:'Possessing Your Inheritance',date:'',dur:'55 min',script:'Joshua 1:3'},
  ];

  return (
    <div className="min-h-screen flex flex-col pt-[68px]">
      <Navbar />

      <div className="bg-dark pt-[48px] pb-[48px]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-[11px] font-bold text-lime tracking-[0.14em] uppercase mb-[10px]">Media Library</div>
          <h1 className="font-serif text-[44px] font-bold text-white leading-[1.1] mb-[10px]">Sermons & Teachings</h1>
          <p className="text-[15px] text-white/50 font-light max-w-[520px] leading-[1.65]">Stream, download, and share life-changing messages. Every teaching archived for your growth in Christ.</p>
        </div>
      </div>

      <div className="bg-white border-b border-g100 py-[14px] sticky top-[68px] z-50">
        <div className="max-w-[1200px] mx-auto px-8 flex gap-[7px] items-center flex-wrap">
          {filters.map(f => (
            <button 
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`text-[12.5px] font-medium px-[14px] py-[7px] rounded-[6px] border border-g100 bg-white text-g700 cursor-pointer transition-all duration-150 hover:bg-lime hover:border-lime hover:text-black hover:font-semibold ${activeFilter === f ? '!bg-lime !border-lime !text-black !font-semibold' : ''}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-8 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[22px] py-[32px]">
          {sermons.map((s, idx) => (
             <SermonCard key={idx} {...s} />
          ))}
        </div>
      </div>

      <div className="bg-g50 py-[52px] border-t border-g100">
        <div className="max-w-[560px] mx-auto px-8 text-center">
          <h2 className="font-serif text-[24px] font-bold text-black mb-[7px]">Never Miss a Sermon</h2>
          <p className="text-[14px] text-g500 mb-[22px] font-light">Subscribe and get new messages and study notes delivered to your inbox.</p>
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
