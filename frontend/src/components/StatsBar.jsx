import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const StatsBar = () => {
  const { t } = useLanguage();
  useScrollReveal('.kz-stat-tile');

  return (
    <div className="kz-stats-strip">
      <div className="kz-container">
        <div className="kz-stats-grid">
          <div className="kz-stat-tile kz-reveal kz-delay-1">
            <div className="kz-stat-number">{t.stats.stat1Num}<span>{t.stats.stat1Unit}</span></div>
            <div className="kz-stat-label">{t.stats.stat1Label}</div>
          </div>
          <div className="kz-stat-tile kz-reveal kz-delay-2">
            <div className="kz-stat-number">{t.stats.stat2Num}</div>
            <div className="kz-stat-label">{t.stats.stat2Label}</div>
          </div>
          <div className="kz-stat-tile kz-reveal kz-delay-3">
            <div className="kz-stat-number">{t.stats.stat3Num}<span>{t.stats.stat3Unit}</span></div>
            <div className="kz-stat-label">{t.stats.stat3Label}</div>
          </div>
          <div className="kz-stat-tile kz-reveal kz-delay-4">
            <div className="kz-stat-number">{t.stats.stat4Num}<span>{t.stats.stat4Unit}</span></div>
            <div className="kz-stat-label">{t.stats.stat4Label}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
