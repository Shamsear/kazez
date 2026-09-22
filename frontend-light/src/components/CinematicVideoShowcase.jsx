import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Radio, 
  Zap, 
  ShieldCheck, 
  Sparkles,
  Compass
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const CinematicVideoShowcase = () => {
  const { isRtl } = useLanguage();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay may be constrained without user interaction
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    } else if (videoRef.current.webkitRequestFullscreen) {
      videoRef.current.webkitRequestFullscreen();
    }
  };

  return (
    <section className="kz-section kz-cinematic-section" id="kz-field-film">
      <div className="kz-container">
        {/* Section Header */}
        <div className="kz-section-head kz-reveal">
          <div className="kz-badge-accent">
            <Radio size={13} />
            <span>{isRtl ? 'الأداء الميداني والصحراوي' : 'Field Validation Telemetry'}</span>
          </div>
          <h2 className="kz-section-title">
            {isRtl ? 'الهندسة أثناء الحركة: اختبارات الكثبان والراليات' : 'Engineering in Motion: Desert Dune Testing'}
          </h2>
          <p className="kz-section-sub">
            {isRtl 
              ? 'شاهد مشغل هوائي كازيز أثناء القيادة فوق كثبان سيلين وخور العديد — عزم تثبيت 45 ن.م وصفر اهتزاز على سرعات 160 كم/س.'
              : 'Witness the 45 Nm planetary powertrain and hermetic IP67 seal in action across Qatar’s extreme desert terrain.'}
          </p>
        </div>

        {/* Double-Bezel Architectural Widescreen Theater */}
        <div className="kz-reveal kz-delay-1">
          <div 
            className="kz-double-bezel kz-video-theater-bezel"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="kz-double-bezel-inner kz-video-theater-inner">
              <div className="kz-video-theater-stage">
                {/* Widescreen Video Player */}
                <video
                  ref={videoRef}
                  src="/assets/video/kazez-video-2.mp4"
                  loop
                  muted={isMuted}
                  playsInline
                  autoPlay
                  className="kz-theater-video-element"
                  onClick={togglePlay}
                />

                {/* Ambient Top Tag */}
                <div className="kz-theater-top-badge">
                  <span className="kz-rec-pulse" />
                  <span className="kz-theater-tag-text">
                    {isRtl ? 'توثيق ميداني حي // قطر' : 'FIELD CAPTURE // QATAR'}
                  </span>
                </div>

                {/* Floating Liquid Glass Control Bar */}
                <div className={`kz-theater-controls-bar ${isHovered || !isPlaying ? 'visible' : ''}`}>
                  <div className="kz-theater-controls-left">
                    <button
                      type="button"
                      className="kz-theater-btn"
                      onClick={togglePlay}
                      aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? <Pause size={16} /> : <Play size={16} fill="currentColor" />}
                    </button>

                    <button
                      type="button"
                      className={`kz-theater-btn ${!isMuted ? 'active-audio' : ''}`}
                      onClick={toggleMute}
                      aria-label={isMuted ? 'Unmute Sound' : 'Mute Sound'}
                      title={isMuted ? 'Unmute Sound' : 'Mute'}
                    >
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                      <span className="kz-audio-label">
                        {isMuted ? (isRtl ? 'تشغيل الصوت' : 'Unmute') : (isRtl ? 'مكتوم' : 'Audio On')}
                      </span>
                    </button>
                  </div>

                  <div className="kz-theater-controls-right">
                    <button
                      type="button"
                      className="kz-theater-btn"
                      onClick={handleFullscreen}
                      aria-label="Fullscreen"
                      title="Fullscreen"
                    >
                      <Maximize size={15} />
                    </button>
                  </div>
                </div>

                {/* Play Button Overlay if Paused */}
                {!isPlaying && (
                  <button 
                    type="button" 
                    className="kz-theater-play-overlay" 
                    onClick={togglePlay}
                    aria-label="Play Video"
                  >
                    <div className="kz-theater-play-pill">
                      <Play size={24} fill="currentColor" />
                    </div>
                  </button>
                )}
              </div>

              {/* Bottom Field Telemetry Strip */}
              <div className="kz-theater-footer-strip">
                <div className="kz-theater-caption">
                  <Compass size={16} color="var(--kz-crimson)" />
                  <span>
                    {isRtl
                      ? 'موقع الاختبار: كثبان سيلين وخور العديد — سرعة الرياح: 45 عقدة — ثبات تام للهوائي'
                      : 'Testing Locus: Sealine & Inland Sea Dunes · Desert Turbulence: 45 kts · 0 dB RF Loss'}
                  </span>
                </div>

                <div className="kz-theater-chips">
                  <span className="kz-theater-chip">
                    <Zap size={13} color="var(--kz-crimson)" />
                    <span>45 Nm Powertrain</span>
                  </span>
                  <span className="kz-theater-chip">
                    <ShieldCheck size={13} color="var(--kz-crimson)" />
                    <span>IP67 Hermetic Seal</span>
                  </span>
                  <span className="kz-theater-chip">
                    <Sparkles size={13} color="var(--kz-crimson)" />
                    <span>160 km/h Anti-Flutter</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
