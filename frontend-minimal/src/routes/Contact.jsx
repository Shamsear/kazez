import React, { useState, useEffect } from 'react';
import { ArrowRight, MapPin, Phone, Clock, WhatsappLogo, CheckCircle, EnvelopeSimple } from '@phosphor-icons/react';
import { Rise } from 'cube-motion/react';
import { useLocale } from '../i18n/LocaleContext.jsx';
import { SHOP, waLink } from '../data/shop.js';
import s from './Contact.module.css';

export default function Contact() {
  const { t, pick } = useLocale();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicle: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = `${t.contact.title} | Kazez`;
  }, [t]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t.contact.errName;
    if (!formData.phone.trim()) newErrors.phone = t.contact.errPhone;
    if (!formData.message.trim()) newErrors.message = t.contact.errMessage;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitted(true);
  };

  return (
    <div className="container section">
      <Rise>
        <div className={s.head}>
          <h1 className="h1">{t.contact.title}</h1>
          <p className="lede">{t.contact.sub}</p>
        </div>
      </Rise>

      <div className={s.contactGrid}>
        {/* Left: Showroom Details & Workshop */}
        <Rise delay={0.06} className={s.infoColumn}>
          <div className={s.infoCard}>
            <h2 className="h2">{t.contact.showroom}</h2>

            <div className={s.infoList}>
              <div className={s.infoItem}>
                <MapPin size={20} className={s.infoIcon} />
                <div>
                  <p className="body">{pick(SHOP.address)}</p>
                  <a
                    href={SHOP.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="link"
                  >
                    {t.contact.directions} <ArrowRight size={14} className="flip" />
                  </a>
                </div>
              </div>

              <div className={s.infoItem}>
                <Clock size={20} className={s.infoIcon} />
                <div>
                  <p className="body">{pick(SHOP.hours)}</p>
                </div>
              </div>

              <div className={s.infoItem}>
                <Phone size={20} className={s.infoIcon} />
                <div>
                  <a href={SHOP.phoneHref} dir="ltr" className="body" style={{ fontWeight: 600 }}>
                    {SHOP.phone}
                  </a>
                </div>
              </div>

              <div className={s.infoItem}>
                <WhatsappLogo size={20} className={s.infoIcon} />
                <div>
                  <a
                    href={waLink('Hello Kazez showroom')}
                    target="_blank"
                    rel="noreferrer"
                    className="link"
                  >
                    {t.common.whatsapp} <ArrowRight size={14} className="flip" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Trade Inquiries */}
          <div className={s.tradeCard}>
            <h3 className="h3">{t.contact.trade}</h3>
            <p className="body">{t.contact.tradeBody}</p>
            <a
              href={waLink('Trade and workshop wholesale inquiry')}
              target="_blank"
              rel="noreferrer"
              className="link"
            >
              {t.common.whatsapp} <ArrowRight size={14} className="flip" />
            </a>
          </div>
        </Rise>

        {/* Right: Message Form */}
        <Rise delay={0.12} className={s.formColumn}>
          <div className={s.formCard}>
            <h2 className="h2">{t.contact.formTitle}</h2>

            {submitted ? (
              <div className={s.successBox}>
                <CheckCircle size={32} className={s.successIcon} />
                <h3 className="h3">{t.contact.sentTitle}</h3>
                <p className="body">{t.contact.sentBody}</p>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: '', phone: '', vehicle: '', message: '' });
                  }}
                >
                  {t.contact.sendAnother}
                </button>
              </div>
            ) : (
              <form className={s.form} onSubmit={handleSubmit} noValidate>
                <div className="field">
                  <label className="field-label" htmlFor="contact-name">
                    {t.contact.name}
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    className="input"
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'contact-name-err' : undefined}
                  />
                  {errors.name && (
                    <span id="contact-name-err" className="field-error">
                      {errors.name}
                    </span>
                  )}
                </div>

                <div className="field">
                  <label className="field-label" htmlFor="contact-phone">
                    {t.contact.phoneField}
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    dir="ltr"
                    className="input"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+974 5500 0000"
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? 'contact-phone-err' : undefined}
                  />
                  {errors.phone && (
                    <span id="contact-phone-err" className="field-error">
                      {errors.phone}
                    </span>
                  )}
                </div>

                <div className="field">
                  <label className="field-label" htmlFor="contact-vehicle">
                    {t.contact.vehicle} <span className="small">({t.checkout.optional})</span>
                  </label>
                  <input
                    id="contact-vehicle"
                    name="vehicle"
                    type="text"
                    className="input"
                    value={formData.vehicle}
                    onChange={handleChange}
                    placeholder={t.contact.vehicleHint}
                  />
                </div>

                <div className="field">
                  <label className="field-label" htmlFor="contact-message">
                    {t.contact.message}
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="textarea"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'contact-message-err' : undefined}
                  />
                  {errors.message && (
                    <span id="contact-message-err" className="field-error">
                      {errors.message}
                    </span>
                  )}
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                  {t.contact.send}
                </button>
              </form>
            )}
          </div>
        </Rise>
      </div>
    </div>
  );
}
