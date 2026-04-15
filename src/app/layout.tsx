// Root layout for the Next.js app
import type { Metadata } from "next";
import { getServerDeviceType } from "@/lib/serverDeviceDetection";

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
  title: "Eureka Integration | Consulting & Software Development",
  description: "Professional consulting and software development services. Trusted by clients for reliability and expertise.",
  keywords: ["consulting", "software development", "IT", "portfolio", "services", "Eureka Integration"],
};

export default async function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  // Get server-side device detection
  const serverDeviceType = await getServerDeviceType();

  return (
    <html lang="en" className={`${ebGaramond.variable} ${nunitoSans.variable}`}>
      <body className="bg-brand-background text-brand-navy min-h-screen flex flex-col">
        {/* Header with hybrid device detection */}
        <Navbar serverDeviceType={serverDeviceType} />
        
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