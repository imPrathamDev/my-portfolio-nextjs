import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import navBarImage from "../../public/images/navbar-bg.jpg";
import useOnScreen from "../../hooks/useOnScreen";
import cn from "classnames";
import Link from "next/link";

interface Props {
  show: boolean;
}

const HumburgerMenu = ({ show }: Props) => {
  const ref = useRef(null);
  const [reveal, setReveal] = useState(false);
  const onScreen = useOnScreen(ref);
  const menu = [
    { title: "Home", path: "/" },
    { title: "Projects", path: "/projects" },
    { title: "Blog", path: "/blog" },
    { title: "Resume", path: "/resume.pdf" },
  ];

  useEffect(() => {
    if (onScreen) setReveal(true);
  }, [onScreen]);
  return (
    <section
      id="nav-container"
      className="top-0 bottom-0 -left-full right-0 fixed w-full h-full z-[999] bg-primary-white text-primary-black pt-20 selection:bg-primary-black selection:text-primary-white"
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-x-8">
        <ul className="lg:w-1/4 mt-6 lg:mt-0 text-center lg:text-start mx-auto lg:mx-0 relative">
          {menu.map((item) => (
            <Link key={item?.title} href={item?.path}>
              <a>
                <li className="relative my-6">
                  <span
                    id="nav-item"
                    className="relative uppercase font-dream-avenue text-6xl lg:text-8xl tracking-wider my-6 lg:ml-16 hover:text-primary hover:tracking-widest transition-all duration-300 top-28 lg:top-24 cursor-pointer"
                  >
                    {item?.title}
                  </span>
                  <div
                    id="nav-item-div"
                    className="after:absolute after:lg:w-[600px] after:w-[300px] after:lg:top-24 after:top-28 after:bg-primary-white after:lg:h-24 after:h-28 after:my-0 after:mx-auto after:transition-all after:left-0"
                  ></div>
                </li>
              </a>
            </Link>
          ))}
        </ul>
        <div className="lg:w-3/4 flex flex-col items-end">
          <div
            ref={ref}
            className={cn(
              "hidden lg:block w-3/4 invisible h-80 relative overflow-hidden",
              {
                "reveal-horizontal": reveal,
              }
            )}
          >
            <Image
              src={navBarImage}
              layout="fill"
              className="object-cover object-bottom transform transition-all duration-300 scale-125 hover:scale-105 cursor-pointer"
            />
          </div>
          <div className="my-8 text-center lg:text-left lg:my-4 mx-6 lg:mr-4 flex flex-col lg:flex-row lg:items-start items-center gap-x-6 z-10">
            <h4
              id="nav-heading"
              className="text-2xl font-dream-avenue opacity-0"
            >
              Brendan Eich
            </h4>
            <p id="nav-content" className="max-w-sm opacity-0">
              If the web can be evolved to include the missing APIs and have
              better performance, [developers] won&apos;t need to go beyond the
              web.
            </p>
          </div>
        </div>
      </div>
      <h3 className="block lg:hidden absolute w-full bottom-0 text-lg font-dream-avenue text-center">
        Pratham Sharma
      </h3>
    </section>
  );
};

export default HumburgerMenu;
