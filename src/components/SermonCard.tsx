'use client';

import { useState } from 'react';

interface SermonProps {
  id?: string;
  type: string;
  series: string;
  title: string;
  date?: string;
  scripture_ref?: string;
  // legacy prop name kept for backward compat
  script?: string;
  desc?: string;
  description?: string;
  youtube_url?: string;
  notes_url?: string;
  podbean_url?: string;
}

function getYouTubeId(url?: string) {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/);
  return match ? match[1] : null;
}

export default function SermonCard({
  type, series, title, date, scripture_ref, script, desc, description,
  youtube_url, notes_url, podbean_url,
}: SermonProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const ytId = getYouTubeId(youtube_url);
  const scriptureText = scripture_ref || script;
  const descText = description || desc;

  return (
    <>
      <div className="bg-white border border-g100 rounded-[12px] overflow-hidden transition-all duration-200 hover:border-lime hover:-translate-y-[3px] hover:shadow-[0_8px_28px_rgba(197,247,72,0.1)] group">
        {/* Thumbnail / Play area */}
        <div
          className="bg-dark aspect-video flex items-center justify-center relative cursor-pointer"
          onClick={() => youtube_url && setModalOpen(true)}
        >
          {ytId ? (
            <img
              src={`https://img.youtube.com/vi/${ytId}/hqdefault.jpg`}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[#111] to-[#1f2a0d]"></div>
          )}

          <div className="w-[46px] h-[46px] bg-lime rounded-full flex items-center justify-center relative z-10 transition-transform duration-150 group-hover:scale-110 shadow-lg">
            <div className="w-0 h-0 border-solid border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[15px] border-l-black ml-1"></div>
          </div>

          <div className="absolute top-[10px] left-[10px] z-10 text-[10px] font-bold tracking-[0.1em] uppercase px-[9px] py-[3px] rounded-full bg-lime/90 text-black">
            {type}
          </div>
        </div>

        {/* Card body */}
        <div className="p-[18px]">
          <div className="text-[11px] font-semibold text-lime-dk tracking-[0.06em] uppercase mb-[5px]">
            {series}
          </div>
          <div className="font-serif text-[17px] font-semibold text-black leading-[1.3] mb-[8px]">
            {title}
          </div>

          {date && (
            <div className="text-[12px] text-g300 mb-[12px]">{date}</div>
          )}

          {scriptureText && (
            <div className="text-[13px] text-g700 italic border-l-2 border-lime pl-[9px] leading-[1.5] mb-[10px]">
              {scriptureText}
            </div>
          )}

          {descText && (
            <p className="text-[13px] text-g500 leading-[1.6] font-light mb-[14px]">{descText}</p>
          )}

          {/* Action buttons */}
          <div className="flex gap-[7px] flex-wrap mt-[14px]">
            <button
              onClick={() => youtube_url && setModalOpen(true)}
              disabled={!youtube_url}
              className="text-[12px] font-semibold px-[12px] py-[7px] rounded-[5px] cursor-pointer transition-all duration-150 border-none flex items-center gap-[5px] bg-black text-white hover:bg-g900 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              ▶ Play
            </button>

            {notes_url && (
              <a
                href={notes_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-semibold px-[12px] py-[7px] rounded-[5px] cursor-pointer transition-all duration-150 border-none flex items-center gap-[5px] bg-g100 text-g700 hover:bg-g300 hover:text-black no-underline"
              >
                <i className="ph ph-file-text"></i> Notes
              </a>
            )}

            {podbean_url && (
              <a
                href={podbean_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] font-semibold px-[12px] py-[7px] rounded-[5px] cursor-pointer transition-all duration-150 border-none flex items-center gap-[5px] bg-lime-pale text-g700 hover:bg-lime hover:text-black no-underline"
              >
                <i className="ph ph-microphone-stage"></i> Podcast
              </a>
            )}
          </div>
        </div>
      </div>

      {/* YouTube Modal */}
      {modalOpen && ytId && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="w-full max-w-[860px] bg-black rounded-[14px] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-3 bg-[#111] border-b border-white/10">
              <div>
                <div className="text-[11px] text-lime font-bold uppercase tracking-[0.08em]">{series}</div>
                <div className="text-[15px] font-semibold text-white">{title}</div>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white border-none cursor-pointer transition-colors"
              >
                <i className="ph ph-x text-[16px]"></i>
              </button>
            </div>
            {/* YouTube embed */}
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${ytId}?autoplay=1`}
                className="w-full h-full"
                allowFullScreen
                allow="autoplay; encrypted-media"
                title={title}
              />
            </div>
            {/* Modal footer */}
            <div className="px-5 py-3 bg-[#111] border-t border-white/10 flex items-center gap-3">
              {scriptureText && (
                <span className="text-[12px] italic text-white/50 border-l-2 border-lime pl-2">{scriptureText}</span>
              )}
              <div className="flex-1"></div>
              {notes_url && (
                <a href={notes_url} target="_blank" rel="noopener noreferrer"
                  className="text-[11px] font-semibold text-white/70 hover:text-lime flex items-center gap-1 no-underline transition-colors">
                  <i className="ph ph-file-text"></i> Download Notes
                </a>
              )}
              {podbean_url && (
                <a href={podbean_url} target="_blank" rel="noopener noreferrer"
                  className="text-[11px] font-semibold text-white/70 hover:text-lime flex items-center gap-1 no-underline transition-colors">
                  <i className="ph ph-microphone-stage"></i> Listen on Podbean
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
