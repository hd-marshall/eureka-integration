'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Palette {
  name: string;
  industry: string;
  primary: string;
  accent: string;
  bg: string;
  muted: string;
}

const palettes: Palette[] = [
  {
    name: 'Mitchell Steel',
    industry: 'Steel Stockholder',
    primary: '#1E293B',
    accent: '#EA580C',
    bg: '#F9FAFB',
    muted: '#64748B',
  },
  {
    name: 'Greenway Timber',
    industry: 'Timber Merchant',
    primary: '#2D5016',
    accent: '#8B5E3C',
    bg: '#FAFAF7',
    muted: '#6B7C5A',
  },
  {
    name: 'ClearCut Glass',
    industry: 'Glass Processor',
    primary: '#0C4A6E',
    accent: '#0EA5E9',
    bg: '#F0F9FF',
    muted: '#0369A1',
  },
  {
    name: 'Apex Fabrication',
    industry: 'Metal Fabricator',
    primary: '#27272A',
    accent: '#EAB308',
    bg: '#FAFAFA',
    muted: '#71717A',
  },
  {
    name: 'Boardroom Panels',
    industry: 'Panel Supplier',
    primary: '#4C1D95',
    accent: '#7C3AED',
    bg: '#FAF5FF',
    muted: '#6D28D9',
  },
];

// ── Mini branded UI preview ───────────────────────────────────────────────────
const BrandPreview: React.FC<{ palette: Palette }> = ({ palette }) => (
  <div className="rounded-lg overflow-hidden border border-gray-200 shadow-xl font-nunito-sans">
    {/* Browser chrome */}
    <div className="bg-[#1e293b] px-3 py-2 flex items-center gap-2">
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]"/>
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]"/>
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]"/>
      </div>
      <div className="flex-1 bg-[#0f172a] rounded px-2 py-0.5 text-[9px] text-gray-500 text-center">
        app.{palette.name.toLowerCase().replace(/\s/g, '')}.co.uk
      </div>
    </div>

    {/* Navbar */}
    <div className="flex items-center justify-between px-4 py-2.5" style={{ backgroundColor: palette.primary }}>
      <span className="text-white text-xs font-bold tracking-wide">{palette.name}</span>
      <div className="flex items-center gap-3">
        {['Cutting', 'Orders', 'Account'].map(l => (
          <span key={l} className="text-[10px] font-medium" style={{ color: 'rgba(255,255,255,0.65)' }}>{l}</span>
        ))}
        <span
          className="text-[9px] font-bold px-2.5 py-1 rounded"
          style={{ backgroundColor: palette.accent, color: 'white' }}
        >
          New Job
        </span>
      </div>
    </div>

    {/* Page content */}
    <div className="p-4" style={{ backgroundColor: palette.bg }}>
      {/* Page title */}
      <div className="mb-3">
        <div className="text-[11px] font-bold mb-0.5" style={{ color: palette.primary }}>
          1D Linear Cut — New Job
        </div>
        <div className="text-[9px]" style={{ color: palette.muted }}>
          {palette.industry} Portal
        </div>
      </div>

      {/* Input row */}
      <div className="grid grid-cols-3 gap-2 mb-3">
        {[['Material', 'Steel Bar'], ['Stock Length', '6000mm'], ['Kerf', '3mm']].map(([l, v]) => (
          <div key={l}>
            <div className="text-[8px] mb-0.5 font-semibold uppercase tracking-wider" style={{ color: palette.muted }}>{l}</div>
            <div className="border rounded px-2 py-1 text-[9px] bg-white" style={{ borderColor: `${palette.primary}30`, color: palette.primary }}>
              {v}
            </div>
          </div>
        ))}
      </div>

      {/* Bar visualisation */}
      <svg viewBox="0 0 280 22" className="w-full mb-3">
        <rect x={0} y={0} width={280} height={22} fill={`${palette.primary}15`} stroke={palette.primary} strokeWidth={1} rx={2}/>
        <rect x={1} y={1} width={88} height={20} fill={palette.primary} rx={1} opacity={0.9}/>
        <rect x={91} y={1} width={68} height={20} fill={palette.accent} rx={1} opacity={0.9}/>
        <rect x={161} y={1} width={54} height={20} fill={palette.primary} rx={1} opacity={0.7}/>
        <rect x={217} y={1} width={42} height={20} fill={palette.accent} rx={1} opacity={0.7}/>
        <rect x={261} y={1} width={17} height={20} fill={`${palette.primary}20`} stroke={`${palette.muted}60`} strokeWidth={0.5} strokeDasharray="2 1.5" rx={1}/>
      </svg>

      {/* Results strip */}
      <div className="grid grid-cols-3 gap-2">
        {[['Bars Used', '1'], ['Cuts', '4'], ['Waste', '4.2%']].map(([l, v]) => (
          <div key={l} className="rounded p-2 text-center" style={{ backgroundColor: `${palette.primary}08`, border: `1px solid ${palette.primary}15` }}>
            <div className="text-xs font-bold" style={{ color: palette.accent }}>{v}</div>
            <div className="text-[8px]" style={{ color: palette.muted }}>{l}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <button
        className="w-full mt-3 py-1.5 rounded text-[10px] font-bold text-white"
        style={{ backgroundColor: palette.primary }}
      >
        Calculate & Add to Order
      </button>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const BrandShowcase: React.FC = () => {
  const [selected, setSelected] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const palette = palettes[selected];

  return (
    <section ref={sectionRef} className="w-full py-16 sm:py-24 bg-brand-background" id="white-label">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className={`mb-12 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <span className="text-xs font-nunito-sans font-semibold text-brand-accent uppercase tracking-widest block mb-3">
            White Label
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-nunito-sans font-semibold text-brand-navy leading-tight">
              Your brand, not ours.
            </h2>
            <div className="flex flex-col justify-center gap-4">
              <p className="text-base sm:text-lg font-nunito-sans text-brand-blue leading-relaxed">
                When we set up your platform we take your logo, your colours and your domain and build the whole product around them. Your clients sign up, log in and place orders thinking it is entirely yours. It is.
              </p>
              <p className="text-sm font-nunito-sans text-brand-blue leading-relaxed">
                We do not appear anywhere in the product. No powered-by badges, no our logo in the footer, nothing. Pick a colour scheme below to see how the same tool looks under a different brand.
              </p>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Left — palette picker */}
          <div className={`transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}>
            <p className="text-xs font-nunito-sans font-semibold text-brand-blue uppercase tracking-widest mb-4">
              Example client brands
            </p>
            <div className="flex flex-col gap-3">
              {palettes.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => setSelected(i)}
                  className={`flex items-center gap-4 p-4 border-l-2 text-left transition-all duration-200 cursor-pointer ${
                    selected === i
                      ? 'border-brand-accent bg-brand-navy/5'
                      : 'border-brand-navy/15 hover:border-brand-navy/40 hover:bg-brand-navy/5'
                  }`}
                >
                  {/* Swatches */}
                  <div className="flex gap-1.5 flex-shrink-0">
                    <div className="w-6 h-6 rounded-sm shadow-sm" style={{ backgroundColor: p.primary }}/>
                    <div className="w-6 h-6 rounded-sm shadow-sm" style={{ backgroundColor: p.accent }}/>
                    <div className="w-6 h-6 rounded-sm shadow-sm border border-gray-200" style={{ backgroundColor: p.bg }}/>
                  </div>
                  {/* Label */}
                  <div>
                    <div className={`text-sm font-nunito-sans font-semibold ${selected === i ? 'text-brand-navy' : 'text-brand-blue'}`}>
                      {p.name}
                    </div>
                    <div className="text-xs font-nunito-sans text-brand-blue/60">{p.industry}</div>
                  </div>
                  {/* Active indicator */}
                  {selected === i && (
                    <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-accent flex-shrink-0"/>
                  )}
                </button>
              ))}
            </div>

            {/* Three setup points */}
            <div className="mt-8 grid grid-cols-1 gap-4">
              {[
                ['Setup in under a week', 'Send us your logo, colours and domain. We handle the rest and hand it back ready to use.'],
                ['No trace of us anywhere', 'No powered-by footer, no our domain in the URL, no mention of Eureka Integration.'],
                ['You own the client relationship', 'Your clients pay you, contact you, and stay with you. We are infrastructure.'],
              ].map(([title, body]) => (
                <div key={title} className="flex gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-1.5 flex-shrink-0"/>
                  <div>
                    <div className="text-sm font-nunito-sans font-semibold text-brand-navy">{title}</div>
                    <div className="text-xs font-nunito-sans text-brand-blue leading-relaxed mt-0.5">{body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — live preview */}
          <div className={`transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: isVisible ? '350ms' : '0ms' }}>
            <p className="text-xs font-nunito-sans font-semibold text-brand-blue uppercase tracking-widest mb-4">
              Live preview — {palette.name}
            </p>
            <BrandPreview palette={palette} />
          </div>
        </div>

      </div>
    </section>
  );
};

export default BrandShowcase;
