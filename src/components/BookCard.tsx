interface BookProps {
  title: string;
  blurb?: string;
  color: string;
  badge?: string;
}

export default function BookCard({ title, blurb, color, badge }: BookProps) {
  return (
    <div className="cursor-pointer transition-transform duration-200 hover:-translate-y-1 group">
      <div 
        className="rounded-lg overflow-hidden aspect-[2/3] flex flex-col justify-end px-4 py-5 relative shadow-[0_8px_28px_rgba(0,0,0,0.12)] mb-[14px]"
        style={{ background: `linear-gradient(160deg, ${color} 0%, #111 100%)` }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-lime/40"></div>
        {badge && (
          <div className="absolute top-[10px] right-[10px] bg-lime text-black text-[9px] font-bold px-[7px] py-[3px] rounded-[3px] tracking-[0.08em] uppercase">
            {badge}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent/55"></div>
        
        <div className="font-serif text-[16px] font-bold text-white leading-[1.2] mb-[6px] relative z-10">{title}</div>
        <div className="text-[10px] text-white/45 font-normal tracking-[0.08em] uppercase relative z-10">Rev. Ebenezer Ocran</div>
      </div>
      
      {blurb && (
        <>
            <div className="font-serif text-[15.5px] font-semibold text-black leading-[1.3] mb-[6px]">{title}</div>
            <div className="text-[13px] text-g500 leading-[1.6] mb-[10px] font-light">{blurb}</div>
        </>
      )}

      <button className="inline-flex items-center gap-[6px] text-[12.5px] font-semibold text-black bg-lime px-[16px] py-[8px] rounded-[6px] border-none cursor-pointer transition-colors duration-150 hover:bg-lime-dk">
        <span className="bg-[#ff9900] text-black rounded-sm px-[5px] py-[1px] text-[9px] font-extrabold">a</span> Buy on Amazon
      </button>
    </div>
  );
}
