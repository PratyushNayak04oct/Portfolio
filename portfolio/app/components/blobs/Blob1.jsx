"use client" ; 

import React from 'react';

const Blob1 = ({ width, height }) => {
  return (
    <div 
      className = "blob"
      style={{
        width,
        height,
        background: 'linear-gradient(to right, #006DFB 0%, #5E96E8 100%)',
        filter: 'blur(60px)',
        opacity: 0.5,
        borderRadius: '50%'
      }}
    />
  );
};

export default Blob1;