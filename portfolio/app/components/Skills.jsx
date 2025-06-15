"use client";

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  RiNextjsFill, 
  RiReactjsFill, 
  RiJavascriptFill, 
  RiNodejsFill, 
  RiTailwindCssFill 
} from "react-icons/ri";
import { 
  SiMongodb,
  SiExpress
} from "react-icons/si";
import { 
  FaJava, 
  FaPython, 
  FaHtml5, 
  FaCss3 
} from "react-icons/fa";
import { DiMysql } from "react-icons/di";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const skills = [
  { id: 1, name: 'Next JS', icon: <RiNextjsFill className = "text-white" size={40}/> },
  { id: 2, name: 'React JS', icon: <RiReactjsFill className = "text-[#61DAFB]" size={40}/> },
  { id: 3, name: 'JavaScript', icon: <RiJavascriptFill className = "text-amber-300" size={40}/> },
  { id: 4, name: 'Node JS', icon: <RiNodejsFill className = "text-[#68A063]" size={40}/> },
  { id: 5, name: 'MongDB', icon: <SiMongodb className = "text-[#13AA52]" size={40}/> },
  { id: 6, name: 'Tailwind CSS', icon: <RiTailwindCssFill className = "text-[#38BDF8]" size={40}/> },
  { id: 7, name: 'Express JS', icon: <SiExpress className = "text-[#a3a3a3]" size={40}/> },
  { id: 8, name: 'Java', icon: <FaJava className = "text-[#EA2D2E]" size={40}/> },
  { id: 9, name: 'Python', icon: <FaPython className = "text-[#FFD43B]" size={40}/> },
  { id: 10, name: 'SQL', icon: <DiMysql className = "text-[#00758F] font-extrabold" size={44}/> },
  { id: 11, name: 'HTML', icon: <FaHtml5 className = "text-[#E34F26] font-extrabold" size={40}/> },
  { id: 12, name: 'CSS', icon: <FaCss3 className = "text-[#2965f1] font-extrabold" size={44}/> }
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
    
    gsap.fromTo(
      '.skill-card',
      { opacity: 0, x: -50 },
      { 
        opacity: 1, 
        x: 0, 
        stagger: 0.3,
        duration: 0.7,
        delay: 1,
        scrollTrigger: {
          trigger: container.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, { scope: container });

  return (
    <section id="skills" ref={container} className = "w-screen h-auto flex items-center justify-center md:mt-20 mt-12">
      <div className = "container mx-auto px-4">
        <h2 className = "text-[32px] text-center gradient-text mb-12 skills-title">
          <span className = "heading-2 inline-block">Skills</span>
        </h2>
        
        <div className = "px-4 md:px-20 max-w-6xl mx-auto">
          <div className = "grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {skills.map((skill) => (
              <div 
                key={skill.id} 
                className = "skill-card h-24 w-full rounded-lg glass-effect gradient-border flex flex-col items-center justify-center"
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
