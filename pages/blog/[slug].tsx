import React, { SyntheticEvent, useEffect, useId, useState } from "react";
import Layout from "../../components/layout/Layout";
import { GetStaticPaths, GetStaticProps } from "next";
import { PostTypes } from "../../types/types";
import moment from "moment";
import { blockContentToPlainText } from "react-portable-text";
import Image from "next/image";
import ImageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import ShareModel from "../../components/models/ShareModel";
import Head from "next/head";
import client from "../../sanityClient";
import { PortableText } from "@portabletext/react";
import copyToClipBoard from "../../helper/copyHelper";
import Toast from "../../components/Toast";
import TextToSpeech from "../../components/sections/TextToSpeech";

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

const convertToId = (Text: string) => {
  return Text.toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
};

const SlugIndex = ({ post }: PostType) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [postContent, setPostContent] = useState<any>([]);
  const [toast, setToast] = useState({ show: false, msg: "" });
  const builder = ImageUrlBuilder(client);
  const urlFor = (source: object) => {
    return builder.image(source);
  };
  const readingTime = () => {
    const totalWords = blockContentToPlainText(post?.content).split(" ").length;
    const wpm = 225;
    return Math.ceil(totalWords / wpm);
  };

  useEffect(() => {
    var subHeadings = document.querySelectorAll("article > h2");
    for (var i = 0; i < subHeadings.length; i++) {
      var subHeading = subHeadings[i];
      subHeading.setAttribute("id", convertToId(subHeading.innerHTML));
    }
    let data = document.querySelectorAll("article > h2");
    setPostContent(Array.from(data));
  }, []);

  const serializers = {
    types: {
      code: (props: any) => (
        <pre
          data-language={props.value.language}
          onClick={(e: any) => {
            let text = e.target?.innerText.split("\nCopy to clipboard");
            copyToClipBoard(text[0], null);
            setToast({ show: true, msg: "Code copy to clipboard!" });
          }}
          className="transition-all border-2 border-transparent hover:border-primary-white relative group custom-scrollbar"
        >
          <code>{props.value.code}</code>
          <div className="absolute invisible group-hover:visible flex items-center gap-1 text-sm top-2 right-2">
            <span>Copy to clipboard</span>
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
                d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
              />
            </svg>
          </div>
        </pre>
      ),
    },
  };

  return (
    <Layout>
      <main className="px-4 py-6 lg:px-24 lg:pt-32 lg:pb-8">
        <Toast toast={toast} setToast={setToast} />
        <Head>
          <title>{`${post.title} | Pratham Sharma`}</title>
          <meta name="title" content={`${post.title} | Pratham Sharma`} />
          <meta name="description" content={post.shortDesc} />
          <meta name="keywords" content={post.keywords} />
          <meta name="author" content={post.author.name} />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={process.env.NEXT_PUBLIC_HOST} />
          <meta
            property="twitter:title"
            content={`${post.title} | Pratham Sharma`}
          />
          <meta property="twitter:description" content={post.shortDesc} />
          <meta
            property="twitter:image"
            content={urlFor(post.mainImage).url()}
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content={process.env.NEXT_PUBLIC_HOST} />
          <meta
            property="og:title"
            content={`${post.title} | Pratham Sharma`}
          />
          <meta property="og:description" content={post.shortDesc} />
          <meta property="og:image" content={urlFor(post.mainImage).url()} />
        </Head>
        <section className="flex flex-col items-center">
          <div className="max-w-4xl">
            <div className="my-1 flex items-center gap-x-2">
              <span>{moment(post.publishedAt).format("MMMM Do YYYY")}</span>
              <span>-</span>
              <span>{readingTime()} min</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-dream-avenue py-2">
              {post.title}
            </h1>
            <p className="max-w-3xl font-sans-light lg:text-lg">
              {post.shortDesc}
            </p>
            <div className="my-2 flex items-center gap-x-2">
              <div className="flex items-center gap-x-2">
                {post.categories.map((category) => (
                  <span
                    key={category._id}
                    className="px-2 py-1 bg-transparent rounded-full border border-primary-dark-white text-primary-dark-white uppercase cursor-pointer hover:border-primary hover:text-primary transition-all"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
              <TextToSpeech text={blockContentToPlainText(post?.content)} />
              <button
                onClick={() => setIsOpen(true)}
                className="px-2 py-1 flex items-center gap-x-1 border border-primary-dark-white text-primary-dark-white rounded-full hover:border-primary hover:text-primary transition-all"
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
                    <Link key={key} href={`#${item.id}`}>
                      <a className="transition-all hover:text-primary-white hover:tracking-wider">
                        {key + 1}. {item.innerText}
                      </a>
                    </Link>
                  )
                )
              ) : (
                <span className="my-4">Zero Points Available</span>
              )}
            </div>
            <div className=""></div>
          </div>
          <div className="flex-1 my-4">
            <article className="max-w-4xl prose lg:prose-xl prose-a:transition-all">
              <PortableText value={post.content} components={serializers} />
            </article>
            <div className="max-w-4xl">
              <div className="mt-12 px-4 py-4 bg-[#282828] rounded-lg flex gap-2">
                <div className="">
                  <Image
                    src={urlFor(post.author.image).url()}
                    width={"60px"}
                    height={"60px"}
                    className="rounded-full"
                    alt={post.author.name}
                  />
                </div>
                <div className="">
                  <h3 className="text-2xl font-dream-avenue">
                    {post.author.name}
                    <span className="text-primary text-4xl">.</span>
                  </h3>
                  <div className="max-w-2xl">
                    <p>{blockContentToPlainText(post.author.bio)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <ShareModel isOpen={isOpen} setIsOpen={setIsOpen} post={post} />
      </main>
    </Layout>
  );
};

export default SlugIndex;
