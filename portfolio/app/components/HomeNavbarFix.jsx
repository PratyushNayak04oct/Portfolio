
"use client";

import React from 'react';
import { useEffect } from 'react';

// This component handles the necessary changes to fix the Home.jsx integration
const HomeNavbarFix = () => {
  useEffect(() => {
    // This script will run after component mount
    // It ensures the navbar is excluded from Lenis smooth scrolling
    
    const setupScrollExclusion = () => {
      // Find all elements that need to be excluded from smooth scrolling
      const navbarElement = document.querySelector('header');
      
      if (navbarElement) {
        // Add data attribute that Lenis can use to exclude elements
        navbarElement.setAttribute('data-lenis-prevent', '');
        
        // Ensure high z-index is applied
        if (window.getComputedStyle(navbarElement).zIndex < 900) {
          navbarElement.style.zIndex = '999';
        }
      }
    };
    
    // Run immediately
    setupScrollExclusion();
    
    // Also run after a short delay to ensure DOM is fully loaded
    const timer = setTimeout(setupScrollExclusion, 100);
    
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default HomeNavbarFix;