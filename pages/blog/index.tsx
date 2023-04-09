import React, { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import Layout from "../../components/layout/Layout";
import { CategoryType, PostTypes } from "../../types/types";
import Head from "next/head";
import client from "../../sanityClient";
import BlogCard from "../../components/cards/BlogCard";
import { useRouter } from "next/router";
import PageTitle from "../../components/PageTitle";

interface Props {
  posts: PostTypes[];
  categories: CategoryType[];
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = await client.fetch(
    `*[_type == "post"]{..., author->, categories[]->} | order(_createdAt desc)`
  );

  const categories = await client.fetch(`*[_type == "category"]`);
  return {
    props: {
      posts,
      categories,
    },
    revalidate: 10,
  };
};

const BlogIndex = ({ posts, categories }: Props) => {
  const [allPosts, setAllPosts] = useState(posts);
  const [category, setCategory] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (category.length > 0) {
      setAllPosts(
        posts.filter((f) =>
          f.categories.find(
            (p) => p.title.toLowerCase() === category.toLowerCase()
          )
        )
      );
    }
  }, [category]);

  useEffect(() => {
    if (router.query.category) {
      setCategory(router.query.category as string);
    }
  }, [router]);
  return (
    <Layout>
      <main className="px-4 py-8 lg:px-24 lg:pt-32 lg:pb-8">
        <PageTitle
          title="Blog | Pratham Sharma"
          description="Let me share some practices and techniques which I learn in my
          programming journey. Mainly related to Web Development & App
          Development."
          keywords="Pratham Sharma, Portfolio, Pratham, imPrathamDev, Blog, Blogs, Pratham Sharma Blog, ReactJS, NextJS"
          image="/ogImages/All-Blogs-&-Tutorials-Page.png"
        />
        <section className="flex flex-col justify-start">
          <h1 className="text-6xl font-dream-avenue my-2">
            My Articles<span className=" text-primary">.</span>
          </h1>
          <p className="lg:w-1/2">
            Let me share some practices and techniques which I learn in my
            programming journey. Mainly related to Web Development & App
            Development.
          </p>
          <div className="my-2 flex items-center gap-x-2 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat._id}
                onClick={() => {
                  setCategory(cat.title);
                }}
                className={`px-2 py-1 bg-transparent rounded-full border uppercase cursor-pointer ${
                  category.toLowerCase() === cat.title.toLowerCase()
                    ? "border-primary text-primary hover:border-primary-dark-white hover:text-primary-dark-white"
                    : "border-primary-dark-white text-primary-dark-white hover:border-primary hover:text-primary"
                } transition-all linkHover`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </section>

        <section className="py-8 lg:px-6 px-2">
          <div className="">
            <div className="[column-fill:_balance] grid grid-cols-1 lg:grid-cols-2 sm:gap-6 lg:gap-8">
              {allPosts.map((post, key) => (
                <BlogCard post={post} key={key} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default BlogIndex;
