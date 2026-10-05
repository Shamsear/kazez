import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Plus,
  Minus,
  ChatCircleDots,
  Play,
  Pause,
  SpeakerHigh,
  SpeakerSlash
} from '@phosphor-icons/react';
import { Rise, Reveal } from 'cube-motion/react';
import { useLocale } from '../i18n/LocaleContext.jsx';
import { waLink } from '../data/shop.js';
import s from './Install.module.css';

function InstallVideoReel({ label }) {
  const { isRtl } = useLocale();
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return undefined;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          v.play().then(() => setPlaying(true)).catch(() => {});
        } else {
          v.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.25 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setPlaying(true)).catch(() => {});
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !muted;
    setMuted(!muted);
  };

  return (
    <div className={s.videoCard}>
      {/* Top Live Badge */}
      <div className={s.videoBadgeTop}>
        <span className={s.liveDot} />
        <span>{isRtl ? 'توثيق ميداني حي' : 'LIVE FIELD CAPTURE'}</span>
      </div>

      {/* Video without native controls */}
      <div className={s.videoStage} onClick={togglePlay}>
        <video
          ref={videoRef}
          src="/assets/video/kazez-reel.mp4"
          poster="/assets/video/install-poster.webp"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-label={label}
        />
        <div className={s.videoScrim} />
      </div>

      {/* Bottom Custom Minimalist Control Overlay */}
      <div className={s.videoControls}>
        <div className={s.videoInfo}>
          <p className={s.videoTitle}>
            {isRtl ? 'هوائي كازيز اللاسلكي' : 'Kazez Motorized Antenna'}
          </p>
          <p className={s.videoSubtitle}>
            {isRtl ? 'تركيب واختبار حقيقي في قطر' : 'Real Vehicle Field Demo · Qatar'}
          </p>
        </div>

        <div className={s.ctrlButtons}>
          <button
            type="button"
            className={s.ctrlBtn}
            onClick={togglePlay}
            aria-label={playing ? 'Pause' : 'Play'}
            title={playing ? 'Pause' : 'Play'}
          >
            {playing ? <Pause size={16} weight="fill" /> : <Play size={16} weight="fill" />}
          </button>
          <button
            type="button"
            className={s.ctrlBtn}
            onClick={toggleMute}
            aria-label={muted ? 'Unmute' : 'Mute'}
            title={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? <SpeakerSlash size={16} weight="fill" /> : <SpeakerHigh size={16} weight="fill" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Install() {
  const { t, pick } = useLocale();
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    document.title = `${t.install.title} | Kazez`;
  }, [t]);

  const toggleFaq = (idx) => {
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <div className="container section">
      <Rise className={s.head}>
        <h1 className="h1">{t.install.title}</h1>
        <p className="lede">{t.install.sub}</p>
      </Rise>

      {/* Grid: 4 Steps on Left, Video on Right */}
      <div className={s.stepsLayout}>
        <Rise as="div" targets="children" className={s.stepsList}>
          {t.install.steps.map((step, idx) => (
            <div key={idx} className={s.stepCard}>
              <div className={s.stepIndex}>
                <span>0{idx + 1}</span>
              </div>
              <div className={s.stepContent}>
                <h3 className="h3">{step.t}</h3>
                <p className="body">{step.d}</p>
              </div>
            </div>
          ))}
        </Rise>

        {/* Video Column */}
        <Rise delay={120} className={s.videoColumn}>
          <InstallVideoReel label={t.install.videoLabel} />
        </Rise>
      </div>

      {/* FAQ Section */}
      <Reveal className={s.faqSection}>
        <h2 className="h2">{t.install.faqTitle}</h2>
        <div className={s.faqList}>
          {t.install.faq.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className={s.faqItem}>
                <button
                  type="button"
                  className={s.faqQuestion}
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                >
                  <span className={s.questionText}>{item.q}</span>
                  <span className={s.toggleIcon}>
                    {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                  </span>
                </button>
                {isOpen && (
                  <div className={s.faqAnswer}>
                    <p className="body">{item.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Reveal>

      {/* Assistance Card */}
      <Reveal className={s.helpCard}>
        <ChatCircleDots size={32} className={s.helpIcon} />
        <div>
          <h3 className="h3">{t.install.helpTitle}</h3>
          <p className="body">{t.install.helpBody}</p>
        </div>
        <a
          href={waLink('Installation support enquiry')}
          target="_blank"
          rel="noreferrer"
          className="btn btn-primary"
        >
          {t.common.whatsapp} <ArrowRight size={16} className="flip" />
        </a>
      </Reveal>
    </div>
  );
}
