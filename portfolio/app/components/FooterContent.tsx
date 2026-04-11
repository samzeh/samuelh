'use client'

import React, { useEffect, useRef, useState } from 'react'
import FooterTransformableImage from './FooterTransformableImage'

type ImageConfig = {
  id: string
  src: string
  alt: string
  desktop: { left: number; top: number; width: number; height: number; rotation: number }
  mobile: { left: number; top: number; width: number; height: number; rotation: number }
}

// Desktop positions are unchanged. Mobile positions are smaller and clustered
// along the top strip so the bottom bar stays fully visible.
const footerImages: ImageConfig[] = [
  {
    id: 'backpack',
    src: '/items/backpack.png',
    alt: 'backpack',
    desktop: { left: 50,  top: 30,  width: 147, height: 225, rotation: -4 },
    mobile:  { left: 20,  top: 245, width: 72,  height: 110, rotation: -10 },
  },
  {
    id: 'airpod',
    src: '/items/airpod.png',
    alt: 'airpod',
    desktop: { left: 300, top: 50,  width: 150, height: 147, rotation: -4 },
    mobile:  { left: 240, top: 100, width: 58,  height: 56,  rotation: 8 },
  },
  {
    id: 'cobra',
    src: '/items/cobra.png',
    alt: 'cobra',
    desktop: { left: 750, top: 40,  width: 147, height: 80,  rotation: -4 },
    mobile:  { left: 120, top: 185, width: 78,  height: 42,  rotation: -7 },
  },
  {
    id: 'ipad',
    src: '/items/ipad.png',
    alt: 'ipad',
    desktop: { left: 200, top: 150, width: 147, height: 215, rotation: -4 },
    mobile:  { left: 190, top: 265, width: 62,  height: 92,  rotation: 9 },
  },
  {
    id: 'macbook',
    src: '/items/macbook.png',
    alt: 'macbook',
    desktop: { left: 550, top: 100, width: 147, height: 120, rotation: -4 },
    mobile:  { left: 60,  top: 90,  width: 82,  height: 68,  rotation: -8 },
  },
  {
    id: 'ti84',
    src: '/items/ti84.png',
    alt: 'ti84',
    desktop: { left: 900, top: 180, width: 130, height: 245, rotation: -4 },
    mobile:  { left: 300, top: 225, width: 44,  height: 82,  rotation: 6 },
  },
]

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`)
    setIsMobile(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [breakpoint])
  return isMobile
}

export default function FooterContent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [deselectSignal, setDeselectSignal] = useState(0)
  const isMobile = useIsMobile()

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) setDeselectSignal((prev) => prev + 1)
      }}
    >
      {footerImages.map((item) => (
        <FooterTransformableImage
          key={item.id}
          containerRef={containerRef}
          src={item.src}
          alt={item.alt}
          initial={isMobile ? item.mobile : item.desktop}
          deselectSignal={deselectSignal}
          disabled={isMobile}
        />
      ))}

      <div className="pointer-events-auto absolute left-0 right-0 px-4 md:px-8 bottom-5 text-[#514433] flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-0">
        
        <a
          href="mailto:samzehuang@gmail.com"
          className="text-xl md:text-5xl hover:underline transition-all duration-200 leading-tight"
        >
          samzehuang [@] gmail [dot] com
        </a>

        <div className="flex gap-4 md:gap-7 text-sm md:text-xl items-center text-heading">
          <a href="mailto:samzehuang@gmail.com" className="hover:underline transition-all duration-200 text-heading">
            email
          </a>
          <a href="https://www.linkedin.com/in/samuelzh" target="_blank" rel="noopener noreferrer" className="hover:underline transition-all duration-200">
            linkedin
          </a>
          <a href="https://github.com/samzeh" target="_blank" rel="noopener noreferrer" className="hover:underline transition-all duration-200">
            github
          </a>
          <a href="/path-to-backpack" className="bg-[#2F2211] text-xs md:text-lg text-[#FFFCF9] px-3 py-1 rounded-full hover:opacity-80 transition-opacity duration-200">
            backpack
          </a>
        </div>
      </div>
    </div>
  )
}