import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import bgImage from "../../public/images/about-section.jpg";
import useOnScreen from "../../hooks/useOnScreen";

const Contact: React.FC = () => {
  const [reveal, setReveal] = useState(false);
  const ref = useRef(null);
  const isOnScreen = useOnScreen(ref);
  useEffect(() => {
    if (isOnScreen) setReveal(true);
  }, [isOnScreen]);
  return (
    <section className="mx-6 xl:mx-20 lg:mx-20 xl:h-screen lg:h-screen mix-blend-difference">
      <div className="flex flex-col xl:flex-row lg:flex-row xl:items-center lg:items-center">
        <div className="xl:w-1/2 lg:w-1/2">
          <h2 className="text-6xl font-dream-avenue my-3">
            Contact <br /> <span className="text-primary">Me</span>.
          </h2>

          <div className="mx-2 lg:mx-6 mt-14 w-fit">
            <a
              href="https://github.com/imPrathamDev"
              className="flex flex-col w-full group cursor-pointer my-6 px-4 py-2 rounded-md hover:bg-[#262626] transition-all duration-300"
            >
              <h3 className="text-3xl font-dream-avenue">Github</h3>
              <p className="text-primary-dark-white font-semibold text-sm group-hover:text-primary group-hover:underline transition-all">
                github.com/imPrathamDev
              </p>
            </a>

            <a
              href="https://www.instagram.com/impratham.dev/"
              className="flex flex-col w-full group cursor-pointer my-6 px-4 py-2 rounded-md hover:bg-[#262626] transition-all duration-300"
            >
              <h3 className="text-3xl font-dream-avenue">Instagram</h3>
              <p className="text-primary-dark-white font-semibold text-sm group-hover:text-primary group-hover:underline transition-all">
                instagram.com/imPratham.Dev
              </p>
            </a>

            <a
              href="https://twitter.com/imPrathamDev"
              className="flex flex-col w-full group cursor-pointer my-6 px-4 py-2 rounded-md hover:bg-[#262626] transition-all duration-300"
            >
              <h3 className="text-3xl font-dream-avenue">Twitter</h3>
              <p className="text-primary-dark-white font-semibold text-sm group-hover:text-primary group-hover:underline transition-all">
                twitter.com/imPrathamDev
              </p>
            </a>

            <a
              href="mailto:hi@impratham.dev"
              className="flex flex-col w-full group cursor-pointer my-6 px-4 py-2 rounded-md hover:bg-[#262626] transition-all duration-300"
            >
              <h3 className="text-3xl font-dream-avenue">Email</h3>
              <p className="text-primary-dark-white font-semibold text-sm group-hover:text-primary group-hover:underline transition-all">
                hi@impratham.dev
              </p>
            </a>
          </div>
        </div>

        <div className="xl:w-1/2 lg:w-1/2 py-6">
          <div
            ref={ref}
            className={classNames(
              "invisible relative overflow-hidden xl:w-full  lg:w-full h-96 xl:h-screen lg:h-screen border-2 border-primary-dark-white border-opacity-60",
              { "reveal-delay": reveal }
            )}
          >
            <Image
              src={bgImage}
              layout="fill"
              className="object-cover object-center opacity-60"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
