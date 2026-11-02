import React from 'react';
import { Calendar, Clock, MapPin, Navigation } from 'lucide-react';
import { getAssetUrl } from '../utils/assets';

export const DetailsSection = ({ data }) => {
  const {
    date,
    dateDay,
    dateIso,
    muhurthamTime,
    venueName,
    venueLocation,
    venueMapUrl,
    groomName,
    brideName
  } = data;

  const handleCalendarAdd = (e) => {
    e.preventDefault();
    const title = `${groomName} & ${brideName} Wedding Ceremony`;
    const details = `Sacred Wedding Ceremony of ${groomName} & ${brideName} at ${venueName}, ${venueLocation}. Muhurtham: ${muhurthamTime}.`;
    const location = `${venueName}, ${venueLocation}`;
    
    let startIso = "20261002T050000Z";
    let endIso = "20261002T090000Z";
    if (dateIso) {
      try {
        const d = new Date(dateIso);
        const pad = (n) => String(n).padStart(2, '0');
        const startStr = `${d.getUTCFullYear()}${pad(d.getUTCMonth()+1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
        const endD = new Date(d.getTime() + 4 * 60 * 60 * 1000);
        const endStr = `${endD.getUTCFullYear()}${pad(endD.getUTCMonth()+1)}${pad(endD.getUTCDate())}T${pad(endD.getUTCHours())}${pad(endD.getUTCMinutes())}00Z`;
        startIso = startStr;
        endIso = endStr;
      } catch (err) {}
    }

    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startIso}/${endIso}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    window.open(gCalUrl, '_blank');
  };

  return (
    <section id="details-section" className="kayal-details-section relative py-14 px-4 sm:px-6 md:px-12 my-8">
      <div className="max-w-5xl mx-auto relative rounded-3xl overflow-hidden border border-[#C5A880]/30 shadow-[0_18px_45px_-15px_rgba(42,77,69,0.14)] bg-[#FCFAF7]">
        {/* Background artwork */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 pointer-events-none"
          style={{ backgroundImage: `url(${getAssetUrl('/kayal/details_bg.png')})` }}
        />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#5C5148]/15 text-center">
          {/* Column 1: Date & Calendar */}
          <div className="kayal-detail-col p-8 sm:p-10 flex flex-col justify-between items-center gap-3">
            <div className="kayal-detail-icon w-14 h-14 rounded-full bg-[#2A4D45]/10 text-[#2A4D45] flex items-center justify-center mb-1">
              <Calendar size={22} />
            </div>
            <p className="kayal-eyebrow text-[11px] md:text-xs text-[#8A7E75] tracking-[0.3em] uppercase">
              Wedding Date
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#2C241E] font-medium">
              {dateDay || 'Friday'}
            </h3>
            <p className="font-serif text-xl sm:text-2xl text-[#2C241E] font-bold tracking-widest uppercase my-0.5">
              {date}
            </p>
            <button
              onClick={handleCalendarAdd}
              className="mt-2 py-2 px-5 rounded-full text-xs font-sans font-semibold tracking-wider uppercase bg-[#2A4D45] text-white hover:bg-[#1f3a34] transition-all flex items-center gap-1.5 shadow-sm cursor-pointer hover:scale-105"
            >
              Add to Calendar
            </button>
          </div>

          {/* Column 2: Auspicious Muhurtham */}
          <div className="kayal-detail-col kayal-detail-col-muhurtham p-8 sm:p-10 bg-[#FAF7F0]/60 flex flex-col justify-between items-center gap-3">
            <div className="kayal-detail-icon w-14 h-14 rounded-full bg-[#9E7D47]/15 text-[#9E7D47] flex items-center justify-center mb-1">
              <Clock size={22} />
            </div>
            <p className="kayal-eyebrow text-[11px] md:text-xs text-[#9E7D47] tracking-[0.3em] uppercase font-semibold">
              Auspicious Muhurtham
            </p>
            <h3 className="font-serif text-3xl sm:text-4xl text-[#2A4D45] font-semibold my-1">
              {muhurthamTime}
            </h3>
            <p className="text-xs sm:text-sm text-[#5C5148] italic font-serif">
              Auspicious time for the sacred Mangalyadharanam
            </p>
          </div>

          {/* Column 3: Venue & Map */}
          <div className="kayal-detail-col p-8 sm:p-10 flex flex-col justify-between items-center gap-3">
            <div className="kayal-detail-icon w-14 h-14 rounded-full bg-[#2A4D45]/10 text-[#2A4D45] flex items-center justify-center mb-1">
              <MapPin size={22} />
            </div>
            <p className="kayal-eyebrow text-[11px] md:text-xs text-[#8A7E75] tracking-[0.3em] uppercase">
              Ceremony Venue
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#2C241E] font-medium">
              {venueName}
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#5C5148]">
              {venueLocation}
            </p>
            <a
              href={venueMapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venueName + ', ' + venueLocation)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 py-2 px-5 rounded-full text-xs font-sans font-semibold tracking-wider uppercase border border-[#5C5148]/30 bg-white text-[#2C241E] hover:border-[#2A4D45] hover:text-[#2A4D45] transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105"
            >
              <Navigation size={13} />
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

