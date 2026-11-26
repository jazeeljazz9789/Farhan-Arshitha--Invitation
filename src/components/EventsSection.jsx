import React from 'react';
import { Calendar, Clock, MapPin, Navigation } from 'lucide-react';
import FadeIn from './FadeIn';
import { WEDDING_CONFIG } from '../weddingData';

export default function EventsSection() {
  const { event, islamicText, family } = WEDDING_CONFIG;

  return (
    <section id="events" className="relative w-full py-20 px-4 sm:px-6 text-[#29251F] overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <img
          src="/image/cover 3.jpeg"
          alt="Wedding Ceremonies & Details"
          className="w-full h-full object-cover object-center filter contrast-[105%]"
        />
        <div className="absolute inset-0 bg-black/55 backdrop-blur-[0.5px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <FadeIn delay={100} className="text-center mb-12">
          <span className="font-sans text-xs tracking-[0.25em] uppercase text-[#b89b63] font-semibold block mb-2 drop-shadow-sm">
            Ceremonies
          </span>
          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl text-white font-normal tracking-wide drop-shadow-md">
            Wedding Details
          </h2>
        </FadeIn>

        <div className="max-w-2xl mx-auto space-y-6">
          {/* Main Nikkah Card */}
          <FadeIn delay={200}>
            <div className="p-7 sm:p-9 rounded-3xl border border-white/25 hover:border-[#b89b63] bg-black/40 backdrop-blur-md hover:bg-black/60 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              <div className="flex items-center justify-between border-b border-white/15 pb-4 mb-5">
                <div>
                  <h3 className="font-cormorant text-2xl sm:text-3xl text-white font-normal drop-shadow-sm">
                    {event.nikkah.title}
                  </h3>
                  <span className="font-sans text-xs text-[#b89b63] font-medium block mt-0.5">
                    {event.hijriDate}
                  </span>
                </div>
                <span className="font-sans text-xs uppercase tracking-wider text-[#b89b63] font-semibold bg-black/40 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-[#b89b63]/40 drop-shadow-sm transition-all duration-200">
                  Sacred Union
                </span>
              </div>

              <div className="space-y-4 font-sans text-sm text-zinc-200">
                {/* Date */}
                <div className="flex items-start gap-3.5">
                  <Calendar className="w-5 h-5 text-[#B89B63] shrink-0 mt-0.5 drop-shadow-sm" />
                  <div className="text-white font-semibold drop-shadow-sm leading-snug">
                    <div className="text-base">{event.day}, {event.dateFormatted}</div>
                    <div className="text-xs text-zinc-400 font-normal">{event.hijriDate}</div>
                  </div>
                </div>

                {/* Time */}
                <div className="flex items-center gap-3.5">
                  <Clock className="w-5 h-5 text-[#B89B63] shrink-0 drop-shadow-sm" />
                  <span className="text-white font-medium drop-shadow-sm text-base">
                    {event.nikkah.time}
                  </span>
                </div>

                {/* Venue */}
                <div className="pt-1">
                  <a
                    href={event.nikkah.googleMapsUrl || event.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3.5 group text-zinc-200 hover:text-[#B89B63] transition-colors"
                  >
                    <MapPin className="w-5 h-5 text-[#B89B63] shrink-0 mt-0.5 group-hover:scale-110 transition-transform drop-shadow-sm" />
                    <div>
                      <span className="group-hover:underline drop-shadow-sm font-semibold text-white block">
                        {event.venueName}
                      </span>
                      <span className="text-xs text-zinc-300 font-normal">
                        {event.address}
                      </span>
                    </div>
                  </a>
                </div>

                {/* Bridegroom Party Departure */}
                <div className="pt-3 border-t border-white/10 flex items-start gap-3.5 text-xs text-zinc-300">
                  <Navigation className="w-4 h-4 text-[#B89B63] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[#B89B63] font-semibold uppercase tracking-wider block mb-0.5">
                      {event.departure.label}:
                    </span>
                    <a
                      href={event.departure.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:underline hover:text-[#B89B63] transition-colors font-medium"
                    >
                      {event.departure.location}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Wedlock Dua Card */}
          <FadeIn delay={300}>
            <div className="p-6 sm:p-8 rounded-3xl bg-black/50 border border-white/15 backdrop-blur-md text-center">
              <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#B89B63] font-semibold block mb-3">
                Wedlock Dua
              </span>
              <p lang="ar" dir="rtl" className="font-amiri text-2xl sm:text-3xl text-white mb-2 leading-relaxed">
                {islamicText.wedlockDua.arabic}
              </p>
              <p className="font-cormorant italic text-sm sm:text-base text-zinc-300 max-w-lg mx-auto">
                “{islamicText.wedlockDua.translation}”
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
