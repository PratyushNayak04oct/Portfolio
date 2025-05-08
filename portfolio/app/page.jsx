"use client"

import React, { useRef } from 'react' ; 
import gsap from 'gsap' ; 
import { useGSAP } from '@gsap/react';
import Navbar from './components/Navbar';

gsap.registerPlugin(useGSAP) ; 

const Home = () => {

  const containerRef = useRef() ; 
  
  useGSAP(() =>{

  }, {scope: containerRef}) ; 

  return (
    <div ref = {containerRef} className = "w-screen overflow-x-hidden h-screen justify-center " id = "body">
        <Navbar />
        <div className = "h-screen w-screen"></div>
        <div className = "h-screen w-screen"></div>
        <div className = "h-screen w-screen"></div>
        <div className = "h-screen w-screen"></div>
    </div>
  )
}

export default Home
