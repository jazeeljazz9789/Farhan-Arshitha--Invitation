import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import FadeIn from './FadeIn';
import { WEDDING_CONFIG } from '../weddingData';

export default function CountdownTimer() {
  const { event, couple } = WEDDING_CONFIG;
  const targetTime = new Date(event.targetIsoDate).getTime();
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false
  });

  useEffect(() => {
    setMounted(true);

    const calculateTime = () => {
      const difference = targetTime - new Date().getTime();
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
      }
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
        isExpired: false
      };
    };

    setTimeLeft(calculateTime());
    const interval = setInterval(() => {
      setTimeLeft(calculateTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [targetTime]);

  const timeBlocks = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds }
  ];

  return (
    <section id="countdown" className="relative w-full py-20 sm:py-24 px-4 sm:px-6 text-center overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <img
          src="/image/background1.jpeg"
          alt="Wedding Countdown"
          className="w-full h-full object-cover object-center filter contrast-[105%]"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[0.5px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <FadeIn delay={100} className="mb-10 sm:mb-12">
          <span className="font-sans text-xs sm:text-sm tracking-[0.25em] uppercase text-[#b89b63] font-semibold block mb-2 drop-shadow-sm">
            Until We Say Forever • <span className="whitespace-nowrap">{event.dateDots}</span>
          </span>
          <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl text-white font-normal tracking-wide drop-shadow-md">
            Counting Every Moment
          </h2>
        </FadeIn>

        {mounted && timeLeft.isExpired ? (
          <FadeIn delay={200} className="p-6 max-w-md mx-auto text-center">
            <Clock className="w-8 h-8 text-[#b89b63] mx-auto mb-3 drop-shadow-sm" />
            <h3 className="font-cormorant text-2xl sm:text-3xl text-white font-normal drop-shadow-md">
              Alhamdulillah! The Celebration Has Begun
            </h3>
            <p className="font-sans text-xs sm:text-sm text-zinc-300 mt-2">
              Mubarak to {couple.groom.name} &amp; {couple.bride.name}!
            </p>
          </FadeIn>
        ) : (
          <div className="grid grid-cols-6 lg:grid-cols-4 gap-x-2 sm:gap-x-6 lg:gap-x-8 gap-y-6 sm:gap-y-8 max-w-3xl mx-auto items-center">
            {timeBlocks.map((block, idx) => {
              const isLast = idx === 3;
              return (
                <FadeIn
                  key={idx}
                  delay={150 + 100 * idx}
                  className={`group flex flex-col items-center justify-center p-1 sm:p-2 text-center transition-transform duration-300 hover:scale-105 cursor-default ${
                    isLast ? "col-span-2 col-start-3 lg:col-span-1 lg:col-start-auto" : "col-span-2 lg:col-span-1"
                  }`}
                >
                  <div className="font-cormorant text-[36px] sm:text-[48px] md:text-[58px] lg:text-[68px] font-normal tracking-tight text-white leading-none drop-shadow-md select-none group-hover:brightness-110 transition-all duration-200">
                    {mounted ? String(block.value).padStart(2, "0") : "--"}
                  </div>
                  <div className="font-sans text-[10px] sm:text-xs uppercase tracking-[0.16em] sm:tracking-[0.25em] text-[#b89b63] group-hover:text-[#d4af37] mt-2 sm:mt-3 font-semibold drop-shadow-sm transition-colors duration-200">
                    {block.label}
                  </div>
                </FadeIn>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
