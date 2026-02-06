import { Fragment, useRef } from "react";
import { ProjectTypes } from "../../types/types";
import ProjectListCard from "../cards/ProjectListCard";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import LinkButton from "../LinkButton";
import isMobile from "../../helper/isMobileHelper";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);
interface ProjectSectionProps {
  projects: ProjectTypes[];
}

const ProjectsSection: React.FC<ProjectSectionProps> = ({ projects }) => {
  const sectionRef = useRef(null);
  useGSAP(
    () => {
      let isM = isMobile();
      if (!isM) {
        let section = document.getElementById("project_section");
        let allProjects = gsap.utils.toArray(".project_item");
        gsap.to(allProjects, {
          xPercent: -100 * (allProjects.length - 1),
          ease: "sine.out",
          scrollTrigger: {
            trigger: section,
            pin: "#test-section",
            scrub: 2,
            snap: 1 / (allProjects.length - 1),
            end: () => "+=" + section?.offsetWidth,
          },
        });
      } else {
        let blob = document.getElementById("blob-project");
        let section = document.getElementById("project_section");
        gsap.to(blob, {
          duration: 1,
          bottom: "-=" + section?.offsetHeight,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            scrub: 1,
          },
        });
      }
    },
    {
      scope: sectionRef,
    }
  );
  return (
    <section ref={sectionRef} id="project_section" className="overflow-x-clip">
      <div id="test-section" className="relative py-6">
        <div
          id="blob-project"
          className="block lg:block absolute bg-primary-white h-[300px] w-[300px] lg:h-[500px] lg:w-[500px] transform lg:-translate-x-[50%] lg:-translate-y-[50%] rounded-full bg-gradient-to-t to-[#f0a500] from-[#f9f9d6] filter blur-3xl animate-blob opacity-70 scale-50"
        ></div>
        <div className="mb-4 lg:mb-8 lg:mt-14 flex flex-col lg:flex-row lg:gap-x-12 px-6">
          {projects.map((project, key) => (
            <Fragment key={key}>
              <ProjectListCard num={key} project={project} />
            </Fragment>
          ))}
        </div>
        <div className="w-full flex items-center justify-center lg:justify-end lg:px-20">
          <LinkButton
            link="/projects"
            text="Glimpse Of More +"
            textSize="text-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
