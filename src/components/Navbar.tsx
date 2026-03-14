'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-100 h-[68px] bg-white/95 backdrop-blur-md border-b border-lime/30">
      <div className="max-w-[1200px] mx-auto px-7 h-full flex items-center justify-between gap-4">
        
        <Link href="/" className="flex-shrink-0 flex items-center gap-3 cursor-pointer">
          <img src="/logo.png" alt="Logo" className="h-[44px] rounded-md" />
          <div>
            <span className="font-serif text-[16px] font-bold text-black tracking-[0.01em] leading-none mb-[2px] block">
              Rev. Ebenezer Ocran
            </span>
            <span className="text-[10px] font-medium text-g500 tracking-[0.13em] uppercase mt-[2px] block">
              Pastor · Teacher · Author
            </span>
          </div>
        </Link>
        
        <div className="flex items-center gap-[2px]">
          <Link 
            href="/" 
            className={`font-sans text-[13px] px-[13px] py-[7px] rounded-md transition-all duration-150 border-none ${pathname === '/' ? 'text-black bg-lime font-semibold' : 'font-medium text-g700 hover:text-black hover:bg-lime-pale'}`}
          >
            Home
          </Link>
          <Link 
            href="/sermons" 
            className={`font-sans text-[13px] px-[13px] py-[7px] rounded-md transition-all duration-150 border-none ${pathname === '/sermons' ? 'text-black bg-lime font-semibold' : 'font-medium text-g700 hover:text-black hover:bg-lime-pale'}`}
          >
            Sermons
          </Link>
          <Link 
            href="/books" 
            className={`font-sans text-[13px] px-[13px] py-[7px] rounded-md transition-all duration-150 border-none ${pathname === '/books' ? 'text-black bg-lime font-semibold' : 'font-medium text-g700 hover:text-black hover:bg-lime-pale'}`}
          >
            Books
          </Link>
          <Link 
            href="/ministry" 
            className={`font-sans text-[13px] px-[13px] py-[7px] rounded-md transition-all duration-150 border-none ${pathname === '/ministry' ? 'text-black bg-lime font-semibold' : 'font-medium text-g700 hover:text-black hover:bg-lime-pale'}`}
          >
            Ministry
          </Link>
          <Link 
            href="/contact" 
            className={`font-sans text-[13px] px-[13px] py-[7px] rounded-md transition-all duration-150 border-none ${pathname === '/contact' ? 'text-black bg-lime font-semibold' : 'font-medium text-g700 hover:text-black hover:bg-lime-pale'}`}
          >
            Contact
          </Link>
        </div>
        
        <Link href="/contact" className="text-[13px] font-semibold text-black bg-lime border-none px-[18px] py-[9px] rounded-md cursor-pointer transition-all duration-150 whitespace-nowrap hover:bg-lime-dk hover:-translate-y-[1px]">
          Book for Ministry
        </Link>
        
      </div>
    </nav>
  );
}
