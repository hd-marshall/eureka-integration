// Root layout for the Next.js app
import type { Metadata } from "next";
import { brand } from "@/config/brand";

import "./globals.css";
import localFont from 'next/font/local'

import Navbar from "./components/Navbar";
import Footer from "./components/Footer"

const ebGaramond = localFont({
  src: [
    {
      path: '../../public/fonts/EBGaramond-VariableFont_wght.ttf',
      weight: '400 800', // Variable font weight range
      style: 'normal',
    },
    {
      path: '../../public/fonts/EBGaramond-Italic-VariableFont_wght.ttf',
      weight: '400 800',
      style: 'italic',
    }
  ],
  variable: '--font-eb-garamond',
  display: 'swap',
})

const nunitoSans = localFont({
  src: [
    {
      path: '../../public/fonts/NunitoSans-VariableFont_YTLC,opsz,wdth,wght.ttf',
      weight: '400 800', // Variable font weight range
      style: 'normal',
    },
    {
      path: '../../public/fonts/NunitoSans-Italic-VariableFont_YTLC,opsz,wdth,wght.ttf',
      weight: '400 800',
      style: 'italic',
    }
  ],
  variable: '--font-nunito-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: `${brand.name} | ${brand.tagline}`,
  description: `${brand.name} — white-label cutting optimisation software for material processors, stockholders and fabricators.`,
  keywords: ['cutting optimisation', 'white label software', '1D cutting', '2D cutting', 'nesting software', brand.name],
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${ebGaramond.variable} ${nunitoSans.variable}`}>
      <body className="bg-brand-background text-brand-navy min-h-screen flex flex-col">
        <Navbar />
        
        {/* Main content area */}
        <main className="flex-1 w-full mx-auto py-8">
          {children}
        </main>
        
        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}