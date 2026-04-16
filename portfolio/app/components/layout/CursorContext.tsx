'use client';
import React, { createContext, useContext, useMemo, useState, ReactNode } from "react";

/** `play`: native crosshair on the map; custom pill only while `hoverText` is set. */
export type CursorMode = "default" | "play";

interface CursorContextType {
  hoverText: string | null;
  setCursorLabel: (label: string | null) => void;
  cursorEnabled: boolean;
  setCursorEnabled: (enabled: boolean) => void;
  cursorMode: CursorMode;
  setCursorMode: (mode: CursorMode) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [cursorEnabled, setCursorEnabled] = useState(true);
  const [cursorMode, setCursorMode] = useState<CursorMode>("default");
  const value = useMemo(
    () => ({
      hoverText,
      setCursorLabel: setHoverText,
      cursorEnabled,
      setCursorEnabled,
      cursorMode,
      setCursorMode,
    }),
    [hoverText, cursorEnabled, cursorMode]
  );

  return (
    <CursorContext.Provider value={value}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursorContext = () => {
  const context = useContext(CursorContext);
  if (!context) throw new Error("useCursorContext must be used within CursorProvider");
  return context;
};