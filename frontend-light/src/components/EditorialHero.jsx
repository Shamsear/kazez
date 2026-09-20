import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Zap, Radio, Layers, Play, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PRODUCTS } from '../data/products';
import { PriceTag } from './PriceTag';

export const EditorialHero = ({ onSelectEdition, onExploreEditions }) => {
  const { t, isRtl } = useLanguage();
  const [activeEditionIndex, setActiveEditionIndex] = useState(0); // 0: Black, 1: Silver
  const [activeThumbIndex, setActiveThumbIndex] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  const currentProduct = PRODUCTS[activeEditionIndex] || PRODUCTS[0];
  const images = currentProduct.images || [];

  return (
    <section className="kz-hero-section">
      <div className="kz-container">
        <div className="kz-hero-grid">
          {/* Left Column: Architectural Typography & CTAs */}
          <div className="kz-reveal">
            <h1 className="kz-hero-h1">
              {t.hero.titleLine1}{' '}
              <span className="kz-hero-highlight kz-serif-accent">
                {t.hero.titleLine2}
              </span>
            </h1>

            <p className="kz-hero-lede">
              {t.hero.subtitle}
            </p>

            {/* Spec Badges */}
            <div className="kz-hero-chips">
              <span className="kz-hero-chip">
                <Layers size={14} color="var(--kz-crimson)" />
                <span>{t.hero.chip4 || '6061-T6 Billet Alloy'}</span>
              </span>
              <span className="kz-hero-chip">
                <ShieldCheck size={14} color="var(--kz-crimson)" />
                <span>{t.hero.chip1 || 'IP67 Hermetic Seal'}</span>
              </span>
              <span className="kz-hero-chip">
                <Zap size={14} color="var(--kz-crimson)" />
                <span>{t.hero.chip2 || '45 Nm Powertrain'}</span>
              </span>
              <span className="kz-hero-chip">
                <Radio size={14} color="var(--kz-crimson)" />
                <span>{t.hero.chip3 || '433 MHz Wireless RF'}</span>
              </span>
            </div>

            {/* Actions */}
            <div className="kz-hero-actions">
              <button
                type="button"
                className="kz-btn kz-btn-primary kz-btn-lg"
                onClick={() => onSelectEdition(currentProduct.slug)}
              >
                <span>{activeEditionIndex === 0 ? t.hero.btnBlack : t.hero.btnSilver}</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                className="kz-btn kz-btn-secondary kz-btn-lg"
                onClick={onExploreEditions}
              >
                <span>{isRtl ? 'استعراض الإصدارات' : 'Explore Editions'}</span>
              </button>

              <button
                type="button"
                className="kz-btn kz-btn-secondary kz-btn-lg"
                onClick={() => setVideoModalOpen(true)}
                title="Watch Field Performance Video"
                aria-label="Watch Field Video"
              >
                <Play size={16} fill="currentColor" />
                <span>{isRtl ? 'فيديو الأداء' : 'Film'}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Double-Bezel Architectural Visual Stage */}
          <div className="kz-reveal">
            <div className="kz-double-bezel">
              <div className="kz-double-bezel-inner">
                {/* Product Visual Stage */}
                <div
                  className="kz-hero-stage"
                  onClick={() => onSelectEdition(currentProduct.slug)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="kz-hero-badge-stock">
                    <CheckCircle2 size={13} color="#10B981" />
                    <span>{currentProduct.edition}</span>
                    <span style={{ color: 'var(--kz-text-muted)' }}>·</span>
                    <PriceTag amountInQar={currentProduct.price} />
                  </div>

                  <img
                    src={images[activeThumbIndex] || images[0]}
                    alt={currentProduct.name}
                    className="kz-hero-main-img"
                    loading="eager"
                  />
                </div>

                {/* Multi-Angle Thumbnails */}
                <div className="kz-hero-thumbs">
                  {images.slice(0, 4).map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`kz-hero-thumb-btn ${activeThumbIndex === idx ? 'active' : ''}`}
                      onClick={() => setActiveThumbIndex(idx)}
                      aria-label={`Angle view ${idx + 1}`}
                    >
                      <img src={img} alt={`View ${idx + 1}`} />
                    </button>
                  ))}
                </div>

                {/* Quick Edition Switcher Bar */}
                <div className="kz-hero-edition-switcher">
                  <button
                    type="button"
                    className={`kz-hero-edition-btn kz-edition-black ${activeEditionIndex === 0 ? 'active' : ''}`}
                    onClick={() => {
                      setActiveEditionIndex(0);
                      setActiveThumbIndex(0);
                    }}
                  >
                    <span className="kz-edition-dot" />
                    <span>{isRtl ? 'الإصدار الأسود' : 'Black Edition'}</span>
                  </button>

                  <button
                    type="button"
                    className={`kz-hero-edition-btn kz-edition-silver ${activeEditionIndex === 1 ? 'active' : ''}`}
                    onClick={() => {
                      setActiveEditionIndex(1);
                      setActiveThumbIndex(0);
                    }}
                  >
                    <span className="kz-edition-dot" />
                    <span>{isRtl ? 'الإصدار الفضي' : 'Silver Edition'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {videoModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(12px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '900px',
              aspectRatio: '16/9',
              background: '#000000',
              borderRadius: 'var(--kz-radius-lg)',
              overflow: 'hidden',
              boxShadow: 'var(--kz-shadow-floating)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src="/assets/video/kazez-video-2.mp4"
              controls
              autoPlay
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>
      )}
    </section>
  );
};
