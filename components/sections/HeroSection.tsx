import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import heroImage from "../../public/images/hero.png";
import { CSSRulePlugin } from "gsap/src/CSSRulePlugin";
import gsap from "gsap";

const HeroSection = () => {
  return (
    <section
      data-scroll-section
      data-scroll-position="top"
      className="relative flex flex-col items-center justify-center text-center xl:h-screen lg:h-screen mix-blend-difference mb-28 lg:mb-0"
    >
      <div className="xl:absolute lg:absolute xl:top-6 lg:top-6 flex flex-col items-center justify-center gap-y-4">
        <h2
          data-scroll
          data-scroll-position="top"
          data-scroll-speed="-1"
          id="heading"
          className="font-dream-avenue text-6xl xl:text-[10rem] lg:text-[10rem] lg:leading-none 2xl:text-[11rem]"
        >
          Design & Development Portfolio
        </h2>
        <div className="max-w-2xl">
          <p data-scroll className="text-primary-dark-white">
            Pratham Sharma is a Web and App Developer, let&apos;s explore his
            projects and blogs. He always looking for fascinating project ideas.
            He specializes in mainly in website development (MERN & NextJS) and
            application development (Flutter & React Native) so let&apos;s see
            his portfolio website.
          </p>
          <Link href={`/resume.pdf`}>
            <a className="text-xl font-dream-avenue text-primary hover:underline transition-all">
              Check Resume.
            </a>
          </Link>
        </div>
      </div>
      <div
        data-scroll
        data-scroll-direction="horizontal"
        data-scroll-speed="2"
        className="hidden xl:block lg:block img-animate absolute left-0 bottom-0"
      >
        <div
          data-scroll
          id="img-container"
          className="reveal relative w-48 h-96 overflow-hidden"
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
