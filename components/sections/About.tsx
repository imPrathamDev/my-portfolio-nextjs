import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import bgImage from "../../public/images/about.jpg";
import useOnScreen from "../../hooks/useOnScreen";
import cn from "classnames";
import gsap, { Power1 } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const ref = useRef(null);
  const parRef = useRef(null);
  const [reveal, setReveal] = useState(false);
  const [once, setOnce] = useState(false);

  const onScreen = useOnScreen(ref);
  const paraOnScreen = useOnScreen(parRef);

  useEffect(() => {
    if (onScreen) setReveal(true);
    if (window && document && !once) {
      const paras = document.querySelectorAll(".splitting");
      const Splitting = require("splitting");
      Splitting({ by: "chars", target: paras });
      gsap.set(".char", {
        opacity: 0,
      });
    }
    if (paraOnScreen) {
      gsap.to(".char", {
        duration: 0.4,
        opacity: 1,
        ease: Power1.easeInOut,
        stagger: {
          amount: 0.4,
        },
      });
      setOnce(true);
    }
  }, [onScreen, paraOnScreen]);
  return (
    <section className="mx-4 xl:mx-20 lg:mx-20 lg:my-12 xl:h-screen lg:h-screen flex items-center z-10">
      <div className="flex flex-col xl:flex-row lg:flex-row items-center justify-center">
        <div className="xl:w-1/2 lg:w-1/2">
          <h2 className="text-6xl font-dream-avenue my-3 text-center lg:text-left">
            Something <br /> About <span className="text-primary">Me</span>.
          </h2>
          <div
            ref={parRef}
            className="text-center lg:text-left font-sans-light"
          >
            <p className="my-4 splitting">
              Hi, I am Pratham Sharma self taught developer from the small town
              of Alwar in Rajasthan, India. My interests are in Web Development
              (MERN) and App Development, and I love to create beautiful UI
              designs for my projects and performant products with delightful
              user experiences. I love to work with ReactJS, NodeJS, Tailwind
              CSS, MongoDB, Mongoose, NextJS, and many more.
            </p>
            <p className="my-4 splitting">
              I am interested to learn new things like Web3.0 and I have basic
              theoretical knowledge of Web3.0. But to be honest I like to work
              with web and app development because I like their development
              environment and working with new services such as OAuth, firebase,
              SendGrid (for emails), Twilio, and many others.
            </p>
            <p className="my-4 splitting">
              I have also interested in UI and UX designing I am not very great
              at but I like to create simple designs like this portfolio website
              design.
            </p>
          </div>
        </div>
        <div className="w-full xl:w-1/2 lg:w-1/2 flex items-center justify-end mt-4 lg:mt-0">
          <div
            ref={ref}
            className={cn(
              "invisible w-[90vw] h-[60vh] lg:h-screen lg:w-5/6 relative overflow-hidden image group",
              {
                "reveal-delay": reveal,
              }
            )}
          >
            <div className="absolute bottom-2 left-4 z-50 overflow-hidden py-3">
              <div className="px-4 py-1.5 bg-transparent backdrop-blur-md rounded-md border border-primary-white/10 transform translate-y-20 transition-all duration-500 group-hover:translate-y-0 hover:bg-primary-white/20">
                <p className="text-primary-dark-white text-xs leading-3 -mb-0.5">
                  credit
                </p>
                <p className="text-primary-white">@imPrathamDev</p>
              </div>
            </div>
            <Image
              id="image"
              alt="Alwar"
              src={bgImage}
              layout="fill"
              className="object-cover object-center ukiyo imageHover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
