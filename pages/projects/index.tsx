import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import ProjectListCard from "../../components/cards/ProjectListCard";
import Layout from "../../components/layout/Layout";
import { ProjectTypes } from "../../types/types";
import client from "../../sanityClient";

interface ProjectPageProps {
  projects: ProjectTypes[];
}

export const getStaticProps: GetStaticProps = async () => {
  const projects = await client.fetch(
    `*[_type == "project"] | order(_createdAt desc)`
  );
  return {
    props: {
      projects,
    },
    revalidate: 10,
  };
};

const Page: NextPage<ProjectPageProps> = ({ projects }) => {
  return (
    <Layout>
      <main className="px-4 py-8 lg:px-24 lg:pt-32 lg:pb-8">
        <Head>
          <title>Projects | Pratham Sharma</title>
          <meta name="title" content="Projects | Pratham Sharma" />
          <meta
            name="description"
            content="Let's check my open source projects. All projects github repo link
          is available if possible you will able to find demo link also on
          github repo README.md file."
          />
          <meta
            name="keywords"
            content="Pratham Sharma, Portfolio, Pratham, imPrathamDev, Projects"
          />
          <meta name="author" content="Pratham Sharma" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={process.env.NEXT_PUBLIC_HOST} />
          <meta property="twitter:title" content="Projects | Pratham Sharma" />
          <meta
            property="twitter:description"
            content="Let's check my open source projects. All projects github repo link
          is available if possible you will able to find demo link also on
          github repo README.md file."
          />
          <meta
            property="twitter:image"
            content={`${process.env.NEXT_PUBLIC_HOST}/ogImages/All-Projects-With-Github-Links.png`}
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content={process.env.NEXT_PUBLIC_HOST} />
          <meta property="og:title" content="Projects | Pratham Sharma" />
          <meta
            property="og:description"
            content="Let's check my open source projects. All projects github repo link
          is available if possible you will able to find demo link also on
          github repo README.md file."
          />
          <meta
            property="og:image"
            content={`${process.env.NEXT_PUBLIC_HOST}/ogImages/All-Projects-With-Github-Links.png`}
          />
        </Head>
        <section className="flex flex-col justify-start">
          <h1 className="text-6xl font-dream-avenue my-2">
            My Projects<span className="text-primary">.</span>
          </h1>
          <p className="lg:w-1/2">
            Let&apos;s check my open source projects. All projects github repo
            link is available if possible you will able to find demo link also
            on github repo README.md file.
          </p>
        </section>

        <section className="py-8 px-6">
          {projects.map((project, key) => (
            <React.Fragment key={key}>
              <ProjectListCard num={key} project={project} />
            </React.Fragment>
          ))}
        </section>
      </main>
    </Layout>
  );
};

export default Page;
