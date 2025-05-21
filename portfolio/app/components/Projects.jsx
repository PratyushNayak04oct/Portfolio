"use client";

import React, { useRef } from 'react';
import { FaGithub } from "react-icons/fa";
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: 'Portfolio Website',
    description: 'My personal portfolio showcasing my projects and skills. Built with Next.js, React, and GSAP animations.',
    image: 'https://k6nwq7ukojmfdzo6.public.blob.vercel-storage.com/proejcts/portfolio-image-3DXoyPFgn8IsUQXY68UhUAomAlCyPx.png',
    repoUrl: 'https://github.com/PratyushNayak04oct/Portfolio',
    liveUrl: 'https://pratyush-nayak.vercel.app/',
    isLive: true
  },
  {
    id: 2,
    title: 'Bro Science EduServices',
    description: 'An educational platform offering science courses and resources for students. Features user authentication and course management.',
    image: 'https://k6nwq7ukojmfdzo6.public.blob.vercel-storage.com/proejcts/bro-science-lTNqgur8W6T3k58UDL0gNBHYo7L1Pr.png',
    repoUrl: 'https://github.com/PratyushNayak04oct/Bro-Science-Eduservices-v2',
    isLive: false
  },
  {
    id: 3,
    title: 'Campus Exchange',
    description: 'A marketplace application for college students to buy, sell, and exchange items within their campus community.',
    image: 'https://k6nwq7ukojmfdzo6.public.blob.vercel-storage.com/proejcts/campus-exchange-EBx89XCGNxuSq2p0r3mdi30R7YSZnR.png',
    repoUrl: 'https://github.com/Banerjee2021/Campus-Exchange',
    isLive: false
  },
  {
    id: 4,
    title: 'Ashelles Public School',
    description: 'A comprehensive school management system with features for administration, teachers, students, and parents.',
    image: 'https://k6nwq7ukojmfdzo6.public.blob.vercel-storage.com/proejcts/ashelles-public-school-JwKqGrJkqv33IeNn60sinAvA9OaY3S.png',
    repoUrl: 'https://github.com/PratyushNayak04oct/Ashelles-Public-School',
    isLive: false
  },
  {
    id: 5,
    title: 'Enhanced Visual Cryptography Scheme (EVCS)',
    description: 'An implementation of visual cryptography techniques for secure image encryption and decryption with enhanced visual quality.',
    image: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    repoUrl: 'https://github.com/PratyushNayak04oct/EVCS-APP',
    isLive: false
  }
];

const Projects = () => {
  const container = useRef();
  
  useGSAP(() => {
    gsap.fromTo(
      '.projects-title',
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
      '.project-card',
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.2,
        duration: 0.7,
        scrollTrigger: {
          trigger: container.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, { scope: container });

  return (
    <section id="projects" ref={container} className = "w-screen flex items-center justify-center md:mb-20 mb-12 md:mt-20 mt-12">
      <div className = "container flex flex-col items-center justify-center">
        <h2 className = "text-[32px] text-center mb-12">
          <span className = "heading-2 projects-title inline-block">Projects</span>
        </h2>
        
        <div className = "grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4">
          {projects.map((project) => (
            <div key={project.id} className = "project-card gradient-border rounded-lg p-1">
              <div className = "glass-effect rounded-lg overflow-hidden flex flex-col h-full">
                <div className = "w-full h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className = "w-full h-full object-contain bg-gray-900"
                  />
                </div>
                
                {/* Project info */}
                <div className = "p-6 flex flex-col flex-grow">
                  <h3 className = "text-xl font-semibold mb-2">{project.title}</h3>
                  <p className = "text-sm text-gray-300 mb-4 flex-grow">{project.description}</p>
                  
                  <div className = "flex flex-wrap gap-4 mt-auto">
                    {project.isLive ? (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className = "gradient-bg px-6 py-2 rounded-[8px] text-sm font-medium cursor-pointer"
                      >
                        Live Site
                      </a>
                    ) : (
                      <button 
                        className = "gradient-bg opacity-50 px-6 py-2 rounded-[8px] text-sm font-medium cursor-not-allowed"
                        disabled
                      >
                        Coming Soon
                      </button>
                    )}
                    <a 
                      href={project.repoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className = "github-btn px-6 py-2 rounded-[8px] text-sm font-medium border border-gray-600 cursor-pointer relative overflow-hidden group inline-flex"
                    >
                      <span className = "absolute inset-0 w-0 bg-gradient-to-r from-[#006DFB] via-[#00A6FB] to-[#7F01D3] transition-all duration-300 ease-out group-hover:w-full"></span>
                      <span className = "flex items-center justify-center relative z-10 group-hover:text-white transition-colors duration-300">
                        <FaGithub size={16} className = "mr-2" />
                        Code
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;