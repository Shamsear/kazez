import { useEffect } from 'react';
import { reveal, rise, leave, morph } from 'cube-motion';

export { rise, leave, morph, reveal };

/**
 * useScrollReveal powered by cube-motion (Web Animations API)
 * Automatically hides elements and rises them as they scroll into view (10% viewport inset, 640ms, 12px lift, 70ms stagger).
 */
export const useScrollReveal = (selector = '.kz-reveal', deps = []) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let cleanup = null;

    // Small delay so React completes rendering view/DOM changes
    const timer = setTimeout(() => {
      try {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          cleanup = reveal(elements, {
            stagger: 70
          });
        }
      } catch (err) {
        console.warn('cube-motion reveal initialization error:', err);
      }
    }, 60);

    return () => {
      clearTimeout(timer);
      if (typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, [selector, ...deps]);
};
