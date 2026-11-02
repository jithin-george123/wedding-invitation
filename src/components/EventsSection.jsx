import React from 'react';
import { Calendar, Clock, MapPin, Navigation } from 'lucide-react';

export const EventsSection = ({ data }) => {
  const {
    eventsTitle,
    eventsSubtitle,
    eventsMalayalam,
    events = [],
    groomName,
    brideName
  } = data;

  if (!events || events.length === 0) return null;

  const handleCalendar = (evt) => {
    const title = `${evt.title} — ${groomName} & ${brideName}`;
    const details = `${evt.subtitle || ''}\n${evt.description || ''}\nVenue: ${evt.venue || ''}, ${evt.location || ''}`;
    const location = `${evt.venue || ''}, ${evt.location || ''}`;
    
    let startIso = "20261002T050000Z";
    let endIso = "20261002T080000Z";
    if (evt.isoDate) {
      try {
        const d = new Date(evt.isoDate);
        const pad = (n) => String(n).padStart(2, '0');
        const startStr = `${d.getUTCFullYear()}${pad(d.getUTCMonth()+1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}00Z`;
        const endD = new Date(d.getTime() + 3 * 60 * 60 * 1000);
        const endStr = `${endD.getUTCFullYear()}${pad(endD.getUTCMonth()+1)}${pad(endD.getUTCDate())}T${pad(endD.getUTCHours())}${pad(endD.getUTCMinutes())}00Z`;
        startIso = startStr;
        endIso = endStr;
      } catch (err) {}
    }

    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startIso}/${endIso}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
    window.open(gCalUrl, '_blank');
  };

  return (
    <section className="kayal-events-section relative py-24 px-4 sm:px-6 md:px-12 bg-[#FAF7F0] overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          {eventsMalayalam && (
            <p className="font-malayalam text-xs sm:text-sm text-[#9E7D47] tracking-widest font-semibold uppercase mb-1">
              {eventsMalayalam}
            </p>
          )}
          <p className="kayal-eyebrow text-xs tracking-[0.25em] text-[#2A4D45] font-sans font-semibold block mb-2">
            {eventsSubtitle}
          </p>
          <h2 className="kayal-script text-4xl sm:text-5xl md:text-6xl text-[#2C241E] mb-2 font-normal">
            {eventsTitle}
          </h2>
          <div className="w-16 h-0.5 bg-[#9E7D47]/40 mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.map((evt) => (
            <div
              key={evt.id}
              className="kayal-event-card bg-[#FCFAF7] rounded-3xl p-6 sm:p-8 border border-[#C5A880]/30 shadow-[0_12px_35px_-10px_rgba(44,36,30,0.08)] flex flex-col justify-between hover:shadow-[0_20px_45px_-10px_rgba(44,36,30,0.14)] hover:border-[#2A4D45]/30 transition-all duration-500 relative overflow-hidden group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="kayal-event-badge inline-block px-3 py-1 rounded-full text-[10px] font-sans font-semibold tracking-wider uppercase bg-[#2A4D45]/10 text-[#2A4D45]">
                    {evt.time || 'Ceremony'}
                  </span>
                  <span className="font-serif text-xs text-[#8A7E75] tracking-widest uppercase">
                    {evt.date}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#2C241E] font-medium mb-1">
                  {evt.title}
                </h3>
                {evt.subtitle && (
                  <p className="font-sans text-xs tracking-wider text-[#9E7D47] uppercase font-semibold mb-4">
                    {evt.subtitle}
                  </p>
                )}

                <div className="space-y-2.5 my-4 pt-4 border-t border-[#5C5148]/10 text-xs text-[#5C5148] font-sans">
                  <div className="flex items-start gap-2.5">
                    <Clock size={14} className="text-[#9E7D47] mt-0.5 shrink-0" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPin size={14} className="text-[#2A4D45] mt-0.5 shrink-0" />
                    <span>{evt.venue}{evt.location ? `, ${evt.location}` : ''}</span>
                  </div>
                </div>

                {evt.description && (
                  <p className="font-serif text-sm text-[#5C5148] italic leading-relaxed mt-3">
                    {evt.description}
                  </p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-[#5C5148]/10 flex items-center gap-3">
                <button
                  onClick={() => handleCalendar(evt)}
                  className="kayal-btn-cal flex-1 py-2 px-3 rounded-full text-xs font-sans font-semibold tracking-wider uppercase bg-[#2A4D45] text-white hover:bg-[#1f3a34] transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <Calendar size={13} />
                  Add to Calendar
                </button>
                <a
                  href={evt.mapUrl || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent((evt.venue || '') + ' ' + (evt.location || ''))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="kayal-btn-map p-2 rounded-full border border-[#5C5148]/20 bg-[#FAF7F0] text-[#2C241E] hover:bg-white hover:border-[#2A4D45]/40 transition-all flex items-center justify-center cursor-pointer"
                  title="View on Google Maps"
                >
                  <Navigation size={14} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

