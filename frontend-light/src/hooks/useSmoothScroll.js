import { useEffect } from 'react';
import Lenis from 'lenis';

export const useSmoothScroll = (activeView) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect touch / coarse pointer devices (smartphones, tablets)
    // For touch devices, native 120Hz compositor momentum scrolling is faster and zero-lag
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    if (isTouchDevice) {
      return;
    }

    // Initialize Lenis with frictionless, fluid momentum (no sudden deceleration or grabbing)
    const lenis = new Lenis({
      lerp: 0.1,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      syncTouch: false,
      infinite: false,
    });

    window.lenis = lenis;

    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      window.lenis = null;
    };
  }, []);

  // When activeView changes, reset scroll smoothly to top
  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [activeView]);
};

