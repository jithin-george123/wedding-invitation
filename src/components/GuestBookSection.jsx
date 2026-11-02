import React, { useState } from 'react';
import { Send, Heart, Sparkles, MessageCircle } from 'lucide-react';

export const GuestBookSection = ({ data, wishes = [], onAddWish }) => {
  const {
    wishesMalayalam,
    wishesTitle,
    wishesSubtitle
  } = data;

  const [form, setForm] = useState({
    name: '',
    relationship: 'Friend',
    tag: '❤️ With Love',
    message: ''
  });

  const [posting, setPosting] = useState(false);

  const relationships = ['Family', 'Friend', 'Colleague', 'Well-Wisher'];
  const tags = ['❤️ With Love', '✨ Best Wishes', '🎉 Congratulations', '🌸 Blessings'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.message.trim()) return;

    setPosting(true);
    setTimeout(() => {
      const newWish = {
        id: `wish_${Date.now()}`,
        name: form.name.trim(),
        relationship: form.relationship,
        tag: form.tag,
        message: form.message.trim(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      };

      onAddWish(newWish);
      setForm({
        name: '',
        relationship: 'Friend',
        tag: '❤️ With Love',
        message: ''
      });
      setPosting(false);
    }, 300);
  };

  return (
    <section id="wishes-section" className="kayal-wishes-section relative py-24 px-4 sm:px-6 md:px-12 bg-[#FAF7F0] overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          {wishesMalayalam && (
            <p className="font-malayalam text-xs sm:text-sm text-[#9E7D47] tracking-widest font-semibold uppercase mb-1">
              {wishesMalayalam}
            </p>
          )}
          <p className="kayal-eyebrow text-xs tracking-[0.25em] text-[#2A4D45] font-sans font-semibold block mb-2">
            {wishesSubtitle}
          </p>
          <h2 className="kayal-script text-4xl sm:text-5xl md:text-6xl text-[#2C241E] mb-2 font-normal">
            {wishesTitle}
          </h2>
          <div className="w-16 h-0.5 bg-[#9E7D47]/40 mx-auto mt-3" />
        </div>

        {/* Wishes Form Card */}
        <div className="bg-[#FCFAF7] rounded-3xl p-6 sm:p-8 border border-[#C5A880]/30 shadow-[0_15px_40px_-15px_rgba(42,77,69,0.12)] mb-12">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-sans font-semibold tracking-wider uppercase text-[#5C5148] mb-1.5">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Arun & Sneha"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#5C5148]/20 bg-white text-[#2C241E] text-sm focus:outline-none focus:border-[#2A4D45]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-sans font-semibold tracking-wider uppercase text-[#5C5148] mb-1.5">
                  Your Connection
                </label>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {relationships.map((rel) => (
                    <button
                      key={rel}
                      type="button"
                      onClick={() => setForm({ ...form, relationship: rel })}
                      className={`py-1 px-3 rounded-full text-xs font-sans transition-all cursor-pointer ${
                        form.relationship === rel
                          ? 'bg-[#2A4D45] text-white font-medium shadow-sm'
                          : 'border border-[#5C5148]/20 bg-white/70 text-[#5C5148] hover:bg-white'
                      }`}
                    >
                      {rel}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-sans font-semibold tracking-wider uppercase text-[#5C5148] mb-1.5">
                Greeting Vibe
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {tags.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setForm({ ...form, tag: t })}
                    className={`py-1 px-3 rounded-full text-xs font-sans transition-all cursor-pointer ${
                      form.tag === t
                        ? 'bg-[#9E7D47] text-white font-medium shadow-sm'
                        : 'border border-[#9E7D47]/30 bg-white/70 text-[#9E7D47] hover:bg-[#9E7D47]/10'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-sans font-semibold tracking-wider uppercase text-[#5C5148] mb-1.5">
                Your Blessings / Message *
              </label>
              <textarea
                rows={2}
                required
                placeholder="Share your prayers, love, or advice for their new journey..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full py-2.5 px-4 rounded-xl border border-[#5C5148]/20 bg-white text-[#2C241E] text-sm focus:outline-none focus:border-[#2A4D45] resize-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={posting}
                className="py-2.5 px-6 rounded-full bg-[#2A4D45] text-white hover:bg-[#1f3a34] transition-all flex items-center gap-2 text-xs font-sans font-semibold tracking-wider uppercase shadow-md cursor-pointer disabled:opacity-60"
              >
                <Send size={13} />
                {posting ? 'Publishing...' : 'Leave a Blessing'}
              </button>
            </div>
          </form>
        </div>

        {/* Wishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {wishes.map((wish) => (
            <div
              key={wish.id}
              className="bg-[#FCFAF7] rounded-3xl p-6 border border-[#C5A880]/30 shadow-[0_10px_30px_-10px_rgba(42,77,69,0.08)] flex flex-col justify-between hover:shadow-[0_15px_35px_-10px_rgba(42,77,69,0.12)] transition-shadow"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#2A4D45]/10 text-[#2A4D45] flex items-center justify-center font-serif font-bold text-sm">
                      {wish.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-serif text-base text-[#2C241E] font-medium leading-tight">
                        {wish.name}
                      </h4>
                      <span className="text-[10px] text-[#8A7E75] uppercase font-sans tracking-wider">
                        {wish.relationship}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#9E7D47]/10 text-[#9E7D47] font-sans font-medium">
                    {wish.tag}
                  </span>
                </div>

                <p className="font-serif text-sm text-[#5C5148] leading-relaxed italic my-2">
                  "{wish.message}"
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#5C5148]/10 text-right">
                <span className="text-[10px] text-[#8A7E75] font-sans">
                  {wish.date}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

