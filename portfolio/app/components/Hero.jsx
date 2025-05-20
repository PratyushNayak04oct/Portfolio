"use client";

import React, { useRef, useState, Suspense, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { Code, Briefcase, Coffee } from 'lucide-react';
import Spline from '@splinetool/react-spline';

// Loading component to show while Spline loads
const SplineLoader = () => (
  <div className = "w-full h-full rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
    <div className = "text-center">
      <p className = "text-lg opacity-70">Loading 3D Model...</p>
      <p className = "text-sm opacity-50">Please wait</p>
    </div>
  </div>
);

const Hero = () => {
  const container = useRef();
  const textRef = useRef(null);
  const splineContainerRef = useRef(null);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const roles = [
    "Web Developer", 
    "UI/UX Designer", 
    "SEO Optimization", 
    "Custom Web Application", 
    "3D Model Designer"
  ];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  
  useGSAP(() => {
    const tl = gsap.timeline();
    
    // Initial animations for hero elements
    tl.fromTo(
      '.hero-image',
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power2.out' }
    )
    .fromTo(
      '.hero-title',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    )
    .fromTo(
      '.hero-subtitle',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.5'
    )
    .fromTo(
      '.hero-role',
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    )
    .fromTo(
      '.spline-model',
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
      '-=1'
    );
    
    // Create a more consistent text animation with fixed timing
    const animateRoleText = () => {
      // Clear any existing animations on the text element
      gsap.killTweensOf(textRef.current);
      
      const roleTl = gsap.timeline({
        onComplete: () => {
          // Update to the next role when animation completes
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          // After a short delay, animate the next role
          setTimeout(animateRoleText, 100);
        }
      });
      
      roleTl
        .fromTo(
          textRef.current,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
        )
        .to(
          textRef.current,
          { 
            y: 0, 
            opacity: 1, 
            duration: 1, // Show text for 1.2 seconds (faster)
            ease: "none" 
          }
        )
        .to(
          textRef.current,
          { 
            y: -20, 
            opacity: 0, 
            duration: 0.3, 
            ease: "power2.in" 
          }
        );
    };
    
    // Start the animation sequence after the initial animations
    setTimeout(animateRoleText, 1000);
    
    return () => {
      gsap.killTweensOf(textRef.current);
    };
    
  }, { scope: container });

  // Function to handle when Spline has loaded
  const onSplineLoad = () => {
    setSplineLoaded(true);
  };

  // Mouse tracking for the tooltip
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!splineContainerRef.current) return;
      
      const rect = splineContainerRef.current.getBoundingClientRect();
      const isInsideContainer = 
        e.clientX >= rect.left && 
        e.clientX <= rect.right && 
        e.clientY >= rect.top && 
        e.clientY <= rect.bottom;
      
      if (isInsideContainer) {
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <section id="home" ref={container} className = "mt-36 md:mt-12 flex items-center min-h-screen">
      <div className = "container mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className = "pl-16 md:pl-28">
          <div className = "flex items-center space-x-4 hero-image">
            <div className = "w-16 h-16 rounded-full overflow-hidden gradient-border">
              <img 
                src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Pratyush Nayak" 
                className = "w-full h-full object-cover"
              />
            </div>
            <div className = "hero-subtitle">
              <div className = "flex items-center">
                <div className = "h-8 overflow-hidden">
                  <span 
                    ref={textRef} 
                    className = "heading-2 gradient1 inline-block md:text-[24px] text-[16px]"
                  >
                    {roles[currentRoleIndex]}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <h1 className = "md:text-[96px] text-[64px]" id="hero-name">
            Pratyush<br />
            Nayak
          </h1>
        </div>
        
        <div className = "spline-model h-96 relative md:pl-0 pl-20" ref={splineContainerRef}>
          <Suspense fallback={<SplineLoader />}>
            {!splineLoaded && <SplineLoader />}
            <div className = {`w-full h-full transition-opacity duration-500 ${splineLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <Spline
                scene="https://prod.spline.design/hxkqLnCYarF2d2E0/scene.splinecode"
                onLoad={onSplineLoad}
              />
            </div>
            
            {isHovering && splineLoaded && (
              <div 
                className = "absolute bg-black/80 text-white px-3 py-1.5 rounded-md text-sm pointer-events-none flex items-center space-x-1.5"
                style={{
                  left: `${mousePosition.x}px`,
                  top: `${mousePosition.y - 40}px`,
                  transform: 'translate(-50%, -50%)',
                  zIndex: 50,
                  whiteSpace: 'nowrap'
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 6a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"></path>
                  <path d="M14 18a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"></path>
                  <path d="M6 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                  <path d="M18 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                  <path d="m14 6-8 8"></path>
                  <path d="m18 10-8 8"></path>
                  <path d="m6 10 8 8"></path>
                </svg>
                <span>Click + Drag to Rotate</span>
              </div>
            )}
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default Hero;