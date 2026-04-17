'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { brand } from '@/config/brand';

const navLinks = brand.nav;

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while overlay is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

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
    <>
      <nav className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-brand-navy shadow-md'
          : 'bg-brand-background'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-[4.5rem]">

            {/* Wordmark */}
            <Link
              href="/"
              className={`font-nunito-sans text-xl sm:text-2xl font-semibold tracking-wide hover:text-brand-accent transition-colors duration-200 shrink-0 ${
                scrolled ? 'text-white' : 'text-brand-navy'
              }`}
            >
              {brand.name}
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8 lg:gap-10">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className={`font-nunito-sans text-xs font-semibold tracking-widest uppercase transition-colors duration-200 relative group ${
                    scrolled ? 'text-white/70 hover:text-white' : 'text-brand-navy/60 hover:text-brand-navy'
                  }`}
                >
                  {link.name}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brand-accent transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
              <Link
                href="#contact"
                onClick={(e) => scrollTo(e, '#contact')}
                className="font-nunito-sans text-xs font-semibold px-5 py-2.5 rounded-lg bg-brand-accent text-white tracking-widest uppercase transition-all duration-200 hover:bg-brand-blue"
              >
                Talk to our Team
              </Link>
            </div>

            {/* Hamburger — only shown when overlay is closed */}
            <button
              className={`md:hidden p-1 -mr-1 cursor-pointer ${scrolled ? 'text-white' : 'text-brand-navy'}`}
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-brand-background flex flex-col md:hidden transition-all duration-350 ease-out ${
          menuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-3 pointer-events-none'
        }`}
      >
        {/* Top bar — wordmark + close button */}
        <div className="flex items-center justify-between px-4 sm:px-6 h-16 sm:h-[4.5rem] border-b border-brand-navy/10 shrink-0">
          <span className="font-nunito-sans text-brand-navy text-xl sm:text-2xl font-semibold tracking-wide">
            {brand.name}
          </span>
          <button
            className="text-brand-navy p-2 -mr-2 cursor-pointer"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg
              className={`w-6 h-6 transition-transform duration-300 ${menuOpen ? 'rotate-0' : 'rotate-90'}`}
              fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Centred links — each staggered in */}
        <div className="flex flex-col items-center justify-center flex-1 gap-7 px-8 pb-16">
          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => scrollTo(e, link.href)}
              style={{ transitionDelay: menuOpen ? `${80 + i * 50}ms` : '0ms' }}
              className={`font-nunito-sans text-3xl font-semibold text-brand-navy hover:text-brand-accent transition-all duration-300 ${
                menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={(e) => scrollTo(e, '#contact')}
            style={{ transitionDelay: menuOpen ? `${80 + navLinks.length * 50}ms` : '0ms' }}
            className={`font-nunito-sans text-sm font-semibold px-8 py-3.5 rounded-lg bg-brand-accent text-white tracking-widest uppercase mt-2 hover:bg-brand-navy transition-all duration-300 w-full max-w-xs text-center ${
              menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            Talk to our Team
          </Link>
        </div>
      </div>
    </>
  );
}
