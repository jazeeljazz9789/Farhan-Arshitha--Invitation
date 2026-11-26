import React, { useState, useRef } from 'react';
import CoverScreen from './components/CoverScreen';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import InvitationCard from './components/InvitationCard';
import CountdownTimer from './components/CountdownTimer';
import IslamicVerses from './components/IslamicVerses';
import EventsSection from './components/EventsSection';
import VenueSection from './components/VenueSection';
import RSVPSection from './components/RSVPSection';
import Footer from './components/Footer';
import AudioPlayer from './components/AudioPlayer';
import InfinityIcon from './components/InfinityIcon';
import { WEDDING_CONFIG } from './weddingData';

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [isFadingOutTransition, setIsFadingOutTransition] = useState(false);
  const [shouldPlayAudio, setShouldPlayAudio] = useState(false);
  const isTransitioningRef = useRef(false);

  const { couple } = WEDDING_CONFIG;

  const handleEnterInvitation = () => {
    if (isTransitioningRef.current || isOpened) return;

    isTransitioningRef.current = true;
    setShouldPlayAudio(true);
    setIsEntering(true);

    setTimeout(() => {
      setIsOpened(true);
      setIsFadingOutTransition(true);
      try {
        window.scrollTo(0, 0);
      } catch (err) {}
    }, 1500);

    setTimeout(() => {
      setIsEntering(false);
      setIsFadingOutTransition(false);
      isTransitioningRef.current = false;
    }, 2000);
  };

  return (
    <div
      className={`relative min-h-screen transition-colors duration-500 ${
        isOpened
          ? "bg-[#F7F1E6] text-[#29251F] selection:bg-[#B89B63] selection:text-white"
          : "bg-black text-white selection:bg-white selection:text-black"
      }`}
    >
      {/* Landing / Opening Cover Screen */}
      {!isOpened && !isEntering && (
        <CoverScreen onEnter={handleEnterInvitation} isEntering={isEntering} />
      )}

      {/* Cinematic Transition Modal */}
      {isEntering && (
        <div
          aria-live="polite"
          className={`fixed inset-0 z-[60] flex items-center justify-center bg-black text-white px-6 text-center overflow-hidden transition-opacity duration-500 ease-out ${
            isFadingOutTransition ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          {/* Background Image with Contrast Overlay */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
            <img
              src="/image/image2.jpeg"
              alt="Transition Background"
              className="w-full h-full object-cover object-center filter contrast-[105%]"
            />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[0.5px]"></div>
          </div>

          <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center animate-float-gentle animate-fade-in">
            <div className="mb-4">
              <InfinityIcon className="w-10 h-5 text-[#b89b63] drop-shadow-sm" />
            </div>

            <h2 className="font-cormorant text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white drop-shadow-lg leading-tight select-none">
              LET'S SEE THE INVITATION
            </h2>

            <div className="flex items-center justify-center gap-3 my-4">
              <span className="h-[1px] w-12 sm:w-16 bg-[#b89b63]/50"></span>
              <span className="w-1.5 h-1.5 rotate-45 bg-[#b89b63]"></span>
              <span className="h-[1px] w-12 sm:w-16 bg-[#b89b63]/50"></span>
            </div>

            <p className="font-sans text-xs sm:text-sm tracking-[0.3em] uppercase text-[#b89b63] font-medium drop-shadow-sm">
              {couple.groom.fullName} &amp; {couple.bride.fullName}
            </p>
          </div>
        </div>
      )}

      {/* Main Wedding Invitation Experience */}
      {isOpened && (
        <div className="animate-fade-in transition-opacity duration-700 bg-[#F7F1E6] text-[#29251F]">
          <div className="relative min-h-screen w-full bg-[#F7F1E6] text-[#29251F] selection:bg-[#B89B63] selection:text-white">
            <Navbar />
            <main className="relative z-10 w-full overflow-x-hidden">
              <HeroSection />
              <InvitationCard />
              <CountdownTimer />
              <IslamicVerses />
              <EventsSection />
              <VenueSection />
              <RSVPSection />
              <Footer />
            </main>
          </div>
        </div>
      )}

      {/* Ambient Audio Player */}
      {shouldPlayAudio && <AudioPlayer shouldPlay={true} />}
    </div>
  );
}
