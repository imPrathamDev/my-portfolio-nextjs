import type { GetStaticProps, NextPage } from "next";
import Footer from "../components/footer/Footer";
import NavBar from "../components/header/NavBar";
import About from "../components/sections/About";
import Articles from "../components/sections/Articles";
import Contact from "../components/sections/Contact";
import Credentials from "../components/sections/Credentials";
import HeroSection from "../components/sections/HeroSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import QuoteSection from "../components/sections/QuoteSection";
import { PostTypes, ProjectTypes } from "../types/types";
import Head from "next/head";
import client from "../sanityClient";
import { useEffect, useState } from "react";
import Ukiyo from "ukiyojs";
import ScrollImageSection from "../components/sections/ScrollImageSection";
import PageTitle from "../components/PageTitle";
import Layout from "../components/layout/Layout";
import PreLoader from "../components/preloader";

interface HomeProps {
  posts: PostTypes[];
  projects: ProjectTypes[];
}

export const getStaticProps: GetStaticProps = async () => {
  const posts: object[] = await client.fetch(
    `*[_type == "post"]{..., categories[]->}[0..1] | order(_createdAt desc)`
  );
  const projects = await client.fetch(
    `*[_type == "project"][0..4] | order(_createdAt desc)`
  );
  return {
    props: {
      posts,
      projects,
    },
    revalidate: 10,
  };
};

const Home: NextPage<HomeProps> = ({ posts, projects }) => {
  useEffect(() => {
    const images = document.querySelectorAll(".ukiyo");
    new Ukiyo(images);
    return () => {};
  }, []);
  return (
    <Layout>
      <PageTitle />
      {/* <PreLoader /> */}
      <main className="">
        <HeroSection />
        <About />
        <Credentials />
        <ProjectsSection projects={projects} />
        <ScrollImageSection />
        <QuoteSection />
        <Articles posts={posts} />
        <Contact />
      </main>
    </Layout>
  );
};

export default Home;
