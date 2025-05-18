"use client" ; 

import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Services from './components/Services';
import Skills from './components/Skills';
import Voices from './components/Voices';
import Social from './components/Social';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function Home() {
  const containerRef = useRef();
  const blobsContainerRef = useRef();
  const footerRef = useRef();
  const [documentHeight, setDocumentHeight] = useState(0);
  const lenisRef = useRef(null);

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    // Create Lenis instance
    lenisRef.current = new Lenis({
      duration: 2.4, // Increased duration for slower scrolling (doubled from 1.2)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Ease out expo
      direction: 'vertical', // Vertical scroll
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false, // Disable smooth scrolling on touch devices
      touchMultiplier: 1.5, // Reduced touch sensitivity for slower touch scrolling
      lerp: 0.08, // Lower values create more smoothing effect (0.1 is default)
      wheelMultiplier: 0.7, // Reduced wheel multiplier for slower mouse wheel scrolling
    });

    // Connect Lenis to GSAP's ticker for maximum performance
    gsap.ticker.add((time) => {
      lenisRef.current.raf(time * 1000);
    });

    // Set up ScrollTrigger to use the Lenis instance
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value) {
        if (arguments.length) {
          lenisRef.current.scrollTo(value);
        }
        return lenisRef.current.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight
        };
      },
      pinType: document.documentElement.style.transform ? "transform" : "fixed"
    });

    // Update ScrollTrigger when Lenis scrolls
    lenisRef.current.on('scroll', ScrollTrigger.update);

    return () => {
      // Clean up
      lenisRef.current.destroy();
      gsap.ticker.remove(lenisRef.current.raf);
    };
  }, []);

  useEffect(() => {
    const updateDocumentHeight = () => {
      if (footerRef.current) {
        // Get the bottom position of the footer
        const footerRect = footerRef.current.getBoundingClientRect();
        const footerBottom = footerRect.bottom + window.scrollY;
        setDocumentHeight(footerBottom);
      }
    };

    updateDocumentHeight();

    window.addEventListener('resize', updateDocumentHeight);

    const timer = setTimeout(updateDocumentHeight, 500);
    
    return () => {
      window.removeEventListener('resize', updateDocumentHeight);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) * 0.12; 
      const moveY = (clientY - window.innerHeight / 2) * 0.12; 
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

  // Add section scroll navigation function
  const scrollToSection = (sectionId) => {
    if (lenisRef.current) {
      const section = document.getElementById(sectionId);
      if (section) {
        lenisRef.current.scrollTo(section, {
          offset: -80, // Offset to account for fixed navbar
          duration: 2.4, // Increased duration to match main Lenis config
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });
      }
    }
  };

  useGSAP(() => {
    // Refresh ScrollTrigger after Lenis is initialized
    ScrollTrigger.refresh();
    
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

  const generateBlobs = () => {
    if (documentHeight === 0) return [];
    
    const blobSpacing = 500; // Space between blobs
    const numberOfBlobs = Math.ceil(documentHeight / blobSpacing);
    const blobs = [];
    
    const gradients = [
      'linear-gradient(to right, #006DFB 0%, #5E96E8 100%)',
      'linear-gradient(to right, #5E96E8 0%, #00A6FB 100%)',
      'linear-gradient(to right, #00A6FB 0%, #7F01D3 100%)'
    ];
    
    for (let i = 0; i < numberOfBlobs; i++) {
      const isRight = i % 2 === 0;
      const posX = isRight ? '-right-[264px]' : '-left-[304px]';
      const posY = i * blobSpacing;
      const gradientIndex = i % gradients.length;
      
      blobs.push(
        <div 
          key={i}
          className={`blob ${posX} w-[600px] h-[600px]`} 
          style={{ 
            background: gradients[gradientIndex],
            top: `${posY}px`
          }}
        ></div>
      );
    }
    
    return blobs;
  };

  return (
    <div ref={containerRef} className = "bg-black relative">
      <div 
        ref={blobsContainerRef} 
        className = "absolute -top-40 left-0 w-full"
        style={{ 
          zIndex: 1,
          height: documentHeight > 0 ? `${documentHeight}px` : '100%' 
        }}
      >
        {generateBlobs()}
      </div>

      <div className = "relative z-10 flex flex-col backdrop-blur-2xl">
        <div className = "fixed top-0 z-50 items-center">
          <Navbar scrollToSection={scrollToSection} />
        </div>
        <Hero />
        <About />
        <Projects />
        <Services />
        <Skills />
        <Voices />
        <Social />
        <div ref={footerRef}>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Home;