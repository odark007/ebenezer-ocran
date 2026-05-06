import Link from 'next/link';
import Image from 'next/image';

interface BookProps {
  title: string;
  blurb?: string;
  slug?: string;
  cover_image_url?: string;
  // Legacy props kept for fallback
  color?: string;
  badge?: string;
  amazonUrl?: string;
  amazon_url?: string;
}

export default function BookCard({
  title, blurb, slug, cover_image_url, color, badge, amazonUrl, amazon_url,
}: BookProps) {
  const purchaseUrl = amazonUrl || amazon_url;

  return (
    <div className="cursor-pointer transition-transform duration-200 hover:-translate-y-1 group">
      {/* Cover */}
      <div
        className="rounded-lg overflow-hidden aspect-[9/16] flex flex-col justify-end px-4 py-5 relative shadow-[0_8px_28px_rgba(0,0,0,0.12)] mb-[14px]"
        style={
          cover_image_url
            ? undefined
            : { background: `linear-gradient(160deg, ${color || '#1a2d0a'} 0%, #111 100%)` }
        }
      >
        {cover_image_url && (
          <Image src={cover_image_url} alt={title} fill className="object-cover" />
        )}
        <div className="absolute left-0 top-0 bottom-0 w-[5px] bg-lime/40 z-10"></div>
        {badge && (
          <div className="absolute top-[10px] right-[10px] bg-lime text-black text-[9px] font-bold px-[7px] py-[3px] rounded-[3px] tracking-[0.08em] uppercase z-10">
            {badge}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent z-[5]"></div>
        <div className="font-serif text-[16px] font-bold text-white leading-[1.2] mb-[6px] relative z-10">{title}</div>
        <div className="text-[10px] text-white/45 font-normal tracking-[0.08em] uppercase relative z-10">Rev. Ebenezer Ocran</div>
      </div>

      {blurb && (
        <>
          <div className="font-serif text-[15.5px] font-semibold text-black leading-[1.3] mb-[6px]">{title}</div>
          <div className="text-[13px] text-g500 leading-[1.6] mb-[10px] font-light">{blurb}</div>
        </>
      )}

      {/* Action buttons */}
      <div className="flex gap-[7px] flex-wrap">
        {purchaseUrl && (
          <a
            href={purchaseUrl.startsWith('http') ? purchaseUrl : `https://${purchaseUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-[6px] text-[12.5px] font-semibold text-black bg-lime px-[16px] py-[8px] rounded-[6px] border-none cursor-pointer transition-colors hover:bg-lime-dk no-underline"
          >
            <span className="bg-[#ff9900] text-black rounded-sm px-[5px] py-[1px] text-[9px] font-extrabold">a</span>
            Buy on Amazon
          </a>
        )}
        {slug && (
          <Link
            href={`/books/${slug}`}
            className="inline-flex items-center gap-[6px] text-[12.5px] font-semibold text-g700 bg-g100 px-[16px] py-[8px] rounded-[6px] border-none cursor-pointer transition-colors hover:bg-g300 hover:text-black no-underline"
          >
            <i className="ph ph-info text-[14px]"></i> Learn More
          </Link>
        )}
      </div>
    </div>
  );
}
