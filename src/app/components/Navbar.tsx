'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import { getClientDeviceType, type DeviceType } from '@/lib/clientDeviceDetection';

// Navigation data structure
const navigationData = {
  mainLinks: [
    { name: "Services", href: "/services", hasSubmenu: true },
    { name: "Work", href: "/portfolio", hasSubmenu: false },
    { name: "FAQs", href: "/faqs", hasSubmenu: false },
    { name: "Contact", href: "#contact", hasSubmenu: false }
  ],
  servicesSubmenu: {
    heading: "Our Services",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    description: "We provide comprehensive technology solutions tailored to your business needs. From strategic consulting to full-scale development, our expert team delivers results that drive growth and innovation.",
    links: [
      { name: "Consulting", href: "/services#consulting" },
      { name: "Development", href: "/services#development" },
      { name: "Strategy", href: "/services#strategy" },
      { name: "Support", href: "/services#support" }
    ]
  }
};

interface NavbarProps {
  serverDeviceType?: DeviceType;
}

export default function Navbar({ serverDeviceType }: NavbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  // Separate useEffect for resize and scroll listeners
  useEffect(() => {
    // Add resize listener for real-time responsiveness
    const handleResize = () => {
      const newDeviceType = getClientDeviceType();
      setCurrentDeviceType(newDeviceType);
      
      // Close menus when switching to desktop
      if (newDeviceType === 'desktop') {
        setIsMobileMenuOpen(false);
        setIsDropdownOpen(false);
      }
    };

    // Add scroll listener to close dropdown
    const handleScroll = () => {
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isDropdownOpen]);

  // Use server device type until hydrated to prevent layout shift
  const activeDeviceType = isHydrated ? currentDeviceType : (serverDeviceType || 'desktop');

  // Close dropdown when clicking anywhere
  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  if (activeDeviceType === "mobile") {
    return (
      <>
        <nav className="w-full flex items-center justify-between px-4 py-4 bg-brand-background relative z-50">
          {/* Logo */}
          <div className="flex items-center">
            <svg className="h-8 w-16 mr-2" viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="80" height="32" rx="8" fill="#4FC3F7" />
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="14" fill="#1A2341">LOGO</text>
            </svg>
          </div>
          {/* Hamburger menu icon */}
          <button 
            className="text-brand-blue focus:outline-none"
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
                      className="font-eb-garamond font-bold block text-brand-blue text-xl hover:text-brand-navy transition-colors relative inline-block group"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span className="relative">
                        {link.name}
                        <span className="absolute left-0 top-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full origin-left"></span>
                        <span className="absolute right-0 bottom-0 w-0 h-0.5 bg-brand-navy transition-all duration-300 group-hover:w-full origin-right"></span>
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
        <nav className="w-full flex items-center justify-between px-8 py-5 bg-brand-background relative z-50">
          {/* Logo */}
          <div className="flex items-center">
            <svg className="h-9 w-20 mr-3" viewBox="0 0 100 36" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="100" height="36" rx="8" fill="#4FC3F7" />
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="16" fill="#1A2341">LOGO</text>
            </svg>
          </div>
          {/* Hamburger menu icon */}
          <button 
            className="text-brand-blue focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle tablet menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </nav>
        
        {/* Tablet Menu Overlay - Horizontal layout */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-brand-background z-40 pt-20">
            <div className="px-8 py-12">
              <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
                {navigationData.mainLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => {
                      if (link.hasSubmenu) {
                        setIsDropdownOpen(!isDropdownOpen);
                        setIsMobileMenuOpen(false);
                      } else {
                        setIsMobileMenuOpen(false);
                      }
                    }}
                    className="font-eb-garamond font-bold block text-brand-blue text-lg text-center p-4 bg-brand-white rounded-lg hover:bg-brand-blue hover:text-brand-white transition-colors border border-brand-blue relative group"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute left-0 top-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full origin-left"></span>
                      <span className="absolute right-0 bottom-0 w-0 h-0.5 bg-brand-navy transition-all duration-300 group-hover:w-full origin-right"></span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Tablet Services Submenu */}
            {isDropdownOpen && (
              <div className="absolute top-0 left-0 w-full h-full bg-brand-background pt-20">
                <div className="px-8 py-12">
                  <div className="max-w-2xl mx-auto">
                    <h2 className="font-eb-garamond text-3xl font-bold text-brand-blue mb-6 text-center">
                      {navigationData.servicesSubmenu.heading}
                    </h2>
                    <p className="font-eb-garamond text-brand-navy text-lg mb-8 leading-relaxed text-center">
                      {navigationData.servicesSubmenu.description}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      {navigationData.servicesSubmenu.links.map((serviceLink) => (
                        <Link 
                          key={serviceLink.name}
                          href={serviceLink.href} 
                          className="font-eb-garamond font-bold block p-4 bg-brand-white rounded-lg hover:bg-brand-blue hover:text-brand-white transition-colors text-brand-blue border border-brand-blue text-center relative group"
                          onClick={handleDropdownClose}
                        >
                          <span className="font-semibold text-lg relative">
                            {serviceLink.name}
                            <span className="absolute left-0 top-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full origin-left"></span>
                            <span className="absolute right-0 bottom-0 w-0 h-0.5 bg-brand-navy transition-all duration-300 group-hover:w-full origin-right"></span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </>
    );
  }
  
  // Desktop nav (default)
  return (
    <>
      <nav className={`w-full flex items-center justify-between px-12 py-6 bg-brand-background relative z-50 transition-all duration-300 ${isDropdownOpen ? 'border-b-4 border-brand-blue shadow-lg' : ''}`}>
        {/* Logo */}
        <div className="flex items-center">
          <svg className="h-10 w-24 mr-4" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="120" height="40" rx="8" fill="#4FC3F7" />
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontFamily="Arial, Helvetica, sans-serif" fontSize="20" fill="#1A2341">LOGO</text>
          </svg>
        </div>
        <ul className="flex items-center space-x-10 text-lg text-brand-blue">
          {navigationData.mainLinks.map((link) => (
            <li key={link.name} className={link.hasSubmenu ? "relative group" : ""}>
              {link.hasSubmenu ? (
                <button 
                  className="font-eb-garamond font-bold focus:outline-none flex items-center gap-1 hover:text-brand-navy transition-colors text-brand-blue relative group"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  aria-label={`${link.name} menu`}
                >
                  <span className="relative">
                    {link.name}
                    <span className="absolute left-0 top-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full origin-left"></span>
                    <span className="absolute right-0 bottom-0 w-0 h-0.5 bg-brand-navy transition-all duration-300 group-hover:w-full origin-right"></span>
                  </span>
                  <svg 
                    className={`w-4 h-4 inline-block transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              ) : (
                <Link 
                  href={link.href} 
                  className="font-eb-garamond font-bold hover:text-brand-navy transition-colors text-brand-blue relative group"
                >
                  <span className="relative">
                    {link.name}
                    <span className="absolute left-0 top-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full origin-left"></span>
                    <span className="absolute right-0 bottom-0 w-0 h-0.5 bg-brand-navy transition-all duration-300 group-hover:w-full origin-right"></span>
                  </span>
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Full Screen Services Submenu with Animation */}
      <div className={`fixed left-0 w-full bg-brand-background z-40 overflow-hidden transition-all duration-500 ease-in-out border-b-4 border-brand-blue ${
        isDropdownOpen 
          ? 'top-24 opacity-100 translate-y-0 visible' 
          : 'top-0 opacity-0 -translate-y-full invisible'
      }`}>
        <div className="container mx-auto px-12 py-16">
          <div className="grid grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
            {/* Left side - Content */}
            <div className="transform transition-all duration-700 delay-200">
              <h2 className="font-eb-garamond text-4xl font-bold text-brand-blue mb-6">
                {navigationData.servicesSubmenu.heading}
              </h2>
              <p className="font-eb-garamond text-brand-navy text-lg mb-8 leading-relaxed">
                {navigationData.servicesSubmenu.description}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {navigationData.servicesSubmenu.links.map((serviceLink, index) => (
                  <Link 
                    key={serviceLink.name}
                    href={serviceLink.href} 
                    className={`font-eb-garamond font-bold block p-4 bg-brand-white rounded-lg hover:bg-brand-blue hover:text-brand-white transition-all duration-300 text-brand-blue border border-brand-blue transform relative group ${
                      isDropdownOpen 
                        ? 'translate-y-0 opacity-100' 
                        : 'translate-y-4 opacity-0'
                    }`}
                    style={{ transitionDelay: `${400 + index * 100}ms` }}
                    onClick={handleDropdownClose}
                  >
                    <span className="font-semibold text-lg relative">
                      {serviceLink.name}
                      <span className="absolute left-0 top-0 w-0 h-0.5 bg-brand-blue transition-all duration-300 group-hover:w-full origin-left"></span>
                      <span className="absolute right-0 bottom-0 w-0 h-0.5 bg-brand-navy transition-all duration-300 group-hover:w-full origin-right"></span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Right side - Image */}
            <div className={`transform transition-all duration-700 delay-300 ${
              isDropdownOpen 
                ? 'translate-x-0 opacity-100 scale-100' 
                : 'translate-x-8 opacity-0 scale-95'
            }`}>
              <img 
                src={navigationData.servicesSubmenu.image}
                alt="Our Services"
                className="w-full h-96 object-cover rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}