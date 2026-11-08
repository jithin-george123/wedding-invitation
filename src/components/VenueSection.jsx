import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Compass, Map } from 'lucide-react';

export const VenueSection = ({ data }) => {
  const {
    venueName = "DAFFODILS Convention centre",
    venueLocation = "Kozhikode, Kerala",
    venueDescription,
    venueFont = 'serif'
  } = data;

  const [mapProvider, setMapProvider] = useState('google'); // 'google' | 'osm'

  // Exact coordinates for DAFFODILS Convention Centre / Auditorium, Perambra, Kozhikode
  const lat = 11.55937;
  const lng = 75.79857;

  // Google Maps embed with exact coordinates & marker label
  const googleEmbedUrl = `https://maps.google.com/maps?q=${lat},${lng}+(DAFFODILS+Convention+Centre)&t=&z=15&ie=UTF8&iwloc=B&output=embed`;
  
  // OpenStreetMap embed fallback (100% reliable, no cookie/consent blocking)
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=75.78357%2C11.54437%2C75.81357%2C11.57437&layer=mapnik&marker=${lat}%2C${lng}`;

  // Direct turn-by-turn driving directions URL
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
  
  // Direct Google Maps search/place URL
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  const getVenueFontClass = () => {
    switch (venueFont) {
      case 'cinzel':
        return "font-['Cinzel'] tracking-[0.08em] font-semibold text-2xl sm:text-3xl md:text-4xl";
      case 'sans':
        return "font-sans tracking-[0.08em] font-medium uppercase text-2xl sm:text-3xl md:text-4xl";
      case 'script':
        return "kayal-script text-4xl sm:text-5xl md:text-6xl font-normal";
      case 'serif':
      default:
        return "font-serif text-3xl sm:text-4xl md:text-5xl font-medium tracking-[0.03em]";
    }
  };

  return (
    <section id="venue-section" className="kayal-venue-section relative py-24 px-4 sm:px-6 md:px-12 bg-[#FAF7F0] overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="kayal-eyebrow text-xs tracking-[0.25em] text-[#2A4D45] font-sans font-semibold block mb-2">
            WEDDING RECEPTION & FEAST VENUE
          </p>
          <h2 className={`${getVenueFontClass()} text-[#2C241E] mb-2 leading-tight`}>
            {venueName}
          </h2>
          <p className="font-sans text-xs tracking-wider text-[#9E7D47] uppercase font-semibold">
            {venueLocation}
          </p>
          <div className="w-16 h-0.5 bg-[#9E7D47]/40 mx-auto mt-3" />
        </div>

        <div className="bg-[#FCFAF7] rounded-3xl p-6 sm:p-10 border border-[#C5A880]/30 shadow-[0_15px_40px_-15px_rgba(42,77,69,0.12)]">
          {venueDescription && (
            <p className="font-serif text-center text-base sm:text-lg text-[#5C5148] italic max-w-2xl mx-auto mb-8 leading-relaxed">
              "{venueDescription}"
            </p>
          )}

          {/* Interactive Map Frame with Coordinates Pin */}
          <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-[#5C5148]/20 shadow-inner group bg-stone-100">
            {/* Floating Venue Pin Badge */}
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 bg-white/95 backdrop-blur-md rounded-2xl py-2 px-3 sm:px-4 border border-[#5C5148]/15 shadow-md flex items-center gap-2.5 max-w-[80%] sm:max-w-sm pointer-events-auto">
              <div className="w-8 h-8 rounded-full bg-[#2A4D45] text-white flex items-center justify-center shrink-0 shadow-sm">
                <MapPin size={16} />
              </div>
              <div className="text-left min-w-0">
                <div className="font-serif font-bold text-xs sm:text-sm text-[#2C241E] truncate">
                  {venueName}
                </div>
                <div className="font-sans text-[10px] text-[#5C5148] truncate">
                  River Bridge, Perambra, Kozhikode
                </div>
              </div>
            </div>

            {/* Provider Switcher (Google Map / OpenMap) */}
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 flex items-center bg-white/90 backdrop-blur-md rounded-full p-1 border border-[#5C5148]/20 shadow-md">
              <button
                type="button"
                onClick={() => setMapProvider('google')}
                className={`py-1 px-2.5 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  mapProvider === 'google'
                    ? 'bg-[#2A4D45] text-white shadow-xs'
                    : 'text-[#5C5148] hover:text-[#2C241E]'
                }`}
              >
                Google
              </button>
              <button
                type="button"
                onClick={() => setMapProvider('osm')}
                className={`py-1 px-2.5 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  mapProvider === 'osm'
                    ? 'bg-[#2A4D45] text-white shadow-xs'
                    : 'text-[#5C5148] hover:text-[#2C241E]'
                }`}
              >
                OpenMap
              </button>
            </div>

            <iframe
              key={mapProvider}
              title="Venue Location Map"
              src={mapProvider === 'google' ? googleEmbedUrl : osmEmbedUrl}
              className="w-full h-full border-0 filter contrast-[1.02] opacity-95 hover:opacity-100 transition-opacity"
              loading="lazy"
              allowFullScreen
            />
          </div>

          {/* Action Row */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#5C5148]/15">
            <div className="flex items-center gap-3 text-left w-full sm:w-auto">
              <div className="w-10 h-10 rounded-full bg-[#2A4D45]/10 text-[#2A4D45] flex items-center justify-center shrink-0">
                <Compass size={18} />
              </div>
              <div>
                <h4 className="font-serif text-lg text-[#2C241E] font-medium leading-tight">
                  {venueName}
                </h4>
                <p className="font-sans text-xs text-[#5C5148]">
                  HQ5X+F8W River Bridge, Perambra, Kozhikode, Kerala 673525
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none py-2.5 px-5 rounded-full bg-[#2A4D45] text-white hover:bg-[#1f3a34] transition-all flex items-center justify-center gap-2 text-xs font-sans font-semibold tracking-wider uppercase shadow-sm cursor-pointer hover:scale-105"
                title="Open turn-by-turn navigation in Google Maps app"
              >
                <Navigation size={13} />
                Get Directions
              </a>

              <a
                href={mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-4 rounded-full border border-[#5C5148]/25 bg-white text-[#2C241E] hover:border-[#2A4D45] hover:text-[#2A4D45] transition-all flex items-center justify-center gap-1.5 text-xs font-sans font-semibold tracking-wider uppercase shadow-xs cursor-pointer hover:scale-105"
                title="View place details on Google Maps"
              >
                <span>View Map</span>
                <ExternalLink size={12} className="opacity-70" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
