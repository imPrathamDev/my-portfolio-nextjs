import Layout from "../../components/layout/Layout";
import PageTitle from "../../components/PageTitle";

const TCPage = () => {
  return (
    <Layout>
      <PageTitle title="Terms & Conditions | Pratham Sharma" />
      <main className="px-4 py-8 lg:px-24 lg:pt-32 lg:pb-8 lg:flex lg:items-center lg:justify-center">
        <div className="lg:max-w-[80vw]">
          <h1 className="text-4xl lg:text-7xl lg:leading-[1.1] font-dream-avenue my-4">
            Terms and Conditions for Pratham's Portfolio Website.
          </h1>
          <article className="prose lg:prose-lg lg:prose-h2:font-semibold">
            <p>
              By accessing and using Pratham's Portfolio, you agree to these
              Terms and Conditions. If you do not agree to these terms, please
              do not use our website.
            </p>

            <h2>Use of Content</h2>
            <p>
              All content on our website, including text, graphics, images, and
              code, is protected by copyright and other intellectual property
              laws. You may not copy, reproduce, distribute, or display any
              content from our website without our prior written consent.
            </p>

            <h2>User Submissions</h2>
            <p>
              We welcome user submissions, such as comments and feedback, but we
              reserve the right to moderate and remove any content that we deem
              inappropriate or offensive.
            </p>
            <h2>Privacy Policy</h2>

            <p>
              We respect your privacy and take the protection of your personal
              information seriously. Please refer to our Privacy Policy for more
              information on how we collect, use, and protect your personal
              information.
            </p>
            <h2>Links to Third-Party Websites</h2>
            <p>
              Our website may contain links to third-party websites. We are not
              responsible for the content or privacy practices of these websites
              and encourage you to read their terms and conditions and privacy
              policies before using them.
            </p>

            <h2>Disclaimer of Warranties</h2>
            <p>
              We make no warranties or representations about the accuracy,
              reliability, completeness, or timeliness of the content on our
              website. We are not liable for any errors or omissions in the
              content, or for any loss or damage of any kind incurred as a
              result of using our website.
            </p>
            <h2>Limitation of Liability</h2>
            <p>
              In no event shall we be liable for any direct, indirect,
              incidental, special, or consequential damages arising out of or in
              connection with your use of our website.
            </p>
            <h2>Indemnification</h2>
            <p>
              You agree to indemnify and hold us harmless from any claim or
              demand, including reasonable attorneys' fees, made by any third
              party due to or arising out of your use of our website or
              violation of these Terms and Conditions.
            </p>
            <h2>Governing Law</h2>
            <p>
              These Terms and Conditions shall be governed by and construed in
              accordance with the laws of Rajasthan, India, without giving
              effect to any principles of conflicts of law.
            </p>
            <h2>Changes to These Terms and Conditions</h2>
            <p>
              We reserve the right to change these Terms and Conditions at any
              time. We will post the updated terms on our website and indicate
              the date they were last revised.
            </p>
            <h2>Contact Us</h2>
            <p>
              If you have any questions or concerns about these Terms and
              Conditions, please contact us at pratham.sharma2105@gamil.com.
            </p>
          </article>
        </div>
      </main>
    </Layout>
  );
};

export default TCPage;
