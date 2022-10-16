import React from "react";

const Credentials: React.FC = () => {
  return (
    <section className="mx-6 xl:mx-20 lg:mx-20 my-24 xl:h-screen lg:h-screen flex flex-col xl:flex-row lg:flex-row lg:items-center mix-blend-difference">
      <div className="flex flex-col xl:flex-row lg:flex-row gap-4">
        <h2
          data-scroll
          data-scroll-speed="3"
          data-scroll-delay="1"
          className="text-6xl font-dream-avenue my-3 flex-1"
        >
          Developing <br />
          <span className="text-primary">Journey</span>.
        </h2>
        <div className="flex flex-col">
          <h2 className="text-6xl font-dream-avenue my-3 hidden xl:block lg:block xl:invisible lg:invisible">
            Developing
            <br />
            Journey
          </h2>
          <div className="flex flex-col xl:flex-row lg:flex-row xl:items-start lg:items-start lg:gap-x-6">
            <div
              data-scroll
              data-scroll-speed="1"
              className="pt-6 pb-3 border-t-2 border-primary-dark-white"
            >
              <h3 className="text-xl font-semibold my-2">Learning</h3>
              <div className="text-sm max-w-[280px]">
                <p className="my-2">
                  The most important part of my or every developer's Journey is
                  to learn every day.
                </p>
                <p className="my-2">
                  I am a self-taught developer who learns different things from
                  different places.
                </p>
                <p className="my-2">
                  The best source of learning for me is youtube, mdn docs, and
                  technology's own docs.
                </p>
              </div>
            </div>
            <div
              data-scroll
              data-scroll-speed="3"
              className="pt-6 pb-3 border-t-2 border-primary-dark-white"
            >
              <h3 className="text-xl font-semibold my-2">Pedagogue</h3>
              <div className="text-sm max-w-[280px]">
                <p className="my-2">
                  In my development Journey, I found many awesome teachers.
                </p>
                <p className="my-2">
                  Every teacher is most important to me but there are some who
                  motivate me a lot in my journey.
                </p>
                <p className="my-2">
                  These teachers are Hitesh Choudhary, Piyush Agarwal
                  (RoadsideCoder), and Akshaya Saini.
                </p>
              </div>
            </div>
            <div
              data-scroll
              data-scroll-speed="6"
              className="pt-6 pb-3 border-t-2 border-primary-dark-white"
            >
              <h3 className="text-xl font-semibold my-2">Client Work</h3>
              <div className="text-sm max-w-[280px]">
                <p className="my-2">
                  I also learned many different things from my clients.
                </p>
                <p className="my-2">
                  I didn't have many clients' work but for those I have, I
                  completed them with my heart.
                </p>
                <p className="my-2">
                  I worked with different ideas most of them are mine, but some
                  are eCommerce websites, Chat App, Festival related, etc.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Credentials;
