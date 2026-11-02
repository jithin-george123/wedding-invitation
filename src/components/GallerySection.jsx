import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GALLERY_ITEMS_CONFIG } from '../constants';
import { getAssetUrl } from '../utils/assets';

export const GallerySection = ({ data }) => {
  const {
    galleryTitle,
    gallerySubtitle,
    galleryTagline,
    images = {},
    galleryRatio = 'portrait',
    galleryFocus = 'faces'
  } = data;

  const [activeIdx, setActiveIdx] = useState(null);

  const galleryList = GALLERY_ITEMS_CONFIG.map((item, idx) => ({
    ...item,
    src: getAssetUrl(images[item.key] || `/wedding/photos/photo${idx + 2}.jpg`)
  }));

  const openLightbox = (index) => setActiveIdx(index);
  const closeLightbox = () => setActiveIdx(null);

  const prevImage = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : galleryList.length - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev < galleryList.length - 1 ? prev + 1 : 0));
  };

  const getRatioClass = () => {
    switch (galleryRatio) {
      case 'tall': // 2:3 - 100% full uncropped vertical photo
        return 'aspect-[2/3]';
      case 'soft': // 4:5 - classic magazine portrait
        return 'aspect-[4/5]';
      case 'square': // 1:1
        return 'aspect-square';
      case 'contain':
        return 'aspect-[3/4]';
      case 'portrait': // 3:4 - default (shows ~90% of entire portrait)
      default:
        return 'aspect-[3/4]';
    }
  };

  const getFocusClass = () => {
    switch (galleryFocus) {
      case 'top':
        return 'object-top';
      case 'center':
        return 'object-center';
      case 'faces':
      default:
        return 'object-[center_18%]';
    }
  };

  const ratioOptions = [
    { id: 'portrait', label: '3:4 Portrait', desc: 'Shows 90% photo, ideal balance' },
    { id: 'tall', label: '2:3 Full Frame', desc: 'Shows 100% full vertical photo' },
    { id: 'soft', label: '4:5 Soft Frame', desc: 'Classic magazine portrait' },
    { id: 'contain', label: 'Uncropped Fit', desc: 'Full image with soft aura' },
  ];

  return (
    <section id="gallery-section" className="kayal-gallery-section relative py-20 px-4 sm:px-6 md:px-12 bg-[#FAF7F0] overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 sm:mb-12 relative">
          <p className="kayal-eyebrow text-xs tracking-[0.25em] text-[#2A4D45] font-sans font-semibold block mb-2">
            {gallerySubtitle}
          </p>
          <h2 className="kayal-script text-4xl sm:text-5xl md:text-6xl text-[#2C241E] mb-2 font-normal">
            {galleryTitle}
          </h2>
          {galleryTagline && (
            <p className="font-serif text-xs md:text-sm text-[#9E7D47] tracking-[0.2em] uppercase mt-1">
              {galleryTagline}
            </p>
          )}
          <div className="w-16 h-0.5 bg-[#9E7D47]/40 mx-auto mt-3" />
        </div>

        {/* 5-Photo Editorial Grid Optimized for Portrait Photos */}
        <div className="grid grid-cols-12 gap-4 sm:gap-6">
          {galleryList.map((item, index) => (
            <div
              key={item.key}
              onClick={() => openLightbox(index)}
              className={`kayal-gallery-card group relative rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer shadow-[0_12px_35px_-12px_rgba(42,77,69,0.16)] border border-[#C5A880]/35 bg-[#FCFAF7] transition-all hover:shadow-[0_20px_45px_-10px_rgba(42,77,69,0.22)] ${item.gridClass} ${getRatioClass()}`}
            >
              {galleryRatio === 'contain' ? (
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-[#2C241E]/5">
                  <img
                    src={item.src}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover blur-xl opacity-25 scale-110 pointer-events-none"
                  />
                  <img
                    src={item.src}
                    alt={item.label}
                    className="relative z-10 max-w-full max-h-full object-contain p-2 transform group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  />
                </div>
              ) : (
                <img
                  src={item.src}
                  alt={item.label}
                  className={`w-full h-full object-cover ${getFocusClass()} transform group-hover:scale-105 transition-transform duration-700 ease-out`}
                />
              )}

              {/* Hover overlay with label */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-6 text-white pointer-events-none">
                <span className="text-[10px] uppercase font-sans tracking-widest text-[#C4A46E] font-medium">
                  {item.subtitle}
                </span>
                <h4 className="font-serif text-lg sm:text-xl font-medium tracking-wide">
                  {item.label}
                </h4>
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                  <Maximize2 size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeIdx !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in"
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer z-50"
            title="Close"
          >
            <X size={24} />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-8 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer z-50"
            title="Previous"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-8 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer z-50"
            title="Next"
          >
            <ChevronRight size={24} />
          </button>

          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
          >
            <img
              src={galleryList[activeIdx].src}
              alt={galleryList[activeIdx].label}
              className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
            />
            <div className="text-center mt-4 text-white">
              <h3 className="font-serif text-xl sm:text-2xl font-light">
                {galleryList[activeIdx].label}
              </h3>
              <p className="font-sans text-xs tracking-wider text-[#C4A46E] uppercase mt-1">
                {galleryList[activeIdx].subtitle}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
