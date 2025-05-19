"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code, 
  PenTool, 
  Globe, 
  Zap,
  Box
} from 'lucide-react';
import "../globals.css"; 

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: 1,
    title: 'Website Development',
    icon: <Globe className = "w-5 h-5 text-primary-400 text-purple-600" />
  },
  {
    id: 2,
    title: 'UI/UX Design',
    icon: <PenTool className = "w-5 h-5 text-primary-400 text-purple-600" />
  },
  {
    id: 3,
    title: 'SEO Optimization',
    icon: <Code className = "w-5 h-5 text-primary-400 text-purple-600" />
  },
  {
    id: 4,
    title: 'Custom Web Application',
    icon: <Zap className = "w-5 h-5 text-primary-400 text-purple-600" />
  },
  {
    id: 5,
    title: '3D Model Designing',
    icon: <Box className = "w-5 h-5 text-primary-400 text-purple-600" />
  }
];

const Services = () => {
  const container = useRef();
  
  useGSAP(() => {
    gsap.fromTo(
      '.services-title',
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
      '.service-item',
      { opacity: 0, x: -50 },
      { 
        opacity: 1, 
        x: 0, 
        stagger: 0.3,
        duration: 0.7,
        delay: 1.5,
        scrollTrigger: {
          trigger: container.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, { scope: container });

  return (
    <section id="services" ref={container} className = "w-screen flex items-center justify-center md:mt-20">
      <div className = "container mx-auto px-4">
        <div className = "flex flex-col items-center justify-center gap-8 md:gap-20">
          <div className = "flex justify-center items-center">
            <h2 className = "heading-2 services-title text-[32px] text-center">
              Services
            </h2>
          </div>

          <div className = "w-full max-w-3xl">
            <div className = "grid grid-cols-1 md:grid-cols-2 gap-6 justify-items-center md:justify-items-start">
              {services.map((service) => (
                <div key={service.id} className = "service-item flex items-start space-x-3">
                  {service.icon}
                  <span className = "text-lg text-gray-200">{service.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;