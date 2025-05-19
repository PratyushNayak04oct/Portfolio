"use client" ; 

import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className = "border-t border-gray-800 w-[100%]">
      <div className = "flex flex-col items-center justify-center">
        <h2 className = "text-[32px] font-bold text-center mt-12 mb-12">
          <span className = "heading-2 inline-block">Thank You for visiting</span>
        </h2>
        
        <div className = "grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">

          <div id = "quick-links">
            <h3 className = "text-lg font-semibold mb-4">Quick Links</h3>
            <ul className = "space-y-2">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#services">Services</a></li>
            </ul>
          </div>
          
          <div id = "foot-contact">
            <h3 className = "text-lg font-semibold mb-4">Contact</h3>
            <ul className = "space-y-4">
              <li className = "flex items-center space-x-3">
                <Mail size={18} className = "text-primary-400" />
                <a href = "mailto:pratyushnayak.14098@gmail.com" className = "text-gray-400 hover:text-white transition-colors">pratyushnayak.14098@gmail.com</a>
              </li>
              <li className = "flex items-center space-x-3">
                <Phone size={18} className = "text-primary-400" />
                <span className = "text-gray-400 hover:text-white transition-colors">+91 8249955434</span>
              </li>
            </ul>
          </div>
          
          <div className = "flex justify-center md:justify-end">
            <div className = "flex justify-center">
              <span className = "heading-3 text-[32px] font-semibold">Pratyush <br /> <span className = "heading-3">Nayak</span></span>
            </div>
          </div>
        </div>
        
        <div className = "mt-12 text-center text-sm text-gray-500 mb-4">
          <p>&copy; {new Date().getFullYear()} Pratyush Nayak. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;