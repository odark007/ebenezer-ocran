'use client';

import { useState } from 'react';
import SermonCard from '@/components/SermonCard';

interface Sermon {
  id: string;
  type: string;
  title: string;
  scripture_ref?: string;
  description?: string;
  youtube_url?: string;
  notes_url?: string;
  podbean_url?: string;
  sermon_series?: { name: string };
}

interface Series {
  id: string;
  name: string;
}

const FILTERS = ['All', 'Video', 'Audio', 'Series'];

export default function SermonFilters({
  sermons,
  seriesList,
}: {
  sermons: Sermon[];
  seriesList: Series[];
}) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [activeSeries, setActiveSeries] = useState('All');

  const filtered = sermons.filter((s) => {
    const typeMatch = activeFilter === 'All' || s.type === activeFilter;
    const seriesMatch =
      activeSeries === 'All' || s.sermon_series?.name === activeSeries;
    return typeMatch && seriesMatch;
  });

  return (
    <>
      {/* Sticky filter bar */}
      <div className="bg-white border-b border-g100 py-[14px] sticky top-[68px] z-50">
        <div className="max-w-[1200px] mx-auto px-8 flex gap-[7px] items-center flex-wrap">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`text-[12.5px] font-medium px-[14px] py-[7px] rounded-[6px] border cursor-pointer transition-all duration-150 ${
                activeFilter === f
                  ? 'bg-lime border-lime text-black font-semibold'
                  : 'border-g100 bg-white text-g700 hover:bg-lime hover:border-lime hover:text-black hover:font-semibold'
              }`}
            >
              {f}
            </button>
          ))}

          {seriesList.length > 0 && (
            <>
              <span className="w-px h-5 bg-g100 mx-1"></span>
              <select
                value={activeSeries}
                onChange={(e) => setActiveSeries(e.target.value)}
                className="text-[12.5px] font-medium px-[14px] py-[7px] rounded-[6px] border border-g100 bg-white text-g700 cursor-pointer outline-none focus:border-lime appearance-none pr-8"
              >
                <option value="All">All Series</option>
                {seriesList.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </>
          )}

          <span className="ml-auto text-[12px] text-g300">
            {filtered.length} sermon{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-[1200px] mx-auto px-8 w-full">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[22px] py-[32px]">
            {filtered.map((s) => (
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
            ))}
          </div>
        ) : (
          <div className="py-[80px] text-center text-g500 text-[15px]">
            No sermons found for this filter.
          </div>
        )}
      </div>
    </>
  );
}
