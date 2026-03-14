interface SermonProps {
  type: string;
  series: string;
  title: string;
  date: string;
  dur?: string;
  script: string;
  desc?: string;
}

export default function SermonCard({ type, series, title, date, dur, script, desc }: SermonProps) {
  return (
    <div className="bg-white border border-g100 rounded-[12px] overflow-hidden cursor-pointer transition-all duration-200 hover:border-lime hover:-translate-y-[3px] hover:shadow-[0_8px_28px_rgba(197,247,72,0.1)] group">
      
      <div className="bg-dark aspect-video flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#111] to-[#1f2a0d]"></div>
        
        <div className="w-[46px] h-[46px] bg-lime rounded-full flex items-center justify-center relative z-10 transition-transform duration-150 group-hover:scale-110">
          <div className="w-0 h-0 border-solid border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent border-l-[15px] border-l-black ml-1"></div>
        </div>
        
        <div className="absolute top-[10px] left-[10px] z-10 text-[10px] font-bold tracking-[0.1em] uppercase px-[9px] py-[3px] rounded-full bg-lime/90 text-black">
          {type}
        </div>
      </div>
      
      <div className="p-[18px]">
        <div className="text-[11px] font-semibold text-lime-dk tracking-[0.06em] uppercase mb-[5px]">{series}</div>
        <div className="font-serif text-[17px] font-semibold text-black leading-[1.3] mb-[8px]">{title}</div>
        
        <div className="flex gap-[10px] items-center mb-[12px]">
          <span className="text-[12px] text-g300">{date || 'Archive'}</span>
          {dur && dur !== 'Multiple' && <span className="text-[12px] text-g500 bg-g100 px-[7px] py-[2px] rounded-[4px]">{dur}</span>}
        </div>
        
        <div className="text-[13px] text-g700 italic border-l-2 border-lime pl-[9px] leading-[1.5]">{script}</div>
        
        {desc && (
            <p className="text-[13px] text-g500 leading-[1.6] mt-[8px] font-light">{desc}</p>
        )}
        
        <div className="flex gap-[7px] mt-[14px]">
          <button className="text-[12px] font-semibold px-[12px] py-[7px] rounded-[5px] cursor-pointer transition-all duration-150 border-none flex items-center gap-[5px] bg-black text-white hover:bg-g900">
            ▶ Play
          </button>
          <button className="text-[12px] font-semibold px-[12px] py-[7px] rounded-[5px] cursor-pointer transition-all duration-150 border-none flex items-center gap-[5px] bg-g100 text-g700 hover:bg-g300 hover:text-black">
            <i className="ph ph-file-text"></i> Notes
          </button>
          <button className="text-[12px] font-semibold px-[12px] py-[7px] rounded-[5px] cursor-pointer transition-all duration-150 border-none flex items-center gap-[5px] bg-lime-pale text-g700 hover:bg-lime hover:text-black">
            ⬇ Download
          </button>
        </div>
      </div>
    </div>
  );
}
