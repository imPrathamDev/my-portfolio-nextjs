import ImageUrlBuilder from "@sanity/image-url";
import client from "../sanityClient";

const builder = ImageUrlBuilder(client);

const urlFor = (source: object) => {
  return builder.image(source);
};

export default urlFor;
