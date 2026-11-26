import React from 'react';
import FadeIn from './FadeIn';
import { WEDDING_CONFIG } from '../weddingData';

export default function IslamicVerses() {
  const { islamicText } = WEDDING_CONFIG;
  const quotes = islamicText.marriageQuotes || [];

  return (
    <section id="couple" className="relative w-full py-20 px-4 sm:px-6 bg-[#F8F5EE] text-[#29251F]">
      <span id="family" className="sr-only"></span>
      <div className="max-w-5xl mx-auto">
        <FadeIn delay={100} className="text-center mb-10 sm:mb-12">
          <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#7A7366] font-semibold block mb-2">
            Divine Guidance
          </span>
          <h2 className="font-cormorant text-[19px] min-[360px]:text-[22px] min-[420px]:text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#29251F] font-normal tracking-wide whitespace-nowrap text-center">
            Islamic Marriage Verses &amp; Hadith
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-4xl mx-auto">
          {quotes.map((quote, idx) => (
            <FadeIn key={idx} delay={200 + 150 * idx}>
              <div className="text-center flex flex-col items-center justify-between py-2 sm:py-4">
                <div>
                  <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#7A7366] font-semibold block mb-4">
                    {quote.label}
                  </span>
                  <p
                    lang="ar"
                    dir="rtl"
                    className="font-amiri text-2xl sm:text-3xl lg:text-[32px] text-[#29251F] mb-3 leading-relaxed"
                  >
                    {quote.arabic}
                  </p>
                  <p className="font-cormorant italic text-base sm:text-lg md:text-xl text-[#5F5A52] leading-relaxed max-w-md mx-auto">
                    “{quote.translation}”
                  </p>
                </div>
                <span className="font-sans text-xs uppercase tracking-wider text-[#7A7366] font-semibold mt-4 block">
                  {quote.reference}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
