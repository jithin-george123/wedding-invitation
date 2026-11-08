import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, Compass, Church, PartyPopper } from 'lucide-react';

export const VenueSection = ({ data }) => {
  const {
    venueName = "DAFFODILS Convention centre",
    venueLocation = "Kozhikode, Kerala",
    venueDescription
  } = data;

  const [churchMapProvider, setChurchMapProvider] = useState('google');
  const [receptionMapProvider, setReceptionMapProvider] = useState('google');

  // Venue 1: St. Francis Church, Perambra
  const church = {
    name: "St. Francis Church",
    tag: "Wedding Holy Qurbana · 10:30 AM",
    location: "Perambra, Kozhikode, Kerala",
    address: "HQ27+R4 Perambra, Kozhikode District, Kerala 673525",
    lat: 11.5521,
    lng: 75.7628,
    googleEmbedUrl: "https://maps.google.com/maps?q=11.5521,75.7628+(St.+Francis+Church+Perambra)&t=&z=15&ie=UTF8&iwloc=B&output=embed",
    osmEmbedUrl: "https://www.openstreetmap.org/export/embed.html?bbox=75.7478%2C11.5371%2C75.7778%2C11.5671&layer=mapnik&marker=11.5521%2C75.7628",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=11.5521,75.7628",
    mapsSearchUrl: "https://www.google.com/maps/search/?api=1&query=St.+Francis+of+Assisi+Church,+Perambra,+Kerala"
  };

  // Venue 2: DAFFODILS Convention Centre
  const reception = {
    name: venueName,
    tag: "Wedding Feast & Reception · 12:00 PM",
    location: venueLocation,
    address: "HQ5X+F8W River Bridge, Perambra, Kozhikode, Kerala 673525",
    lat: 11.55937,
    lng: 75.79857,
    googleEmbedUrl: "https://maps.google.com/maps?q=11.55937,75.79857+(DAFFODILS+Convention+Centre)&t=&z=15&ie=UTF8&iwloc=B&output=embed",
    osmEmbedUrl: "https://www.openstreetmap.org/export/embed.html?bbox=75.78357%2C11.54437%2C75.81357%2C11.57437&layer=mapnik&marker=11.55937%2C75.79857",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=11.55937,75.79857",
    mapsSearchUrl: "https://www.google.com/maps/search/?api=1&query=11.55937,75.79857"
  };

  return (
    <section id="venue-section" className="kayal-venue-section relative py-24 px-4 sm:px-6 md:px-12 bg-[#FAF7F0] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="kayal-eyebrow text-xs tracking-[0.25em] text-[#2A4D45] font-sans font-semibold block mb-2">
            CEREMONY & RECEPTION VENUES
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2C241E] font-medium tracking-[0.03em] mb-2 leading-tight">
            Venues & Directions
          </h2>
          <p className="font-sans text-xs sm:text-sm tracking-wider text-[#9E7D47] uppercase font-semibold">
            Perambra, Kozhikode, Kerala
          </p>
          <div className="w-16 h-0.5 bg-[#9E7D47]/40 mx-auto mt-3" />
        </div>

        {/* Side-by-side Venue Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card 1: St. Francis Church */}
          <div className="bg-[#FCFAF7] rounded-3xl p-6 sm:p-8 border border-[#C5A880]/30 shadow-[0_15px_40px_-15px_rgba(42,77,69,0.12)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-sans font-semibold tracking-wider uppercase bg-[#2A4D45]/10 text-[#2A4D45]">
                  {church.tag}
                </span>
                <span className="font-sans text-xs text-[#9E7D47] font-semibold tracking-wider uppercase">
                  Church Ceremony
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#2C241E] font-medium mb-1">
                {church.name}
              </h3>
              <p className="font-sans text-xs text-[#5C5148] font-medium mb-4">
                {church.location}
              </p>

              {/* Map Frame */}
              <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-[#5C5148]/20 shadow-inner group bg-stone-100 mb-4">
                {/* Floating Badge */}
                <div className="absolute top-3 left-3 z-20 bg-white/95 backdrop-blur-md rounded-2xl py-1.5 px-3 border border-[#5C5148]/15 shadow-md flex items-center gap-2 max-w-[75%] pointer-events-auto">
                  <div className="w-7 h-7 rounded-full bg-[#2A4D45] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin size={14} />
                  </div>
                  <div className="text-left min-w-0">
                    <div className="font-serif font-bold text-xs text-[#2C241E] truncate">
                      {church.name}
                    </div>
                    <div className="font-sans text-[10px] text-[#5C5148] truncate">
                      Perambra, Kozhikode
                    </div>
                  </div>
                </div>

                {/* Switcher */}
                <div className="absolute top-3 right-3 z-20 flex items-center bg-white/90 backdrop-blur-md rounded-full p-0.5 border border-[#5C5148]/20 shadow-md">
                  <button
                    type="button"
                    onClick={() => setChurchMapProvider('google')}
                    className={`py-1 px-2 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      churchMapProvider === 'google'
                        ? 'bg-[#2A4D45] text-white shadow-xs'
                        : 'text-[#5C5148] hover:text-[#2C241E]'
                    }`}
                  >
                    Google
                  </button>
                  <button
                    type="button"
                    onClick={() => setChurchMapProvider('osm')}
                    className={`py-1 px-2 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      churchMapProvider === 'osm'
                        ? 'bg-[#2A4D45] text-white shadow-xs'
                        : 'text-[#5C5148] hover:text-[#2C241E]'
                    }`}
                  >
                    OpenMap
                  </button>
                </div>

                <iframe
                  key={churchMapProvider}
                  title="St Francis Church Location Map"
                  src={churchMapProvider === 'google' ? church.googleEmbedUrl : church.osmEmbedUrl}
                  className="w-full h-full border-0 filter contrast-[1.02] opacity-95 hover:opacity-100 transition-opacity"
                  loading="lazy"
                  allowFullScreen
                />
              </div>

              <div className="flex items-start gap-2.5 text-xs text-[#5C5148] font-sans mb-4">
                <Compass size={15} className="text-[#2A4D45] mt-0.5 shrink-0" />
                <span>{church.address}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 pt-4 border-t border-[#5C5148]/15">
              <a
                href={church.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-full bg-[#2A4D45] text-white hover:bg-[#1f3a34] transition-all flex items-center justify-center gap-1.5 text-xs font-sans font-semibold tracking-wider uppercase shadow-sm cursor-pointer hover:scale-[1.02]"
              >
                <Navigation size={13} />
                Get Directions
              </a>
              <a
                href={church.mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3.5 rounded-full border border-[#5C5148]/25 bg-white text-[#2C241E] hover:border-[#2A4D45] hover:text-[#2A4D45] transition-all flex items-center justify-center gap-1.5 text-xs font-sans font-semibold tracking-wider uppercase shadow-xs cursor-pointer hover:scale-[1.02]"
              >
                <span>View Map</span>
                <ExternalLink size={12} className="opacity-70" />
              </a>
            </div>
          </div>

          {/* Card 2: DAFFODILS Convention Centre */}
          <div className="bg-[#FCFAF7] rounded-3xl p-6 sm:p-8 border border-[#C5A880]/30 shadow-[0_15px_40px_-15px_rgba(42,77,69,0.12)] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-sans font-semibold tracking-wider uppercase bg-[#9E7D47]/15 text-[#9E7D47]">
                  {reception.tag}
                </span>
                <span className="font-sans text-xs text-[#2A4D45] font-semibold tracking-wider uppercase">
                  Feast & Reception
                </span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-[#2C241E] font-medium mb-1">
                {reception.name}
              </h3>
              <p className="font-sans text-xs text-[#5C5148] font-medium mb-4">
                {reception.location}
              </p>

              {/* Map Frame */}
              <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border border-[#5C5148]/20 shadow-inner group bg-stone-100 mb-4">
                {/* Floating Badge */}
                <div className="absolute top-3 left-3 z-20 bg-white/95 backdrop-blur-md rounded-2xl py-1.5 px-3 border border-[#5C5148]/15 shadow-md flex items-center gap-2 max-w-[75%] pointer-events-auto">
                  <div className="w-7 h-7 rounded-full bg-[#9E7D47] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin size={14} />
                  </div>
                  <div className="text-left min-w-0">
                    <div className="font-serif font-bold text-xs text-[#2C241E] truncate">
                      {reception.name}
                    </div>
                    <div className="font-sans text-[10px] text-[#5C5148] truncate">
                      River Bridge, Perambra
                    </div>
                  </div>
                </div>

                {/* Switcher */}
                <div className="absolute top-3 right-3 z-20 flex items-center bg-white/90 backdrop-blur-md rounded-full p-0.5 border border-[#5C5148]/20 shadow-md">
                  <button
                    type="button"
                    onClick={() => setReceptionMapProvider('google')}
                    className={`py-1 px-2 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      receptionMapProvider === 'google'
                        ? 'bg-[#9E7D47] text-white shadow-xs'
                        : 'text-[#5C5148] hover:text-[#2C241E]'
                    }`}
                  >
                    Google
                  </button>
                  <button
                    type="button"
                    onClick={() => setReceptionMapProvider('osm')}
                    className={`py-1 px-2 rounded-full text-[10px] font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                      receptionMapProvider === 'osm'
                        ? 'bg-[#9E7D47] text-white shadow-xs'
                        : 'text-[#5C5148] hover:text-[#2C241E]'
                    }`}
                  >
                    OpenMap
                  </button>
                </div>

                <iframe
                  key={receptionMapProvider}
                  title="Daffodils Convention Centre Location Map"
                  src={receptionMapProvider === 'google' ? reception.googleEmbedUrl : reception.osmEmbedUrl}
                  className="w-full h-full border-0 filter contrast-[1.02] opacity-95 hover:opacity-100 transition-opacity"
                  loading="lazy"
                  allowFullScreen
                />
              </div>

              <div className="flex items-start gap-2.5 text-xs text-[#5C5148] font-sans mb-4">
                <Compass size={15} className="text-[#9E7D47] mt-0.5 shrink-0" />
                <span>{reception.address}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 pt-4 border-t border-[#5C5148]/15">
              <a
                href={reception.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-full bg-[#2A4D45] text-white hover:bg-[#1f3a34] transition-all flex items-center justify-center gap-1.5 text-xs font-sans font-semibold tracking-wider uppercase shadow-sm cursor-pointer hover:scale-[1.02]"
              >
                <Navigation size={13} />
                Get Directions
              </a>
              <a
                href={reception.mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2.5 px-3.5 rounded-full border border-[#5C5148]/25 bg-white text-[#2C241E] hover:border-[#2A4D45] hover:text-[#2A4D45] transition-all flex items-center justify-center gap-1.5 text-xs font-sans font-semibold tracking-wider uppercase shadow-xs cursor-pointer hover:scale-[1.02]"
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
