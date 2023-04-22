import { GetStaticPaths, GetStaticProps } from "next";
import React from "react";
import getReadmeMD from "../../apiActions/readmeDataFetch";
import Layout from "../../components/layout/Layout";
import client from "../../sanityClient";
import { ProjectTypes } from "../../types/types";
import moment from "moment";
import showdown from "showdown";
import parse, { HTMLReactParserOptions, Element } from "html-react-parser";
import Image from "next/image";
import { useRouter } from "next/router";
import PageTitle from "../../components/PageTitle";

interface SlugType {
  slug: { current: string; _type: string };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await client.fetch(`*[_type == "project"]{slug}`);
  const allSlugsPath = slugs.map((slug: SlugType) => ({
    params: { slug: slug.slug.current },
  }));
  return {
    paths: allSlugsPath,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const project = await client.fetch(
    `*[_type == "project" && slug.current == "${context.params?.slug}"]{...}`
  );
  const data = await getReadmeMD(project[0].readmeURL);

  return {
    props: {
      project: project[0],
      contentMD: data.data,
    },
    revalidate: 10,
  };
};

const ProjectPage = ({
  project,
  contentMD,
}: {
  project: ProjectTypes;
  contentMD: string;
}) => {
  const converter = new showdown.Converter();
  const router = useRouter();
  const options: HTMLReactParserOptions = {
    replace: (domNode) => {
      if (domNode instanceof Element) {
        switch (domNode.name) {
          case "h1":
            return <></>;
            break;
          case "img":
            return (
              <Image
                src={domNode.attribs.src}
                alt={domNode.attribs.alt}
                width={720}
                height={400}
                layout="responsive"
                className="rounded-md bg-gray-200"
              />
            );
            break;
          default:
            break;
        }
      }
    },
  };
  return (
    <Layout>
      <main className="px-4 py-6 lg:px-24 lg:pt-32 lg:pb-8">
        <PageTitle
          title={project.title + " | Pratham Sharma"}
          description={`Check out Pratham's project ${project.title}`}
        />
        <div className="py-4">
          <h1 className="text-4xl lg:text-6xl font-dream-avenue py-2">
            {project.title}
          </h1>
          <div className="w-full flex flex-col lg:flex-row gap-x-2 lg:items-center">
            <span>
              Published on{" "}
              <span className="font-dream-avenue">
                {moment(project._createdAt).format("MMMM Do YYYY")}
              </span>
            </span>
            <span className="hidden lg:block h-1.5 w-1.5 bg-primary rounded-full"></span>
            <span>
              Last updated on{" "}
              <span className="font-dream-avenue">
                {moment(project._updatedAt).format("MMMM Do YYYY")}
              </span>
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-y-2 lg:flex-row lg:gap-x-10 my-4">
          <div className="lg:w-4/6">
            <article className="prose prose-base max-w-[100%] lg:prose-h2:my-2">
              {parse(converter.makeHtml(contentMD), options)}
            </article>
          </div>
          <div className="lg:w-2/6 lg:h-screen lg:sticky lg:top-14">
            {project.githubURL.length > 0 && (
              <div className="my-2">
                <p className="text-xs font-medium">Github Repository</p>
                <div
                  onClick={() => {
                    router.push(project.githubURL);
                  }}
                  className="px-3 py-2 mt-1 rounded-md border border-primary-white/60 transition-all hover:bg-[#252525] overflow-hidden flex items-center cursor-pointer"
                >
                  <span className="truncate">{project.githubURL}</span>
                </div>
              </div>
            )}

            {project.liveURL && project.liveURL?.length > 0 && (
              <div className="my-2">
                <p className="text-xs font-medium">Live URL</p>
                <div
                  onClick={() => {
                    project.liveURL && router.push(project.liveURL);
                  }}
                  className="px-3 py-2 mt-1 rounded-md border border-primary-white/60 transition-all hover:bg-[#252525] overflow-hidden flex items-center cursor-pointer"
                >
                  <span className="truncate">{project.liveURL}</span>
                </div>
              </div>
            )}

            {project.npmURL && project.npmURL?.length > 0 && (
              <div className="my-2">
                <p className="text-xs font-medium">NPM URL</p>
                <div
                  onClick={() => {
                    project.npmURL && router.push(project.npmURL);
                  }}
                  className="px-3 py-2 mt-1 rounded-md border border-primary-white/60 transition-all hover:bg-[#252525] overflow-hidden flex items-center cursor-pointer"
                >
                  <span className="truncate">{project.npmURL}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default ProjectPage;
