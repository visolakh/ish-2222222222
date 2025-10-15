'use client';
import React, { useEffect, useState } from 'react';

const videos = ['/videos/video1.mp4', '/videos/video2.mp4']; // твои файлы будут тут

const VideoSlider: React.FC = () => {
  const [index, setIndex] = useState<number>(0);

  const prev = () => setIndex((i) => (i - 1 + videos.length) % videos.length);
  const next = () => setIndex((i) => (i + 1) % videos.length);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="w-full relative">
      <div className="w-full h-56 sm:h-80 md:h-96 lg:h-[560px] overflow-hidden rounded-md">
        {videos.map((src, i) => (
          <video
            key={src}
            src={src}
            className={`w-full h-full object-cover transition-opacity duration-500 ${i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
          />
        ))}
      </div>

      {/* Левая стрелка */}
      <button
        aria-label="Previous video"
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 z-10"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Правая стрелка */}
      <button
        aria-label="Next video"
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 z-10"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Точки */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {videos.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to video ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`w-2.5 h-2.5 rounded-full transition-colors ${i === index ? 'bg-white' : 'bg-white/60'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoSlider;
