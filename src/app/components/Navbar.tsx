'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
const navLinks = [
  { name: 'About',    href: '#about'     },
  { name: 'Services', href: '#services'  },
  { name: 'Work',     href: '#portfolio' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.getElementById(href.replace('#', ''));
    if (el) {
      const start  = window.scrollY;
      const target = el.getBoundingClientRect().top + start;
      const dist   = target - start;
      const dur    = 1200;
      let t0: number | null = null;
      const step = (t: number) => {
        if (!t0) t0 = t;
        const p = Math.min((t - t0) / dur, 1);
        const ease = p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2;
        window.scrollTo(0, start + dist * ease);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
    setMenuOpen(false);
  };

  return (
    <nav className={`w-full sticky top-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-brand-navy/95 backdrop-blur-sm shadow-lg border-b border-brand-blue/30'
        : 'bg-brand-navy'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 sm:h-[4.5rem]">

          {/* Wordmark */}
          <Link
            href="/"
            className="font-nunito-sans text-brand-white text-xl sm:text-2xl font-semibold tracking-wide hover:text-brand-accent transition-colors duration-200 shrink-0"
          >
            Eureka Integration
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map(link => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => scrollTo(e, link.href)}
                className="font-nunito-sans text-xs font-semibold text-brand-white/70 hover:text-brand-white tracking-widest uppercase transition-colors duration-200 relative group"
              >
                {link.name}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brand-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <Link
              href="#contact"
              onClick={(e) => scrollTo(e, '#contact')}
              className="font-nunito-sans text-xs font-semibold px-5 py-2.5 bg-brand-accent text-white tracking-widest uppercase transition-all duration-200 hover:bg-brand-blue"
            >
              Get in Touch
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden text-brand-white p-1 -mr-1 cursor-pointer"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu — slide down */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        menuOpen ? 'max-h-80 border-t border-brand-blue/20' : 'max-h-0'
      }`}>
        <div className="px-4 sm:px-6 py-6 flex flex-col gap-5 bg-brand-navy">
          {navLinks.map(link => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              className="font-nunito-sans text-2xl text-brand-white hover:text-brand-accent pl-3 border-l-2 border-transparent hover:border-brand-accent transition-all duration-200"
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={(e) => scrollTo(e, '#contact')}
            className="font-nunito-sans text-xs font-semibold px-5 py-3 bg-brand-accent text-white tracking-widest uppercase text-center mt-1 hover:bg-brand-blue transition-all duration-200"
          >
            Get in Touch
          </Link>
        </div>
      </div>
    </nav>
  );
}
