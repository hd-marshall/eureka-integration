'use client';

import React, { useState, useEffect, useRef } from 'react';

interface Service {
  id: number;
  title: string;
  emphasis: string;
  subtitle: string;
  chapter: string;
  page: string;
  description: string;
  leftImage: string;
  rightImage: string;
  buttonLabel: string;
}

const services: Service[] = [
  {
    id: 1,
    title: "Web",
    emphasis: "Development",
    subtitle: "Modern Digital Experiences.",
    chapter: "Frontend & Backend",
    page: "WEBSITES",
    description: "Craft beautiful, responsive websites that engage and convert. Using cutting-edge technologies like React, Next.js, and Vue, we build fast, SEO-friendly web applications that deliver exceptional user experiences across all browsers.",
    leftImage: "",
    rightImage: "",
    buttonLabel: "Web Dev"
  },
  {
    id: 2,
    title: "API",
    emphasis: "Development",
    subtitle: "Powerful Backend Solutions.",
    chapter: "REST & GraphQL",
    page: "APIS",
    description: "Build scalable, secure APIs that power your applications. Our expert team creates RESTful services and GraphQL endpoints that handle millions of requests with ease, ensuring your data flows seamlessly between systems.",
    leftImage: "",
    rightImage: "",
    buttonLabel: "API Dev"
  },
  // {
  //   id: 3,
  //   title: "Mobile",
  //   emphasis: "Development",
  //   subtitle: "Native & Cross-Platform Apps.",
  //   chapter: "iOS & Android",
  //   page: "APPS",
  //   description: "Create stunning mobile experiences that users love. From native iOS and Android apps to cross-platform solutions with React Native or Flutter, we deliver high-performance applications that work flawlessly across all devices.",
  //   leftImage: "",
  //   rightImage: "",
  //   buttonLabel: "Mobile Dev"
  // },
  {
    id: 4,
    title: "Digital",
    emphasis: "Marketing",
    subtitle: "Growth-Driven Strategies.",
    chapter: "SEO & PPC",
    page: "MARKETING",
    description: "Amplify your online presence with data-driven marketing strategies. From SEO optimization and content marketing to PPC campaigns and social media management, we help you reach your target audience and drive measurable results.",
    leftImage: "",
    rightImage: "",
    buttonLabel: "Digital Marketing"
  }
];

const ServicesSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setIsVisible(true);
            setHasAnimated(true);
          }
        });
      },
      { 
        threshold: 0.2,
        rootMargin: '-50px 0px'
      }
    );

    const node = containerRef.current;
    if (node) observer.observe(node);
    return () => { if (node) observer.unobserve(node); };
  }, [hasAnimated]);

  const handleServiceChange = (index: number) => {
    if (index !== currentSlide && !isAnimating) {
      setIsAnimating(true);
      setCurrentSlide(index);
      setTimeout(() => setIsAnimating(false), 800);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="w-full min-h-screen bg-brand-background flex flex-col items-center justify-center pt-8 pb-16 md:py-0"
      id='services'
    >
      <div className={`w-full max-w-7xl px-4 transition-all duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}>
        {/* Title with fade and slide animation */}
        <h2 className={`text-3xl md:text-4xl lg:text-5xl font-nunito-sans font-semibold text-brand-navy mb-6 md:mb-8 text-center transition-all duration-700 delay-100 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          Our Services
        </h2>

        
        {/* Service Navigation Buttons with staggered animation */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-10">
          {services.map((service, index) => (
            <button
              key={service.id}
              onClick={() => handleServiceChange(index)}
              className={`px-8 py-3 rounded-lg font-semibold text-xs md:text-sm transition-all cursor-pointer hover:-translate-y-0.5 font-nunito-sans ${
                currentSlide === index
                  ? 'bg-brand-navy text-white border-2 border-brand-navy'
                  : 'bg-transparent text-brand-navy border-2 border-brand-navy hover:bg-brand-accent hover:text-white'
              } ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-10 opacity-0'
              }`}
              style={{
                transitionDuration: '200ms',
              }}
            >
              {service.buttonLabel}
            </button>
          ))}
        </div>

        {/* Service Display with scale and fade animation */}
        <div className={`w-full h-[70vh] md:h-[65vh] relative overflow-hidden shadow-2xl transition-all duration-700 ${
          isVisible 
            ? 'scale-100 opacity-100' 
            : 'scale-95 opacity-0'
        }`}
        style={{ transitionDelay: isVisible ? '400ms' : '0ms' }}
        >
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`absolute inset-0 w-full h-full flex flex-col md:flex-row transition-opacity duration-800 ${
                currentSlide === index
                  ? 'opacity-100 z-10'
                  : 'opacity-0 z-0'
              }`}
            >
              {/* Left Side - Main Content */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden bg-brand-navy md:border-l-4 border-brand-accent">
                {/* Animated content */}
                <div className={`relative h-full flex flex-col justify-center px-8 md:px-16 pt-12 md:pt-16 text-brand-white transition-all duration-700 delay-150 ${
                  currentSlide === index && isVisible
                    ? 'translate-y-0 opacity-100' 
                    : '-translate-y-10 opacity-0'
                }`}>
                  <h2 className="text-4xl md:text-6xl font-nunito-sans font-light leading-tight">
                    {service.title} <span className="italic">{service.emphasis}</span>.
                    <br />
                    <span className="text-3xl md:text-4xl">{service.subtitle}</span>
                  </h2>
                  <p className="text-xs uppercase tracking-[0.1em] text-brand-background/80 mt-8 md:mt-auto mb-8 md:mb-16 font-nunito-sans">
                    {service.chapter}, {service.page}
                  </p>
                </div>
              </div>

              {/* Right Side - Description */}
              <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden rounded-b-lg md:rounded-r-lg md:rounded-bl-none bg-white">
                {/* Animated content */}
                <div className={`relative h-full flex items-center px-8 md:px-16 transition-all duration-700 delay-300 ${
                  currentSlide === index && isVisible
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-10 opacity-0'
                }`}>
                  <p className="text-brand-navy text-base md:text-lg leading-relaxed max-w-md font-nunito-sans font-light">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesSlider;