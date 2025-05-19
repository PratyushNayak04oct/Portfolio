"use client";

import React, { useRef, useEffect, useState } from "react";
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

    const leftImgs = leftSliderRef.current?.querySelectorAll("img") || [];
    const rightImgs = rightSliderRef.current?.querySelectorAll("img") || [];

    leftImgs.forEach((img) => {
      if (img.complete) {
        onImageLoad();
      } else {
        img.addEventListener("load", onImageLoad);
        img.addEventListener("error", onImageLoad);
      }
    });

    rightImgs.forEach((img) => {
      if (img.complete) {
        onImageLoad();
      } else {
        img.addEventListener("load", onImageLoad);
        img.addEventListener("error", onImageLoad);
      }
    });

    return () => {
      leftImgs.forEach((img) => {
        img.removeEventListener("load", onImageLoad);
        img.removeEventListener("error", onImageLoad);
      });
      rightImgs.forEach((img) => {
        img.removeEventListener("load", onImageLoad);
        img.removeEventListener("error", onImageLoad);
      });
    };
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

      // Modified slider animation for continuous scrolling
      const leftTrack = leftSliderRef.current.querySelector(".slides-track");
      const rightTrack = rightSliderRef.current.querySelector(".slides-track");
      
      // Animation for left slider - continuous scroll
      gsap.to(leftTrack, {
        y: `-${(leftImageSlides.length - 1) * 100}%`,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          end: "bottom -50%",
          scrub: 2,
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });

      // Animation for right slider - continuous scroll in opposite direction
      gsap.to(rightTrack, {
        y: `-${(rightImageSlides.length - 1) * 100}%`,
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top 70%",
          end: "bottom -50%",
          scrub: 2,
          toggleActions: "play none none reverse",
          invalidateOnRefresh: true,
        },
      });

      ScrollTrigger.refresh();
    }, container);

    return () => ctx.revert();
  }, [imagesLoaded]);

  return (
    <section
      id="about"
      ref={container}
      className = "w-full flex justify-center items-center md:mt-32 mt-20"
    >
      {/* Custom CSS for continuous slider */}
      <style jsx>{`
        .slider-container {
          position: relative;
          overflow: hidden;
          height: 630px;
          max-height: 630px;
        }
        .slides-track {
          position: absolute;
          width: 100%;
          height: auto;
          display: flex;
          flex-direction: column;
        }
        .slide-item {
          width: 100%;
          height: 210px;
          flex-shrink: 0;
          line-height: 0;
          font-size: 0;
        }
        .slide-item img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          margin: 0;
          padding: 0;
          border: none;
          vertical-align: top;
        }
      `}</style>
      <div className = "container px-2 mx-auto">
        <h2 className = "text-center text-[32px] about-title mb-12">
          <span className = "heading-2 inline-block">About</span>
        </h2>
        <div className = "about-flex-row flex flex-col md:flex-row justify-center items-center md:gap-8">
          {/* Left Slider (hidden on <md) */}
          <div
            ref={leftSliderRef}
            className = "slider-container hidden md:block md:w-1/3 opacity-0 invisible"
            style={{ transition: "opacity 0.5s ease" }}
          >
            <div className = "slides-track">
              {leftImageSlides.map((src, index) => (
                <div
                  key={`left-${index}`}
                  className = "slide-item"
                  style={{ display: 'block', margin: 0, padding: 0 }}
                >
                  <img
                    src={src}
                    alt={`Slide ${index + 1}`}
                    style={{ display: 'block', margin: 0, padding: 0, border: 0 }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className = "about-content text-center w-full md:w-1/3 flex items-center justify-center opacity-0">
            <p className = "text-lg leading-relaxed text-gray-300">
              Hello I am, Pratyush Nayak and I provide you with the services of
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
            className = "slider-container hidden md:block md:w-1/3 opacity-0 invisible"
            style={{ transition: "opacity 0.5s ease" }}
          >
            <div className = "slides-track">
              {rightImageSlides.map((src, index) => (
                <div
                  key={`right-${index}`}
                  className = "slide-item"
                >
                  <img
                    src={src}
                    alt={`Slide ${index + 1}`}
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