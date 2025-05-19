"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

const testimonials = [
  {
    id: 1,
    name: 'Mr. Xyz',
    position: 'CEO',
    company: 'ABC Tech',
    text: 'Very trustworthy and completes work always on time.'
  },
  {
    id: 2,
    name: 'Mr. Xyz',
    position: 'CTO',
    company: 'Tech Solutions',
    text: 'Very trustworthy and completes work always on time.'
  },
  {
    id: 3,
    name: 'Mr. Xyz',
    position: 'Founder',
    company: 'StartupX',
    text: 'Very trustworthy and completes work always on time.'
  },
  {
    id: 4,
    name: 'Mr. Xyz',
    position: 'Director',
    company: 'Digital Agency',
    text: 'Very trustworthy and completes work always on time.'
  }
];

const Voices = () => {
  const container = useRef();
  
  useGSAP(() => {
    gsap.fromTo(
      '.voices-title',
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        scrollTrigger: {
          trigger: container.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );
    
    // Add staggered animation for testimonials
    gsap.fromTo(
      '.testimonial',
      { opacity: 0, scale: 0.9 },
      { 
        opacity: 1, 
        scale: 1, 
        duration: 0.6,
        stagger: 0.2,
        scrollTrigger: {
          trigger: '.voices-container',
          start: 'top 75%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, { scope: container });

  return (
    <section id="voices" ref={container} className = "w-full py-16 md:py-24">
      <div className = "container mx-auto px-4 md:px-6">
        <h2 className = "text-2xl md:text-3xl lg:text-4xl font-semibold text-center gradient-text mb-12 md:mb-16 lg:mb-20 voices-title">
          <span className = "heading-2 inline-block">Voices Of Trust</span>
        </h2>
        
        <div className = "max-w-7xl mx-auto">
          <div className = "voices-container grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id} 
                className = "testimonial p-6 md:p-8 rounded-lg glass-effect gradient-border transform transition-transform hover:scale-105 duration-300"
              >
                <p className = "text-gray-300 mb-4 text-sm md:text-base">{testimonial.text}</p>
                <div className = "flex items-center space-x-3">
                  <div className = "w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                    <span className = "text-xs">{testimonial.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <p className = "font-medium text-sm md:text-base">{testimonial.name}</p>
                    <p className = "text-xs text-gray-400">{testimonial.position}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Voices;