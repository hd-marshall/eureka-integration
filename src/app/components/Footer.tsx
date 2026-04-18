"use client";

// components/Footer.tsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { brand } from '@/config/brand';

const Footer: React.FC = () => {
  const footerContent = {
    description: `${brand.name} — ${brand.tagline.toLowerCase()}. Built for the businesses that process, cut and supply material at scale.`,

    productLinks: [
      { href: '#portfolio', label: 'Our Specialisation' },
      { href: '#showcase', label: 'The Platform' },
      { href: '#white-label', label: 'White Label' },
      { href: '#services', label: 'Services' },
    ],

    generalLinks: [
      { href: '/', label: 'Home' },
      { href: '#contact', label: 'Contact' },
      { href: '#process', label: 'About' },
      // { href: '/client-login', label: 'Client Login' },
    ],

    socialLinks: [
      { href: 'https://github.com/', label: 'Github' },
      { href: 'https://linkedin.com/company/', label: 'Linkedin' },
      { href: 'https://twitter.com/', label: 'Twitter' }
    ],

    miscLinks: {
      documentation: { href: '/privacy-policy', label: 'PRIVACY POLICY' },
      privacy: { href: '/cookie-policy', label: 'COOKIE POLICY' },
    },
  };

  return (
    <footer className="bg-brand-navy text-gray-400 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4">
          {/* Tech Fusion Column */}
          <div className="border border-gray-400 p-6 flex flex-col items-center justify-center text-center space-y-6">
            <Image
              src="/images/logo/white-eureka-integration-logo.png"
              alt={`${brand.name} Logo`}
              width={0}
              height={0}
              sizes="60px"
              style={{ width: '60px', height: 'auto' }}
              className="object-contain"
            />
            <h2 className="font-nunito-sans text-white text-2xl font-light">{brand.name}</h2>
            <p className="font-nunito-sans text-sm leading-relaxed">{footerContent.description}</p>
          </div>

          {/* Right Section */}
          <div className="md:col-span-3 border border-gray-400 p-6 flex flex-col justify-between h-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Product Column */}
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-gray-500 text-sm font-medium mb-4 uppercase tracking-wider font-nunito-sans">
                    PRODUCT
                  </h3>
                  <ul className="space-y-3">
                    {footerContent.productLinks.map(({ href, label }) => (
                      <li key={href}>
                        <Link href={href} className="font-nunito-sans hover:text-brand-accent transition-colors">
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Documentation at bottom */}
                <div className="mt-12">
                  <Link
                    href={footerContent.miscLinks.documentation.href}
                    className="font-nunito-sans text-gray-500 hover:text-white transition-colors"
                  >
                    {footerContent.miscLinks.documentation.label}
                  </Link>
                </div>
              </div>

              {/* General Column */}
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="font-nunito-sans text-gray-500 text-sm font-medium mb-4 uppercase tracking-wider">
                    GENERAL
                  </h3>
                  <ul className="space-y-3">
                    {footerContent.generalLinks.map(({ href, label }) => (
                      <li key={href}>
                        <Link href={href} className="font-nunito-sans hover:text-brand-accent transition-colors">
                          {label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Privacy Policy at bottom */}
                <div className="mt-12">
                  <Link
                    href={footerContent.miscLinks.privacy.href}
                    className="font-nunito-sans text-gray-500 hover:text-white transition-colors"
                  >
                    {footerContent.miscLinks.privacy.label}
                  </Link>
                </div>
              </div>

              {/* Social Column */}
              <div>
                <h3 className="font-nunito-sans text-gray-500 text-sm font-medium mb-4 uppercase tracking-wider">
                  SOCIAL
                </h3>
                <ul className="space-y-3">
                  {footerContent.socialLinks.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-nunito-sans hover:text-brand-accent transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>        
        </div>
      </div>
      <div className='font-nunito-sans text-center pt-8'>            
        <p>© {new Date().getFullYear()} {brand.name}. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
