"use client";
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { usePathname } from "next/navigation";
import { useCursorContext } from "./CursorContext";

function subscribeFinePointerHover(onChange: () => void) {
  const mql = window.matchMedia("(hover: hover) and (pointer: fine)");
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

function getFinePointerHoverSnapshot() {
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

function getFinePointerHoverServerSnapshot() {
  return false;
}

export default function Cursor() {
  const { hoverText, cursorEnabled, setCursorLabel } = useCursorContext();
  const pathname = usePathname();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const finePointerHover = useSyncExternalStore(
    subscribeFinePointerHover,
    getFinePointerHoverSnapshot,
    getFinePointerHoverServerSnapshot
  );

  const isPill = Boolean(hoverText);
  const active = finePointerHover && cursorEnabled;

  /** Bump when switching arrow → pill so the pill remounts and plays `.cursor-pill-enter`. */
  const [pillSession, setPillSession] = useState(0);
  const wasPill = useRef(false);
  useLayoutEffect(() => {
    if (!isPill) {
      wasPill.current = false;
      return;
    }
    if (!wasPill.current) {
      wasPill.current = true;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- bump React key before paint for one-shot keyframe
      setPillSession((n) => n + 1);
    }
  }, [isPill]);

  // Hide native cursor only when the custom cursor is actually in use.
  // Class on <html> + rules at end of globals.css beat UA / Tailwind pointer on links.
  // useLayoutEffect: apply before paint so links never flash the default pointer.
  // Footer toys call setCursorEnabled(false) → active false → class removed.
  useLayoutEffect(() => {
    const root = document.documentElement;
    document.body.style.cursor = active ? "none" : "auto";
    root.classList.toggle("custom-cursor", active);
    return () => {
      document.body.style.cursor = "auto";
      root.classList.remove("custom-cursor");
    };
  }, [active]);

  // Track mouse position continuously
  useEffect(() => {
    if (!finePointerHover) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [finePointerHover]);

  // Clear any stale pill label when navigating to a new route.
  useEffect(() => {
    setCursorLabel(null);
  }, [pathname, setCursorLabel]);

  if (!active) return null;

  const arrowEase = "cubic-bezier(0.22, 1, 0.36, 1)";
  const arrowTransition = `opacity 0.2s ease-out, transform 0.24s ${arrowEase}`;
  const pillEase = "cubic-bezier(0.22, 1.45, 0.36, 1)";
  const pillExitTransition = `opacity 0.2s ease-out, transform 0.26s ${pillEase}`;

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-50 overflow-visible"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    >
      {/* Fixed anchor box (arrow tip ~ upper-left of this region); pill expands from same origin */}
      <div className="relative h-[65px] w-[84px] overflow-visible">
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{
            opacity: isPill ? 0 : 1,
            transform: isPill ? "scale(0.86)" : "scale(1)",
            transition: arrowTransition,
          }}
          aria-hidden={isPill}
        >
          <svg
            width="84"
            height="65"
            viewBox="0 0 47 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: "translate(-20%, -25%)" }}
          >
            <g filter="url(#filter0_d_242_380)">
              <path d="M18 17H37C38.6569 17 40 18.3431 40 20V26C40 27.6569 38.6569 29 37 29H21C19.3431 29 18 27.6569 18 26V17Z" fill="#514433"/>
            </g>
            <path d="M25.037 25.5V23.302L23.14 20.46H24.036L25.639 22.966H25.254L26.857 20.46H27.676L25.779 23.302V25.5H25.037ZM28.6134 25.57C28.2494 25.57 27.9297 25.4907 27.6544 25.332C27.3791 25.1687 27.1644 24.947 27.0104 24.667C26.8564 24.3823 26.7794 24.0603 26.7794 23.701C26.7794 23.337 26.8564 23.0173 27.0104 22.742C27.1691 22.4667 27.3837 22.252 27.6544 22.098C27.9297 21.9393 28.2494 21.86 28.6134 21.86C28.9821 21.86 29.3041 21.9393 29.5794 22.098C29.8547 22.252 30.0671 22.4667 30.2164 22.742C30.3704 23.0173 30.4474 23.337 30.4474 23.701C30.4474 24.0603 30.3704 24.3823 30.2164 24.667C30.0671 24.947 29.8547 25.1687 29.5794 25.332C29.3041 25.4907 28.9821 25.57 28.6134 25.57ZM28.6134 24.975C28.8327 24.975 29.0217 24.9213 29.1804 24.814C29.3437 24.7067 29.4721 24.5573 29.5654 24.366C29.6587 24.1747 29.7054 23.9507 29.7054 23.694C29.7054 23.3113 29.6027 23.0103 29.3974 22.791C29.1967 22.567 28.9354 22.455 28.6134 22.455C28.2961 22.455 28.0347 22.567 27.8294 22.791C27.6287 23.015 27.5284 23.316 27.5284 23.694C27.5284 23.9507 27.5727 24.1747 27.6614 24.366C27.7547 24.5573 27.8831 24.7067 28.0464 24.814C28.2144 24.9213 28.4034 24.975 28.6134 24.975ZM31.7971 25.57C31.5591 25.57 31.3491 25.521 31.1671 25.423C30.9851 25.3203 30.8428 25.1803 30.7401 25.003C30.6421 24.8257 30.5931 24.6227 30.5931 24.394V21.93H31.3211V24.226C31.3211 24.4733 31.3818 24.6577 31.5031 24.779C31.6245 24.9003 31.7971 24.961 32.0211 24.961C32.2218 24.961 32.3991 24.9143 32.5531 24.821C32.7118 24.7277 32.8355 24.5993 32.9241 24.436C33.0175 24.268 33.0641 24.0743 33.0641 23.855L33.1551 24.709C33.0385 24.9703 32.8588 25.1803 32.6161 25.339C32.3781 25.493 32.1051 25.57 31.7971 25.57ZM33.0921 25.5V24.66H33.0641V21.93H33.7851V25.5H33.0921Z" fill="white"/>
            <g filter="url(#filter1_d_242_380)">
              <path d="M8.29481 17.6589L6.03245 6.12843C5.86985 5.29968 6.75671 4.66234 7.5033 5.07141L17.8908 10.7628C18.6729 11.1913 18.5477 12.3397 17.6918 12.588L13.261 13.8735C13.0392 13.9378 12.8468 14.0761 12.7164 14.2648L10.1113 18.0358C9.60807 18.7642 8.46514 18.5271 8.29481 17.6589Z" fill="#514433"/>
              <path d="M8.29481 17.6589L6.03245 6.12843C5.86985 5.29968 6.75671 4.66234 7.5033 5.07141L17.8908 10.7628C18.6729 11.1913 18.5477 12.3397 17.6918 12.588L13.261 13.8735C13.0392 13.9378 12.8468 14.0761 12.7164 14.2648L10.1113 18.0358C9.60807 18.7642 8.46514 18.5271 8.29481 17.6589Z" stroke="white"/>
            </g>
            <defs>
              <filter id="filter0_d_242_380" x="11" y="10" width="36" height="26" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset/>
                <feGaussianBlur stdDeviation="3.5"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_242_380"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_242_380" result="shape"/>
              </filter>
              <filter id="filter1_d_242_380" x="3.50977" y="3.44531" width="17.4043" height="18.5205" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="1"/>
                <feGaussianBlur stdDeviation="1"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_242_380"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_242_380" result="shape"/>
              </filter>
            </defs>
          </svg>
        </div>

        <div
          key={pillSession}
          className={
            isPill
              ? "pointer-events-none absolute left-0 top-0 whitespace-nowrap cursor-pill-enter"
              : "pointer-events-none absolute left-0 top-0 whitespace-nowrap"
          }
          style={{
            transformOrigin: "18px 14px",
            ...(isPill
              ? {}
              : {
                  opacity: 0,
                  transform: "scale(0.72)",
                  transition: pillExitTransition,
                }),
          }}
          aria-hidden={!isPill}
        >
          <div
            className="flex items-center justify-center bg-[#514433] px-4 py-2"
            style={{ borderRadius: 999 }}
          >
            <span className="text-[#FFF4E7] text-body text-sm font-normal tracking-tight">
              {hoverText}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}