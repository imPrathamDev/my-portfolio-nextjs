import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import urlFor from "../../helper/urlForHelper";
import { PostTypes } from "../../types/types";

const BlogCard = ({ post }: { post: PostTypes }) => {
  return (
    <Link href={`/blog/${post.slug.current}`}>
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
          </div>
          <div className="font-dream-avenue mt-3">
            <h2 className="text-3xl lg:text-4xl group-hover:underline group-hover:text-primary transition-all">
              {post.title}
            </h2>
            <p className="text-sm font-sans text-primary-dark-white my-1">
              {post.shortDesc}
            </p>
            <span>{moment(post.publishedAt).format("MMM Do YY")}</span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default BlogCard;
