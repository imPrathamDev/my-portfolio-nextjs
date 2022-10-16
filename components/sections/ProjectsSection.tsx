import Link from "next/link";
import React from "react";
import { ProjectTypes } from "../../types/types";
import ProjectListCard from "../cards/ProjectListCard";

interface ProjectSectionProps {
  projects: ProjectTypes[];
}

const ProjectsSection: React.FC<ProjectSectionProps> = ({ projects }) => {
  return (
    <section className="my-14 xl:mx-20 lg:mx-20">
      <h2 className="mx-6 text-6xl font-dream-avenue my-6">
        Sample <span className="text-primary">Works</span>.
      </h2>
      <div className="mb-4 lg:mb-8 lg:mt-14 flex flex-col lg:gap-y-12">
        {projects.map((project, key) => (
          <React.Fragment key={key}>
            <ProjectListCard num={key} project={project} />
          </React.Fragment>
        ))}
      </div>

      <div className="w-full flex items-center justify-center lg:justify-end mt-8">
        <Link href={"/projects"}>
          <a className="font-dream-avenue text-primary text-xl cursor-pointer hover:underline transition-all">
            Glimpse Of More +
          </a>
        </Link>
      </div>
    </section>
  );
};

export default ProjectsSection;
