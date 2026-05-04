import { createClient } from '@/utils/supabase/server';
import SermonFilters from '@/components/SermonFilters';

export const metadata = {
  title: 'Sermons & Teachings | Rev. Ebenezer Ocran',
};

export default async function Sermons() {
  const supabase = await createClient();

  const { data: sermons } = await supabase
    .from('sermons')
    .select('*, sermon_series(name)')
    .eq('status', 'published')
    .order('display_order', { ascending: true })
    .order('created_at', { ascending: false });

  const { data: seriesList } = await supabase
    .from('sermon_series')
    .select('id, name')
    .order('display_order', { ascending: true });

  return (
    <div className="min-h-screen flex flex-col pt-[68px]">
      {/* Hero */}
      <div className="bg-dark pt-[48px] pb-[48px]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-[11px] font-bold text-lime tracking-[0.14em] uppercase mb-[10px]">
            Media Library
          </div>
          <h1 className="font-serif text-[44px] font-bold text-white leading-[1.1] mb-[10px]">
            Sermons & Teachings
          </h1>
          <p className="text-[15px] text-white/50 font-light max-w-[520px] leading-[1.65]">
            Stream and share life-changing messages. Every teaching archived for your growth in
            Christ.
          </p>
        </div>
      </div>

      {/* Interactive filters + grid */}
      <div className="flex-1">
        <SermonFilters sermons={sermons || []} seriesList={seriesList || []} />
      </div>

      {/* Newsletter */}
      <div className="bg-g50 py-[52px] border-t border-g100">
        <div className="max-w-[560px] mx-auto px-8 text-center">
          <h2 className="font-serif text-[24px] font-bold text-black mb-[7px]">
            Never Miss a Sermon
          </h2>
          <p className="text-[14px] text-g500 mb-[22px] font-light">
            Subscribe and get new messages and study notes delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-[9px]">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 p-[11px_15px] text-[14px] font-sans border-[1.5px] border-g100 rounded-[7px] outline-none text-black bg-white focus:border-lime"
            />
            <button className="px-[20px] py-[11px] text-[13.5px] font-bold bg-black text-white border-none rounded-[7px] whitespace-nowrap hover:bg-charcoal transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
