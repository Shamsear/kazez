import React from 'react';
import { useLanguage } from '../context/LanguageContext';

export const Marquee = () => {
  const { t } = useLanguage();

  const items = [
    t.marquee.item1,
    t.marquee.item2,
    t.marquee.item3,
    t.marquee.item4,
    t.marquee.item5,
    t.marquee.item6
  ];

  return (
    <div className="kz-telemetry-banner kz-marquee-banner" role="region" aria-label="Engineering Highlights">
      <div className="kz-marquee-track">
        <div className="kz-marquee-group">
          {items.map((item, index) => (
            <div key={`m1-${index}`} className="kz-telemetry-item kz-marquee-item">
              <span className="kz-telemetry-bullet kz-marquee-bullet" />
              <span className="kz-telemetry-text">{item}</span>
            </div>
          ))}
        </div>
        <div className="kz-marquee-group" aria-hidden="true">
          {items.map((item, index) => (
            <div key={`m2-${index}`} className="kz-telemetry-item kz-marquee-item">
              <span className="kz-telemetry-bullet kz-marquee-bullet" />
              <span className="kz-telemetry-text">{item}</span>
            </div>
          ))}
        </div>
        <div className="kz-marquee-group" aria-hidden="true">
          {items.map((item, index) => (
            <div key={`m3-${index}`} className="kz-telemetry-item kz-marquee-item">
              <span className="kz-telemetry-bullet kz-marquee-bullet" />
              <span className="kz-telemetry-text">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
