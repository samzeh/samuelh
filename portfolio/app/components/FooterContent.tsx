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
    desktop: { left: 30,  top: 20,  width: 147, height: 225, rotation: -4 },
    mobile:  { left: 10,  top: 280, width: 75,  height: 115, rotation: -6 },
  },
  {
    id: 'airpod',
    src: '/items/airpod.png',
    alt: 'airpod',
    desktop: { left: 270, top: 30,  width: 185, height: 160, rotation: 2 },
    mobile:  { left: 220, top: 40,  width: 90,  height: 78,  rotation: 5 },
  },
  {
    id: 'macbook',
    src: '/items/macbook.png',
    alt: 'macbook',
    desktop: { left: 530, top: 55,  width: 200, height: 155, rotation: -8 },
    mobile:  { left: 50,  top: 60,  width: 100, height: 78,  rotation: -8 },
  },
  {
    id: 'cobra',
    src: '/items/cobra.png',
    alt: 'cobra',
    desktop: { left: 740, top: 20,  width: 160, height: 85,  rotation: -5 },
    mobile:  { left: 115, top: 170, width: 90,  height: 48,  rotation: -5 },
  },
  {
    id: 'ipad',
    src: '/items/ipad.png',
    alt: 'ipad',
    desktop: { left: 175, top: 130, width: 160, height: 235, rotation: 6 },
    mobile:  { left: 120, top: 260, width: 75,  height: 110, rotation: 4 },
  },
  {
    id: 'pencil',
    src: '/items/pencil.png',
    alt: 'pencil',
    desktop: { left: 530, top: 185, width: 40,  height: 215, rotation: -30 },
    mobile:  { left: 230, top: 210, width: 14,  height: 75,  rotation: -25 },
  },
  {
    id: 'charger',
    src: '/items/charger.png',
    alt: 'charger',
    desktop: { left: 760, top: 200, width: 150, height: 255, rotation: 3 },
    mobile:  { left: 10,  top: 155, width: 65,  height: 110, rotation: -4 },
  },
  {
    id: 'ti84',
    src: '/items/ti84.png',
    alt: 'ti84',
    desktop: { left: 960, top: 90,  width: 130, height: 255, rotation: 4 },
    mobile:  { left: 295, top: 120, width: 60,  height: 118, rotation: 5 },
  },
  {
    id: 'paper',
    src: '/items/paper.png',
    alt: 'paper',
    desktop: { left: 1130, top: 10,  width: 190, height: 230, rotation: 10 },
    mobile:  { left: 240, top: 310, width: 50,  height: 65,  rotation: 8 },
  },
  {
    id: 'water',
    src: '/items/water.png',
    alt: 'water',
    desktop: { left: 1360, top: 110, width: 125, height: 280, rotation: 5 },
    mobile:  { left: 318, top: 260, width: 50,  height: 112, rotation: -12 },
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