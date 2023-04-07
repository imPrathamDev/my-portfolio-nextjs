import { useNextSanityImage } from "next-sanity-image";
import Image from "next/image";
import client from "../sanityClient";

const SanityImage = ({
  asset,
  alt,
  className,
}: {
  asset: {
    _ref: string;
    _type: string;
  };
  alt: string;
  className: string;
}) => {
  const imageProps = useNextSanityImage(client, asset);

  if (!imageProps) return null;

  return (
    <Image
      {...imageProps}
      alt={alt}
      layout="responsive"
      sizes="(max-width: 800px) 100vw, 800px"
      className={className}
    />
  );
};

export default SanityImage;
