import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CreditCard, Money, WhatsappLogo, Lock, ShieldCheck, Truck, ArrowRight, ArrowLeft, Check } from '@phosphor-icons/react';
import { Rise } from 'cube-motion/react';
import { useLocale } from '../i18n/LocaleContext.jsx';
import { useShop } from '../state/ShopContext.jsx';
import { GCC, DELIVERY, SHOP } from '../data/shop.js';
import { Fold } from '../components/Mark.jsx';
import { Price, NumFlow } from '../components/Bits.jsx';
import s from './Checkout.module.css';

export default function Checkout() {
  const { t, pick, price, currency } = useLocale();
  const { items, subtotal, clear, saveOrder } = useShop();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);
  const [countryCode, setCountryCode] = useState('QA');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    address: '',
    notes: '',
    paymentMethod: 'card',
    cardNumber: '',
    expiry: '',
    cvc: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = `${t.checkout.title} | Kazez`;
  }, [t]);

  const selectedCountry = GCC.find((c) => c.code === countryCode) || GCC[0];
  const deliveryRule = DELIVERY[countryCode] || DELIVERY.default;
  const shippingFee = deliveryRule.fee;
  const grandTotal = subtotal + shippingFee;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCountryChange = (e) => {
    const code = e.target.value;
    setCountryCode(code);
    const c = GCC.find((g) => g.code === code);
    if (c && !formData.phone.startsWith(c.dial)) {
      setFormData((prev) => ({ ...prev, phone: c.dial + ' ' }));
    }
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t.checkout.errName;
    if (!formData.phone.trim() || formData.phone.length < 8) newErrors.phone = t.checkout.errPhone;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.city.trim()) newErrors.city = t.checkout.errCity;
    if (!formData.address.trim()) newErrors.address = t.checkout.errAddress;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors = {};
    if (formData.paymentMethod === 'card') {
      const cleanCard = formData.cardNumber.replace(/\s+/g, '');
      if (cleanCard.length < 15) newErrors.cardNumber = t.checkout.errCard;
      if (!/^\d{2}\/\d{2}$/.test(formData.expiry)) newErrors.expiry = t.checkout.errExpiry;
      if (formData.cvc.length < 3) newErrors.cvc = t.checkout.errCvc;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextToDelivery = () => {
    if (validateStep1()) {
      setCurrentStep(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextToPayment = () => {
    if (validateStep2()) {
      setCurrentStep(3);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateStep1()) {
      setCurrentStep(1);
      return;
    }
    if (!validateStep2()) {
      setCurrentStep(2);
      return;
    }
    if (!validateStep3()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate order placement
    setTimeout(() => {
      const orderId = `KZ-${Math.floor(100000 + Math.random() * 900000)}`;
      const now = new Date();

      const orderRecord = {
        id: orderId,
        date: now.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        customer: {
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          city: formData.city,
          country: pick(selectedCountry),
          address: formData.address,
          notes: formData.notes
        },
        items: [...items],
        subtotal,
        shippingFee,
        grandTotal,
        paymentMethod: formData.paymentMethod,
        status: formData.paymentMethod === 'card' ? 'paid' : formData.paymentMethod === 'cod' ? 'due' : 'pending'
      };

      saveOrder(orderRecord);
      clear();
      navigate(`/order/${orderId}`);
    }, 800);
  };

  if (items.length === 0) {
    return (
      <div className="container section">
        <div className={s.emptyBox}>
          <h1 className="h1">{t.checkout.emptyTitle}</h1>
          <p className="body">{t.checkout.emptyBody}</p>
          <Link to="/fit" className="btn btn-primary">
            {t.common.fit}
          </Link>
        </div>
      </div>
    );
  }

  const stepsList = [
    { num: 1, label: t.checkout.contact },
    { num: 2, label: t.checkout.delivery },
    { num: 3, label: t.checkout.payment }
  ];

  return (
    <div className="container section">
      <Rise>
        <div className={s.head}>
          <h1 className="h1">{t.checkout.title}</h1>
        </div>

        {/* Step Progress Tabs */}
        <div className={s.stepNav} role="tablist" aria-label="Checkout steps">
          {stepsList.map((st) => {
            const isActive = currentStep === st.num;
            const isDone = currentStep > st.num;
            return (
              <button
                key={st.num}
                type="button"
                className={`${s.stepTab} ${isActive ? s.stepTabActive : ''} ${isDone ? s.stepTabDone : ''}`}
                onClick={() => {
                  if (st.num < currentStep) setCurrentStep(st.num);
                  else if (st.num === 2 && validateStep1()) setCurrentStep(2);
                  else if (st.num === 3 && validateStep1() && validateStep2()) setCurrentStep(3);
                }}
                disabled={!isDone && !isActive}
                aria-current={isActive ? 'step' : undefined}
              >
                <span className={s.stepTabNum}>
                  {isDone ? <Check size={14} weight="bold" /> : st.num}
                </span>
                <span className={s.stepTabLabel}>{st.label}</span>
              </button>
            );
          })}
        </div>
      </Rise>

      <form className={s.checkoutLayout} onSubmit={handleSubmit} noValidate>
        {/* Left: Active Step Form Card */}
        <Rise key={currentStep} className={s.formColumn}>
          {/* STEP 1: CONTACT INFO */}
          {currentStep === 1 && (
            <section className={s.sectionCard}>
              <div className={s.cardHeaderRow}>
                <h2 className={s.sectionHeader}>
                  <span className={s.stepNum}>1</span>
                  <span>{t.checkout.step1}</span>
                </h2>
              </div>

              <div className={s.fieldsGrid}>
                <div className="field">
                  <label className="field-label" htmlFor="checkout-name">
                    {t.checkout.name}
                  </label>
                  <input
                    id="checkout-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    className="input"
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={!!errors.name}
                    autoFocus
                  />
                  {errors.name && <span className="field-error">{errors.name}</span>}
                </div>

                <div className="field">
                  <label className="field-label" htmlFor="checkout-phone">
                    {t.checkout.phone}
                  </label>
                  <input
                    id="checkout-phone"
                    name="phone"
                    type="tel"
                    dir="ltr"
                    autoComplete="tel"
                    className="input"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+974 5500 0000"
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && <span className="field-error">{errors.phone}</span>}
                </div>

                <div className="field" style={{ gridColumn: '1 / -1' }}>
                  <label className="field-label" htmlFor="checkout-email">
                    {t.checkout.email} <span className="small">({t.checkout.optional})</span>
                  </label>
                  <input
                    id="checkout-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="input"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={s.stepActions}>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNextToDelivery}
                >
                  <span>{t.checkout.continueToDelivery}</span>
                  <ArrowRight size={16} className="flip" />
                </button>
              </div>
            </section>
          )}

          {/* STEP 2: DELIVERY ADDRESS */}
          {currentStep === 2 && (
            <section className={s.sectionCard}>
              <div className={s.cardHeaderRow}>
                <h2 className={s.sectionHeader}>
                  <span className={s.stepNum}>2</span>
                  <span>{t.checkout.step2}</span>
                </h2>
                <button
                  type="button"
                  className={s.editStepBtn}
                  onClick={() => setCurrentStep(1)}
                >
                  {formData.name || t.checkout.contact} • {t.checkout.back}
                </button>
              </div>

              <div className={s.fieldsGrid}>
                <div className="field">
                  <label className="field-label" htmlFor="checkout-country">
                    {t.checkout.country}
                  </label>
                  <select
                    id="checkout-country"
                    className="select"
                    value={countryCode}
                    onChange={handleCountryChange}
                  >
                    {GCC.map((c) => (
                      <option key={c.code} value={c.code}>
                        {pick(c)} ({c.dial})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field">
                  <label className="field-label" htmlFor="checkout-city">
                    {t.checkout.city}
                  </label>
                  <input
                    id="checkout-city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    className="input"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Doha"
                    aria-invalid={!!errors.city}
                    autoFocus
                  />
                  {errors.city && <span className="field-error">{errors.city}</span>}
                </div>

                <div className="field" style={{ gridColumn: '1 / -1' }}>
                  <label className="field-label" htmlFor="checkout-address">
                    {t.checkout.address}
                  </label>
                  <input
                    id="checkout-address"
                    name="address"
                    type="text"
                    autoComplete="street-address"
                    className="input"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder={t.checkout.addressHint}
                    aria-invalid={!!errors.address}
                  />
                  {errors.address && <span className="field-error">{errors.address}</span>}
                </div>

                <div className="field" style={{ gridColumn: '1 / -1' }}>
                  <label className="field-label" htmlFor="checkout-notes">
                    {t.checkout.notes} <span className="small">({t.checkout.optional})</span>
                  </label>
                  <input
                    id="checkout-notes"
                    name="notes"
                    type="text"
                    className="input"
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder={t.checkout.notesHint}
                  />
                </div>
              </div>

              <div className={s.stepActionsBetween}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setCurrentStep(1)}
                >
                  <ArrowLeft size={16} className="flip" />
                  <span>{t.checkout.back}</span>
                </button>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNextToPayment}
                >
                  <span>{t.checkout.continueToPayment}</span>
                  <ArrowRight size={16} className="flip" />
                </button>
              </div>
            </section>
          )}

          {/* STEP 3: PAYMENT METHOD */}
          {currentStep === 3 && (
            <section className={s.sectionCard}>
              <div className={s.cardHeaderRow}>
                <h2 className={s.sectionHeader}>
                  <span className={s.stepNum}>3</span>
                  <span>{t.checkout.step3}</span>
                </h2>
                <button
                  type="button"
                  className={s.editStepBtn}
                  onClick={() => setCurrentStep(2)}
                >
                  {formData.city}, {pick(selectedCountry)} • {t.checkout.back}
                </button>
              </div>

              <div className={s.paymentOptions}>
                <label
                  className={`${s.paymentOption} ${formData.paymentMethod === 'card' ? s.paymentSelected : ''}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleChange}
                  />
                  <CreditCard size={22} className={s.paymentIcon} />
                  <div>
                    <span className={s.paymentTitle}>{t.checkout.card}</span>
                    <span className="small">{t.checkout.cardBody}</span>
                  </div>
                </label>

                <label
                  className={`${s.paymentOption} ${formData.paymentMethod === 'cod' ? s.paymentSelected : ''}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                  />
                  <Money size={22} className={s.paymentIcon} />
                  <div>
                    <span className={s.paymentTitle}>{t.checkout.cod}</span>
                    <span className="small">{t.checkout.codBody}</span>
                  </div>
                </label>

                <label
                  className={`${s.paymentOption} ${formData.paymentMethod === 'wa' ? s.paymentSelected : ''}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="wa"
                    checked={formData.paymentMethod === 'wa'}
                    onChange={handleChange}
                  />
                  <WhatsappLogo size={22} className={s.paymentIcon} />
                  <div>
                    <span className={s.paymentTitle}>{t.checkout.wa}</span>
                    <span className="small">{t.checkout.waBody}</span>
                  </div>
                </label>
              </div>

              {/* Card Inputs if Card chosen */}
              {formData.paymentMethod === 'card' && (
                <div className={s.cardInputs}>
                  <div className="field">
                    <label className="field-label" htmlFor="card-number">
                      {t.checkout.cardNumber}
                    </label>
                    <input
                      id="card-number"
                      name="cardNumber"
                      type="text"
                      inputMode="numeric"
                      dir="ltr"
                      className="input"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      placeholder="4000 0000 0000 0000"
                      aria-invalid={!!errors.cardNumber}
                    />
                    {errors.cardNumber && <span className="field-error">{errors.cardNumber}</span>}
                  </div>

                  <div className={s.cardSubGrid}>
                    <div className="field">
                      <label className="field-label" htmlFor="card-exp">
                        {t.checkout.expiry}
                      </label>
                      <input
                        id="card-exp"
                        name="expiry"
                        type="text"
                        dir="ltr"
                        className="input"
                        value={formData.expiry}
                        onChange={handleChange}
                        placeholder="MM/YY"
                        aria-invalid={!!errors.expiry}
                      />
                      {errors.expiry && <span className="field-error">{errors.expiry}</span>}
                    </div>

                    <div className="field">
                      <label className="field-label" htmlFor="card-cvc">
                        {t.checkout.cvc}
                      </label>
                      <input
                        id="card-cvc"
                        name="cvc"
                        type="password"
                        maxLength={4}
                        dir="ltr"
                        className="input"
                        value={formData.cvc}
                        onChange={handleChange}
                        placeholder="•••"
                        aria-invalid={!!errors.cvc}
                      />
                      {errors.cvc && <span className="field-error">{errors.cvc}</span>}
                    </div>
                  </div>

                  <p className="small" style={{ color: 'var(--ink-2)' }}>
                    <Lock size={14} style={{ verticalAlign: 'middle', marginInlineEnd: 4 }} />
                    {t.checkout.demoNote}
                  </p>
                </div>
              )}

              <div className={s.stepActionsBetween}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setCurrentStep(2)}
                >
                  <ArrowLeft size={16} className="flip" />
                  <span>{t.checkout.back}</span>
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Fold />
                      <span>{t.checkout.placing}...</span>
                    </>
                  ) : (
                    <span>
                      {t.checkout.place} • <Price qar={grandTotal} />
                    </span>
                  )}
                </button>
              </div>
            </section>
          )}
        </Rise>

        {/* Right: Order Summary */}
        <Rise delay={0.1} className={s.summaryColumn}>
          <div className={s.summaryCard}>
            <h2 className="h2">{t.checkout.summary}</h2>

            <ul className={s.itemsList}>
              {items.map((it) => (
                <li key={it.sku} className={s.summaryItem}>
                  <div className={s.itemThumb}>
                    <img src={it.image} alt="" />
                  </div>
                  <div className={s.itemDetails}>
                    <span className={s.itemName}>{pick(it.name)}</span>
                    <span className="small">{pick(it.variant)}</span>
                    <span className="small num">× <NumFlow value={it.qty} /></span>
                  </div>
                  <Price qar={it.price * it.qty} className={`${s.itemPrice} num`} />
                </li>
              ))}
            </ul>

            <div className={s.calcBox}>
              <div className={s.calcRow}>
                <span>{t.cart.subtotal}</span>
                <Price qar={subtotal} className="num" />
              </div>
              <div className={s.calcRow}>
                <span>{t.checkout.shipping} ({pick(deliveryRule.days)})</span>
                {shippingFee === 0 ? (
                  <span className="num">{t.checkout.free}</span>
                ) : (
                  <Price qar={shippingFee} className="num" />
                )}
              </div>
              <div className={`${s.calcRow} ${s.calcTotal}`}>
                <span>{t.checkout.total}</span>
                <Price qar={grandTotal} className="num" />
              </div>
            </div>

            {currency !== 'QAR' && (
              <p className="small">{t.common.chargedInQar}</p>
            )}

            {currentStep < 3 && (
              <button
                type="button"
                className="btn btn-primary btn-block"
                onClick={currentStep === 1 ? handleNextToDelivery : handleNextToPayment}
              >
                <span>
                  {currentStep === 1 ? t.checkout.continueToDelivery : t.checkout.continueToPayment}
                </span>
                <ArrowRight size={16} className="flip" />
              </button>
            )}

            {currentStep === 3 && (
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Fold />
                    <span>{t.checkout.placing}...</span>
                  </>
                ) : (
                  <span>
                    {t.checkout.place} • <Price qar={grandTotal} />
                  </span>
                )}
              </button>
            )}
          </div>
        </Rise>
      </form>
    </div>
  );
}
