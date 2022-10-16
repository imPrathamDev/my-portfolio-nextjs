import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useRef } from "react";
import {
  RiFacebookLine,
  RiTwitterLine,
  RiWhatsappLine,
  RiTelegramLine,
} from "react-icons/ri";
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import { PostTypes } from "../../types/types";
import party from "party-js";

interface ModelProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  post: PostTypes;
}

const ShareModel = ({ isOpen, setIsOpen, post }: ModelProps) => {
  const ref = useRef(null);
  const url: string = `${process.env.NEXT_PUBLIC_HOST}/blog/${post.slug.current}`;
  const coptToClipBoard = (url: string) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        party.confetti(document.getElementById("copyURL")!, {
          count: party.variation.range(20, 40),
          size: party.variation.range(0.8, 1.2),
        });
      })
      .catch(() => {});
  };
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 backdrop-blur-lg bg-primary-black/60 bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95 tranform translate-y-80"
                enterTo="opacity-100 scale-100 tranform translate-y-0"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100 tranform translate-y-0"
                leaveTo="opacity-0 scale-95 tranform translate-y-80"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-[#323232]/60 p-6 text-left align-middle shadow-xl transition-all">
                  <div className="flex items-center justify-between">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-dream-avenue leading-6"
                    >
                      Share With Friends
                    </Dialog.Title>
                    <button onClick={() => setIsOpen(false)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 transition-all duration-300 transform hover:text-primary hover:rotate-90 hover:scale-110"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-6 flex justify-center">
                    <div className="grid grid-cols-2 lg:grid-cols-4 items-center gap-x-4">
                      <FacebookShareButton
                        url={url}
                        hashtag={post.keywords}
                        quote={post.title}
                      >
                        <div className="flex items-center gap-0.5 transition-all hover:bg-primary-black rounded-md px-2 py-1">
                          <RiFacebookLine className="h-5 w-5" />
                          <span>Facebook</span>
                        </div>
                      </FacebookShareButton>

                      <TwitterShareButton url={url} title={post.title}>
                        <div className="flex items-center gap-0.5 transition-all hover:bg-primary-black rounded-md px-2 py-1">
                          <RiTwitterLine className="h-5 w-5" />
                          <span>Twitter</span>
                        </div>
                      </TwitterShareButton>

                      <WhatsappShareButton
                        url={url}
                        title={`${post.title}\n${post.shortDesc}\nRead More:\n`}
                        separator={""}
                      >
                        <div className="flex items-center gap-0.5 transition-all hover:bg-primary-black rounded-md px-2 py-1">
                          <RiWhatsappLine className="h-5 w-5" />
                          <span>Whatsapp</span>
                        </div>
                      </WhatsappShareButton>

                      <TelegramShareButton
                        url={url}
                        title={`${post.title}\n${post.shortDesc}\nRead More:\n`}
                      >
                        <div className="flex items-center gap-0.5 transition-all hover:bg-primary-black rounded-md px-2 py-1">
                          <RiTelegramLine className="h-5 w-5" />
                          <span>Telegram</span>
                        </div>
                      </TelegramShareButton>
                    </div>
                  </div>

                  <div className="mt-4 px-3">
                    <p className="py-2">Click to copy</p>
                    <div
                      id="copyURL"
                      ref={ref}
                      onClick={() => coptToClipBoard(url)}
                      className="px-4 py-2 bg-primary-black rounded-md relative overflow-hidden cursor-pointer border border-transparent hover:border-green-500 hover:bg-green-400/40 transition-all duration-300"
                    >
                      <span className="truncate text-ellipsis">{url}</span>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ShareModel;
