import React, { useState, useEffect } from 'react';
import { WEDDING_CONFIG } from '../weddingData';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { couple } = WEDDING_CONFIG;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Invitation", href: "#invitation" },
    { label: "Countdown", href: "#countdown" },
    { label: "Verses", href: "#couple" },
    { label: "Events", href: "#events" },
    { label: "Venue", href: "#venue" },
    { label: "RSVP", href: "#rsvp" }
  ];

  const handleNavClick = (e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetElem = document.querySelector(href);
      if (targetElem) {
        targetElem.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#E0D3BC]/95 backdrop-blur-md border-b border-[#CBBCA0] shadow-md py-3"
          : "bg-[#E8DEC8]/90 backdrop-blur-md py-4 border-b border-[#D2C3A7]"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="font-cormorant text-base sm:text-lg md:text-xl font-medium tracking-wider text-[#1C1915] uppercase hover:text-[#967A3E] transition-colors"
        >
          {couple.combinedName}
        </a>
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="font-sans text-[13px] lg:text-[14px] text-[#453F36] hover:text-[#967A3E] tracking-wide transition-colors duration-200 font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
