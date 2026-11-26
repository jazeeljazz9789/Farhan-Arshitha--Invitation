import React from 'react';
import { ChevronDown } from 'lucide-react';
import InfinityIcon from './InfinityIcon';
import FadeIn from './FadeIn';
import { WEDDING_CONFIG } from '../weddingData';

export default function HeroSection() {
  const { couple, event } = WEDDING_CONFIG;
  const groomDisplayName = couple.groom.prefix ? `${couple.groom.prefix} ${couple.groom.name}` : couple.groom.name;
  const brideDisplayName = couple.bride.prefix ? `${couple.bride.prefix} ${couple.bride.name}` : couple.bride.name;

  const handleScrollDown = () => {
    const invElem = document.getElementById("invitation");
    if (invElem) {
      invElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] sm:min-h-screen w-full flex flex-col justify-between items-center text-center px-4 sm:px-6 py-8 sm:py-14 md:py-20 overflow-hidden text-white"
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <img
          src="/image/cover 4.jpeg"
          alt={couple.combinedName}
          className="w-full h-full object-cover object-center filter contrast-[105%]"
        />
        <div className="absolute inset-0 bg-black/65 backdrop-blur-[0.5px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto my-auto flex flex-col items-center space-y-4 sm:space-y-6">
        <FadeIn delay={100}>
          <p className="font-sans text-[11px] sm:text-sm tracking-[0.22em] sm:tracking-[0.3em] uppercase text-[#b89b63] font-medium drop-shadow-sm">
            {couple.homeSubtitle}
          </p>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="py-0.5">
            <InfinityIcon className="w-8 h-4 sm:w-9 sm:h-5 text-[#b89b63] drop-shadow-sm" />
          </div>
        </FadeIn>

        <FadeIn delay={300} className="space-y-1.5 sm:space-y-2">
          <h1 className="font-cormorant text-[32px] xs:text-[36px] sm:text-[50px] md:text-[62px] lg:text-[70px] font-normal tracking-wider text-white uppercase leading-[1.1] select-none drop-shadow-md">
            {groomDisplayName}
          </h1>

          <div className="flex items-center justify-center gap-4 py-1">
            <span className="h-[1px] w-10 sm:w-16 bg-white/30"></span>
            <span className="font-sans text-xs sm:text-sm uppercase tracking-widest text-white/80 font-medium">
              &amp;
            </span>
            <span className="h-[1px] w-10 sm:w-16 bg-white/30"></span>
          </div>

          <h1 className="font-cormorant text-[32px] xs:text-[36px] sm:text-[50px] md:text-[62px] lg:text-[70px] font-normal tracking-wider text-white uppercase leading-[1.1] select-none drop-shadow-md">
            {brideDisplayName}
          </h1>
        </FadeIn>

        <FadeIn delay={450} className="pt-1 sm:pt-2">
          <span className="font-cormorant text-xl sm:text-3xl text-[#b89b63] font-normal italic tracking-wider drop-shadow-sm">
            {event.day || "Thursday"} • {event.dateFormatted}
          </span>
        </FadeIn>

        <FadeIn delay={550} className="pt-1 sm:pt-2">
          <button
            onClick={handleScrollDown}
            type="button"
            className="inline-block px-5 py-1.5 sm:px-6 sm:py-2 rounded-full bg-black/40 hover:bg-black/70 backdrop-blur-md border border-white/25 hover:border-[#b89b63] font-sans text-xs sm:text-sm uppercase tracking-[0.25em] text-white font-medium shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            “{couple.tagline}”
          </button>
        </FadeIn>
      </div>

      <FadeIn delay={650} className="relative z-20 pt-6 pb-2 sm:pt-8 sm:pb-4 flex flex-col items-center">
        <button
          onClick={handleScrollDown}
          type="button"
          aria-label="Scroll down to invitation"
          className="group flex flex-col items-center gap-1.5 px-6 py-2.5 rounded-full bg-black/50 hover:bg-black/80 active:bg-black/90 backdrop-blur-md border border-white/25 hover:border-[#b89b63] shadow-lg hover:shadow-[#b89b63]/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#b89b63]/50"
        >
          <span className="font-sans text-[10px] sm:text-xs tracking-[0.25em] uppercase font-semibold text-white/90 group-hover:text-[#b89b63] transition-colors duration-200">
            Scroll Down
          </span>
          <ChevronDown className="w-4 h-4 text-[#b89b63] group-hover:text-white transition-all duration-200 animate-bounce group-hover:animate-none" />
        </button>
      </FadeIn>
    </section>
  );
}
