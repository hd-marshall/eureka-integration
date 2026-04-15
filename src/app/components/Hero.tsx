"use client";
import React, { useState, useEffect } from 'react';

import ParticleAnimation from "./ui/ParticleAnimation"

const Hero: React.FC = (): React.JSX.Element => {
  // Text content variables - easily changeable
  const heroTitle = "Empowering Companies with Software Solutions";
  const heroSubtext = "Eureka Integration delivers reliable, scalable, and innovative software to help your business thrive. Trusted by industry leaders.";
  const primaryButtonText = "Book a Call";
  const secondaryButtonText = "Our Services";
  
  // Stats data - easily changeable
  const stats = [
    { value: "3+", label: "Years Experience", target: 3, suffix: "+", startValue: 0 },
    { value: "99.9%", label: "Up Time", target: 99.9, suffix: "%", startValue: 33 },
    { value: "100%", label: "Client Satisfaction", target: 100, suffix: "%", startValue: 33 }
  ];

  // State for animated values - initialize with start values
  const [animatedStats, setAnimatedStats] = useState(stats.map(stat => stat.startValue));
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    
    const duration = 2500; // 2.5 seconds (longer for extreme slowdown effect)
    const steps = 80; // More steps for smoother final approach
    const stepDuration = duration / steps;

    stats.forEach((stat, index) => {
      let step = 0;
      
      const timer = setInterval(() => {
        step++;
        let progress = step / steps;
        
        // Advanced easing with extreme logarithmic slowdown near target
        const range = stat.target - stat.startValue;
        let currentValue;
        
        if (index === 1 || index === 2) { // Up Time and Client Satisfaction
          // Create a smooth asymptotic curve that never quite reaches the target during animation
          // Use a combination of ease-out and asymptotic approach
          
          // Smooth asymptotic function: approaches 1 but never reaches it during animation
          const asymptoteProgress = 1 - Math.exp(-progress * 4.5); // Exponential approach to 1
          
          // Apply additional smoothing in the final phase
          let smoothedProgress;
          if (progress > 0.8) {
            // In final 20%, use extra smoothing to prevent jolting
            const finalPhase = (progress - 0.8) / 0.2; // 0 to 1 in final phase
            const baseProgress = 1 - Math.exp(-0.8 * 4.5); // Progress at 80% mark
            const remainingProgress = (1 - baseProgress) * (1 - Math.exp(-finalPhase * 3));
            smoothedProgress = baseProgress + remainingProgress;
          } else {
            smoothedProgress = asymptoteProgress;
          }
          
          // Ensure we get very close to target but don't jolt at the end
          if (step === steps) {
            // On final step, smoothly reach exactly the target
            currentValue = stat.target;
          } else {
            // Scale progress to reach about 99.5% of target by step 75, then smooth final approach
            const scaledProgress = smoothedProgress * 0.998; // Never quite reach 100% during animation
            currentValue = stat.startValue + (range * scaledProgress);
            
            // Gentle final approach for last few steps
            if (step > steps - 5) {
              const finalSteps = steps - step + 1;
              const targetDistance = stat.target - currentValue;
              const gentleIncrement = targetDistance / (finalSteps * 1.5); // Spread remaining distance
              currentValue = Math.min(currentValue + gentleIncrement, stat.target);
            }
          }
          
        } else {
          // Years Experience - standard ease-out
          progress = 1 - Math.pow(1 - progress, 2);
          currentValue = stat.startValue + (range * progress);
        }
        
        setAnimatedStats(prev => {
          const newStats = [...prev];
          newStats[index] = currentValue;
          return newStats;
        });

        if (step >= steps) {
          clearInterval(timer);
          if (index === stats.length - 1) {
            setIsAnimating(false);
          }
        }
      }, stepDuration);
    });
  }, []);

  return (
    <section className="bg-brand-background w-full overflow-hidden h-[85vh] relative">
      {/* Particle Animation - behind everything */}
      <ParticleAnimation className="absolute inset-0 z-0" />

      {/* Main content - absolutely positioned with higher z-index */}
      <div className="absolute top-[40%] left-0 transform -translate-y-1/2 w-full lg:w-[55%] md:w-[65%] px-4 sm:px-10 md:px-8 lg:px-16 z-10">
        {/* Main heading */}
        <h1 className="font-eb-garamond text-3xl md:text-4xl lg:text-5xl max-sm:text-center font-bold text-brand-navy leading-tight mb-6">
          {heroTitle}
        </h1>
        
        {/* Subtext */}
        <p className="font-nunito-sans text-md md:text-xl max-sm:text-center text-brand-blue leading-relaxed mb-8 lg:mb-12">
          {heroSubtext}
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 z-20 relative">
          <button className="border-2 border-brand-navy bg-brand-background text-brand-navy px-8 py-3 rounded-lg font-semibold hover:bg-brand-accent hover:text-white hover:cursor-pointer transition-all duration-200 hover:-translate-y-0.5 z-20 relative">
            {secondaryButtonText}
          </button>
          <button className="border-2 border-brand-navy bg-brand-navy text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-accent hover:text-white hover:shadow-lg hover:cursor-pointer transition-all duration-200 hover:-translate-y-0.5 z-20 relative">
            {primaryButtonText}
          </button>
        </div>
      </div>
        
      {/* Stats section - absolutely positioned at bottom with higher z-index */}
      <div className="absolute top-[85%] left-1/2 transform -translate-x-1/2 flex md:flex-row sm:flex-row sm:relative justify-center items-center gap-8 md:gap-12 z-10">
          {stats.map((stat, index) => (
            <React.Fragment key={index}>
              <div className="text-center">
                <div className="font-eb-garamond text-xl md:text-2xl lg:text-3xl font-bold text-brand-navy mb-2">
                  {(() => {
                    const value = animatedStats[index];
                    
                    if (index === 0) {
                      // Years Experience - whole number
                      return `${Math.floor(value)}${stat.suffix}`;
                    } else if (index === 1) {
                      // Up Time - one decimal
                      return `${value.toFixed(1)}${stat.suffix}`;
                    } else {
                      // Client Satisfaction - whole number
                      return `${Math.floor(value)}${stat.suffix}`;
                    }
                  })()}
                </div>
                <div className="font-nunito-sans text-sm md:text-base text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
              {/* Vertical divider line - hidden on last item */}
              {index < stats.length - 1 && (
                <div className="w-px h-12 bg-gray-400 hidden md:block" />
              )}
            </React.Fragment>
          ))}
        </div>
    </section>
  );
};

export default Hero;