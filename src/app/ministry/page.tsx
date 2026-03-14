import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';

export default function Ministry() {
  const pillars = [
    {icon:'users-four',title:'Leadership Development',desc:'Raising a new generation of leaders equipped with character, competence, and a Kingdom mindset.'},
    {icon:'book-open-text',title:'Doctrinal Teaching',desc:'Building solid biblical foundations for believers to stand firm in a rapidly changing world.'},
    {icon:'hands-praying',title:'Prayer & Spiritual Growth',desc:'Fostering a culture of deep intercession, spiritual disciplines, and reliance on the Holy Spirit.'},
    {icon:'microphone-stage',title:'Conference Speaking',desc:'Delivering impactful, transformative messages at ministry events and corporate gatherings.'},
    {icon:'church',title:'Church Growth Structure',desc:'Consulting and teaching on church administration, growth systems, and organizational health.'},
    {icon:'house-line',title:'Family & Community',desc:'Strengthening marriages and families as the foundational unit for Kingdom expression.'},
  ];

  return (
    <div className="min-h-screen flex flex-col pt-[68px]">
      <Navbar />

      <div className="bg-dark pt-[64px] pb-[64px] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_150%,rgba(197,247,72,0.1)_0%,transparent_50%)] pointer-events-none"></div>
        <div className="max-w-[1200px] mx-auto px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-[40px] items-center">
            <div>
              <div className="text-[11px] font-bold text-lime tracking-[0.14em] uppercase mb-[10px]">Ministry Focus</div>
              <h1 className="font-serif text-[44px] sm:text-[54px] font-bold text-white leading-[1.05] mb-[18px]">
                Equipping the Saints.<br />Building the Church.
              </h1>
              <p className="text-[16px] text-white/50 font-light max-w-[560px] leading-[1.7] mb-[28px]">
                The mandate of Rev. Ebenezer Ocran&apos;s ministry is to see believers mature into the full stature of Christ, stepping into their God-given assignments with boldness and clarity.
              </p>
              <div className="flex gap-[12px] flex-wrap">
                <Link href="#pillars" className="font-sans text-[13px] font-semibold bg-lime text-black px-[24px] py-[12px] rounded-[7px] cursor-pointer transition-all duration-200 hover:bg-lime-dk hover:-translate-y-0.5">
                  Core Pillars
                </Link>
                <Link href="/contact" className="font-sans text-[13px] font-medium bg-transparent text-white border border-white/20 px-[24px] py-[12px] rounded-[7px] cursor-pointer transition-all duration-200 hover:border-lime hover:text-lime">
                  Book for Ministry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="pillars" className="bg-white py-[82px] scroll-mt-[68px]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-[36px] gap-y-[48px]">
            {pillars.map(p => (
              <div className="group" key={p.title}>
                <div className="w-[52px] h-[52px] rounded-full bg-lime/10 border border-lime/20 flex items-center justify-center text-[24px] text-lime-dk mb-[18px] transition-transform duration-300 group-hover:-translate-y-1">
                  <i className={`ph ph-${p.icon}`}></i>
                </div>
                <h3 className="font-serif text-[20px] font-bold text-black leading-[1.2] mb-[10px]">{p.title}</h3>
                <p className="text-[14px] text-g500 leading-[1.65] font-light max-w-[90%]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-g50 py-[82px]">
        <div className="max-w-[800px] mx-auto px-8 text-center">
          <i className="ph ph-quotes text-[42px] text-lime/40 mb-[18px] block mx-auto"></i>
          <p className="font-serif text-[24px] md:text-[32px] font-bold text-black leading-[1.3] mb-[28px]">
            "True ministry is not about gathering a crowd, but about building people who will go out and change their world for Christ."
          </p>
          <div className="w-[42px] h-[3px] bg-lime mx-auto mb-[18px]"></div>
          <div className="text-[13px] font-bold text-black uppercase tracking-[0.1em]">Rev. Ebenezer Ocran</div>
        </div>
      </div>

      <div className="bg-dark py-[72px] text-center px-8 border-t border-lime/10">
        <div className="max-w-[600px] mx-auto">
          <div className="text-[11px] font-bold text-lime tracking-[0.14em] uppercase mb-[10px]">Ministry Invitations</div>
          <h2 className="font-serif text-[32px] font-bold text-white leading-[1.2] mb-[16px]">Invite Rev. Ocran to Speak</h2>
          <p className="text-[15px] text-white/50 leading-[1.65] mb-[28px] font-light">
            Available for church conferences, leadership seminars, and corporate training events globally. Fill out the ministry booking form and our team will be in touch.
          </p>
          <Link href="/contact" className="inline-block font-sans text-[14px] font-semibold bg-lime text-black px-[28px] py-[13px] rounded-[7px] cursor-pointer transition-all duration-200 hover:bg-lime-dk hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(197,247,72,0.15)]">
            Go to Booking Form
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
