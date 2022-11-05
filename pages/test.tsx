import Head from "next/head";
import React from "react";
import Layout from "../components/layout/Layout";

const Test = () => {
  const image = `https://og-image-nextjs.vercel.app/api/generate-og-image-playwrite?title=Anushka%20Sharma%20Classic%20Silver%20Zircon%20Set&desc=Love%20isn%27t%20about%20the%20rare%20big%20gestures,%20it%27s%20about%20the%20small%20things%20that%20bring%20you%20closer%20each%20day.%20This%20minimal%20set%20is%20the%20embodiment%20of%20your%20romance,%20beautiful,%20secure%20and%20envied%20by%20all.&price=5999&discPrice=2999&imageURL=https://cdn.shopify.com/s/files/1/0061/8378/0442/products/A.s.Zirconpendantset_1024x1024.jpg?v=1637761025`;
  return (
    <Layout>
      <main>
        <Head>
          <title>Projects | Pratham Sharma</title>
          <meta name="title" content="Projects | Pratham Sharma" />
          <meta
            name="description"
            content="Let's check my open source projects. All projects github repo link
          is available if possible you will able to find demo link also on
          github repo README.md file."
          />
          <meta
            name="keywords"
            content="Pratham Sharma, Portfolio, Pratham, imPrathamDev, Projects"
          />
          <meta name="author" content="Pratham Sharma" />

          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content={process.env.NEXT_PUBLIC_HOST} />
          <meta property="twitter:title" content="Projects | Pratham Sharma" />
          <meta
            property="twitter:description"
            content="Let's check my open source projects. All projects github repo link
          is available if possible you will able to find demo link also on
          github repo README.md file."
          />
          <meta property="twitter:image" content={image} />

          <meta property="og:type" content="website" />
          <meta property="og:url" content={process.env.NEXT_PUBLIC_HOST} />
          <meta property="og:title" content="Projects | Pratham Sharma" />
          <meta
            property="og:description"
            content="Let's check my open source projects. All projects github repo link
          is available if possible you will able to find demo link also on
          github repo README.md file."
          />
          <meta property="og:image" content={image} />
        </Head>
        Hello World!
      </main>
    </Layout>
  );
};

export default Test;
