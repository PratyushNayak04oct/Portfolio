"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

    gsap.registerPlugin(ScrollTrigger);

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

    gsap.set([leftSliderRef.current, rightSliderRef.current], { opacity: 0 });

    gsap.fromTo(
      leftSliderRef.current,
      { 
        opacity: 0,
        x: -50,
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 1, // 1 second delay
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo(
      rightSliderRef.current,
      { 
        opacity: 0,
        x: 50
      },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 1, 
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.set(leftSliderRef.current.children, {
      position: 'relative'
    });
    
    gsap.set(rightSliderRef.current.children, {
      position: 'relative'
    });

    gsap.to(leftSliderRef.current.children, {
      yPercent: -100 * (imageSlides.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        markers: false,
        invalidateOnRefresh: true,
      }
    });

    gsap.to(rightSliderRef.current.children, {
      yPercent: 100 * (imageSlides.length - 1),
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        markers: false,
        invalidateOnRefresh: true,
      }
    });
  }, { scope: container });

  return (
    <section id="about" ref={container} className = "h-screen w-screen flex justify-center items-center">
      <div className = "container mx-auto px-4">
        <h2 className = "text-center text-[32px]">
          <span className = "heading-2 inline-block">About</span>
        </h2>
        
        <div className = "flex flex-col md:flex-row justify-center items-center gap-12">

          <div ref={leftSliderRef} className = "hidden md:flex flex-col h-[400px] w-full md:w-1/3 overflow-hidden relative">
            {imageSlides.map((src, index) => (
              <div key={index} className = "h-[400px] flex-shrink-0 w-full mb-4">
                <img 
                  src={src} 
                  alt={`Slide ${index + 1}`} 
                  className = "w-full h-full object-cover rounded-lg"
                />
              </div>
            ))}
          </div>

          <div className = "about-content text-center w-full md:w-1/3 flex items-center justify-center">
            <p className = "text-lg leading-relaxed text-gray-300">
              Hello I am, Pratyush Nayak and I provide you with the services of web designing and web development. I specialize in creating beautiful, functional websites that help businesses and individuals achieve their online goals. With expertise in modern web technologies and a keen eye for design, I deliver custom solutions that stand out in today's digital landscape.
            </p>
          </div>

          {/* Right Slider */}
          <div ref={rightSliderRef} className = "hidden md:flex flex-col h-[400px] w-full md:w-1/3 overflow-hidden relative">
            {imageSlides.map((src, index) => (
              <div key={index} className = "h-[400px] flex-shrink-0 w-full mb-4">
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