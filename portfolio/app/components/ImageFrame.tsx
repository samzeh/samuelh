'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image';

const ImageFrame = (props: {
  src: string;
  alt: string;
  size: string;
  rotation?: string;
  className?: string;
  /** Stagger entrance (e.g. "0.12s") */
  delay?: string;
}) => {
  const [playEntrance, setPlayEntrance] = useState(false)

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      setPlayEntrance(true)
    })
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <div
      className={`${props.className ?? ''} ${playEntrance ? 'animate-image-frame-pop' : 'opacity-0'}`}
      style={{
        width: props.size,
        height: props.size,
        ...(playEntrance && props.delay ? { animationDelay: props.delay } : {}),
      }}
    >
      <div
        className="relative h-full w-full"
        style={{ transform: `rotate(${props.rotation ?? "0deg"})` }}
      >
      {/* Outer pseudo-border with gradient background, rounded corners, and drop shadow */}
      <div 
        className="absolute inset-0 rounded-[18px] overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #D9D9D9 0%, #FFFFFF 50%, #D9D9D9 100%)',
          padding: '3px',
          boxShadow: '0 0 4px 0 rgba(0, 0, 0, 0.15)',
          backgroundClip: 'padding-box',
        }}
      >
        {/* Gradient stroke layer */}
        <div 
          className="absolute inset-0 rounded-[18px] pointer-events-none"
          style={{
            background: 'linear-gradient(135deg, #E2E2E2, #C3C3C3)',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
            padding: '.5px',
          }}
        />
        
        {/* Inner border directly around image */}
        <div 
          className="relative w-full h-full rounded-[15px] overflow-hidden"
          style={{
            border: '0.25px solid #C9C9C9',
          }}
        >
          <Image 
            src={props.src} 
            alt={props.alt} 
            fill
            style={{ objectFit: 'cover' }}
            sizes={props.size}
          />
        </div>
      </div>
      </div>
    </div>
  )
}

export default ImageFrame
