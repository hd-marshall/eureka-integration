'use client';

import React, { useEffect, useRef, useState } from 'react';

// ── 2D Sheet Optimisation SVG ────────────────────────────────────────────────
const Sheet2D: React.FC = () => {
  // Pieces tile a 300×200 sheet with ~6.7% waste (bottom-right corner)
  const pieces = [
    // col 1 — x=4, w=90
    { x: 4,   y: 4,   w: 90, h: 58,  shade: 0 },
    { x: 4,   y: 66,  w: 90, h: 40,  shade: 1 },
    { x: 4,   y: 110, w: 90, h: 86,  shade: 2 },
    // col 2 — x=98, w=68
    { x: 98,  y: 4,   w: 68, h: 93,  shade: 1 },
    { x: 98,  y: 101, w: 68, h: 95,  shade: 0 },
    // col 3 — x=170, w=62
    { x: 170, y: 4,   w: 62, h: 53,  shade: 2 },
    { x: 170, y: 61,  w: 62, h: 135, shade: 0 },
    // col 4 — x=236, w=60
    { x: 236, y: 4,   w: 60, h: 78,  shade: 1 },
    { x: 236, y: 86,  w: 60, h: 50,  shade: 2 },
    // waste — bottom-right
  ];
  const fills = ['#002147', '#1976D2', '#334771'];

  return (
    <svg viewBox="0 0 300 200" className="w-full h-full" aria-label="2D sheet cutting layout">
      {/* Sheet — background colour = waste area */}
      <rect x={0} y={0} width={300} height={200} fill="#C4BDB9" stroke="#002147" strokeWidth={2} rx={2} />
      {/* Optimised cut pieces */}
      {pieces.map((p, i) => (
        <rect
          key={i} x={p.x} y={p.y} width={p.w} height={p.h}
          fill={fills[p.shade]} opacity={0.9} rx={1}
        />
      ))}
      {/* Waste indicator */}
      <rect x={236} y={140} width={60} height={56} fill="#C4BDB9"
        stroke="#334771" strokeWidth={1} strokeDasharray="3 2" rx={1} />
      <text x={266} y={161} textAnchor="middle" fontSize={7} fill="#334771" fontWeight="700">WASTE</text>
      <text x={266} y={176} textAnchor="middle" fontSize={12} fill="#1976D2" fontWeight="800">6.7%</text>
    </svg>
  );
};

// ── 1D Linear Optimisation SVG ───────────────────────────────────────────────
interface BarSegment { w: number; label: string; }

const Bar1D: React.FC = () => {
  const fills = ['#002147', '#1976D2', '#334771', '#002147', '#1976D2'];
  const barH = 38;
  const gap  = 18;

  const bars: BarSegment[][] = [
    [
      { w: 82, label: '850mm'  },
      { w: 68, label: '700mm'  },
      { w: 56, label: '580mm'  },
      { w: 52, label: '540mm'  },
      { w: 34, label: '330mm'  },
    ],
    [
      { w: 98, label: '980mm'  },
      { w: 74, label: '740mm'  },
      { w: 62, label: '620mm'  },
      { w: 58, label: '580mm'  },
    ],
    [
      { w: 105, label: '1050mm' },
      { w: 85,  label: '850mm'  },
      { w: 98,  label: '950mm'  },
    ],
  ];

  return (
    <svg viewBox="0 0 310 152" className="w-full h-full" aria-label="1D linear bar cutting layout">
      {bars.map((bar, bi) => {
        let x = 7;
        const y = bi * (barH + gap) + 6;
        return (
          <g key={bi}>
            {/* Bar outline — full stock length */}
            <rect x={7} y={y} width={296} height={barH}
              fill="#C4BDB9" stroke="#002147" strokeWidth={1.5} rx={3} />
            {bar.map((seg, ci) => {
              const segX = x;
              const segW = seg.w - 2;
              const node = (
                <g key={ci}>
                  <rect
                    x={segX} y={y + 2} width={segW} height={barH - 4}
                    fill={fills[ci % fills.length]}
                    rx={2} opacity={0.9}
                  />
                  {seg.w > 28 && (
                    <text
                      x={segX + segW / 2} y={y + barH / 2 + 4}
                      textAnchor="middle"
                      fontSize={seg.w < 45 ? 7 : 8}
                      fill="white" fontWeight="700"
                    >
                      {seg.label}
                    </text>
                  )}
                </g>
              );
              x += seg.w;
              return node;
            })}
          </g>
        );
      })}
    </svg>
  );
};

// ── Main component ───────────────────────────────────────────────────────────
const GalleryShowcase: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '50px 0px -50px 0px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: 'Up to 94%',   label: 'Material utilisation' },
    { value: '1D + 2D',     label: 'Cutting modes' },
    { value: 'White-label', label: 'Your brand, your product' },
    { value: 'Instant',     label: 'Cut plan generation' },
  ];

  const bottomFeatures = [
    {
      title: 'White Label Ready',
      description: 'Delivered under your brand. Custom logo, domain, and colours — your clients never see our name.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="#1976D2" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      ),
    },
    {
      title: 'Instant Calculation',
      description: 'Cut plans generated in milliseconds, even for thousands of parts. No waiting, no server delays.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="#1976D2" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
    },
    {
      title: 'Direct Customer Sales',
      description: 'Embed a customer-facing portal into your clients\' websites. End buyers enter their cut list and receive instant quotes — no sales rep required.',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="#1976D2" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section ref={sectionRef} className="w-full py-12 sm:py-16 bg-brand-navy" id="portfolio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className={`text-center mb-10 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-nunito-sans font-semibold text-brand-white mb-3 sm:mb-4">
            Precision Cutting Optimisation
          </h2>
          <p className="text-base sm:text-lg font-nunito-sans text-brand-background max-w-2xl mx-auto">
            White-label software that maximises material yield for your clients — delivered under your brand, built on our engine.
          </p>
        </div>

        {/* Stats strip */}
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: isVisible ? '100ms' : '0ms' }}>
          {stats.map((s, i) => (
            <div key={i} className="bg-brand-white border-l-2 border-brand-accent p-4 shadow-[var(--shadow-brand)]">
              <div className="text-xl sm:text-2xl font-nunito-sans font-semibold text-brand-accent">{s.value}</div>
              <div className="text-xs sm:text-sm font-nunito-sans text-brand-blue mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Main feature cards — horizontally scrollable on mobile */}
        <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 mb-2 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 lg:grid lg:grid-cols-2 lg:overflow-x-visible lg:pb-0">

          {/* 2D Card */}
          <div
            className={`flex-none w-[82vw] sm:w-[60vw] lg:w-auto bg-brand-white border-l-2 border-brand-accent shadow-2xl transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}
          >
            <div className="p-5 sm:p-6 pb-3">
              <span className="text-xs font-nunito-sans font-semibold text-brand-accent uppercase tracking-widest">
                Sheet Material
              </span>
              <h3 className="text-xl sm:text-2xl font-nunito-sans font-semibold text-brand-navy mt-1 mb-1">
                2D Sheet Optimisation
              </h3>
            </div>
            <div
              className={`px-5 sm:px-6 transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
              }`}
              style={{ aspectRatio: '3/2', transitionDelay: isVisible ? '450ms' : '0ms' }}
            >
              <Sheet2D />
            </div>
            <div className="p-5 sm:p-6 pt-4">
              <p className="text-sm sm:text-base font-nunito-sans text-brand-blue leading-relaxed">
                Maximise yield from flat sheet material — glass, timber panels, aluminium plate, MDF, and more. Our algorithm packs cut pieces with minimal waste, respecting grain direction, edge clearance, and kerf width.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Glass', 'Timber Panel', 'Aluminium Plate', 'MDF', 'Acrylic'].map(tag => (
                  <span key={tag} className="text-xs font-nunito-sans font-medium px-2 py-1 bg-brand-background text-brand-navy">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 1D Card */}
          <div
            className={`flex-none w-[82vw] sm:w-[60vw] lg:w-auto bg-brand-white border-l-2 border-brand-accent shadow-2xl transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: isVisible ? '300ms' : '0ms' }}
          >
            <div className="p-5 sm:p-6 pb-3">
              <span className="text-xs font-nunito-sans font-semibold text-brand-accent uppercase tracking-widest">
                Linear Stock
              </span>
              <h3 className="text-xl sm:text-2xl font-nunito-sans font-semibold text-brand-navy mt-1 mb-1">
                1D Linear Optimisation
              </h3>
            </div>
            <div
              className={`px-5 sm:px-6 transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
              }`}
              style={{ aspectRatio: '3/2', transitionDelay: isVisible ? '550ms' : '0ms' }}
            >
              <Bar1D />
            </div>
            <div className="p-5 sm:p-6 pt-4">
              <p className="text-sm sm:text-base font-nunito-sans text-brand-blue leading-relaxed">
                Optimise cuts from linear stock — steel bar, pipe, extrusions, timber lengths, and rebar. Supports multiple stock lengths simultaneously, with intelligent offcut reuse carried across jobs.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {['Steel Bar', 'Pipe', 'Extrusions', 'Timber', 'Rebar'].map(tag => (
                  <span key={tag} className="text-xs font-nunito-sans font-medium px-2 py-1 bg-brand-background text-brand-navy">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom feature strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {bottomFeatures.map((f, i) => (
            <div
              key={i}
              className={`bg-brand-blue border-l-2 border-brand-accent p-5 sm:p-6 shadow-2xl transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: isVisible ? `${400 + i * 100}ms` : '0ms' }}
            >
              <div className="mb-3">{f.icon}</div>
              <h3 className="text-lg font-nunito-sans font-semibold text-brand-white mb-2">{f.title}</h3>
              <p className="text-sm font-nunito-sans text-brand-background leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default GalleryShowcase;
