'use client';

import React, { useState, useEffect, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars sdjf 
const CartPanel: React.FC = () => (
  <div className="p-5 bg-gray-50 font-nunito-sans h-full">
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm font-bold text-[#002147]">Your Order</span>
      <span className="text-[10px] text-gray-400">3 items</span>
    </div>

    <div className="bg-white border border-gray-200 rounded mb-4">
      <div className="grid grid-cols-5 px-3 py-2 border-b border-gray-100 text-[9px] text-gray-400 uppercase tracking-wider">
        <span className="col-span-2">Item</span>
        <span>Size</span>
        <span>Qty</span>
        <span className="text-right">Price</span>
      </div>

      {[
        { type: '1D', label: 'Steel Bar', detail: '6000mm stock', size: '850mm cuts', qty: 4, price: '£33.60' },
        { type: '2D', label: 'MDF Sheet', detail: '2440×1220', size: '600×400mm', qty: 6, price: '£57.00' },
        { type: '1D', label: 'Aluminium', detail: '6000mm stock', size: '1200mm cuts', qty: 2, price: '£16.32' },
      ].map((item, i) => (
        <div key={i} className="grid grid-cols-5 px-3 py-3 border-b border-gray-50 items-center">
          <div className="col-span-2">
            <div className="flex items-center gap-2">
              <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${item.type === '1D' ? 'bg-blue-50 text-[#1976D2]' : 'bg-indigo-50 text-indigo-500'}`}>
                {item.type}
              </span>
              <div>
                <div className="text-[10px] font-semibold text-[#002147]">{item.label}</div>
                <div className="text-[9px] text-gray-400">{item.detail}</div>
              </div>
            </div>
          </div>
          <span className="text-[10px] text-gray-600">{item.size}</span>
          <div className="flex items-center gap-1">
            <button className="w-5 h-5 border border-gray-200 rounded text-[10px] text-gray-500 flex items-center justify-center">-</button>
            <span className="text-[10px] text-gray-700 w-4 text-center">{item.qty}</span>
            <button className="w-5 h-5 border border-gray-200 rounded text-[10px] text-gray-500 flex items-center justify-center">+</button>
          </div>
          <span className="text-[10px] font-semibold text-[#002147] text-right">{item.price}</span>
        </div>
      ))}

      <div className="px-3 py-2">
        <button className="text-[10px] text-[#1976D2] font-semibold flex items-center gap-1">
          <span className="text-base leading-none">+</span> Add another cut
        </button>
      </div>
    </div>

    <div className="bg-white border border-gray-200 rounded p-4">
      <div className="flex justify-between text-[10px] text-gray-500 mb-1.5">
        <span>Materials</span><span>£82.32</span>
      </div>
      <div className="flex justify-between text-[10px] text-gray-500 mb-1.5">
        <span>Cutting (14 cuts)</span><span>£24.50</span>
      </div>
      <div className="flex justify-between text-[10px] text-gray-500 mb-3 pb-3 border-b border-gray-100">
        <span>VAT (20%)</span><span>£21.36</span>
      </div>
      <div className="flex justify-between text-sm font-bold text-[#002147] mb-4">
        <span>Total</span><span>£128.18</span>
      </div>
      <button className="w-full bg-[#1976D2] text-white text-[10px] font-bold py-2.5 rounded tracking-wide">
        Place Order
      </button>
    </div>
  </div>
);

// ── Account UI ───────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const AccountPanel: React.FC = () => (
  <div className="p-5 bg-gray-50 font-nunito-sans h-full">
    <div className="flex items-center justify-between mb-5">
      <div>
        <div className="text-sm font-bold text-[#002147]">James Mitchell</div>
        <div className="text-[10px] text-gray-400">Mitchell Fabrication Ltd</div>
      </div>
      <span className="text-[9px] px-2 py-1 bg-blue-50 text-[#1976D2] font-semibold rounded">Trade Account</span>
    </div>

    <div className="grid grid-cols-3 gap-3 mb-5">
      {[['Orders','24'],['Saved Lists','7'],['Credit Left','£2,400']].map(([l, v]) => (
        <div key={l} className="bg-white border border-gray-200 rounded p-3 text-center">
          <div className="text-base font-bold text-[#1976D2]">{v}</div>
          <div className="text-[9px] text-gray-400 mt-0.5">{l}</div>
        </div>
      ))}
    </div>

    <div className="bg-white border border-gray-200 rounded mb-4">
      <div className="px-3 py-2 border-b border-gray-100 text-[9px] text-gray-400 uppercase tracking-wider font-semibold">
        Recent Orders
      </div>
      {[
        { ref: '#1042', date: '12 Apr', items: 'Steel Bar, MDF', total: '£128.18', status: 'Dispatched' },
        { ref: '#1039', date: '8 Apr',  items: 'Aluminium',      total: '£44.20',  status: 'Complete'  },
        { ref: '#1031', date: '1 Apr',  items: 'Float Glass',    total: '£212.00', status: 'Complete'  },
      ].map((o) => (
        <div key={o.ref} className="grid grid-cols-4 px-3 py-2.5 border-b border-gray-50 text-[10px] items-center">
          <span className="font-semibold text-[#002147]">{o.ref}</span>
          <span className="text-gray-400">{o.date}</span>
          <span className="text-gray-600 truncate">{o.items}</span>
          <div className="text-right">
            <div className="font-semibold text-[#002147]">{o.total}</div>
            <div className={`text-[8px] ${o.status === 'Dispatched' ? 'text-amber-500' : 'text-green-500'}`}>{o.status}</div>
          </div>
        </div>
      ))}
    </div>

    <div className="bg-white border border-gray-200 rounded p-3">
      <div className="text-[9px] text-gray-400 uppercase tracking-wider font-semibold mb-2">Account Details</div>
      <div className="grid grid-cols-2 gap-2 text-[10px]">
        {[['Email','james@mitchell-fab.co.uk'],['Phone','07891 234 567'],['Credit Terms','30 days'],['Delivery','Hatfield, AL10']].map(([l,v]) => (
          <div key={l}>
            <div className="text-gray-400">{l}</div>
            <div className="font-medium text-[#002147]">{v}</div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────────────────────
// FEATURES
// ─────────────────────────────────────────────────────────────────────────────

interface Feature {
  id: string;
  label: string;
  url: string;
  title: string;
  description: string;
  highlights: string[];
  content: React.ReactNode;
  icon: React.ReactNode;
}

const features: Feature[] = [
  {
    id: 'cutting-1d',
    label: '1D Linear Cutting',
    url: 'app.yourbrand.com/cutting/linear',
    title: 'Fit More, Cut Less, Price It Right',
    description: 'Put in your lengths, pick your stock size, and it works out exactly how many bars you need and how many cuts that means. Use the cut count to build your pricing.',
    highlights: [
      'Finds the best way to fit your required lengths across available stock with as little waste as possible',
      'Returns the total cuts per bar so you can charge accurately for machine time and operator cost',
      'Kerf width is built in on every cut so your pieces come out the right size',
    ],
    content: (
      <img
        src="/images/website-showcase/1d-stock-cutting.webp"
        alt="1D linear stock cutting"
        className="w-full h-full object-cover object-top"
      />
    ),
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5"/>
      </svg>
    ),
  },
  {
    id: 'cutting-2d',
    label: '2D Sheet Cutting',
    url: 'app.yourbrand.com/cutting/sheet',
    title: 'Know Your Sheets, Know Your Price',
    description: 'Add your piece sizes and the software figures out how they fit across your sheets. You get a clear layout, a sheet count, and the number of cuts needed to price the job properly.',
    highlights: [
      'Calculates the fewest sheets needed to get all your pieces out',
      'Cut count per sheet makes pricing machine time and labour straightforward',
      'Grain direction, edge clearance and kerf are all handled',
    ],
    content: (
      <img
        src="/images/website-showcase/2d-stock-cutting.webp"
        alt="2D sheet cutting"
        className="w-full h-full object-cover object-top"
      />
    ),
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5"/>
      </svg>
    ),
  },
  {
    id: 'cart',
    label: 'Cart',
    url: 'app.yourbrand.com/cart',
    title: 'Cart That Keeps Up With Changes',
    description: 'Customers can mix 1D and 2D cuts in the same order, adjust quantities, swap sizes, and the total updates straight away. No confusion at checkout.',
    highlights: [
      '1D and 2D cuts sit in the same order so customers are not splitting jobs across forms',
      'Change a quantity or length and the price recalculates on the spot',
      'Cut count is shown in the order summary so customers understand exactly what they are paying for',
    ],
    content: (
      <img
        src="/images/website-showcase/cart-dynamic-pricing.webp"
        alt="Cart with dynamic pricing"
        className="w-full h-full object-cover object-top"
      />
    ),
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
      </svg>
    ),
  },
  {
    id: 'orders',
    label: 'Order Management',
    url: 'admin.yourbrand.com/orders',
    title: 'Orders Come In, Plans Go Out',
    description: 'Every order lands in one view with the cut plan attached. You can see what came in, what it needs, and where it is in the process.',
    highlights: [
      'Full order history per customer with the cut sheet attached to each job',
      'Status moves from payment through to dispatch and customers get notified at each step',
      'Filter by date, material or customer to find any order quickly',
    ],
    content: (
      <img
        src="/images/website-showcase/orders-admin-dash.webp"
        alt="Order management"
        className="w-full h-full object-cover object-top"
      />
    ),
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"/>
      </svg>
    ),
  },
  {
    id: 'products',
    label: 'Products & Pricing',
    url: 'admin.yourbrand.com/products',
    title: 'Your Catalogue, Your Prices',
    description: 'You set up the materials, you set the prices. Customers see what you want them to see, priced exactly how you charge for it.',
    highlights: [
      'Price by metre, sheet, unit or any combination you need',
      'Stock levels update as orders come in so you know what you have left',
      'Changes go live on the customer side straight away with no rebuild needed',
    ],
    content: (
      <img
        src="/images/website-showcase/products-admin-dash.webp"
        alt="Products and pricing"
        className="w-full h-full object-cover object-top"
      />
    ),
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"/>
      </svg>
    ),
  },
  {
    id: 'admin',
    label: 'Admin Dashboard',
    url: 'admin.yourbrand.com/dashboard',
    title: 'Everything in One Place',
    description: 'Revenue, open orders, stock levels and platform activity all on one screen. No digging around to find out what is going on.',
    highlights: [
      "Today's orders, revenue and stock alerts are all at the top so nothing gets missed",
      'Jump straight into any order, product or customer record from the dashboard',
      'Staff get their own login with access only to the parts they need',
    ],
    content: (
      <img
        src="/images/website-showcase/admin-dash.webp"
        alt="Admin dashboard"
        className="w-full h-full object-cover object-top"
      />
    ),
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"/>
      </svg>
    ),
  },
  {
    id: 'accounts',
    label: 'Account Management',
    url: 'app.yourbrand.com/account',
    title: 'Accounts for Every Customer',
    description: 'Customers log in and see their full order history, saved cut lists and account details. You can manage accounts from the admin side and set credit terms for trade customers.',
    highlights: [
      'Customers can view past orders and reorder from their account without starting from scratch',
      'You can create trade accounts manually and set credit limits and payment terms per customer',
      'Delivery addresses, contact details and email preferences are all managed through the account',
    ],
    content: (
      <img
        src="/images/website-showcase/account-login.webp"
        alt="Account login and management"
        className="w-full h-full object-cover object-top"
      />
    ),
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>
      </svg>
    ),
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

const ProductShowcase: React.FC = () => {
  const [active, setActive]       = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setIsVisible(true); observer.disconnect(); }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const current = features[active];

  return (
    <section ref={sectionRef} className="w-full py-16 sm:py-24 bg-brand-navy" id="showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className={`text-center mb-10 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-nunito-sans font-semibold text-brand-white mb-4">
            See it in Action
          </h2>
          <p className="text-base sm:text-lg font-nunito-sans text-brand-background max-w-2xl mx-auto">
            Everything your clients need to cut, order and manage materials, all running under your brand.
          </p>
        </div>

        {/* Mobile tab strip */}
        <div className={`flex lg:hidden overflow-x-auto scrollbar-hide gap-2 mb-6 pb-1 transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`} style={{ transitionDelay: isVisible ? '150ms' : '0ms' }}>
          {features.map((f, i) => (
            <button
              key={f.id}
              onClick={() => setActive(i)}
              className={`flex-none flex items-center gap-2 px-3 py-2 text-[10px] font-nunito-sans font-semibold uppercase tracking-wider transition-all duration-200 whitespace-nowrap cursor-pointer ${
                active === i
                  ? 'bg-brand-accent text-white'
                  : 'bg-brand-blue/40 text-brand-background hover:bg-brand-blue hover:text-white'
              }`}
            >
              {f.icon}
              {f.label}
            </button>
          ))}
        </div>

        {/* Desktop: sidebar + frame */}
        <div className={`flex gap-6 xl:gap-10 transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: isVisible ? '250ms' : '0ms' }}>

          {/* Sidebar — all titles visible at once */}
          <div className="hidden lg:flex flex-col w-52 xl:w-60 flex-shrink-0 pt-10">
            <p className="text-[9px] font-nunito-sans font-semibold text-brand-accent uppercase tracking-widest mb-3 px-4">
              All Features
            </p>
            {features.map((f, i) => (
              <button
                key={f.id}
                onClick={() => setActive(i)}
                className={`group flex items-start gap-3 text-left py-3.5 px-4 border-l-2 transition-all duration-200 cursor-pointer ${
                  active === i
                    ? 'border-brand-accent bg-white/5'
                    : 'border-brand-blue/30 hover:border-brand-blue/60 hover:bg-white/5'
                }`}
              >
                <span className={`text-[10px] font-nunito-sans font-bold mt-0.5 flex-shrink-0 ${
                  active === i ? 'text-brand-accent' : 'text-brand-blue/50 group-hover:text-brand-blue'
                }`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={`text-xs font-nunito-sans font-semibold leading-snug ${
                  active === i ? 'text-brand-white' : 'text-brand-background/60 group-hover:text-brand-background'
                }`}>
                  {f.label}
                </span>
              </button>
            ))}
          </div>

          {/* Main: browser frame + description */}
          <div className="flex-1 min-w-0">
            {/* Browser chrome */}
            <div className="rounded-t-lg overflow-hidden border border-brand-blue/30 border-b-0">
              <div className="bg-[#1e293b] px-4 py-3 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]"/>
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]"/>
                  <div className="w-3 h-3 rounded-full bg-[#28c840]"/>
                </div>
                <div className="flex-1 bg-[#0f172a] rounded px-3 py-1 text-xs text-gray-400 font-nunito-sans max-w-sm mx-auto text-center">
                  {current.url}
                </div>
                <div className="flex gap-2 opacity-30">
                  <div className="w-4 h-4 rounded-sm bg-gray-500"/>
                  <div className="w-4 h-4 rounded-sm bg-gray-500"/>
                </div>
              </div>
            </div>

            {/* Content area */}
            <div className="border border-brand-blue/30 border-t-0 rounded-b-lg overflow-hidden bg-white min-h-[360px]">
              {current.content}
            </div>

            {/* Description + highlights */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <h3 className="text-lg font-nunito-sans font-bold text-brand-white mb-2">{current.title}</h3>
                <p className="text-sm font-nunito-sans text-brand-background leading-relaxed">{current.description}</p>
              </div>
              <div className="sm:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {current.highlights.map((h, i) => (
                  <div key={i} className="flex gap-2.5 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-1.5 flex-shrink-0"/>
                    <p className="text-xs font-nunito-sans text-brand-background leading-relaxed">{h}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductShowcase;
