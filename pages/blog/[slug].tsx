import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { GetStaticPaths, GetStaticProps } from "next";
import { PostTypes } from "../../types/types";
import moment from "moment";
import { blockContentToPlainText } from "react-portable-text";
import Image from "next/image";
import ShareModel from "../../components/models/ShareModel";
import Head from "next/head";
import client from "../../sanityClient";
import { PortableText, PortableTextReactComponents } from "@portabletext/react";
import copyToClipBoard from "../../helper/copyHelper";
import Toast from "../../components/Toast";
import TextToSpeech from "../../components/sections/TextToSpeech";
import { SmoothScrollContext } from "../../context/SmoothScroll.context";
import SanityImage from "../../components/SanityImage";
import urlFor from "../../helper/urlForHelper";
import Author from "../../components/Blog/Author";
import PrismJS from "prismjs";
import parse from "html-react-parser";
import readingTime from "../../helper/readingTimeHelper";
import convertToId from "../../helper/convertToIdHelper";
import Link from "next/link";
import PageTitle from "../../components/PageTitle";

interface SlugType {
  slug: { current: string; _type: string };
}

interface PostType {
  post: PostTypes;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const slugs = await client.fetch(`*[_type == "post"]{slug}`);
  const allSlugsPath = slugs.map((slug: SlugType) => ({
    params: { slug: slug.slug.current },
  }));
  return {
    paths: allSlugsPath,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const post = await client.fetch(
    `*[_type == "post" && slug.current == "${context.params?.slug}"]{..., author->, categories[]->}`
  );
  return {
    props: { post: post[0] },
  };
};

const SlugIndex = ({ post }: PostType) => {
  const scrollContext = useContext(SmoothScrollContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [postContent, setPostContent] = useState<any>([]);
  const [toast, setToast] = useState({ show: false, msg: "" });

  useEffect(() => {
    var subHeadings = document.querySelectorAll("article > h2");
    for (var i = 0; i < subHeadings.length; i++) {
      var subHeading = subHeadings[i];
      subHeading.setAttribute("id", convertToId(subHeading.innerHTML));
    }
    let data = document.querySelectorAll("article > h2");
    setPostContent(Array.from(data));
  }, []);

  const serializers: Partial<PortableTextReactComponents> = {
    types: {
      code: (props) => {
        const html = PrismJS.highlight(
          props.value.code,
          PrismJS.languages?.[props.value.language],
          props.value.language
        );
        return (
          <>
            <div className="transition-all border border-transparent hover:border-primary-white/30 rounded-lg bg-[#515151]">
              <div className="w-full flex items-center justify-between bg-[#515151] rounded-t-md px-2 py-1">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#323232]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#323232]"></div>
                  <div className="w-2 h-2 rounded-full bg-[#323232]"></div>
                </div>
                {props.value.filename && props.value.filename.length > 0 && (
                  <span className="text-xs  text-gray-300">
                    {props.value.filename}
                  </span>
                )}
                <button
                  onClick={(e: any) => {
                    copyToClipBoard(props.value.code, null);
                    setToast({ show: true, msg: "Code copy to clipboard!" });
                  }}
                  className="transition-all hover:text-green-500"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4 transition-all transform hover:scale-125 hover:animate-shake"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                    />
                  </svg>
                </button>
              </div>
              <pre
                data-language={props.value.language}
                className="relative group lg:custom-scrollbar"
              >
                <code className="">{parse(html)}</code>
              </pre>
            </div>
          </>
        );
      },
      image: (props) => {
        return (
          <SanityImage
            asset={props.value.asset}
            alt={props.value.alt}
            className="rounded-md bg-gray-500"
          />
        );
      },
    },
  };

  return (
    <Layout>
      <main className="px-4 py-6 lg:px-24 lg:pt-32 lg:pb-8 relative overflow-y-clip lg:overflow-visible">
        <Toast toast={toast} setToast={setToast} />
        <PageTitle
          title={`${post.title} | Pratham Sharma`}
          description={post.shortDesc}
          keywords={post.keywords}
          author={post.author.name}
          image={urlFor(post.mainImage).url()}
        />
        <section className="flex flex-col items-center">
          <div className="max-w-4xl">
            <div className="my-1 flex items-center gap-x-2">
              <span>{moment(post.publishedAt).format("MMMM Do YYYY")}</span>
              <span>-</span>
              <span>
                {readingTime(blockContentToPlainText(post?.content))} min
              </span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-dream-avenue py-2">
              {post.title}
            </h1>
            <p className="max-w-3xl font-sans-light lg:text-lg">
              {post.shortDesc}
            </p>
            <div className="w-[90vw] lg:w-[70vw] my-2 flex items-center gap-x-2 relative overflow-auto">
              {post.categories.map((category, index) => (
                <Link
                  key={index}
                  href={`/blog?category=${category.title.toLowerCase()}`}
                >
                  <span
                    key={category._id}
                    className="px-2 py-1 bg-transparent rounded-full border border-primary-dark-white text-primary-dark-white uppercase cursor-pointer hover:border-primary hover:text-primary transition-all linkHover"
                  >
                    {category.title}
                  </span>
                </Link>
              ))}
              <TextToSpeech text={blockContentToPlainText(post?.content)} />
              <button
                onClick={() => setIsOpen(true)}
                className="px-2 py-1 flex items-center gap-x-1 border border-primary-dark-white text-primary-dark-white rounded-full hover:border-primary hover:text-primary transition-all linkHover"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                  />
                </svg>
                <span className="">SHARE</span>
              </button>
            </div>
            <div className="my-3">
              <div className="w-full flex justify-center relative overflow-hidden">
                <Image
                  src={urlFor(post.mainImage).url()}
                  blurDataURL={urlFor(post.mainImage).url()}
                  width={"1280px"}
                  height={"720px"}
                  // layout="fill"
                  placeholder="blur"
                  className=""
                  alt={post.title}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="flex flex-col lg:flex-row gap-x-4 my-2">
          <div className="pt-6 text-primary-dark-white lg:h-screen lg:sticky lg:top-16 lg:overflow-hidden lg:w-1/4">
            <h3 className="font-dream-avenue text-2xl my-1">Page Contents:</h3>
            <div className="m-1 flex flex-col gap-y-0.5">
              {postContent.length > 0 ? (
                postContent.map(
                  (item: { id: string; innerText: string }, key: number) => (
                    <a
                      key={key}
                      href={"#" + item.id}
                      onClick={() => {
                        scrollContext !== null &&
                          scrollContext.lenis !== null &&
                          scrollContext.lenis.scrollTo("#" + item.id);
                      }}
                      className="cursor-pointer transition-all hover:text-primary-white hover:tracking-wider"
                    >
                      {key + 1}. {item.innerText}
                    </a>
                  )
                )
              ) : (
                <span className="my-4">Zero Points Available</span>
              )}
            </div>
            <div className=""></div>
          </div>
          <div className="flex-1 my-4">
            <article className="max-w-4xl prose prose-base prose-pre:mx-1 prose-pre:mb-1 prose-pre:mt-0.5 lg:prose-lg prose-a:transition-all prose-p:leading-7 relative overflow-hidden lg:prose-pre:mx-1 lg:prose-pre:mb-1 lg:prose-pre:mt-0.5 lg:prose-pre:rounded-t-lg lg:prose-pre:rounded-b-[cal(0.5rem - 0.25rem)]">
              <PortableText value={post.content} components={serializers} />
            </article>
            <Author author={post.author} />
          </div>
        </section>
        <ShareModel isOpen={isOpen} setIsOpen={setIsOpen} post={post} />
      </main>
    </Layout>
  );
};

export default SlugIndex;
