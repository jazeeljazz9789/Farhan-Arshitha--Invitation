import React from 'react';

export default function SadFace() {
  return (
    <div
      aria-label="Compassionate sad face"
      className="relative shrink-0 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-b from-[#222026] via-[#17151C] to-[#0E0D12] border border-zinc-500/70 shadow-lg shadow-black/50 animate-sad-sway"
    >
      <svg
        viewBox="0 0 50 50"
        className="w-8 h-8 sm:w-9 sm:h-9 text-zinc-300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="25" cy="25" r="21" stroke="currentColor" strokeWidth="2.2" className="opacity-90" />
        <path d="M 15 16 Q 19 14 23 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
        <path d="M 35 16 Q 31 14 27 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" opacity="0.85" />
        <circle cx="19" cy="22" r="2.2" fill="currentColor" />
        <circle cx="31" cy="22" r="2.2" fill="currentColor" />
        <path d="M 17 33 Q 25 26 33 33" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path
          d="M 32 25 C 32 25 30.5 27.5 30.5 29 C 30.5 30.1 31.4 31 32.5 31 C 33.6 31 34.5 30.1 34.5 29 C 34.5 27.5 32 25 32 25 Z"
          fill="#93C5FD"
          className="animate-tear-drop"
        />
      </svg>
      <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-800 border border-zinc-600 text-[10px] shadow-sm select-none" aria-hidden="true">
        🤲
      </span>
    </div>
  );
}
