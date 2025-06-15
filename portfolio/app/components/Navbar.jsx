"use client";

import React, { useRef, useState, useEffect } from 'react'; 
import Link from 'next/link';
import "../globals.css"; 
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const mobileMenuRef = useRef(null);
  const navbarRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle scroll effect for navbar styling
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && 
          !event.target.closest('#menu-button')) {
        setIsMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuRef.current) return;
    
    if (isMenuOpen) {
      const mobileMenu = mobileMenuRef.current;
      mobileMenu.style.opacity = "0";
      mobileMenu.style.transform = "translateY(-20px)";
      
      // Trigger reflow to ensure the animation works
      void mobileMenu.offsetWidth;
      
      mobileMenu.style.transition = "opacity 0.3s ease, transform 0.3s ease";
      mobileMenu.style.opacity = "1";
      mobileMenu.style.transform = "translateY(0)";
    }
  }, [isMenuOpen]);

  const navLinks = [
    { href: "#", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#project", label: "Projects" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <header 
      ref={navbarRef}
      className = "fixed top-10 left-0 right-0 w-full z-[999] flex justify-center transition-all duration-300"
      style={{ 
        position: 'fixed',
        top: '2.5rem', // 40px from top (top-10 in Tailwind)
        left: 0,
        right: 0,
        zIndex: 999
      }}
    >
      <div className = "w-[80vw] max-w-7xl">
        <div className={`flex flex-row items-center h-[10vh] w-full border-2 rounded-[16px] backdrop-blur-sm justify-between transition-all duration-300 px-4 ${
          isScrolled 
            ? 'bg-[#000000e6] border-[#888888] shadow-lg' 
            : 'bg-[#000000e6] border-[#666666]'
        }`}>
          <Link href="/">
            <h1 className = "gradient1 text-[20px] font-[700]">Pratyush Nayak</h1>
          </Link>
          
          <nav className = "hidden md:block">
            <ul className = "list-none flex flex-row gap-12 text-[#D9D9D9] font-[500]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className = "hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <button 
            id="menu-button"
            className = "md:hidden text-white cursor-pointer hover:text-gray-300 transition-colors"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div 
          ref={mobileMenuRef}
          className = "fixed z-[990] top-[calc(2.5rem+10vh+8px)] left-1/2 transform -translate-x-1/2 w-[80vw] rounded-[16px] overflow-hidden bg-[#000000e6] border-2 border-[#888888] backdrop-blur-sm shadow-lg"
        >
          <div className = "flex justify-end p-4">
            <button 
              onClick={toggleMenu}
              aria-label="Close menu"
              className = "text-white hover:text-gray-300 transition-colors cursor-pointer"
            >
              <X size={24} />
            </button>
          </div>
          <nav className = "px-8 pb-6">
            <ul className = "list-none flex flex-col gap-6 text-[#D9D9D9] font-[500]">
              {navLinks.map((link, index) => (
                <li key={index} className = "border-b border-[#666666] pb-2">
                  <a 
                    href={link.href}
                    onClick={toggleMenu}
                    className = "block w-full hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;