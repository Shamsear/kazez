import React, { useRef, useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useVideoParallax } from '../hooks/useVideoParallax';
import { useLanguage } from '../context/LanguageContext';
import { PriceTag } from './PriceTag';

export const VideoHero = ({ onExploreProducts, onSelectEdition }) => {
  const { t, isRtl } = useLanguage();
  const videoRef = useRef(null);
  const overlayRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useVideoParallax(videoRef, overlayRef);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section className="kz-hero" id="kz-hero">
      {/* Video layer */}
      <div className="kz-hero-video-wrap">
        <video
          ref={videoRef}
          className={`kz-hero-video ${videoLoaded ? 'ready' : ''}`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onLoadedData={() => setVideoLoaded(true)}
          poster="/assets/images/story-performance.webp"
        >
          <source src="/assets/video/kazez-video-2.mp4" type="video/mp4" />
        </video>
        <div ref={overlayRef} className="kz-hero-overlay" />
        <div className="kz-hero-bottom-fade" />
      </div>

      {/* Video controls */}
      <div className="kz-hero-video-controls">
        <button type="button" className="kz-control-pill" onClick={togglePlay} aria-label={isPlaying ? 'Pause Video' : 'Play Video'}>
          {isPlaying ? <Pause size={12} /> : <Play size={12} />}
          <span>{isPlaying ? t.hero.pause : t.hero.play}</span>
        </button>
        <button type="button" className="kz-control-pill" onClick={toggleMute} aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}>
          {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
          <span>{isMuted ? t.hero.muted : t.hero.audio}</span>
        </button>
      </div>

      {/* Hero content */}
      <div className="kz-container">
        <div className="kz-hero-content">

          <h1 className={`kz-hero-title kz-hero-anim-title ${isMounted ? 'mounted' : ''}`}>
            {t.hero.titleLine1}<br />
            <span style={{ color: 'var(--kz-racing-red)' }}>{t.hero.titleLine2}</span>
          </h1>

          <p className={`kz-hero-sub kz-hero-anim-sub ${isMounted ? 'mounted' : ''}`}>
            {t.hero.subtitle}
          </p>

          <div className={`kz-hero-price-row kz-hero-anim-price ${isMounted ? 'mounted' : ''}`}>
            <PriceTag amount={350} size="hero" />
            <div className="kz-hero-price-cur">{t.hero.stockTag}</div>
          </div>

          <div className={`kz-hero-chips kz-hero-anim-chips ${isMounted ? 'mounted' : ''}`}>
            <span className="kz-chip">{t.hero.chip1}</span>
            <span className="kz-chip">{t.hero.chip2}</span>
            <span className="kz-chip">{t.hero.chip3}</span>
            <span className="kz-chip">{t.hero.chip4}</span>
          </div>

          <div className={`kz-hero-cta-group kz-hero-anim-cta ${isMounted ? 'mounted' : ''}`}>
            <button type="button" className="kz-btn kz-btn-primary kz-btn-island" onClick={onExploreProducts}>
              <span>{t.hero.btnEditions}</span>
              <span className="kz-btn-island-icon">
                {isRtl ? '←' : '→'}
              </span>
            </button>
            <div className="kz-hero-edition-pills">
              <button
                type="button"
                className="kz-hero-pill-btn"
                onClick={() => onSelectEdition && onSelectEdition('kazez-black')}
                aria-label={t.hero.btnBlack}
              >
                <span className="kz-pill-dot black" />
                <span>{t.hero.btnBlack}</span>
              </button>
              <button
                type="button"
                className="kz-hero-pill-btn"
                onClick={() => onSelectEdition && onSelectEdition('kazez-silver')}
                aria-label={t.hero.btnSilver}
              >
                <span className="kz-pill-dot silver" />
                <span>{t.hero.btnSilver}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
