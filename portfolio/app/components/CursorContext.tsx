'use client';
import React, { createContext, useContext, useMemo, useState, ReactNode } from "react";

interface CursorContextType {
  hoverText: string | null;
  setCursorLabel: (label: string | null) => void;
  cursorEnabled: boolean;
  setCursorEnabled: (enabled: boolean) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [cursorEnabled, setCursorEnabled] = useState(true);
  const value = useMemo(
    () => ({
      hoverText,
      setCursorLabel: setHoverText,
      cursorEnabled,
      setCursorEnabled,
    }),
    [hoverText, cursorEnabled]
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