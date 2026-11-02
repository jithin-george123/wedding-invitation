import React, { useState, useEffect, useMemo } from 'react';

export const TypewriterText = ({
  text = "",
  delay = 0,
  speed = 75,
  className = "",
  showCursor = true,
  cursorChar = "|",
  cursorClassName = "",
  onComplete
}) => {
  const segments = useMemo(() => {
    if (!text) return [];
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      try {
        const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
        return Array.from(segmenter.segment(text), s => s.segment);
      } catch {
        return Array.from(text);
      }
    }
    return Array.from(text);
  }, [text]);

  const [count, setCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setCount(0);
    setTyping(false);
    setDone(false);
    if (segments.length === 0) return;

    let current = 0;
    let intervalId = null;

    const timeoutId = setTimeout(() => {
      setTyping(true);
      intervalId = setInterval(() => {
        current++;
        setCount(current);
        if (current >= segments.length) {
          clearInterval(intervalId);
          setTyping(false);
          setDone(true);
          onComplete?.();
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [segments, delay, speed]);

  const displayText = segments.slice(0, count).join('');

  return (
    <span className={`inline-flex items-baseline ${className}`}>
      <span>{displayText}</span>
      {showCursor && (typing || (!done && count === 0)) && (
        <span className={`kayal-typewriter-cursor ${cursorClassName}`}>{cursorChar}</span>
      )}
    </span>
  );
};

