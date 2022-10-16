import React from "react";
import { GetStaticProps } from "next";
import Image from "next/image";
import ImageUrlBuilder from "@sanity/image-url";
import {
  RiInstagramLine,
  RiTwitterLine,
  RiLinkedinBoxLine,
  RiDribbbleLine,
  RiGithubLine,
} from "react-icons/ri";
import Head from "next/head";
import client from "../../sanityClient";

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

const Links = ({ profile }: ProfileProps) => {
  const builder = ImageUrlBuilder(client);
  const urlFor = (source: object) => {
    return builder.image(source);
  };
  return (
    <main className="py-14 flex flex-col items-center">
      <Head>
        <title>My Links | Pratham Sharma</title>
        <meta name="title" content="My Links | Pratham Sharma" />
        <meta
          name="description"
          content="Let's check out Pratham Sharma's all social and personal links on one single page."
        />
        <meta
          name="keywords"
          content="Pratham Sharma, Portfolio, Pratham, imPrathamDev"
        />
        <meta name="author" content="Pratham Sharma" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={process.env.NEXT_PUBLIC_HOST} />
        <meta property="twitter:title" content="My Links | Pratham Sharma" />
        <meta
          property="twitter:description"
          content="Let's check out Pratham Sharma's all social and personal links on one single page."
        />
        <meta
          property="twitter:image"
          content={`${process.env.NEXT_PUBLIC_HOST}/ogImages/All-Social-&-Personal-Links.png`}
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_HOST} />
        <meta property="og:title" content="My Links | Pratham Sharma" />
        <meta
          property="og:description"
          content="Let's check out Pratham Sharma's all social and personal links on one single page."
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_HOST}/ogImages/All-Social-&-Personal-Links.png`}
        />
      </Head>
      <section className="flex flex-col items-center text-center">
        <Image
          src={urlFor(profile.image).url()}
          width={`80px`}
          height={`80px`}
          className="rounded-full"
        />
        <h1 className="font-dream-avenue text-2xl my-1">Pratham Sharma</h1>
        <p>Berojgar Web & App Developer</p>
      </section>
      <section className="mt-8 text-lg text-center">
        <h2 className="font-dream-avenue text-2xl my-2">Personal Links</h2>
        <ul>
          <a href={process.env.NEXT_PUBLIC_HOST}>
            <li className="my-2 px-12 py-1 rounded-md bg-[#262626] border border-[#262626] hover:bg-transparent transition-all duration-300">
              Website
            </li>
          </a>
          <a href={`${process.env.NEXT_PUBLIC_HOST}/projects`}>
            <li className="my-2 px-12 py-1 rounded-md bg-[#262626] border border-[#262626] hover:bg-transparent transition-all duration-300">
              Projects
            </li>
          </a>
          <a href={`${process.env.NEXT_PUBLIC_HOST}/blog`}>
            <li className="my-2 px-12 py-1 rounded-md bg-[#262626] border border-[#262626] hover:bg-transparent transition-all duration-300">
              Blog
            </li>
          </a>
          <a href={`mailto:pratham.sharma2105@gmail.com`}>
            <li className="my-2 px-12 py-1 rounded-md bg-[#262626] border border-[#262626] hover:bg-transparent transition-all duration-300">
              Email
            </li>
          </a>
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
