"use client";
import React, { useEffect, useRef } from 'react';

interface ImageItem {
  src: string;
  alt: string;
}

interface MovingSlideShowProps {
  images: ImageItem[];
}

export default function MovingSlideShow({ images = [] }: MovingSlideShowProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !images.length) return;
    
    const section = sectionRef.current;
    const track = document.createElement('div');
    track.style.display = 'flex';
    track.style.gap = '1rem';
    
    // Create three sets of slides for smooth looping
    for (let i = 0; i < images.length * 3; i++) {
      const currentImage = images[i % images.length];
      
      const slide = document.createElement('div');
      slide.style.flex = '0 0 auto';
      slide.style.width = '180px';
      slide.style.height = '80px';
      
      const img = document.createElement('img');
      img.src = currentImage.src;
      img.style.width = '100%';
      img.style.height = '100%';
      img.style.objectFit = 'contain';
      img.alt = currentImage.alt || `Brand logo ${i % images.length + 1}`;
      
      slide.appendChild(img);
      track.appendChild(slide);
    }

    const container = document.createElement('div');
    container.style.width = '100%';
    container.style.overflow = 'hidden';
    container.appendChild(track);
    section.appendChild(container);

    let position = 0;
    const slideWidth = 220; // width + gap
    const singleSetWidth = slideWidth * images.length;

    function moveSlides() {
      position -= 2;
      // Check if we need to reset position
      if (position < -singleSetWidth - 50) {
        position += singleSetWidth;
      }
      track.style.transform = `translateX(${position}px)`;
    }

    // Run animation
    const interval = setInterval(moveSlides, 40);

    // Clean up on component unmount
    return () => {
      clearInterval(interval);
      if (section.contains(container)) {
        section.removeChild(container);
      }
    };
  }, [images]);

  return (
    <section className='bg-brand-background py-8'>
      {/* <h2 
        className="font-eb-garamond text-brand-navy text-3xl md:text-4xl lg:text-5xl text-center font-semibold mb-8"
        style={{
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        Developing with Modern and Trusted Tools
      </h2> */}
      <div ref={sectionRef} className="brands bg-brand-background"></div>
    </section>
  );
}