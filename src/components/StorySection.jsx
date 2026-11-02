import React from 'react';
import { getAssetUrl } from '../utils/assets';

export const StorySection = ({ data }) => {
  const {
    storyTitle,
    storySubtitle,
    storyParagraph1,
    storyParagraph2,
    storyQuote,
    images
  } = data;

  const rawImage = images?.coupleStory || "/wedding/photos/photo1.jpg";
  const storyImage = getAssetUrl(rawImage);

  return (
    <section id="story-section" className="kayal-story-section relative pt-12 sm:pt-16 pb-24 px-4 sm:px-6 md:px-12 bg-[#FAF7F0] overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <p className="kayal-eyebrow text-xs sm:text-sm tracking-[0.25em] text-[#2A4D45] font-sans font-semibold block mb-2">
            {storySubtitle || "DIFFERENT PATHS, A SHARED HORIZON"}
          </p>
          <h2 className="kayal-script text-5xl sm:text-6xl md:text-7xl text-[#2C241E] mb-2 font-normal">
            {storyTitle || "Our Story"}
          </h2>
          <div className="w-20 h-0.5 bg-[#9E7D47]/40 mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          {/* Couple Image with rounded luxury portrait frame */}
          <div className="md:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-sm sm:max-w-md rounded-[32px] overflow-hidden p-2.5 sm:p-3 bg-white border border-[#C5A880]/40 shadow-[0_22px_55px_-15px_rgba(42,77,69,0.18)]">
              <img
                src={storyImage}
                alt="Couple Story"
                className="w-full h-auto aspect-[3/4] sm:aspect-[4/5] object-cover rounded-[24px] transform group-hover:scale-[1.02] transition-transform duration-700 block"
              />
              <div className="absolute inset-0 rounded-[24px] ring-1 ring-inset ring-black/5 pointer-events-none" />
            </div>
          </div>

          {/* Story Narrative & Quote */}
          <div className="md:col-span-7 text-left space-y-6 sm:space-y-8">
            <p className="font-serif text-xl sm:text-2xl text-[#2C241E] leading-relaxed font-light">
              {storyParagraph1}
            </p>

            {storyParagraph2 && (
              <p className="font-serif text-lg sm:text-xl text-[#5C5148] leading-relaxed italic">
                {storyParagraph2}
              </p>
            )}

            {storyQuote && (
              <div className="mt-8 pt-6 border-t border-[#5C5148]/15">
                <blockquote className="font-serif text-2xl sm:text-3xl text-[#2A4D45] italic font-normal tracking-wide">
                  {storyQuote}
                </blockquote>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

