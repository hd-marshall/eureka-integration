"use client";
import React, { useRef, useState, useEffect } from 'react';

interface ProcessStep {
  step: string;
  title: string;
  subtitle: string;
  description: string[];
}

const SoftwareDevelopmentProcess: React.FC = (): React.JSX.Element => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [currentCard, setCurrentCard] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const processSteps: ProcessStep[] = [
    {
      step: "I",
      title: "Initial Consultation",
      subtitle: "DISCOVERY & PLANNING",
      description: [
        "Comprehensive discovery session to understand your business requirements",
        "Technical needs assessment and project goal definition",
        "Complete alignment with your vision"
      ]
    },
    {
      step: "II", 
      title: "Proposal & Agreement",
      subtitle: "PROJECT PROPOSAL",
      description: [
        "Detailed project proposal with technical specifications",
        "Partnership formalisation with clear deliverables",
        "Milestone mapping and project roadmap"
      ]
    },
    {
      step: "III",
      title: "Development & Delivery",
      subtitle: "BUILD & DEPLOY",
      description: [
        "Expert development using industry best practices",
        "Regular progress updates and milestone reviews",
        "Quality assurance and timeline adherence"
      ]
    },
    {
      step: "IV",
      title: "Support & Maintenance",
      subtitle: "ONGOING SUPPORT",
      description: [
        "Performance monitoring and security updates",
        "Feature enhancements and system optimisation",
        "Ongoing maintenance for security and business alignment"
      ]
    }
  ];

  // Intersection Observer for triggering animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
        rootMargin: '-50px 0px' // Add some margin before triggering
      }
    );

    const node = sectionRef.current;
    if (node) observer.observe(node);
    return () => { if (node) observer.unobserve(node); };
  }, []);

  const scrollToCard = (cardIndex: number) => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.scrollWidth / processSteps.length;
      scrollRef.current.scrollTo({ left: cardIndex * cardWidth, behavior: 'smooth' });
      setCurrentCard(cardIndex);
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const cardWidth = scrollRef.current.scrollWidth / processSteps.length;
      const scrollLeft = scrollRef.current.scrollLeft;
      const newCardIndex = Math.round(scrollLeft / cardWidth);
      setCurrentCard(newCardIndex);
    }
  };

  return (
    <section ref={sectionRef} className="bg-brand-navy py-16 px-6 flex items-center mt-4" id="process">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="font-nunito-sans text-3xl md:text-4xl lg:text-5xl font-semibold text-white">
            Our Process
          </h2>
        </div>
        
        {/* Desktop Layout - Four Column Cards with Animation */}
        <div className="hidden md:block overflow-hidden">
          <div className="grid grid-cols-4 gap-6 max-w-7xl mx-auto">
            {processSteps.map((process: ProcessStep, index: number) => (
              <div 
                key={index} 
                className="bg-white p-6 relative min-h-[400px] shadow-sm transform transition-all duration-1000 ease-out"
                style={{
                  transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: `${index * 200}ms`
                }}
              >
                {/* Vertical accent line on left */}
                <div className="absolute left-0 top-0 w-1 h-full bg-brand-accent"></div>
                
                {/* Title */}
                <h2 className="text-xl font-bold text-black mb-8 tracking-wide font-nunito-sans">
                  {process.title}
                </h2>
                
                {/* Subtitle */}
                <h3 className="text-xs font-bold text-black mb-6 tracking-wide opacity-80 font-nunito-sans">
                  {process.subtitle}
                </h3>
                
                {/* Description - Square Bullet Points */}
                <ul className="space-y-2 mb-12">
                  {process.description.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start">
                      <span className="w-2 h-2 bg-brand-accent mt-1.5 mr-3 flex-shrink-0"></span>
                      <span className="text-gray-700 leading-relaxed text-sm font-nunito-sans">{point}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Large Roman Numeral at bottom */}
                <div className="absolute bottom-6 left-6 text-5xl font-light text-black font-nunito-sans">
                  {process.step}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Layout - Enhanced with Navigation */}
        <div className="md:hidden relative">

          {/* Scrollable Cards Container */}
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scroll-smooth"
            onScroll={handleScroll}
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none'
            }}
          >
            {processSteps.map((process: ProcessStep, index: number) => (
              <div key={index} className="flex-none w-[85vw] bg-white p-6 relative min-h-[350px] shadow-sm snap-center">
                {/* Vertical accent line on left */}
                <div className="absolute left-0 top-0 w-1 h-full bg-brand-accent"></div>
                
                {/* Title */}
                <h2 className="text-lg font-bold text-black mb-6 tracking-wide font-nunito-sans">
                  {process.title}
                </h2>
                
                {/* Subtitle */}
                <h3 className="text-xs font-bold text-black mb-4 tracking-wide opacity-80">
                  {process.subtitle}
                </h3>
                
                {/* Description - Square Bullet Points */}
                <ul className="space-y-2 mb-10">
                  {process.description.map((point, pointIndex) => (
                    <li key={pointIndex} className="flex items-start">
                      <span className="w-2 h-2 bg-brand-accent mt-1 mr-2 flex-shrink-0"></span>
                      <span className="text-gray-700 leading-relaxed text-sm">{point}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Large Roman Numeral at bottom */}
                <div className="absolute bottom-4 left-6 text-4xl font-light text-black font-nunito-sans">
                  {process.step}
                </div>
              </div>
            ))}
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {processSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToCard(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentCard === index 
                    ? 'bg-brand-accent w-8' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Hide scrollbar with CSS */}
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};

export default SoftwareDevelopmentProcess;