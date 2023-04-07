import { useState, useEffect, useRef } from "react";
import gsap, { Power2 } from "gsap";
import SelectVoice from "../models/SelectVoice";

const TextToSpeech = ({ text }: { text: string }) => {
  const [voice, setVoice] = useState<any>(null);
  const [status, setStatus] = useState("stop");
  const [isShow, setIsShow] = useState(false);
  const [range, setRange] = useState({
    volume: 1,
    rate: 1,
    pitch: 1,
  });
  const containerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  let speech: any;

  if (typeof window !== "undefined") {
    if ("speechSynthesis" in window) {
      speech = new SpeechSynthesisUtterance();
      speech.lang = "en";
      speech.text = text;
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 2;
      if (voice) {
        speech.voice = voice;
      }
    }
  }

  useEffect(() => {
    speech?.addEventListener("start", (event: any) => {
      setStatus("start");
    });
    speech?.addEventListener("pause", (event: any) => {
      setStatus("pause");
    });
    speech?.addEventListener("resume", (event: any) => {
      setStatus("start");
    });
    speech?.addEventListener("cancel", (event: any) => {
      setStatus("cancel");
    });
  }, [speech]);

  useEffect(() => {
    if (!voice) {
      setVoice(getVoices()[0]);
    }
    if (document.getElementById("settingToggle")) {
      if (status !== "stop") {
        gsap.to("#settingToggle", {
          duration: 1,
          y: 0,
          ease: Power2.easeInOut,
          delay: 1,
        });
      } else {
        gsap.to("#settingToggle", {
          duration: 1,
          y: 500,
          ease: Power2.easeInOut,
        });
      }
    }

    if (document.getElementById("settings")) {
      if (isShow) {
        gsap.to("#icon", {
          duration: 1,
          rotate: 180,
          ease: Power2.easeInOut,
        });
        gsap.to("#settings", {
          duration: 1,
          height: "auto",
          paddingBottom: "0.5rem",
          paddingTop: "0.5rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          ease: Power2.easeInOut,
        });
      } else {
        gsap.to("#icon", {
          duration: 1,
          rotate: 0,
          ease: Power2.easeInOut,
        });
        gsap.to("#settings", {
          duration: 1,
          height: 0,
          paddingBottom: 0,
          paddingTop: 0,
          paddingLeft: 0,
          paddingRight: 0,
          ease: Power2.easeInOut,
        });
      }
    }
  }, [isShow, status]);

  function getVoices(): any {
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

  function restartSpeech() {
    typeof window !== "undefined" && window.speechSynthesis.cancel();
    typeof window !== "undefined" && window.speechSynthesis.speak(speech!);
  }

  return (
    <>
      <button
        onClick={() => {
          if (status === "stop") {
            typeof window !== "undefined" && window.speechSynthesis.cancel();
            typeof window !== "undefined" &&
              window.speechSynthesis.speak(speech!);
          } else if (status === "start") {
            typeof window !== "undefined" && window.speechSynthesis.pause();
          } else if (status === "pause") {
            typeof window !== "undefined" && window.speechSynthesis.resume();
          }
        }}
        className="px-2 py-1 flex items-center gap-x-1 border border-primary-dark-white text-primary-dark-white rounded-full hover:border-primary hover:text-primary transition-all"
      >
        {status === "stop" || status === "pause" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
            />
          </svg>
        ) : status === "start" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 5.25v13.5m-7.5-13.5v13.5"
            />
          </svg>
        ) : (
          <></>
        )}
        <span className="">
          {status === "stop"
            ? "LISTEN"
            : status === "start"
            ? "PAUSE"
            : status === "pause"
            ? "RESUME"
            : "NO THING"}
        </span>
      </button>

      {status !== "stop" && (
        <div
          ref={containerRef}
          className="fixed left-0 right-0 px-4 lg:px-0 bottom-4 w-full lg:w-[18vw] lg:right-auto lg:left-4"
          style={{ zIndex: 10 }}
        >
          <div
            id="settingToggle"
            className="py-2 px-4 bg-[#252525]/60 backdrop-blur-md rounded-lg flex items-center justify-between my-3 translate-y-[500]"
          >
            <span>Text to Speech Settings</span>
            <button onClick={() => setIsShow((prev) => !prev)}>
              <svg
                id="icon"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 15.75l7.5-7.5 7.5 7.5"
                />
              </svg>
            </button>
          </div>

          <div
            id="settings"
            className="bg-[#252525]/60 backdrop-blur-md rounded-lg my-3 h-0 relative overflow-hidden transform accent-primary"
          >
            <label className="block text-sm font-medium mb-1">Voice</label>
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="p-1 bg-[#252525] rounded-md text-sm mb-6 truncate"
            >
              {voice && voice.name}
            </button>
            <label htmlFor="volume-range" className="block text-sm font-medium">
              Volume
            </label>
            <input
              id="volume-range"
              type="range"
              value={range.volume}
              min="0"
              max="1"
              step="0.1"
              onChange={(e) => {
                speech.volume = Number(e.target.value);
                setRange((prev) => ({
                  ...prev,
                  volume: Number(e.target.value),
                }));
                restartSpeech();
              }}
              className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <label htmlFor="pitch-range" className="block text-sm font-medium">
              Pitch
            </label>
            <input
              id="pitch-range"
              type="range"
              value={range.pitch}
              min="0"
              max="2"
              step="0.1"
              onChange={(e) => {
                speech.pitch = Number(e.target.value);
                setRange((prev) => ({
                  ...prev,
                  pitch: Number(e.target.value),
                }));
                restartSpeech();
              }}
              className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <label htmlFor="rate-range" className="block text-sm font-medium">
              Rate
            </label>
            <input
              id="rate-range"
              type="range"
              value={range.rate}
              min="0"
              max="10"
              step="0.1"
              onChange={(e) => {
                speech.rate = Number(e.target.value);
                setRange((prev) => ({ ...prev, rate: Number(e.target.value) }));
                restartSpeech();
              }}
              className="w-full h-1 mb-6 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />

            <span className="text-xs">
              <strong className="font-bold">Note: </strong>
              On change above settings, text to speech will be restart.
            </span>
          </div>
        </div>
      )}

      <SelectVoice
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setVoice={setVoice}
        speech={speech}
        restartSpeech={restartSpeech}
      />
    </>
  );
};

export default TextToSpeech;
