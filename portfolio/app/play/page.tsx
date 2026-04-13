"use client";

import {
  useRef,
  useState,
  useCallback,
  useEffect,
  type MouseEvent as ReactMouseEvent,
  type TouchEvent as ReactTouchEvent,
} from "react";
import { createPortal } from "react-dom";

import { PlayMapPaths } from "./PlayMapPaths";

const SVG_WIDTH = 3458;
const SVG_HEIGHT = 2236;
const TICK_COUNT_X = 30;
const TICK_COUNT_Y = 20;
const TICK_OFFSET = 24;
const MINIMAP_W = 200;
const MINIMAP_H = Math.round(MINIMAP_W * (SVG_HEIGHT / SVG_WIDTH));
const RULER_BG = "#f5f4f0";
/** Above pan canvas (1); below custom cursor (50) and HUD/minimap (58–60). */
const RULER_Z = 55;
const CORNER_Z = 56;

export default function Play() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const [viewportSize, setViewportSize] = useState({ w: 0, h: 0 });
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [minimapMounted, setMinimapMounted] = useState(false);
  const [pointerInCanvas, setPointerInCanvas] = useState(false);
  const isPanning = useRef(false);
  const startPoint = useRef({ x: 0, y: 0 });
  const startTransform = useRef({ x: 0, y: 0 });

  const MIN_SCALE = 0.7;
  const MAX_SCALE = 8;

  const clampScale = (s: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s));

  const clampTranslation = useCallback((x: number, y: number, scale: number) => {
    if (!containerRef.current) return { x, y };
    const vw = containerRef.current.clientWidth;
    const vh = containerRef.current.clientHeight;
    const scaledW = SVG_WIDTH * scale;
    const scaledH = SVG_HEIGHT * scale;
    const minX = scaledW >= vw ? -(scaledW - vw) : 0;
    const maxX = scaledW >= vw ? 0 : vw - scaledW;
    const minY = scaledH >= vh ? -(scaledH - vh) : 0;
    const maxY = scaledH >= vh ? 0 : vh - scaledH;
    return {
      x: Math.min(maxX, Math.max(minX, x)),
      y: Math.min(maxY, Math.max(minY, y)),
    };
  }, []);

  const onMouseDown = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    isPanning.current = true;
    startPoint.current = { x: e.clientX, y: e.clientY };
    startTransform.current = { x: transform.x, y: transform.y };
    e.currentTarget.style.cursor = "grabbing";
  }, [transform]);

  const onMouseMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const canvasX = e.clientX - rect.left;
      const canvasY = e.clientY - rect.top;
      setCursor({
        x: (canvasX - transform.x) / transform.scale,
        y: (canvasY - transform.y) / transform.scale,
      });
    }
    if (!isPanning.current) return;
    const dx = e.clientX - startPoint.current.x;
    const dy = e.clientY - startPoint.current.y;
    const raw = {
      x: startTransform.current.x + dx,
      y: startTransform.current.y + dy,
    };
    const clamped = clampTranslation(raw.x, raw.y, transform.scale);
    setTransform((t) => ({ ...t, ...clamped }));
  }, [transform, clampTranslation]);

  const onMouseUp = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    isPanning.current = false;
    if (e.currentTarget) e.currentTarget.style.cursor = "grab";
  }, []);

  const onCanvasMouseLeave = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      setPointerInCanvas(false);
      onMouseUp(e);
    },
    [onMouseUp]
  );

  const onWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const zoomFactor = e.deltaY < 0 ? 1.1 : 0.9;
    setTransform((t) => {
      const newScale = clampScale(t.scale * zoomFactor);
      const scaleRatio = newScale / t.scale;
      const rawX = mouseX - scaleRatio * (mouseX - t.x);
      const rawY = mouseY - scaleRatio * (mouseY - t.y);
      const clamped = clampTranslation(rawX, rawY, newScale);
      return { scale: newScale, ...clamped };
    });
  }, [clampTranslation]);

  type TouchPoint = { clientX: number; clientY: number };
  const lastTouches = useRef<TouchPoint[] | null>(null);

  const onTouchStart = useCallback((e: ReactTouchEvent<HTMLDivElement>) => {
    lastTouches.current = Array.from(e.touches).map((t) => ({
      clientX: t.clientX,
      clientY: t.clientY,
    }));
  }, []);

  const onTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault();
    const touches = e.touches;
    if (touches.length === 1 && lastTouches.current?.length === 1) {
      const dx = touches[0].clientX - lastTouches.current[0]!.clientX;
      const dy = touches[0].clientY - lastTouches.current[0]!.clientY;
      setTransform((t) => {
        const clamped = clampTranslation(t.x + dx, t.y + dy, t.scale);
        return { ...t, ...clamped };
      });
    }
    if (touches.length === 2 && lastTouches.current?.length === 2) {
      const prevDist = Math.hypot(
        lastTouches.current[0]!.clientX - lastTouches.current[1]!.clientX,
        lastTouches.current[0]!.clientY - lastTouches.current[1]!.clientY
      );
      const newDist = Math.hypot(
        touches[0].clientX - touches[1].clientX,
        touches[0].clientY - touches[1].clientY
      );
      const zoomFactor = newDist / prevDist;
      const midX = (touches[0].clientX + touches[1].clientX) / 2;
      const midY = (touches[0].clientY + touches[1].clientY) / 2;
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const originX = midX - rect.left;
      const originY = midY - rect.top;
      setTransform((t) => {
        const newScale = clampScale(t.scale * zoomFactor);
        const scaleRatio = newScale / t.scale;
        const rawX = originX - scaleRatio * (originX - t.x);
        const rawY = originY - scaleRatio * (originY - t.y);
        const clamped = clampTranslation(rawX, rawY, newScale);
        return { scale: newScale, ...clamped };
      });
    }
    lastTouches.current = Array.from(touches).map((t) => ({
      clientX: t.clientX,
      clientY: t.clientY,
    }));
  }, [clampTranslation]);

  const onTouchEnd = useCallback(() => {
    lastTouches.current = null;
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () =>
      setViewportSize({ w: el.clientWidth, h: el.clientHeight });
    updateSize();
    window.addEventListener("resize", updateSize);
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", updateSize);
    };
  }, [onWheel, onTouchMove]);

  useEffect(() => {
    queueMicrotask(() => setMinimapMounted(true));
  }, []);

  const cw = viewportSize.w;
  const ch = viewportSize.h;
  const mapReady = cw > 0 && ch > 0;
  const s = transform.scale;
  const mapViewBox = mapReady
    ? `${-transform.x / s} ${-transform.y / s} ${cw / s} ${ch / s}`
    : `0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`;

  // Minimap: viewport rect in minimap space
  const minimapScale = MINIMAP_W / SVG_WIDTH;
  const rectW = Math.min(MINIMAP_W, (cw / transform.scale) * minimapScale);
  const rectH = Math.min(MINIMAP_H, (ch / transform.scale) * minimapScale);
  const rectX = Math.max(0, Math.min(MINIMAP_W - rectW, (-transform.x / transform.scale) * minimapScale));
  const rectY = Math.max(0, Math.min(MINIMAP_H - rectH, (-transform.y / transform.scale) * minimapScale));
  const cursorMinimapX = Math.max(0, Math.min(MINIMAP_W, (cursor.x / SVG_WIDTH) * MINIMAP_W));
  const cursorMinimapY = Math.max(0, Math.min(MINIMAP_H, (cursor.y / SVG_HEIGHT) * MINIMAP_H));

  const coordReadout = (
    <div
      style={{
        position: "fixed",
        right: 24,
        bottom: 24,
        zIndex: 58,
        pointerEvents: "none",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
        fontSize: 12,
        lineHeight: 1.4,
        letterSpacing: "-0.02em",
        color: "#514433",
        background: "rgba(245,244, 240, 0.94)",
        border: "1px solid #ccc",
        borderRadius: 4,
        padding: "6px 10px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {pointerInCanvas
        ? `${Math.round(cursor.x)}, ${Math.round(cursor.y)}`
        : "—, —"}
    </div>
  );

  const minimap = (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: TICK_OFFSET + 16,
        width: MINIMAP_W,
        height: MINIMAP_H,
        zIndex: 60,
        overflow: "hidden",
        border: "1px solid #ccc",
        background: RULER_BG,
        boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
      }}
    >
      <svg
        style={{ position: "absolute", top: 0, left: 0, display: "block" }}
        width={MINIMAP_W}
        height={MINIMAP_H}
        viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
        preserveAspectRatio="xMidYMid meet"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <PlayMapPaths />
      </svg>
      <div
        style={{
          position: "absolute",
          left: rectX,
          top: rectY,
          width: rectW,
          height: rectH,
          border: "1.5px solid #c97d2e",
          background: "rgba(201,125,46,0.08)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: cursorMinimapX - 3,
          top: cursorMinimapY - 3,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#c97d2e",
          pointerEvents: "none",
        }}
      />
    </div>
  );

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        minHeight: 0,
        overflow: "visible",
        background: RULER_BG,
        position: "relative",
      }}
    >

      {/* Top ruler */}
      <div style={{
        position: "fixed", top: 0, left: TICK_OFFSET, right: 0,
        height: TICK_OFFSET, zIndex: RULER_Z, pointerEvents: "none",
        background: RULER_BG,
      }}>
        {Array.from({ length: TICK_COUNT_X + 1 }).map((_, i) => {
          const pct = (i / TICK_COUNT_X) * 100;
          const isMajor = i % 5 === 0;
          return (
            <div key={i} style={{ position: "absolute", left: `${pct}%`, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: "1px", height: isMajor ? 10 : 5, background: "#999" }} />
            </div>
          );
        })}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "1px", background: "#ccc" }} />
      </div>

      {/* Left ruler — solid bg + high z so it isn’t lost under layout / map edge */}
      <div style={{
        position: "fixed",
        top: TICK_OFFSET,
        left: 0,
        width: TICK_OFFSET,
        height: `calc(100dvh - ${TICK_OFFSET}px)`,
        zIndex: RULER_Z,
        pointerEvents: "none",
        background: RULER_BG,
      }}>
        {Array.from({ length: TICK_COUNT_Y + 1 }).map((_, i) => {
          const pct = (i / TICK_COUNT_Y) * 100;
          const isMajor = i % 5 === 0;
          return (
            <div key={i} style={{ position: "absolute", top: `${pct}%`, right: 0, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
              <div style={{ height: "1px", width: isMajor ? 10 : 5, background: "#999" }} />
            </div>
          );
        })}
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "1px", background: "#ccc" }} />
      </div>

      {/* Pan/zoom canvas */}
      <div
        ref={containerRef}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseEnter={() => setPointerInCanvas(true)}
        onMouseLeave={onCanvasMouseLeave}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{
          position: "absolute",
          top: TICK_OFFSET,
          left: TICK_OFFSET,
          right: 0,
          bottom: 0,
          zIndex: 1,
          cursor: "grab",
          overflow: "hidden",
        }}
      >
        {mapReady && (
          <svg
            style={{ position: "absolute", top: 0, left: 0, display: "block" }}
            width={cw}
            height={ch}
            viewBox={mapViewBox}
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            shapeRendering="geometricPrecision"
          >
            <PlayMapPaths />
          </svg>
        )}
      </div>

      {minimapMounted
        ? createPortal(
            <>
              {minimap}
              {coordReadout}
            </>,
            document.body
          )
        : null}

    </div>
  );
}