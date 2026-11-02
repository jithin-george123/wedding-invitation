import React, { useState } from 'react';
import {
  X,
  Save,
  RotateCcw,
  Upload,
  Image as ImageIcon,
  Calendar,
  Clock,
  MapPin,
  Heart,
  Music,
  Users,
  Video,
  FileText,
  Share2,
  Check,
  Plus,
  Trash2,
  ExternalLink,
  Download
} from 'lucide-react';
import { MUSIC_PRESETS, GALLERY_ITEMS_CONFIG } from '../constants';

export const KayalStudio = ({
  isOpen,
  onClose,
  data,
  onChange,
  onReset,
  rsvps = [],
  wishes = []
}) => {
  const [activeTab, setActiveTab] = useState('couple');
  const [copied, setCopied] = useState(false);
  const [savedToast, setSavedToast] = useState(false);

  if (!isOpen) return null;

  const handleFileUpload = (field, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64 = uploadEvent.target?.result;
      if (typeof base64 === 'string') {
        if (field.startsWith('gallery') || field === 'coupleStory') {
          onChange({
            ...data,
            images: {
              ...data.images,
              [field]: base64
            }
          });
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    try {
      localStorage.setItem('kayal_wedding_custom_data', JSON.stringify(data));
      // Save directly to disk via Vite middleware API
      fetch('/api/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      }).catch(() => {});
      setSavedToast(true);
      setTimeout(() => setSavedToast(false), 2500);
    } catch (e) {
      alert('Changes saved temporarily.');
    }
  };

  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.groomName}_and_${data.brideName}_wedding_invite.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const imported = JSON.parse(evt.target?.result);
        onChange(imported);
        alert('Invite configuration imported successfully!');
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const addEvent = () => {
    const newEvt = {
      id: `event_${Date.now()}`,
      title: "New Festive Celebration",
      subtitle: "Celebration Gathering",
      date: data.date,
      time: "06:00 PM Onwards",
      venue: data.venueName,
      location: data.venueLocation,
      mapUrl: data.venueMapUrl,
      description: "Join us with your family for an evening of warmth and memories.",
      isoDate: data.dateIso
    };
    onChange({
      ...data,
      events: [...(data.events || []), newEvt],
      sections: { ...data.sections, events: true }
    });
  };

  const removeEvent = (id) => {
    onChange({
      ...data,
      events: data.events.filter(e => e.id !== id)
    });
  };

  const updateEvent = (id, field, value) => {
    onChange({
      ...data,
      events: data.events.map(e => e.id === id ? { ...e, [field]: value } : e)
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-fade-in">
      {/* Toast Notification */}
      {savedToast && (
        <div className="fixed top-6 right-6 z-50 py-2.5 px-5 rounded-2xl bg-[#2A4D45] text-white shadow-xl flex items-center gap-2 text-xs font-sans tracking-wide">
          <Check size={16} />
          Changes saved permanently to disk & browser!
        </div>
      )}

      {/* Main Drawer Panel */}
      <div className="w-full max-w-2xl bg-[#FCFAF7] h-full flex flex-col shadow-2xl border-l border-[#C5A880]/40 overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#5C5148]/15 flex items-center justify-between bg-[#FAF7F0]">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#9E7D47]" />
              <h3 className="font-serif text-2xl text-[#2C241E] font-medium leading-tight">
                Kayal Customizer Studio
              </h3>
            </div>
            <p className="font-sans text-xs text-[#8A7E75] mt-1">
              Edit photos, names, date, venue, music & celebration events
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSave}
              className="py-2 px-3.5 rounded-full bg-[#2A4D45] text-white hover:bg-[#1f3a34] text-xs font-sans font-semibold tracking-wider uppercase transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
              title="Save Changes to Disk"
            >
              <Save size={13} />
              Save
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-black/5 text-[#5C5148] transition-colors cursor-pointer"
              title="Close Studio"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Studio Navigation Tabs */}
        <div className="flex items-center gap-1 px-4 sm:px-6 py-2 border-b border-[#5C5148]/15 bg-[#FAF7F0]/60 overflow-x-auto text-xs font-sans font-medium">
          {[
            { id: 'couple', label: 'Names & Story', icon: Heart },
            { id: 'datetime', label: 'Date & Time', icon: Calendar },
            { id: 'venue', label: 'Venue & Map', icon: MapPin },
            { id: 'photos', label: 'Photos & Media', icon: ImageIcon },
            { id: 'events', label: 'Festivities', icon: Clock },
            { id: 'music', label: 'Soundtrack', icon: Music },
            { id: 'rsvps', label: `RSVPs (${rsvps.length})`, icon: Users },
            { id: 'export', label: 'Save / Share', icon: Share2 },
          ].map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-3 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-[#2A4D45] text-white shadow-sm font-semibold'
                    : 'text-[#5C5148] hover:bg-black/5'
                }`}
              >
                <Icon size={13} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Body Contents */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* TAB 1: COUPLE & STORY */}
          {activeTab === 'couple' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#5C5148]/15">
                <h4 className="font-serif text-lg text-[#2C241E] mb-3 font-medium">
                  English Couple Names
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-sans font-semibold tracking-wider uppercase text-[#5C5148] mb-1">
                      Groom Name
                    </label>
                    <input
                      type="text"
                      value={data.groomName}
                      onChange={(e) => onChange({ ...data, groomName: e.target.value })}
                      className="w-full py-2 px-3 rounded-xl border border-[#5C5148]/20 bg-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-sans font-semibold tracking-wider uppercase text-[#5C5148] mb-1">
                      Bride Name
                    </label>
                    <input
                      type="text"
                      value={data.brideName}
                      onChange={(e) => onChange({ ...data, brideName: e.target.value })}
                      className="w-full py-2 px-3 rounded-xl border border-[#5C5148]/20 bg-white text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#5C5148]/15">
                <h4 className="font-serif text-lg text-[#2C241E] mb-3 font-medium">
                  Malayalam Names (Hero Script)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-sans font-semibold tracking-wider uppercase text-[#5C5148] mb-1">
                      Groom in Malayalam
                    </label>
                    <input
                      type="text"
                      value={data.malayalamGroom}
                      onChange={(e) => onChange({ ...data, malayalamGroom: e.target.value })}
                      className="w-full py-2 px-3 rounded-xl border border-[#5C5148]/20 bg-white font-malayalam text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-sans font-semibold tracking-wider uppercase text-[#5C5148] mb-1">
                      Bride in Malayalam
                    </label>
                    <input
                      type="text"
                      value={data.malayalamBride}
                      onChange={(e) => onChange({ ...data, malayalamBride: e.target.value })}
                      className="w-full py-2 px-3 rounded-xl border border-[#5C5148]/20 bg-white font-malayalam text-base"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#5C5148]/15">
                <h4 className="font-serif text-lg text-[#2C241E] mb-3 font-medium">
                  Our Story Details
                </h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-sans font-semibold tracking-wider uppercase text-[#5C5148] mb-1">
                      Story Subtitle / Eyebrow
                    </label>
                    <input
                      type="text"
                      value={data.storySubtitle}
                      onChange={(e) => onChange({ ...data, storySubtitle: e.target.value })}
                      className="w-full py-2 px-3 rounded-xl border border-[#5C5148]/20 bg-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-sans font-semibold tracking-wider uppercase text-[#5C5148] mb-1">
                      Story Paragraph 1
                    </label>
                    <textarea
                      rows={3}
                      value={data.storyParagraph1}
                      onChange={(e) => onChange({ ...data, storyParagraph1: e.target.value })}
                      className="w-full py-2 px-3 rounded-xl border border-[#5C5148]/20 bg-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-sans font-semibold tracking-wider uppercase text-[#5C5148] mb-1">
                      Story Paragraph 2 (Closing Line)
                    </label>
                    <input
                      type="text"
                      value={data.storyParagraph2}
                      onChange={(e) => onChange({ ...data, storyParagraph2: e.target.value })}
                      className="w-full py-2 px-3 rounded-xl border border-[#5C5148]/20 bg-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-sans font-semibold tracking-wider uppercase text-[#5C5148] mb-1">
                      Story Decorative Quote
                    </label>
                    <input
                      type="text"
                      value={data.storyQuote}
                      onChange={(e) => onChange({ ...data, storyQuote: e.target.value })}
                      className="w-full py-2 px-3 rounded-xl border border-[#5C5148]/20 bg-white text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: DATE & TIME */}
          {activeTab === 'datetime' && (
            <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#5C5148]/15 space-y-4">
              <h4 className="font-serif text-lg text-[#2C241E] font-medium">
                Wedding Date & Timing
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-sans font-semibold tracking-wider uppercase text-[#5C5148] mb-1">
                    Wedding Date (Display)
                  </label>
                  <input
                    type="text"
                    value={data.date}
                    placeholder="e.g. 30 · 10 · 2026"
                    onChange={(e) => onChange({ ...data, date: e.target.value })}
                    className="w-full py-2 px-3 rounded-xl border border-[#5C5148]/20 bg-white text-sm"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-sans font-semibold tracking-wider uppercase text-[#5C5148] mb-1">
                    Day of the Week
                  </label>
                  <input
                    type="text"
                    value={data.dateDay}
                    placeholder="e.g. Wednesday"
                    onChange={(e) => onChange({ ...data, dateDay: e.target.value })}
                    className="w-full py-2 px-3 rounded-xl border border-[#5C5148]/20 bg-white text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-sans font-semibold tracking-wider uppercase text-[#5C5148] mb-1">
                  Auspicious Muhurtham Time
                </label>
                <input
                  type="text"
                  value={data.muhurthamTime}
                  placeholder="e.g. 10:30 AM"
                  onChange={(e) => onChange({ ...data, muhurthamTime: e.target.value })}
                  className="w-full py-2 px-3 rounded-xl border border-[#5C5148]/20 bg-white text-sm"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans font-semibold tracking-wider uppercase text-[#5C5148] mb-1">
                  ISO Timestamp (For Google Calendar)
                </label>
                <input
                  type="text"
                  value={data.dateIso}
                  placeholder="2026-10-30T10:30:00"
                  onChange={(e) => onChange({ ...data, dateIso: e.target.value })}
                  className="w-full py-2 px-3 rounded-xl border border-[#5C5148]/20 bg-white text-sm font-mono text-xs"
                />
              </div>
            </div>
          )}

          {/* TAB 3: VENUE & MAP */}
          {activeTab === 'venue' && (
            <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#5C5148]/15 space-y-4">
              <h4 className="font-serif text-lg text-[#2C241E] font-medium">
                Ceremony Venue & Map
              </h4>
              <div>
                <label className="block text-[11px] font-sans font-semibold tracking-wider uppercase text-[#5C5148] mb-1">
                  Venue Resort / Hall Name
                </label>
                <input
                  type="text"
                  value={data.venueName}
                  onChange={(e) => onChange({ ...data, venueName: e.target.value })}
                  className="w-full py-2 px-3 rounded-xl border border-[#5C5148]/20 bg-white text-sm"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans font-semibold tracking-wider uppercase text-[#5C5148] mb-1.5">
                  Venue Heading Font Aesthetic
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'serif', label: 'Classic Serif', sample: 'Daffodils', fontClass: 'font-serif' },
                    { id: 'cinzel', label: 'Roman Regal', sample: 'DAFFODILS', fontClass: "font-['Cinzel']" },
                    { id: 'sans', label: 'Modern Sans', sample: 'DAFFODILS', fontClass: 'font-sans uppercase' },
                    { id: 'script', label: 'Calligraphy', sample: 'Daffodils', fontClass: 'kayal-script' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => onChange({ ...data, venueFont: f.id })}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        (data.venueFont || 'serif') === f.id
                          ? 'bg-[#2A4D45] text-white border-[#2A4D45] shadow-sm'
                          : 'bg-white border-[#5C5148]/20 text-[#2C241E] hover:border-[#2A4D45]'
                      }`}
                    >
                      <div className={`text-base font-normal leading-tight mb-0.5 ${f.fontClass}`}>
                        {f.sample}
                      </div>
                      <div className={`text-[10px] font-sans ${((data.venueFont || 'serif') === f.id) ? 'text-white/80' : 'text-[#8A7E75]'}`}>
                        {f.label}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-sans font-semibold tracking-wider uppercase text-[#5C5148] mb-1">
                  City & State / Address
                </label>
                <input
                  type="text"
                  value={data.venueLocation}
                  onChange={(e) => onChange({ ...data, venueLocation: e.target.value })}
                  className="w-full py-2 px-3 rounded-xl border border-[#5C5148]/20 bg-white text-sm"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans font-semibold tracking-wider uppercase text-[#5C5148] mb-1">
                  Google Maps Directions Link
                </label>
                <input
                  type="url"
                  value={data.venueMapUrl}
                  onChange={(e) => onChange({ ...data, venueMapUrl: e.target.value })}
                  className="w-full py-2 px-3 rounded-xl border border-[#5C5148]/20 bg-white text-sm"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans font-semibold tracking-wider uppercase text-[#5C5148] mb-1">
                  Atmospheric Venue Description
                </label>
                <textarea
                  rows={3}
                  value={data.venueDescription}
                  onChange={(e) => onChange({ ...data, venueDescription: e.target.value })}
                  className="w-full py-2 px-3 rounded-xl border border-[#5C5148]/20 bg-white text-sm"
                />
              </div>
            </div>
          )}

          {/* TAB 4: PHOTOS & MEDIA */}
          {activeTab === 'photos' && (
            <div className="space-y-6">
              {/* Couple Story Portrait */}
              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#5C5148]/15">
                <h4 className="font-serif text-lg text-[#2C241E] mb-2 font-medium">
                  Couple Story Portrait
                </h4>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-24 rounded-xl overflow-hidden bg-black/5 border border-[#5C5148]/20 shrink-0">
                    <img
                      src={data.images?.coupleStory || "/wedding/photos/photo1.jpg"}
                      alt="Story Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="inline-flex items-center gap-2 py-2 px-4 rounded-xl bg-[#2A4D45] text-white text-xs font-sans font-semibold tracking-wider uppercase cursor-pointer hover:bg-[#1f3a34]">
                      <Upload size={13} />
                      Upload Photo
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFileUpload('coupleStory', e)}
                      />
                    </label>
                    <input
                      type="text"
                      placeholder="Or paste image URL"
                      value={data.images?.coupleStory || ''}
                      onChange={(e) => onChange({
                        ...data,
                        images: { ...data.images, coupleStory: e.target.value }
                      })}
                      className="w-full py-1.5 px-3 rounded-lg border border-[#5C5148]/20 bg-white text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Gallery Grid Photos 1 to 5 */}
              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#5C5148]/15 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-serif text-lg text-[#2C241E] font-medium">
                    Moments in Time (5 Gallery Grid Photos)
                  </h4>
                </div>

                {/* Ratio & Framing Control */}
                <div className="p-3 bg-white rounded-xl border border-[#5C5148]/15 space-y-3">
                  <div>
                    <label className="block text-[11px] font-sans font-semibold tracking-wider uppercase text-[#5C5148] mb-1.5">
                      Gallery Preview Aspect Ratio
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'portrait', label: '3:4 Portrait', desc: 'Shows ~90%' },
                        { id: 'tall', label: '2:3 Full Frame', desc: '100% Uncropped' },
                        { id: 'soft', label: '4:5 Magazine', desc: 'Soft Portrait' },
                        { id: 'contain', label: 'Contain / Aura', desc: 'Zero crop fit' },
                      ].map((r) => (
                        <button
                          key={r.id}
                          type="button"
                          onClick={() => onChange({ ...data, galleryRatio: r.id })}
                          className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                            (data.galleryRatio || 'portrait') === r.id
                              ? 'bg-[#2A4D45] text-white border-[#2A4D45]'
                              : 'bg-[#FAF7F0] border-[#5C5148]/15 text-[#2C241E] hover:bg-white'
                          }`}
                        >
                          <div className="text-xs font-semibold">{r.label}</div>
                          <div className={`text-[10px] ${((data.galleryRatio || 'portrait') === r.id) ? 'text-white/80' : 'text-[#8A7E75]'}`}>
                            {r.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans font-semibold tracking-wider uppercase text-[#5C5148] mb-1.5">
                      Focal Alignment (Preserves Heads & Faces)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'faces', label: 'Faces / Top 18%' },
                        { id: 'center', label: 'Center' },
                        { id: 'top', label: 'Top Edge' },
                      ].map((f) => (
                        <button
                          key={f.id}
                          type="button"
                          onClick={() => onChange({ ...data, galleryFocus: f.id })}
                          className={`py-1.5 px-2 rounded-lg border text-xs text-center transition-all cursor-pointer ${
                            (data.galleryFocus || 'faces') === f.id
                              ? 'bg-[#2A4D45] text-white border-[#2A4D45]'
                              : 'bg-[#FAF7F0] border-[#5C5148]/15 text-[#2C241E] hover:bg-white'
                          }`}
                        >
                          {f.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {GALLERY_ITEMS_CONFIG.map((item, idx) => (
                  <div key={item.key} className="flex items-center gap-3 pt-3 border-t border-[#5C5148]/10 first:border-0 first:pt-0">
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-black/5 border border-[#5C5148]/20 shrink-0">
                      <img
                        src={data.images?.[item.key] || `/wedding/photos/photo${idx+2}.jpg`}
                        alt={item.label}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-serif text-sm font-medium text-[#2C241E]">
                          {item.label}
                        </span>
                        <label className="inline-flex items-center gap-1 text-[11px] text-[#2A4D45] hover:underline cursor-pointer font-sans font-semibold uppercase">
                          <Upload size={11} />
                          Upload
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(item.key, e)}
                          />
                        </label>
                      </div>
                      <input
                        type="text"
                        placeholder="Image URL"
                        value={data.images?.[item.key] || ''}
                        onChange={(e) => onChange({
                          ...data,
                          images: { ...data.images, [item.key]: e.target.value }
                        })}
                        className="w-full py-1 px-2.5 rounded-lg border border-[#5C5148]/20 bg-white text-xs"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: FESTIVITIES / EVENTS */}
          {activeTab === 'events' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-lg text-[#2C241E] font-medium">
                  Wedding Events & Ceremonies
                </h4>
                <button
                  onClick={addEvent}
                  className="py-1.5 px-3 rounded-full bg-[#2A4D45] text-white text-xs font-sans font-semibold tracking-wider uppercase flex items-center gap-1 cursor-pointer hover:bg-[#1f3a34]"
                >
                  <Plus size={12} />
                  Add Event
                </button>
              </div>

              {(data.events || []).map((evt, idx) => (
                <div key={evt.id} className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#5C5148]/15 space-y-3 relative group">
                  <button
                    onClick={() => removeEvent(evt.id)}
                    className="absolute top-3 right-3 text-[#8A7E75] hover:text-red-600 transition-colors cursor-pointer"
                    title="Remove celebration"
                  >
                    <Trash2 size={16} />
                  </button>

                  <span className="text-[10px] uppercase font-sans tracking-widest text-[#9E7D47] font-semibold">
                    Event #{idx + 1}
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-sans uppercase font-semibold text-[#5C5148]">
                        Event Title
                      </label>
                      <input
                        type="text"
                        value={evt.title}
                        onChange={(e) => updateEvent(evt.id, 'title', e.target.value)}
                        className="w-full py-1.5 px-3 rounded-lg border border-[#5C5148]/20 bg-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-sans uppercase font-semibold text-[#5C5148]">
                        Time / Timing
                      </label>
                      <input
                        type="text"
                        value={evt.time}
                        onChange={(e) => updateEvent(evt.id, 'time', e.target.value)}
                        className="w-full py-1.5 px-3 rounded-lg border border-[#5C5148]/20 bg-white text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-sans uppercase font-semibold text-[#5C5148]">
                        Venue Hall
                      </label>
                      <input
                        type="text"
                        value={evt.venue}
                        onChange={(e) => updateEvent(evt.id, 'venue', e.target.value)}
                        className="w-full py-1.5 px-3 rounded-lg border border-[#5C5148]/20 bg-white text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-sans uppercase font-semibold text-[#5C5148]">
                        City / Location
                      </label>
                      <input
                        type="text"
                        value={evt.location}
                        onChange={(e) => updateEvent(evt.id, 'location', e.target.value)}
                        className="w-full py-1.5 px-3 rounded-lg border border-[#5C5148]/20 bg-white text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-sans uppercase font-semibold text-[#5C5148]">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      value={evt.description}
                      onChange={(e) => updateEvent(evt.id, 'description', e.target.value)}
                      className="w-full py-1.5 px-3 rounded-lg border border-[#5C5148]/20 bg-white text-xs resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 6: MUSIC & SOUNDTRACK */}
          {activeTab === 'music' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#5C5148]/15 space-y-4">
                <h4 className="font-serif text-lg text-[#2C241E] font-medium">
                  YouTube Background Music
                </h4>
                <p className="font-sans text-xs text-[#5C5148]">
                  Paste any YouTube music link (e.g. Malayalam romantic flute, instrumental song, or temple melody)
                </p>
                <div>
                  <label className="block text-[11px] font-sans font-semibold tracking-wider uppercase text-[#5C5148] mb-1">
                    YouTube URL or Video ID
                  </label>
                  <input
                    type="text"
                    value={data.musicUrl}
                    placeholder="https://www.youtube.com/watch?v=ScMzIvxBSi4"
                    onChange={(e) => {
                      const val = e.target.value;
                      let id = val;
                      const m = val.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
                      if (m) id = m[1];
                      onChange({
                        ...data,
                        musicUrl: val,
                        youtubeMusicId: id,
                        musicType: 'youtube'
                      });
                    }}
                    className="w-full py-2 px-3 rounded-xl border border-[#5C5148]/20 bg-white text-sm"
                  />
                </div>
              </div>

              {/* Presets */}
              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#5C5148]/15 space-y-3">
                <h4 className="font-serif text-base text-[#2C241E] font-medium">
                  Curated Kerala Atmosphere Presets
                </h4>
                <div className="space-y-2">
                  {MUSIC_PRESETS.map((pst) => (
                    <button
                      key={pst.id}
                      onClick={() => onChange({
                        ...data,
                        musicUrl: `https://www.youtube.com/watch?v=${pst.youtubeId}`,
                        youtubeMusicId: pst.youtubeId,
                        musicType: 'youtube'
                      })}
                      className={`w-full p-3 rounded-xl text-left border transition-all flex items-center justify-between cursor-pointer ${
                        data.youtubeMusicId === pst.youtubeId
                          ? 'bg-[#2A4D45]/10 border-[#2A4D45] text-[#2A4D45]'
                          : 'bg-white border-[#5C5148]/15 hover:border-[#2A4D45]/40 text-[#2C241E]'
                      }`}
                    >
                      <div>
                        <div className="font-serif text-sm font-medium">{pst.name}</div>
                        <div className="font-sans text-[11px] text-[#8A7E75]">{pst.artist}</div>
                      </div>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#9E7D47]/15 text-[#9E7D47] font-sans font-semibold">
                        {pst.tag}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 7: RSVPS RESPONSES */}
          {activeTab === 'rsvps' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-serif text-lg text-[#2C241E] font-medium">
                  Received Guest RSVPs ({rsvps.length})
                </h4>
                {rsvps.length > 0 && (
                  <button
                    onClick={() => {
                      const csvContent = "data:text/csv;charset=utf-8," 
                        + ["Name,Phone,Attending,Guests,Meal,Date,Message"].join(",") + "\n"
                        + rsvps.map(r => `"${r.name}","${r.phone}","${r.attending ? 'Yes' : 'No'}","${r.guestsCount}","${r.mealPreference}","${r.submittedAt}","${(r.message || '').replace(/"/g, '""')}"`).join("\n");
                      const encodedUri = encodeURI(csvContent);
                      const link = document.createElement("a");
                      link.setAttribute("href", encodedUri);
                      link.setAttribute("download", `rsvps_${data.groomName}_${data.brideName}.csv`);
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="py-1 px-3 rounded-full border border-[#5C5148]/30 text-xs font-sans font-medium flex items-center gap-1 cursor-pointer hover:bg-black/5"
                  >
                    <Download size={12} />
                    Export CSV
                  </button>
                )}
              </div>

              {rsvps.length === 0 ? (
                <div className="text-center py-12 text-[#8A7E75] font-serif italic">
                  No RSVP responses submitted yet. Test the RSVP form on the page!
                </div>
              ) : (
                <div className="space-y-3">
                  {rsvps.map((r) => (
                    <div
                      key={r.id}
                      className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#5C5148]/15 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-base font-semibold text-[#2C241E]">
                          {r.name}
                        </span>
                        <span className={`text-[10px] font-sans font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full ${
                          r.attending
                            ? 'bg-[#2A4D45]/15 text-[#2A4D45]'
                            : 'bg-red-100 text-red-700'
                        }`}>
                          {r.attending ? `Attending (${r.guestsCount} Guests)` : 'Declined'}
                        </span>
                      </div>
                      {r.phone && (
                        <p className="font-sans text-xs text-[#5C5148]">
                          Phone: {r.phone}
                        </p>
                      )}
                      {r.mealPreference && (
                        <p className="font-sans text-xs text-[#8A7E75]">
                          Feast: {r.mealPreference}
                        </p>
                      )}
                      {r.message && (
                        <p className="font-serif italic text-xs text-[#2C241E] bg-white p-2.5 rounded-xl border border-[#5C5148]/10">
                          "{r.message}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 8: EXPORT / SHARE / RESET */}
          {activeTab === 'export' && (
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#5C5148]/15 space-y-3">
                <h4 className="font-serif text-lg text-[#2C241E] font-medium">
                  Share Your Customized Wedding Website
                </h4>
                <p className="font-sans text-xs text-[#5C5148]">
                  Copy the website URL to share your replica on WhatsApp or with guests.
                </p>
                <button
                  onClick={handleShareLink}
                  className="py-2.5 px-5 rounded-full bg-[#2A4D45] text-white text-xs font-sans font-semibold tracking-wider uppercase flex items-center gap-2 cursor-pointer hover:bg-[#1f3a34]"
                >
                  {copied ? <Check size={14} /> : <Share2 size={14} />}
                  {copied ? 'Link Copied to Clipboard!' : 'Copy Share Link'}
                </button>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#5C5148]/15 space-y-3">
                <h4 className="font-serif text-lg text-[#2C241E] font-medium">
                  Backup & Restore (JSON)
                </h4>
                <p className="font-sans text-xs text-[#5C5148]">
                  Export all your customized text, photos, timings, and events to a file.
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    onClick={handleExportJson}
                    className="py-2 px-4 rounded-full border border-[#5C5148]/30 bg-white text-[#2C241E] text-xs font-sans font-semibold tracking-wider uppercase flex items-center gap-1.5 hover:bg-black/5 cursor-pointer"
                  >
                    <Download size={13} />
                    Download JSON Backup
                  </button>
                  <label className="py-2 px-4 rounded-full border border-[#2A4D45] text-[#2A4D45] bg-white text-xs font-sans font-semibold tracking-wider uppercase flex items-center gap-1.5 hover:bg-[#2A4D45]/10 cursor-pointer">
                    <Upload size={13} />
                    Load from JSON
                    <input
                      type="file"
                      accept=".json"
                      className="hidden"
                      onChange={handleImportJson}
                    />
                  </label>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-red-50/60 border border-red-200/60 space-y-3">
                <h4 className="font-serif text-base text-red-900 font-medium">
                  Reset to Original Template Defaults
                </h4>
                <p className="font-sans text-xs text-red-700">
                  Restore original template sample data, photos, and timings.
                </p>
                <button
                  onClick={() => {
                    if (confirm('Are you sure you want to restore original template values?')) {
                      onReset();
                    }
                  }}
                  className="py-2 px-4 rounded-full bg-red-700 text-white text-xs font-sans font-semibold tracking-wider uppercase flex items-center gap-1.5 hover:bg-red-800 cursor-pointer"
                >
                  <RotateCcw size={13} />
                  Reset to Template Default
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-[#5C5148]/15 bg-[#FAF7F0] flex items-center justify-between">
          <button
            onClick={onClose}
            className="py-2 px-4 rounded-xl text-xs font-sans text-[#5C5148] hover:bg-black/5 transition-colors cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            className="py-2 px-6 rounded-full bg-[#2A4D45] text-white hover:bg-[#1f3a34] text-xs font-sans font-semibold tracking-wider uppercase transition-colors flex items-center gap-1.5 shadow-md cursor-pointer"
          >
            <Check size={14} />
            Apply & Save to Disk
          </button>
        </div>
      </div>
    </div>
  );
};
