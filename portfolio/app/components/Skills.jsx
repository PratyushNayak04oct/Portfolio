"use client" ; 

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';

const skills = [
  { id: 1, name: 'HTML5', icon: '❯' },
  { id: 2, name: 'CSS3', icon: '❯' },
  { id: 3, name: 'JavaScript', icon: '❯' },
  { id: 4, name: 'React', icon: '❯' },
  { id: 5, name: 'Node.js', icon: '❯' },
  { id: 6, name: 'MongoDB', icon: '❯' },
  { id: 7, name: 'Tailwind CSS', icon: '❯' },
  { id: 8, name: 'TypeScript', icon: '❯' }
];

const Skills = () => {
  const container = useRef();
  
  useGSAP(() => {
    gsap.fromTo(
      '.skills-title',
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
    <section id="skills" ref={container} className = "py-20 px-6">
      <div className = "container mx-auto">
        <h2 className = "text-2xl md:text-3xl font-semibold text-center gradient-text mb-12 skills-title">
          Skills
        </h2>
        
        <div className = "max-w-3xl mx-auto">
          <div className = "grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <div 
                key={skill.id} 
                className = "skill-icon h-24 w-full rounded-lg glass-effect gradient-border flex flex-col items-center justify-center"
              >
                <span className = "text-2xl mb-2 gradient-text">{skill.icon}</span>
                <span className = "text-sm text-gray-300">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;