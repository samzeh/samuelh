"use client";
import React, { useEffect, useState } from "react";

interface CursorProps {
  text?: string; // optional hover text
}

export default function Cursor({ text }: CursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoverText, setHoverText] = useState(text || "");
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      {/* Circle cursor */}
      <div
        className={`pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center 
          bg-black text-white rounded-full text-sm font-semibold
          transition-all duration-200 ease-out`}
        style={{
          width: hovering ? 120 : 20,
          height: hovering ? 120 : 20,
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
        }}
      >
        {hovering && hoverText}
      </div>
    </>
  );
}