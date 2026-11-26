import React from 'react';
import FadeIn from './FadeIn';
import Divider from './Divider';
import { WEDDING_CONFIG } from '../weddingData';

export default function InvitationCard() {
  const { islamicText, couple, family } = WEDDING_CONFIG;

  return (
    <section id="invitation" className="relative w-full py-24 px-4 sm:px-6 md:px-8 bg-[#EFE7D8] text-[#29251F]">
      <div className="relative max-w-4xl mx-auto text-center space-y-12 sm:space-y-14">
        {/* Bismillah */}
        <FadeIn delay={100} className="flex flex-col items-center justify-center text-center">
          <h2
            lang="ar"
            dir="rtl"
            className="font-amiri text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-[#b89b63] leading-[1.7] sm:leading-[1.8] select-none font-normal text-center w-full px-2"
          >
            {islamicText.bismillahArabic}
          </h2>
          <p className="font-cormorant italic text-base sm:text-lg md:text-xl text-[#b89b63] tracking-wide leading-relaxed max-w-2xl mx-auto mt-4 sm:mt-5 text-center">
            “{islamicText.bismillahEnglish}”
          </p>
        </FadeIn>

        {/* Divider */}
        <FadeIn delay={200}>
          <Divider variant="gold" className="my-8 sm:my-10 opacity-90" />
        </FadeIn>

        {/* Parents Cordial Invitation Card */}
        <FadeIn delay={250} className="max-w-3xl mx-auto">
          <div className="p-8 sm:p-10 md:p-12 rounded-3xl bg-[#FAF7F0] border border-[#DDCFB9] warm-card-shadow text-center">
            <span className="font-sans text-xs uppercase tracking-[0.25em] text-[#7A7366] font-semibold block mb-2">
              With the blessings of Allah
            </span>
            <h4 className="font-cormorant text-2xl sm:text-3xl font-medium text-[#29251F] mb-1">
              {family.hosts}
            </h4>
            <p className="font-sans text-xs text-[#7A7366] mb-6">
              {family.hostAddress} • Mob: <span className="font-medium text-[#29251F]">{family.hostPhone}</span>
            </p>

            <p className="font-sans text-base sm:text-lg text-[#5F5A52] leading-relaxed font-light max-w-2xl mx-auto mb-8">
              We cordially invite your esteemed presence with family on the auspicious occasion of the Nikkah of our beloved son
            </p>

            {/* Groom and Bride Detailed Box */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch pt-2">
              {/* Groom */}
              <div className="p-6 rounded-2xl bg-white border border-[#E5DCCB] flex flex-col justify-between">
                <div>
                  <span className="font-sans text-[11px] uppercase tracking-widest text-[#B89B63] font-semibold block mb-2">
                    Bridegroom
                  </span>
                  <h3 className="font-cormorant text-2xl sm:text-3xl font-normal text-[#29251F] uppercase tracking-wide">
                    {couple.groom.fullName}
                  </h3>
                  <p className="font-sans text-xs text-[#7A7366] mt-3 leading-relaxed">
                    S/o. {couple.groom.father} &amp; {couple.groom.mother}
                  </p>
                  <p className="font-sans text-[11px] text-[#8C8373] mt-2 italic leading-relaxed">
                    {couple.groom.grandparents}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#F0E9DC]">
                  <p className="font-sans text-[11px] text-[#7A7366]">
                    {couple.groom.address}
                  </p>
                </div>
              </div>

              {/* Bride */}
              <div className="p-6 rounded-2xl bg-white border border-[#E5DCCB] flex flex-col justify-between">
                <div>
                  <span className="font-sans text-[11px] uppercase tracking-widest text-[#B89B63] font-semibold block mb-2">
                    Bride
                  </span>
                  <h3 className="font-cormorant text-2xl sm:text-3xl font-normal text-[#29251F] uppercase tracking-wide">
                    {couple.bride.fullName}
                  </h3>
                  <p className="font-sans text-xs text-[#7A7366] mt-3 leading-relaxed">
                    D/o. {couple.bride.father} &amp; {couple.bride.mother}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#F0E9DC]">
                  <p className="font-sans text-[11px] text-[#7A7366]">
                    {couple.bride.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <span className="font-cormorant italic text-lg sm:text-xl text-[#B89B63]">
                In Shaa Allah
              </span>
            </div>
          </div>
        </FadeIn>

        {/* Quranic Blessing Quote (Surah Ar-Rum 30:21) */}
        {islamicText.blessingQuote && (
          <FadeIn
            delay={350}
            className="pt-8 sm:pt-10 border-t border-[#E5DCCB] max-w-3xl mx-auto flex flex-col items-center justify-center text-center"
          >
            <span className="font-sans text-xs sm:text-sm tracking-[0.25em] uppercase text-[#7A7366] font-semibold block mb-6 sm:mb-7 leading-normal text-center">
              {islamicText.blessingQuote.reference}
            </span>

            <div
              lang="ar"
              dir="rtl"
              className="font-amiri text-xl sm:text-2xl md:text-3xl lg:text-[34px] text-[#29251F] leading-[2.6] sm:leading-[2.8] md:leading-[3] font-normal text-center w-full px-2 space-y-3 sm:space-y-4"
            >
              {islamicText.blessingQuote.arabic.includes("وَجَعَلَ") ? (
                <>
                  <p className="block">
                    {islamicText.blessingQuote.arabic.split("وَجَعَلَ")[0].trim()}
                  </p>
                  <p className="block">
                    وَجَعَلَ {islamicText.blessingQuote.arabic.split("وَجَعَلَ")[1].trim()}
                  </p>
                </>
              ) : (
                <p className="block">{islamicText.blessingQuote.arabic}</p>
              )}
            </div>

            <p className="font-cormorant italic text-base sm:text-lg md:text-xl text-[#5F5A52] leading-[1.8] sm:leading-[1.9] max-w-2xl mx-auto mt-6 sm:mt-8 text-center text-balance">
              “{islamicText.blessingQuote.translation}”
            </p>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
