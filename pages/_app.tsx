import "../styles/globals.css";
import "../styles/vanilla.css";
import "../styles/prism-atom.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";
import { SmoothScrollProvider } from "../context/SmoothScroll.context";
import Cursor from "../components/Cursor";
import gsap from "gsap";
import { useEffect } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  function isTouchDevice() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }

  const createElm = function (menuItem: any) {
    let menuItemsTexts = menuItem.children[0].children[0];

    const menuItemsTextsArray = [...menuItemsTexts.textContent];

    menuItemsTexts.textContent = "";

    const textsArray: any = [];

    menuItemsTextsArray.forEach((menuItemText) => {
      textsArray.push(`<span>${menuItemText}</span>`);
    });

    textsArray.forEach((textArray: any) => {
      menuItemsTexts.innerHTML += textArray;
    });

    const parentElm = menuItemsTexts.parentElement;

    const parentElmHeight = parentElm.clientHeight;
    parentElm.style.height = `${parentElmHeight}px`;

    const cloneItem = menuItemsTexts.cloneNode(true);
    parentElm.appendChild(cloneItem);
  };

  const animation = function (menuItem: any) {
    gsap.defaults({
      ease: "power1",
      stagger: {
        amount: 0.14,
        from: "start",
      },
    });
    if (isTouchDevice()) {
      menuItem.addEventListener("touchstart", function () {
        gsap.to(menuItem.children[0].children[0].children, {
          y: "-100%",
          color: menuItem.children[0].children[0].dataset.hoverColor,
        });
        gsap.to(menuItem.children[0].children[1].children, {
          y: "-100%",
          color: menuItem.children[0].children[0].dataset.hoverColor,
        });
      });
    } else {
      menuItem.addEventListener("mouseover", function () {
        gsap.to(menuItem.children[0].children[0].children, {
          y: "-100%",
          color: menuItem.children[0].children[0].dataset.hoverColor,
        });
        gsap.to(menuItem.children[0].children[1].children, {
          y: "-100%",
          color: menuItem.children[0].children[0].dataset.hoverColor,
        });
      });
    }

    if (isTouchDevice()) {
      menuItem.addEventListener("touchend", function () {
        gsap.to(menuItem.children[0].children[0].children, {
          y: "0",
          color: menuItem.children[0].children[0].dataset.defaultColor,
        });
        gsap.to(menuItem.children[0].children[1].children, {
          y: "0",
          color: menuItem.children[0].children[0].dataset.defaultColor,
        });
      });
    } else {
      menuItem.addEventListener("mouseleave", function () {
        gsap.to(menuItem.children[0].children[0].children, {
          y: "0",
          color: menuItem.children[0].children[0].dataset.defaultColor,
        });
        gsap.to(menuItem.children[0].children[1].children, {
          y: "0",
          color: menuItem.children[0].children[0].dataset.defaultColor,
        });
      });
    }
  };

  useEffect(() => {
    const targetItems = document.querySelectorAll(".js-menu-item");

    targetItems.forEach((targetItem) => {
      const menuItem = targetItem;
      createElm(menuItem);
      animation(menuItem);
    });
  }, []);
  return (
    <>
      <Head>
        <title>Pratham Sharma</title>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-ta b.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <SmoothScrollProvider>
        <Cursor />
        <Component {...pageProps} />
      </SmoothScrollProvider>
      <Analytics />
    </>
  );
}

export default MyApp;
