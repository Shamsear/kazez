import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Check, ShieldCheck, Truck, ArrowRight, Wrench } from '@phosphor-icons/react';
import { Rise, Reveal } from 'cube-motion/react';
import { useLocale } from '../i18n/LocaleContext.jsx';
import { useShop, motorLine, bracketLine } from '../state/ShopContext.jsx';
import { MOTOR, FINISH_KEYS, SPEC_GROUPS, IN_THE_BOX } from '../data/motor.js';
import { findModel, findMake } from '../data/fitment.js';
import { Qty, FinishToggle, SpecSheet, Price } from '../components/Bits.jsx';
import s from './Motor.module.css';

export default function Motor() {
  const [searchParams, setSearchParams] = useSearchParams();
  const finishParam = searchParams.get('finish');
  const initialFinish = finishParam && MOTOR.finishes[finishParam] ? finishParam : 'black';

  const [activeFinish, setActiveFinish] = useState(initialFinish);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [includeBracket, setIncludeBracket] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const { t, pick, price } = useLocale();
  const { add, vehicle } = useShop();

  // Sync state with URL params
  useEffect(() => {
    if (finishParam && MOTOR.finishes[finishParam] && finishParam !== activeFinish) {
      setActiveFinish(finishParam);
      setActiveImageIdx(0);
    }
  }, [finishParam, activeFinish]);

  const handleFinishChange = (key) => {
    setActiveFinish(key);
    setActiveImageIdx(0);
    setSearchParams({ finish: key });
  };

  const currentFinishObj = MOTOR.finishes[activeFinish];
  const images = currentFinishObj.images;

  // Retrieve remembered vehicle bracket if available
  const rememberedMake = vehicle ? findMake(vehicle.make) : null;
  const rememberedModel = vehicle ? findModel(vehicle.make, vehicle.model) : null;
  const matchedBracket = rememberedModel?.brackets?.[0] || null;

  useEffect(() => {
    document.title = `${pick(MOTOR.name)} (${pick(currentFinishObj.label)}) | Kazez`;
  }, [activeFinish, currentFinishObj, pick]);

  const handleAddToCart = () => {
    const motorItem = motorLine(activeFinish);
    if (matchedBracket && includeBracket) {
      const bracketItem = bracketLine(matchedBracket);
      add([motorItem, bracketItem], { open: true, qty: quantity });
    } else {
      add(motorItem, { open: true, qty: quantity });
    }
  };

  const motorPriceTotal = MOTOR.price * quantity;
  const bracketPriceTotal = matchedBracket && includeBracket ? matchedBracket.price * quantity : 0;
  const grandTotal = motorPriceTotal + bracketPriceTotal;

  const finishesList = FINISH_KEYS.map((k) => MOTOR.finishes[k]);

  return (
    <div className="container section">
      <div className={s.pdpLayout}>
        {/* Gallery */}
        <Rise className={s.gallery}>
          <div className={s.stage}>
            <img
              key={`${activeFinish}-${activeImageIdx}`}
              src={images[activeImageIdx] || images[0]}
              alt={`${pick(MOTOR.name)} - ${pick(currentFinishObj.label)}`}
            />
          </div>
          <div className={s.thumbs}>
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                className={`${s.thumb} ${activeImageIdx === idx ? s.thumbActive : ''}`}
                onClick={() => setActiveImageIdx(idx)}
                aria-label={`${t.motor.view} ${idx + 1}`}
              >
                <img src={img} alt="" />
              </button>
            ))}
          </div>
        </Rise>

        {/* Purchase & Info Column */}
        <Rise delay={100} className={s.details}>
          <div className={s.titleGroup}>
            <h1 className="h1">{pick(MOTOR.name)}</h1>
            <div className={s.priceRow}>
              <Price qar={MOTOR.price} className={`${s.price} num`} />
              <span className="small">{t.common.each}</span>
            </div>
          </div>

          <p className="body">{pick(MOTOR.description)}</p>

          {/* Finish selector */}
          <div className={s.sectionDivider}>
            <FinishToggle
              finishes={finishesList}
              value={activeFinish}
              onChange={handleFinishChange}
              legend={t.motor.finish}
            />
          </div>

          {/* Matched Bracket Strip */}
          <div className={s.bracketMatcher}>
            {matchedBracket ? (
              <label className={s.bracketOption}>
                <input
                  type="checkbox"
                  checked={includeBracket}
                  onChange={(e) => setIncludeBracket(e.target.checked)}
                />
                <div className={s.bracketOptionInfo}>
                  <span className={s.bracketOptionTitle}>
                    <span>{t.motor.matched} {rememberedModel.name}: {pick(matchedBracket.mount)} (+</span>
                    <Price qar={matchedBracket.price} />
                    <span>)</span>
                  </span>
                  <span className="small">{pick(matchedBracket.note)}</span>
                </div>
              </label>
            ) : (
              <div className={s.noVehicleMatched}>
                <Wrench size={20} className={s.matcherIcon} />
                <div>
                  <p className={s.matcherPrompt}>{t.motor.checkFit}</p>
                  <Link to="/fit" className="link">
                    {t.common.fit} <ArrowRight size={14} className="flip" />
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Quantity and Add to Cart */}
          <div className={s.purchaseRow}>
            <div className="field">
              <label className="field-label">{t.common.qty}</label>
              <Qty value={quantity} onChange={setQuantity} min={1} max={20} />
            </div>

            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={handleAddToCart}
            >
              <span>{t.common.addToCart} • </span>
              <Price qar={grandTotal} />
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className={s.guarantees}>
            <div className={s.guaranteeItem}>
              <Truck size={18} />
              <span>{t.motor.ship}</span>
            </div>
            <div className={s.guaranteeItem}>
              <ShieldCheck size={18} />
              <span>{t.motor.warranty}</span>
            </div>
            <div className={s.guaranteeItem}>
              <Check size={18} />
              <span>{t.motor.pay}</span>
            </div>
          </div>

          {/* What's In the Box */}
          <div className={s.inBoxSection}>
            <h3 className="h3">{t.motor.inBox}</h3>
            <ul className={s.inBoxList}>
              {IN_THE_BOX.map((item, i) => (
                <li key={i} className={s.inBoxItem}>
                  <Check size={16} className={s.inBoxCheck} />
                  <span>{pick(item)}</span>
                </li>
              ))}
            </ul>
          </div>
        </Rise>
      </div>

      {/* Specifications Section */}
      <Reveal className={s.specsContainer}>
        <h2 className="h2">{t.motor.specs}</h2>
        <SpecSheet groups={SPEC_GROUPS} />
      </Reveal>
    </div>
  );
}
