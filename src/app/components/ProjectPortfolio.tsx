'use client';

import React, { useState, useEffect, useRef } from 'react';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
  technologies: string[];
  link?: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Development",
    imageUrl: "https://via.placeholder.com/400x300/3b82f6/ffffff?text=E-Commerce",
    description: "A modern e-commerce solution with real-time inventory management, secure payment processing, and AI-powered product recommendations.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    link: "#"
  },
  {
    id: 2,
    title: "Mobile Banking App",
    category: "Mobile Development",
    imageUrl: "https://via.placeholder.com/400x300/10b981/ffffff?text=Banking+App",
    description: "Secure mobile banking application with biometric authentication, real-time transactions, and comprehensive financial analytics.",
    technologies: ["React Native", "TypeScript", "AWS", "Plaid API"],
    link: "#"
  },
  {
    id: 3,
    title: "Healthcare Portal",
    category: "Web Development",
    imageUrl: "https://via.placeholder.com/400x300/f59e0b/ffffff?text=Healthcare",
    description: "Patient management system with telemedicine capabilities, appointment scheduling, and electronic health records integration.",
    technologies: ["React", "Python", "MongoDB", "WebRTC"],
    link: "#"
  },
  {
    id: 4,
    title: "Logistics Dashboard",
    category: "API Development",
    imageUrl: "https://via.placeholder.com/400x300/ef4444/ffffff?text=Logistics",
    description: "Real-time tracking and analytics dashboard for supply chain management with predictive routing algorithms.",
    technologies: ["Vue.js", "GraphQL", "Redis", "Docker"],
    link: "#"
  },
  {
    id: 5,
    title: "Social Media Campaign",
    category: "Digital Marketing",
    imageUrl: "https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Marketing",
    description: "Comprehensive digital marketing campaign that increased brand engagement by 250% across multiple platforms.",
    technologies: ["Google Ads", "Meta Business", "Analytics", "A/B Testing"],
    link: "#"
  },
  {
    id: 6,
    title: "AI Content Generator",
    category: "API Development",
    imageUrl: "https://via.placeholder.com/400x300/6366f1/ffffff?text=AI+Platform",
    description: "AI-powered content generation platform with custom training models and multi-language support.",
    technologies: ["Python", "TensorFlow", "FastAPI", "PostgreSQL"],
    link: "#"
  }
];

const GalleryShowcase: React.FC = () => {
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
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
      {
        threshold: 0.1,
        rootMargin: '50px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCardClick = (id: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <section ref={sectionRef} className="w-full py-12 sm:py-16 bg-brand-background" id='portfolio'>
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        <div className={`text-center mb-8 sm:mb-10 md:mb-12 transition-all duration-1000 ease-out ${
          isVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-eb-garamond font-semibold text-brand-navy mb-3 sm:mb-4 px-4">
            Our Work
          </h2>
          <p className="text-base sm:text-lg font-nunito-sans text-brand-blue max-w-2xl mx-auto px-4">
            Explore our portfolio of successful projects across web, mobile, and digital marketing
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-4 sm:px-0">
          {galleryItems.map((item, index) => {
            const isFlipped = flippedCards.has(item.id);
            
            return (
              <div
                key={item.id}
                className={`relative h-[350px] sm:h-[400px] cursor-pointer transition-all duration-700 ease-out ${
                  isVisible 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-12 scale-95'
                }`}
                style={{ 
                  perspective: '1000px',
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
                }}
                onClick={() => handleCardClick(item.id)}
              >
                <div
                  className={`absolute inset-0 w-full h-full transition-transform duration-300 ${
                    isFlipped ? '' : ''
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                  onMouseEnter={(e) => {
                    if (!isFlipped) {
                      e.currentTarget.style.transform = 'rotateY(12deg)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isFlipped) {
                      e.currentTarget.style.transform = 'rotateY(0deg)';
                    } else {
                      e.currentTarget.style.transform = 'rotateY(180deg)';
                    }
                  }}
                >
                  {/* Front of card */}
                  <div 
                    className="absolute inset-0 w-full h-full overflow-hidden shadow-lg border-l-2 border-brand-accent"
                    style={{ backfaceVisibility: 'hidden' }}
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                      <span className="text-xs sm:text-sm font-medium font-nunito-sans text-brand-accent mb-1 sm:mb-2 block">
                        {item.category}
                      </span>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold font-eb-garamond mb-1 sm:mb-2 leading-tight">{item.title}</h3>
                      <p className="text-xs sm:text-sm font-nunito-sans opacity-90">Click to learn more</p>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div 
                    className="absolute inset-0 w-full h-full overflow-hidden shadow-lg bg-white border-l-2 border-brand-accent"
                    style={{ 
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)'
                    }}
                  >
                    <div className="p-4 sm:p-6 h-full flex flex-col">
                      <span className="text-xs sm:text-sm font-medium font-nunito-sans text-brand-accent mb-2">
                        {item.category}
                      </span>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold font-eb-garamond text-brand-navy mb-3 sm:mb-4 leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 font-nunito-sans mb-4 sm:mb-6 flex-grow text-sm sm:text-base leading-relaxed">
                        {item.description}
                      </p>
                      <div className="mb-4 sm:mb-6">
                        <h4 className="text-xs sm:text-sm font-semibold font-nunito-sans text-brand-navy mb-2">Technologies:</h4>
                        <div className="flex flex-wrap gap-1 sm:gap-2">
                          {item.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 sm:px-3 py-1 text-xs font-medium font-nunito-sans bg-brand-background text-brand-navy"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      {item.link && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(item.link, '_blank');
                          }}
                          className="w-full bg-brand-navy text-white px-4 py-2 sm:py-3 font-semibold font-nunito-sans hover:bg-brand-accent transition-colors duration-200 text-sm sm:text-base"
                        >
                          View Project
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default GalleryShowcase;