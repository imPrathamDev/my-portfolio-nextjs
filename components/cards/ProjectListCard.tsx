import Image from "next/image";
import { ProjectTypes } from "../../types/types";
import urlFor from "../../helper/urlForHelper";
import Link from "next/link";

interface ProjectCardListProps {
  num: number;
  project: ProjectTypes;
}

const ProjectListCard: React.FC<ProjectCardListProps> = ({ num, project }) => {
  return (
    <Link href={`/projects/${project.slug.current}`}>
      <div
        className={`group p-4 my-4 flex flex-col border border-transparent transition-all bg-primary-black/20 hover:bg-primary-dark-white/10 hover:border-primary-dark-white/10 backdrop-blur-md rounded-md w-full lg:w-[35vw] project_item linkHover cursor-pointer`}
      >
        <div className="w-full">
          <Image
            src={urlFor(project.image).url()}
            blurDataURL={urlFor(project.image).url()}
            width={"1280px"}
            height={"720px"}
            placeholder="blur"
            className="object-contain object-center rounded-md opacity-80"
          />
        </div>
        <div className="flex flex-col justify-start z-10 py-6 lg:py-2 mix-blend-difference">
          <h3 className="text-3xl lg:text-5xl font-dream-avenue">
            {project.title}
          </h3>
          <p className="font-sans-light cutoff-text">{project.shortDesc}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectListCard;
