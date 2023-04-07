import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import gsap, { Power3 } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import CookiesModel from "../models/CookiesModel";
import { deleteCookie, getCookie, setCookie } from "../../helper/cookiesHelper";
import isMobile from "../../helper/isMobileHelper";

gsap.registerPlugin(ScrollTrigger);

// const data = [
//   {
//     title: "Twitter",
//     link: "https://twitter.com/imPrathamDev",
//   },
//   {
//     title: "Instagram",
//     link: "https://www.instagram.com/imprathamdev/",
//   },
//   {
//     title: "GitHub",
//     link: "https://github.com/imPrathamDev",
//   },
//   {
//     title: "Dribble",
//     link: "https://dribbble.com/imPrathamDev",
//   },
// ];

const data = [
  {
    title: "Term & Conditions",
    link: "/term-and-conditions",
  },
  {
    title: "Privacy Policy",
    link: "/privacy-policy",
  },
];

const Footer: React.FC = () => {
  const dividerRef = useRef<HTMLDivElement | null>(null);

  function acceptCookieConsent() {
    deleteCookie("user_cookie_consent");
    setCookie("user_cookie_consent", 1, 30);
    hideCookieContainer();
  }

  function hideCookieContainer() {
    if (typeof window !== "undefined") {
      const cookieContainer = document.getElementById("cookie-container");
      const tl = gsap.timeline();
      tl.to(cookieContainer, {
        duration: 1,
        y: 200,
        ease: Power3.easeOut,
      });
      tl.to("#footer-date", {
        duration: 1,
        bottom: "1.5rem",
        ease: Power3.easeOut,
      });
      tl.to(cookieContainer, {
        display: "none",
      });
    }
  }

  useEffect(() => {
    if (dividerRef.current) {
      gsap.fromTo(
        dividerRef.current,
        {
          width: "5rem",
        },
        {
          duration: 1,
          width: "100%",
          ease: "sine.out",
          scrollTrigger: {
            trigger: dividerRef.current,
          },
        }
      );
    }
  }, []);

  useEffect(() => {
    const checkCookies = getCookie("user_cookie_consent");
    const cookieContainer = document.getElementById("cookie-container");
    if (!checkCookies) {
      const tl = gsap.timeline();
      tl.to("#footer-date", {
        duration: 1,
        bottom: isMobile() ? "9rem" : "4rem",
        ease: Power3.easeOut,
      });
      tl.to(cookieContainer, {
        duration: 1,
        y: 0,
        ease: Power3.easeOut,
      });
    } else {
      if (cookieContainer && cookieContainer.style) {
        cookieContainer.style.display = "none";
      }
    }
  }, []);
  return (
    <div className="mt-24">
      <CookiesModel
        acceptCookieConsent={acceptCookieConsent}
        hideCookieContainer={hideCookieContainer}
      />
      <div
        ref={dividerRef}
        className="h-[2px] w-full bg-primary-dark-white opacity-60 mx-auto"
      ></div>
      <footer className="pb-5 xl:-mb-24 lg:-mb-24 lg:pb-4">
        <span
          id="footer-date"
          className="font-sans-light fixed bottom-6 right-4 text-sm text-primary-dark-white mix-blend-difference z-10"
        >
          © 2022 - infinity
        </span>
        <div className="mx-6 xl:mx-24 lg:mx-24 pt-6 flex flex-col lg:flex-row lg:gap-x-3 gap-y-2 lg:items-center lg:justify-between">
          <Link href={`/`}>
            <a>
              <h4 className="text-3xl font-dream-avenue text-center">
                Pratham<span className="text-primary">.</span>
              </h4>
            </a>
          </Link>
          <div className="flex flex-col lg:flex-row lg:items-center gap-x-3 text-sm  mr-8">
            {data.map((link, index) => (
              <a
                key={index}
                href={link.link}
                className="transition-all hover:text-primary flex items-center group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1}
                  stroke="currentColor"
                  className="w-4 h-4 transition-all transform group-hover:scale-x-150 group-hover:w-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12h-15"
                  />
                </svg>
                {link.title}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
