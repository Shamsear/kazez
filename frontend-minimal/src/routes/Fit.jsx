import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Check, Copy, Wrench, ShieldCheck, Clock } from '@phosphor-icons/react';
import { Rise, Morph } from 'cube-motion/react';
import { useLocale } from '../i18n/LocaleContext.jsx';
import { useShop, motorLine, bracketLine } from '../state/ShopContext.jsx';
import { FITMENT, findMake, findModel, UNIVERSAL } from '../data/fitment.js';
import { MOTOR, FINISH_KEYS } from '../data/motor.js';
import { Qty, FinishToggle, Price } from '../components/Bits.jsx';
import { waLink } from '../data/shop.js';
import s from './Fit.module.css';

export default function Fit() {
  const { make: makeParam, model: modelParam } = useParams();
  const navigate = useNavigate();
  const { t, pick, price } = useLocale();
  const { add, setVehicle } = useShop();

  const [selectedFinish, setSelectedFinish] = useState('black');
  const [copiedSku, setCopiedSku] = useState(null);
  const [selectedBracketId, setSelectedBracketId] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const activeMake = makeParam ? findMake(makeParam) : null;
  const activeModel = makeParam && modelParam ? findModel(makeParam, modelParam) : null;

  // Auto-select bracket if model has brackets
  useEffect(() => {
    if (activeModel?.brackets?.length > 0) {
      setSelectedBracketId(activeModel.brackets[0].id);
      setVehicle({ make: activeMake.slug, model: activeModel.slug });
    }
  }, [activeModel, activeMake, setVehicle]);

  useEffect(() => {
    document.title = `${t.fit.title} | Kazez`;
  }, [t]);

  const handleCopy = (sku) => {
    navigator.clipboard.writeText(sku);
    setCopiedSku(sku);
    setTimeout(() => setCopiedSku(null), 2000);
  };

  const handleAddKit = (bracket) => {
    const motorItem = motorLine(selectedFinish);
    const bracketItem = bracketLine(bracket);
    add([motorItem, bracketItem], { open: true, qty: quantity });
  };

  const handleAddMotorOnly = () => {
    const motorItem = motorLine(selectedFinish);
    add(motorItem, { open: true, qty: quantity });
  };

  const finishesList = FINISH_KEYS.map((k) => MOTOR.finishes[k]);

  return (
    <div className="container section">
      {/* Header */}
      <div className={s.head}>
        <h1 className="h1">{t.fit.title}</h1>
        <p className="lede">{t.fit.sub}</p>
      </div>

      {/* Step Tabs */}
      <div className={s.steps}>
        <div className={`${s.step} ${!activeMake ? s.stepActive : s.stepDone}`}>
          <span className={s.stepNum}>1</span>
          <span>{t.fit.step1}</span>
        </div>
        <div className={`${s.step} ${activeMake && !activeModel ? s.stepActive : activeModel ? s.stepDone : ''}`}>
          <span className={s.stepNum}>2</span>
          <span>{t.fit.step2}</span>
        </div>
        <div className={`${s.step} ${activeModel ? s.stepActive : ''}`}>
          <span className={s.stepNum}>3</span>
          <span>{t.fit.step3}</span>
        </div>
      </div>

      {/* STEP 1: Choose Make */}
      {!activeMake && (
        <div className={s.selectionSection}>
          <h2 className="h2">{t.fit.chooseMake}</h2>
          <Rise as="div" targets="children" className={s.grid}>
            {FITMENT.map((m) => (
              <button
                key={m.slug}
                type="button"
                className={s.card}
                onClick={() => navigate(`/fit/${m.slug}`)}
              >
                <span className={s.cardTitle}>{pick(m.name)}</span>
                <span className="small num">
                  {m.models.length} {m.models.length === 1 ? t.home.model1 : t.home.models}
                </span>
                <ArrowRight size={18} className="flip" />
              </button>
            ))}
          </Rise>
        </div>
      )}

      {/* STEP 2: Choose Model */}
      {activeMake && !activeModel && (
        <div className={s.selectionSection}>
          <div className={s.subnav}>
            <button type="button" className="link" onClick={() => navigate('/fit')}>
              ← {t.common.back}
            </button>
            <span className={s.currentTag}>{pick(activeMake.name)}</span>
          </div>
          <h2 className="h2">{t.fit.chooseModel}</h2>
          <Rise as="div" targets="children" className={s.grid}>
            {activeMake.models.map((m) => (
              <button
                key={m.slug}
                type="button"
                className={s.card}
                onClick={() => navigate(`/fit/${activeMake.slug}/${m.slug}`)}
              >
                <div className={s.cardInfo}>
                  <span className={s.cardTitle}>{m.name}</span>
                  <span className="small num">{m.years}</span>
                  <span className="small">{m.bodyCode}</span>
                </div>
                <ArrowRight size={18} className="flip" />
              </button>
            ))}
          </Rise>
        </div>
      )}

      {/* STEP 3: Vehicle Kit Result */}
      {activeModel && (
        <div className={s.kitResult}>
          <div className={s.subnav}>
            <button type="button" className="link" onClick={() => navigate(`/fit/${activeMake.slug}`)}>
              ← {t.common.back}
            </button>
            <span className={s.currentTag}>
              {pick(activeMake.name)} / {activeModel.name}
            </span>
          </div>

          <Rise className={s.kitLayout}>
            {/* Left side: Bracket Showcase */}
            <div className={s.bracketColumn}>
              <h2 className="h2">
                {t.fit.kitFor} {activeModel.name}
              </h2>

              {activeModel.brackets.length > 1 && (
                <p className="small">{t.fit.optionsNote}</p>
              )}

              <div className={s.bracketList}>
                {activeModel.brackets.map((b) => {
                  const isSelected = selectedBracketId === b.id;
                  return (
                    <div
                      key={b.id}
                      className={`${s.bracketCard} ${isSelected ? s.bracketSelected : ''}`}
                      onClick={() => setSelectedBracketId(b.id)}
                    >
                      <div className={s.bracketImg}>
                        <img src={b.image} alt={pick(b.mount)} />
                      </div>
                      <div className={s.bracketDetails}>
                        <div className={s.bracketHeader}>
                          <h3 className="h3">{pick(b.mount)}</h3>
                          <Price qar={b.price} className={`${s.bracketPrice} num`} />
                        </div>
                        <p className="body">{pick(b.note)}</p>

                        <div className={s.bracketSpecs}>
                          {b.minutes && (
                            <span className={s.specBadge}>
                              <Clock size={16} />
                              <span>{b.minutes} {t.common.minutes}</span>
                            </span>
                          )}
                          {b.noDrill && (
                            <span className={s.specBadge}>
                              <ShieldCheck size={16} />
                              <span>{t.common.noDrill}</span>
                            </span>
                          )}
                          <span className={s.specBadge}>
                            <Wrench size={16} />
                            <span>{pick(b.finish)}</span>
                          </span>
                        </div>

                        <div className={s.skuRow}>
                          <span className="small mono">{b.sku}</span>
                          <button
                            type="button"
                            className={s.copyBtn}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(b.sku);
                            }}
                          >
                            {copiedSku === b.sku ? <Check size={14} /> : <Copy size={14} />}
                            <Morph active={copiedSku === b.sku} off={t.fit.copy} on={t.fit.copied} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Not Listed / Universal Note */}
              <div className={s.helpBox}>
                <h4 className="h3">{t.fit.notListed}</h4>
                <p className="small">{t.fit.notListedBody}</p>
                <a
                  href={waLink(`Fitment enquiry: ${activeMake?.make} ${activeModel?.name}`)}
                  target="_blank"
                  rel="noreferrer"
                  className="link"
                >
                  {t.common.whatsapp} <ArrowRight size={16} className="flip" />
                </a>
              </div>
            </div>

            {/* Right side: Kit Configuration & Checkout Action */}
            <div className={s.actionColumn}>
              <div className={s.actionCard}>
                <h3 className="h2">{t.fit.step3}</h3>

                {/* Motor Finish Toggle */}
                <div className={s.fieldGroup}>
                  <FinishToggle
                    finishes={finishesList}
                    value={selectedFinish}
                    onChange={setSelectedFinish}
                    legend={t.motor.finish}
                  />
                </div>

                {/* Quantity */}
                <div className={s.fieldGroup}>
                  <label className="field-label">{t.common.qty}</label>
                  <Qty value={quantity} onChange={setQuantity} min={1} max={20} />
                  <span className="small">{t.fit.tradeHint}</span>
                </div>

                {/* Calculation */}
                {(() => {
                  const currentBracket = activeModel.brackets.find((b) => b.id === selectedBracketId) || activeModel.brackets[0];
                  const kitTotal = (MOTOR.price + (currentBracket ? currentBracket.price : 0)) * quantity;

                  return (
                    <div className={s.calcSummary}>
                      <div className={s.calcRow}>
                        <span>{t.fit.motor} ({pick(MOTOR.finishes[selectedFinish].label)})</span>
                        <Price qar={MOTOR.price * quantity} className="num" />
                      </div>
                      {currentBracket && (
                        <div className={s.calcRow}>
                          <span>{t.fit.bracket}</span>
                          <Price qar={currentBracket.price * quantity} className="num" />
                        </div>
                      )}
                      <div className={`${s.calcRow} ${s.calcTotal}`}>
                        <span>{t.fit.total}</span>
                        <Price qar={kitTotal} className="num" />
                      </div>

                      <button
                        type="button"
                        className="btn btn-primary btn-block"
                        onClick={() => handleAddKit(currentBracket)}
                      >
                        <span>{t.common.addToCart} • </span>
                        <Price qar={kitTotal} />
                      </button>

                      <button
                        type="button"
                        className={s.secondaryAction}
                        onClick={handleAddMotorOnly}
                      >
                        <span>{t.fit.motorOnly} (</span>
                        <Price qar={MOTOR.price * quantity} />
                        <span>)</span>
                      </button>
                    </div>
                  );
                })()}
              </div>
            </div>
          </Rise>
        </div>
      )}
    </div>
  );
}
