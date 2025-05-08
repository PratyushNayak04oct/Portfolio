"use client"

import React, { useRef } from 'react' ; 
import gsap from 'gsap' ; 
import { useGSAP } from '@gsap/react';
import Navbar from './components/Navbar';

gsap.registerPlugin(useGSAP) ; 

const Home = () => {

  const container = useRef() ; 
  
  useGSAP(() =>{

    

  }, {scope: container}) ; 

  return (
    <div ref = {container} className = "w-screen overflow-x-hidden h-screen" id = "body">
      <div className = "flex justify-center w-screen sticky top-0">
        <Navbar />
      </div>
      <div className = "h-screen"></div>
      <div className = "h-screen"></div>
      <div className = "h-screen"></div>

    </div>
  )
}

export default Home
