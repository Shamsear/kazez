import { useEffect } from 'react';

export const useVideoParallax = (videoRef, overlayRef) => {
  useEffect(() => {
    const video = videoRef?.current;
    const overlay = overlayRef?.current;
    if (!video) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (scrollY < 1200) {
            video.style.transform = `scale(1.04) translateY(${scrollY * 0.22}px)`;
            if (overlay) {
              overlay.style.opacity = Math.min(0.72 + scrollY / 900, 0.98);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [videoRef, overlayRef]);
};
