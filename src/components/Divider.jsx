import React from 'react';

export default function Divider({ className = "", variant = "gold" }) {
  const lineStyles = {
    gold: "bg-[#B89B63]/40",
    white: "bg-white/20",
    dark: "bg-[#29251F]/20"
  }[variant];

  const diamondStyles = {
    gold: "bg-[#B89B63]",
    white: "bg-white",
    dark: "bg-[#29251F]"
  }[variant];

  return (
    <div className={`flex items-center justify-center gap-3 my-6 ${className}`}>
      <div className={`h-[1px] w-12 sm:w-20 md:w-28 ${lineStyles}`} />
      <div className={`w-1.5 h-1.5 rotate-45 ${diamondStyles}`} />
      <div className={`h-[1px] w-12 sm:w-20 md:w-28 ${lineStyles}`} />
    </div>
  );
}
