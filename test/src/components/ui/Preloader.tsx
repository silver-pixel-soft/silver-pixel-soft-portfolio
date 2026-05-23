import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const columnsRef = useRef<(HTMLDivElement | null)[]>([]);
  const counterRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const charsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const progressLineRef = useRef<HTMLDivElement>(null);
  
  const [progress, setProgress] = useState(0);
  const brandName = "Silver Pixel Soft";

  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Unmount preloader
        onComplete();
      },
    });

    // 1. Reveal characters with stagger
    tl.fromTo(charsRef.current, {
      y: 100,
      opacity: 0,
      rotateX: -90,
    }, {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: 1,
      stagger: 0.04,
      ease: 'power4.out',
    });

    // 2. Animate counter from 0 to 100 while progress line fills
    tl.to(
      {},
      {
        duration: 2.5,
        ease: 'power3.inOut',
        onUpdate: function () {
          const currentProgress = Math.round(this.progress() * 100);
          setProgress(currentProgress);
        },
      },
      '-=0.5'
    );
    
    // Animate progress line width
    tl.to(progressLineRef.current, {
      width: '100%',
      duration: 2.5,
      ease: 'power3.inOut',
    }, '-=2.5');

    // 3. Scale up and fade out the counter and text
    tl.to([counterRef.current, textRef.current, progressLineRef.current], {
      scale: 1.1,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.inOut',
    });

    // 4. Stagger slide up the 5 columns to reveal the site
    tl.to(columnsRef.current, {
      yPercent: -100,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power4.inOut',
    }, '-=0.4');

  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
    >
      {/* 5 Background Columns */}
      <div className="absolute inset-0 flex w-full h-full">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            ref={(el) => { columnsRef.current[i] = el; }}
            className="h-full flex-1 bg-neutral-950"
          />
        ))}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full pointer-events-none">
        
        {/* Massive Counter */}
        <div 
          ref={counterRef}
          className="text-[10rem] sm:text-[14rem] md:text-[20rem] font-bold tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-700 select-none"
        >
          {progress}
        </div>

        {/* Brand Text */}
        <div ref={textRef} className="mt-4 md:mt-8 flex overflow-hidden perspective-[1000px]">
          {brandName.split('').map((char, index) => (
            <span
              key={index}
              ref={(el) => { charsRef.current[index] = el; }}
              className={`text-xl sm:text-2xl md:text-4xl font-light tracking-[0.2em] uppercase text-white ${char === ' ' ? 'w-4 md:w-8' : 'inline-block'} origin-bottom`}
            >
              {char}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Progress Line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5 z-10">
        <div 
          ref={progressLineRef}
          className="h-full w-0 bg-sky-500 shadow-[0_0_20px_rgba(14,165,233,0.5)]"
        />
      </div>
    </div>
  );
};
