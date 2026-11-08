import React, { useState, useEffect } from 'react';
import { DEFAULT_WEDDING_DATA } from './constants';
import { HeroSection } from './components/HeroSection';
import { DetailsSection } from './components/DetailsSection';
import { StorySection } from './components/StorySection';
import { EventsSection } from './components/EventsSection';
import { VenueSection } from './components/VenueSection';
import { GallerySection } from './components/GallerySection';
import { VideoSection } from './components/VideoSection';
import { RsvpSection } from './components/RsvpSection';
import { FooterSection } from './components/FooterSection';
import { MusicPlayer } from './components/MusicPlayer';
import { AutoscrollEngine } from './components/AutoscrollEngine';
import { getAssetUrl } from './utils/assets';

export function App() {
  // Query parameters: preview=true, autoscroll=true
  const searchParams = new URLSearchParams(window.location.search);
  const isAutoscroll = searchParams.get('autoscroll') === 'true';

  // Load wedding data from disk (/api/load) or defaults
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem('kayal_wedding_custom_data');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...DEFAULT_WEDDING_DATA, ...parsed };
      }
    } catch (e) {}
    return DEFAULT_WEDDING_DATA;
  });

  // Always sync with saved custom_wedding_data.json on disk
  useEffect(() => {
    fetch('/api/load')
      .then(res => res.ok ? res.json() : null)
      .then(serverData => {
        if (serverData && (serverData.groomName || serverData.date)) {
          setData(prev => ({ ...DEFAULT_WEDDING_DATA, ...prev, ...serverData }));
          try {
            localStorage.setItem('kayal_wedding_custom_data', JSON.stringify({ ...DEFAULT_WEDDING_DATA, ...serverData }));
          } catch (e) {}
        }
      })
      .catch(() => {});
  }, []);

  // Load RSVPs
  const [rsvps, setRsvps] = useState(() => {
    try {
      const saved = localStorage.getItem('kayal_wedding_rsvps');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [];
  });

  const handleRsvpSubmit = (newRsvp) => {
    setRsvps((prev) => [newRsvp, ...prev]);
  };

  return (
    <div className="kayal-wedding-wrapper min-h-screen bg-[#FAF7F0] text-[#2C241E] font-serif relative">
      {/* Background paper texture overlay */}
      <div className="kayal-paper-texture" />

      {/* Jasmine corner floral element */}
      <img
        src={getAssetUrl('/kayal/jasmine_corner.png')}
        alt="Jasmine Flowers Decoration"
        className="kayal-corner-jasmine pointer-events-none z-20"
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <HeroSection data={data} />

        {data.sections?.story !== false && (
          <StorySection data={data} />
        )}

        <DetailsSection data={data} />

        {data.sections?.events !== false && (
          <EventsSection data={data} />
        )}

        {data.sections?.venue !== false && (
          <VenueSection data={data} />
        )}

        {data.sections?.gallery !== false && (
          <GallerySection data={data} />
        )}

        {data.sections?.videos !== false && (
          <VideoSection data={data} />
        )}

        {data.sections?.rsvp !== false && (
          <RsvpSection
            data={data}
            onRsvpSubmit={handleRsvpSubmit}
          />
        )}

        <FooterSection data={data} />
      </main>

      {/* Ambient Audio Player */}
      <MusicPlayer data={data} />

      {/* Autoscroll Feature */}
      <AutoscrollEngine initialEnabled={isAutoscroll} />
    </div>
  );
}

export default App;
