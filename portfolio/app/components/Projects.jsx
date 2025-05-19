"use client" ; 

import React, { useRef, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { FaGithub } from "react-icons/fa";

const projects = [
  {
    id: 1,
    title: 'Portfolio Website',
    description: 'This site showcases my work, skills, and the services I offer—from creating responsive websites to building full-stack web applications. Explore my projects, learn more about what I do.',
    image: 'https://images.pexels.com/photos/2781814/pexels-photo-2781814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tech: ['Next JS', 'React JS', 'Tailwind','MongoDB'],
    repoUrl: 'https://github.com/PratyushNayak04oct/Portfolio'
  },
  {
    id: 2,
    title: 'Bro Science EduServices',
    description: 'This website is a central hub for students, parents, and staff to access important information, updates, and resources. Discover our academic programs, events, faculty, and more as we work together to create a supportive and enriching learning environment.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tech: ['React', 'Tailwind'],
    repoUrl: 'https://github.com/PratyushNayak04oct/Bro-Science-Eduservices-v2'
  },
  {
    id: 3,
    title: 'Campus Exchange',
    description: 'The "Campus Exchange" project aims to provide a digital marketplace for college students to buy and sell products and services, along with a Free Library Section where students can voluntarily upload and access study materials, previous year questions, and problem solutions. The platform ensures a secure and user-friendly experience for students.',
    image: 'https://images.pexels.com/photos/7654125/pexels-photo-7654125.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tech: ['React JS', 'Express JS', 'Node JS', 'MongoDB'],
    repoUrl: 'https://github.com/Banerjee2021/Campus-Exchange'
  },
  {
    id: 4,
    title: 'Ashelles Public School',
    description: 'This website is a central hub for students, parents, and staff to access important information, updates, and resources. Discover our academic programs, events, faculty, and more as we work together to create a supportive and enriching learning environment.',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tech: ['React', 'Tailwind'],
    repoUrl: 'https://github.com/PratyushNayak04oct/Ashelles-Public-School'
  },
  {
    id: 5,
    title: 'Enhanced Visual Cryptography Scheme (EVCS)',
    description: 'A secure image encryption method combining Simulated Annealing and Iterated Conditional Mode to generate protected, meaningless shares with meaningful cover images. This approach solves pixel expansion issues, improves visual quality, and ensures data privacy, making it ideal for sensitive sectors like healthcare and banking.',
    image: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tech: ['Java' , 'Research Work'],
    repoUrl: 'https://github.com/PratyushNayak04oct/EVCS-APP'
  }
];

const Projects = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [autoplayPaused, setAutoplayPaused] = useState(false);
  const container = useRef();
  const cardRef = useRef();
  const autoplayTimerRef = useRef(null);
  
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
  }, { scope: container });
  
  // Function to handle transitions with consistent animation
  const transitionToProject = (nextIndex) => {
    if (nextIndex === currentProject) return;
    
    const direction = nextIndex > currentProject ? -100 : 100;
    const oppositeDirection = direction * -1;
    
    gsap.to(cardRef.current, {
      opacity: 0,
      x: direction,
      duration: 0.3,
      onComplete: () => {
        setCurrentProject(nextIndex);
        gsap.fromTo(cardRef.current,
          { opacity: 0, x: oppositeDirection },
          { opacity: 1, x: 0, duration: 0.3 }
        );
      }
    });
  };
  
  const nextProject = () => {
    const nextIndex = currentProject === projects.length - 1 ? 0 : currentProject + 1;
    transitionToProject(nextIndex);
    resetAutoplayTimer();
  };
  
  const prevProject = () => {
    const prevIndex = currentProject === 0 ? projects.length - 1 : currentProject - 1;
    transitionToProject(prevIndex);
    resetAutoplayTimer();
  };
  
  const goToProject = (index) => {
    transitionToProject(index);
    resetAutoplayTimer();
  };
  
  const resetAutoplayTimer = () => {
    // Temporarily pause autoplay when user interacts
    setAutoplayPaused(true);
    
    // Clear existing timer
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
    }
    
    // Resume autoplay after 15 seconds of inactivity
    autoplayTimerRef.current = setTimeout(() => {
      setAutoplayPaused(false);
    }, 15000);
  };
  
  // Set up autoplay
  useEffect(() => {
    const autoplayInterval = setInterval(() => {
      if (!autoplayPaused) {
        const nextIndex = currentProject === projects.length - 1 ? 0 : currentProject + 1;
        transitionToProject(nextIndex);
      }
    }, 8000); // 8 seconds as requested
    
    return () => {
      clearInterval(autoplayInterval);
      if (autoplayTimerRef.current) {
        clearTimeout(autoplayTimerRef.current);
      }
    };
  }, [currentProject, autoplayPaused]);
  
  // Mouse enter/leave handlers to pause/resume autoplay
  const handleMouseEnter = () => {
    setAutoplayPaused(true);
  };
  
  const handleMouseLeave = () => {
    setAutoplayPaused(false);
  };

  return (
    <section id="projects" ref={container} className = "w-screen flex items-center justify-center md:mb-20 mb-12 md:mt-20 mt-12">
      <div className = "container flex flex-col items-center justify-center">
        <h2 className = "projects-title text-[32px] text-center mb-12">
          <span className = "heading-2 inline-block">Projects</span>
        </h2>
        
        <div className = "relative flex justify-center w-full">
          <div 
            className = "overflow-hidden rounded-lg gradient-border p-1 w-[90vw] md:w-[80vw] mx-auto"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div ref={cardRef} className = "project-card glass-effect rounded-lg md:p-12 p-4 md:h-[76vh] h-auto overflow-y-auto">
              <div className = "flex flex-col md:grid md:grid-cols-2 gap-6 h-full">
                {/* Image container - fixed height ratio */}
                <div className = "rounded-lg overflow-hidden mb-4 md:mb-0 h-56 md:h-auto md:min-h-full">
                  <img 
                    src={projects[currentProject].image} 
                    alt={projects[currentProject].title} 
                    className = "w-full h-full object-cover"
                  />
                </div>
                
                {/* Content container - scrollable if needed */}
                <div className = "flex flex-col justify-between h-full md:max-h-full md:overflow-y-auto">
                  <div>
                    <h3 className = "text-xl font-semibold mb-2">{projects[currentProject].title}</h3>
                    <p className = "text-gray-300 mb-4">{projects[currentProject].description}</p>
                    <div className = "mb-6">
                      <p className = "text-sm text-gray-400 mb-2">Tech used:</p>
                      <div className = "flex flex-wrap gap-2">
                        {projects[currentProject].tech.map((tech, index) => (
                          <div key={index} className = "tech-badge">{tech}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Buttons - stay at bottom */}
                  <div className = "flex flex-wrap gap-4 mb-2 mt-auto">
                    <button className = "gradient-bg px-6 py-2 rounded-[8px] text-sm font-medium cursor-pointer">
                      Live Site
                    </button>
                    <a 
                      href={projects[currentProject].repoUrl} 
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
          </div>
          
          {/* Navigation controls - adjust positioning for mobile */}
          <div className = "mt-6 flex justify-between items-center px-4 w-[90vw] md:w-[80vw] absolute bottom-[-3rem]">
            <button 
              onClick={prevProject}
              className = "w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer"
              aria-label="Previous project"
            >
              <ArrowLeft size={18} />
            </button>
            <div className = "flex space-x-2">
              {projects.map((_, index) => (
                <div 
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 cursor-pointer ${
                    index === currentProject ? 'bg-white' : 'bg-gray-600'
                  }`}
                  onClick={() => goToProject(index)}
                  aria-label={`Go to project ${index + 1}`}
                  role="button"
                />
              ))}
            </div>
            <button 
              onClick={nextProject}
              className = "w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer"
              aria-label="Next project"
            >
              <ArrowRight size={18} />
            </button>
          </div>
          
          {/* Autoplay indicator - adjust positioning for mobile */}
          {autoplayPaused && (
            <div className = "absolute bottom-[-5rem] text-xs text-gray-400">
              Autoplay paused. Hover out to resume.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Projects;