import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUp, ArrowDown, Pause, Play } from '@phosphor-icons/react';
import { Rise, Reveal } from 'cube-motion/react';
import { useLocale } from '../i18n/LocaleContext.jsx';
import { MOTOR, FINISH_KEYS, SPEC_GROUPS } from '../data/motor.js';
import { FITMENT } from '../data/fitment.js';
import { FitStrip } from '../components/FitStrip.jsx';
import { SpecSheet, Price, NumFlow } from '../components/Bits.jsx';
import s from './Home.module.css';

function FoldFilm({ label }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return undefined;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return undefined;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) v.play().then(() => setPlaying(true)).catch(() => {});
      else { v.pause(); setPlaying(false); }
    }, { threshold: 0.4 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().then(() => setPlaying(true)).catch(() => {});
    else { v.pause(); setPlaying(false); }
  };

  return (
    <figure className={s.film}>
      <video
        ref={ref}
        src="/assets/video/fold.mp4"
        poster="/assets/video/fold-poster.webp"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-label={label}
        onClick={toggle}
      />
      <button
        type="button"
        className={s.filmBtn}
        onClick={toggle}
        aria-pressed={playing}
        title={playing ? 'Pause' : 'Play'}
      >
        {playing ? <Pause size={16} weight="fill" /> : <Play size={16} weight="fill" />}
        <span className="visually-hidden">{playing ? 'Pause' : 'Play'}</span>
      </button>
    </figure>
  );
}

export default function Home() {
  const { t, pick, price } = useLocale();
  const [line1, line2] = t.home.title.split('\n');

  useEffect(() => { document.title = 'Kazez Antenna Motor'; }, []);

  return (
    <>
      {/* 1. Hero */}
      <section className={`container ${s.hero}`}>
        <Rise targets="children" className={s.heroText}>
          <h1 className="display">
            <span className={s.line}>{line1}</span>
            <span className={s.line}>{line2}</span>
          </h1>
          <p className="lede">{t.home.sub}</p>
          <div className={s.actions}>
            <Link to="/fit" className="btn btn-primary">{t.common.fit}</Link>
            <Link to="/motor" className="link">
              {t.common.shopMotor} <ArrowRight size={16} className="flip" />
            </Link>
          </div>
          <p className="small">{t.home.priceLine}</p>
        </Rise>
        <Rise delay={120} className={s.heroMedia}>
          <img
            src="/assets/images/hero-installed.webp"
            alt={t.home.heroAlt}
            width="1600"
            height="1600"
            fetchpriority="high"
          />
        </Rise>
      </section>

      {/* 2. Fitment strip */}
      <FitStrip />

      {/* 3. The fold */}
      <section className={`container section ${s.fold}`}>
        <Reveal>
          <FoldFilm label={t.home.videoLabel} />
        </Reveal>
        <Reveal className={s.foldText}>
          <h2 className="h2">{t.home.foldTitle}</h2>
          <p className="body">{t.home.foldBody}</p>
          <dl className={s.states}>
            <div className={s.state}>
              <dt><span className={s.key} aria-hidden="true"><ArrowUp size={18} weight="bold" /></span>{t.home.raise}</dt>
              <dd>{t.home.raiseBody}</dd>
            </div>
            <div className={s.state}>
              <dt><span className={s.key} aria-hidden="true"><ArrowDown size={18} weight="bold" /></span>{t.home.fold}</dt>
              <dd>{t.home.foldShort}</dd>
            </div>
          </dl>
          <p className="small">{t.home.control}</p>
        </Reveal>
      </section>

      {/* 4. Two finishes */}
      <section className={`section ${s.finishes}`}>
        <div className="container">
          <Reveal>
            <h2 className={`h2 ${s.finishTitle}`}>{t.home.finishesTitle}</h2>
          </Reveal>
          <Reveal targets="children" className={s.pair}>
            {FINISH_KEYS.map((k) => {
              const f = MOTOR.finishes[k];
              return (
                <Link key={k} to={`/motor?finish=${k}`} className={s.finishCard}>
                  <div className={s.stage}>
                    <img src={f.images[0]} alt={`${pick(MOTOR.name)}, ${pick(f.label)}`} loading="lazy" />
                  </div>
                  <div className={s.finishMeta}>
                    <div>
                      <p className={s.finishName}>{pick(f.label)}</p>
                      <p className="small">{pick(f.detail)}</p>
                    </div>
                    <Price qar={MOTOR.price} className={`${s.finishPrice} num`} />
                  </div>
                  <span className={s.choose}>
                    {t.home.choose} {pick(f.label)} <ArrowRight size={16} className="flip" />
                  </span>
                </Link>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* 5. Specs */}
      <section className={`container section ${s.spec}`}>
        <Reveal className={s.specHead}>
          <h2 className="h2">{t.home.specTitle}</h2>
          <img className={s.specImg} src="/assets/images/motor-silver-rear.webp" alt="" loading="lazy" />
        </Reveal>
        <Reveal>
          <SpecSheet groups={SPEC_GROUPS} />
        </Reveal>
      </section>

      {/* 6. Works on */}
      <section className={`section ${s.works}`}>
        <div className="container">
          <Reveal>
            <h2 className="h2">{t.home.worksTitle}</h2>
          </Reveal>
          <Reveal as="ul" targets="children" className={s.makes}>
            {FITMENT.filter((m) => m.make !== 'Universal').map((m) => (
              <li key={m.slug}>
                <Link to={`/fit/${m.slug}`} className={s.make}>
                  <span className={s.makeName}>{pick(m.name)}</span>
                  <span className={`${s.makeCount} num`}>
                    <NumFlow value={m.models.length} /> {m.models.length === 1 ? t.home.model1 : t.home.models}
                  </span>
                </Link>
              </li>
            ))}
          </Reveal>
          <Reveal className={s.worksOther}>
            <Link to="/fit/universal" className="link">{t.home.worksOther} <ArrowRight size={16} className="flip" /></Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
