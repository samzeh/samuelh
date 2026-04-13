'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from "next/image";

// ─── Types ─────────────────────────────────────────────
interface Point {
  x: number;
  y: number;
}

interface PortfolioItem {
  id: string;
  title: string;
  position: Point;
  imageUrl?: string;
}

interface Category {
  id: string;
  name: string;
  color: string;
  items: PortfolioItem[];
}

// ─── Data ─────────────────────────────────────────────
const portfolioData: Category[] = [
  {
    id: 'art',
    name: 'Art',
    color: '#60A5FA',
    items: [
      { id: 'art1', title: 'Portrait', position: { x: 650, y: 350 }, imageUrl: '/test2.png' },
      { id: 'art2', title: 'Still Life', position: { x: 650, y: 650 }, imageUrl: '/test2.png' },
    ],
  },
  {
    id: 'design',
    name: 'Design',
    color: '#F472B6',
    items: [
      { id: 'd1', title: 'Brand', position: { x: 1300, y: 400 }, imageUrl: '/test2.png' },
      { id: 'd2', title: 'UI', position: { x: 1500, y: 500 }, imageUrl: '/test2.png' },
    ],
  },
];

// ─── Canvas ───────────────────────────────────────────
const canvasWidth = 1800;
const canvasHeight = 1400;

// ─── Better Blob (fixed) ─────────────────────────────
const createBlobPath = (points: Point[]) => {
  if (points.length < 3) return '';

  const expanded = points.map(p => ({
    x: p.x + (Math.random() - 0.5) * 120,
    y: p.y + (Math.random() - 0.5) * 120,
  }));

  return `
    M ${expanded[0].x} ${expanded[0].y}
    ${expanded.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ')}
    Z
  `;
};

// ─── Component ───────────────────────────────────────
export default function PlaygroundPage() {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState<Point>({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState<Point>({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState<Point>({ x: 0, y: 0 });
  const [viewport, setViewport] = useState({ w: 0, h: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  // viewport size
  useEffect(() => {
    const update = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // ─── Mouse logic ─────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();

      setCursorPos({
        x: (e.clientX - rect.left - pan.x) / zoom,
        y: (e.clientY - rect.top - pan.y) / zoom,
      });

      if (isPanning) {
        const dx = e.clientX - panStart.x;
        const dy = e.clientY - panStart.y;

        setPan(prev => ({
          x: prev.x + dx,
          y: prev.y + dy,
        }));

        setPanStart({ x: e.clientX, y: e.clientY });
      }
    };

    const handleDown = (e: MouseEvent) => {
      if (e.button === 0) {
        setIsPanning(true);
        setPanStart({ x: e.clientX, y: e.clientY });
      }
    };

    const handleUp = () => setIsPanning(false);

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const rect = el.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const delta = -e.deltaY * 0.001;
      const newZoom = Math.min(Math.max(0.4, zoom + delta), 3);

      const zoomPoint = {
        x: (mouseX - pan.x) / zoom,
        y: (mouseY - pan.y) / zoom,
      };

      setPan({
        x: mouseX - zoomPoint.x * newZoom,
        y: mouseY - zoomPoint.y * newZoom,
      });

      setZoom(newZoom);
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mousedown', handleDown);
    el.addEventListener('mouseup', handleUp);
    el.addEventListener('mouseleave', handleUp);
    el.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mousedown', handleDown);
      el.removeEventListener('mouseup', handleUp);
      el.removeEventListener('mouseleave', handleUp);
      el.removeEventListener('wheel', handleWheel);
    };
  }, [zoom, pan, isPanning, panStart]);

  // ─── Precompute blobs ─────────────────────────
  const blobs = useMemo(() => {
    return portfolioData.map(cat => {
      const basePoints = cat.items.map(i => i.position);
  
      // create multiple "rings"
      const layers = [0, 40, 80, 120].map(offset => {
        const expanded = basePoints.map(p => ({
          x: p.x + (Math.random() - 0.5) * offset,
          y: p.y + (Math.random() - 0.5) * offset,
        }));
  
        return createBlobPath(expanded);
      });
  
      return {
        id: cat.id,
        layers
      };
    });
  }, []);

  // ─── Minimap scale ───────────────────────────
  const mmW = 220;
  const mmH = 150;
  const scX = mmW / canvasWidth;
  const scY = mmH / canvasHeight;

  // ─── Render ──────────────────────────────────
  return (
    <>
      {/* WORLD */}
      <div
        ref={containerRef}
        className="relative w-screen h-screen overflow-hidden bg-gray-50"
        style={{ cursor: isPanning ? 'grabbing' : 'grab' }}
      >
        <div
          style={{
            width: canvasWidth,
            height: canvasHeight,
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: '0 0',
          }}
          className="relative"
        >
          {/* GRID */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
              backgroundSize: '20px 20px',
            }}
          />

          {/* BLOBS */}
          <svg width={canvasWidth} height={canvasHeight} className="absolute inset-0">

  {blobs.map(blob => {
    const cat = portfolioData.find(c => c.id === blob.id)!;

    return (
      <g key={blob.id}>
        
        {/* OUTER CONTOURS */}
        {blob.layers.map((path, i) => (
          <path
            key={i}
            d={path}
            fill="none"
            stroke="#a3a3a3"
            strokeWidth={1}
            strokeDasharray={i % 2 === 0 ? "0" : "4 4"}
            opacity={0.4 - i * 0.08}
          />
        ))}

        {/* MAIN SHAPE (highlighted like your orange one) */}
        <path
          d={blob.layers[0]}
          fill="none"
          stroke={cat.color}
          strokeWidth={2}
        />

        {/* INNER DASH */}
        {blob.layers[1] && (
          <path
            d={blob.layers[1]}
            fill="none"
            stroke={cat.color}
            strokeWidth={1}
            strokeDasharray="4 4"
            opacity={0.7}
          />
        )}

      </g>
    );
  })}

</svg>

          {/* ITEMS */}
          {portfolioData.map(cat =>
            cat.items.map(item => (
              <div
                key={item.id}
                className="absolute"
                style={{
                  left: item.position.x,
                  top: item.position.y,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <Image
                  src={item.imageUrl ?? '/test2.png'}
                  alt=""
                  width={50}
                  height={75}
                  draggable={false}
                />
              </div>
            ))
          )}
        </div>
      </div>

      {/* CURSOR HUD */}
      <div className="fixed bottom-6 right-6 z-[9999] bg-white p-3 border shadow font-mono text-sm">
        x: {Math.round(cursorPos.x)}<br />
        y: {Math.round(cursorPos.y)}
      </div>

      {/* MINIMAP */}
      <div className="fixed bottom-6 left-6 z-[9999] bg-white border shadow">
        <svg width={mmW} height={mmH}>
          <rect width="100%" height="100%" fill="#f3f4f6" />

          {/* blobs */}
          <g transform={`scale(${scX} ${scY})`}>
            {blobs.map(b => {
              const cat = portfolioData.find(c => c.id === b.id)!;
              return (
                <path
                  key={b.id}
                  d={b.path}
                  fill={cat.color}
                  fillOpacity="0.2"
                  stroke={cat.color}
                  strokeWidth={2 / scX}
                />
              );
            })}
          </g>

          {/* viewport */}
          <rect
            x={-pan.x * scX / zoom}
            y={-pan.y * scY / zoom}
            width={(viewport.w / (canvasWidth * zoom)) * mmW}
            height={(viewport.h / (canvasHeight * zoom)) * mmH}
            fill="rgba(0,0,0,0.1)"
            stroke="black"
          />

          {/* cursor */}
          <circle
            cx={cursorPos.x * scX}
            cy={cursorPos.y * scY}
            r={3}
            fill="red"
          />
        </svg>
      </div>
    </>
  );
}