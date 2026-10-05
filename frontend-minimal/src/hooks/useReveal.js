import { useEffect } from 'react';

// Adds .is-in to .reveal elements the first time they enter the viewport.
export function useReveal(dep) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal:not(.is-in)'));
    if (!('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('is-in'));
      return undefined;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('is-in');
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    // Wait a frame so newly routed content is in the DOM.
    const id = requestAnimationFrame(() => {
      document.querySelectorAll('.reveal:not(.is-in)').forEach((el) => io.observe(el));
    });
    return () => { cancelAnimationFrame(id); io.disconnect(); };
  }, [dep]);
}
