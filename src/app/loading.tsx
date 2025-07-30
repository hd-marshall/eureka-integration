// src/app/loading.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { getClientDeviceType, type DeviceType } from '@/lib/clientDeviceDetection';

export default function Loading(): React.JSX.Element {
  const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

  useEffect(() => {
    const updateDeviceType = () => {
      setDeviceType(getClientDeviceType());
    };

    // Set initial device type
    updateDeviceType();

    // Listen for window resize to update device type
    window.addEventListener('resize', updateDeviceType);

    return () => {
      window.removeEventListener('resize', updateDeviceType);
    };
  }, []);

  // Device-specific configurations
  const getDeviceConfig = () => {
    switch (deviceType) {
      case 'mobile':
        return {
          dotSize: 'w-4 h-4',
          spacing: { left1: '-23px', left2: '0px', left3: '23px' },
          bounceHeight: '-20px',
          scale: '1.05'
        };
      case 'tablet':
        return {
          dotSize: 'w-5 h-5',
          spacing: { left1: '-28px', left2: '0px', left3: '28px' },
          bounceHeight: '-25px',
          scale: '1.05'
        };
      default: // desktop
        return {
          dotSize: 'w-6 h-6',
          spacing: { left1: '-33px', left2: '0px', left3: '33px' },
          bounceHeight: '-30px',
          scale: '1.05'
        };
    }
  };

  const config = getDeviceConfig();
  return (
    <>
      <div className="fixed inset-0 bg-brand-navy flex items-center justify-center z-50">
        {/* Three bouncing dots container */}
        <div className="relative flex items-center justify-center">
          {/* Dot 1 */}
          <div className={`absolute ${config.dotSize} bg-brand-background rounded-full bounce-dot-1`}></div>
          
          {/* Dot 2 */}
          <div className={`absolute ${config.dotSize} bg-brand-background rounded-full bounce-dot-2`}></div>
          
          {/* Dot 3 */}
          <div className={`absolute ${config.dotSize} bg-brand-background rounded-full bounce-dot-3`}></div>
        </div>
      </div>

      {/* Inline styles using a style tag */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes bounce-up-down {
            0%, 80%, 100% {
              transform: translateY(0) scale(1);
              opacity: 1;
            }
            40% {
              transform: translateY(${config.bounceHeight}) scale(${config.scale});
              opacity: 0.8;
            }
          }

          .bounce-dot-1 {
            animation: bounce-up-down 1.4s infinite ease-in-out;
            animation-delay: 0s;
            left: ${config.spacing.left1};
          }

          .bounce-dot-2 {
            animation: bounce-up-down 1.4s infinite ease-in-out;
            animation-delay: 0.2s;
            left: ${config.spacing.left2};
          }

          .bounce-dot-3 {
            animation: bounce-up-down 1.4s infinite ease-in-out;
            animation-delay: 0.4s;
            left: ${config.spacing.left3};
          }
        `
      }} />
    </>
  );
}