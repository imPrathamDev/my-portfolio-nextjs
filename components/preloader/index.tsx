import { useEffect, useState } from "react";
import imagesLoaded from "imagesloaded";

const PreLoader = () => {
  const [per, setPer] = useState(0);
  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const imgLoad = imagesLoaded(sections);
    imgLoad.on("progress", (instance: any, image: any) => {
      // if (image.isLoaded) {
      //   image.img.classList.add("loaded");
      // }
      // let countedImages = document.querySelectorAll(".loaded").length;
      // console.log(countedImages);

      var width = (instance.progressedCount / instance.images.length) * 100;
      console.log({ width, total: instance.progressedCount, instance });
      console.log(width);

      // setPer(widthtoFixed());
    });
  }, []);
  return (
    <section
      className="fixed top-0 right-0 left-0 bottom-0"
      style={{ zIndex: 9999999 }}
    >
      <div className="relative">
        <div className="flex h-screen bars">
          <div className="w-[20vw] h-screen bg-primary-white bar"></div>
          <div className="w-[20vw] h-screen bg-primary-white bar"></div>
          <div className="w-[20vw] h-screen bg-primary-white bar"></div>
          <div className="w-[20vw] h-screen bg-primary-white bar"></div>
          <div className="w-[20vw] h-screen bg-primary-white bar"></div>
        </div>
        <div className="absolute top-0 right-0 left-0 bottom-0 w-full h-screen flex">
          <div className="w-screen h-1 bg-primary absolute bottom-[60%]"></div>
          <div className="w-1/2 h-screen text-[10rem] leading-[1] font-dream-avenue text-primary-black flex flex-col justify-end pl-12 pb-12">
            <div className="relative overflow-hidden my-2">
              <h3 className="">Pratham</h3>
            </div>
            <div className="relative overflow-hidden my-2">
              <h3 className="">Sharma</h3>
            </div>
          </div>
          <div className="w-1/2 h-screen text-[10rem] leading-[1] font-dream-avenue text-primary-black flex flex-col items-end justify-start pt-12 pr-12">
            <h4>{per}%</h4>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreLoader;
