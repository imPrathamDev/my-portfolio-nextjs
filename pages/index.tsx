import type { GetStaticProps, NextPage } from "next";
import { useEffect } from "react";
import Footer from "../components/footer/Footer";
import NavBar from "../components/header/NavBar";
import About from "../components/sections/About";
import Articles from "../components/sections/Articles";
import Contact from "../components/sections/Contact";
import Credentials from "../components/sections/Credentials";
import HeroSection from "../components/sections/HeroSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import QuoteSection from "../components/sections/QuoteSection";
import gsap from "gsap";
const { SplitText } = require("../utils/Split3.min.js");
import { SmoothScrollProvider } from "../context/SmoothScroll.context.js";
import { PostTypes, ProjectTypes } from "../types/types";
import Head from "next/head";
import client from "../sanityClient";

interface HomeProps {
  posts: PostTypes[];
  projects: ProjectTypes[];
}

export const getStaticProps: GetStaticProps = async () => {
  const posts: object[] = await client.fetch(
    `*[_type == "post"]{..., categories[]->}[0..1] | order(_createdAt desc)`
  );
  const projects = await client.fetch(
    `*[_type == "project"][0..2] | order(_createdAt desc)`
  );
  return {
    props: {
      posts,
      projects,
    },
  };
};

const Home: NextPage<HomeProps> = ({ posts, projects }) => {
  useEffect(() => {
    const split = new SplitText("#heading", {
      type: "lines",
      linesClass: "transform translate-y-[500px]",
    });

    const splitParent = new SplitText("#heading", {
      type: "lines",
      linesClass: "overflow-hidden",
    });

    gsap.to(split.lines, {
      duration: 1,
      y: 0,
      opacity: 1,
      stagger: 0.1,
      ease: "power2",
    });
  }, []);

  return (
    <>
      <Head>
        <title>Pratham Sharma</title>
        <meta name="title" content="Pratham Sharma" />
        <meta
          name="description"
          content="Pratham Sharma is a Web and App Developer, let's explore his projects and blogs. He always looking for fascinating project ideas. He specializes
 in mainly in website development (MERN & NextJS) and application development (Flutter & React Native) so let's see his portfolio website."
        />
        <meta
          name="keywords"
          content="Pratham Sharma, Portfolio, Pratham, imPrathamDev"
        />
        <meta name="author" content="Pratham Sharma" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={process.env.NEXT_PUBLIC_HOST} />
        <meta property="twitter:title" content="Pratham Sharma" />
        <meta
          property="twitter:description"
          content="Pratham Sharma is a Web and App Developer, let's explore his projects and blogs. He always looking for fascinating project ideas. He specializes
 in mainly in website development (MERN & NextJS) and application development (Flutter & React Native) so let's see his portfolio website."
        />
        <meta
          property="twitter:image"
          content={`${process.env.NEXT_PUBLIC_HOST}/ogImages/Design-&-Development-Portfolio.png`}
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={process.env.NEXT_PUBLIC_HOST} />
        <meta property="og:title" content="Pratham Sharma" />
        <meta
          property="og:description"
          content="Pratham Sharma is a Web and App Developer, let's explore his projects and blogs. He always looking for fascinating project ideas. He specializes
 in mainly in website development (MERN & NextJS) and application development (Flutter & React Native) so let's see his portfolio website."
        />
        <meta
          property="og:image"
          content={`${process.env.NEXT_PUBLIC_HOST}/ogImages/Design-&-Development-Portfolio.png`}
        />
      </Head>
      <div data-scroll-container id="container">
        <SmoothScrollProvider options={{ smooth: true, class: "is-reveal" }}>
          <NavBar />
          <div data-scroll-section>
            <main className="">
              <HeroSection />
              <About />
              <Credentials />
              <ProjectsSection projects={projects} />
              <QuoteSection />
              <Articles posts={posts} />
              <Contact />
            </main>
            <Footer />
          </div>
        </SmoothScrollProvider>
      </div>
    </>
  );
};

export default Home;
