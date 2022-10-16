import Link from "next/link";
import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="mt-24 pb-5 xl:-mb-24 lg:-mb-24 xl:pb-3 lg:pb-3 border-t-2 border-primary-dark-white border-opacity-60">
      <div className="mx-6 xl:mx-24 lg:mx-24 pt-6 flex flex-col xl:flex-row lg:flex-row gap-y-2 xl:items-center lg:items-center xl:justify-between lg:justify-between">
        <Link href={`/`}>
          <a>
            <h4 className="text-3xl font-dream-avenue text-center">
              Pratham<span className="text-primary">.</span>
            </h4>
          </a>
        </Link>
        <div className="flex items-center gap-x-3 text-base font-dream-avenue mr-8">
          <a
            href="https://twitter.com/imPrathamDev"
            className="transition-all hover:underline hover:text-primary"
          >
            Twitter
          </a>
          <a
            href="https://www.instagram.com/impratham.dev/"
            className="transition-all hover:underline hover:text-primary"
          >
            Instagram
          </a>
          <a
            href="https://github.com/imPrathamDev"
            className="transition-all hover:underline hover:text-primary"
          >
            Github
          </a>
          <a
            href="https://dribbble.com/imPrathamDev"
            className="transition-all hover:underline hover:text-primary"
          >
            Dribble
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
