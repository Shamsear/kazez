import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, ShieldCheck, Compass, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';

export const ShowroomContact = () => {
  const { isRtl } = useLanguage();
  useScrollReveal('.kz-pdp-container .kz-reveal', []);
  const [submitted, setSubmitted] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState('order_inquiry');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    topic: 'Order & Dispatch Inquiry',
    message: ''
  });

  const topics = [
    { id: 'order_inquiry', label: isRtl ? 'طلب شراء وتوصيل' : 'Order & Dispatch' },
    { id: 'custom_fitment', label: isRtl ? 'استفسار فني ومواصفات' : 'Technical Specifications' },
    { id: 'wholesale', label: isRtl ? 'توزيع وجملة بالخليج' : 'GCC Distribution & Fleet' },
    { id: 'warranty', label: isRtl ? 'خدمة الضمان والصيانة' : 'Warranty & Support' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="kz-pdp-container">
      <div className="kz-container">
        {/* Header */}
        <div className="kz-reveal" style={{ maxWidth: '680px', marginBottom: '48px' }}>
          <div className="kz-tag-telemetry">
            <span className="kz-live-indicator" />
            <span>{isRtl ? 'صالة العرض والمكتب الهندسي بالدوحة' : 'DOHA SHOWROOM & CLIENT DESK'}</span>
          </div>
          <h1 className="kz-hero-h1" style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)', marginTop: '12px' }}>
            {isRtl ? 'تواصل مع' : 'Connect with'}{' '}
            <span className="kz-serif-accent" style={{ color: 'var(--kz-crimson)' }}>
              {isRtl ? 'فريق كزاز قطر.' : 'Kazez Concierge.'}
            </span>
          </h1>
          <p className="kz-hero-lede">
            {isRtl
              ? 'فريق المهندسين الميدانيين لدينا في الدوحة متاح لمساعدتك في استفسارات التوصيل الفوري، المواصفات التقنية، وطلبات التوزيع في قطر ودول الخليج.'
              : 'Our engineering specialists in Doha are available for immediate dispatch inquiries, technical telemetry advice, and direct GCC regional support.'}
          </p>
        </div>

        {/* Grid of Double-Bezel Cards */}
        <div className="kz-contact-grid">
          {/* Left: Showroom Location & Contact Info */}
          <div className="kz-double-bezel kz-reveal kz-delay-1">
            <div
              className="kz-double-bezel-inner"
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '24px'
              }}
            >
              {/* Section h2 for accessible outline */}
              <h2 style={{ fontFamily: 'var(--kz-font-display)', fontSize: '1rem', fontWeight: 700, color: 'var(--kz-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0 }}>
                {isRtl ? 'بيانات التواصل المباشر' : 'Showroom & Direct Contact'}
              </h2>
              {/* Location */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--kz-radius-md)',
                    background: 'var(--kz-surface-subtle)',
                    border: '1px solid var(--kz-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--kz-crimson)',
                    flexShrink: 0
                  }}
                >
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--kz-text-primary)', marginBottom: '4px' }}>
                    {isRtl ? 'صالة العرض والمقر الرئيسي' : 'Doha Showroom & Workshop'}
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: 'var(--kz-text-secondary)', lineHeight: '1.5' }}>
                    Salwa Road Commercial Corridor, Zone 55, Doha, State of Qatar
                  </p>
                </div>
              </div>

              {/* Direct Phone */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--kz-radius-md)',
                    background: 'var(--kz-surface-subtle)',
                    border: '1px solid var(--kz-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--kz-crimson)',
                    flexShrink: 0
                  }}
                >
                  <Phone size={20} />
                </div>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--kz-text-primary)', marginBottom: '4px' }}>
                    {isRtl ? 'الخط المباشر والواتساب' : 'Direct Line & WhatsApp'}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--kz-text-secondary)', fontFamily: 'var(--kz-font-mono)', fontWeight: 600 }}>
                    +974 5512 8900
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--kz-radius-md)',
                    background: 'var(--kz-surface-subtle)',
                    border: '1px solid var(--kz-border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--kz-crimson)',
                    flexShrink: 0
                  }}
                >
                  <Clock size={20} />
                </div>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--kz-text-primary)', marginBottom: '4px' }}>
                    {isRtl ? 'ساعات العمل وصالة العرض' : 'Operational Hours'}
                  </h3>
                  <p style={{ fontSize: '0.86rem', color: 'var(--kz-text-secondary)' }}>
                    Saturday – Thursday: 9:00 AM – 9:00 PM (AST)
                  </p>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#15803D', fontWeight: 600, marginTop: '4px' }}>
                    <span className="kz-live-indicator" />
                    <span>{isRtl ? 'صالة العرض مفتوحة الآن' : 'Showroom Open Today'}</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Action */}
              <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--kz-border)' }}>
                <a
                  href="https://wa.me/97455128900?text=Hello%20Kazez%20Qatar%2C%20I%20would%20like%20to%20inquire%20about%20the%20antenna%20actuator%20motors"
                  target="_blank"
                  rel="noreferrer"
                  className="kz-btn kz-btn-whatsapp"
                  style={{ width: '100%', padding: '14px' }}
                >
                  <MessageSquare size={16} />
                  <span>{isRtl ? 'محادثة فورية على واتساب كزاز' : 'Direct WhatsApp Concierge'}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Message Form */}
          <div className="kz-double-bezel kz-reveal kz-delay-2">
            <div className="kz-double-bezel-inner">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h2 style={{ fontFamily: 'var(--kz-font-display)', fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>
                  {isRtl ? 'إرسال استفسار مباشر' : 'Send an Engineering Inquiry'}
                </h2>
                <span className="kz-tag-telemetry">
                  REPLY &lt; 2 HRS
                </span>
              </div>

              {submitted ? (
                <div style={{ textAlign: 'center', padding: '48px 16px' }}>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      background: '#F0FDF4',
                      border: '1px solid #BBF7D0',
                      color: '#15803D',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px'
                    }}
                  >
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '6px' }}>
                    {isRtl ? 'تم استلام استفسارك بنجاح' : 'Inquiry Successfully Logged'}
                  </h3>
                  <p style={{ fontSize: '0.88rem', color: 'var(--kz-text-secondary)', maxWidth: '36ch', margin: '0 auto 20px', lineHeight: '1.5' }}>
                    {isRtl ? 'سيتواصل معك مهندس كزاز خلال وقت وجيز عبر الواتساب أو الهاتف.' : 'Our Doha engineering concierge will review your inquiry and contact you promptly.'}
                  </p>
                  <button
                    type="button"
                    className="kz-btn kz-btn-secondary kz-btn-sm"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', phone: '', topic: 'Order & Dispatch Inquiry', message: '' });
                    }}
                  >
                    <span>{isRtl ? 'إرسال استفسار آخر' : 'Send Another Inquiry'}</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Topic Selector */}
                  <div style={{ marginBottom: '18px' }}>
                    <label className="kz-form-label">{isRtl ? 'موضوع الاستفسار' : 'Select Topic'}</label>
                    <div className="kz-contact-topics-grid">
                      {topics.map((t) => (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => {
                            setSelectedTopic(t.id);
                            setFormData((prev) => ({ ...prev, topic: t.label }));
                          }}
                          className={`kz-contact-topic-btn ${selectedTopic === t.id ? 'active' : ''}`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="kz-form-group">
                    <label className="kz-form-label">{isRtl ? 'الاسم الكامل' : 'Your Name'} *</label>
                    <input
                      type="text"
                      className="kz-form-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Nasser Al-Sulaiti"
                      required
                    />
                  </div>

                  <div className="kz-form-group">
                    <label className="kz-form-label">{isRtl ? 'رقم الهاتف / الواتساب' : 'Phone / WhatsApp Number'} *</label>
                    <input
                      type="tel"
                      className="kz-form-input"
                      style={{ fontFamily: 'var(--kz-font-mono)' }}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+974 5512 8900"
                      required
                    />
                  </div>

                  <div className="kz-form-group">
                    <label className="kz-form-label">{isRtl ? 'تفاصيل الاستفسار أو الرسالة' : 'Inquiry Details'} *</label>
                    <textarea
                      className="kz-form-input"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={isRtl ? 'اكتب استفسارك هنا وسيقوم فريقنا بالرد عليك...' : 'Provide details regarding your inquiry...'}
                      required
                    />
                  </div>

                  <button type="submit" className="kz-btn kz-btn-primary" style={{ width: '100%', marginTop: '8px', padding: '14px' }}>
                    <Send size={15} />
                    <span>{isRtl ? 'إرسال الاستفسار' : 'Submit Inquiry'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
