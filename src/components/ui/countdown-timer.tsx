"use client";

import React, { useEffect, useRef, useState } from "react";
import { useAnimate } from "framer-motion";

// Target: Acara Perpisahan Purna Bakti - 31 Mei 2026, Gedung Tampomas IPP Sumedang
const COUNTDOWN_FROM = "2026-05-31T00:00:00";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

type CountdownUnit = "Day" | "Hour" | "Minute" | "Second";

export default function ShiftingCountdown() {
  return (
    <section id="countdown" className="dark:bg-black bg-white dark:text-white text-black min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-500">
      <div className="text-center mb-12">
        <p className="text-sm font-medium uppercase tracking-[0.3em] opacity-50 mb-4">Hitung Mundur Menuju</p>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">Acara Perpisahan Purna Bakti</h2>
        <p className="text-base md:text-lg opacity-70">31 Mei 2026 &bull; Gedung Tampomas IPP Sumedang</p>
      </div>
      <div className="flex w-full max-w-5xl items-center bg-transparent">
        <CountdownItem unit="Day" label="Hari" />
        <CountdownItem unit="Hour" label="Jam" />
        <CountdownItem unit="Minute" label="Menit" />
        <CountdownItem unit="Second" label="Detik" />
      </div>
    </section>
  );
}

function CountdownItem({ unit, label }: { unit: CountdownUnit; label: string }) {
  const { ref, time } = useTimer(unit);
  // For seconds, ensure two digits (00–59)
  const display = unit === "Second" ? String(time).padStart(2, "0") : time;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-1 px-4 py-6 md:gap-2 md:py-8">
      <div className="relative w-full overflow-hidden text-center">
        <span
          ref={ref}
          className="block text-3xl font-mono font-semibold dark:text-white text-black md:text-5xl lg:text-7xl transition-colors duration-500"
        >
          {display}
        </span>
      </div>
      <span className="text-sm font-light dark:text-gray-400 text-gray-500 md:text-base lg:text-lg transition-colors duration-500">
        {label}
      </span>
      <div className="h-px w-full dark:bg-gray-700 bg-gray-300 mt-4 transition-colors duration-500"></div>
    </div>
  );
}

function useTimer(unit: CountdownUnit) {
  const [ref, animate] = useAnimate();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeRef = useRef(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    handleCountdown();
    intervalRef.current = setInterval(handleCountdown, 1000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCountdown = async () => {
    const end = new Date(COUNTDOWN_FROM);
    const now = new Date();
    const distance = end.getTime() - now.getTime();

    let newTime = 0;
    switch (unit) {
      case "Day":
        newTime = Math.max(0, Math.floor(distance / DAY));
        break;
      case "Hour":
        newTime = Math.max(0, Math.floor((distance % DAY) / HOUR));
        break;
      case "Minute":
        newTime = Math.max(0, Math.floor((distance % HOUR) / MINUTE));
        break;
      default:
        newTime = Math.max(0, Math.floor((distance % MINUTE) / SECOND));
    }

    if (newTime !== timeRef.current) {
      await animate(
        ref.current,
        { y: ["0%", "-50%"], opacity: [1, 0] },
        { duration: 0.35 }
      );

      timeRef.current = newTime;
      setTime(newTime);

      await animate(
        ref.current,
        { y: ["50%", "0%"], opacity: [0, 1] },
        { duration: 0.35 }
      );
    }
  };

  return { ref, time };
}
