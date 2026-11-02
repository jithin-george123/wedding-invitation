import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';

export const MusicPlayer = ({ data }) => {
  const {
    musicUrl,
    musicType = "youtube",
    youtubeMusicId = "ScMzIvxBSi4",
    musicVolume = 75,
    musicLoop = true,
    musicStartSec = 0
  } = data;

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const iframeRef = useRef(null);

  // Extract YouTube ID
  let ytId = youtubeMusicId || "ScMzIvxBSi4";
  if (musicUrl && (musicUrl.includes('youtube.com') || musicUrl.includes('youtu.be'))) {
    const match = musicUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
    if (match) ytId = match[1];
  }

  const isYouTube = musicType === 'youtube' || (musicUrl && (musicUrl.includes('youtube.com') || musicUrl.includes('youtu.be'))) || !musicUrl?.endsWith('.mp3');

  const sendYtCommand = (func, args = []) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: func, args: args }),
          '*'
        );
      } catch (err) {
        console.warn('YouTube postMessage error:', err);
      }
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      // PAUSE
      if (isYouTube) {
        sendYtCommand('pauseVideo');
      }
      if (audioRef.current) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      // PLAY
      if (isYouTube) {
        sendYtCommand('playVideo');
      }
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(true);
    }
  };

  // Optional: Listen for first user click on page to start music if not started
  useEffect(() => {
    const handleFirstInteraction = () => {
      // Do not auto-force if user explicitly wants manual play, but prime iframe
      sendYtCommand('setVolume', [musicVolume || 75]);
      window.removeEventListener('click', handleFirstInteraction);
    };
    window.addEventListener('click', handleFirstInteraction, { once: true });
    return () => window.removeEventListener('click', handleFirstInteraction);
  }, [musicVolume]);

  const originUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

  return (
    <>
      {/* Background YouTube audio player */}
      {isYouTube && ytId && (
        <div
          style={{
            position: 'fixed',
            top: '-200px',
            left: '-200px',
            width: '100px',
            height: '100px',
            opacity: 0,
            pointerEvents: 'none',
            zIndex: -9999
          }}
          aria-hidden="true"
        >
          <iframe
            ref={iframeRef}
            id="kayal-youtube-audio"
            title="Kerala Wedding Soundtrack"
            width="100"
            height="100"
            src={`https://www.youtube.com/embed/${ytId}?enablejsapi=1&autoplay=0&mute=0&controls=0&disablekb=1&fs=0&loop=1&playlist=${ytId}&origin=${originUrl}`}
            allow="autoplay; encrypted-media"
            loading="lazy"
          />
        </div>
      )}

      {/* HTML5 audio fallback if direct audio file URL provided */}
      {!isYouTube && musicUrl && (
        <audio
          ref={audioRef}
          src={musicUrl}
          preload="auto"
          loop={musicLoop}
          className="hidden"
        />
      )}

      {/* Floating Audio Play / Pause Pill Widget */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center">
        <button
          onClick={togglePlay}
          className={`py-2 px-3.5 sm:px-4 rounded-full border shadow-[0_10px_25px_-5px_rgba(42,77,69,0.2)] backdrop-blur-md flex items-center gap-2 text-xs font-sans font-semibold tracking-wider uppercase transition-all cursor-pointer group hover:scale-105 ${
            isPlaying
              ? 'bg-[#2A4D45] text-white border-transparent'
              : 'bg-[#FCFAF7]/95 text-[#2C241E] border-[#5C5148]/20 hover:border-[#2A4D45] hover:bg-white'
          }`}
          title={isPlaying ? "Click to Pause Music" : "Click to Play Music"}
          aria-label={isPlaying ? "Pause Background Music" : "Play Background Music"}
        >
          {isPlaying ? (
            <>
              {/* Animated Equalizer bars */}
              <div className="flex items-center gap-0.5 h-3.5 w-3.5 justify-center">
                <span className="w-0.5 h-3 bg-white animate-pulse" />
                <span className="w-0.5 h-4 bg-white animate-pulse delay-75" />
                <span className="w-0.5 h-2 bg-white animate-pulse delay-150" />
                <span className="w-0.5 h-3.5 bg-white animate-pulse delay-100" />
              </div>
              <Pause size={12} className="fill-white" />
              <span className="hidden sm:inline">Pause Music</span>
            </>
          ) : (
            <>
              <Play size={12} className="fill-[#9E7D47] text-[#9E7D47] group-hover:scale-110 transition-transform" />
              <span className="text-[#5C5148] group-hover:text-[#2C241E]">Play Music</span>
            </>
          )}
        </button>
      </div>
    </>
  );
};
