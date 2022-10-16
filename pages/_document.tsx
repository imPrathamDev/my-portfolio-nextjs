import React from "react";
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Raleway&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body className="font-sans bg-primary-black text-primary-white selection:bg-primary-white selection:text-primary-black text-base">
          <span className="font-sans-light fixed bottom-6 right-4 text-sm text-primary-dark-white mix-blend-difference z-10">
            © 2022 - infinity
          </span>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
