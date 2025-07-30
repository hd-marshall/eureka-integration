import Link from "next/link";
import { PageWrapper } from "./components/PageWrapper";

import ParticleAnimation from "./components/ui/ParticleAnimation"

import Hero from "./components/Hero";
import Services from "./components/Services"
import ProjectPortfolio from './components/ProjectPortfolio'
import BrandCarousel from "./components/BrandCarousel"
import OurProcess from "./components/OurProcess"
import ContactForm from "./components/ContactForm"
import FAQ from "./components/FAQ";

const brandImages = [
  { src: "/images/brand-carousel/aws-logo.webp", alt: "AWS Logo" },
  { src: "/images/brand-carousel/docker-logo.webp", alt: "Docker Logo" },
  { src: "/images/brand-carousel/github-logo.webp", alt: "GitHub Logo" },
  { src: "/images/brand-carousel/react-logo.webp", alt: "React Logo" },
  { src: "/images/brand-carousel/stripe-logo.webp", alt: "Stripe Logo" },
];

export default function Home() {
  return (
    <PageWrapper className="overflow-hidden">
      {/* Hero Section */}
      <Hero />

      {/* Services */}
      <Services />

      {/* Portfolio Showcase */}
      < ProjectPortfolio />

      {/* Using Trusted Brands */}
      <BrandCarousel images={brandImages}/>

      {/* Our Process */}
      <OurProcess />

      {/* Contact Form */}
      <ContactForm />

      {/* FAQ Section */}
      <FAQ />

    </PageWrapper>
  );
}
