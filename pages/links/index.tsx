import { useEffect } from "react";
import { GetStaticProps } from "next";
import Image from "next/image";
import {
  RiInstagramLine,
  RiTwitterLine,
  RiLinkedinBoxLine,
  RiDribbbleLine,
  RiGithubLine,
} from "react-icons/ri";
import client from "../../sanityClient";
import PageTitle from "../../components/PageTitle";
import urlFor from "../../helper/urlForHelper";
import Link from "next/link";
import isMobile from "../../helper/isMobileHelper";

interface ProfileProps {
  profile: {
    name: string;
    image: { asset: { _ref: string; _type: string }; _type: string };
  };
}

export const getStaticProps: GetStaticProps = async () => {
  const profile = await client.fetch(
    `*[_type == "author" && _id == "1198103e-1d2e-4058-bc47-57e4d193b398"]{name,image}`
  );
  return {
    props: {
      profile: profile[0],
    },
  };
};

const allLinks = [
  {
    title: "Website",
    href: "/",
  },
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "Blogs",
    href: "/blog",
  },
  {
    title: "Email",
    href: "mailto:pratham.sharma2105@gmail.com",
  },
];

const Links = ({ profile }: ProfileProps) => {
  useEffect(() => {
    const buttons = document.querySelectorAll("li");
    buttons.forEach((el: HTMLLIElement) => {
      el.addEventListener(isMobile() ? "touchstart" : "mouseover", () => {
        el.style.backgroundColor = "transparent";
      });

      el.addEventListener(isMobile() ? "touchend" : "mouseleave", () => {
        el.style.backgroundColor = "#262626";
      });
    });

    return () => {
      buttons.forEach((el: HTMLLIElement) => {
        el.removeEventListener(isMobile() ? "touchstart" : "mouseover", () => {
          el.style.backgroundColor = "transparent";
        });

        el.removeEventListener(isMobile() ? "touchend" : "mouseleave", () => {
          el.style.backgroundColor = "#262626";
        });
      });
    };
  }, []);
  return (
    <main className="py-14 flex flex-col items-center">
      <PageTitle
        title="My Links | Pratham Sharma"
        description="Let's check out Pratham Sharma's all social and personal links on one single page."
        image="/ogImages/All-Social-&-Personal-Links.png"
      />
      <section className="flex flex-col items-center text-center">
        <div className="relative">
          <div
            id="blob-hero"
            className="absolute h-[160px] w-[160px] -top-6 -left-12 -right-12 rounded-full bg-gradient-to-t to-[#f0a500] from-[#f9f9d6] animate-blob opacity-70 scale-50 filter blur-3xl"
          />
          <Image
            src={urlFor(profile.image).url()}
            blurDataURL={urlFor(profile.image).url()}
            width={`80px`}
            height={`80px`}
            className="rounded-full"
          />
        </div>
        <h1 className="font-dream-avenue text-2xl my-1">Pratham Sharma</h1>
        <p>Berojgar Web & App Developer</p>
      </section>
      <section className="mt-8 text-lg text-center">
        <h2 className="font-dream-avenue text-2xl my-2">Personal Links</h2>
        <ul>
          {allLinks.map((link) => (
            <Link key={link.title} href={link.href}>
              <a>
                <li className="my-2 px-12 py-1 rounded-md bg-[#262626] border border-[#262626]/80 transition-all duration-300">
                  {link.title}
                </li>
              </a>
            </Link>
          ))}
        </ul>
      </section>
      <section className="mt-8 text-center text-base">
        <h2 className="font-dream-avenue text-2xl my-2">Social Links</h2>
        <ul className="grid grid-cols-2 gap-x-2 gap-y-2 justify-center">
          <a href="https://www.instagram.com/impratham.dev/">
            <li className="flex items-center justify-center gap-x-1 px-8 py-2 bg-[#262626] rounded-md border border-[#262626] hover:bg-transparent transition-all duration-300">
              <RiInstagramLine className="h-5 w-5" />
              <span>Instagram</span>
            </li>
          </a>
          <a href="https://twitter.com/imPrathamDev">
            <li className="flex items-center justify-center gap-x-1 px-8 py-2 bg-[#262626] rounded-md border border-[#262626] hover:bg-transparent transition-all duration-300">
              <RiTwitterLine className="h-5 w-5" />
              <span>Twitter</span>
            </li>
          </a>
          <a href="https://github.com/imPrathamDev">
            <li className="flex items-center justify-center gap-x-1 px-8 py-2 bg-[#262626] rounded-md border border-[#262626] hover:bg-transparent transition-all duration-300">
              <RiGithubLine className="h-5 w-5" />
              <span>Github</span>
            </li>
          </a>
          <a href="https://www.linkedin.com/in/imprathamdev/">
            <li className="flex items-center justify-center gap-x-1 px-8 py-2 bg-[#262626] rounded-md border border-[#262626] hover:bg-transparent transition-all duration-300">
              <RiLinkedinBoxLine className="h-5 w-5" />
              <span>LinkedIn</span>
            </li>
          </a>
        </ul>
        <a className="mx-auto" href="https://dribbble.com/imPrathamDev">
          <li className="my-2 flex items-center justify-center gap-x-1 px-8 py-2 bg-[#262626] rounded-md border border-[#262626] hover:bg-transparent transition-all duration-300">
            <RiDribbbleLine className="h-5 w-5" />
            <span>Dribble</span>
          </li>
        </a>
      </section>
    </main>
  );
};

export default Links;
