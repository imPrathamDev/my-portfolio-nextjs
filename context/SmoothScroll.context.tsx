import React, { createContext, useState } from "react";
import Lenis from "@studio-freight/lenis";
import useIsomorphicLayoutEffect from "use-isomorphic-layout-effect";

export const SmoothScrollContext = createContext<{ lenis: any } | null>(null);

export const SmoothScrollProvider = ({ children }: { children: any }) => {
  const [lenis, setLenis] = useState<any>(null);
  useIsomorphicLayoutEffect(() => {
    setLenis(
      new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
        direction: "vertical", // vertical, horizontal
        gestureDirection: "vertical", // vertical, horizontal, both
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      })
    );
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenis }}>
      {children}
    </SmoothScrollContext.Provider>
  );
};

SmoothScrollContext.displayName = "SmoothScrollContext";
SmoothScrollProvider.displayName = "SmoothScrollProvider";
