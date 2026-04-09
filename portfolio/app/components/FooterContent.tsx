'use client'

import React, { useRef, useState } from 'react'
import FooterTransformableImage from './FooterTransformableImage'

const footerImages = [
  { id: 'backpack', src: '/items/backpack.png', alt: 'backpack', initial: { left: 50, top: 30, width: 147, height: 225, rotation: -4 } },   // left
  { id: 'airpod', src: '/items/airpod.png', alt: 'airpod', initial: { left: 300, top: 50, width: 150, height: 147, rotation: -4 } },       // middle-left
  { id: 'cobra', src: '/items/cobra.png', alt: 'cobra', initial: { left: 750, top: 40, width: 147, height: 80, rotation: -4 } },           // right
  { id: 'ipad', src: '/items/ipad.png', alt: 'ipad', initial: { left: 200, top: 150, width: 147, height: 215, rotation: -4 } },           // middle-left
  { id: 'macbook', src: '/items/macbook.png', alt: 'macbook', initial: { left: 550, top: 100, width: 147, height: 120, rotation: -4 } },  // middle-right
  { id: 'ti84', src: '/items/ti84.png', alt: 'ti84', initial: { left: 900, top: 180, width: 130, height: 245, rotation: -4 } },           // far-right
]

export default function FooterContent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [deselectSignal, setDeselectSignal] = useState(0)

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
          initial={item.initial}
          deselectSignal={deselectSignal}
        />
      ))}

      <div className="pointer-events-auto absolute left-0 right-0 px-8 bottom-5 text-[#514433] flex justify-between items-center">
        <a
          href="mailto:samzehuang@gmail.com"
          className="text-5xl hover:underline transition-all duration-200"
        >
          samzehuang [@] gmail [dot] com
        </a>

        {/* Links */}
        <div className="flex gap-7 text-xl mt-3 items-center text-heading">
          <a href="mailto:samzehuang@gmail.com" className="hover:underline transition-all duration-200 text-heading">
            email
          </a>
          <a href="https://www.linkedin.com/in/samuelzh" target="_blank" rel="noopener noreferrer" className="hover:underline transition-all duration-200">
            linkedin
          </a>
          <a href="https://github.com/samzeh" target="_blank" rel="noopener noreferrer" className="hover:underline transition-all duration-200">
            github
          </a>
          <a href="/path-to-backpack" className="bg-[#2F2211] text-lg text-[#FFFCF9] px-3 py-1 rounded-full hover:opacity-80 transition-opacity duration-200">
            backpack
          </a>
        </div>
      </div>
    </div>
  )
}
