'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { getClientDeviceType, type DeviceType } from '@/lib/clientDeviceDetection';

// Navigation data structure
const navigationData = {
  mainLinks: [
    { name: "Services", href: "#services" },
    { name: "Work", href: "#portfolio" },
    { name: "Contact", href: "#contact" }
  ]
};

interface NavbarProps {
  serverDeviceType?: DeviceType;
}

export default function Navbar({ serverDeviceType }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentDeviceType, setCurrentDeviceType] = useState<DeviceType>(serverDeviceType || 'desktop');
  const [isHydrated, setIsHydrated] = useState(false);

  // Hybrid device detection - SSR + client-side responsiveness
  useEffect(() => {
    // Mark as hydrated
    setIsHydrated(true);
    
    // Get client-side device type
    const clientDevice = getClientDeviceType();
    
    // Update if different from server detection or no server detection
    if (!serverDeviceType || clientDevice !== serverDeviceType) {
      setCurrentDeviceType(clientDevice);
    }
  }, [serverDeviceType]);

  // Resize listener for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const newDeviceType = getClientDeviceType();
      setCurrentDeviceType(newDeviceType);
      
      // Close mobile menu when switching to desktop
      if (newDeviceType === 'desktop') {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Use server device type until hydrated to prevent layout shift
  const activeDeviceType = isHydrated ? currentDeviceType : (serverDeviceType || 'desktop');

  // Smooth scroll function
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // Extract the target ID from href (remove the # symbol)
    const targetId = href.replace('#', '');
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Custom smooth scrolling with slower speed
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1500; // 1.5 seconds for slower scroll
      let start: number | null = null;

      function animation(currentTime: number) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const progress = Math.min(timeElapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeInOutCubic = (t: number): number => {
          return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };
        
        window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));
        
        if (timeElapsed < duration) {
          requestAnimationFrame(animation);
        }
      }
      
      requestAnimationFrame(animation);
    }
    
    // Close mobile menu if open
    setIsMobileMenuOpen(false);
  };

  if (activeDeviceType === "mobile") {
    return (
      <>
        <nav className="w-full flex items-center justify-between px-4 py-4 relative z-50 sticky top-0 bg-brand-navy shadow-2xl">
          {/* Logo */}
          <div className="flex items-center">
            <svg className="h-8 w-16 mr-2" viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="80" height="32" rx="8" fill="#4FC3F7" />
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="14" fill="#1A2341">LOGO</text>
            </svg>
          </div>
          {/* Hamburger menu icon */}
          <button 
            className="focus:outline-none text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
        
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-brand-background z-40 pt-20">
            <div className="px-4 py-8">
              <ul className="space-y-6">
                {navigationData.mainLinks.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className="font-eb-garamond font-semibold block text-3xl transition-colors relative inline-block group text-brand-blue hover:text-brand-muted"
                      onClick={(e) => handleSmoothScroll(e, link.href)}
                    >
                      <span className="relative">
                        {link.name}
                        <span className="absolute left-0 top-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full origin-left bg-gradient-to-r from-brand-accent to-brand-navy"></span>
                        <span className="absolute right-0 bottom-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full origin-right bg-gradient-to-l from-brand-accent to-brand-navy"></span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </>
    );
  }
  
  if (activeDeviceType === "tablet") {
    return (
      <>
        <nav className="w-full flex items-center justify-between px-8 py-5 relative z-50 sticky top-0 bg-brand-navy shadow-2xl">
          {/* Logo */}
          <div className="flex items-center">
            <svg className="h-9 w-20 mr-3" viewBox="0 0 100 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="36" rx="8" fill="#4FC3F7" />
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="16" fill="#1A2341">LOGO</text>
            </svg>
          </div>
          {/* Hamburger menu icon */}
          <button 
            className="focus:outline-none text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle tablet menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
        
        {/* Tablet Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-brand-background z-40 pt-20">
            <div className="px-8 py-12">
              <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
                {navigationData.mainLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className="font-eb-garamond font-semibold block text-2xl text-center p-4 bg-brand-white rounded-lg transition-colors border text-brand-blue border-brand-blue hover:bg-brand-accent hover:text-brand-muted relative group"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute left-0 top-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full origin-left bg-gradient-to-r from-brand-accent to-brand-navy"></span>
                      <span className="absolute right-0 bottom-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full origin-right bg-gradient-to-l from-brand-accent to-brand-navy"></span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  
  // Desktop nav (default)
  return (
    <nav className="w-full flex items-center justify-between px-12 py-6 relative z-50 sticky top-0 bg-brand-navy shadow-2xl">
      {/* Logo */}
      <div className="flex items-center">
        <svg className="h-10 w-24 mr-4" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="120" height="40" rx="8" fill="#4FC3F7" />
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="20" fill="#1A2341">LOGO</text>
        </svg>
      </div>
      <ul className="flex items-center space-x-10 text-2xl">
        {navigationData.mainLinks.map((link) => (
          <li key={link.name}>
            <Link 
              href={link.href} 
              className="font-eb-garamond font-semibold transition-colors relative group text-white hover:text-white"
              onClick={(e) => handleSmoothScroll(e, link.href)}
            >
              <span className="relative">
                {link.name}
                <span className="absolute left-0 top-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full origin-left bg-gradient-to-r from-brand-accent to-white"></span>
                <span className="absolute right-0 bottom-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full origin-right bg-gradient-to-l from-brand-accent to-white"></span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}