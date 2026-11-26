import React from 'react';

export default function SmilingFace() {
  return (
    <div
      aria-label="Smiling joyful face"
      className="relative shrink-0 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-b from-[#2E2516] via-[#1F190E] to-[#120F08] border border-[#B89B63]/80 shadow-lg shadow-[#B89B63]/25 animate-smile-bounce"
    >
      <svg
        viewBox="0 0 50 50"
        className="w-8 h-8 sm:w-9 sm:h-9 text-[#B89B63]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="25" cy="25" r="21" stroke="currentColor" strokeWidth="2.2" className="opacity-90" />
        <path d="M 15 20 Q 19 14 23 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="animate-eye-pulse" />
        <path d="M 27 20 Q 31 14 35 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="animate-eye-pulse" />
        <circle cx="14" cy="25" r="2.5" fill="currentColor" opacity="0.35" />
        <circle cx="36" cy="25" r="2.5" fill="currentColor" opacity="0.35" />
        <path d="M 16 27 Q 25 38 34 27" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" className="animate-smile-draw" />
      </svg>
      <span className="absolute -top-1 -right-1 flex h-4 w-4" aria-hidden="true">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B89B63] opacity-40" />
        <svg viewBox="0 0 24 24" className="relative w-4 h-4 text-[#D4AF37] animate-sparkle-spin" fill="currentColor">
          <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
        </svg>
      </span>
    </div>
  );
}
