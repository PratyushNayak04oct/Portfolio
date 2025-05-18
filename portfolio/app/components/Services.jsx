"use client" ; 

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { 
  Code, 
  PenTool, 
  Globe, 
  Smartphone, 
  Database, 
  Zap 
} from 'lucide-react';

const services = [
  {
    id: 1,
    title: 'Website Development',
    icon: <Globe className = "w-5 h-5 text-primary-400" />
  },
  {
    id: 2,
    title: 'UI/UX Design',
    icon: <PenTool className = "w-5 h-5 text-primary-400" />
  },
  {
    id: 3,
    title: 'Mobile App Development',
    icon: <Smartphone className = "w-5 h-5 text-primary-400" />
  },
  {
    id: 4,
    title: 'Custom Web Applications',
    icon: <Code className = "w-5 h-5 text-primary-400" />
  },
  {
    id: 5,
    title: 'Database Design',
    icon: <Database className = "w-5 h-5 text-primary-400" />
  },
  {
    id: 6,
    title: 'Performance Optimization',
    icon: <Zap className = "w-5 h-5 text-primary-400" />
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
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.1,
        duration: 0.5,
        scrollTrigger: {
          trigger: container.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, { scope: container });

  return (
    <section id="services" ref={container} className = "py-20 px-6">
      <div className = "container mx-auto">
        <h2 className = "text-2xl md:text-3xl font-semibold text-center gradient-text mb-12 services-title">
          Services
        </h2>
        
        <div className = "max-w-3xl mx-auto">
          <div className = "grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div key={service.id} className = "service-item flex items-start space-x-3">
                {service.icon}
                <span className = "text-lg text-gray-200">{service.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;