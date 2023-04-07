import Layout from "../../components/layout/Layout";
import PageTitle from "../../components/PageTitle";

const PPPage = () => {
  return (
    <Layout>
      <PageTitle title="Privacy Policy | Pratham Sharma" />
      <main className="px-4 py-8 lg:px-24 lg:pt-32 lg:pb-8 lg:flex lg:items-center lg:justify-center">
        <div className="lg:max-w-[80vw]">
          <h1 className="text-4xl lg:text-7xl lg:leading-[1.1] font-dream-avenue my-4">
            Privacy Policy for Pratham&apos;s Portfolio Website.
          </h1>
          <article className="prose lg:prose-lg lg:prose-h2:font-semibold">
            <p>
              At Pratham&apos;s Portfolio, we take your privacy seriously. This
              Privacy Policy explains how we collect, use, and protect your
              personal information. By visiting or using our website, you
              consent to the collection and use of your information in
              accordance with this policy.
            </p>
            <h2>Information We Collect</h2>
            <ul>
              <li>
                Information you provide to us: When you fill out a contact form
                or subscribe to our newsletter, we may collect your name, email
                address, and any other information you provide.
              </li>
              <li>
                Usage information: We may collect information about how you use
                our website, such as your IP address, browser type, pages
                visited, and time spent on our site.
              </li>
              <li>
                Cookies: We may use cookies to collect information about your
                preferences and to personalize your experience on our website.
              </li>
            </ul>
            <p>
              We may collect the following types of personal information when
              you visit our website:
            </p>
            <h2>How We Use Your Information</h2>
            <p>We use the personal information we collect to:</p>
            <ul>
              <li>Respond to your inquiries and requests.</li>
              <li>Send you newsletters and other marketing communications.</li>
              <li>Improve our website and personalize your experience.</li>
              <li>Comply with applicable laws and regulations.</li>
            </ul>
            <p>
              We will never sell your personal information to third parties.
            </p>
            <h2>How We Protect Your Information</h2>
            <p>
              We use industry-standard security measures to protect your
              personal information from unauthorized access, disclosure, or
              misuse. However, no security system is foolproof, and we cannot
              guarantee the security of your information.
            </p>
            <h2>Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not
              responsible for the privacy practices or content of these
              websites. We encourage you to read the privacy policies of these
              websites before providing any personal information.
            </p>
            <h2></h2>
            Changes to This Policy
            <p>
              We reserve the right to change this Privacy Policy at any time. We
              will post the updated policy on our website and indicate the date
              it was last revised.
            </p>
            <h2>Contact Us</h2>
            <p>
              If you have any questions or concerns about our privacy practices,
              please contact us at pratham.sharma2105@gmail.com.
            </p>
          </article>
        </div>
      </main>
    </Layout>
  );
};

export default PPPage;
