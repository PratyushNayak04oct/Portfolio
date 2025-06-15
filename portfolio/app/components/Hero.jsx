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

// Animated Signature Component
// Animated Signature Component
// Animated Signature Component
const AnimatedSignature = () => {
  return (
    <div className = "signature-wrapper absolute -bottom-16 left-62 w-72 h-36 pointer-events-none">
      <svg 
        viewBox="0 0 300.000000 169.000000" 
        className = "w-full h-full transform rotate-[-30deg] opacity-90"
        preserveAspectRatio="xMidYMid meet"
      >
        <style jsx>{`
          .signature-path {
            fill: none;
            stroke: #FF6F3C;
            stroke-width: 12;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-dasharray: 2000;
            stroke-dashoffset: 2000;
            animation: drawSignature 3s ease-in-out 1s forwards;
          }
          
          @keyframes drawSignature {
            to {
              stroke-dashoffset: 0;
            }
          }
        `}</style>
        
        <g transform="translate(0.000000,169.000000) scale(0.100000,-0.100000)">
          <path className = "signature-path" d="M886 1034 c-178 -40 -229 -106 -150 -194 20 -22 35 -42 33 -44 -2 -2
          -29 -11 -59 -21 -59 -19 -183 -77 -214 -100 -18 -14 -16 -45 3 -45 6 0 8 6 5
          14 -9 24 91 78 234 127 l53 18 37 -23 c45 -29 130 -61 139 -53 5 6 -11 62 -31
          107 -5 13 16 23 111 54 169 54 297 108 301 127 5 26 -67 40 -238 44 -117 4
          -172 1 -224 -11z m320 -5 c53 -6 105 -14 117 -19 19 -7 15 -11 -38 -35 -59
          -26 -340 -125 -356 -125 -5 0 -15 14 -24 30 -17 32 -35 40 -35 15 0 -8 4 -15
          10 -15 5 0 14 -9 20 -19 9 -17 3 -21 -50 -39 l-59 -20 -40 44 c-46 49 -47 53
          -26 93 38 75 254 116 481 90z m-272 -242 c9 -23 16 -46 16 -51 0 -13 -51 3
          -100 31 l-44 26 49 18 c28 10 53 18 56 18 4 1 14 -18 23 -42z"/>
          <path className = "signature-path" d="M1860 927 c-20 -7 -36 -20 -38 -30 -4 -19 24 -57 41 -57 6 0 0 12
          -14 26 -24 25 -24 26 -5 40 24 17 132 19 173 3 46 -17 73 -49 73 -86 0 -32
          -21 -46 -35 -23 -9 15 -35 12 -35 -4 0 -8 8 -17 18 -20 9 -3 -28 -4 -83 -2
          -91 2 -106 6 -167 36 -56 28 -69 32 -82 21 -20 -17 -20 -35 -1 -51 17 -14 55
          -4 55 15 0 11 13 8 53 -10 69 -32 149 -41 231 -25 67 12 136 7 136 -10 0 -6
          -5 -10 -11 -10 -22 0 -79 -33 -79 -45 0 -8 9 -17 20 -20 24 -8 70 18 70 39 0
          9 17 16 48 21 26 3 57 13 69 21 12 8 30 14 40 13 12 0 13 -2 5 -6 -9 -3 -2
          -13 19 -29 18 -13 35 -21 38 -19 2 3 -5 12 -17 21 -12 8 -22 22 -22 30 0 8 -7
          14 -15 14 -9 0 -15 9 -15 25 0 14 -4 25 -10 25 -5 0 -10 -13 -10 -30 0 -27 -3
          -30 -31 -30 -17 0 -37 -7 -45 -15 -23 -22 -43 -19 -37 6 5 18 3 20 -15 15 -11
          -4 -23 -2 -27 3 -3 6 -20 8 -37 4 -29 -6 -30 -5 -19 16 25 46 -17 104 -93 126
          -59 18 -98 18 -146 2z m-117 -127 c-6 -23 -16 -25 -32 -7 -13 16 -5 27 20 27
          12 0 16 -6 12 -20z m417 -95 c-14 -16 -50 -21 -50 -6 0 9 52 31 59 25 2 -2 -2
          -10 -9 -19z"/>
          <path className = "signature-path" d="M1310 830 c-8 -5 -24 -12 -35 -16 -18 -6 -16 -8 10 -13 17 -4 33 -2
          37 4 5 7 8 7 8 -1 0 -17 -24 -41 -47 -47 -13 -3 -23 -1 -23 4 0 12 -37 11 -45
          -1 -8 -13 -52 -13 -57 1 -2 7 -12 7 -32 0 -33 -13 -46 -7 -46 20 0 32 -19 21
          -22 -13 -2 -25 -8 -34 -25 -36 -16 -2 -23 2 -23 12 0 9 -4 16 -10 16 -14 0
          -13 -13 3 -34 13 -17 16 -17 48 -3 48 21 81 25 139 16 35 -5 65 -4 98 6 47 15
          82 12 82 -6 0 -5 -9 -9 -21 -9 -28 0 -61 -19 -54 -31 4 -5 29 -9 57 -9 39 0
          57 5 74 21 38 35 204 69 232 47 7 -6 16 -8 19 -4 13 13 -22 27 -54 22 -28 -4
          -33 -2 -33 15 0 10 -4 19 -10 19 -5 0 -10 -9 -10 -20 0 -14 -7 -20 -22 -22
          -37 -2 -42 -3 -57 -12 -18 -11 -91 -9 -124 3 -43 16 -35 41 13 41 23 0 40 5
          40 11 0 7 -15 10 -40 7 -28 -2 -40 0 -40 9 0 15 -8 16 -30 3z m106 -115 c-21
          -16 -117 -21 -100 -6 9 9 46 17 94 19 24 1 24 1 6 -13z"/>
        </g>
      </svg>
    </div>
  );
};

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
          
          <div className = "relative">
            <h1 className = "md:text-[96px] text-[64px] font-bold text-white hero-title" id="hero-name">
              PRATYUSH<br />
              NAYAK
            </h1>
            <AnimatedSignature />
          </div>
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