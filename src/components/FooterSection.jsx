import React from 'react';
import { Heart } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export const FooterSection = ({ data }) => {
  const {
    footerQuote,
    groomName,
    brideName,
    malayalamGroom,
    malayalamBride,
    malayalamConnector
  } = data;

  return (
    <footer className="kayal-footer relative pt-16 pb-20 px-4 sm:px-6 md:px-12 bg-[#FAF7F0] text-center overflow-hidden border-t border-[#5C5148]/15">
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Lotus footer decorative art */}
        <div className="kayal-lotus-footer-art w-44 sm:w-56 mx-auto mb-6 opacity-90 hover:opacity-100 transition-opacity">
          <img
            src={getAssetUrl('/kayal/lotus_footer.png')}
            alt="Lotus Flower Ornament"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Malayalam blessing */}
        <div className="font-malayalam text-xl sm:text-2xl text-[#2A4D45] font-semibold mb-2">
          {malayalamGroom} {malayalamConnector || '♡'} {malayalamBride}
        </div>

        {/* English Names */}
        <h3 className="font-serif text-3xl sm:text-4xl text-[#2C241E] font-normal tracking-wide mb-3">
          {groomName} & {brideName}
        </h3>

        {/* Tagline / quote */}
        {footerQuote && (
          <p className="font-serif italic text-xs sm:text-sm text-[#9E7D47] tracking-[0.25em] uppercase font-medium max-w-lg mx-auto mb-6">
            {footerQuote}
          </p>
        )}

        <div className="w-12 h-0.5 bg-[#9E7D47]/30 mx-auto mb-6" />

        <p className="font-sans text-[11px] text-[#8A7E75] tracking-wider uppercase flex items-center justify-center gap-1.5">
          <span>Created with</span>
          <Heart size={11} className="fill-[#9E7D47] text-[#9E7D47]" />
          <span>for our wedding celebration</span>
        </p>
      </div>
    </footer>
  );
};

