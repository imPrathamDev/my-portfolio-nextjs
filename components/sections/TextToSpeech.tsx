import { useState, useEffect } from "react";

const TextToSpeech = ({ text }: { text: string }) => {
  const [voice, setVoice] = useState<any>(getVoices());
  const [status, setStatus] = useState("stop");
  let speech: any;

  if (typeof window !== "undefined") {
    if ("speechSynthesis" in window) {
      speech = new SpeechSynthesisUtterance();
      speech.lang = "en";
      speech.text = text;
      speech.volume = 1;
      speech.rate = 1;
      speech.pitch = 2;
      speech.voice = voice[0];
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
    </>
  );
};

export default TextToSpeech;
