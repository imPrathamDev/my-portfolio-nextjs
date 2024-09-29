import { useRef } from "react";
import Image from "next/image";
import { PostTypes } from "../../types/types";
import Link from "next/link";
import moment from "moment";
import { blockContentToPlainText } from "react-portable-text";
import LinkButton from "../LinkButton";
import readingTime from "../../helper/readingTimeHelper";
import urlFor from "../../helper/urlForHelper";
import gsap, { Power2 } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(useGSAP);

interface ArticleProps {
  posts: PostTypes[];
}

const Articles: React.FC<ArticleProps> = ({ posts }) => {
  const sectionRef = useRef(null);
  useGSAP(
    () => {
      let targets = gsap.utils.toArray(".downToUp");
      gsap.fromTo(
        targets.reverse(),
        {
          y: 500,
        },
        {
          duration: 1,
          y: 0,
          ease: Power2.easeOut,
          stagger: {
            amount: 0.4,
          },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "start 90%",
          },
        }
      );
    },
    {
      scope: sectionRef,
    }
  );

  return (
    <section
      ref={sectionRef}
      className="mx-6 my-24 lg:my-0 mt-8 xl:mx-20 xl:mt-40 lg:mx-20 lg:mt-40 xl:mb-24  lg:mb-24 mix-blend-difference"
    >
      <div className="flex flex-col xl:flex-row lg:flex-row">
        <div className="flex flex-col xl:w-2/5 lg:w-2/5">
          <h2 className="text-6xl font-dream-avenue my-6">
            My <br />
            <span className="text-primary">Articles</span>.
          </h2>
          <div className="relative overflow-hidden">
            <Link href={`/blog/${posts[0].slug.current}`}>
              <a>
                <div className="mt-8 lg:mt-16 mb-8 mx-0 lg:mx-4 group cursor-pointer downToUp">
                  <div className="relative overflow-hidden w-full h-52 lg:h-64 2xl:h-72">
                    <Image
                      src={urlFor(posts[0].mainImage).url()}
                      blurDataURL={urlFor(posts[0].mainImage).url()}
                      placeholder="blur"
                      layout="fill"
                      className="object-cover object-center"
                      alt={posts[0].title}
                    />
                  </div>
                  <div className="flex items-start gap-2 font-dream-avenue mt-3">
                    <span className="text-3xl text-primary group-hover:underline transition-all">
                      01
                    </span>
                    <div className="">
                      <h3 className="text-3xl group-hover:underline transition-all">
                        {posts[0].title}
                      </h3>
                      <p className="text-sm font-sans text-primary-dark-white">
                        {posts[0].shortDesc}
                      </p>
                      <div className="font-dream-avenue my-1 flex items-center gap-x-1">
                        <span className="">
                          {moment(posts[0].publishedAt).format("MMM Do YY")}
                        </span>
                        <span>-</span>
                        <span>
                          {readingTime(
                            blockContentToPlainText(posts[0]?.content)
                          )}{" "}
                          minute
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        </div>
        <div className="xl:w-3/5 lg:w-3/5 flex justify-end">
          <div className="flex flex-col justify-between">
            <div className="relative overflow-hidden">
              <Link href={`/blog/${posts[1].slug.current}`}>
                <a>
                  <div className="mt-2 mb-8 mx-0 lg:mx-4 max-w-xl group cursor-pointer downToUp">
                    <div className="relative overflow-hidden w-full h-52 lg:h-80">
                      <Image
                        src={urlFor(posts[1].mainImage).url()}
                        blurDataURL={urlFor(posts[1].mainImage).url()}
                        placeholder="blur"
                        layout="fill"
                        className="object-cover object-center"
                        alt={posts[1].title}
                      />
                    </div>
                    <div className="flex items-start gap-2 font-dream-avenue mt-3">
                      <span className="text-3xl lg:text-4xl text-primary group-hover:underline transition-all">
                        02
                      </span>
                      <div className="">
                        <h3 className="text-3xl lg:text-4xl group-hover:underline transition-all">
                          {posts[1].title}
                        </h3>
                        <p className="text-sm font-sans text-primary-dark-white">
                          {posts[1].shortDesc}
                        </p>
                        <div className="font-dream-avenue my-1 flex items-center gap-x-1">
                          <span className="">
                            {moment(posts[1].publishedAt).format("MMM Do YY")}
                          </span>
                          <span>-</span>
                          <span>
                            {readingTime(
                              blockContentToPlainText(posts[1]?.content)
                            )}{" "}
                            minute
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            </div>
            <div className="w-full flex justify-end">
              <LinkButton
                link="/blog"
                text="Peruse More +"
                textSize="text-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Articles;
