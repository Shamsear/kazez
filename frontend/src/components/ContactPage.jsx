import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, CheckCircle2, ChevronRight, ChevronLeft, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ContactPage = () => {
  const { t, isRtl } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    vehicle: '',
    inquiryType: 'custom_fitment',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [referenceNo, setReferenceNo] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ref = `INQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setReferenceNo(ref);
    setSubmitted(true);
  };

  const NextChevron = isRtl ? ChevronLeft : ChevronRight;

  return (
    <div className="kz-contact-page">
      {/* Header */}
      <div className="kz-container kz-eng-header">
        <div className="kz-tag-telemetry" style={{ width: 'fit-content', marginBottom: '16px' }}>
          <MapPin size={13} style={{ color: 'var(--kz-racing-red)' }} />
          <span>{t.contact.tag}</span>
        </div>

        <h1 className="kz-eng-headline">
          {t.contact.title}
        </h1>

        <p className="kz-eng-subhead">
          {t.contact.subtitle}
        </p>
      </div>

      {/* Main Grid: Details on Left, Form on Right */}
      <div className="kz-container">
        <div className="kz-contact-grid">
          {/* Left Column: Showroom Details */}
          <div>
            <div className="kz-contact-card">
              <div className="kz-eng-subhead-tag">
                {isRtl ? 'المقر الرئيسي ومركز التوزيع' : 'Primary Headquarters'}
              </div>
              <h2 className="kz-eng-narrative-headline" style={{ marginBottom: '24px' }}>
                {t.contact.dohaHub}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ color: 'var(--kz-red)', marginTop: '2px' }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: '14px', marginBottom: '4px' }}>{isRtl ? 'الموقع والعنوان' : 'Showroom & Fitment Center'}</div>
                    <div style={{ color: 'var(--kz-text-muted)', fontSize: '14px', fontWeight: 300, lineHeight: 1.6 }}>
                      {t.contact.dohaAddress}
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
                      <a
                        href="https://maps.google.com/?q=Salwa+Road+Doha+Qatar"
                        target="_blank"
                        rel="noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', padding: '4px 10px', borderRadius: 'var(--kz-radius-pill)', border: '1px solid var(--kz-border)', background: 'rgba(255, 255, 255, 0.04)', color: 'var(--kz-text)', textDecoration: 'none', fontWeight: 500 }}
                      >
                        <Compass size={12} color="var(--kz-racing-red)" /> {isRtl ? 'خرائط جوجل ↗' : 'Google Maps ↗'}
                      </a>
                      <a
                        href="http://maps.apple.com/?q=Salwa+Road+Doha+Qatar"
                        target="_blank"
                        rel="noreferrer"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', padding: '4px 10px', borderRadius: 'var(--kz-radius-pill)', border: '1px solid var(--kz-border)', background: 'rgba(255, 255, 255, 0.04)', color: 'var(--kz-text)', textDecoration: 'none', fontWeight: 500 }}
                      >
                        <Compass size={12} color="var(--kz-racing-red)" /> {isRtl ? 'خرائط أبل ↗' : 'Apple Maps ↗'}
                      </a>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ color: 'var(--kz-red)', marginTop: '2px' }}>
                    <Phone size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: '14px', marginBottom: '4px' }}>{t.contact.phoneTitle} / WhatsApp</div>
                    <div style={{ fontFamily: 'var(--kz-font-mono)', fontSize: '15px', fontWeight: 400, color: 'var(--kz-text)', direction: 'ltr', textAlign: isRtl ? 'right' : 'left' }}>
                      +974 5512 8900
                    </div>
                    <div style={{ color: 'var(--kz-text-muted)', fontSize: '12px', fontWeight: 300, marginTop: '2px' }}>
                      {isRtl ? 'استجابة فورية عبر الواتساب طوال أيام الأسبوع' : 'VIP priority response via WhatsApp available 7 days a week'}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ color: 'var(--kz-red)', marginTop: '2px' }}>
                    <Mail size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: '14px', marginBottom: '4px' }}>{isRtl ? 'البريد الإلكتروني المعتمد' : 'Corporate & Fleet Dispatch'}</div>
                    <div style={{ fontFamily: 'var(--kz-font-mono)', fontSize: '14px', fontWeight: 400, color: 'var(--kz-text)', direction: 'ltr', textAlign: isRtl ? 'right' : 'left' }}>
                      concierge@kazez.qa
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ color: 'var(--kz-red)', marginTop: '2px' }}>
                    <Clock size={20} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 500, fontSize: '14px', marginBottom: '4px' }}>{t.contact.hoursTitle}</div>
                    <div style={{ color: 'var(--kz-text-muted)', fontSize: '13px', fontWeight: 300, lineHeight: 1.6 }}>
                      {t.contact.hoursVal}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp Box */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(37, 211, 102, 0.08) 0%, rgba(0,0,0,0.4) 100%)',
              border: '1px solid rgba(37, 211, 102, 0.3)',
              borderRadius: '12px',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <div>
                <div style={{ fontWeight: 500, fontSize: '15px', color: '#25D366', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MessageSquare size={18} />
                  {t.contact.whatsappTitle}
                </div>
                <div style={{ color: 'var(--kz-text-muted)', fontSize: '13px', fontWeight: 300 }}>
                  {isRtl ? 'أرسل صور مركبتك للحصول على توصية فورية من المهندس المختص.' : 'Send photos of your vehicle setup for instant bracket recommendations.'}
                </div>
              </div>

              <a
                href="https://wa.me/97455128900?text=Hello%20Kazez%2C%20I%20am%20interested%20in%20an%20antenna%20motor%20for%20my%20vehicle."
                target="_blank"
                rel="noreferrer"
                className="kz-btn kz-btn-whatsapp kz-btn-island"
              >
                <span>{isRtl ? 'محادثة فورية' : 'Chat Now'}</span>
                <span className="kz-btn-island-icon">
                  <NextChevron size={13} />
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div>
            <div className="kz-contact-card">
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    background: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    color: '#22c55e',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '20px'
                  }}>
                    <CheckCircle2 size={36} />
                  </div>

                  <div className="kz-eng-subhead-tag" style={{ marginBottom: '8px' }}>
                    {isRtl ? 'تم تأكيد الاستفسار' : 'Inquiry Confirmed'}
                  </div>
                  <h3 className="kz-eng-narrative-headline" style={{ fontSize: '1.4rem', marginBottom: '12px' }}>
                    {isRtl ? 'تم استلام طلبك الهندسي بنجاح' : 'WE HAVE RECEIVED YOUR SPECIFICATIONS'}
                  </h3>
                  <div style={{ fontFamily: 'var(--kz-font-mono)', fontSize: '14px', color: 'var(--kz-text)', marginBottom: '16px' }}>
                    {isRtl ? 'المرجع: ' : 'Reference: '}<span style={{ color: 'var(--kz-racing-red)', fontWeight: 600 }}>{referenceNo}</span>
                  </div>
                  <p style={{ color: 'var(--kz-text-muted)', fontSize: '14px', fontWeight: 300, maxWidth: '420px', margin: '0 auto 28px', lineHeight: 1.6 }}>
                    {t.contact.successMsg}
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', phone: '', email: '', vehicle: '', inquiryType: 'custom_fitment', message: '' });
                    }}
                    className="kz-btn kz-btn-secondary"
                  >
                    {isRtl ? 'إرسال استفسار آخر' : 'Submit Another Inquiry'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="kz-eng-subhead-tag">
                    {isRtl ? 'مراسلة رقمية مباشرة' : 'Digital Transmission'}
                  </div>
                  <h3 className="kz-eng-narrative-headline" style={{ fontSize: '1.4rem', marginBottom: '24px' }}>
                    {t.contact.inquiryTitle}
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div>
                      <label className="kz-form-label">{t.checkout.fullName} *</label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t.checkout.fullNamePlaceholder}
                        className="kz-form-input"
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                      <div>
                        <label className="kz-form-label">{t.checkout.phone} *</label>
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder={t.checkout.phonePlaceholder}
                          className="kz-form-input"
                        />
                      </div>
                      <div>
                        <label className="kz-form-label">{t.checkout.email}</label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder={t.checkout.emailPlaceholder}
                          className="kz-form-input"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="kz-form-label">{isRtl ? 'نوع وموديل المركبة' : 'Vehicle Make / Model'}</label>
                      <input
                        type="text"
                        name="vehicle"
                        value={formData.vehicle}
                        onChange={handleChange}
                        placeholder="e.g. Land Cruiser 300 / Patrol Y62"
                        className="kz-form-input"
                      />
                    </div>

                    <div>
                      <label className="kz-form-label">{isRtl ? 'تفاصيل الاستفسار' : 'Inquiry Message'}</label>
                      <textarea
                        name="message"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={isRtl ? 'اكتب تفاصيل طلبك هنا...' : 'Describe your fitment requirements...'}
                        className="kz-form-input"
                        style={{ resize: 'vertical' }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="kz-btn kz-btn-primary kz-btn-island"
                      style={{ width: '100%', marginTop: '8px' }}
                    >
                      <span>{t.contact.sendBtn}</span>
                      <span className="kz-btn-island-icon">
                        <NextChevron size={13} />
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
