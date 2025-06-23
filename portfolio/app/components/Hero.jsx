"use client";

import React, { useRef, useState, Suspense, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import Spline from '@splinetool/react-spline';
import Image from 'next/image';

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
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  
  // Define roles outside of useEffect to avoid dependency issues
  const roles = React.useMemo(() => [
    "Web Developer", 
    "UI/UX Designer", 
    "SEO Optimization", 
    "Custom Web Application", 
    "3D Model Designer"
  ], []);
  
  // Fixed role animation effect
  useEffect(() => {
    let intervalId;
    let timeoutId;
    
    const animateRoleChange = () => {
      if (!textRef.current) return;
      
      // Kill any existing animations
      gsap.killTweensOf(textRef.current);
      
      // Create timeline for smooth transition
      const tl = gsap.timeline();
      
      // Fade out current text
      tl.to(textRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: "power2.in"
      })
      // Change the text content and fade in
      .call(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      })
      .set(textRef.current, { y: 10 }) // Reset position for fade in
      .to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    };
    
    // Initial fade in - Set initial visibility
    if (textRef.current) {
      gsap.set(textRef.current, { opacity: 1, y: 0 });
    }
    
    // Start the interval after initial delay
    timeoutId = setTimeout(() => {
      intervalId = setInterval(animateRoleChange, 2500); // Change every 2.5 seconds
    }, 2000); // Wait 2 seconds before starting
    
    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
      if (textRef.current) {
        gsap.killTweensOf(textRef.current);
      }
    };
  }, []); // Empty dependency array since roles is memoized

  useGSAP(() => {
    // Removed all initial animations - elements now appear immediately
    // Set all elements to their final state immediately
    gsap.set('.hero-image', { opacity: 1, x: 0 });
    gsap.set('.hero-title', { opacity: 1, y: 0 });
    gsap.set('.hero-subtitle', { opacity: 1, y: 0 });
    gsap.set('.hero-role', { opacity: 1, y: 0 });
    gsap.set('.spline-model', { opacity: 1, scale: 1 });
    
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
        <div className = "pl-6 md:pl-28">
          <div className = "flex items-center space-x-4 hero-image">
            <div className = "w-16 h-16 rounded-full overflow-hidden gradient-border">
              <img 
                src="https://k6nwq7ukojmfdzo6.public.blob.vercel-storage.com/hero/hero-image-vm2Z9bcNnYef6yRzFfdFFOu7dTnooC.jpg" 
                alt="Pratyush Nayak" 
                className = "w-full h-full object-cover"
                height={100}
                width={100}
                id="hero-image"
              />
            </div>
            <div className = "hero-subtitle">
              <div className = "flex items-center">
                <div className = "h-8 relative flex items-center">
                  <span 
                    ref={textRef} 
                    className = "text-lg md:text-2xl font-semibold gradient1 whitespace-nowrap hero-role"
                    style={{ minWidth: '200px' }}
                  >
                    {roles[currentRoleIndex]}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <h1 className = "md:text-[96px] text-[64px] font-bold text-white hero-title" id="hero-name">
            PRATYUSH<br />
            NAYAK
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