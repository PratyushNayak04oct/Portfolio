"use client"

import React from 'react' ; 
import Link from 'next/link';
import "../globals.css" ; 

const Navbar = () => {
  return (
    <div id = "navbar" className = "h-[12vh] w-[80vw] bg-[#00000081] border-2 border-[#A3A3A3] rounded-[16px] mt-8  flex flex-row justify-between items-center px-8">
        <Link href = "/" className = "gradient1 text-[20px] font-[700]">Pratyush Nayak</Link>

        <nav>
            <ul className = "list-none flex flex-row gap-12 text-[#D9D9D9] font-[500]">
                <li><a href = "#">Home</a></li>
                <li><a href = "#about">About</a></li>
                <li><a href = "#project">Projects</a></li>
                <li><a href = "#contact">Contact</a></li>
            </ul>
        </nav>
    </div>
  )
}

export default Navbar
