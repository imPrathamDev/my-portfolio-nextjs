import React, { createContext, useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";

export const SmoothScrollContext = createContext<{
  lenis: Lenis | null;
} | null>(null);

export const SmoothScrollProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [lenisData, setLenisData] = useState<Lenis | null>(null);
  let lenis: Lenis;
  useEffect(() => {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical", // vertical, horizontal
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    setLenisData(lenis);
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisData }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

SmoothScrollContext.displayName = "SmoothScrollContext";
SmoothScrollProvider.displayName = "SmoothScrollProvider";
