import React, { useState } from 'react';
import { Heart, Send, CheckCircle2, User, Phone, Users } from 'lucide-react';

export const RsvpSection = ({ data, onRsvpSubmit }) => {
  const {
    rsvpTitle,
    rsvpSubtitle,
    rsvpSideQuote
  } = data;

  const [form, setForm] = useState({
    name: '',
    phone: '',
    attending: 'yes',
    guestsCount: '2',
    mealPreference: 'Vegetarian Sadhya',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    setLoading(true);

    setTimeout(() => {
      const newRsvp = {
        id: `rsvp_${Date.now()}`,
        name: form.name.trim(),
        phone: form.phone.trim(),
        attending: form.attending === 'yes',
        guestsCount: form.attending === 'yes' ? parseInt(form.guestsCount, 10) : 0,
        mealPreference: form.mealPreference,
        message: form.message.trim(),
        submittedAt: new Date().toISOString()
      };

      // Store in localStorage
      try {
        const existing = JSON.parse(localStorage.getItem('kayal_wedding_rsvps') || '[]');
        existing.unshift(newRsvp);
        localStorage.setItem('kayal_wedding_rsvps', JSON.stringify(existing));
      } catch (err) {}

      onRsvpSubmit?.(newRsvp);
      setLoading(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <section id="rsvp-section" className="kayal-rsvp-section relative py-24 px-4 sm:px-6 md:px-12 bg-[#FAF7F0] overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p className="kayal-eyebrow text-xs tracking-[0.25em] text-[#2A4D45] font-sans font-semibold block mb-2">
            {rsvpSubtitle}
          </p>
          <h2 className="kayal-script text-4xl sm:text-5xl md:text-6xl text-[#2C241E] mb-2 font-normal">
            {rsvpTitle}
          </h2>
          <div className="w-16 h-0.5 bg-[#9E7D47]/40 mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {/* Poetic Side Plaque */}
          {rsvpSideQuote && (
            <div className="md:col-span-4 bg-[#2A4D45] text-white rounded-3xl p-8 flex flex-col justify-between shadow-[0_15px_40px_-15px_rgba(42,77,69,0.3)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 pointer-events-none" />
              <div>
                <span className="text-[10px] tracking-[0.3em] uppercase text-[#C4A46E] font-sans font-semibold">
                  A Heartfelt Note
                </span>
                <p className="font-serif italic text-2xl sm:text-3xl text-[#FAF7F0] mt-6 leading-relaxed whitespace-pre-line font-light">
                  {rsvpSideQuote}
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-2 text-xs text-[#C4A46E] font-sans">
                <Heart size={14} className="fill-[#C4A46E]" />
                <span>Your presence completes our joy</span>
              </div>
            </div>
          )}

          {/* RSVP Form Card */}
          <div className={`${rsvpSideQuote ? 'md:col-span-8' : 'md:col-span-12'} bg-[#FCFAF7] rounded-3xl p-6 sm:p-10 border border-[#C5A880]/30 shadow-[0_15px_40px_-15px_rgba(42,77,69,0.12)]`}>
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-fade-in">
                <div className="w-16 h-16 rounded-full bg-[#2A4D45]/10 text-[#2A4D45] flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-serif text-3xl text-[#2C241E]">
                  Thank You, {form.name}!
                </h3>
                <p className="font-serif text-base text-[#5C5148] max-w-md mx-auto italic">
                  {form.attending === 'yes'
                    ? "We are delighted to have you celebrate with us. Your response has been recorded with love."
                    : "Thank you for letting us know. You will be warmly remembered in our thoughts and prayers."}
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: '',
                      phone: '',
                      attending: 'yes',
                      guestsCount: '2',
                      mealPreference: 'Vegetarian Sadhya',
                      message: ''
                    });
                  }}
                  className="mt-4 py-2 px-6 rounded-full border border-[#5C5148]/30 text-xs font-sans font-semibold tracking-wider uppercase text-[#2C241E] hover:bg-black/5 transition-colors cursor-pointer"
                >
                  Submit Another Response
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Attending toggle */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, attending: 'yes' })}
                    className={`py-3 px-4 rounded-2xl text-xs font-sans font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      form.attending === 'yes'
                        ? 'bg-[#2A4D45] text-white shadow-md'
                        : 'border border-[#5C5148]/20 bg-white/60 text-[#5C5148] hover:bg-white'
                    }`}
                  >
                    <Heart size={14} className={form.attending === 'yes' ? 'fill-white' : ''} />
                    Joyfully Accept
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, attending: 'no' })}
                    className={`py-3 px-4 rounded-2xl text-xs font-sans font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      form.attending === 'no'
                        ? 'bg-[#5C5148] text-white shadow-md'
                        : 'border border-[#5C5148]/20 bg-white/60 text-[#5C5148] hover:bg-white'
                    }`}
                  >
                    Regretfully Decline
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-sans font-semibold tracking-wider uppercase text-[#5C5148] mb-1.5">
                      Your Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="e.g. Anand & Deepa"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full py-2.5 px-4 pl-10 rounded-xl border border-[#5C5148]/20 bg-white text-[#2C241E] text-sm focus:outline-none focus:border-[#2A4D45] focus:ring-1 focus:ring-[#2A4D45]"
                      />
                      <User size={15} className="absolute left-3.5 top-3 text-[#8A7E75]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans font-semibold tracking-wider uppercase text-[#5C5148] mb-1.5">
                      Phone Number (WhatsApp)
                    </label>
                    <div className="relative">
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full py-2.5 px-4 pl-10 rounded-xl border border-[#5C5148]/20 bg-white text-[#2C241E] text-sm focus:outline-none focus:border-[#2A4D45] focus:ring-1 focus:ring-[#2A4D45]"
                      />
                      <Phone size={15} className="absolute left-3.5 top-3 text-[#8A7E75]" />
                    </div>
                  </div>
                </div>

                {form.attending === 'yes' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-fade-in">
                    <div>
                      <label className="block text-[11px] font-sans font-semibold tracking-wider uppercase text-[#5C5148] mb-1.5">
                        Number of Guests Attending
                      </label>
                      <div className="relative">
                        <select
                          value={form.guestsCount}
                          onChange={(e) => setForm({ ...form, guestsCount: e.target.value })}
                          className="w-full py-2.5 px-4 pl-10 rounded-xl border border-[#5C5148]/20 bg-white text-[#2C241E] text-sm focus:outline-none focus:border-[#2A4D45] focus:ring-1 focus:ring-[#2A4D45]"
                        >
                          <option value="1">1 Person</option>
                          <option value="2">2 Persons (Couple)</option>
                          <option value="3">3 Persons</option>
                          <option value="4">4 Persons (Family)</option>
                          <option value="5">5+ Persons</option>
                        </select>
                        <Users size={15} className="absolute left-3.5 top-3 text-[#8A7E75]" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-sans font-semibold tracking-wider uppercase text-[#5C5148] mb-1.5">
                        Feast Preference
                      </label>
                      <select
                        value={form.mealPreference}
                        onChange={(e) => setForm({ ...form, mealPreference: e.target.value })}
                        className="w-full py-2.5 px-4 rounded-xl border border-[#5C5148]/20 bg-white text-[#2C241E] text-sm focus:outline-none focus:border-[#2A4D45] focus:ring-1 focus:ring-[#2A4D45]"
                      >
                        <option value="Vegetarian Sadhya">Traditional Kerala Sadhya (Veg)</option>
                        <option value="Jain Meal">Jain Sadhya</option>
                        <option value="Any">Standard Wedding Feast</option>
                      </select>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-sans font-semibold tracking-wider uppercase text-[#5C5148] mb-1.5">
                    Warm Note / Blessing for the Couple
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Leave a message or wish for the couple..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full py-2.5 px-4 rounded-xl border border-[#5C5148]/20 bg-white text-[#2C241E] text-sm focus:outline-none focus:border-[#2A4D45] focus:ring-1 focus:ring-[#2A4D45] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 px-6 rounded-2xl bg-[#2A4D45] text-white hover:bg-[#1f3a34] transition-all flex items-center justify-center gap-2 text-xs font-sans font-semibold tracking-wider uppercase shadow-md cursor-pointer disabled:opacity-60"
                >
                  <Send size={14} />
                  {loading ? 'Submitting...' : 'CONFIRM RSVP'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

