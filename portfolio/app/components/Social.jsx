"use client" ; 

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { SiGmail } from "react-icons/si";
import { FaGithub, FaLinkedin, FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const socialLinks = [
  { id: 1, name: 'Gmail', icon: <SiGmail size={24} className = "text-[#D93025]"/>, url: 'https://github.com/' },
  { id: 2, name: 'GitHub', icon: <FaGithub size={24} />, url: 'https://github.com/' },
  { id: 3, name: 'LinkedIn', icon: <FaLinkedin size={24} className = "text-[#0A66C2]"/>, url: 'https://linkedin.com/' },
  { id: 4, name: 'Twitter', icon: <FaSquareXTwitter size={24} />, url: 'https://twitter.com/' },
  { id: 5, name: 'Instagram', icon: <FaInstagramSquare size={24} className = "text-[#f61c65]"/>, url: 'https://instagram.com/' }
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
  }, { scope: container });

  return (
    <section id="social" ref={container} className = "w-screen flex items-center justify-center my-12 mb-20">
      <div className = "container flex-col items-center justify-center">
        <h2 className = "text-center mb-12 social-title text-[32px] ">
          <span className = "heading-2 inline-block">Connect With Me</span>
        </h2>
        
        <div className = "flex justify-center space-x-6">
          {socialLinks.map((link) => (
            <a 
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className = "social-icon w-12 h-12  gradient-border flex items-center justify-center hover:bg-gray-800 transition-colors"
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Social;