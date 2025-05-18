"use client" ; 

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
  }, { scope: container });

  const positions = ['testimonial-top-left', 'testimonial-top-right', 'testimonial-bottom-left', 'testimonial-bottom-right'];

  return (
    <section id="voices" ref={container} className = "w-[100%]">
      <div className = "container mx-auto">
        <h2 className = "text-2xl md:text-3xl font-semibold text-center gradient-text mb-16 voices-title">
          Voices Of Trust
        </h2>
        
        <div className = "max-w-4xl mx-auto">
          <div className = "voices-container">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id} 
                className={`testimonial ${positions[index]} p-6 rounded-lg glass-effect gradient-border`}
              >
                <p className = "text-gray-300 mb-4">{testimonial.text}</p>
                <div className = "flex items-center space-x-3">
                  <div className = "w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                    <span className = "text-xs">{testimonial.name.split(' ').map(n => n[0]).join('')}</span>
                  </div>
                  <div>
                    <p className = "font-medium">{testimonial.name}</p>
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