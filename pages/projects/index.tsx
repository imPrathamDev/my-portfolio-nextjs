import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import React from "react";
import ProjectListCard from "../../components/cards/ProjectListCard";
import Layout from "../../components/layout/Layout";
import { ProjectTypes } from "../../types/types";
import client from "../../sanityClient";
import PageTitle from "../../components/PageTitle";

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
        <PageTitle
          title="Projects | Pratham Sharma"
          description="Let's check my open source projects. All projects github repo link
          is available if possible you will able to find demo link also on
          github repo README.md file."
          keywords="Pratham Sharma, Portfolio, Pratham, imPrathamDev, Projects"
          image="/ogImages/All-Projects-With-Github-Links.png"
        />
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

        <section className="lg:py-8 py-6 lg:px-6 grid grid-cols-1 gap-y-4 lg:grid-cols-2 lg:gap-y-0">
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
