import gsap, { Expo } from "gsap";
import React, { useEffect } from "react";
import { ToastTypes } from "../types/types";

interface ToastTimer {
  // members of your "class" go here
}

const Toast: React.FC<ToastTypes> = ({ toast, setToast }) => {
  function Timer(this: any, cb: () => void, delay: number): any {
    let timerId: number | null,
      start: number,
      remaining: number = delay;

    this.pause = function () {
      window.clearTimeout(timerId!);
      timerId = null;
      remaining -= Date.now() - start;
      console.log({ timerId, remaining, window });
    };

    this.resume = function () {
      if (timerId) {
        return;
      }
      start = Date.now();
      timerId = window.setTimeout(cb, remaining);
      console.log({ timerId, remaining });
    };

    this.resume();
  }

  useEffect(() => {
    if (toast.show) {
      gsap.to("#toast", {
        duration: 0.8,
        y: 0,
        ease: Expo.easeInOut,
      });
    } else {
      gsap.to("#toast", {
        duration: 0.8,
        y: 600,
        ease: Expo.easeInOut,
      });
    }
  }, [toast.show]);

  let timer: any;
  useEffect(() => {
    if (!toast.show) return;
    timer = new (Timer as any)(
      () => setToast((prevData) => ({ ...prevData, show: false })),
      3000
    );
    console.log({ timer });

    return () => {
      clearTimeout(timer);
    };
  }, [toast.show]);

  return (
    <div
      id="toast"
      onMouseEnter={() => {
        if (timer) timer.pause();
      }}
      onMouseLeave={() => {
        if (timer) timer.resume();
      }}
      className="fixed bottom-6 left-6 px-4 py-2 bg-primary-white rounded-md text-primary-black font-semibold text-lg transform translate-y-28 cursor-pointer z-50"
    >
      <span>{toast.msg}</span>
    </div>
  );
};

export default Toast;
