import React from 'react';

export default function InfinityIcon({ className = "w-8 h-8 text-inherit" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 50"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-label="Infinity"
    >
      <path d="M 30,12  C 15,12 8,25 25,38  C 42,50 58,0 75,12  C 92,25 85,38 70,38  C 55,38 45,25 30,12 Z" />
    </svg>
  );
}
