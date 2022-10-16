import React from "react";
import { GetStaticProps } from "next";
import Layout from "../../components/layout/Layout";
import { PostTypes } from "../../types/types";
import Image from "next/image";
import ImageUrlBuilder from "@sanity/image-url";
import moment from "moment";
import Link from "next/link";
import Head from "next/head";
import client from "../../sanityClient";

interface Props {
  posts: PostTypes[];
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await client.fetch(
    `*[_type == "post"]{..., author->, categories[]->} | order(_createdAt desc)`
  );
  return {
    props: {
      posts,
    },
    revalidate: 10,
  };
};

const BlogIndex = ({ posts }: Props) => {
  // console.log(posts);
  const builder = ImageUrlBuilder(client);
  const urlFor = (source: object) => {
    return builder.image(source);
  };
  return (
    <Layout>
      <main className="px-4 py-8 lg:px-24 lg:pt-32 lg:pb-8">
        <Head>
          <title>Blog | Pratham Sharma</title>
          <meta name="title" content="Blog | Pratham Sharma" />
          <meta
            name="description"
            content="Let me share some practices and techniques which I learn in my
          programming journey. Mainly related to Web Development & App
          Development."
          />
          <meta
            name="keywords"
            content="Pratham Sharma, Portfolio, Pratham, imPrathamDev, Blog, Blogs, Pratham Sharma Blog, ReactJS, NextJS"
          />
          <meta name="author" content="Pratham Sharma" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={process.env.NEXT_PUBLIC_HOST} />
          <meta property="twitter:title" content="Blog | Pratham Sharma" />
          <meta
            property="twitter:description"
            content="Let me share some practices and techniques which I learn in my
          programming journey. Mainly related to Web Development & App
          Development."
          />
          <meta
            property="twitter:image"
            content={`${process.env.NEXT_PUBLIC_HOST}/ogImages/All-Blogs-&-Tutorials-Page.png`}
          />

          <meta property="og:type" content="website" />
          <meta property="og:url" content={process.env.NEXT_PUBLIC_HOST} />
          <meta property="og:title" content="Blog | Pratham Sharma" />
          <meta
            property="og:description"
            content="Let me share some practices and techniques which I learn in my
          programming journey. Mainly related to Web Development & App
          Development."
          />
          <meta
            property="og:image"
            content={`${process.env.NEXT_PUBLIC_HOST}/ogImages/All-Blogs-&-Tutorials-Page.png`}
          />
        </Head>
        <section className="flex flex-col justify-start">
          <h1 className="text-6xl font-dream-avenue my-2">
            My Articles<span className=" text-primary">.</span>
          </h1>
          <p className="lg:w-1/2">
            Let me share some practices and techniques which I learn in my
            programming journey. Mainly related to Web Development & App
            Development.
          </p>
        </section>

        <section className="py-8 lg:px-6 px-2">
          <div className="">
            <div className="[column-fill:_balance] grid grid-cols-1 lg:grid-cols-2 sm:gap-6 lg:gap-8">
              {posts.map((post, key) => (
                <Link key={key} href={`/blog/${post.slug.current}`}>
                  <a className="mt-2 mb-8 mx-0 lg:mx-4 max-w-xl group">
                    <span className="sr-only">{post.title}</span>
                    <div>
                      <div className="relative overflow-hidden">
                        <Image
                          src={urlFor(post.mainImage).url()}
                          width={640}
                          height={400}
                          className="object-contain object-center"
                        />
                        <div className="absolute top-2 left-2 flex items-center justify-start gap-x-1">
                          {post.categories.map((category, key) => (
                            <span
                              key={key}
                              className="px-2 py-1 bg-primary-black text-primary-white text-base"
                            >
                              {category.title}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="font-dream-avenue mt-3">
                        <h2 className="text-3xl lg:text-4xl group-hover:underline group-hover:text-primary transition-all">
                          {post.title}
                        </h2>
                        <p className="text-sm font-sans text-primary-dark-white my-1">
                          {post.shortDesc}
                        </p>
                        <span>
                          {moment(post.publishedAt).format("MMM Do YY")}
                        </span>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default BlogIndex;
