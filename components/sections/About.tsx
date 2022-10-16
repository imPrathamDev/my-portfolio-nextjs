import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import bgImage from "../../public/images/about.jpg";
import useOnScreen from "../../hooks/useOnScreen";
import cn from "classnames";

const About: React.FC = () => {
  const ref = useRef(null);
  const [reveal, setReveal] = useState(false);

  const onScreen = useOnScreen(ref);

  useEffect(() => {
    if (onScreen) setReveal(true);
  }, [onScreen]);

  return (
    <section className="mx-4 xl:mx-20 lg:mx-20 xl:h-screen lg:h-screen flex items-center mix-blend-difference z-10">
      <div className="flex flex-col xl:flex-row lg:flex-row items-center justify-center">
        <div
          data-scroll
          data-scroll-speed="2"
          data-scroll-delay="1"
          className="xl:w-1/2 lg:w-1/2"
        >
          <h2 className="text-6xl font-dream-avenue my-3 text-center lg:text-left">
            Something <br /> About <span className="text-primary">Me</span>.
          </h2>
          <div className="text-center lg:text-left font-sans-light">
            <p className="my-4">
              Hi, I am Pratham Sharma self taught developer from the small town
              of Alwar in Rajasthan, India. My interests are in Web Development
              (MERN) and App Development, and I love to create beautiful UI
              designs for my projects and performant products with delightful
              user experiences. I love to work with ReactJS, NodeJS, Tailwind
              CSS, MongoDB, Mongoose, NextJS, and many more.
            </p>
            <p className="my-4">
              I am interested to learn new things like Web3.0 and I have basic
              theoretical knowledge of Web3.0. But to be honest I like to work
              with web and app development because I like their development
              environment and working with new services such as OAuth, firebase,
              SendGrid (for emails), Twilio, and many others.
            </p>
            <p className="my-4">
              I have also interested in UI and UX designing I am not very great
              at but I like to create simple designs like this portfolio website
              design.
            </p>
          </div>
        </div>
        <div className="xl:w-1/2 lg:w-1/2 flex items-center justify-center mt-4 lg:mt-0">
          <div
            ref={ref}
            data-scroll
            data-scroll-direction="horizontal"
            data-scroll-speed="-1"
            className={cn(
              "invisible h-80 w-96 xl:w-3/4 lg:w-3/4 relative overflow-hidden",
              {
                "reveal-delay": reveal,
              }
            )}
          >
            <Image
              src={bgImage}
              blurDataURL={`${process.env.NEXT_PUBLIC_HOST}/images/about.jpg`}
              layout="fill"
              placeholder="blur"
              className="object-cover object-center opacity-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
