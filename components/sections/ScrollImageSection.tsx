import Image from "next/image";
import { useRef, useEffect } from "react";
import gsap, { Power2 } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import bgImage from "../../public/images/scroll-image.jpg";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

const ScrollImageSection = () => {
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (textRef.current && imageRef.current && sectionRef.current) {
        gsap.fromTo(
          textRef.current,
          {
            y: 100,
            fontSize: "4.5rem",
          },
          {
            y: 0,
            ease: "sine.out",
            scrollTrigger: {
              trigger: textRef.current,
              // start: "top 90%",
              scrub: 2,
            },
          }
        );
        gsap.to(imageRef.current, {
          width: "100vw",
          height: "90vh",
          scrollTrigger: {
            trigger: imageRef.current,
            scrub: true,
          },
        });
      }
    },
    {
      scope: sectionRef,
    }
  );

  return (
    <section
      ref={sectionRef}
      className="my-14 lg:h-[95vh] flex flex-col items-center justify-center overflow-hidden"
    >
      <h2 ref={textRef} className="text-6xl font-dream-avenue my-4 text-center">
        Imagine The Designs
      </h2>
      <div
        ref={imageRef}
        className="relative overflow-hidden w-[50vw] h-[70vh] group"
      >
        <div className="absolute bottom-2 left-4 z-50 overflow-hidden py-3">
          <div className="px-4 py-1.5 bg-transparent backdrop-blur-md rounded-md border border-primary-white/10 transform translate-y-20 transition-all group-hover:translate-y-0 hover:bg-primary-white/20">
            <p className="text-primary-dark-white text-xs leading-3 -mb-0.5">
              credit
            </p>
            <p className="text-primary-white">@imPrathamDev</p>
          </div>
        </div>
        <Image
          src={bgImage}
          alt="Bhangarh"
          layout="fill"
          className="object-cover object-center imageHover"
        />
      </div>
    </section>
  );
};

export default ScrollImageSection;
