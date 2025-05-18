"use client" ; 

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { Code, Briefcase, Coffee } from 'lucide-react';

// Normally would import from Spline but using a placeholder div instead
const SplineModel = () => (
  <div className = "w-full h-full rounded-lg bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center">
    <div className = "text-center">
      <p className = "text-lg opacity-70">3D Model</p>
      <p className = "text-sm opacity-50">from Spline</p>
    </div>
  </div>
);

const Hero = () => {
  const container = useRef();
  
  useGSAP(() => {
    const tl = gsap.timeline();
    
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
  }, { scope: container });

  return (
    <section id="home" ref={container} className = "min-h-screen flex items-center pt-20 pb-10 px-6">
      <div className = "container mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className = "space-y-6">
          <div className = "flex items-center space-x-4 hero-image">
            <div className = "w-16 h-16 rounded-full overflow-hidden gradient-border">
              <img 
                src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                alt="Pratyush Nayak" 
                className = "w-full h-full object-cover"
              />
            </div>
            <div className = "hero-subtitle">
              <div className = "flex items-center space-x-2 text-primary-400">
                <Code size={16} />
                <span>Web Developer</span>
              </div>
            </div>
          </div>
          
          <h1 className = "text-4xl md:text-6xl font-bold leading-tight hero-title">
            Pratyush<br/>
            Nayak
          </h1>
          
          <div className = "space-y-2">
            <div className = "flex items-center space-x-2 hero-role">
              <Briefcase size={16} className = "text-secondary-400" />
              <span>Frontend Developer</span>
            </div>
            <div className = "flex items-center space-x-2 hero-role">
              <Code size={16} className = "text-secondary-400" />
              <span>UI/UX Designer</span>
            </div>
            <div className = "flex items-center space-x-2 hero-role">
              <Coffee size={16} className = "text-secondary-400" />
              <span>Digital Creator</span>
            </div>
          </div>
        </div>
        
        <div className = "spline-model h-[350px] md:h-[450px]">
          <SplineModel />
        </div>
      </div>
    </section>
  );
};

export default Hero;