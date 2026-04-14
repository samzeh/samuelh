"use client";

import { useEffect, useRef, useState, useCallback, type PointerEvent as ReactPointerEvent } from "react";

const ITEMS = [
  { id: 0, label: "power bank for my terrible battery life",    src: "/items/charger.png",  rotation: -12 },
  { id: 1, label: "paper > digital",   src: "/items/paper.png",    rotation: 3  },
  { id: 2, label: "my prized possession", src: "/items/ti84.png",     rotation: -8 },
  { id: 3, label: "i've lost at least 3 of these",  src: "/items/water.png",    rotation: 5  },
  { id: 4, label: "the backpack i've had since 7th grade",      src: "/items/backpack.png", rotation: 0  },
  { id: 5, label: "for coding (youtube)",       src: "/items/macbook.png",  rotation: 8  },
  { id: 6, label: "ex swimmer",  src: "/items/cobra.png",    rotation: -5 },
  { id: 7, label: "arguably one of the best led pencils",  src: "/items/pencil.png",   rotation: -20 },
  { id: 8, label: "would sleep in these if i could",   src: "/items/airpod.png",   rotation: 6  },
];

// Scatter positions [left%, top%] matching reference screenshot
const SCATTER: [number, number][] = [
  [4,  4 ],
  [40, 2 ],
  [22, 10],
  [60, 8 ],
  [78, 6 ],
  [2,  38],
  [26, 34],
  [54, 30],
  [78, 28],
];

function easeInOutQuad(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }

type Handle = "nw" | "ne" | "sw" | "se";
type ScatterBox = { x: number; y: number; width: number; height: number; rotation: number };
type ScatterInteraction =
  | { type: "move"; id: number; startX: number; startY: number; startBox: ScatterBox }
  | { type: "resize"; id: number; handle: Handle; startX: number; startY: number; startBox: ScatterBox }
  | { type: "rotate"; id: number; startAngle: number }
  | null;

const SCROLL_DISTANCE = 1200;
const BP_START_X = 50;
const BP_START_Y = 66;
const BP_END_X = 16;
const BP_END_Y = 50;

export default function BackpackPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProg, setScrollProg] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedId, setSelectedId] = useState(4); // backpack selected by default
  const [selectedScatterId, setSelectedScatterId] = useState<number | null>(null);
  const [scatterBoxes, setScatterBoxes] = useState<Record<number, ScatterBox>>({});
  const scrollYRef = useRef(0);
  const rafId = useRef<number | null>(null);
  const scatterInteractionRef = useRef<ScatterInteraction>(null);

  const updateScroll = useCallback((delta: number) => {
    scrollYRef.current = clamp(scrollYRef.current + delta, 0, SCROLL_DISTANCE);
    const prog = scrollYRef.current / SCROLL_DISTANCE;
    if (prog > 0.12) {
      scatterInteractionRef.current = null;
    }
    if (rafId.current) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => setScrollProg(prog));
  }, []);

  const p1 = clamp(scrollProg / 0.5, 0, 1);
  const p2 = clamp((scrollProg - 0.5) / 0.5, 0, 1);
  const p1e = easeInOutQuad(p1);
  const p2e = easeInOutQuad(p2);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 900px)");
    const onChange = () => setIsMobile(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => { 
      // Allow pass-through for downward scroll once animation is complete
      if (scrollYRef.current >= SCROLL_DISTANCE && e.deltaY > 0) return;
      e.preventDefault(); 
      updateScroll(e.deltaY); 
    };
    let touchStartY = 0;
    const onTouchStart = (e: TouchEvent) => { touchStartY = e.touches[0].clientY; };
    const onTouchMove = (e: TouchEvent) => {
      const dy = touchStartY - e.touches[0].clientY;
      // Allow pass-through for downward scroll once animation is complete
      if (scrollYRef.current >= SCROLL_DISTANCE && dy > 0) return;
      e.preventDefault();
      touchStartY = e.touches[0].clientY;
      updateScroll(dy);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
    };
  }, [updateScroll]);

  const getScatterBox = useCallback(
    (itemId: number): ScatterBox => {
      const item = ITEMS.find((it) => it.id === itemId);
      return scatterBoxes[itemId] ?? { x: 0, y: 0, width: 100, height: 100, rotation: item?.rotation ?? 0 };
    },
    [scatterBoxes],
  );

  const getBasePositionPx = useCallback(
    (itemId: number) => {
      const el = containerRef.current;
      const idx = ITEMS.findIndex((it) => it.id === itemId);
      if (!el || idx < 0) return { left: 0, top: 0 };
      const [sx, sy] = SCATTER[idx];
      const tx = lerp(sx, BP_START_X - 4, p1e);
      const ty = lerp(sy, BP_START_Y - 4, p1e);
      return {
        left: (tx / 100) * el.clientWidth,
        top: (ty / 100) * el.clientHeight,
      };
    },
    [p1e],
  );

  const onScatterPointerDown = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>, itemId: number) => {
      // Keep transform editing limited to the initial spread-out phase.
      if (itemId === 4 || scrollProg > 0.12 || isMobile) return;
      const existing = getScatterBox(itemId);
      scatterInteractionRef.current = {
        type: "move",
        id: itemId,
        startX: e.clientX,
        startY: e.clientY,
        startBox: existing,
      };
      setSelectedScatterId(itemId);
      e.stopPropagation();
      e.preventDefault();
    },
    [getScatterBox, scrollProg, isMobile],
  );

  const onScatterResizePointerDown = useCallback(
    (e: ReactPointerEvent<HTMLButtonElement>, itemId: number, handle: Handle) => {
      if (itemId === 4 || scrollProg > 0.12 || isMobile) return;
      const existing = getScatterBox(itemId);
      scatterInteractionRef.current = {
        type: "resize",
        id: itemId,
        handle,
        startX: e.clientX,
        startY: e.clientY,
        startBox: existing,
      };
      setSelectedScatterId(itemId);
      e.stopPropagation();
      e.preventDefault();
    },
    [getScatterBox, scrollProg, isMobile],
  );

  const onScatterRotatePointerDown = useCallback(
    (e: ReactPointerEvent<HTMLButtonElement>, itemId: number) => {
      if (itemId === 4 || scrollProg > 0.12 || isMobile) return;
      const box = getScatterBox(itemId);
      const base = getBasePositionPx(itemId);
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const centerX = rect.left + base.left + box.x + box.width / 2;
      const centerY = rect.top + base.top + box.y + box.height / 2;
      const mouseAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      const startAngle = mouseAngle - (box.rotation * Math.PI) / 180;
      scatterInteractionRef.current = { type: "rotate", id: itemId, startAngle };
      setSelectedScatterId(itemId);
      e.stopPropagation();
      e.preventDefault();
    },
    [getBasePositionPx, getScatterBox, scrollProg, isMobile],
  );

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      const interaction = scatterInteractionRef.current;
      if (!interaction) return;

      if (interaction.type === "move") {
        const dx = e.clientX - interaction.startX;
        const dy = e.clientY - interaction.startY;
        setScatterBoxes((prev) => ({
          ...prev,
          [interaction.id]: {
            ...interaction.startBox,
            x: interaction.startBox.x + dx,
            y: interaction.startBox.y + dy,
          },
        }));
        return;
      }

      if (interaction.type === "resize") {
        const dx = e.clientX - interaction.startX;
        const dy = e.clientY - interaction.startY;
        const signX = interaction.handle.includes("e") ? 1 : -1;
        const signY = interaction.handle.includes("s") ? 1 : -1;
        const scaleX = (interaction.startBox.width + signX * dx) / interaction.startBox.width;
        const scaleY = (interaction.startBox.height + signY * dy) / interaction.startBox.height;
        const scaleByX = Math.abs(scaleX - 1) >= Math.abs(scaleY - 1);
        const rawScale = scaleByX ? scaleX : scaleY;
        const scale = Math.max(rawScale, 0.55);
        const aspectRatio = interaction.startBox.width / interaction.startBox.height;
        const nextWidth = Math.max(56, interaction.startBox.width * scale);
        const nextHeight = nextWidth / aspectRatio;
        let nextX = interaction.startBox.x;
        let nextY = interaction.startBox.y;

        if (interaction.handle.includes("w")) {
          nextX = interaction.startBox.x + (interaction.startBox.width - nextWidth);
        }
        if (interaction.handle.includes("n")) {
          nextY = interaction.startBox.y + (interaction.startBox.height - nextHeight);
        }

        setScatterBoxes((prev) => ({
          ...prev,
          [interaction.id]: {
            ...interaction.startBox,
            x: nextX,
            y: nextY,
            width: nextWidth,
            height: nextHeight,
          },
        }));
        return;
      }

      const box = getScatterBox(interaction.id);
      const base = getBasePositionPx(interaction.id);
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const centerX = rect.left + base.left + box.x + box.width / 2;
      const centerY = rect.top + base.top + box.y + box.height / 2;
      const mouseAngle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
      const rotation = ((mouseAngle - interaction.startAngle) * 180) / Math.PI;
      setScatterBoxes((prev) => ({
        ...prev,
        [interaction.id]: {
          ...box,
          rotation,
        },
      }));
    };

    const onPointerUp = () => {
      scatterInteractionRef.current = null;
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [getBasePositionPx, getScatterBox]);

  const bpX = lerp(BP_START_X, BP_END_X, p2e);
  const bpY = lerp(BP_START_Y, BP_END_Y, p2e);
  const bpSize = lerp(200, 260, p2e);
  const shellTop = isMobile ? "62%" : "54%";
  const shellBaseTransform = isMobile ? "translate(-50%, 0)" : "translate(-50%, -50%)";
  const shellGap = isMobile ? 10 : 20;
  const leftPanelWidth = isMobile ? 255 : 449;
  const leftPanelHeight = isMobile ? 300 : 529;
  const leftPanelPadding = isMobile ? "12px 10px" : "16px 14px";
  const leftImageWidth = isMobile ? "62%" : "78%";
  const gridCols = isMobile ? 3 : 4;
  const gridRows = 3;
  const gridCellSize = 169;
  const gridGap = isMobile ? 8 : 10;
  const emptyCellCount = isMobile ? 0 : 3;

  const selectedItem = ITEMS.find((it) => it.id === selectedId) ?? ITEMS[4];
  const phase2Active = p2e > 0.5;
  const phase2Opacity = p2e;

  return (
    <div
      ref={containerRef}
      className="text-detail"
      onPointerDown={() => {
        if (scrollProg <= 0.12) setSelectedScatterId(null);
      }}
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        background: "#fff",
        overflow: "auto",
        cursor: "default",
      }}
    >
      {/* ── Scattered items (Phase 1) ─────────────────────────────── */}
      {ITEMS.map((item, i) => {
        if (item.id === 4) return null;
        const [sx, sy] = SCATTER[i];
        const box = getScatterBox(item.id);
        const isEditable = item.id !== 4 && scrollProg <= 0.12 && !isMobile;
        const isSelected = selectedScatterId === item.id && isEditable;
        const tx = lerp(sx, BP_START_X - 4, p1e);
        const ty = lerp(sy, BP_START_Y - 4, p1e);
        const scale = lerp(1, 0.05, p1e);
        const opacity = p2 > 0.05 ? 0 : lerp(1, 0, clamp((p1e - 0.5) / 0.5, 0, 1));
        return (
          <div
            key={item.id}
            onPointerDown={(e) => onScatterPointerDown(e, item.id)}
            style={{
              position: "absolute",
              left: `${tx}vw`,
              top: `${ty}vh`,
              width: box.width,
              height: box.height,
              transform: `translate(${box.x * (1 - p1e)}px, ${box.y * (1 - p1e)}px) scale(${scale}) rotate(${box.rotation}deg)`,
              transformOrigin: "center center",
              opacity,
              pointerEvents: isEditable ? "auto" : "none",
              touchAction: isEditable ? "none" : "auto",
              cursor: isEditable ? "grab" : "default",
              willChange: "transform, opacity",
              zIndex: isSelected ? 40 : (isEditable ? 30 : 10),
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.src}
              alt={item.label}
              style={{ width: "100%", height: "100%", objectFit: "contain", display: "block" }}
            />

            {isSelected && (
              <>
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    border: "1px solid #2196F3",
                    borderRadius: 2,
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: 0,
                    transform: "translate(-50%, -100%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    zIndex: 50,
                  }}
                >
                  <button
                    aria-label={`Rotate ${item.label}`}
                    type="button"
                    onPointerDown={(e) => onScatterRotatePointerDown(e, item.id)}
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      border: "1px solid #2196F3",
                      background: "#fff",
                      cursor: "grab",
                    }}
                  />
                  <div style={{ width: 1, height: 10, background: "#2196F3" }} aria-hidden />
                </div>

                {(["nw", "ne", "sw", "se"] as Handle[]).map((handle) => {
                  const styleMap: Record<Handle, React.CSSProperties> = {
                    nw: { left: -6, top: -6 },
                    ne: { right: -6, top: -6 },
                    sw: { left: -6, bottom: -6 },
                    se: { right: -6, bottom: -6 },
                  };
                  return (
                    <button
                      key={`${item.id}-${handle}`}
                      aria-label={`Resize ${item.label} ${handle}`}
                      type="button"
                      onPointerDown={(e) => onScatterResizePointerDown(e, item.id, handle)}
                      style={{
                        position: "absolute",
                        width: 12,
                        height: 12,
                        border: "2px solid #2196F3",
                        background: "#fff",
                        zIndex: 50,
                        ...styleMap[handle],
                      }}
                    />
                  );
                })}

                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    bottom: -34,
                    transform: "translateX(-50%)",
                    whiteSpace: "nowrap",
                    borderRadius: 8,
                    background: "#2196F3",
                    color: "#fff",
                    fontSize: 12,
                    lineHeight: 1,
                    fontWeight: 700,
                    padding: "6px 10px",
                  }}
                >
                  {Math.round(box.width)} x {Math.round(box.height)}
                </div>
              </>
            )}
          </div>
        );
      })}

      {/* ── Backpack: desktop flies, mobile stays bottom-center ───────────────── */}
      {isMobile ? (
        <div
          style={{
            position: "absolute",
            left: `${BP_START_X}vw`,
            top: `${BP_START_Y}vh`,
            width: 200,
            height: 240,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // Keep it static on mobile and fade away as phase 2 appears.
            opacity: clamp(1 - p2e * 2.5, 0, 1),
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/items/backpack.png"
            alt="Backpack"
            style={{ width: "100%", flex: 1, objectFit: "contain", display: "block" }}
          />
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            left: `${bpX}vw`,
            top: `${bpY}vh`,
            width: bpSize,
            height: bpSize * 1.2,
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
            willChange: "left, top, width, height",
            zIndex: 20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // Fade out as left panel takes over at end of phase 2
            opacity: p2e < 0.9 ? 1 : clamp(1 - (p2e - 0.9) / 0.1, 0, 1),
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/items/backpack.png"
            alt="Backpack"
            style={{ width: "100%", flex: 1, objectFit: "contain", display: "block" }}
          />
        </div>
      )}

      {/* ── Phase 2: Panel + grid shell ───────────────────────────── */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: shellTop,
          display: "flex",
          gap: shellGap,
          flexDirection: isMobile ? "column" : "row",
          opacity: phase2Opacity,
          transform: `${shellBaseTransform} translateY(${(1 - p2e) * 18}px)`,
          willChange: "opacity, transform",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            borderRadius: 20,
            border: "2px dashed #b8b8b8",
            background: "#efefef",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: leftPanelPadding,
            width: leftPanelWidth,
            height: leftPanelHeight,
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={selectedItem.src}
            alt={selectedItem.label}
            style={{
              flex: 1,
              width: leftImageWidth,
              minHeight: 0,
              objectFit: "contain",
              display: "block",
              transition: "opacity 0.2s ease",
            }}
          />
          <p
            style={{
              fontSize: 14,
              color: "#6f6f6f",
              letterSpacing: "0.01em",
              textAlign: "center",
              marginTop: 8,
            }}
          >
            {selectedItem.label.toLowerCase()}
          </p>
        </div>

        <div
          style={{
            display: "grid",
            width: isMobile ? leftPanelWidth : undefined,
            height: isMobile ? leftPanelWidth : undefined,
            gridTemplateColumns: isMobile
              ? "repeat(3, minmax(0, 1fr))"
              : `repeat(${gridCols}, ${gridCellSize}px)`,
            gridTemplateRows: isMobile
              ? "repeat(3, minmax(0, 1fr))"
              : `repeat(${gridRows}, ${gridCellSize}px)`,
            gap: gridGap,
            flexShrink: 0,
          }}
        >
          {ITEMS.map((item, i) => {
            const delay = i * 0.06;
            const iOp = easeInOutQuad(clamp((p2 - delay * 0.5) / (1 - delay * 0.4), 0, 1));
            const isSelected = item.id === selectedId;
            return (
              <div
                key={`grid-${item.id}`}
                onClick={() => {
                  if (phase2Active) setSelectedId(item.id);
                }}
                style={{
                  borderRadius: 18,
                  border: isSelected ? "4px solid #4CAF18" : "2px dashed #b8b8b8",
                  background: "#efefef",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: iOp,
                  transform: `scale(${lerp(0.9, 1, iOp)})`,
                  cursor: phase2Active ? "pointer" : "default",
                  transition: "border-color 0.15s ease, border-width 0.15s ease",
                  willChange: "opacity, transform",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.src}
                  alt={item.label}
                  style={{
                    width: "64%",
                    height: "64%",
                    objectFit: "contain",
                    pointerEvents: "none",
                  }}
                />
              </div>
            );
          })}

          {Array.from({ length: emptyCellCount }, (_, k) => (
            <div
              key={`empty-${k}`}
              style={{
                borderRadius: 18,
                border: "2px dashed #b8b8b8",
                background: "#efefef",
                opacity: phase2Opacity,
              }}
            />
          ))}
        </div>
      </div>

    </div>
  );
}