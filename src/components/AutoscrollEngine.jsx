import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause } from 'lucide-react';

export const AutoscrollEngine = ({ initialEnabled = false, speed = 1.4 }) => {
  const [active, setActive] = useState(initialEnabled);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!active) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    let resetting = false;

    timerRef.current = setInterval(() => {
      if (resetting) return;

      const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;

      if (maxScroll > 20) {
        if (currentScroll >= maxScroll - 12) {
          resetting = true;
          setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setTimeout(() => {
              resetting = false;
            }, 1200);
          }, 1200);
        } else {
          window.scrollBy({ top: speed, behavior: 'auto' });
        }
      }
    }, 16);

    const handleStop = () => {
      // Pause autoscroll on user touch or manual wheel
      setActive(false);
    };

    window.addEventListener('wheel', handleStop, { passive: true });
    window.addEventListener('touchmove', handleStop, { passive: true });

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      window.removeEventListener('wheel', handleStop);
      window.removeEventListener('touchmove', handleStop);
    };
  }, [active, speed]);

  return (
    <button
      onClick={() => setActive(!active)}
      className={`fixed bottom-6 left-36 sm:left-44 z-40 py-2 px-3.5 rounded-full border border-[#5C5148]/20 shadow-md backdrop-blur-md flex items-center gap-1.5 text-xs font-sans font-semibold tracking-wider uppercase transition-all cursor-pointer hover:scale-105 ${
        active
          ? 'bg-[#2A4D45] text-white border-transparent'
          : 'bg-[#FCFAF7]/95 text-[#5C5148] hover:text-[#2A4D45] hover:bg-white'
      }`}
      title={active ? 'Pause Autoscroll' : 'Start Autoscroll Preview'}
    >
      {active ? <Pause size={12} className="fill-white" /> : <Play size={12} className="fill-[#5C5148]" />}
      <span>{active ? 'Autoscrolling' : 'Autoscroll'}</span>
    </button>
  );
};

