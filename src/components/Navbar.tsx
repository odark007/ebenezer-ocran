'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/sermons', label: 'Sermons' },
    { href: '/books', label: 'Books' },
    { href: '/ministry', label: 'Ministry' },
    { href: '/contact', label: 'Contact' },
  ];

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-100 h-[68px] bg-[#0f0f0f]/95 border-b border-lime/30 md:bg-white/95 md:backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-7 h-full flex items-center justify-between gap-4">
        <Link href="/" className="flex-shrink-0 flex items-center gap-3 cursor-pointer" onClick={closeMobileMenu}>
          <img src="/logo.png" alt="Logo" className="h-[44px] rounded-md" />
          <div>
            <span className="font-serif text-[16px] font-bold text-white tracking-[0.01em] leading-none mb-[2px] block md:text-black">
              Rev. Ebenezer Ocran
            </span>
            <span className="text-[10px] font-medium text-white/65 tracking-[0.13em] uppercase mt-[2px] block md:text-g500">
              Pastor · Teacher · Author
            </span>
          </div>
        </Link>

        <button
          type="button"
          aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          className="md:hidden w-[42px] h-[42px] shrink-0 flex items-center justify-center"
        >
          {isMobileMenuOpen ? (
            <div className="relative w-5 h-5">
              <span className="absolute left-0 top-1/2 w-5 h-[2px] bg-lime -translate-y-1/2 rotate-45"></span>
              <span className="absolute left-0 top-1/2 w-5 h-[2px] bg-lime -translate-y-1/2 -rotate-45"></span>
            </div>
          ) : (
            <div className="flex flex-col items-end gap-[4px]">
              <span className="w-5 h-[2px] bg-white rounded-full"></span>
              <span className="w-5 h-[2px] bg-white rounded-full"></span>
              <span className="w-3.5 h-[2px] bg-white rounded-full"></span>
            </div>
          )}
        </button>

        <div className="hidden md:flex items-center gap-[2px]">
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

        <Link href="/contact" className="hidden md:inline-block text-[13px] font-semibold text-black bg-lime border-none px-[18px] py-[9px] rounded-md cursor-pointer transition-all duration-150 whitespace-nowrap hover:bg-lime-dk hover:-translate-y-[1px]">
          Book for Ministry
        </Link>

      </div>

      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-[#0f0f0f]/98 border-b border-lime/20 overflow-hidden transition-all duration-300 ease-out ${isMobileMenuOpen ? 'max-h-[420px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}`}
      >
        <div className="px-7 pt-2 pb-5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={`block w-full py-[14px] pl-3 pr-2 text-[14px] font-medium transition-colors ${isActive ? 'text-white border-l-2 border-lime bg-lime/10' : 'text-white/80 border-l-2 border-transparent hover:bg-white/5 hover:text-white'}`}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            href="/contact"
            onClick={closeMobileMenu}
            className="mt-4 block w-full text-center text-[14px] font-semibold text-black bg-lime px-4 py-[12px] rounded-md"
          >
            Book for Ministry
          </Link>
        </div>
      </div>
    </nav>
  );
}
