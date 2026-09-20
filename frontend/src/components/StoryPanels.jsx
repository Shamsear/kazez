import React from 'react';
import { Shield, Zap, Wind, Droplets } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const StoryPanels = () => {
  const { t, isRtl } = useLanguage();
  useScrollReveal('.kz-story-row');

  return (
    <div className="kz-story-container">
      {/* Panel 01: Construction */}
      <div className="kz-story-row kz-reveal">
        <div className="kz-story-img-pane">
          <img src="/assets/images/story-construction.webp" alt="Forged Chrome Housing Construction" loading="lazy" />
        </div>
        <div className="kz-story-text-pane">
          <h2 className="kz-hero-title kz-story-title">
            {t.story.spec1Title1}<br />
            <span style={{ color: 'var(--kz-racing-red)' }}>{t.story.spec1Title2}</span>
          </h2>
          <p className="kz-story-desc">
            {t.story.spec1Desc}
          </p>

          <div className="kz-story-spec-grid">
            <div className="kz-story-spec-card">
              <div className="kz-story-spec-icon-wrap">
                <Shield size={20} className="kz-story-spec-icon" />
              </div>
              <div className="kz-story-spec-title">{t.story.spec1Card1Title}</div>
              <div className="kz-story-spec-sub">{t.story.spec1Card1Desc}</div>
            </div>
            <div className="kz-story-spec-card">
              <div className="kz-story-spec-icon-wrap">
                <Droplets size={20} className="kz-story-spec-icon" />
              </div>
              <div className="kz-story-spec-title">{t.story.spec1Card2Title}</div>
              <div className="kz-story-spec-sub">{t.story.spec1Card2Desc}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Panel 02: Performance */}
      <div className="kz-story-row kz-reveal">
        <div className="kz-story-text-pane" style={{ order: isRtl ? 2 : 1 }}>
          <h2 className="kz-hero-title kz-story-title">
            {t.story.spec2Title1}<br />
            <span style={{ color: 'var(--kz-racing-red)' }}>{t.story.spec2Title2}</span>
          </h2>
          <p className="kz-story-desc">
            {t.story.spec2Desc}
          </p>

          <div className="kz-story-spec-grid">
            <div className="kz-story-spec-card">
              <div className="kz-story-spec-icon-wrap">
                <Wind size={20} className="kz-story-spec-icon" />
              </div>
              <div className="kz-story-spec-title">{t.story.spec2Card1Title}</div>
              <div className="kz-story-spec-sub">{t.story.spec2Card1Desc}</div>
            </div>
            <div className="kz-story-spec-card">
              <div className="kz-story-spec-icon-wrap">
                <Zap size={20} className="kz-story-spec-icon" />
              </div>
              <div className="kz-story-spec-title">{t.story.spec2Card2Title}</div>
              <div className="kz-story-spec-sub">{t.story.spec2Card2Desc}</div>
            </div>
          </div>
        </div>

        <div className="kz-story-img-pane" style={{ order: isRtl ? 1 : 2 }}>
          <img src="/assets/images/story-performance.webp" alt="High speed antenna motor performance" loading="lazy" />
        </div>
      </div>
    </div>
  );
};
