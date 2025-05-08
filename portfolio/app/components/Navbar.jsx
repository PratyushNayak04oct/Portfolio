"use client";
import React, { useRef } from 'react'; 
import Link from 'next/link';
import "../globals.css"; 
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Navbar = () => {
  const containerRef = useRef(null);
  const glowRef = useRef(null);
  const tlRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ paused: true, repeat: -1 });
    
    tl.to(glowRef.current, {
      backgroundPosition: "100% 50%",
      duration: 4,
      ease: "linear"
    });
    
    tl.to(
      glowRef.current,
      {
        top: "-4px",
        left: "-4px",
        right: "-4px",
        bottom: "-4px",
        duration: 1,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      },
      0
    );
    
    tlRef.current = tl;
    const el = containerRef.current;
    
    const handleEnter = () => {
      gsap.to(glowRef.current, { opacity: 1, duration: 0.3 });
      tl.play();
    };
    
    const handleLeave = () => {
      gsap.to(glowRef.current, { opacity: 0, duration: 0.3 });
      tl.pause(0);
    };
    
    el.addEventListener("mouseenter", handleEnter);
    el.addEventListener("mouseleave", handleLeave);
    
    return () => {
      el.removeEventListener("mouseenter", handleEnter);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div className = "relative mt-8 w-[80vw] h-[12vh]" ref={containerRef} id="navbar">
      <div
        ref={glowRef}
        className = "absolute -top-[2px] -left-[2px] -right-[2px] -bottom-[2px] rounded-[18px] z-0 opacity-0 pointer-events-none"
        style={{
          background: `linear-gradient(to right, #006DFB 0%, #5E96E8 26%, #00A6FB 45%, #7F01D3 85%, #7F01D3 100%)`,
          backgroundSize: "300% 300%",
          filter: "blur(12px)",
        }}
      />

      <div className = "content relative z-10 h-full w-full bg-[#00000081] border-2 border-[#A3A3A3] rounded-[16px] flex flex-row justify-between items-center px-8">
        <Link href = "/">
          <h1 className = "gradient1 text-[20px] font-[700]">Pratyush Nayak</h1>
        </Link>
        <nav>
          <ul className = "list-none flex flex-row gap-12 text-[#D9D9D9] font-[500]">
            <li><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#project">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;