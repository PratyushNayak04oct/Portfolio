"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Services from "./components/Services";
import Skills from "./components/Skills";
import Voices from "./components/Voices";
import Social from "./components/Social";
import Footer from "./components/Footer";

gsap.registerPlugin(ScrollTrigger);

// Loading Screen Component
const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Delay before hiding to show 100% completion
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
              onLoadingComplete();
            }, 500); // Wait for fade out animation
          }, 800);
          return 100;
        }
        // Simulate realistic loading with some randomness
        const increment = Math.random() * 15 + 5;
        return Math.min(prev + increment, 100);
      });
    }, 200);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <>
      <div className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-500 ${!isVisible ? 'opacity-0' : 'opacity-100'}`}>
        {/* Animated background grid */}
        <div className = "absolute inset-0 opacity-20">
          <div className = "absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 109, 251, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 109, 251, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'gridMove 10s linear infinite'
          }}></div>
        </div>

        {/* Glowing orbs */}
        <div className = "absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500 rounded-full opacity-20 blur-3xl animate-pulse"></div>
        <div className = "absolute bottom-1/4 right-1/4 w-24 h-24 bg-purple-500 rounded-full opacity-20 blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className = "absolute top-1/3 right-1/3 w-20 h-20 bg-cyan-500 rounded-full opacity-20 blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>

        {/* Main content */}
        <div className = "relative z-10 text-center px-4">
          {/* Main heading with gradient */}
          <h1 className = "text-4xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tight" style={{
            fontFamily: 'Raleway, sans-serif',
            background: 'linear-gradient(to right, #006DFB 0%, #5E96E8 26%, #00A6FB 45%, #7F01D3 85%, #7F01D3 100%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            textShadow: '0 0 30px rgba(0, 109, 251, 0.5)'
          }}>
            PRATYUSH NAYAK
          </h1>

          {/* Loading text with blinking animation */}
          <div className = "flex items-center justify-center mb-12 text-xl md:text-2xl text-gray-300">
            <span className = "mr-2 font-mono loading-text">
              LOADING
            </span>
            <div className = "flex space-x-1">
              <span className = "inline-block w-2 h-2 bg-white rounded-full dot-1"></span>
              <span className = "inline-block w-2 h-2 bg-white rounded-full dot-2"></span>
              <span className = "inline-block w-2 h-2 bg-white rounded-full dot-3"></span>
            </div>
          </div>

          {/* Progress bar */}
          <div className = "w-full max-w-md mx-auto">
            <div className = "flex justify-between items-center mb-2">
              <span className = "text-sm font-mono text-gray-400">INITIALIZING SYSTEM</span>
              <span className = "text-sm font-mono text-gray-400">{Math.round(progress)}%</span>
            </div>
            
            {/* Progress bar container */}
            <div className = "relative w-full h-2 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
              {/* Animated background */}
              <div className = "absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-10 shimmer"></div>
              
              {/* Progress fill */}
              <div 
                className = "h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500 rounded-full transition-all duration-300 ease-out relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                {/* Glowing effect */}
                <div className = "absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 progress-glow"></div>
              </div>
            </div>
            
            {/* Status text */}
            <div className = "mt-4 text-xs font-mono text-gray-500 text-center">
              {progress < 30 && "LOADING CORE MODULES..."}
              {progress >= 30 && progress < 60 && "INITIALIZING COMPONENTS..."}
              {progress >= 60 && progress < 90 && "OPTIMIZING PERFORMANCE..."}
              {progress >= 90 && "FINALIZING SETUP..."}
            </div>
          </div>

          {/* Circuit-like decorative elements */}
          <div className = "absolute -top-20 -left-20 w-40 h-40 opacity-20">
            <div className = "w-full h-full border border-blue-500 rounded-lg rotate-45 rotating-slow"></div>
          </div>
          <div className = "absolute -bottom-20 -right-20 w-32 h-32 opacity-20">
            <div className = "w-full h-full border border-purple-500 rounded-lg rotate-45 rotating-reverse"></div>
          </div>
        </div>
      </div>
    </>
  );
};

function Home() {
  const containerRef = useRef();
  const blobsContainerRef = useRef();
  const footerRef = useRef();
  const [documentHeight, setDocumentHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const lenisRef = useRef(null);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    // Only initialize Lenis after loading is complete
    if (isLoading) return;
    
    lenisRef.current = new Lenis({
      duration: 4, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false, 
      touchMultiplier: 1.5, 
      lerp: 0.08, 
      wheelMultiplier: 0.7,
      wheelEventsTarget: document.documentElement,
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
          height: window.innerHeight,
        };
      },
      pinType: document.documentElement.style.transform ? "transform" : "fixed",
    });

    // Update ScrollTrigger when Lenis scrolls
    lenisRef.current.on("scroll", ScrollTrigger.update);

    return () => {
      // Clean up
      if (lenisRef.current) {
        lenisRef.current.destroy();
        gsap.ticker.remove(lenisRef.current.raf);
      }
    };
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;

    const updateDocumentHeight = () => {
      if (footerRef.current) {
        const footerRect = footerRef.current.getBoundingClientRect();
        const footerBottom = footerRect.bottom + window.scrollY;
        setDocumentHeight(footerBottom);
      }
    };

    updateDocumentHeight();

    window.addEventListener("resize", updateDocumentHeight);

    const timer = setTimeout(updateDocumentHeight, 500);

    return () => {
      window.removeEventListener("resize", updateDocumentHeight);
      clearTimeout(timer);
    };
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) * 0.12;
      const moveY = (clientY - window.innerHeight / 2) * 0.12;
      const blobs = document.querySelectorAll(".blob");

      blobs.forEach((blob, index) => {
        const xOffset = index % 2 === 0 ? -1 : 1;
        const yOffset = Math.floor(index / 2) % 2 === 0 ? -1 : 1;

        gsap.to(blob, {
          x: moveX * xOffset,
          y: moveY * yOffset,
          duration: 0.6,
          ease: "power2.out",
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isLoading]);

  useEffect(() => {
    if (isLoading || !blobsContainerRef.current) return;

    gsap.to(blobsContainerRef.current, {
      y: () => -window.scrollY * 0.8,
      ease: "none",
      scrollTrigger: {
        start: 0,
        end: "max",
        invalidateOnRefresh: true,
        scrub: 0.1,
      },
    });
  }, [isLoading]);

  const scrollToSection = (sectionId) => {
    if (lenisRef.current) {
      const section = document.getElementById(sectionId);
      if (section) {
        lenisRef.current.scrollTo(section, {
          offset: -80,
          duration: 2.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    }
  };

  useGSAP(
    () => {
      if (isLoading) return;

      ScrollTrigger.refresh();

      gsap.utils.toArray("section:not(#home)").forEach((section) => {
        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      const projectCards = gsap.utils.toArray(".project-card");
      projectCards.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            x: 100,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: "#projects",
              start: "top 60%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
            delay: i * 0.2,
          }
        );
      });

      gsap.utils.toArray(".skill-icon").forEach((icon, i) => {
        gsap.fromTo(
          icon,
          {
            opacity: 0,
            scale: 0.8,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: "#skills",
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.utils.toArray(".testimonial").forEach((testimonial, i) => {
        gsap.fromTo(
          testimonial,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.15,
            scrollTrigger: {
              trigger: "#voices",
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      gsap.utils.toArray(".social-icon").forEach((icon, i) => {
        gsap.fromTo(
          icon,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: "#social",
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      const updateBlobsScale = () => {
        const blobs = document.querySelectorAll(".blob");
        const scale = window.innerWidth < 768 ? 0.25 : 1;

        blobs.forEach((blob) => {
          gsap.to(blob, {
            scale: scale,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      };

      updateBlobsScale();
      window.addEventListener("resize", updateBlobsScale);

      return () => {
        window.removeEventListener("resize", updateBlobsScale);
      };
    },
    { scope: containerRef, dependencies: [isLoading] }
  );

  const generateBlobs = () => {
    if (documentHeight === 0) return [];

    const blobSpacing = 500;
    const footerMargin = 300;
    const adjustedHeight = documentHeight - footerMargin;
    const numberOfBlobs = Math.ceil(adjustedHeight / blobSpacing);
    const blobs = [];

    const gradients = [
      "linear-gradient(to right, #006DFB 0%, #5E96E8 100%)",
      "linear-gradient(to right, #5E96E8 0%, #00A6FB 100%)",
      "linear-gradient(to right, #00A6FB 0%, #7F01D3 100%)",
    ];

    for (let i = 0; i < numberOfBlobs; i++) {
      const isRight = i % 2 === 0;
      let blobWidth = 600;
      let blobHeight = 600;
      let rightOffset = 264;
      let leftOffset = 304;

      if (isMobile) {
        blobWidth = 600 * 0.35;
        blobHeight = 600 * 0.35;
        rightOffset = 66;
        leftOffset = 76;
      }

      const positionStyle = isRight
        ? { right: `-${rightOffset}px` }
        : { left: `-${leftOffset}px` };

      const posY = i * blobSpacing;

      if (posY >= adjustedHeight) continue;

      const gradientIndex = i % gradients.length;

      blobs.push(
        <div
          key={i}
          className = "blob absolute"
          style={{
            background: gradients[gradientIndex],
            top: `${posY}px`,
            width: `${blobWidth}px`,
            height: `${blobHeight}px`,
            pointerEvents: "none",
            ...positionStyle,
          }}
        ></div>
      );
    }

    return blobs;
  };

  return (
    <div ref={containerRef} className = "bg-black relative overflow-x-hidden">
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      
      {/* Main Content - Only render when not loading */}
      {!isLoading && (
        <>
          <Navbar />
          
          <div
            ref={blobsContainerRef}
            className = "absolute -top-40 left-0 w-full pointer-events-none"
            style={{
              zIndex: 1,
              height: documentHeight > 0 ? `${documentHeight}px` : "100%",
            }}
          >
            {generateBlobs()}
          </div>

          <div className = "relative z-10 flex flex-col backdrop-blur-2xl">
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
        </>
      )}
    </div>
  );
}

export default Home;