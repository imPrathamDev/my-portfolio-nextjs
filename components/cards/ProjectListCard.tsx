import Image from "next/image";
import React from "react";
import { ProjectTypes } from "../../types/types";
import ImageUrlBuilder from "@sanity/image-url";
import client from "../../sanityClient";

interface ProjectCardListProps {
  num: number;
  project: ProjectTypes;
}

const ProjectListCard: React.FC<ProjectCardListProps> = ({ num, project }) => {
  const builder = ImageUrlBuilder(client);

  const urlFor = (source: object) => {
    return builder.image(source);
  };
  return (
    <a href={project.githubURL} target="blank">
      <div
        className={`group p-6 my-4 flex flex-col lg:flex-row xl:ml-[${
          num * 6
        }rem] lg:ml-[${num * 6}rem]`}
      >
        <div className="lg:w-2/5">
          <div className="relative overflow-hidden">
            <Image
              src={urlFor(project.image).url()}
              blurDataURL={urlFor(project.image).url()}
              width={"1280px"}
              height={"720px"}
              placeholder="blur"
              className="object-contain object-center lg:opacity-60 lg:group-hover:opacity-100 lg:transition-all"
            />
          </div>
        </div>
        <div className="lg:w-3/5 flex flex-col justify-start z-10 py-6 lg:py-10 mix-blend-difference">
          <h3
            data-scroll
            data-scroll-speed={num + 1}
            data-scroll-delay="1"
            className="text-5xl font-dream-avenue max-w-lg lg:-ml-10"
          >
            {project.title}
          </h3>
          <p
            data-scroll
            data-scroll-speed={num}
            data-scroll-delay="1.3"
            className="mx-4 max-w-xl font-sans-light"
          >
            {project.shortDesc}
          </p>
        </div>
      </div>
    </a>
  );
};

export default ProjectListCard;
