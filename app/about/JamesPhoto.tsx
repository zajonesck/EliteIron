"use client";

import { useState, useRef } from "react";
import Image from "next/image";

const PHRASES = [
  "Yes Sir",
  "Got it on all!",
  "Looks good.",
  "Video?",
  "Bodyweight?",
  "Yes Ma'am.",
  "Take squats an inch deeper.",
  "Faster off the chest.",
  "That's Emotional.",
  "YEP!",
  "More baby powder",
];

export default function JamesPhoto() {
  const [phrase, setPhrase] = useState<string | null>(null);
  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    clickCount.current += 1;

    if (clickTimer.current) clearTimeout(clickTimer.current);

    clickTimer.current = setTimeout(() => {
      if (clickCount.current === 3) {
        if (dismissTimer.current) clearTimeout(dismissTimer.current);
        const p = PHRASES[Math.floor(Math.random() * PHRASES.length)];
        setPhrase(p);
        dismissTimer.current = setTimeout(() => setPhrase(null), 5000);
      }
      clickCount.current = 0;
    }, 400);
  };

  return (
    <div className="relative cursor-pointer select-none" onClick={handleClick}>
      {/* Thought bubble */}
      {phrase && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full z-20 pointer-events-none animate-fade-in">
          {/* Bubble */}
          <div className="relative bg-white text-black font-black text-sm uppercase tracking-wide px-5 py-3 rounded-2xl shadow-2xl max-w-[220px] text-center leading-snug">
            {phrase}
            {/* Tail dots */}
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-white rounded-full" />
            <span className="absolute -bottom-5 left-1/2 -translate-x-[40%] w-2 h-2 bg-white rounded-full" />
            <span className="absolute -bottom-7 left-1/2 -translate-x-[30%] w-1.5 h-1.5 bg-white rounded-full" />
          </div>
        </div>
      )}

      {/* Photo */}
      <div className="relative overflow-hidden border border-white/10 max-w-sm">
        <div className="relative aspect-[4/5]">
          <Image
            src="/images/james-headshot.webp"
            alt="James Townsend — Head Coach, Elite Iron Sports Performance"
            fill
            className="object-cover object-top"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <p className="text-white text-xs font-bold tracking-widest uppercase">
              James Townsend
            </p>
            <p className="text-[#C41E1E] text-[10px] tracking-wide uppercase mt-0.5">
              Owner / Head Coach
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
