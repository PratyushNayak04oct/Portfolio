"use client" ; 

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

const imageSlides = [
  'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
];

const About = () => {
  const container = useRef();
  const leftSliderRef = useRef();
  const rightSliderRef = useRef();
  
  useGSAP(() => {
    gsap.fromTo(
      '.about-title',
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
    
    gsap.fromTo(
      '.about-content',
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: container.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Left slider animation
    gsap.fromTo(
      leftSliderRef.current,
      { 
        opacity: 0,
        y: -100,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Right slider animation
    gsap.fromTo(
      rightSliderRef.current,
      { 
        opacity: 0,
        y: 100
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    // Continuous slide animation for left slider
    gsap.to(leftSliderRef.current.children, {
      yPercent: -100 * (imageSlides.length - 1),
      duration: 10,
      ease: 'none',
      repeat: -1,
      scrollTrigger: {
        trigger: container.current,
        start: 'top center',
        toggleActions: 'play pause resume pause'
      }
    });

    // Continuous slide animation for right slider (reverse direction)
    gsap.to(rightSliderRef.current.children, {
      yPercent: 100 * (imageSlides.length - 1),
      duration: 10,
      ease: 'none',
      repeat: -1,
      scrollTrigger: {
        trigger: container.current,
        start: 'top center',
        toggleActions: 'play pause resume pause'
      }
    });
  }, { scope: container });

  return (
    <section id="about" ref={container} className = "w-[100%] ">
      <div className = "container mx-auto">
        <h2 className = "text-2xl md:text-3xl font-semibold text-center gradient-text mb-12 about-title">
          About
        </h2>
        
        <div className = "grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          
          <div ref={leftSliderRef} className = "hidden md:block h-[400px] overflow-hidden">
            {imageSlides.map((src, index) => (
              <div key={index} className = "h-[400px] mb-4">
                <img 
                  src={src} 
                  alt={`Slide ${index + 1}`} 
                  className = "w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>

          {/* Center Content */}
          <div className = "about-content text-center flex items-center">
            <p className = "text-lg leading-relaxed text-gray-300">
              Hello I am, Pratyush Nayak and I provide you with the services of web designing and web development. I specialize in creating beautiful, functional websites that help businesses and individuals achieve their online goals. With expertise in modern web technologies and a keen eye for design, I deliver custom solutions that stand out in today's digital landscape.
            </p>
          </div>

          {/* Right Slider */}
          <div ref={rightSliderRef} className = "hidden md:block h-[400px] overflow-hidden">
            {imageSlides.map((src, index) => (
              <div key={index} className = "h-[400px] mb-4">
                <img 
                  src={src} 
                  alt={`Slide ${index + 1}`} 
                  className = "w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;