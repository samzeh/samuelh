'use client'

import { useCallback, useState } from 'react'
import ImageFrame from '../ImageFrame'
import { AnimatedName } from '../AnimatedName'
import HighlightWrapper from '../HighlightWrapper'
import { NameArrow, BuildArrow, DesignArrow } from '../HomeArrow'
import ToolTip from '../ToolTip'
import { getImageStackZ, type ImageHoverKey } from './getImageStackZ'

type HoverKey = 'name' | 'builder' | 'design' | null

const mobileDefinitions: Record<'name' | 'builder' | 'design', { label: string; color: string; lines: string[] }> = {
  name: {
    label: '[1]',
    color: '#F5900B',
    lines: [
      "as the title suggests, i'm samuel!",
      "i'm currently studying systems design engineering @ uwaterloo hoping to focus on hci + tech.",
    ],
  },
  builder: {
    label: '[2]',
    color: '#0CAEFF',
    lines: ["i love building :) whether it be building tech or a new art piece, i'm all in."],
  },
  design: {
    label: '[3]',
    color: '#1BAD0B',
    lines: [
      'i hate boring tech.',
      'currently exploring touch designer, media pipe, and open cv ;)',
    ],
  },
}

export function HomeInteractive() {
  const [hoverKey, setHoverKey] = useState<HoverKey>(null)
  const [imageHover, setImageHover] = useState<ImageHoverKey>(null)
  const [nameFadeVersion, setNameFadeVersion] = useState(0)
  const [mobileExpanded, setMobileExpanded] = useState<HoverKey>(null)

  const handleNameHoverEnter = useCallback(() => {
    setHoverKey('name')
    setNameFadeVersion((prev) => prev + 1)
  }, [])

  // Mobile tap handler — toggles single bottom expansion
  const handleMobileTap = useCallback(
    (key: 'name' | 'builder' | 'design') => {
      const isTouch = window.matchMedia('(hover: none)').matches
      if (!isTouch) return
      const next = mobileExpanded === key ? null : key
      setMobileExpanded(next)
      setHoverKey(next)
      if (next) setNameFadeVersion((prev) => prev + 1)
    },
    [mobileExpanded]
  )

  const getZ = useCallback(
    (name: 'lelamp' | 'socratica' | 'painting') => getImageStackZ(imageHover, name),
    [imageHover]
  )

  const activeDef = mobileExpanded ? mobileDefinitions[mobileExpanded] : null

  return (
    <>
      <div className="flex flex-row items-center gap-3 relative">
        <div
          className="relative"
          onMouseEnter={() => setImageHover('name')}
          onMouseLeave={() => setImageHover(null)}
        >
          {imageHover === 'name' && (
            <div className="absolute -top-6.5 left-[50%] -translate-x-[50%] pointer-events-none justify-center w-full">
              <div className="tooltip-pop">
                <ToolTip tooltipText="me + bill nye" />
              </div>
            </div>
          )}

          <div
            className="transition-transform duration-500 ease-out"
            style={{
              transform:
                imageHover === 'name'
                  ? 'scale(1.2) rotate(12deg)'
                  : 'scale(1) rotate(0deg)',
            }}
          >
            <ImageFrame src="/me.png" alt="profile picture" size="70px" rotation="-7.1deg" />
          </div>
        </div>

        <h1 className={`text-4xl md:text-5xl mt-5 ml-0.5 transition-opacity duration-200 ${hoverKey ? 'opacity-20' : ''}`}>
          i&apos;m
        </h1>

        <div
          className={`relative mb-3.5 ml-1 flex items-start gap-1 transition-opacity duration-200 ${
            hoverKey == 'builder' || hoverKey === 'design' ? 'opacity-20' : ''
          }`}
          onMouseEnter={handleNameHoverEnter}
          onMouseLeave={() => setHoverKey(null)}
          onClick={() => handleMobileTap('name')}
        >
          <HighlightWrapper active={hoverKey === 'name'} src="/yellow-highlight.svg">
            <div className="block md:hidden">
              <AnimatedName animated={true} size={120} />
            </div>

            <div className="hidden md:block">
              <AnimatedName animated={true} />
            </div>
          </HighlightWrapper>

          <span
            className={`text-sm md:text-lg text-[#F5900B] font-medium -mt-1.5 ${
              hoverKey && hoverKey !== 'name' ? 'opacity-20' : ''
            }`}
          >
            [1]
          </span>

          {/* Desktop-only floating definition */}
          {hoverKey === 'name' && (
            <div className="hidden md:flex absolute left-full top-25 -translate-y-full pointer-events-none items-start gap-2">
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
                    <span className="text-[#F5900B] text-2xl mt-5">[1]</span>
                    <AnimatedName animated={false} size={100} />
                  </div>
                  <span className="leading-10">
                    as the title suggests, i&apos;m samuel! <br />
                  </span>
                  <span className="leading-4.5">
                    i'm currently studying systems design engineering @ uwaterloo hoping to focus on hci + tech.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="text-xl md:text-3xl flex gap-1">
        <span className={`transition-opacity duration-200 ${hoverKey ? 'opacity-20' : ''}`}>a</span>

        <span
          className={`relative font-[550] text-[#0CAEFF] transition-opacity duration-200 ${
            hoverKey && hoverKey !== 'builder' ? 'opacity-20' : ''
          }`}
          onMouseEnter={() => setHoverKey('builder')}
          onMouseLeave={() => setHoverKey(null)}
          onClick={() => handleMobileTap('builder')}
        >
          <HighlightWrapper className="[&>img]:translate-y-0" active={hoverKey === 'builder'} src="/blue-highlight.svg">
            builder
          </HighlightWrapper>

          {/* Desktop-only floating definition */}
          {hoverKey === 'builder' && (
            <div className="hidden md:flex absolute left-full top-1 -translate-y-full pointer-events-none items-start gap-2 ml-10">
              <div className="flex-shrink-0">
                <BuildArrow animated className="w-[min(600px,40vw)] h-auto" />
              </div>

              <div
                key={nameFadeVersion}
                className="name-text-fade-in flex flex-col items-start -mt-14 text-xl pt-12 w-83 h-38.25 max-w-[90vw] max-h-[60vw]"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                <div className="flex flex-col items-start text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
                  <div className="flex items-center gap-2" style={{ fontFamily: 'var(--font-body)' }}>
                    <span className="text-[#0CAEFF] text-2xl mt-17">[2] builder</span>
                  </div>
                  <span className="text-main leading-4.5 mt-1">
                    i love building :) whether it be building tech or a new art piece, i'm all in.
                  </span>
                </div>
              </div>
            </div>
          )}
        </span>

        <span
          className={`text-sm md:text-lg text-[#0CAEFF] font-medium -mt-1.5 ${
            hoverKey && hoverKey !== 'builder' ? 'opacity-20' : ''
          }`}
        >
          [2]
        </span>

        <span className={`transition-opacity duration-200 ${hoverKey ? 'opacity-20' : ''}`}>
          who loves to create at the
        </span>
      </div>

      <div className="text-xl md:text-3xl flex flex-col gap-1">
        <div className="flex gap-1 items-center -mt-1.25 md:mt-0">
          <span className={`${hoverKey ? 'opacity-20' : ''}`}>intersection of</span>
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
                <ImageFrame src="/lelamp.png" alt="lelamp" size="40px" className="md:!w-[45px] md:!h-[45px]" rotation="-8.54deg" delay="0.08s" />
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
                  size="40px"
                  className="md:!w-[45px] md:!h-[45px]"
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
                    <ToolTip tooltipText="my painting" />
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
                <ImageFrame src="/painting.png" alt="painting" size="40px" className="md:!w-[45px] md:!h-[45px]" rotation="-1.39deg" delay="0.24s" />
              </div>
            </div>
          </div>

          <span
            className={`relative inline-block font-[550] text-[#1BAD0B] transition-opacity duration-200 ${
              hoverKey && hoverKey !== 'design' ? 'opacity-20' : ''
            }`}
            onMouseEnter={() => setHoverKey('design')}
            onMouseLeave={() => setHoverKey(null)}
            onClick={() => handleMobileTap('design')}
          >
            <HighlightWrapper className="text-xl md:text-3xl relative [&>img]:translate-y-0" active={hoverKey === 'design'} src="/green-highlight.svg">
              design + tech
            </HighlightWrapper>

            {/* Desktop-only floating definition */}
            {hoverKey === 'design' && (
              <div className="hidden md:flex absolute left-full top-2 -translate-y-full pointer-events-none items-start gap-2 ml-9">
                <div className="flex-shrink-0 -mt-5">
                  <DesignArrow animated className="w-[min(300px,20vw)] h-auto" />
                </div>

                <div
                  key={nameFadeVersion}
                  className="name-text-fade-in flex flex-col items-start -mt-14 text-xl pt-12 w-83 h-38.25 max-w-[90vw] max-h-[60vw]"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  <div className="flex flex-col items-start text-xl" style={{ fontFamily: 'var(--font-heading)' }}>
                    <div className="flex items-center gap-2" style={{ fontFamily: 'var(--font-body)' }}>
                      <span className="text-[#1BAD0B] text-2xl -mt-5">[3] design + tech</span>
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

          <span
            className={`text-sm md:text-lg text-[#1BAD0B] font-medium -mt-5 ${
              hoverKey && hoverKey !== 'design' ? 'opacity-20' : ''
            }`}
          >
            [3]
          </span>
        </div>

        <hr className="border-t border-[#C0BDB9] w-28 md:w-45 -mt-2.5" />
      </div>

      {/* ── Mobile-only: single expansion zone, always below all intro text ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ease-out ${
          mobileExpanded ? 'max-h-48 opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'
        }`}
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {activeDef && (
          <div
            key={`mobile-def-${mobileExpanded}-${nameFadeVersion}`}
            className="name-text-fade-in flex flex-col items-start text-base pb-3"
          >
            <span className="font-medium mb-1" style={{ color: activeDef.color, fontSize: '1.1rem' }}>
              {activeDef.label}
            </span>
            {activeDef.lines.map((line, i) => (
              <span key={i} className="text-main leading-5 mt-1">
                {line}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  )
}