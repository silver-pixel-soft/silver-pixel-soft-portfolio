import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // Follower has a slight spring-like drag
    const xToFollower = gsap.quickTo(follower, 'x', { duration: 0.35, ease: 'power3' });
    const yToFollower = gsap.quickTo(follower, 'y', { duration: 0.35, ease: 'power3' });

    // Start hidden
    gsap.set([cursor, follower], { autoAlpha: 0 });

    let isHovering = false;
    let isVisible = false;

    const mouseMove = (e: MouseEvent) => {
      if (!isVisible) {
        isVisible = true;
        gsap.to([cursor, follower], { autoAlpha: 1, duration: 0.25 });
      }

      // Core cursor snaps instantly
      gsap.set(cursor, { x: e.clientX, y: e.clientY });

      // Follower follows with quickTo tween
      xToFollower(e.clientX);
      yToFollower(e.clientY);

      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, input, textarea, [role="button"], .group');

      if (isInteractive && !isHovering) {
        isHovering = true;
        gsap.to(cursor, { scale: 0.4, duration: 0.3, ease: "back.out(1.7)" });
        gsap.to(follower, {
          scale: 2.8,
          backgroundColor: 'rgba(124, 58, 237, 0.15)', // violet glow on hover
          borderColor: 'rgba(167, 139, 250, 0.5)',
          duration: 0.3,
          ease: "back.out(1.5)"
        });
      } else if (!isInteractive && isHovering) {
        isHovering = false;
        gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power2.out" });
        gsap.to(follower, {
          scale: 1,
          backgroundColor: 'transparent',
          borderColor: 'rgba(139, 92, 246, 0.45)',
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    const mouseLeave = () => {
      isVisible = false;
      gsap.to([cursor, follower], { autoAlpha: 0, duration: 0.25 });
    };

    window.addEventListener('mousemove', mouseMove);
    document.addEventListener('mouseleave', mouseLeave);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      document.removeEventListener('mouseleave', mouseLeave);
    };
  });

  return (
    <>
      {/* Precision Dot — violet */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-violet-400 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block shadow-[0_0_12px_rgba(167,139,250,0.9)] mix-blend-screen opacity-0 invisible"
      />
      {/* Elastic Aura Follower */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border-[1.5px] border-violet-400/40 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block shadow-[0_0_22px_rgba(124,58,237,0.25)] opacity-0 invisible"
      />
    </>
  );
};
