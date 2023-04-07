import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";

interface SelectVoiceModelProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setVoice: any;
  speech: any;
  restartSpeech: () => void;
}

const SelectVoice: React.FC<SelectVoiceModelProps> = ({
  isOpen,
  setIsOpen,
  setVoice,
  speech,
  restartSpeech,
}) => {
  const [voices, setVoices] = useState(getVoices());

  function getVoices() {
    if (typeof window !== "undefined") {
      let voices = window.speechSynthesis.getVoices();
      if (!voices.length) {
        let utterance = new SpeechSynthesisUtterance("");
        window.speechSynthesis.speak(utterance);
        voices = window.speechSynthesis.getVoices();
      }
      return voices;
    }
  }

  useEffect(() => {
    setVoices(getVoices());
  }, [isOpen]);
  return (
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
          {/* <Toast toast={toast} setToast={setToast} /> */}
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
                    Select Voice
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

                <div className="my-4 block max-h-[40vh] custom-scrollbar">
                  {voices && (
                    <>
                      {voices.map((voice, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setVoice(voice);
                            speech.voice = voice;
                            restartSpeech();
                          }}
                          className={`bg-[#323232] rounded-lg px-1.5 py-0.5 m-1 transition-all hover:bg-[#323232]/40`}
                        >
                          {voice.name}
                        </button>
                      ))}
                    </>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default SelectVoice;
