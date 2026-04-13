'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useCursorContext } from './CursorContext'

type Handle = 'nw' | 'ne' | 'sw' | 'se'
type Interaction =
  | { type: 'move'; startX: number; startY: number; startLeft: number; startTop: number }
  | {
      type: 'resize'
      handle: Handle
      startX: number
      startY: number
      startLeft: number
      startTop: number
      startWidth: number
      startHeight: number
    }
  | { type: 'rotate'; startAngle: number }
  | null

type Box = {
  left: number
  top: number
  width: number
  height: number
  rotation: number
}

type FooterTransformableImageProps = {
  containerRef: React.RefObject<HTMLDivElement | null>
  src: string
  alt: string
  initial: Box
  minSize?: number
  deselectSignal?: number
  disabled?: boolean
}

export default function FooterTransformableImage({
  containerRef,
  src,
  alt,
  initial,
  minSize = 72,
  deselectSignal = 0,
  disabled = false,
}: FooterTransformableImageProps) {
  const { setCursorEnabled } = useCursorContext()
  const [selected, setSelected] = useState(false)
  const [interaction, setInteraction] = useState<Interaction>(null)
  const [box, setBox] = useState<Box>(initial)
  const boxRef = useRef<HTMLDivElement>(null)

  const aspectRatio = useMemo(() => initial.width / initial.height, [initial.height, initial.width])

  const clampBoxToBounds = (next: Box): Box => {
    const el = containerRef.current
    if (!el) return next
    const rect = el.getBoundingClientRect()
    const width = Math.min(Math.max(next.width, minSize), rect.width)
    const height = Math.min(Math.max(next.height, minSize), rect.height)
    const left = Math.min(Math.max(next.left, 0), Math.max(rect.width - width, 0))
    const top = Math.min(Math.max(next.top, 0), Math.max(rect.height - height, 0))
    return { ...next, width, height, left, top }
  }

  const getContainerPoint = (clientX: number, clientY: number) => {
    const el = containerRef.current
    if (!el) return { x: 0, y: 0 }
    const rect = el.getBoundingClientRect()
    return { x: clientX - rect.left, y: clientY - rect.top }
  }

  const startMove = (e: React.PointerEvent) => {
    if (disabled) return
    e.preventDefault()
    e.stopPropagation()
    setSelected(true)
    setInteraction({
      type: 'move',
      startX: e.clientX,
      startY: e.clientY,
      startLeft: box.left,
      startTop: box.top,
    })
  }

  const startResize = (handle: Handle) => (e: React.PointerEvent) => {
    if (disabled) return
    e.preventDefault()
    e.stopPropagation()
    setSelected(true)
    setInteraction({
      type: 'resize',
      handle,
      startX: e.clientX,
      startY: e.clientY,
      startLeft: box.left,
      startTop: box.top,
      startWidth: box.width,
      startHeight: box.height,
    })
  }

  const startRotate = (e: React.PointerEvent) => {
    if (disabled) return
    e.preventDefault()
    e.stopPropagation()
    setSelected(true)
    const centerX = box.left + box.width / 2
    const centerY = box.top + box.height / 2
    const point = getContainerPoint(e.clientX, e.clientY)
    const mouseAngle = Math.atan2(point.y - centerY, point.x - centerX)
    const startAngle = mouseAngle - (box.rotation * Math.PI) / 180
    setInteraction({ type: 'rotate', startAngle })
  }

  useEffect(() => {
    if (!interaction || disabled) return

    const handlePointerMove = (e: PointerEvent) => {
      if (interaction.type === 'move') {
        const dx = e.clientX - interaction.startX
        const dy = e.clientY - interaction.startY
        setBox((prev) =>
          clampBoxToBounds({
            ...prev,
            left: interaction.startLeft + dx,
            top: interaction.startTop + dy,
          })
        )
        return
      }

      if (interaction.type === 'resize') {
        const dx = e.clientX - interaction.startX
        const dy = e.clientY - interaction.startY

        const signX = interaction.handle.includes('e') ? 1 : -1
        const signY = interaction.handle.includes('s') ? 1 : -1

        const scaleX = (interaction.startWidth + signX * dx) / interaction.startWidth
        const scaleY = (interaction.startHeight + signY * dy) / interaction.startHeight
        const scaleByX = Math.abs(scaleX - 1) >= Math.abs(scaleY - 1)
        const rawScale = scaleByX ? scaleX : scaleY
        const minScaleW = (minSize * aspectRatio) / interaction.startWidth
        const minScaleH = minSize / interaction.startHeight
        const scale = Math.max(rawScale, Math.max(minScaleW, minScaleH))

        let nextWidth = interaction.startWidth * scale
        let nextHeight = nextWidth / aspectRatio
        let nextLeft = interaction.startLeft
        let nextTop = interaction.startTop

        if (interaction.handle.includes('w')) {
          nextLeft = interaction.startLeft + (interaction.startWidth - nextWidth)
        }
        if (interaction.handle.includes('n')) {
          nextTop = interaction.startTop + (interaction.startHeight - nextHeight)
        }

        const el = containerRef.current
        if (el) {
          const rect = el.getBoundingClientRect()
          nextLeft = Math.max(0, Math.min(nextLeft, rect.width - nextWidth))
          nextTop = Math.max(0, Math.min(nextTop, rect.height - nextHeight))

          if (nextLeft + nextWidth > rect.width) {
            nextWidth = rect.width - nextLeft
            nextHeight = nextWidth / aspectRatio
          }
          if (nextTop + nextHeight > rect.height) {
            nextHeight = rect.height - nextTop
            nextWidth = nextHeight * aspectRatio
          }
        }

        setBox((prev) => ({
          ...prev,
          left: nextLeft,
          top: nextTop,
          width: nextWidth,
          height: nextHeight,
        }))
        return
      }

      const point = getContainerPoint(e.clientX, e.clientY)
      const centerX = box.left + box.width / 2
      const centerY = box.top + box.height / 2
      const mouseAngle = Math.atan2(point.y - centerY, point.x - centerX)
      const rotation = ((mouseAngle - interaction.startAngle) * 180) / Math.PI
      setBox((prev) => ({ ...prev, rotation }))
    }

    const handlePointerUp = () => setInteraction(null)
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
    }
  }, [aspectRatio, containerRef, interaction, minSize, box, disabled])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver(() => {
      setBox((prev) => clampBoxToBounds(prev))
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [containerRef])

  useEffect(() => {
    setSelected(false)
  }, [deselectSignal])

  // Keep box in sync when initial changes (e.g. switching desktop <-> mobile)
  useEffect(() => {
    setBox(initial)
  }, [initial])

  const isResizing = interaction?.type === 'resize'
  const showSizeBadge = selected || isResizing

  return (
    <div
      ref={boxRef}
      className="absolute select-none"
      style={{
        left: box.left,
        top: box.top,
        width: box.width,
        height: box.height,
        transform: `rotate(${box.rotation}deg)`,
        transformOrigin: 'center center',
        touchAction: disabled ? 'auto' : 'none',
        pointerEvents: disabled ? 'none' : 'auto',
        zIndex: selected ? 20 : 10,
      }}
      onPointerEnter={disabled ? undefined : () => setCursorEnabled(false)}
      onPointerLeave={disabled ? undefined : () => setCursorEnabled(true)}
      onPointerDown={disabled ? undefined : startMove}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        className="h-full w-full object-contain pointer-events-none"
      />

      {selected && !disabled && (
        <>
          <div className="pointer-events-none absolute inset-0 border border-[#2196F3] rounded-[2px]" />
          {/* Rotation: stack sits above the box; bottom of the stem meets the top border (no gap). */}
          <div className="absolute left-1/2 top-0 z-20 flex -translate-x-1/2 -translate-y-full flex-col items-center">
            <button
              aria-label={`Rotate ${alt}`}
              onPointerDown={startRotate}
              type="button"
              className="h-4 w-4 shrink-0 rounded-full border border-[#2196F3] bg-white cursor-grab"
            />
            <div className="h-2.5 w-px shrink-0 bg-[#2196F3]" aria-hidden />
          </div>

          <button aria-label={`Resize ${alt} top left`} onPointerDown={startResize('nw')} className="absolute -left-1.5 -top-1.5 z-20 h-3 w-3 border-2 border-[#2196F3] bg-white" />
          <button aria-label={`Resize ${alt} top right`} onPointerDown={startResize('ne')} className="absolute -right-1.5 -top-1.5 z-20 h-3 w-3 border-2 border-[#2196F3] bg-white" />
          <button aria-label={`Resize ${alt} bottom left`} onPointerDown={startResize('sw')} className="absolute -bottom-1.5 -left-1.5 z-20 h-3 w-3 border-2 border-[#2196F3] bg-white" />
          <button aria-label={`Resize ${alt} bottom right`} onPointerDown={startResize('se')} className="absolute -bottom-1.5 -right-1.5 z-20 h-3 w-3 border-2 border-[#2196F3] bg-white" />

          {showSizeBadge && (
            <div className="absolute -bottom-12 left-1/2 z-20 max-w-none -translate-x-1/2 whitespace-nowrap rounded-md bg-[#2196F3] px-3 py-1 text-sm font-semibold leading-none text-white tabular-nums">
              {Math.round(box.width)} × {Math.round(box.height)}
            </div>
          )}
        </>
      )}
    </div>
  )
}