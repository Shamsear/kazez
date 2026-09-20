import { useEffect } from 'react';
import { rise, leave, morph } from 'cube-motion';

export { rise, leave, morph };

// Global WeakSet to track all DOM nodes that have already performed their entrance animation
const revealedSet = new WeakSet();

/**
 * useScrollReveal powered by cube-motion (Web Animations API)
 * Ensures elements reveal exactly ONCE and never re-hide or flicker on scroll/re-renders.
 */
export const useScrollReveal = (selector = '.kz-reveal', deps = []) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Select only elements that have NOT been revealed yet
    const rawElements = Array.from(document.querySelectorAll(selector));
    const elementsToObserve = rawElements.filter(
      (el) => !revealedSet.has(el) && !el.classList.contains('kz-revealed')
    );

    if (elementsToObserve.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      elementsToObserve.forEach((el) => {
        el.style.opacity = '1';
        el.classList.add('kz-revealed', 'visible');
        revealedSet.add(el);
      });
      return;
    }

    // Hide only fresh, unrevealed elements
    elementsToObserve.forEach((el) => {
      el.style.opacity = '0';
    });

    let staggerIdx = 0;
    let staggerTimer = null;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !revealedSet.has(entry.target)) {
            const el = entry.target;
            revealedSet.add(el);
            el.classList.add('kz-revealed', 'visible');
            io.unobserve(el);

            const delay = staggerIdx * 60;
            staggerIdx++;
            clearTimeout(staggerTimer);
            staggerTimer = setTimeout(() => {
              staggerIdx = 0;
            }, 240);

            // Trigger cube-motion rise WAAPI animation
            try {
              const animations = rise(el, { delay });
              animations.forEach((anim) => {
                anim.finished.then(
                  () => {
                    el.style.opacity = '1';
                  },
                  () => {
                    el.style.opacity = '1';
                  }
                );
              });
            } catch (err) {
              el.style.opacity = '1';
            }
          }
        });
      },
      {
        root: null,
        // Inset 8% from bottom so animation starts clearly inside viewport
        rootMargin: `0px 0px -${Math.max(40, Math.round(window.innerHeight * 0.08))}px 0px`,
        threshold: 0.05
      }
    );

    elementsToObserve.forEach((el) => {
      if (!revealedSet.has(el)) {
        io.observe(el);
      }
    });

    return () => {
      io.disconnect();
      clearTimeout(staggerTimer);
      // Cleanly unobserve without resetting opacity of already revealed elements
    };
  }, [selector, ...deps]);
};
