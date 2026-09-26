import React, { useRef, useEffect } from 'react';
import { Radio } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const CinematicVideoShowcase = () => {
  const { isRtl } = useLanguage();
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section 
      className="kz-cinematic-section kz-cinematic-blended" 
      id="kz-field-film"
      aria-label={isRtl ? 'التوثيق الميداني الصحراوي' : 'Field Validation Desert Dune Testing'}
    >
      <div className="kz-container">
        {/* Double-Bezel Architectural Hardware Frame */}
        <div className="kz-cinema-bezel-outer kz-reveal">
          <div className="kz-cinema-stage-inner">
            {/* Ambient Background Video Runner */}
            <video
              ref={videoRef}
              src="/assets/video/kazez-video-2.mp4"
              loop
              muted
              playsInline
              autoPlay
              className="kz-cinematic-bg-video"
            />

            {/* Cinematic Scrim Gradient Overlays */}
            <div className="kz-cinematic-overlay-scrim" />
            <div className="kz-cinematic-vignette" />

            {/* Top Corner Telemetry Watermark */}
            <div className="kz-cinema-watermark-top">
              <span className="kz-cinema-pulse-dot" />
              <span className="kz-cinema-watermark-text">
                {isRtl ? 'توثيق حي // كثبان سيلين' : 'LIVE CAPTURE // SEALINE DUNES'}
              </span>
            </div>

            {/* Center Editorial Headline */}
            <div className="kz-cinematic-runner-content">
              <div className="kz-cinematic-runner-inner">
                <div className="kz-cinematic-badge">
                  <Radio size={13} className="kz-pulse-subtle" />
                  <span>{isRtl ? 'الأداء الميداني والصحراوي' : 'Field Validation Telemetry'}</span>
                </div>
                <h2 className="kz-cinematic-title">
                  {isRtl ? 'الهندسة أثناء الحركة: اختبارات الكثبان والراليات' : 'Engineering in Motion: Desert Dune Testing'}
                </h2>
                <p className="kz-cinematic-sub">
                  {isRtl 
                    ? 'شاهد مشغل هوائي كازيز أثناء القيادة فوق كثبان سيلين وخور العديد — عزم تثبيت 45 ن.م وصفر اهتزاز على سرعات 160 كم/س.'
                    : 'Witness the 45 Nm planetary powertrain and hermetic IP67 seal in action across Qatar’s extreme desert terrain.'}
                </p>
              </div>
            </div>

            {/* Bottom Subtle Telemetry Spec Watermark */}
            <div className="kz-cinema-watermark-bottom">
              <span>{isRtl ? 'عزم كوكبي 45 نيوتن متر' : '45 Nm Planetary Powertrain'}</span>
              <span className="kz-watermark-sep">·</span>
              <span>{isRtl ? 'عزل صحراوي IP67' : 'IP67 Desert Seal'}</span>
              <span className="kz-watermark-sep">·</span>
              <span>{isRtl ? 'سبيكة ألمنيوم 6061-T6' : '6061-T6 Billet Alloy'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
