"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { SiGmail } from "react-icons/si";
import { FaGithub, FaLinkedin, FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const socialLinks = [
  { id: 1, name: 'Gmail', icon: <SiGmail size={24} className = "text-[#D93025]"/>, url: 'mailto:pratyushnayak.14098@gmail.com' },
  { id: 2, name: 'GitHub', icon: <FaGithub size={24} />, url: 'https://github.com/PratyushNayak04oct' },
  { id: 3, name: 'LinkedIn', icon: <FaLinkedin size={24} className = "text-[#0A66C2]"/>, url: 'https://www.linkedin.com/in/pratyush-nayak-04oct/' },
  { id: 4, name: 'Twitter', icon: <FaSquareXTwitter size={24} />, url: 'https://x.com/PratyushNayak04' },
  { id: 5, name: 'Instagram', icon: <FaInstagramSquare size={24} className = "text-[#f61c65]"/>, url: 'https://www.instagram.com/p.r.a.t.i.k.l.e.o/' }
];

const Social = () => {
  const container = useRef();
  
  useGSAP(() => {
    gsap.fromTo(
      '.social-title',
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

    // Add animation for social icons
    gsap.fromTo(
      '.social-icon',
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.social-icons-container',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, { scope: container });

  return (
    <section id="social" ref={container} className = "w-full px-4 py-12 mb-16 md:mb-20">
      <div className = "max-w-md mx-auto">
        <h2 className = "text-center mb-8 md:mb-12 social-title text-2xl md:text-3xl lg:text-4xl">
          <span className = "heading-2 inline-block">Connect With Me</span>
        </h2>
        
        <div className = "social-icons-container grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {socialLinks.map((link) => (
            <a 
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className = "social-icon w-full h-16 md:h-12 md:w-12 rounded gradient-border flex items-center justify-center hover:bg-gray-800 transition-all duration-300 transform hover:scale-110"
              aria-label={link.name}
            >
              <div className = "flex md:block items-center">
                <span className = "mr-2 md:mr-0">{link.icon}</span>
                <span className = "text-sm md:hidden">{link.name}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Social;

