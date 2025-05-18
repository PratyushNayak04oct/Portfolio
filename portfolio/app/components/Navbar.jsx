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

  // Handle scroll event to apply sticky behavior
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Initial call to set correct state
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
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
      className = "fixed top-0 left-0 w-full z-50"
      style={{ 
        padding: isScrolled ? '8px 0' : '32px 0',
        transition: 'padding 0.3s ease',
        backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.85)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none'
      }}
    >
      <div className = "navbar-container w-[80vw] h-[12vh]">
        <div className = "relative z-10 h-full w-full bg-[#000000e3] border-2 border-[#666666] rounded-[16px] flex flex-row justify-between items-center px-8 content">
          <Link href="/">
            <h1 className = "gradient1 text-[20px] font-[700]">Pratyush Nayak</h1>
          </Link>
          
          <nav className = "hidden md:block">
            <ul className = "list-none flex flex-row gap-12 text-[#D9D9D9] font-[500]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <button 
            id="menu-button"
            className = "md:hidden text-white cursor-pointer"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            <Menu size={24} />
          </button>
        </div>

        {isMenuOpen && (
          <div 
            ref={mobileMenuRef}
            className = "absolute z-20 top-full left-0 w-full mt-2 rounded-[16px] overflow-hidden bg-[#000000] border-2 border-[#666666]"
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
      </div>
    </header>
  );
};

export default Navbar;