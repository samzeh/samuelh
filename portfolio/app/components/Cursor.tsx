"use client";
import React, { useEffect, useState } from "react";
import { useCursorContext } from "./CursorContext";

export default function Cursor() {
  const { hoverText, cursorEnabled } = useCursorContext();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);
  const [currentText, setCurrentText] = useState<string | null>(null);

  const isPill = Boolean(currentText);

  // Mount flag to prevent SSR mismatch
  useEffect(() => setMounted(true), []);

  // Hide native cursor
  useEffect(() => {
    if (!mounted) return;
    document.body.style.cursor = cursorEnabled ? "none" : "auto";
    return () => { document.body.style.cursor = "auto"; };
  }, [cursorEnabled, mounted]);

  // Track mouse position continuously
  useEffect(() => {
    if (!mounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mounted]);

  // Sync hoverText from context immediately
  useEffect(() => {
    setCurrentText(hoverText ?? null);
  }, [hoverText]);

  if (!cursorEnabled || !mounted) return null;

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center
                 transition-[width,height,border-radius,opacity,transform,background-color] duration-200 ease-out"
      style={{
        width: isPill ? "auto" : 28,
        height: isPill ? "auto" : 28,
        borderRadius: isPill ? 999 : "50%",
        opacity: 1, // Always visible now
        transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
        backgroundColor: isPill ? "#514433" : "transparent",
        padding: isPill ? "8px 16px" : "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        whiteSpace: "nowrap",
      }}
    >
      {isPill ? (
        <span className="text-[#FFF4E7] text-body text-sm font-normal tracking-tight">
          {currentText}
        </span>
      ) : (
        <svg
          className="transition-opacity duration-200"
          width="28"
          height="30"
          viewBox="0 0 18 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_232_277)">
            <path
              d="M4.78504 14.2136L2.52269 2.68312C2.36008 1.85437 3.24694 1.21703 3.99353 1.62609L14.381 7.31747C15.1631 7.74598 15.0379 8.89444 14.1821 9.14273L9.75126 10.4281C9.52943 10.4925 9.33707 10.6307 9.20665 10.8195L6.60152 14.5905C6.09831 15.3189 4.95538 15.0818 4.78504 14.2136Z"
              fill="#514433"
            />
            <path
              d="M4.78504 14.2136L2.52269 2.68312C2.36008 1.85437 3.24694 1.21703 3.99353 1.62609L14.381 7.31747C15.1631 7.74598 15.0379 8.89444 14.1821 9.14273L9.75126 10.4281C9.52943 10.4925 9.33707 10.6307 9.20665 10.8195L6.60152 14.5905C6.09831 15.3189 4.95538 15.0818 4.78504 14.2136Z"
              stroke="white"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_232_277"
              x="0"
              y="0"
              width="17.4043"
              height="18.5205"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="1" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_232_277"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_232_277"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      )}
    </div>
  );
}