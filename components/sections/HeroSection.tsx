import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import heroImage from "../../public/images/hero.png";
const { SplitText } = require("../../utils/Split3.min.js");
import gsap, { Power2, Power4 } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import isMobile from "../../helper/isMobileHelper";
import LinkButton from "../LinkButton";

gsap.registerPlugin(ScrollTrigger);

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
      duration: 0.5,
      top: "-30%",
      scale: "1",
      ease: "slow(0.7, 0.7, false)",
    });

    tl.to("#hero-marquee", {
      duration: 0.5,
      x: 0,
      opacity: 1,
      ease: "slow(0.7, 0.7, false)",
    });

    if (isMobile()) {
      gsap.to("#img-container", {
        width: "100vw",
        ease: "none",
        scrollTrigger: {
          trigger: "#img-container",
          start: "center 100%",
          scrub: 3,
        },
      });
    } else {
      gsap.to("#img-container", {
        x: -200,
        y: -200,
        ease: "none",
        scrollTrigger: {
          trigger: "#img-container",
          start: "bottom 90%",
          scrub: true,
        },
      });

      gsap.to("#text-container", {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: "#text-container",
          start: "bottom 90%",
          scrub: true,
        },
      });
    }
  }, []);
  return (
    <section className="relative lg:flex lg:flex-col lg:items-center lg:justify-center text-center h-[84vh] xl:h-screen lg:h-screen mix-blend-difference mb-28 lg:mb-0 overflow-hidden">
      <div className="xl:absolute lg:absolute xl:top-6 lg:top-6 flex flex-col items-center justify-center gap-y-4">
        <div
          id="blob-hero"
          className="hidden lg:block absolute bg-primary-white h-[500px] w-[500px] -top-[100%] transform -translate-x-[50%] -translate-y-[50%] rounded-full bg-gradient-to-t to-[#f0a500] from-[#f9f9d6] animate-blob opacity-70 scale-50 filter blur-3xl"
        />
        <div
          id="hero-marquee"
          className="absolute right-4 bottom-[10vh] lg:bottom-[30vh] lg:-right-[9vw] py-1 rounded-full border border-primary-dark-white/20 max-w-[50vw] lg:max-w-[25vw] bg-primary-black/10 backdrop-blur-lg z-[999999999] linkHover opacity-0 transform translate-x-52"
        >
          <div className="relative flex overflow-x-hidden text-lg">
            <div className="animate-marquee-hero whitespace-nowrap">
              <span className="mx-1">Pratham Sharma</span>
              <span className="mx-1">*</span>
              <span className="mx-1">प्रथम शर्मा</span>
              <span className="mx-1">*</span>
              <span className="mx-1">Pratham Sharma * </span>
            </div>

            <div className="absolute top-0 animate-marquee-hero-2 whitespace-nowrap">
              <span className="mx-1">Pratham Sharma</span>
              <span className="mx-1">*</span>
              <span className="mx-1">प्रथम शर्मा</span>
              <span className="mx-1">*</span>
              <span className="mx-1">Pratham Sharma * </span>
            </div>
          </div>
        </div>
        <h2
          id="heading"
          className="font-dream-avenue text-[4rem] leading-[1] xl:text-[10rem] lg:text-[10rem] lg:leading-none 2xl:text-[11rem]"
        >
          Design & Development Portfolio
        </h2>
        <div id="text-container" className="max-w-2xl z-10">
          <p className="text-primary-dark-white text-sm lg:text-base my-2 px-4">
            Pratham Sharma is a Web and App Developer, let&apos;s explore his
            projects and blogs. He always looking for fascinating project ideas.
            He specializes in mainly in website development (MERN & NextJS) and
            application development (Flutter & React Native) so let&apos;s see
            his portfolio website.
          </p>
          <div className="w-full flex items-center justify-center">
            <LinkButton
              link="/resume.pdf"
              text="Check Resume."
              textSize="text-xl"
            />
          </div>
        </div>
      </div>
      <div className="img-animate absolute bottom-4 lg:left-0 lg:bottom-0 w-full flex justify-center lg:block">
        <div
          id="img-container"
          className="reveal relative w-48 h-[30vh] lg:w-48 lg:h-96 overflow-hidden"
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
