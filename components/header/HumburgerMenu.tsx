import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import navBarImage from "../../public/images/navbar-bg.jpg";
import useOnScreen from "../../hooks/useOnScreen";
import cn from "classnames";
import LinkButton from "../LinkButton";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap-trial/dist/ScrollTrigger";
import { Power3 } from "gsap";
// gsap.registerPlugin(ScrollTrigger);

interface Props {
  show: boolean;
}

const HumburgerMenu = ({ show }: Props) => {
  const ref = useRef(null);
  const [reveal, setReveal] = useState(false);
  const onScreen = useOnScreen(ref);
  const menu = [
    { title: "Home", path: "/" },
    { title: "Projects", path: "/projects" },
    { title: "Blog", path: "/blog" },
    { title: "Resume", path: "/resume.pdf" },
  ];

  useEffect(() => {
    if (onScreen) setReveal(true);
  }, [onScreen]);

  useEffect(() => {
    if (reveal) {
      gsap.fromTo(
        ".humburgerMenuText > span",
        {
          x: -400,
        },
        {
          duration: 1,
          x: 0,
          ease: Power3.easeOut,
          stagger: {
            amount: 0.5,
          },
        }
      );
    }
  }, [reveal]);

  return (
    <section
      id="nav-container"
      className="top-0 bottom-0 -left-[200vw] right-0 fixed w-full h-full z-[999] bg-primary-white text-primary-black pt-20 selection:bg-primary-black selection:text-primary-white"
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-x-8">
        <ul className="lg:w-1/4 mt-6 lg:mt-0 text-center lg:text-start mx-auto lg:mx-0 relative">
          {menu.map((item) => (
            <div
              key={item?.title}
              className="w-full h-fit lg:w-[60vw] cursor-pointer flex justify-center lg:block"
            >
              <LinkButton
                text={item?.title}
                link={item?.path}
                textSize="text-6xl lg:text-8xl my-3 lg:my-6 lg:ml-16"
                colorClass="text-primary-black hover:text-primary"
                extraClass="humburgerMenuText"
                color="#0e0a0a"
                hoverColor="#f0a500"
              />
            </div>
          ))}
        </ul>
        <div className="lg:w-3/4 flex flex-col items-end">
          <div
            ref={ref}
            className={cn(
              "hidden lg:block w-3/4 invisible h-80 relative overflow-hidden",
              {
                "reveal-horizontal": reveal,
              }
            )}
          >
            <Image
              src={navBarImage}
              alt="Brendan Eich"
              layout="fill"
              className="object-cover object-bottom transform transition-all duration-300 scale-125 hover:scale-105 imageHover"
            />
          </div>
          <div className="my-8 text-center lg:text-left lg:my-4 mx-6 lg:mr-4 flex flex-col lg:flex-row lg:items-start items-center gap-x-6 z-10">
            <h4
              id="nav-heading"
              className="text-2xl font-dream-avenue opacity-0"
            >
              Brendan Eich
            </h4>
            <p id="nav-content" className="max-w-sm opacity-0">
              If the web can be evolved to include the missing APIs and have
              better performance, [developers] won&apos;t need to go beyond the
              web.
            </p>
          </div>
        </div>
      </div>
      <h3 className="block lg:hidden absolute w-full bottom-0 text-lg font-dream-avenue text-center">
        Pratham Sharma
      </h3>
    </section>
  );
};

export default HumburgerMenu;
