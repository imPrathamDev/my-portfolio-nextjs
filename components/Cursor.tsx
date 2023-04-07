import React, { useEffect, useRef, useState } from "react";
import gsap, { Power4 } from "gsap";
import isMobile from "../helper/isMobileHelper";

export default function Cursor() {
  const cursorDotOutline = useRef<HTMLInputElement | null>(null);
  const cursorDot = useRef<HTMLInputElement | null>(null);
  const cursorText = useRef<HTMLInputElement | null>(null);
  const cursorTextContainer = useRef<HTMLInputElement | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  const [height, setHeight] = useState(
    typeof window !== "undefined" ? window.innerHeight : 0
  );
  const cursorVisible = useRef(false);
  const cursorEnlarged = useRef(false);

  const onMouseMove = (event: MouseEvent) => {
    const { clientX: x, clientY: y } = event;
    setMousePosition({ x, y });
    positionDot(event);
  };
  const onMouseEnter = () => {
    cursorVisible.current = true;
    toggleCursorVisibility();
  };
  const onMouseLeave = () => {
    cursorVisible.current = false;
    toggleCursorVisibility();
  };
  const onMouseDown = () => {
    cursorEnlarged.current = true;
    toggleCursorSize();
  };
  const onMouseUp = () => {
    cursorEnlarged.current = false;
    toggleCursorSize();
  };
  const onResize = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  /**
   * Hooks
   */
  useEffect(() => {
    if (!isMobile()) {
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseenter", onMouseEnter);
      document.addEventListener("mouseleave", onMouseLeave);
      document.addEventListener("mousedown", onMouseDown);
      document.addEventListener("mouseup", onMouseUp);
      window.addEventListener("resize", onResize);
      handleLinkHovers();
      handleImageHover();
    }

    return () => {
      if (!isMobile()) {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseenter", onMouseEnter);
        document.removeEventListener("mouseleave", onMouseLeave);
        document.removeEventListener("mousedown", onMouseDown);
        document.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("resize", onResize);
      }
    };
  }, []);

  function positionDot(e: MouseEvent) {
    cursorVisible.current = true;
    toggleCursorVisibility();
    const { clientX, clientY } = e;
    if (cursorDot.current && cursorDotOutline.current) {
      cursorDot.current.style.top = clientY + "px";
      cursorDot.current.style.left = clientX + "px";
      cursorDotOutline.current.animate(
        [
          {
            opacity: 1,
            left: `${clientX}px`,
            top: `${clientY}px`,
            easing: "ease-in-out",
          },
        ],
        {
          duration: 800,
          fill: "forwards",
        }
      );
    }
  }

  function toggleCursorVisibility() {
    if (cursorVisible.current) {
      if (cursorDot.current && cursorDotOutline.current) {
        cursorDot.current.animate(
          [
            {
              opacity: 1,
              easing: "ease-in-out",
            },
          ],
          {
            duration: 400,
            fill: "forwards",
          }
        );
        cursorDotOutline.current.animate(
          [
            {
              opacity: 1,
              easing: "ease-in-out",
            },
          ],
          {
            duration: 800,
            fill: "forwards",
          }
        );
      }
    } else {
      if (cursorDot.current && cursorDotOutline.current) {
        cursorDot.current.animate(
          [
            {
              opacity: 0,
              easing: "ease-in-out",
            },
          ],
          {
            duration: 400,
            fill: "forwards",
          }
        );
        cursorDotOutline.current.animate(
          [
            {
              opacity: 0,
              easing: "ease-in-out",
            },
          ],
          {
            duration: 800,
            fill: "forwards",
          }
        );
      }
    }
  }

  function toggleCursorSize() {
    if (cursorEnlarged.current) {
      if (cursorDot.current && cursorDotOutline.current) {
        cursorDot.current.style.transform = "translate(-50%, -50%) scale(0.7)";
        cursorDotOutline.current.style.transform =
          "translate(-50%, -50%) scale(5)";
      }
    } else {
      if (cursorDot.current && cursorDotOutline.current) {
        cursorDot.current.style.transform = "translate(-50%, -50%) scale(1)";
        cursorDotOutline.current.style.transform =
          "translate(-50%, -50%) scale(1)";
      }
    }
  }

  function handleLinkHovers() {
    document.querySelectorAll("a, .linkHover").forEach((el) => {
      el.addEventListener("mouseover", () => {
        cursorEnlarged.current = true;
        toggleCursorSize();
      });
      el.addEventListener("mouseout", () => {
        cursorEnlarged.current = false;
        toggleCursorSize();
      });
    });
  }

  function handleImageHover() {
    document.querySelectorAll(".imageHover").forEach((el) => {
      let element = el as HTMLImageElement;
      el.addEventListener("mouseover", () => {
        if (
          cursorDot.current &&
          cursorDotOutline.current &&
          cursorText.current &&
          cursorTextContainer.current
        ) {
          cursorDot.current.style.transform = "translate(-50%, -50%) scale(6)";
          cursorDotOutline.current.style.transform =
            "translate(-50%, -50%) scale(7)";
          cursorText.current.innerText = element.alt;
          cursorTextContainer.current.style.display = "block";
          gsap.fromTo(
            cursorText.current,
            {
              y: 112,
            },
            {
              duration: 0.8,
              y: 0,
              delay: 0.1,
              ease: Power4.easeOut,
            }
          );
        }
      });
      el.addEventListener("mouseout", () => {
        if (
          cursorDot.current &&
          cursorDotOutline.current &&
          cursorText.current &&
          cursorTextContainer.current
        ) {
          cursorDot.current.style.transform = "translate(-50%, -50%) scale(1)";
          cursorDotOutline.current.style.transform =
            "translate(-50%, -50%) scale(1)";
          cursorTextContainer.current.style.display = "none";
        }
      });
    });
  }

  return (
    <>
      <div ref={cursorDotOutline} id="cursor-dot-outline" />
      <div ref={cursorDot} id="cursor-dot">
        <div
          ref={cursorTextContainer}
          className="hidden cursor-line relative w-[80vw] h-4 overflow-hidden"
        >
          <span
            ref={cursorText}
            className="text-sm font-dream-avenue transform absolute"
          ></span>
        </div>
      </div>
    </>
  );
}
