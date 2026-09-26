import React, { useRef, useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const ReelShowcase = () => {
  const { isRtl } = useLanguage();
  const videoRef = useRef(null);
  const sectionRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { video.play().catch(() => {}); setPlaying(true); }
        else { video.pause(); setPlaying(false); }
      },
      { threshold: 0.3 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    if (videoRef.current) { videoRef.current.muted = !muted; setMuted(m => !m); }
  };
  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };

  return (
    <section
      ref={sectionRef}
      className="kz-reel-section kz-section"
      id="kz-reel"
      aria-label={isRtl ? 'مشاهد الهوائي على السيارات' : 'Antenna in the Wild — Real Vehicles'}
    >
      <div className="kz-container">

        {/* Section header */}
        <div className="kz-reel-header kz-reveal">
          <div className="kz-reel-eyebrow">
            <span className="kz-reel-dot" />
            {isRtl ? 'في الميدان الحقيقي' : 'In The Wild'}
          </div>
          <h2 className="kz-reel-title">
            {isRtl ? 'كازيز على السيارات الحقيقية' : 'Kazez on Real Vehicles'}
          </h2>
          <p className="kz-reel-sub">
            {isRtl
              ? 'شاهد هوائي كازيز مثبتًا على سيارات متعددة في الشارع والطريق السريع'
              : 'See how the Kazez antenna motor integrates seamlessly across different vehicle rooflines.'}
          </p>
        </div>

        {/* Stage — 3-column layout */}
        <div className="kz-reel-stage kz-reveal">

          {/* ── LEFT: Photo stack ── */}
          <div className="kz-reel-photo-stack">
            <div className="kz-reel-photo-card kz-reel-photo-card--top">
              <img
                src="/assets/images/products/bracket-jett2.webp"
                alt="Kazez bracket on Jetour T2 roof rail"
                loading="lazy"
              />
              <div className="kz-reel-photo-caption">
                <span className="kz-reel-photo-label">Jetour T2</span>
                <span className="kz-reel-photo-sku">THA-JETT2-RRB-BLK-KAZ</span>
              </div>
            </div>
            <div className="kz-reel-photo-card kz-reel-photo-card--bottom">
              <img
                src="/assets/images/products/bracket-jett2-02.webp"
                alt="Kazez bracket close-up on Jetour T2"
                loading="lazy"
              />
              <div className="kz-reel-photo-caption">
                <span className="kz-reel-photo-label">Thabt Bracket</span>
                <span className="kz-reel-photo-sku">Field Install</span>
              </div>
            </div>
            {/* Decorative mono watermark */}
            <div className="kz-reel-stack-watermark">FIELD CAPTURE · QATAR</div>
          </div>

          {/* ── CENTER: Phone frame ── */}
          <div className="kz-reel-phone-frame">
            <div className="kz-reel-grain" />
            <div className="kz-reel-vignette" />
            <video
              ref={videoRef}
              src="/assets/video/kazez-reel.mp4"
              loop
              muted
              playsInline
              autoPlay
              className="kz-reel-video"
            />
            <div className="kz-reel-badge-top">
              <span className="kz-reel-live-dot" />
              <span>{isRtl ? 'لقطة ميدانية' : 'FIELD CAPTURE'}</span>
            </div>
            <div className="kz-reel-controls">
              <div className="kz-reel-info">
                <span className="kz-reel-info-title">
                  {isRtl ? 'كازيز — محرك هوائي لاسلكي' : 'Kazez — RF Antenna Motor'}
                </span>
                <span className="kz-reel-info-sub">
                  {isRtl ? 'سيارات متعددة · قطر' : 'Multiple Vehicles · Qatar'}
                </span>
              </div>
              <div className="kz-reel-btn-group">
                <button className="kz-reel-ctrl-btn" onClick={togglePlay} aria-label={playing ? 'Pause' : 'Play'}>
                  {playing ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" rx="1"/>
                      <rect x="14" y="4" width="4" height="16" rx="1"/>
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5,3 19,12 5,21"/>
                    </svg>
                  )}
                </button>
                <button className="kz-reel-ctrl-btn" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'}>
                  {muted ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" stroke="none"/>
                      <line x1="23" y1="9" x2="17" y2="15"/>
                      <line x1="17" y1="9" x2="23" y2="15"/>
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M11 5L6 9H2v6h4l5 4V5z" fill="currentColor" stroke="none"/>
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Spec panel + product copy ── */}
          <div className="kz-reel-side-panel">

            {/* Spec grid */}
            <div className="kz-reel-spec-card">
              <div className="kz-reel-spec-item">
                <span className="kz-reel-spec-val">45 Nm</span>
                <span className="kz-reel-spec-label">{isRtl ? 'العزم الكوكبي' : 'Holding Torque'}</span>
              </div>
              <div className="kz-reel-spec-divider" />
              <div className="kz-reel-spec-item">
                <span className="kz-reel-spec-val">IP67</span>
                <span className="kz-reel-spec-label">{isRtl ? 'إحكام الغلق الصحراوي' : 'Hermetic Seal'}</span>
              </div>
              <div className="kz-reel-spec-divider" />
              <div className="kz-reel-spec-item">
                <span className="kz-reel-spec-val">433</span>
                <span className="kz-reel-spec-label">{isRtl ? 'ميغاهرتز RF' : 'MHz RF Remote'}</span>
              </div>
              <div className="kz-reel-spec-divider" />
              <div className="kz-reel-spec-item">
                <span className="kz-reel-spec-val">160</span>
                <span className="kz-reel-spec-label">{isRtl ? 'كم/س ثبات' : 'km/h Stable'}</span>
              </div>
            </div>

            {/* Vehicle compatibility note */}
            <div className="kz-reel-compat-note">
              <div className="kz-reel-compat-title">
                {isRtl ? 'يناسب 500+ موديل' : 'Fits 500+ Models'}
              </div>
              <p className="kz-reel-compat-body">
                {isRtl
                  ? 'من لاندكروزر إلى باترول — كل قاعدة تثبيت مصممة لسيارتك بدقة.'
                  : 'From Land Cruiser to Patrol. Every bracket precision-engineered for your exact roofline.'}
              </p>
              <div className="kz-reel-compat-makes">
                {['Toyota', 'Nissan', 'Lexus', 'GWM', 'Jetour', 'BYD'].map(m => (
                  <span key={m} className="kz-reel-make-chip">{m}</span>
                ))}
              </div>
            </div>

            {/* Mono tag */}
            <div className="kz-reel-mono-tag">
              KAZEZ · THABT · QATAR
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
