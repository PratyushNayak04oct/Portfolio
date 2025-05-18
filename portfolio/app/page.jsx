"use client" ; 

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Services from './components/Services';
import Skills from './components/Skills';
import Voices from './components/Voices';
import Social from './components/Social';
import Footer from './components/Footer';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

function Home() {
  const containerRef = useRef();
  const blobsContainerRef = useRef();

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) * 0.1; // Increased from 0.05 to 0.1 for faster movement
      const moveY = (clientY - window.innerHeight / 2) * 0.1; // Increased from 0.05 to 0.1 for faster movement
      const blobs = document.querySelectorAll('.blob');

      blobs.forEach((blob, index) => {
        const xOffset = index % 2 === 0 ? -1 : 1;
        const yOffset = Math.floor(index / 2) % 2 === 0 ? -1 : 1;
        
        gsap.to(blob, {
          x: moveX * xOffset,
          y: moveY * yOffset,
          duration: 0.6, // Decreased from 1 to 0.6 for faster response
          ease: 'power2.out'
        });
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Add scroll synchronization for blobs
  useEffect(() => {
    if (!blobsContainerRef.current) return;

    // This effect is crucial for the blobs to follow scroll
    gsap.to(blobsContainerRef.current, {
      y: () => -window.scrollY * 0.8, // The blobs move at 80% of scroll speed for a parallax effect
      ease: "none",
      scrollTrigger: {
        start: 0,
        end: 'max',
        invalidateOnRefresh: true,
        scrub: 0.1 // Makes the animation smooth
      }
    });
  }, []);

  useGSAP(() => {
    // Animate sections
    gsap.utils.toArray('section').forEach((section) => {
      gsap.fromTo(
        section,
        {
          opacity: 0,
          y: 50
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Project cards animation
    const projectCards = gsap.utils.toArray('.project-card');
    projectCards.forEach((card, i) => {
      gsap.fromTo(
        card,
        {
          opacity: 0,
          x: 100
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '#projects',
            start: 'top 60%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
          },
          delay: i * 0.2
        }
      );
    });

    // Skill icons animation
    gsap.utils.toArray('.skill-icon').forEach((icon, i) => {
      gsap.fromTo(
        icon,
        {
          opacity: 0,
          scale: 0.8
        },
        {
          opacity: 1,
          scale: 1,
          duration: 0.4,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: '#skills',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Testimonials animation
    gsap.utils.toArray('.testimonial').forEach((testimonial, i) => {
      gsap.fromTo(
        testimonial,
        {
          opacity: 0,
          y: 30
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: i * 0.15,
          scrollTrigger: {
            trigger: '#voices',
            start: 'top 60%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Social icons animation
    gsap.utils.toArray('.social-icon').forEach((icon, i) => {
      gsap.fromTo(
        icon,
        {
          opacity: 0,
          y: 20
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          delay: i * 0.1,
          scrollTrigger: {
            trigger: '#social',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className = "bg-black relative min-h-screen">
      {/* Blobs container with absolute positioning and z-index below content */}
      <div 
        ref={blobsContainerRef} 
        className = "absolute top-0 left-0 w-full h-full"
        style={{ zIndex: 1 }}
      >
        <div className = "blob -right-[104px] -top-[240px] w-[600px] h-[600px]" style={{ background: 'linear-gradient(to right, #006DFB 0%, #5E96E8 100%)' }}></div>
        <div className = "blob -left-[304px] top-[200px] w-[600px] h-[600px]" style={{ background: 'linear-gradient(to right, #5E96E8 0%, #00A6FB 100%)' }}></div>
        <div className = "blob -right-[224px] top-[480px] w-[600px] h-[600px]" style={{ background: 'linear-gradient(to right, #00A6FB 0%, #7F01D3 100%)' }}></div>
        <div className = "blob -left-[304px] top-[1040px] w-[600px] h-[600px]" style={{ background: 'linear-gradient(to right, #006DFB 0%, #5E96E8 100%)' }}></div>
        <div className = "blob -right-[304px] top-[1520px] w-[600px] h-[600px]" style={{ background: 'linear-gradient(to right, #5E96E8 0%, #00A6FB 100%)' }}></div>
        <div className = "blob -left-[264px] top-[2000px] w-[600px] h-[600px]" style={{ background: 'linear-gradient(to right, #00A6FB 0%, #7F01D3 100%)' }}></div>
        <div className = "blob -right-[264px] top-[2480px] w-[600px] h-[600px]" style={{ background: 'linear-gradient(to right, #006DFB 0%, #5E96E8 100%)' }}></div>
        <div className = "blob -left-[384px] top-[3000px] w-[600px] h-[600px]" style={{ background: 'linear-gradient(to right, #5E96E8 0%, #00A6FB 100%)' }}></div>
        <div className = "blob -right-[264px] top-[3400px] w-[600px] h-[600px]" style={{ background: 'linear-gradient(to right, #00A6FB 0%, #7F01D3 100%)' }}></div>
        <div className = "blob -left-[280px] top-[4000px] w-[600px] h-[600px]" style={{ background: 'linear-gradient(to right, #006DFB 0%, #5E96E8 100%)' }}></div>
        <div className = "blob -right-[280px] top-[4600px] w-[600px] h-[600px]" style={{ background: 'linear-gradient(to right, #5E96E8 0%, #00A6FB 100%)' }}></div>
        <div className = "blob -left-[280px] top-[5100px] w-[600px] h-[600px]" style={{ background: 'linear-gradient(to right, #00A6FB 0%, #7F01D3 100%)' }}></div>
        <div className = "blob -right-[280px] top-[5350px] w-[600px] h-[600px]" style={{ background: 'linear-gradient(to right, #006DFB 0%, #5E96E8 100%)' }}></div>
      </div>
      
      {/* Content container with higher z-index to appear above the blobs */}
      <div className = "relative z-10 flex flex-col items-center backdrop-blur-xl">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Services />
        <Skills />
        <Voices />
        <Social />
        <Footer />
      </div>
    </div>
  );
}

export default Home;