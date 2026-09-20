import { useEffect } from 'react';

// Global velocity tracker shared across all reveal instances
let scrollVelocity = 0; // px/ms
let lastScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
let lastScrollTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
let decayTimer = null;
let isListenerActive = false;

function initVelocityTracker() {
  if (isListenerActive || typeof window === 'undefined') return;
  isListenerActive = true;

  const onScroll = () => {
    const now = performance.now();
    const elapsed = lastScrollTime ? now - lastScrollTime : 0;

    const currentY = window.scrollY;
    const dy = Math.abs(currentY - lastScrollY);

    // If starting a fresh gesture after being idle (> 260ms), compute impulse velocity based on physical onset time (~25ms)
    let instantVel;
    if (!lastScrollTime || elapsed > 260) {
      instantVel = dy / 25;
      scrollVelocity = instantVel;
    } else {
      const dt = Math.max(elapsed, 16); // Clamp to minimum 1 frame (16ms)
      instantVel = dy / dt; // pixels per millisecond
      // Exponential moving average for smooth, responsive velocity tracking
      scrollVelocity = scrollVelocity * 0.35 + instantVel * 0.65;
    }

    lastScrollY = currentY;
    lastScrollTime = now;

    // Calculate dynamic speed factor: 1.0 (normal) up to 3.5 (high-speed flick)
    const speedFactor = Math.min(Math.max(1 + (scrollVelocity - 0.5) * 0.8, 1), 3.5);
    document.documentElement.style.setProperty('--kz-scroll-speed', speedFactor.toFixed(2));

    clearTimeout(decayTimer);
    decayTimer = setTimeout(() => {
      scrollVelocity = 0;
      document.documentElement.style.setProperty('--kz-scroll-speed', '1');
    }, 240);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
}

export const useScrollReveal = (selector = '.kz-reveal', deps = []) => {
  useEffect(() => {
    initVelocityTracker();

    let observer = null;

    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(selector);
      if (!elements.length) return;

      if (!('IntersectionObserver' in window)) {
        elements.forEach((el) => el.classList.add('visible', 'kz-revealed'));
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Speed up animation dynamically according to scroll velocity:
              // Velocity <= 0.3 px/ms -> normal (~620ms, delayMult 1.0)
              // Velocity >= 1.8 px/ms -> fast pop (~180ms, delayMult 0.1)
              const factor = Math.min(Math.max((scrollVelocity - 0.3) / 1.5, 0), 1);
              const durationMs = Math.round(620 - factor * 440); // 620ms -> 180ms
              const delayMultiplier = +(1 - factor * 0.9).toFixed(2); // 1.0 -> 0.1

              entry.target.style.setProperty('--kz-reveal-dur', `${durationMs}ms`);
              entry.target.style.setProperty('--kz-reveal-delay-mult', `${delayMultiplier}`);

              if (factor > 0.4) {
                entry.target.classList.add('velocity-fast');
              } else if (factor > 0.12) {
                entry.target.classList.add('velocity-medium');
              }

              entry.target.classList.add('visible', 'kz-revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
          // Negative bottom margin ensures animation triggers ONLY when element is at least 60px inside the visible viewport
          rootMargin: '0px 0px -60px 0px'
        }
      );

      elements.forEach((el) => {
        if (!el.classList.contains('visible') && !el.classList.contains('kz-revealed')) {
          observer.observe(el);
        }
      });
    }, 50);

    return () => {
      clearTimeout(timer);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [selector, ...deps]);
};
