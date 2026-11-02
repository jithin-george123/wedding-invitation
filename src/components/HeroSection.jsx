import React from 'react';
import { TypewriterText } from './TypewriterText';
import { Sparkles } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export const HeroSection = ({ data }) => {
  const {
    topCornerQuote,
    heroEyebrow,
    groomName,
    brideName,
    malayalamGroom,
    malayalamBride,
    malayalamConnector,
    heroSubtitle,
    date,
    useMalayalamInHero
  } = data;

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="kayal-hero-section relative min-h-screen flex flex-col justify-between overflow-hidden bg-[#FAF7F0]">
      {/* Top Navigation Bar */}
      <nav className="kayal-nav w-full px-6 sm:px-8 md:px-12 pt-6 pb-2 flex items-center justify-between relative z-20">
        {/* Left spacer for visual balance (matches original) */}
        <div className="w-20 hidden md:block" />

        {/* Center Navigation Links */}
        <div className="kayal-nav-links hidden md:flex items-center gap-6 lg:gap-8 mx-auto">
          <button
            onClick={() => scrollTo('hero')}
            className="kayal-nav-link active font-sans text-xs tracking-[0.18em] uppercase text-[#2A4D45] font-semibold pb-1 border-b border-[#2A4D45] transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => scrollTo('story-section')}
            className="kayal-nav-link font-sans text-xs tracking-[0.18em] uppercase text-[#5C5148] hover:text-[#2A4D45] transition-colors cursor-pointer"
          >
            Our Story
          </button>
          <button
            onClick={() => scrollTo('details-section')}
            className="kayal-nav-link font-sans text-xs tracking-[0.18em] uppercase text-[#5C5148] hover:text-[#2A4D45] transition-colors cursor-pointer"
          >
            Wedding Details
          </button>
          <button
            onClick={() => scrollTo('venue-section')}
            className="kayal-nav-link font-sans text-xs tracking-[0.18em] uppercase text-[#5C5148] hover:text-[#2A4D45] transition-colors cursor-pointer"
          >
            Venue
          </button>
          <button
            onClick={() => scrollTo('gallery-section')}
            className="kayal-nav-link font-sans text-xs tracking-[0.18em] uppercase text-[#5C5148] hover:text-[#2A4D45] transition-colors cursor-pointer"
          >
            Gallery
          </button>
          <button
            onClick={() => scrollTo('rsvp-section')}
            className="kayal-nav-link font-sans text-xs tracking-[0.18em] uppercase text-[#5C5148] hover:text-[#2A4D45] transition-colors cursor-pointer"
          >
            RSVP
          </button>
          <button
            onClick={() => scrollTo('wishes-section')}
            className="kayal-nav-link font-sans text-xs tracking-[0.18em] uppercase text-[#5C5148] hover:text-[#2A4D45] transition-colors cursor-pointer"
          >
            Guest Book
          </button>
        </div>

        {/* Right Corner Poetic Quote */}
        <div className="kayal-corner-quote text-right hidden sm:block">
          <p className="font-sans text-[10px] tracking-[0.25em] text-[#8A7E75] leading-relaxed uppercase whitespace-pre-line font-medium">
            {topCornerQuote || "TWO SOULS\nA BRIGHTER\nTOMORROW"}
          </p>
        </div>
      </nav>

      {/* Main Names Container */}
      <div className="kayal-names-container max-w-5xl mx-auto text-center pt-8 sm:pt-12 pb-6 relative z-15 px-4">
        {/* Eyebrow Pill Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-[#FAF7F0]/90 border border-[#9E7D47]/30 shadow-xs backdrop-blur-xs mb-3">
          <Sparkles size={12} className="text-[#9E7D47]" />
          <span className="text-[11px] sm:text-xs tracking-[0.3em] font-sans font-semibold uppercase text-[#5C5148]">
            {heroEyebrow || "THE WEDDING CELEBRATION OF"}
          </span>
          <Sparkles size={12} className="text-[#9E7D47]" />
        </div>

        {/* Subtitle */}
        {heroSubtitle && (
          <p className="text-[10px] sm:text-xs tracking-[0.35em] font-sans uppercase text-[#8A7E75] text-center font-medium mt-1 mb-3">
            {heroSubtitle}
          </p>
        )}

        {/* Couple Names */}
        <div className="my-3 flex items-center justify-center">
          {useMalayalamInHero ? (
            <h1 className="kayal-couple-names-malayalam font-malayalam text-4xl sm:text-6xl md:text-7xl text-[#2C241E] font-medium flex items-center justify-center gap-3">
              <TypewriterText text={malayalamGroom} delay={250} speed={80} />
              <span className="kayal-heart-flourish text-[#9E7D47] font-normal text-3xl sm:text-5xl md:text-6xl">
                {malayalamConnector || '♡'}
              </span>
              <TypewriterText text={malayalamBride} delay={850} speed={80} />
            </h1>
          ) : (
            <h1 className="kayal-couple-names-english text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] font-serif text-[#2C241E] font-medium tracking-[0.03em] flex items-center justify-center gap-2 sm:gap-4 leading-tight">
              <TypewriterText text={groomName} delay={250} speed={75} />
              <span className="kayal-heart-flourish text-[#9E7D47] font-normal text-4xl sm:text-5xl md:text-6xl lg:text-7xl mx-1 sm:mx-3">
                ♡
              </span>
              <TypewriterText text={brideName} delay={850} speed={75} />
            </h1>
          )}
        </div>

        {/* Date with increased font size, bold weight, and elegant accent rules */}
        <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4">
          <div className="w-12 sm:w-24 h-[2px] bg-gradient-to-r from-transparent to-[#9E7D47]/75" />
          <p className="kayal-wedding-date font-serif tracking-[0.25em] md:tracking-[0.35em] text-[#2C241E] text-base sm:text-xl md:text-2xl uppercase font-bold text-shadow-sm">
            <TypewriterText text={date} delay={1400} speed={65} />
          </p>
          <div className="w-12 sm:w-24 h-[2px] bg-gradient-to-l from-transparent to-[#9E7D47]/75" />
        </div>
      </div>

      {/* Full-Width Kerala Backwaters Artwork Painting */}
      <div className="kayal-hero-artwork-wrapper relative w-full mt-6 overflow-hidden z-5">
        {/* Animated mist drift effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent kayal-mist-animated pointer-events-none z-10" />

        {/* Soft top gradient dissolve so the painting blends seamlessly into the cream background */}
        <div className="absolute top-0 inset-x-0 h-20 sm:h-28 bg-gradient-to-b from-[#FAF7F0] via-[#FAF7F0]/60 to-transparent pointer-events-none z-10" />

        {/* Soft bottom gradient dissolve so the water reflection seamlessly melts into the next section */}
        <div className="absolute bottom-0 inset-x-0 h-28 sm:h-44 bg-gradient-to-t from-[#FAF7F0] via-[#FAF7F0]/80 to-transparent pointer-events-none z-10" />

        {/* Landscape Painting with watercolor feathered alpha mask */}
        <img
          src={getAssetUrl('/kayal/hero_landscape.png')}
          alt="Kerala backwaters watercolor painting with wedding procession"
          className="w-full h-auto min-h-[320px] max-h-[660px] object-cover object-bottom block"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 78%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 78%, transparent 100%)'
          }}
        />
      </div>
    </section>
  );
};
