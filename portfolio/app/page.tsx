'use client'

import React, { useState } from 'react'
import ImageFrame from './components/ImageFrame'
import { AnimatedName } from './components/AnimatedName'
import { FaBriefcase } from "react-icons/fa";
import Image from 'next/image';
import HighlightWrapper from './components/HighlightWrapper';

const Home = () => {
  const [hoverKey, setHoverKey] = useState<'name' | 'builder' | 'design' | null>(null)
  const [imageHover, setImageHover] = useState<'lelamp' | 'socratica' | 'painting' | null>(null)

  const getZ = (name: 'lelamp' | 'socratica' | 'painting') => {

    const defaultOrder = {
    socratica: 30,
    lelamp: 20,
    painting: 10,
  }
    if (!imageHover) return defaultOrder[name]

    const map = {
      lelamp: { lelamp: 30, socratica: 20, painting: 10 },
      socratica: { socratica: 30, lelamp: 20, painting: 10 },
      painting: { painting: 30, socratica: 20, lelamp: 10 },
    }

    return map[imageHover][name]
  }
  return (
    <main className="flex flex-col mt-7 mx-2">
      <div className="flex flex-row items-center gap-3">
        <div className={`transition-opacity duration-200 ${hoverKey ? 'opacity-20' : ''}`}>
          <ImageFrame src="/me.png" alt="profile picture" size="70px" rotation="-7.1deg" />
        </div>

        <h1 className={`text-5xl mt-5 ml-1 transition-opacity duration-200 ${hoverKey ? 'opacity-20' : ''}`}>
          i&apos;m
        </h1>

        <div
          className={`mb-3.5 ml-1 flex items-start gap-1 transition-opacity duration-200 ${
            hoverKey == 'builder' || hoverKey === 'design' ? 'opacity-20' : ''
          }`}
          onMouseEnter={() => setHoverKey('name')}
          onMouseLeave={() => setHoverKey(null)}
        >
          <HighlightWrapper active={hoverKey === 'name'} src="/yellow-highlight.svg">
            <AnimatedName />
          </HighlightWrapper>

          <span className={`text-lg text-[#F5900B] font-medium -mt-1.5 ${
            hoverKey && hoverKey !== 'name' ? 'opacity-20' : ''}`}>
            [1]
          </span>
        </div>
      </div>

      <div className="text-3xl flex gap-1">
        <span className={`transition-opacity duration-200 ${hoverKey ? 'opacity-20' : ''}`}>
          a
        </span>

        <span
          className={`font-[550] text-[#0CAEFF] cursor-pointer transition-opacity duration-200 ${
            hoverKey && hoverKey !== 'builder' ? 'opacity-20' : ''
          }`}
          onMouseEnter={() => setHoverKey('builder')}
          onMouseLeave={() => setHoverKey(null)}
        >
          <HighlightWrapper className="[&>img]:translate-y-0" active={hoverKey === 'builder'} src="/blue-highlight.svg">
            builder
          </HighlightWrapper>
        </span>

        <span className={`text-lg text-[#0CAEFF] font-medium -mt-1.5 ${
            hoverKey && hoverKey !== 'builder' ? 'opacity-20' : ''
          }`}>
          [2]
        </span>

        <span className={`transition-opacity duration-200 ${hoverKey ? 'opacity-20' : ''}`}>
          who loves to create at the
        </span>
      </div>

      <div className="text-3xl flex flex-col gap-1">
        <div className="flex gap-1 items-center">
          <span className={`${hoverKey ? 'opacity-20' : ''}`}>
            intersection of
          </span>

<div className={`flex -space-x-4 ${hoverKey ? 'opacity-20' : ''}`}>
  
  {/* LELAMP */}
  <div
    className="relative transition-all duration-300 ease-out"
    style={{
      zIndex: getZ('lelamp'),
      transform:
        imageHover === 'lelamp'
          ? 'scale(1.1) rotate(12deg)'
          : 'scale(1) rotate(0deg)',
    }}
    onMouseEnter={() => setImageHover('lelamp')}
    onMouseLeave={() => setImageHover(null)}
  >
    <ImageFrame src="/lelamp.png" alt="lelamp" size="45px" rotation="-8.54deg" delay="0.08s"/>
  </div>

  {/* SOCRATICA */}
  <div
    className="relative transition-all duration-300 ease-out"
    style={{ 
      zIndex: getZ('socratica'),
      transform:
        imageHover === 'socratica'
          ? 'scale(1.1) rotate(-10.5deg)'
          : 'scale(1) rotate(0deg)', 
    }}
    onMouseEnter={() => setImageHover('socratica')}
    onMouseLeave={() => setImageHover(null)}
  >
    <ImageFrame src="/socratica.png" alt="socratica" size="45px" rotation="5.14deg" delay="0.16s"/>
  </div>

  {/* PAINTING */}
  <div
    className="relative transition-all duration-300 ease-out"
    style={{
      zIndex: getZ('painting'),
      transform:
        imageHover === 'painting'
          ? 'scale(1.1) rotate(10.39deg)'
          : 'scale(1) rotate(0deg)',
    }}
    onMouseEnter={() => setImageHover('painting')}
    onMouseLeave={() => setImageHover(null)}
  >
    <ImageFrame src="/painting.png" alt="painting" size="45px" rotation="-1.39deg" delay="0.24s"/>
  </div>

</div>

          <span
            className={`font-[550] text-[#1BAD0B] cursor-pointer transition-opacity duration-200 ${
              hoverKey && hoverKey !== 'design' ? 'opacity-20' : ''}`}
            onMouseEnter={() => setHoverKey('design')}
            onMouseLeave={() => setHoverKey(null)}
          >
            <HighlightWrapper className="[&>img]:translate-y-0"active={hoverKey === 'design'} src="/green-highlight.svg">
              design + tech
            </HighlightWrapper>
          </span>

          <span className={`text-lg text-[#1BAD0B] font-medium -mt-5 ${
            hoverKey && hoverKey !== 'design' ? 'opacity-20' : ''}`}>
            [3]
          </span>
        </div>

        <hr className="border-t border-[#C0BDB9] w-45" />
      </div>

      <div className="flex items-center gap-1.5 text-[18px] text-detail mt-1.5">
        <FaBriefcase />
        <span>curr. tpm</span>
        <Image src="/needlist.png" alt="needlist logo" width={20} height={20} className="rounded"/>
        <span>needlist.org, swe</span>
        <Image src="/watai.png" alt="watai logo" width={20} height={20} className="rounded"/>
        <span>wat.ai</span>
      </div>
    </main>
  )
}

export default Home