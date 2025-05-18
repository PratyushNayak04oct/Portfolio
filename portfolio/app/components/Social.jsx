"use client" ; 

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';

const socialLinks = [
  { id: 1, name: 'GitHub', icon: <Github size={24} />, url: 'https://github.com/' },
  { id: 2, name: 'LinkedIn', icon: <Linkedin size={24} />, url: 'https://linkedin.com/' },
  { id: 3, name: 'Twitter', icon: <Twitter size={24} />, url: 'https://twitter.com/' },
  { id: 4, name: 'Instagram', icon: <Instagram size={24} />, url: 'https://instagram.com/' }
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
    <section id="social" ref={container} className = "w-[100%]">
      <div className = "container mx-auto">
        <h2 className = "text-2xl md:text-3xl font-semibold text-center gradient-text mb-12 social-title">
          Connect With Me
        </h2>
        
        <div className = "flex justify-center space-x-6">
          {socialLinks.map((link) => (
            <a 
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className = "social-icon w-12 h-12 rounded-full gradient-border flex items-center justify-center hover:bg-gray-800 transition-colors"
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