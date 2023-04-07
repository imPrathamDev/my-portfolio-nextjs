import gsap, { Expo, Power2 } from "gsap";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import HumburgerMenu from "./HumburgerMenu";

const data = [
  {
    id: 0,
    title: "Available for freelancing",
    link: "",
  },
  {
    id: 1,
    title: "Checkout My Blogs",
    link: "/bog",
  },
];

const NavBar: React.FC = () => {
  const [show, setShow] = useState(false);
  let tl = gsap.timeline();
  const isMobile = (): Boolean => {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      return true;
    }
    return false;
  };
  useEffect(() => {
    if (show) {
      tl.to("#nav-container", {
        duration: 0.8,
        left: 0,
        ease: Expo.easeInOut,
      });
      tl.to(
        "#nav-item",
        {
          duration: 0.8,
          top: 0,
          ease: Power2.easeInOut,
          stagger: {
            amount: 0.6,
          },
        },
        "-=0.4"
      );
      tl.to("#nav-heading", {
        duration: 0.4,
        opacity: 1,
        ease: "power2.easeInOut",
      });
      tl.to("#nav-content", {
        duration: 0.6,
        opacity: 1,
        ease: "power2.easeInOut",
      });
    } else {
      tl.to("#nav-container", {
        duration: 0.8,
        left: "-100%",
        ease: Expo.easeInOut,
      });
      tl.to("#nav-item", {
        duration: 0,
        top: isMobile() ? 112 : 96,
      });
    }
  }, [show]);

  const showNav = () => {
    setShow((prev) => !prev);
  };
  return (
    <>
      <header
        id="main-header"
        className="sticky top-0 mx-4 xl:-mb-24 lg:-mb-24 xl:mx-16 py-6 flex items-center justify-between mix-blend-difference z-[1000]"
      >
        <Link href={"/"}>
          <a>
            <h1
              data-value="Tatakae"
              className="text-3xl tracking-wide font-dream-avenue mix-blend-difference will-change-transform heading__transform"
            >
              Pratham<span className="text-primary">.</span>
            </h1>
          </a>
        </Link>
        <button
          onClick={() => showNav()}
          className="linkHover flex items-center font-dream-avenue tracking-widest relative text-2xl transform transition-all duration-700 hover:text-primary after:absolute after:h-0.5 after:w-0 after:bg-primary after:transition-all after:duration-700 after:-bottom-0.5 after:left-0 after:rounded-full hover:after:w-full group"
        >
          Menu
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 transform transition-all duration-700 group-hover:rotate-90"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9h16.5m-16.5 6.75h16.5"
            />
          </svg>
        </button>
        {/* <div className="flex items-center gap-x-3">
          <div
            // id="hero-marquee"
            className="py-1 rounded-full border border-primary-dark-white max-w-[25vw] bg-primary-black/10 backdrop-blur-lg z-[999999999] linkHover"
          >
            <div className="relative flex overflow-x-hidden text-lg">
              <div className="animate-marquee-hero whitespace-nowrap">
                <span className="mx-4">Marquee Item 1</span>
                <span className="mx-4">Marquee Item 2</span>
                <span className="mx-4">Marquee Item 3</span>
                <span className="mx-4">Marquee Item 4</span>
                <span className="mx-4">Marquee Item 5</span>
              </div>

              <div className="absolute top-0 animate-marquee-hero-2 whitespace-nowrap">
                <span className="mx-4">Marquee Item 1</span>
                <span className="mx-4">Marquee Item 2</span>
                <span className="mx-4">Marquee Item 3</span>
                <span className="mx-4">Marquee Item 4</span>
                <span className="mx-4">Marquee Item 5</span>
              </div>
            </div>
          </div>
        </div> */}
      </header>
      <HumburgerMenu show={show} />
    </>
  );
};

export default NavBar;
