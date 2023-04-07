import Image from "next/image";
import { blockContentToPlainText } from "react-portable-text";
import urlFor from "../../helper/urlForHelper";
import { PostAuthorType } from "../../types/types";

function Author({ author }: { author: PostAuthorType }) {
  return (
    <div className="max-w-4xl relative">
      <div
        id="blob-author"
        className="absolute bg-primary-white h-[260px] w-[260px] left-[5%] -top-12 rounded-full bg-gradient-to-t to-[#f0a500] vai-[#f2e04a] from-[#f9f9d6] animate-blob filter blur-3xl opacity-70 scale-50"
      ></div>
      <div className="mt-12 px-4 py-4 bg-[#282828]/40 backdrop-blur-lg rounded-lg flex gap-2 shadow-md">
        <div className="">
          <Image
            src={urlFor(author.image).url()}
            width={"60px"}
            height={"60px"}
            className="rounded-full"
            alt={author.name}
          />
        </div>
        <div className="">
          <h3 className="text-2xl font-dream-avenue">
            {author.name}
            <span className="text-primary text-4xl">.</span>
          </h3>
          <div className="max-w-2xl">
            <p>{blockContentToPlainText(author.bio)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Author;
