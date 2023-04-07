import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import isMobile from "../../helper/isMobileHelper";

gsap.registerPlugin(ScrollTrigger);

const Credentials: React.FC = () => {
  useEffect(() => {
    if (!isMobile()) {
      gsap.fromTo(
        "#item1",
        {
          transform:
            "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -100, 0, 1)",
        },
        {
          transform:
            "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 100, 0, 1)",
          ease: "sine.out",
          scrollTrigger: {
            trigger: "#item1",
            scrub: 1,
          },
        }
      );
      gsap.fromTo(
        "#item2",
        {
          transform:
            "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 10, 0, 1)",
        },
        {
          transform:
            "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -10, 0, 1)",
          ease: "sine.out",
          scrollTrigger: {
            trigger: "#item2",
            scrub: 1,
          },
        }
      );
      gsap.fromTo(
        "#item3",
        {
          transform:
            "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 90, 0, 1)",
        },
        {
          transform:
            "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, -90, 0, 1)",
          ease: "sine.out",
          scrollTrigger: {
            trigger: "#item3",
            scrub: 1,
          },
        }
      );
    }
  }, []);
  return (
    <section className="mx-6 xl:mx-20 lg:mx-20 my-24 xl:h-screen lg:h-screen flex flex-col xl:flex-row lg:flex-row lg:items-center mix-blend-difference">
      <div className="flex flex-col xl:flex-row lg:flex-row gap-4 w-full">
        <h2 className="text-7xl font-dream-avenue my-3 flex-1">
          Developing <br />
          <span className="text-primary">Journey</span>.
        </h2>
        <div className="flex flex-col">
          <h2 className="text-6xl font-dream-avenue my-3 hidden xl:block lg:block xl:invisible lg:invisible">
            Developing
            <br />
            Journey
          </h2>
          <div className="flex flex-col xl:flex-row lg:flex-row xl:items-start lg:items-start lg:gap-x-6">
            <div
              id="item1"
              className="pt-6 pb-3 border-t-2 border-primary-dark-white"
            >
              <h3 className="text-xl font-semibold my-2">Learning</h3>
              <div className="text-sm max-w-[280px]">
                <p className="my-2">
                  The most important part of my or every developer&apos;s
                  Journey is to learn every day.
                </p>
                <p className="my-2">
                  I am a self-taught developer who learns different things from
                  different places.
                </p>
                <p className="my-2">
                  The best source of learning for me is youtube, mdn docs, and
                  technology&apos;s own docs.
                </p>
              </div>
            </div>
            <div
              id="item2"
              className="pt-6 pb-3 border-t-2 border-primary-dark-white"
            >
              <h3 className="text-xl font-semibold my-2">Pedagogue</h3>
              <div className="text-sm max-w-[280px]">
                <p className="my-2">
                  In my development Journey, I found many awesome teachers.
                </p>
                <p className="my-2">
                  Every teacher is most important to me but there are some who
                  motivate me a lot in my journey.
                </p>
                <p className="my-2">
                  These teachers are Hitesh Choudhary, Piyush Agarwal
                  (RoadsideCoder), and Akshaya Saini.
                </p>
              </div>
            </div>
            <div
              id="item3"
              className="pt-6 pb-3 border-t-2 border-primary-dark-white"
            >
              <h3 className="text-xl font-semibold my-2">Client Work</h3>
              <div className="text-sm max-w-[280px]">
                <p className="my-2">
                  I also learned many different things from my clients.
                </p>
                <p className="my-2">
                  I didn&apos;t have many clients&apos; work but for those I
                  have, I completed them with my heart.
                </p>
                <p className="my-2">
                  I worked with different ideas most of them are mine, but some
                  are eCommerce websites, Chat App, Festival related, etc.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Credentials;
