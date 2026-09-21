import { useEffect } from 'react';

export const useVideoParallax = (videoRef, overlayRef) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Disable parallax on mobile/touch devices to prevent frame drops
    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
    if (isMobile) return;

    const video = videoRef?.current;
    const overlay = overlayRef?.current;
    if (!video) return;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          if (scrollY < 900) {
            video.style.transform = `translate3d(0, ${scrollY * 0.16}px, 0) scale(1.03)`;
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

