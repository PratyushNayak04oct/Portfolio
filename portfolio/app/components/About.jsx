"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Images for left slider
const leftImageSlides = [
  "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

// Images for right slider in a different order
const rightImageSlides = [
  "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

const About = () => {
  const container = useRef(null);
  const leftSliderRef = useRef(null);
  const rightSliderRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Register ScrollTrigger once
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  // Track image loading to initialize animations only after images are loaded
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = leftImageSlides.length + rightImageSlides.length;

    function onImageLoad() {
      loadedCount++;
      if (loadedCount >= totalImages) {
        setImagesLoaded(true);
      }
    }

    // For Next.js Image components, we'll use a different approach
    // Set a timeout to ensure images have had time to load
    const timer = setTimeout(() => {
      setImagesLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (!imagesLoaded) return;

    const ctx = gsap.context(() => {
      // Animate title and content fade in
      gsap.fromTo(
        ".about-title",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: container.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ".about-content",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: container.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Show sliders explicitly
      gsap.set(".slider-container", {
        opacity: 1,
        visibility: "visible",
      });

      // Left slider fade in from left
      gsap.fromTo(
        leftSliderRef.current,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Right slider fade in from right
      gsap.fromTo(
        rightSliderRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container.current,
            start: "top 70%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Create continuous sliding effect
      const leftTrack = leftSliderRef.current.querySelector(".slides-track");
      const rightTrack = rightSliderRef.current.querySelector(".slides-track");
      
      // Left slider animation: moves up when scrolling down (bottom to top)
      gsap.to(leftTrack, {
        y: `-50%`,  // Move up by 50% of the track's height
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          end: "bottom -50%",
          scrub: 0.3, // Much faster animation - reduced from 1 to 0.3
          invalidateOnRefresh: true,
        },
      });

      // Right slider animation: moves down when scrolling down (top to bottom)
      // Starting from -50% and moving to 0% creates opposite direction
      gsap.fromTo(rightTrack, 
        { y: `-50%` },  // Start at top position (moved up)
        {
          y: `0%`,  // Move down to original position
          ease: "none",
          scrollTrigger: {
            trigger: container.current,
            start: "top 70%",
            end: "bottom -50%",
            scrub: 0.3, // Much faster animation - reduced from 1 to 0.3
            invalidateOnRefresh: true,
          },
        }
      );

      ScrollTrigger.refresh();
    }, container);

    return () => ctx.revert();
  }, [imagesLoaded]);

  return (
    <section
      id="about"
      ref={container}
      className = "w-screen flex justify-center items-center mt-12 md:mt-20 overflow-visible"
    >
      {/* Custom CSS for slider effects */}
      <style>{`
        /* Only apply gap and slider styles on md and up */
        @media (min-width: 768px) {
          .about-flex-row {
            gap: 32px !important;
          }
        }
        /* Remove gap on mobile */
        @media (max-width: 767px) {
          .about-flex-row {
            gap: 0 !important;
          }
        }
        
        .slider-container {
          position: relative;
          overflow: hidden;
          height: 280px; /* Reduced from 400px to 280px */
        }
        
        .slides-track {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          /* Add extra height to account for gaps */
          height: calc(200% + 40px); /* 4 slides * 10px gap = 40px extra */
          transition: none;
        }
        
        .slide {
          height: 280px; /* Reduced from 400px to 280px */
          width: 100%;
          display: block;
          margin: 0;
          padding: 0;
          margin-bottom: 10px; /* Reduced gap from 20px to 10px */
          position: relative;
          border-radius: 20px;
          overflow: hidden;
        }

        /* Prevent horizontal scrollbar */
        html, body {
          overflow-x: hidden;
          max-width: 100%;
        }
        
        /* Control vertical overflow while preventing extra scrollbar */
        #about {
          box-sizing: border-box;
        }
      `}</style>
      <div className = "container px-2 py-4">
        <h2 className = "text-center text-[40px] about-title mb-10">
          <span className = "heading-2 inline-block">About</span>
        </h2>
        <div className = "about-flex-row flex flex-col md:flex-row justify-center items-center gap-0 md:gap-8">
          <div
            ref={leftSliderRef}
            className = "slider-container hidden md:block w-1/3 opacity-0 invisible"
          >
            <div className = "slides-track">
              {/* Original slides */}
              {leftImageSlides.map((src, index) => (
                <div key={`left-${index}`} className = "slide">
                  <Image
                    src={src}
                    alt={`Slide ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    priority={index < 2} // Prioritize first 2 images for faster loading
                  />
                </div>
              ))}
              {/* Duplicate slides for continuous effect */}
              {leftImageSlides.map((src, index) => (
                <div key={`left-dup-${index}`} className = "slide">
                  <Image
                    src={src}
                    alt={`Slide ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className = "about-content text-center w-full md:w-1/3 flex items-center justify-center opacity-0 px-6 md:px-2 py-4">
            <p className = "text-xl leading-relaxed text-gray-300">
              Hello I am, <span className = "heading-2 inline-block md:text-[28px] text-[20px] font-semibold">Pratyush Nayak</span> and I provide you with the services of
              web designing and web development. I specialize in creating
              beautiful, functional websites that help businesses and
              individuals achieve their online goals. With expertise in modern
              web technologies and a keen eye for design, I deliver custom
              solutions that stand out in today's digital landscape.
            </p>
          </div>

          {/* Right Slider (hidden on <md) */}
          <div
            ref={rightSliderRef}
            className = "slider-container hidden md:block w-1/3 opacity-0 invisible"
          >
            <div className = "slides-track" style={{ top: 'auto', bottom: '0' }}>
              {/* Display slides in reverse order for right slider */}
              {rightImageSlides.slice().reverse().map((src, index) => (
                <div key={`right-${index}`} className = "slide">
                  <Image
                    src={src}
                    alt={`Slide ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    priority={index < 2} // Prioritize first 2 images for faster loading
                  />
                </div>
              ))}
              {/* Duplicate slides for continuous effect */}
              {rightImageSlides.slice().reverse().map((src, index) => (
                <div key={`right-dup-${index}`} className = "slide">
                  <Image
                    src={src}
                    alt={`Slide ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;