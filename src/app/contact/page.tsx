import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Contact() {
  return (
    <div className="min-h-screen flex flex-col pt-[68px]">
      <Navbar />

      <div className="bg-white py-[64px] flex-1">
        <div className="max-w-[1200px] mx-auto px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-[64px] items-start">
            
            <div className="bg-dark p-[42px] rounded-[16px] border border-lime/15 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[150px] h-[150px] bg-lime/10 blur-[60px] rounded-full pointer-events-none"></div>
              
              <div className="text-[11px] font-bold text-lime tracking-[0.14em] uppercase mb-[8px] relative z-10">Get in Touch</div>
              <h1 className="font-serif text-[36px] font-bold text-white leading-[1.1] mb-[16px] relative z-10">Contact & Bookings</h1>
              <p className="text-[15px] text-white/50 font-light leading-[1.65] mb-[38px] relative z-10">
                Whether you want to invite Rev. Ocran to speak, submit a prayer request, or inquire about bulk book orders, use the form or the details below.
              </p>

              <div className="space-y-[24px] mb-[42px] relative z-10">
                <div className="flex items-start gap-[16px]">
                  <div className="w-[36px] h-[36px] rounded-full bg-lime/10 flex items-center justify-center text-lime shrink-0">
                    <i className="ph ph-envelope-simple text-[18px]"></i>
                  </div>
                  <div>
                    <div className="text-[11px] text-white/40 uppercase tracking-[0.08em] font-semibold mb-[2px]">Email Address</div>
                    <div className="text-[15px] text-white">info@revebenezerocran.org</div>
                  </div>
                </div>
                
                <div className="flex items-start gap-[16px]">
                  <div className="w-[36px] h-[36px] rounded-full bg-lime/10 flex items-center justify-center text-lime shrink-0">
                    <i className="ph ph-map-pin text-[18px]"></i>
                  </div>
                  <div>
                    <div className="text-[11px] text-white/40 uppercase tracking-[0.08em] font-semibold mb-[2px]">Ministry Base</div>
                    <div className="text-[15px] text-white leading-[1.4]">
                      ICGC NewLife Temple<br />
                      Oyibi – Mensah Bar<br />
                      Accra, Ghana
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative z-10">
                <div className="text-[10px] text-white/30 uppercase tracking-[0.1em] font-bold mb-[12px] border-t border-white/10 pt-[24px]">Connect on Social</div>
                <div className="flex gap-[10px]">
                  <a href="#" className="w-[38px] h-[38px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[18px] text-white/60 transition-colors hover:bg-lime hover:border-lime hover:text-black">
                    <i className="ph ph-facebook-logo"></i>
                  </a>
                  <a href="#" className="w-[38px] h-[38px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[18px] text-white/60 transition-colors hover:bg-lime hover:border-lime hover:text-black">
                    <i className="ph ph-instagram-logo"></i>
                  </a>
                  <a href="#" className="w-[38px] h-[38px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[18px] text-white/60 transition-colors hover:bg-lime hover:border-lime hover:text-black">
                    <i className="ph ph-linkedin-logo"></i>
                  </a>
                  <a href="#" className="w-[38px] h-[38px] rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[18px] text-white/60 transition-colors hover:bg-lime hover:border-lime hover:text-black">
                    <i className="ph ph-microphone-stage"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white border text-gray-900 border-g100 rounded-[16px] p-[32px] md:p-[42px] shadow-[0_12px_40px_rgba(0,0,0,0.04)]">
              <form className="space-y-[22px]">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px]">
                  <div>
                    <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">First Name *</label>
                    <input type="text" className="w-full bg-g50 border-[1.5px] border-g100 rounded-[8px] px-[14px] py-[10px] text-[14px] outline-none transition-colors focus:border-lime focus:bg-white" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">Last Name *</label>
                    <input type="text" className="w-full bg-g50 border-[1.5px] border-g100 rounded-[8px] px-[14px] py-[10px] text-[14px] outline-none transition-colors focus:border-lime focus:bg-white" placeholder="Doe" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-[22px]">
                  <div>
                    <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">Email Address *</label>
                    <input type="email" className="w-full bg-g50 border-[1.5px] border-g100 rounded-[8px] px-[14px] py-[10px] text-[14px] outline-none transition-colors focus:border-lime focus:bg-white" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">Phone Number</label>
                    <input type="tel" className="w-full bg-g50 border-[1.5px] border-g100 rounded-[8px] px-[14px] py-[10px] text-[14px] outline-none transition-colors focus:border-lime focus:bg-white" placeholder="+233 ..." />
                  </div>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">Purpose of Inquiry *</label>
                  <select className="w-full bg-g50 border-[1.5px] border-g100 rounded-[8px] px-[14px] py-[11px] text-[14px] outline-none cursor-pointer transition-colors focus:border-lime focus:bg-white text-g700 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2212%22%20height%3D%228%22%20viewBox%3D%220%200%2012%208%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M1.5%201.75L6%206.25L10.5%201.75%22%20stroke%3D%22%23666666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:calc(100%-14px)_center] pr-[36px]">
                    <option value="">Select a category...</option>
                    <option value="ministry">Ministry Invitation / Booking</option>
                    <option value="prayer">Prayer Request</option>
                    <option value="books">Bulk Book Order Inquiry</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">Organization / Church</label>
                  <input type="text" className="w-full bg-g50 border-[1.5px] border-g100 rounded-[8px] px-[14px] py-[10px] text-[14px] outline-none transition-colors focus:border-lime focus:bg-white" placeholder="Your Church or Company Name" />
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-g700 mb-[6px] tracking-[0.02em]">Message / Details *</label>
                  <textarea rows={5} className="w-full bg-g50 border-[1.5px] border-g100 rounded-[8px] px-[14px] py-[12px] text-[14px] outline-none transition-colors focus:border-lime focus:bg-white resize-y min-h-[120px]" placeholder="Please provide details about your request..."></textarea>
                </div>

                <div className="pt-[10px]">
                  <button type="button" className="w-full bg-black text-white text-[14px] font-bold py-[14px] rounded-[8px] cursor-pointer transition-colors duration-200 hover:bg-g900 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)] flex items-center justify-center gap-[8px]">
                    Send Message <i className="ph ph-paper-plane-right"></i>
                  </button>
                  <p className="text-[11px] text-center text-g500 mt-[12px]">Your information is secure. We typically respond within 48 hours for booking requests.</p>
                </div>
              </form>
            </div>
            
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
