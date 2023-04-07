import Head from "next/head";

const PageTitle = ({
  title = "Pratham Sharma",
  description = "",
  keywords = "Pratham Sharma, Portfolio, Pratham, imPrathamDev",
  author = "Pratham Sharma",
  url = process.env.NEXT_PUBLIC_HOST,
  image = "/ogImages/Design-&-Development-Portfolio.png",
}: {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  url?: string;
  image?: string;
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
    </Head>
  );
};

export default PageTitle;
