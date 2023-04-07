import gsap, { Power2 } from "gsap";
import { useEffect, useState } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import LinkButton from "../LinkButton";

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const [status, setStatus] = useState(false);
  useEffect(() => {
    setStatus((prev) => !prev);
    const contactHeading = document.getElementById("contactHeading");
    const contactPara = document.getElementById("contactPara");
    gsap.fromTo(
      contactHeading,
      {
        y: 112,
      },
      {
        duration: 1,
        y: 0,
        ease: Power2.easeOut,
        scrollTrigger: {
          trigger: contactHeading,
        },
      }
    );

    gsap.fromTo(
      contactPara,
      {
        y: 112,
      },
      {
        duration: 1,
        y: 0,
        delay: 0.2,
        ease: Power2.easeOut,
        scrollTrigger: {
          trigger: contactPara,
        },
      }
    );

    gsap.fromTo(
      ".link-button-container",
      {
        opacity: 0,
        y: 50,
      },
      {
        duration: 1,
        opacity: 1,
        y: 0,
        ease: Power2.easeOut,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".link-button-container",
        },
      }
    );
  }, []);

  useEffect(() => {
    const text = document.querySelector(".text p") as HTMLParagraphElement;
    if (text && text.innerHTML) {
      text.innerHTML = text.innerText
        .split("")
        .map(
          (char, index) =>
            `<span style="transform: rotate(${index * 5.6}deg)">${char}</span>`
        )
        .join("");
    }
  }, [status]);
  return (
    <section className="pt-8 pb-2 mx-6 xl:mx-20 lg:mx-20 mix-blend-difference">
      <div className="flex flex-col lg:flex-row w-full">
        <div className="w-full lg:w-1/2">
          <div className="relative h-fit w-full overflow-hidden">
            <h2
              id="contactHeading"
              className="text-5xl lg:text-8xl font-dream-avenue font-medium"
            >
              <span className="text-2xl lg:text-6xl">@</span>imPrathamDev
            </h2>
          </div>
          <div className="ml-6 lg:ml-20">
            <div className="relative h-fit w-full overflow-hidden my-2">
              <p id="contactPara" className="text-sm font-sans-light">
                I take inspirations from many other web design.
                <br />
                If you like feel free to copy.
              </p>
            </div>
            <div className="flex flex-col gap-y-2 lg:flex-row lg:items-center lg:gap-x-2 my-4">
              <span className="w-fit px-4 py-1 rounded-full border-2 border-primary-white cursor-pointer link-button-container">
                <LinkButton
                  link="mailto:prathamsharma.dev@yahoo.com"
                  text="prathamsharma.dev@yahoo.com"
                  textSize="text-sm"
                  fontClass="font-sans"
                  colorClass="text-primary-white"
                  color="#eeeee6"
                  hoverColor="#eeeee6"
                />
              </span>
              <span className="w-fit px-4 py-1 rounded-full border-2 border-primary-white cursor-pointer link-button-container">
                <LinkButton
                  text="+918107453954"
                  link="tel:8107453954"
                  textSize="text-sm"
                  fontClass="font-sans"
                  colorClass="text-primary-white"
                  color="#eeeee6"
                  hoverColor="#eeeee6"
                />
              </span>
            </div>
          </div>
        </div>
        <div className="w-full mt-12 lg:mt-0 lg:w-1/2 flex justify-center lg:items-center lg:justify-end">
          <div className="relative w-60 h-60 rounded-full flex items-center justify-center">
            <div className="absolute w-10 h-10 flex items-center justify-center left-[42%] top-[42%]">
              <h3 className="text-5xl font-dream-avenue text-primary linkHover z-10">
                PS
              </h3>
            </div>
            <div className="animate-rotate-anim absolute w-full h-full text">
              <p className="">UI & UX Design - Frontend - Backend & App</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
