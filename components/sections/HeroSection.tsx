import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import heroImage from "../../public/images/hero.png";
const { SplitText } = require("../../utils/Split3.min.js");
import gsap from "gsap";

const HeroSection = () => {
  useEffect(() => {
    const tl = gsap.timeline();
    const split = new SplitText("#heading", {
      type: "lines",
      linesClass: "transform translate-y-[500px] opacity-0",
    });

    const splitParent = new SplitText("#heading", {
      type: "lines",
      linesClass: "overflow-hidden",
    });

    tl.to(split.lines, {
      duration: 1,
      y: 0,
      opacity: 1,
      stagger: 0.1,
      ease: "power2",
    });

    tl.to("#blob-hero", {
      duration: 1.2,
      top: "-30%",
      ease: "back.inOut(2)",
    });
  }, []);
  return (
    <section className="relative lg:flex lg:flex-col lg:items-center lg:justify-center text-center h-[84vh] xl:h-screen lg:h-screen mix-blend-difference mb-28 lg:mb-0">
      <div className="xl:absolute lg:absolute xl:top-6 lg:top-6 flex flex-col items-center justify-center gap-y-4">
        <div
          id="blob-hero"
          className="bg-primary-white h-[500px] w-[500px] fixed -top-[100%] transform -translate-x-[50%] -translate-y-[50%] rounded-full bg-gradient-to-t to-[#f0a500] vai-[#f2e04a] from-[#f9f9d6] animate-blob filter blur-3xl opacity-70"
        ></div>
        <h2
          id="heading"
          className="font-dream-avenue text-7xl xl:text-[10rem] lg:text-[10rem] lg:leading-none 2xl:text-[11rem]"
        >
          Design & Development Portfolio
        </h2>
        <div className="max-w-2xl">
          <p className="text-primary-dark-white text-sm lg:text-base my-2 px-4">
            Pratham Sharma is a Web and App Developer, let&apos;s explore his
            projects and blogs. He always looking for fascinating project ideas.
            He specializes in mainly in website development (MERN & NextJS) and
            application development (Flutter & React Native) so let&apos;s see
            his portfolio website.
          </p>
          <Link href={`/resume.pdf`}>
            <a className="text-xl font-dream-avenue text-primary hover:underline transition-all">
              <em>Check Resume</em>.
            </a>
          </Link>
        </div>
      </div>
      <div className="xl:block lg:block img-animate absolute lg:left-0 bottom-0">
        <div
          id="img-container"
          className="reveal relative w-48 h-80 lg:h-96 overflow-hidden"
        >
          <Image
            src={heroImage}
            layout="fill"
            className="object-cover object-center opacity-80"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
