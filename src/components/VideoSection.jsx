import React from 'react';
import { Play } from 'lucide-react';

export const VideoSection = ({ data }) => {
  const {
    videoMalayalam,
    videoTitle,
    videoSubtitle,
    videoDescription,
    videos = []
  } = data;

  const currentVideo = videos && videos.length > 0 ? videos[0] : null;
  if (!currentVideo) return null;

  // Extract youtube ID if given as full link
  let embedUrl = "";
  if (currentVideo.type === 'youtube' || (currentVideo.url && (currentVideo.url.includes('youtube.com') || currentVideo.url.includes('youtu.be')))) {
    let ytId = currentVideo.youtubeId || "ScMzIvxBSi4";
    if (currentVideo.url) {
      const match = currentVideo.url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
      if (match) ytId = match[1];
    }
    embedUrl = `https://www.youtube-nocookie.com/embed/${ytId}?rel=0&modestbranding=1`;
  }

  return (
    <section className="kayal-video-section relative py-20 px-4 sm:px-6 md:px-12 bg-[#FAF7F0] overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          {videoMalayalam && (
            <p className="font-malayalam text-xs sm:text-sm text-[#9E7D47] tracking-widest font-semibold uppercase mb-1">
              {videoMalayalam}
            </p>
          )}
          <p className="kayal-eyebrow text-xs tracking-[0.25em] text-[#2A4D45] font-sans font-semibold block mb-2">
            {videoSubtitle}
          </p>
          <h2 className="kayal-script text-4xl sm:text-5xl md:text-6xl text-[#2C241E] mb-2 font-normal">
            {videoTitle}
          </h2>
          <div className="w-16 h-0.5 bg-[#9E7D47]/40 mx-auto mt-3" />
        </div>

        <div className="bg-[#FCFAF7] rounded-3xl p-4 sm:p-8 border border-[#C5A880]/30 shadow-[0_15px_40px_-15px_rgba(42,77,69,0.12)]">
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[#5C5148]/20 shadow-md bg-black">
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={videoTitle || "Wedding Film Highlights"}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : currentVideo.url ? (
              <video
                src={currentVideo.url}
                controls
                className="w-full h-full object-cover"
              />
            ) : null}
          </div>

          {(currentVideo.description || videoDescription) && (
            <p className="font-serif text-center text-sm sm:text-base text-[#5C5148] italic max-w-xl mx-auto mt-6">
              "{currentVideo.description || videoDescription}"
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

