'use client';

import React, { useEffect, useRef } from 'react';

interface ParticleOrbProps {
  className?: string;
}

const ParticleOrb: React.FC<ParticleOrbProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create style element for dynamic keyframes
    const styleElement = document.createElement('style');
    styleElement.id = 'particle-orb-styles';
    
    // Remove existing styles if any
    const existingStyle = document.getElementById('particle-orb-styles');
    if (existingStyle) {
      existingStyle.remove();
    }

    // Generate CSS with keyframes
    let css = `
      .particle-orb-container {
        position: absolute;
        inset: 0;
        z-index: 1;
        width: 100%;
        height: 100%;
        background: transparent;
        overflow: hidden;
        pointer-events: none;
      }
      
      .orb-wrap {
        position: absolute;
        top: 42%;
        left: 75%;
        width: 0;
        height: 0;
        transform-style: preserve-3d;
        perspective: 1000px;
        animation: rotate 11.2s infinite linear;
        transform: translateX(-50%) translateY(-50%);
        transform-origin: center center;
      }
      
      @media (max-width: 767px) {
        .orb-wrap {
          top: 65%;
          left: 50%;
          transform: translateX(-50%) translateY(-50%) scale(0.35);
          transform-origin: center center;
        }
      }
      
      @media (min-width: 768px) and (max-width: 1023px) {
        .orb-wrap {
          transform: translateX(-50%) translateY(-50%) scale(0.45);
          transform-origin: center center;
        }
      }
      
      @keyframes rotate {
        0% {
          transform: translateX(-50%) translateY(-50%) rotateY(0deg);
        }
        100% {
          transform: translateX(-50%) translateY(-50%) rotateY(360deg);
        }
      }
      
      @media (max-width: 767px) {
        @keyframes rotate {
          0% {
            transform: translateX(-50%) translateY(-50%) scale(0.35) rotateY(0deg);
          }
          100% {
            transform: translateX(-50%) translateY(-50%) scale(0.35) rotateY(360deg);
          }
        }
      }
      
      @media (min-width: 768px) and (max-width: 1023px) {
        @keyframes rotate {
          0% {
            transform: translateX(-50%) translateY(-50%) scale(0.45) rotateY(0deg);
          }
          100% {
            transform: translateX(-50%) translateY(-50%) scale(0.45) rotateY(360deg);
          }
        }
      }
      
      .particle {
        position: absolute;
        width: 7px;
        height: 7px;
        opacity: 0;
        animation-duration: 11.2s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
      }
    `;

    // Generate keyframes and styles for each particle
    for (let i = 1; i <= 300; i++) {
      const z = Math.random() * 360;
      const y = Math.random() * 360;
      const colorIndex = Math.floor((i - 1) % 3);
      
      // Generate random size between 4px and 10px
      const particleSize = Math.floor(Math.random() * 7) + 4; // 4-10px range
      
      // Generate random shapes
      const shapes = [
        'border-radius: 50%;', // circle
        'border-radius: 0;', // square
        'border-radius: 2px;', // rounded square
        'border-radius: 50% 0 50% 0;', // leaf shape
        'clip-path: polygon(50% 0%, 0% 100%, 100% 100%);', // triangle
        'clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);', // octagon
        'transform: rotate(45deg); border-radius: 0;', // diamond
      ];
      
      const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
      
      let color;
      switch (colorIndex) {
        case 0:
          color = '#1e3a8a'; // brand-navy
          break;
        case 1:
          color = '#3b82f6'; // brand-blue
          break;
        case 2:
          color = '#64748b'; // brand-muted
          break;
        default:
          color = '#3b82f6';
      }

      css += `
        .particle:nth-child(${i}) {
          width: ${particleSize}px;
          height: ${particleSize}px;
          background-color: ${color};
          ${randomShape}
          animation-name: orbit${i};
          animation-delay: ${i * 0.006}s;
        }
        
        @keyframes orbit${i} {
          0% {
            transform: rotateZ(-${z}deg) rotateY(${y}deg) translateX(1200px) rotateZ(${z}deg);
            opacity: 0;
          }
          20% {
            transform: rotateZ(-${z}deg) rotateY(${y}deg) translateX(228px) rotateZ(${z}deg);
            opacity: 1;
          }
          70% {
            transform: rotateZ(-${z}deg) rotateY(${y}deg) translateX(228px) rotateZ(${z}deg);
            opacity: 1;
          }
          100% {
            opacity: 1;
          }
        }
      `;
    }

    styleElement.textContent = css;
    document.head.appendChild(styleElement);

    return () => {
      if (styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, []);

  // Generate particles
  const particles = Array.from({ length: 300 }, (_, i) => (
    <div key={i + 1} className="particle" />
  ));

  return (
    <div ref={containerRef} className={`particle-orb-container ${className}`}>
      <div className="orb-wrap">
        {particles}
      </div>
    </div>
  );
};

export default ParticleOrb;