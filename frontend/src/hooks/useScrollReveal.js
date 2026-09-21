import { useEffect } from 'react';
import { rise, leave, morph } from 'cube-motion';

export { rise, leave, morph };

// Global WeakSet to track all DOM nodes that have already performed their entrance animation
const revealedSet = new WeakSet();

/**
 * useScrollReveal powered by cube-motion (Web Animations API)
 * Ensures above-the-fold content paints instantly with 0ms lag,
 * while below-the-fold content reveals smoothly upon scroll.
 */
export const useScrollReveal = (selector = '.kz-reveal', deps = []) => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Use requestAnimationFrame so React finishes DOM commit before measuring
    const rafId = requestAnimationFrame(() => {
      const rawElements = Array.from(document.querySelectorAll(selector));
      const unrevealedElements = rawElements.filter(
        (el) => !revealedSet.has(el) && !el.classList.contains('kz-revealed')
      );

      if (unrevealedElements.length === 0) return;

      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 800;

      const elementsToObserve = [];

      unrevealedElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // If element is already in the viewport on initial load (above the fold)
        if (rect.top < viewportHeight * 0.92 && rect.bottom > 0) {
          el.style.removeProperty('opacity');
          el.style.opacity = '1';
          el.classList.add('kz-revealed', 'visible');
          revealedSet.add(el);
        } else {
          // Below the fold: hide and observe
          el.style.opacity = '0';
          elementsToObserve.push(el);
        }
      });

      if (elementsToObserve.length === 0) return;

      if (!('IntersectionObserver' in window)) {
        elementsToObserve.forEach((el) => {
          el.style.removeProperty('opacity');
          el.style.opacity = '1';
          el.classList.add('kz-revealed', 'visible');
          revealedSet.add(el);
        });
        return;
      }

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

              // Remove inline opacity: 0 before running rise()
              el.style.removeProperty('opacity');
              el.style.opacity = '1';

              const delay = staggerIdx * 50;
              staggerIdx++;
              clearTimeout(staggerTimer);
              staggerTimer = setTimeout(() => {
                staggerIdx = 0;
              }, 200);

              try {
                const animations = rise(el, { delay });
                animations.forEach((anim) => {
                  anim.finished.then(
                    () => {
                      el.style.removeProperty('opacity');
                      el.style.opacity = '1';
                    },
                    () => {
                      el.style.removeProperty('opacity');
                      el.style.opacity = '1';
                    }
                  );
                });
              } catch (err) {
                el.style.removeProperty('opacity');
                el.style.opacity = '1';
              }
            }
          });
        },
        {
          root: null,
          rootMargin: `0px 0px -${Math.max(20, Math.round(viewportHeight * 0.05))}px 0px`,
          threshold: 0.02
        }
      );

      elementsToObserve.forEach((el) => {
        if (!revealedSet.has(el)) {
          io.observe(el);
        }
      });
    });

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [selector, ...deps]);
};


