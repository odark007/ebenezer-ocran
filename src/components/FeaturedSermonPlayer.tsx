'use client';

import { useState } from 'react';

interface Sermon {
  id: string;
  title: string;
  youtube_url: string;
  sermon_series?: { name: string };
  scripture_ref?: string;
}

function getYouTubeId(url?: string) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  return match ? match[1] : null;
}

export default function FeaturedSermonPlayer({ sermon }: { sermon: Sermon | null }) {
  const [playing, setPlaying] = useState(false);
  const ytId = getYouTubeId(sermon?.youtube_url);

  if (!sermon || !ytId) {
    // Placeholder state — no featured sermon set yet
    return (
      <div className="rounded-[14px] overflow-hidden bg-[#0f1a05] border border-lime/10 aspect-video flex items-center justify-center">
        <div className="text-center px-6">
          <div className="w-[52px] h-[52px] bg-lime/10 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="ph ph-microphone-stage text-[26px] text-lime/40"></i>
          </div>
          <div className="text-[13px] text-white/25 font-light">No featured sermon set.<br />Mark one as featured in the admin.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[14px] overflow-hidden border border-lime/15 shadow-[0_20px_60px_rgba(0,0,0,0.4)] aspect-video relative bg-black">
      {playing ? (
        <iframe
          src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`}
          className="w-full h-full"
          allowFullScreen
          allow="autoplay; encrypted-media"
          title={sermon.title}
        />
      ) : (
        <>
          {/* Thumbnail */}
          <img
            src={`https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`}
            alt={sermon.title}
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              // Fallback to hqdefault if maxresdefault not available
              (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
            }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

          {/* Series label */}
          {sermon.sermon_series?.name && (
            <div className="absolute top-4 left-4 text-[10px] font-bold text-black bg-lime px-[10px] py-[4px] rounded-full tracking-[0.1em] uppercase">
              {sermon.sermon_series.name}
            </div>
          )}

          {/* Play button */}
          <button
            onClick={() => setPlaying(true)}
            className="absolute inset-0 flex items-center justify-center group cursor-pointer border-none bg-transparent w-full"
            aria-label={`Play ${sermon.title}`}
          >
            <div className="w-[64px] h-[64px] bg-lime rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(197,247,72,0.4)] transition-all duration-200 group-hover:scale-110 group-hover:shadow-[0_12px_40px_rgba(197,247,72,0.5)]">
              <div className="w-0 h-0 border-solid border-t-[11px] border-t-transparent border-b-[11px] border-b-transparent border-l-[20px] border-l-black ml-1.5"></div>
            </div>
          </button>

          {/* Bottom info bar */}
          <div className="absolute bottom-0 left-0 right-0 px-5 py-4">
            <div className="text-[15px] font-semibold text-white leading-tight">{sermon.title}</div>
            {sermon.scripture_ref && (
              <div className="text-[12px] text-white/50 mt-1 italic">{sermon.scripture_ref}</div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
