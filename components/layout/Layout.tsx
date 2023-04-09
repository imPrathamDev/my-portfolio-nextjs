import { useContext } from "react";
import Footer from "../footer/Footer";
import NavBar from "../header/NavBar";
import gsap from "gsap";
import { useEffect } from "react";
import Cursor from "../Cursor";
import { SmoothScrollContext } from "../../context/SmoothScroll.context";

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Layout = ({ children }: Props) => {
  const ScrollData = useContext(SmoothScrollContext);

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

  useEffect(() => {
    const scrollProgress = document.getElementById("side-scroll-progress");
    if (scrollProgress) {
      ScrollData?.lenis?.on(
        "scroll",
        (scroll: {
          direction: number;
          limit: number;
          progress: number;
          scroll: number;
          velocity: number;
        }) => {
          gsap.to(scrollProgress, {
            duration: 0.5,
            height: (scroll.progress * 105).toFixed() + "vh",
            ease: "sine.out",
          });
          // scrollProgress.style.height =
          //   (scroll.progress * 100).toFixed() + "vh";
          // console.log((scroll.progress * 100).toFixed());
        }
      );
    }
  }, [ScrollData]);
  return (
    <>
      <Cursor />
      <NavBar />
      <div
        id="side-scroll-progress"
        className="hidden lg:block w-[2px] m-0 bg-primary-white fixed right-0"
      ></div>
      {children}
      <Footer />
    </>
  );
};

export default Layout;
