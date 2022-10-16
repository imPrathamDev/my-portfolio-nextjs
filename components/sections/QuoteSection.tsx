import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import cardImage from "../../public/images/qimage1.jpg";
import secondCardImage from "../../public/images/qimage2.jpg";
import useOnScreen from "../../hooks/useOnScreen";
import gsap from "gsap";
const { SplitText } = require("../../utils/Split3.min.js");

const QuoteSection: React.FC = () => {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref);
  const [runOnce, setRunOnce] = useState(false);
  useEffect(() => {
    if (onScreen) {
      if (!runOnce) {
        setRunOnce(true);
        const split = new SplitText("#quote-text", {
          type: "lines",
          linesClass: "transform translate-y-[500px]",
        });

        const splitParent = new SplitText("#quote-text", {
          type: "lines",
          linesClass:
            "overflow-hidden xl:w-[60rem] lg:w-[60rem] text-center xl:text-left lg:text-left text-primary-white transition-all",
        });

        gsap.to(split.lines, {
          duration: 1,
          y: 0,
          opacity: 1,
          stagger: 0.1,
          ease: "power2",
        });
      }
    }
  }, [onScreen]);
  return (
    <section
      ref={ref}
      className="my-14 xl:relative mx-6 xl:mx-20 lg:mx-20 xl:h-screen lg:h-screen flex flex-col xl:flex-row lg:flex-row items-center mix-blend-difference"
    >
      <div className="flex">
        <div className="xl:w-1/2 lg:w-1/2">
          <div className="w-full text-center xl:text-left lg:text-left">
            <span className="text-lg my-2">Technologies Which Use</span>
          </div>
          <h2
            id="quote-text"
            className="font-dream-avenue text-center xl:text-left lg:text-left text-6xl xl:text-6xl text-primary-black"
          >
            Javascript, TypeScript, ReactJS, NextJS, Redux, Redux Toolkit, React
            Native, TailwindCSS, NodeJS, ExpressJS, GSAP, MongoDB, Firebase,
            SQL, Etc.
          </h2>
        </div>
        <div className="hidden xl:visible lg:visible w-1/2 h-full xl:flex lg:flex flex-col gap-y-4">
          <div
            data-scroll
            data-scroll-speed="1"
            data-scroll-delay="0.5"
            className="relative overflow-hidden w-72 h-40 border-2 border-primary-dark-white border-opacity-60 ml-8 mt-8"
          >
            <Image
              src={cardImage}
              layout="fill"
              className="object-cover object-center"
            />
          </div>
          <div
            data-scroll
            data-scroll-speed="6"
            data-scroll-delay="0.8"
            className="absolute xl:bottom-24 xl:right-20 lg:bottom-20 lg:right-16 md:bottom-20 md:right-16"
          >
            <div className="relative overflow-hidden w-96 h-52 border-2 border-primary-dark-white border-opacity-60 ml-8 mt-8">
              <Image
                src={secondCardImage}
                layout="fill"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
