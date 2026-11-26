import React from 'react';
import FadeIn from './FadeIn';
import Divider from './Divider';
import { WEDDING_CONFIG } from '../weddingData';

export default function Footer() {
  const { footer, couple, event, family } = WEDDING_CONFIG;
  const parts = footer.subheading.includes("·") ? footer.subheading.split("·") : [event.dateDots, "The Beginning of Forever"];
  const dateText = parts[0].trim();
  const trailingText = parts.slice(1).join("·").trim() || "The Beginning of Forever";

  const groomName = couple.groom.prefix ? `${couple.groom.prefix} ${couple.groom.name}` : couple.groom.name;
  const brideName = couple.bride.prefix ? `${couple.bride.prefix} ${couple.bride.name}` : couple.bride.name;

  return (
    <footer className="relative w-full py-20 px-4 sm:px-6 bg-[#EAE2D2] text-[#29251F] text-center">
      <FadeIn delay={150} className="max-w-4xl mx-auto">
        <div className="p-6 sm:p-10 md:p-14 rounded-3xl bg-[#FAF7F0] border border-[#DDCFB9] warm-card-shadow transition-all duration-300 hover:border-[#b89b63] hover:shadow-xl">
          <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#7A7366] font-semibold block mb-3">
            {footer.heading}
          </span>

          <h2 className="font-cormorant text-2xl sm:text-3xl md:text-4xl text-[#B89B63] font-normal tracking-wider uppercase my-4 flex flex-col lg:flex-row items-center justify-center gap-1.5 sm:gap-2 lg:gap-4">
            <span className="whitespace-nowrap">{groomName}</span>
            <span className="text-lg sm:text-xl lg:text-2xl text-[#B89B63] select-none leading-none" aria-hidden="true">
              ♥
            </span>
            <span className="whitespace-nowrap">{brideName}</span>
          </h2>

          <Divider variant="gold" className="my-4" />

          <p className="font-sans text-xs sm:text-sm tracking-[0.2em] uppercase text-[#7A7366] font-medium mt-4">
            <span>{dateText}</span>
            <span className="mx-2 select-none" aria-hidden="true">·</span>
            <span>{trailingText}</span>
          </p>

          <p className="font-cormorant italic text-base sm:text-lg text-[#5F5A52] mt-3">
            {footer.closingBlessing}
          </p>

          {family?.warmRegards && (
            <div className="mt-5 pt-4 border-t border-[#E5DCCB]/80 max-w-sm mx-auto">
              <p className="font-cormorant text-lg sm:text-xl text-[#5F5A52] tracking-wide">
                <span>Warm Regards From: </span>
                <span className="font-semibold text-[#29251F]">{family.warmRegards}</span>
              </p>
            </div>
          )}
        </div>
      </FadeIn>

      <FadeIn delay={300} className="mt-8 text-center text-[11px] text-[#8C8373] tracking-widest uppercase">
        <p>© 2026 {couple.combinedName} • All Rights Reserved</p>
      </FadeIn>
    </footer>
  );
}
