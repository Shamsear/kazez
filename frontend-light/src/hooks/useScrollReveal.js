import { useEffect } from 'react';

export const useScrollReveal = (selector = '.kz-reveal', deps = []) => {
  useEffect(() => {
    // Small delay so React finishes rendering active view elements
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll(selector);
      if (!elements.length) return;

      if (!('IntersectionObserver' in window)) {
        elements.forEach((el) => {
          el.classList.add('visible', 'kz-revealed');
        });
        return;
      }

      // Check immediately for elements already in or near viewport
      const windowHeight = window.innerHeight;
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight - 30) {
          el.classList.add('visible', 'kz-revealed');
        }
      });

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible', 'kz-revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.08,
          rootMargin: '0px 0px -40px 0px'
        }
      );

      elements.forEach((el) => {
        if (!el.classList.contains('visible') && !el.classList.contains('kz-revealed')) {
          observer.observe(el);
        }
      });

      return () => {
        observer.disconnect();
      };
    }, 50);

    return () => clearTimeout(timer);
  }, [selector, ...deps]);
};
