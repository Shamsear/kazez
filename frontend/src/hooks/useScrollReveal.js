import { useLayoutEffect, useEffect } from 'react';
import { reveal, rise, leave, morph } from 'cube-motion';

export { rise, leave, morph, reveal };

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * useScrollReveal powered by cube-motion (Web Animations API)
 * Immediately sets initial state before first paint (via useLayoutEffect) to eliminate any FOUC flash.
 */
export const useScrollReveal = (selector = '.kz-reveal', deps = []) => {
  useIsomorphicLayoutEffect(() => {
    if (typeof window === 'undefined') return;

    let cleanup = null;
    try {
      const elements = document.querySelectorAll(selector);
      if (elements.length > 0) {
        cleanup = reveal(elements, {
          stagger: 70
        });
      }
    } catch (err) {
      console.warn('cube-motion reveal error:', err);
    }

    return () => {
      if (typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, [selector, ...deps]);
};
