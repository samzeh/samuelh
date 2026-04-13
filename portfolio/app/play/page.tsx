"use client";

import {
  useRef,
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  type MouseEvent as ReactMouseEvent,
  type TouchEvent as ReactTouchEvent,
} from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

import { useCursorContext } from "@/app/components/CursorContext";
import { PlayMapPaths } from "./PlayMapPaths";
import { CATEGORIES, type MapItem } from "./playmapdata";

const SVG_WIDTH = 3458;
const SVG_HEIGHT = 2236;
const TICK_COUNT_X = 30;
const TICK_COUNT_Y = 20;
const TICK_OFFSET = 24;
const MINIMAP_W = 200;
const MINIMAP_H = Math.round(MINIMAP_W * (SVG_HEIGHT / SVG_WIDTH));
const RULER_BG = "#f5f4f0";
const RULER_Z = 55;
/** Below rulers (55) so the ruler strips paint above / left of the control. */
const BACK_BTN_Z = 50;
/** Clicks under this many CSS px of movement (from pointer down) count as taps, not pans. */
const CLICK_MAX_DRAG_PX = 8;

const ITEMS_PAINT_ORDER = CATEGORIES.flatMap((c) => c.items);

function findTopLinkedItemAt(sx: number, sy: number): MapItem | null {
  for (let i = ITEMS_PAINT_ORDER.length - 1; i >= 0; i--) {
    const it = ITEMS_PAINT_ORDER[i]!;
    if (!it.link) continue;
    if (sx >= it.x && sx <= it.x + it.w && sy >= it.y && sy <= it.y + it.h) return it;
  }
  return null;
}

function openMapLink(
  href: string,
  router: ReturnType<typeof useRouter>,
  e?: ReactMouseEvent<HTMLDivElement>
) {
  const forceNewTab = Boolean(e?.ctrlKey || e?.metaKey || e?.shiftKey || e?.altKey);
  const external = /^https?:\/\//i.test(href) || href.startsWith("//");
  if (external) {
    window.open(href, "_blank", "noopener,noreferrer");
    return;
  }
  if (href.startsWith("mailto:") || href.startsWith("tel:")) {
    window.location.href = href;
    return;
  }
  const path = href.startsWith("/") ? href : `/${href}`;
  if (forceNewTab) window.open(path, "_blank", "noopener,noreferrer");
  else router.push(path);
}

export default function Play() {
  const router = useRouter();
  const { setCursorLabel, setCursorMode } = useCursorContext();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [transform, setTransform] = useState({ x: 0, y: 0, scale: 1 });
  const transformRef = useRef(transform);
  const [viewportSize, setViewportSize] = useState({ w: 0, h: 0 });
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [minimapMounted, setMinimapMounted] = useState(false);
  const [pointerInCanvas, setPointerInCanvas] = useState(false);
  const isPanning = useRef(false);
  const startPoint = useRef({ x: 0, y: 0 });
  const startTransform = useRef({ x: 0, y: 0 });
  const panMaxDistRef = useRef(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const touchMaxDistRef = useRef(0);
  /** Map-space pointer; updated every move, read by throttled setCursor. */
  const cursorMapRef = useRef({ x: 0, y: 0 });
  const cursorRafRef = useRef<number | null>(null);

  const MIN_SCALE = 0.7;
  const MAX_SCALE = 8;

  const clampScale = (s: number) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s));

  const handleBack = useCallback(() => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }
    router.push("/");
  }, [router]);

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
    panMaxDistRef.current = 0;
    startPoint.current = { x: e.clientX, y: e.clientY };
    const t = transformRef.current;
    startTransform.current = { x: t.x, y: t.y };
    e.currentTarget.style.cursor = "grabbing";
  }, []);

  const flushCursorUi = useCallback(() => {
    cursorRafRef.current = null;
    const { x, y } = cursorMapRef.current;
    setCursor((prev) =>
      prev.x === x && prev.y === y ? prev : { x, y }
    );
  }, []);

  const onMouseMove = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const canvasX = e.clientX - rect.left;
        const canvasY = e.clientY - rect.top;
        const t = transformRef.current;
        cursorMapRef.current = {
          x: (canvasX - t.x) / t.scale,
          y: (canvasY - t.y) / t.scale,
        };
        if (cursorRafRef.current === null) {
          cursorRafRef.current = requestAnimationFrame(flushCursorUi);
        }
      }
      if (!isPanning.current) return;
      const dx = e.clientX - startPoint.current.x;
      const dy = e.clientY - startPoint.current.y;
      panMaxDistRef.current = Math.max(
        panMaxDistRef.current,
        Math.hypot(dx, dy)
      );
      setTransform((prev) => {
        const clamped = clampTranslation(
          startTransform.current.x + dx,
          startTransform.current.y + dy,
          prev.scale
        );
        if (prev.x === clamped.x && prev.y === clamped.y) return prev;
        return { ...prev, ...clamped };
      });
    },
    [clampTranslation, flushCursorUi]
  );

  const onMouseUp = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      const el = containerRef.current;
      if (e.button === 0 && el && panMaxDistRef.current <= CLICK_MAX_DRAG_PX) {
        const t = transformRef.current;
        const rect = el.getBoundingClientRect();
        const sx = (e.clientX - rect.left - t.x) / t.scale;
        const sy = (e.clientY - rect.top - t.y) / t.scale;
        const hit = findTopLinkedItemAt(sx, sy);
        if (hit?.link) openMapLink(hit.link, router, e);
      }
      isPanning.current = false;
      if (e.currentTarget) e.currentTarget.style.cursor = "crosshair";
    },
    [router]
  );

  const onCanvasMouseLeave = useCallback(
    (e: ReactMouseEvent<HTMLDivElement>) => {
      setPointerInCanvas(false);
      setCursorLabel(null);
      onMouseUp(e);
    },
    [onMouseUp, setCursorLabel]
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
    if (e.touches.length === 1) {
      const t0 = e.touches[0]!;
      touchStartRef.current = { x: t0.clientX, y: t0.clientY };
      touchMaxDistRef.current = 0;
    } else {
      touchStartRef.current = null;
    }
    lastTouches.current = Array.from(e.touches).map((t) => ({
      clientX: t.clientX,
      clientY: t.clientY,
    }));
  }, []);

  const onTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault();
    const touches = e.touches;
    if (touches.length !== 1) touchStartRef.current = null;
    if (touches.length === 1 && lastTouches.current?.length === 1) {
      const dx = touches[0].clientX - lastTouches.current[0]!.clientX;
      const dy = touches[0].clientY - lastTouches.current[0]!.clientY;
      if (touchStartRef.current) {
        const ox = touches[0].clientX - touchStartRef.current.x;
        const oy = touches[0].clientY - touchStartRef.current.y;
        touchMaxDistRef.current = Math.max(
          touchMaxDistRef.current,
          Math.hypot(ox, oy)
        );
      }
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

  const onTouchEnd = useCallback(
    (e: ReactTouchEvent<HTMLDivElement>) => {
      const el = containerRef.current;
      const tch = e.changedTouches[0];
      if (
        el &&
        tch &&
        touchStartRef.current &&
        e.touches.length === 0 &&
        touchMaxDistRef.current <= CLICK_MAX_DRAG_PX
      ) {
        const t = transformRef.current;
        const rect = el.getBoundingClientRect();
        const sx = (tch.clientX - rect.left - t.x) / t.scale;
        const sy = (tch.clientY - rect.top - t.y) / t.scale;
        const hit = findTopLinkedItemAt(sx, sy);
        if (hit?.link) openMapLink(hit.link, router);
      }
      touchStartRef.current = null;
      lastTouches.current = null;
    },
    [router]
  );

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

  useLayoutEffect(() => {
    transformRef.current = transform;
  }, [transform]);

  useEffect(() => {
    return () => {
      if (cursorRafRef.current !== null) {
        cancelAnimationFrame(cursorRafRef.current);
        cursorRafRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    queueMicrotask(() => setMinimapMounted(true));
  }, []);

  useEffect(() => {
    setCursorMode("play");
    return () => {
      setCursorMode("default");
      setCursorLabel(null);
    };
  }, [setCursorMode, setCursorLabel]);

  const cw = viewportSize.w;
  const ch = viewportSize.h;
  const mapReady = cw > 0 && ch > 0;
  const s = transform.scale;
  const mapViewBox = mapReady
    ? `${-transform.x / s} ${-transform.y / s} ${cw / s} ${ch / s}`
    : `0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`;

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
        background: "rgba(245,244,240,0.94)",
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

        {/* Red squares for each item on the minimap */}
        {CATEGORIES.flatMap((cat) =>
          cat.items.map((item) => (
            <rect
              key={item.id}
              x={item.x}
              y={item.y}
              width={item.w}
              height={item.h}
              fill="rgba(200,40,40,0.8)"
            />
          ))
        )}
      </svg>

      {/* Viewport rect */}
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
      {/* Cursor dot */}
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
      <button
        type="button"
        onClick={handleBack}
        aria-label="Go back to previous page"
        style={{
          position: "fixed",
          /* Top ruler ends at y = TICK_OFFSET; left ruler ends at x = TICK_OFFSET */
          top: `calc(${TICK_OFFSET}px + 12px)`,
          left: `calc(${TICK_OFFSET}px + 12px)`,
          zIndex: BACK_BTN_Z,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "4px 12px",
          fontFamily: "var(--font-instrument-sans, ui-sans-serif, system-ui)",
          fontSize: 14,
          letterSpacing: "-0.06em",
          color: "#514433",
          background: "rgba(245,244,240,0.96)",
          border: "1px solid #ccc",
          borderRadius: 6,
          boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
        }}
      >

        Back
      </button>

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

      {/* Left ruler */}
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
          cursor: "crosshair",
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

            {/* Images placed at their x/y positions */}
            {CATEGORIES.flatMap((cat) =>
              cat.items.map((item) => (
                <image
                  key={item.id}
                  href={item.image}
                  x={item.x}
                  y={item.y}
                  width={item.w}
                  height={item.h}
                  preserveAspectRatio="xMidYMid slice"
                  style={{ cursor: item.link ? "pointer" : "inherit" }}
                  onMouseEnter={() => setCursorLabel(item.hoverText)}
                  onMouseLeave={() => setCursorLabel(null)}
                />
              ))
            )}

            {/* Category label above each cluster */}
            {CATEGORIES.map((cat) => {
              const topY = Math.min(...cat.items.map((i) => i.y));
              const avgX = cat.items.reduce((sum, i) => sum + i.x + i.w / 2, 0) / cat.items.length;
              return (
                <text
                  key={cat.id}
                  x={avgX}
                  y={topY - 24}
                  textAnchor="middle"
                  fontFamily="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
                  fontSize={28}
                  fill="#514433"
                  opacity={0.5}
                  letterSpacing="-0.03em"
                  pointerEvents="none"
                >
                  {cat.label}
                </text>
              );
            })}
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