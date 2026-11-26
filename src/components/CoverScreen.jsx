import React from 'react';
import { ArrowRight } from 'lucide-react';
import InfinityIcon from './InfinityIcon';
import Divider from './Divider';
import { WEDDING_CONFIG } from '../weddingData';

export default function CoverScreen({ onEnter, isEntering = false }) {
  const { couple, event, islamicText } = WEDDING_CONFIG;
  const bismillahWords = islamicText.bismillahArabic.split(" ");
  const taglineWords = couple.tagline.split(" ");
  const groomDisplayName = couple.groom.prefix ? `${couple.groom.prefix} ${couple.groom.name}` : couple.groom.name;
  const brideDisplayName = couple.bride.prefix ? `${couple.bride.prefix} ${couple.bride.name}` : couple.bride.name;
  const groomWords = groomDisplayName.split(" ");
  const brideWords = brideDisplayName.split(" ");

  const bismillahEnd = 150 + 130 * bismillahWords.length + 40;
  const infinityDelay = bismillahEnd;
  const taglineStart = infinityDelay + 120;
  const dividerDelay = taglineStart + 120 * taglineWords.length + 80;
  const groomStart = dividerDelay + 130;
  const ampersandDelay = groomStart + 120 * groomWords.length + 50;
  const brideStart = ampersandDelay + 130;
  const dateDelay = brideStart + 130 * brideWords.length + 80;
  const buttonDelay = dateDelay + 150;

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 bg-black text-white overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <img
          src="/image/home.png"
          alt={couple.combinedName}
          className="w-full h-full object-cover object-center filter contrast-[105%]"
        />
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[0.2px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-lg mx-auto py-6 sm:py-10 text-center">
        {/* Top Header Group: Arabic wording, Infinity symbol, Tagline, Divider shifted upward to reveal background certificate names */}
        <div className="-translate-y-8 sm:-translate-y-12 md:-translate-y-14 transition-transform duration-300">
          {/* Animated Bismillah */}
          <div className="mb-2 sm:mb-3">
            <h1
              lang="ar"
              dir="rtl"
              className="font-amiri text-2xl sm:text-3xl md:text-4xl text-[#b89b63] tracking-wider leading-relaxed select-none font-normal drop-shadow-sm"
            >
              {bismillahWords.map((word, idx) => (
                <React.Fragment key={idx}>
                  <span
                    className="animate-opening-word"
                    style={{ animationDelay: `${150 + 130 * idx}ms` }}
                  >
                    {word}
                  </span>
                  {idx < bismillahWords.length - 1 && " "}
                </React.Fragment>
              ))}
            </h1>
          </div>

          {/* Animated Infinity Icon */}
          <div className="flex justify-center items-center my-2 sm:my-2.5">
            <div className="animate-opening-scale" style={{ animationDelay: `${infinityDelay}ms` }}>
              <InfinityIcon className="w-8 h-4 text-[#b89b63]" />
            </div>
          </div>

          {/* Animated Tagline */}
          <div className="my-2">
            <p className="font-sans text-xs uppercase tracking-[0.3em] text-zinc-300 font-medium">
              {taglineWords.map((word, idx) => {
                const isFirst = idx === 0;
                const isLast = idx === taglineWords.length - 1;
                const text = `${isFirst ? "“" : ""}${word}${isLast ? "”" : ""}`;
                return (
                  <React.Fragment key={idx}>
                    <span
                      className="animate-opening-word"
                      style={{ animationDelay: `${taglineStart + 120 * idx}ms` }}
                    >
                      {text}
                    </span>
                    {idx < taglineWords.length - 1 && " "}
                  </React.Fragment>
                );
              })}
            </p>
          </div>

          {/* Animated Divider */}
          <div className="animate-opening-divider" style={{ animationDelay: `${dividerDelay}ms` }}>
            <Divider variant="white" className="my-3 opacity-30" />
          </div>
        </div>

        {/* Animated Couple Names */}
        <div className="my-4 sm:my-6 space-y-2">
          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-normal tracking-wider text-white uppercase leading-tight">
            {groomWords.map((word, idx) => (
              <React.Fragment key={idx}>
                <span
                  className="animate-opening-word"
                  style={{ animationDelay: `${groomStart + 120 * idx}ms` }}
                >
                  {word}
                </span>
                {idx < groomWords.length - 1 && " "}
              </React.Fragment>
            ))}
          </h2>

          <div
            className="animate-opening-scale flex items-center justify-center gap-3 my-1"
            style={{ animationDelay: `${ampersandDelay}ms` }}
          >
            <span className="h-[1px] w-8 bg-[#b89b63]/40"></span>
            <span className="font-sans text-xs uppercase tracking-widest text-[#b89b63] font-medium">&amp;</span>
            <span className="h-[1px] w-8 bg-[#b89b63]/40"></span>
          </div>

          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl font-normal tracking-wider text-white uppercase leading-tight">
            {brideWords.map((word, idx) => (
              <React.Fragment key={idx}>
                <span
                  className="animate-opening-word"
                  style={{ animationDelay: `${brideStart + 130 * idx}ms` }}
                >
                  {word}
                </span>
                {idx < brideWords.length - 1 && " "}
              </React.Fragment>
            ))}
          </h2>
        </div>

        {/* Date */}
        <div className="my-5">
          <span
            className="animate-opening-word font-sans text-xs sm:text-sm tracking-[0.25em] font-semibold text-[#b89b63]"
            style={{ animationDelay: `${dateDelay}ms` }}
          >
            {event.dateBullets}
          </span>
        </div>

        {/* Enter Invitation Button */}
        <div className="animate-opening-button mt-8 flex justify-center" style={{ animationDelay: `${buttonDelay}ms` }}>
          <button
            onClick={onEnter}
            disabled={isEntering}
            type="button"
            className="group inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 rounded-lg bg-white hover:bg-[#b89b63] text-black hover:text-white font-sans text-xs sm:text-sm font-semibold tracking-[0.18em] uppercase transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#b89b63]/30 min-h-[46px] disabled:opacity-70 disabled:pointer-events-none cursor-pointer"
          >
            <span>Enter Invitation</span>
            <ArrowRight className="w-4 h-4 text-black group-hover:text-white transition-all duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
