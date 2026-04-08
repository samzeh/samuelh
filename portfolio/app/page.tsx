'use client'

import React, { useState } from 'react'
import ImageFrame from './components/ImageFrame'
import { AnimatedName } from './components/AnimatedName'
import { FaBriefcase } from "react-icons/fa";
import Image from 'next/image';
import HighlightWrapper from './components/HighlightWrapper';
import { NameArrow, BuildArrow, DesignArrow } from './components/HomeArrow';
import ToolTip from './components/ToolTip';

const Home = () => {
  const [hoverKey, setHoverKey] = useState<'name' | 'builder' | 'design' | null>(null)
  const [imageHover, setImageHover] = useState<'lelamp' | 'socratica' | 'painting' | null>(null)
  const [nameFadeVersion, setNameFadeVersion] = useState(0)

  const handleNameHoverEnter = () => {
    setHoverKey('name')
    setNameFadeVersion((prev) => prev + 1)
  }

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
    <main className="flex flex-col mt-15 mx-2">
      <div className="flex flex-row items-center gap-3 relative">
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
          onMouseEnter={handleNameHoverEnter}
          onMouseLeave={() => setHoverKey(null)}
        >
          <HighlightWrapper active={hoverKey === 'name'} src="/yellow-highlight.svg">
            <AnimatedName animated={true}/>
          </HighlightWrapper>

          <span className={`text-lg text-[#F5900B] font-medium -mt-1.5 ${
            hoverKey && hoverKey !== 'name' ? 'opacity-20' : ''}`}>
            [1]
          </span>
        </div>

        {hoverKey === 'name' && (
          <div className="absolute left-[310px] top-0 pointer-events-none flex items-start gap-2">
            <div className="flex-shrink-0 -mt-5">
              <NameArrow animated className="rotate-[5deg] w-[min(500px,35vw)] h-auto" />
            </div>

            <div
              key={nameFadeVersion}
              className="name-text-fade-in flex flex-col items-start -mt-14 text-xl pt-12 w-83 h-38.25 max-w-[90vw] max-h-[60vw]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >

              <div className="flex flex-col items-start text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
                <div className="flex items-center gap-2">
                  <span className='text-[#F5900B] text-2xl mt-5'>
                    [1]
                  </span>
                  <AnimatedName animated={false} size={100} />
                </div>
                <span className="leading-10">
                  as the title suggests, i'm samuel! <br />
                </span>
                <span className="leading-4.5">
                  i’m currently studying systems design engineering @ uwaterloo hoping to focus on hci + tech.
                </span>
              </div>
            </div>
          </div>
        )}
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

          {hoverKey === 'builder' && (
            <div className="absolute left-[200px] top-35 pointer-events-none flex items-start gap-2">
              <div className="flex-shrink-0 -mt-5">
                <BuildArrow animated className="w-[min(600px,40vw)] h-auto" />
              </div>

              <div
                key={nameFadeVersion}
                className="name-text-fade-in flex flex-col items-start -mt-14 text-xl pt-12 w-83 h-38.25 max-w-[90vw] max-h-[60vw]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >

                <div className="flex flex-col items-start text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
                  <div className="flex items-center gap-2"  style={{ fontFamily: 'var(--font-body)' }}>
                    <span className='text-[#0CAEFF] text-2xl mt-17'>
                      [2] builder
                    </span>
                  </div>
                  <span className="text-main leading-4.5 mt-1">
                    i love building :) whether it be building tech or a new art piece, i’m all in.
                  </span>
                </div>
              </div>
            </div>
          )}
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
          
          <div
            className="relative"
            style={{ zIndex: getZ('lelamp') }}
            onMouseEnter={() => setImageHover('lelamp')}
            onMouseLeave={() => setImageHover(null)}
          >
            {imageHover === 'lelamp' && (
              <div className="absolute -top-5.5 left-[50%] -translate-x-[65%] pointer-events-none justify-center w-full">
                <div className="tooltip-pop">
                  <ToolTip tooltipText="lelamp :)" />
                </div>
              </div>
            )}
            <div
              className="transition-all duration-300 ease-out"
              style={{
              transform:
                imageHover === 'lelamp'
                  ? 'scale(1.1) rotate(12deg)'
                  : 'scale(1) rotate(0deg)',
              }}
            >
              <ImageFrame src="/lelamp.png" alt="lelamp" size="45px" rotation="-8.54deg" delay="0.08s"/>
            </div>
          </div>

          <div
            className="relative"
            style={{ zIndex: getZ('socratica') }}
            onMouseEnter={() => setImageHover('socratica')}
            onMouseLeave={() => setImageHover(null)}
          >
            {imageHover === 'socratica' && (
              <div className="absolute -top-5.5 left-[50%] -translate-x-[65%] pointer-events-none justify-center w-full">
                <div className="tooltip-pop">
                  <ToolTip tooltipText="socratica!" />
                </div>
              </div>
            )}
            <div
              className="transition-all duration-300 ease-out"
              style={{
                transform:
                  imageHover === 'socratica'
                    ? 'scale(1.1) rotate(-10.5deg)'
                    : 'scale(1) rotate(0deg)',
              }}
            >
              <ImageFrame
                src="/socratica.png"
                alt="socratica"
                size="45px"
                rotation="5.14deg"
                delay="0.16s"
              />
            </div>
          </div>

          <div
            className="relative"
            style={{ zIndex: getZ('painting') }}
            onMouseEnter={() => setImageHover('painting')}
            onMouseLeave={() => setImageHover(null)}
          >
            {imageHover === 'painting' && (
              <div className="absolute -top-5.5 left-[50%] -translate-x-[65%] pointer-events-none justify-center w-full">
                <div className="tooltip-pop">
                  <ToolTip tooltipText="ex-painter" />
                </div>
              </div>
            )}
            <div
              className="transition-all duration-300 ease-out"
              style={{
                transform:
                  imageHover === 'painting'
                    ? 'scale(1.1) rotate(10.39deg)'
                    : 'scale(1) rotate(0deg)',
              }}
            >
              <ImageFrame src="/painting.png" alt="painting" size="45px" rotation="-1.39deg" delay="0.24s"/>
            </div>
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

            {hoverKey === 'design' && (
              <div className="absolute left-[538px] top-36 pointer-events-none flex items-start gap-2">
                <div className="flex-shrink-0 -mt-5">
                  <DesignArrow animated className="w-[min(300px,20vw)] h-auto" />
                </div>

                <div
                  key={nameFadeVersion}
                  className="name-text-fade-in flex flex-col items-start -mt-14 text-xl pt-12 w-83 h-38.25 max-w-[90vw] max-h-[60vw]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >

                  <div className="flex flex-col items-start text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
                    <div className="flex items-center gap-2"  style={{ fontFamily: 'var(--font-body)' }}>
                      <span className='text-[#1BAD0B] text-2xl -mt-5'>
                        [3] design + tech
                      </span>
                    </div>
                    <span className="text-main leading-10">
                      i hate boring tech. <br />
                    </span>
                    <span className="text-main leading-4.5">
                      currently exploring touch designer, media pipe, and open cv ;)
                    </span>
                  </div>
                </div>
              </div>
            )}
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