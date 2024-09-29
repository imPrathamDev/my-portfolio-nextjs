import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import cardImage from "../../public/images/stack-1.jpg";
import secondCardImage from "../../public/images/stack-2.jpg";
import useOnScreen from "../../hooks/useOnScreen";
import gsap, { Power2 } from "gsap";
import { useGSAP } from "@gsap/react";
const { SplitText } = require("../../utils/Split3.min.js");

gsap.registerPlugin(useGSAP);

const QuoteSection: React.FC = () => {
  const ref = useRef(null);
  const firstImageRef = useRef(null);
  const secondImageRef = useRef(null);
  const onScreen = useOnScreen(ref);
  const [runOnce, setRunOnce] = useState(false);

  useGSAP(
    () => {
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
            duration: 0.8,
            y: 0,
            opacity: 1,
            stagger: 0.1,
            ease: Power2.easeOut,
          });

          // gsap.to([firstImageRef.current, secondImageRef.current], {
          //   duration: 0.8,
          //   y: 0,
          //   opacity: 1,
          //   stagger: 0.1,
          //   ease: Power2.easeOut,
          // });
        }
      }
    },
    {
      scope: ref,
      dependencies: [onScreen],
    }
  );

  return (
    <section
      ref={ref}
      className="my-14 xl:relative mx-6 xl:mx-20 lg:mx-20 xl:h-screen lg:h-screen flex flex-col lg:flex-row items-center mix-blend-difference"
    >
      <div className="xl:w-1/2 lg:w-1/2">
        <div className="w-full text-center xl:text-left lg:text-left">
          <span className="text-lg my-2">Technologies Which Use</span>
        </div>
        <h2
          id="quote-text"
          className="font-dream-avenue text-center xl:text-left lg:text-left text-6xl xl:text-6xl text-primary-black"
        >
          Javascript, TypeScript, Remix, ReactJS, NextJS, Golang, SolidJS, Solid
          Start, Redux, Redux Toolkit, React Native, TailwindCSS, NodeJS,
          ExpressJS, GSAP, MongoDB, Firebase, SQL, Etc.
        </h2>
      </div>
      <div className="hidden lg:flex lg:flex-col lg:justify-center w-1/2 h-[70vh] relative px-6">
        <div className="h-[500px] w-[500px] absolute top-[10%] left-[10%] rounded-full bg-gradient-to-t to-[#f0a500] vai-[#f2e04a] from-[#f9f9d6] animate-blob filter blur-3xl opacity-70"></div>
        <div className="grid grid-cols-5 gap-y-8">
          <div
            ref={firstImageRef}
            className="relative overflow-hidden w-[25vw] h-[30vh] ukiyo col-span-3"
          >
            <Image
              src={cardImage}
              layout="fill"
              alt="Pratham"
              className="object-cover object-center imageHover"
            />
          </div>
          <div className="col-span-2"></div>
          <div className="col-span-2"></div>

          <div
            ref={secondImageRef}
            className="relative overflow-hidden w-[35vw] h-[30vh] col-span-3 ukiyo"
          >
            <Image
              src={secondCardImage}
              alt="Sharma"
              layout="fill"
              className="object-cover object-center imageHover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
