import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const SCALE_NOTES = [220, 246.94, 261.63, 293.66, 329.63, 349.23, 392, 440, 493.88, 523.25];
const MELODY_SEQUENCE = [0, 2, 4, 7, 6, 4, 2, 4, 5, 7, 9, 7, 5, 4, 2, 0];

export default function AudioPlayer({ shouldPlay }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const audioRef = useRef(null);
  const audioCtxRef = useRef(null);
  const synthIntervalRef = useRef(null);
  const [isSynthesizerActive, setIsSynthesizerActive] = useState(false);

  // Synthesizer fallback if audio file cannot be loaded
  const startSynthesizer = useCallback(() => {
    try {
      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtxClass) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtxClass();
      }

      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      const ctx = audioCtxRef.current;
      let noteIndex = 0;

      const playNextTone = () => {
        if (!ctx || ctx.state === "closed" || isMuted) return;

        const freq = SCALE_NOTES[MELODY_SEQUENCE[noteIndex % MELODY_SEQUENCE.length] % SCALE_NOTES.length];
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const now = ctx.currentTime;
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.05, now + 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.3);

        noteIndex++;
      };

      if (synthIntervalRef.current) {
        clearInterval(synthIntervalRef.current);
      }

      playNextTone();
      synthIntervalRef.current = setInterval(playNextTone, 950);
      setIsSynthesizerActive(true);
      setIsPlaying(true);
    } catch (err) {
      console.warn("Web Audio API ambient playback warning:", err);
    }
  }, [isMuted]);

  const stopSynthesizer = useCallback(() => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "running") {
      audioCtxRef.current.suspend();
    }
    setIsSynthesizerActive(false);
  }, []);

  const startAudio = useCallback(async () => {
    setHasStarted(true);
    if (audioRef.current) {
      try {
        audioRef.current.currentTime = 0;
        audioRef.current.volume = 0.6;
        await audioRef.current.play();
        setIsPlaying(true);
        setIsMuted(false);
      } catch (err) {
        console.info("Audio element playback failed or blocked, activating ambient synthesizer.");
        startSynthesizer();
      }
    }
  }, [startSynthesizer]);

  useEffect(() => {
    if (shouldPlay && !hasStarted) {
      startAudio();
    }
  }, [shouldPlay, hasStarted, startAudio]);

  // First interaction gesture unlock
  useEffect(() => {
    if (!shouldPlay) return;

    const handleFirstGesture = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setIsMuted(false);
          })
          .catch(() => {});
      }
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
    };

    window.addEventListener("click", handleFirstGesture, { once: true });
    window.addEventListener("touchstart", handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
    };
  }, [shouldPlay]);

  useEffect(() => {
    return () => stopSynthesizer();
  }, [stopSynthesizer]);

  const togglePlayback = () => {
    if (!hasStarted) {
      startAudio();
      return;
    }

    if (isSynthesizerActive) {
      if (isPlaying) {
        stopSynthesizer();
        setIsPlaying(false);
        setIsMuted(true);
      } else {
        setIsMuted(false);
        startSynthesizer();
      }
      return;
    }

    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            setIsMuted(false);
          })
          .catch(() => {
            startSynthesizer();
          });
      } else {
        if (isMuted) {
          audioRef.current.muted = false;
          setIsMuted(false);
          setIsPlaying(true);
        } else {
          audioRef.current.muted = true;
          setIsMuted(true);
          setIsPlaying(false);
        }
      }
    }
  };

  return (
    <aside aria-label="Audio player controls" className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
      <audio
        ref={audioRef}
        loop
        preload="auto"
        onError={() => {
          if (shouldPlay && !isSynthesizerActive) {
            startSynthesizer();
          }
        }}
        onPlay={() => {
          setIsPlaying(true);
          setIsMuted(false);
        }}
        onPause={() => setIsPlaying(false)}
      >
        <source
          src="/audio/Tujh%20Mein%20Rab%20Dikhta%20Hai%20_%20Violin%20Cover%20_%20Binesh%20Babu%20bollywood%20srk%20love%20violin%20cover%20music.mp3"
          type="audio/mpeg"
        />
        <source
          src="/audio/Tujh Mein Rab Dikhta Hai _ Violin Cover _ Binesh Babu bollywood srk love violin cover music.mp3"
          type="audio/mpeg"
        />
        <source src="/audio/wedding-music.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={togglePlayback}
        type="button"
        aria-label={isPlaying && !isMuted ? "Mute background wedding music" : "Play background wedding music"}
        className="group relative flex items-center justify-center w-11 h-11 rounded-full bg-[#FFFFFF]/95 hover:bg-[#FAF7F0] text-[#29251F] border border-[#E5DCCB] hover:border-[#B89B63] shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
      >
        {isPlaying && !isMuted ? (
          <Volume2 className="w-5 h-5 text-[#B89B63] transition-transform duration-300 group-hover:scale-110" />
        ) : (
          <VolumeX className="w-5 h-5 text-[#7A7366] transition-transform duration-300 group-hover:scale-110" />
        )}
      </button>
    </aside>
  );
}
