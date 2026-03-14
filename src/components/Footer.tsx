import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-dark pt-[52px] pb-[22px]">
      <div className="max-w-[1200px] mx-auto px-8">

        <div className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr] gap-9 pb-11 border-b border-white/5">
          <div>
            <div className="font-serif text-[18px] font-bold text-white mb-1">Rev. Ebenezer Ocran</div>
            <div className="text-[10px] text-white/30 tracking-[0.12em] uppercase mb-[14px]">Pastor · Teacher · Author</div>
            <p className="text-[13px] text-white/40 leading-[1.7] font-light mb-[18px]">
              Senior Pastor of ICGC NewLife Temple, Oyibi–Ghana. Committed to proclaiming the truth of God&apos;s Word and building lives that glorify Christ.
            </p>
            <div className="flex gap-[7px]">
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-md bg-white/5 border border-white/10 text-[16px] font-bold text-white/50 transition-colors duration-150 hover:bg-lime/10 hover:border-lime/30 hover:text-lime">
                <i className="ph ph-facebook-logo"></i>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-md bg-white/5 border border-white/10 text-[16px] font-bold text-white/50 transition-colors duration-150 hover:bg-lime/10 hover:border-lime/30 hover:text-lime">
                <i className="ph ph-instagram-logo"></i>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-md bg-white/5 border border-white/10 text-[16px] font-bold text-white/50 transition-colors duration-150 hover:bg-lime/10 hover:border-lime/30 hover:text-lime">
                <i className="ph ph-linkedin-logo"></i>
              </a>
              <a href="https://icgcnltmedia.podbean.com/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center rounded-md bg-white/5 border border-white/10 text-[16px] font-bold text-white/50 transition-colors duration-150 hover:bg-lime/10 hover:border-lime/30 hover:text-lime">
                <i className="ph ph-microphone-stage"></i>
              </a>
            </div>
          </div>

          <div>
            <div className="text-[10.5px] font-bold text-white/45 tracking-[0.12em] uppercase mb-[14px]">Ministry</div>
            <div className="flex flex-col gap-[7px]">
              <Link href="/sermons" className="text-[13px] text-white/40 font-light text-left transition-colors duration-150 hover:text-lime">Sermon Library</Link>
              <Link href="/sermons" className="text-[13px] text-white/40 font-light text-left transition-colors duration-150 hover:text-lime">Teaching Series</Link>
              <Link href="/ministry" className="text-[13px] text-white/40 font-light text-left transition-colors duration-150 hover:text-lime">Ministry Focus</Link>
            </div>
          </div>

          <div>
            <div className="text-[10.5px] font-bold text-white/45 tracking-[0.12em] uppercase mb-[14px]">Resources</div>
            <div className="flex flex-col gap-[7px]">
              <Link href="/books" className="text-[13px] text-white/40 font-light text-left transition-colors duration-150 hover:text-lime">Books (Amazon)</Link>
              <Link href="/sermons" className="text-[13px] text-white/40 font-light text-left transition-colors duration-150 hover:text-lime">Study Materials</Link>
              <Link href="/sermons" className="text-[13px] text-white/40 font-light text-left transition-colors duration-150 hover:text-lime">Sermon Notes</Link>
            </div>
          </div>

          <div>
            <div className="text-[10.5px] font-bold text-white/45 tracking-[0.12em] uppercase mb-[14px]">Connect</div>
            <div className="flex flex-col gap-[7px]">
              <Link href="/contact" className="text-[13px] text-white/40 font-light text-left transition-colors duration-150 hover:text-lime">Book for Ministry</Link>
              <Link href="/contact" className="text-[13px] text-white/40 font-light text-left transition-colors duration-150 hover:text-lime">Prayer Request</Link>
              <Link href="/contact" className="text-[13px] text-white/40 font-light text-left transition-colors duration-150 hover:text-lime">Contact Us</Link>
              <Link href="/admin" className="text-[13px] text-white/40 font-light text-left transition-colors duration-150 hover:text-lime">Admin Login</Link>
            </div>
          </div>
        </div>

        <div className="pt-[22px] flex justify-between items-center flex-wrap gap-2.5">
          <span className="text-[11.5px] text-white/25 font-light">© 2026 Rev. Ebenezer Ocran. All Rights Reserved.</span>
          <div className="flex gap-[14px]">
            <Link href="#" className="text-[11.5px] text-white/25 font-light transition-colors hover:text-white/50">Privacy</Link>
            <Link href="#" className="text-[11.5px] text-white/25 font-light transition-colors hover:text-white/50">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
