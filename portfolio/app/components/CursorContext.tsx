'use client';
import React, { createContext, useContext, useMemo, useState, ReactNode } from "react";

interface CursorContextType {
  hoverText: string | null;
  setCursorLabel: (label: string | null) => void;
}

const CursorContext = createContext<CursorContextType | undefined>(undefined);

export const CursorProvider = ({ children }: { children: ReactNode }) => {
  const [hoverText, setHoverText] = useState<string | null>(null);
  const value = useMemo(
    () => ({
      hoverText,
      setCursorLabel: setHoverText,
    }),
    [hoverText]
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