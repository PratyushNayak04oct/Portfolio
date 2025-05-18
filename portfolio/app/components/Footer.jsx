"use client" ; 

import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className = "py-16 px-6 border-t border-gray-800">
      <div className = "container mx-auto">
        <h2 className = "text-2xl font-semibold text-center mb-10">
          Thank You for visiting
        </h2>
        
        <div className = "grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
          <div>
            <h3 className = "text-lg font-medium mb-4">Quick Links</h3>
            <ul className = "space-y-2">
              <li><a href="#home" className = "text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#about" className = "text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#projects" className = "text-gray-400 hover:text-white transition-colors">Projects</a></li>
              <li><a href="#services" className = "text-gray-400 hover:text-white transition-colors">Services</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className = "text-lg font-medium mb-4">Contact</h3>
            <ul className = "space-y-4">
              <li className = "flex items-center space-x-3">
                <Mail size={18} className = "text-primary-400" />
                <span className = "text-gray-300">pratyushnayak1995@gmail.com</span>
              </li>
              <li className = "flex items-center space-x-3">
                <Phone size={18} className = "text-primary-400" />
                <span className = "text-gray-300">+91 9999999999</span>
              </li>
            </ul>
          </div>
          
          <div className = "flex justify-center md:justify-end">
            <div className = "w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center">
              <span className = "text-lg font-semibold">PN</span>
            </div>
          </div>
        </div>
        
        <div className = "mt-12 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Pratyush Nayak. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;