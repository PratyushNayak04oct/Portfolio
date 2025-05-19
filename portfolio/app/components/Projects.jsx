"use client" ; 

import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ArrowRight, ArrowLeft } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'Ashelles Public School',
    description: 'School website with student management system',
    image: 'https://images.pexels.com/photos/2781814/pexels-photo-2781814.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tech: ['React', 'Node.js', 'MongoDB', 'Express']
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    description: 'Full-featured online store with payment integration',
    image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tech: ['React', 'Redux', 'Firebase', 'Stripe']
  },
  {
    id: 3,
    title: 'Task Management App',
    description: 'Productivity application with team collaboration features',
    image: 'https://images.pexels.com/photos/7654125/pexels-photo-7654125.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tech: ['Vue.js', 'Vuex', 'Node.js', 'PostgreSQL']
  },
  {
    id: 4,
    title: 'Travel Blog',
    description: 'Content platform for sharing travel experiences',
    image: 'https://images.pexels.com/photos/1051075/pexels-photo-1051075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tech: ['Next.js', 'GraphQL', 'Contentful', 'Vercel']
  },
  {
    id: 5,
    title: 'Healthcare Dashboard',
    description: 'Analytics platform for healthcare professionals',
    image: 'https://images.pexels.com/photos/7089401/pexels-photo-7089401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tech: ['Angular', 'D3.js', 'Firebase', 'Material UI']
  }
];

const Projects = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const container = useRef();
  const cardRef = useRef();
  
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
  
  const nextProject = () => {
    const nextIndex = currentProject === projects.length - 1 ? 0 : currentProject + 1;
    
    gsap.to(cardRef.current, {
      opacity: 0,
      x: -100,
      duration: 0.3,
      onComplete: () => {
        setCurrentProject(nextIndex);
        gsap.fromTo(cardRef.current,
          { opacity: 0, x: 100 },
          { opacity: 1, x: 0, duration: 0.3 }
        );
      }
    });
  };
  
  const prevProject = () => {
    const prevIndex = currentProject === 0 ? projects.length - 1 : currentProject - 1;
    
    gsap.to(cardRef.current, {
      opacity: 0,
      x: 100,
      duration: 0.3,
      onComplete: () => {
        setCurrentProject(prevIndex);
        gsap.fromTo(cardRef.current,
          { opacity: 0, x: -100 },
          { opacity: 1, x: 0, duration: 0.3 }
        );
      }
    });
  };

  return (
    <section id="projects" ref={container} className = "w-screen h-screen">
      <div className = "container mx-auto">
        <h2 className = "projects-title text-[32px] text-center mb-12">
          <span className = "heading-2 inline-block">Projects</span>
        </h2>
        
        <div className = "relative max-w-4xl mx-auto">
          <div className = "overflow-hidden rounded-lg gradient-border p-1">
            <div ref={cardRef} className = "project-card glass-effect rounded-lg p-6">
              <div className = "grid md:grid-cols-2 gap-6">
                <div className = "h-64 rounded-lg overflow-hidden">
                  <img 
                    src={projects[currentProject].image} 
                    alt={projects[currentProject].title} 
                    className = "w-full h-full object-cover"
                  />
                </div>
                <div className = "flex flex-col justify-between">
                  <div>
                    <h3 className = "text-xl font-semibold mb-2">{projects[currentProject].title}</h3>
                    <p className = "text-gray-300 mb-4">{projects[currentProject].description}</p>
                    <div className = "mb-4">
                      <p className = "text-sm text-gray-400 mb-2">Tech used:</p>
                      <div className = "flex space-x-2">
                        {projects[currentProject].tech.map((tech, index) => (
                          <div key={index} className = "tech-badge">{tech.charAt(0)}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <button className = "gradient-bg px-6 py-2 rounded-full text-sm font-medium">Live Site</button>
                    <button className = "ml-4 px-6 py-2 rounded-full text-sm font-medium border border-gray-600">Code</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className = "mt-6 flex justify-between items-center px-4">
            <button 
              onClick={prevProject}
              className = "w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <div className = "flex space-x-2">
              {projects.map((_, index) => (
                <div 
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    index === currentProject ? 'bg-primary-500' : 'bg-gray-600'
                  }`}
                  onClick={() => setCurrentProject(index)}
                />
              ))}
            </div>
            <button 
              onClick={nextProject}
              className = "w-10 h-10 rounded-full flex items-center justify-center bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;