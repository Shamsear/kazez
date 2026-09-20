import React, { useState } from 'react';
import { ShieldCheck, Truck, Clock, PhoneCall, Globe, ArrowRight, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const MinimalFooter = ({ onNavigate }) => {
  const { isRtl } = useLanguage();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="kz-footer-minimal">
      <div className="kz-container">
        {/* VIP Dispatch Advisory Strip in Double Bezel */}
        <div className="kz-double-bezel" style={{ marginBottom: '48px' }}>
          <div
            className="kz-double-bezel-inner"
            style={{
              padding: '28px 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              justifyContent: 'space-between',
              alignItems: 'stretch'
            }}
          >
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
              <div>
                <div className="kz-tag-telemetry" style={{ marginBottom: '8px' }}>
                  <span className="kz-live-indicator" />
                  <span>{isRtl ? 'نشرة التحديثات الهندسية' : 'KAZEZ FIELD DISPATCH BULLETIN'}</span>
                </div>
                <h4 style={{ fontFamily: 'var(--kz-font-display)', fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
                  {isRtl ? 'ابقَ على اطلاع بأحدث الإصدارات والتقارير الميدانية' : 'Receive Engineering Bulletins & GCC Dispatch Alerts'}
                </h4>
                <p style={{ fontSize: '0.84rem', color: 'var(--kz-text-secondary)', margin: '4px 0 0', maxWidth: '52ch' }}>
                  {isRtl
                    ? 'تقارير فنية حول أداء المحركات في بيئات الرمال القاسية وتحديثات خطوط الإنتاج.'
                    : 'Field endurance updates, telemetry data, and direct notifications for production batches.'}
                </p>
              </div>

              {subscribed ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#15803D', fontWeight: 700, fontSize: '0.9rem', background: '#F0FDF4', padding: '10px 18px', borderRadius: 'var(--kz-radius-pill)', border: '1px solid #BBF7D0' }}>
                  <Check size={16} />
                  <span>{isRtl ? 'تم الاشتراك في النشرة الهندسية' : 'Subscribed to Field Bulletin'}</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px', minWidth: 'min(100%, 340px)' }}>
                  <input
                    type="email"
                    placeholder="engineer@domain.qa"
                    className="kz-form-input"
                    style={{ flexGrow: 1, padding: '10px 14px', fontSize: '0.85rem' }}
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="kz-btn kz-btn-primary kz-btn-sm" style={{ padding: '0 16px', flexShrink: 0 }}>
                    <span>{isRtl ? 'اشتراك' : 'Join'}</span>
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="kz-footer-grid">
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '14px' }}>
              <span style={{ fontFamily: 'var(--kz-font-display)', fontWeight: 800, fontSize: '1.25rem', color: 'var(--kz-text-primary)', letterSpacing: '-0.02em' }}>
                KAZEZ
              </span>
              <span style={{ fontFamily: 'var(--kz-font-mono)', fontSize: '0.74rem', color: 'var(--kz-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                ARCHITECTURAL
              </span>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--kz-text-secondary)', lineHeight: '1.6', maxWidth: '38ch', marginBottom: '16px' }}>
              {isRtl
                ? 'محركات وهوائيات راديو عالية العزم معتمدة لتضاريس الخليج الصحراوية وتثبيت مباشر بدون تعديل هيكل.'
                : 'High-torque motorized radio antenna actuators engineered for GCC desert terrain and extreme off-road driving.'}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: '#15803D', fontWeight: 600 }}>
              <ShieldCheck size={14} />
              <span>{isRtl ? 'ضمان استبدال مباشر لمدة عام كامل' : '1-Year Direct Replacement Warranty'}</span>
            </div>
          </div>

          {/* Col 1: Hardware */}
          <div>
            <div className="kz-footer-col-title">{isRtl ? 'إصدارات المحرك' : 'Hardware'}</div>
            <ul className="kz-footer-links">
              <li>
                <button type="button" className="kz-footer-link-btn" onClick={() => onNavigate('kazez-black')}>
                  {isRtl ? 'الإصدار الأسود (Black Edition)' : 'Black Edition Actuator'}
                </button>
              </li>
              <li>
                <button type="button" className="kz-footer-link-btn" onClick={() => onNavigate('kazez-silver')}>
                  {isRtl ? 'الإصدار الفضي (Silver Edition)' : 'Silver Edition Actuator'}
                </button>
              </li>
              <li>
                <button type="button" className="kz-footer-link-btn" onClick={() => onNavigate('engineering')}>
                  {isRtl ? 'مختبر المواصفات' : 'Engineering Lab'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Engineering Highlights */}
          <div>
            <div className="kz-footer-col-title">{isRtl ? 'الهندسة والمعايير' : 'Architecture'}</div>
            <ul className="kz-footer-links">
              <li>
                <button type="button" className="kz-footer-link-btn" onClick={() => onNavigate('engineering')}>
                  {isRtl ? 'عزم التثبيت 45 نيوتن متر' : '45 Nm Holding Torque'}
                </button>
              </li>
              <li>
                <button type="button" className="kz-footer-link-btn" onClick={() => onNavigate('engineering')}>
                  {isRtl ? 'عزل الغبار والماء IP67' : 'IP67 Hermetic Ingress'}
                </button>
              </li>
              <li>
                <button type="button" className="kz-footer-link-btn" onClick={() => onNavigate('engineering')}>
                  {isRtl ? 'سبائك ألومنيوم 6061-T6' : '6061-T6 Forged Billet'}
                </button>
              </li>
              <li>
                <button type="button" className="kz-footer-link-btn" onClick={() => onNavigate('engineering')}>
                  {isRtl ? 'تحكم لاسلكي 433 ميغاهرتز' : '433 MHz RF Actuation'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Support */}
          <div>
            <div className="kz-footer-col-title">{isRtl ? 'الخدمة والدعم' : 'Client Concierge'}</div>
            <ul className="kz-footer-links">
              <li>
                <button type="button" className="kz-footer-link-btn" onClick={() => onNavigate('contact')}>
                  {isRtl ? 'صالة العرض بالدوحة' : 'Doha Showroom'}
                </button>
              </li>
              <li>
                <a href="https://wa.me/97455128900" target="_blank" rel="noreferrer" className="kz-footer-link-btn" style={{ textDecoration: 'none' }}>
                  WhatsApp: +974 5512 8900
                </a>
              </li>
              <li>
                <span className="kz-footer-link-btn" style={{ cursor: 'default' }}>
                  {isRtl ? 'الدوحة، دولة قطر' : 'Doha, State of Qatar'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="kz-footer-bottom">
          <div>
            © {new Date().getFullYear()} KAZEZ ARCHITECTURAL STOREFRONT. ALL RIGHTS RESERVED.
          </div>

          <div className="kz-gcc-badges">
            <span style={{ fontSize: '0.74rem', color: 'var(--kz-text-muted)', marginRight: '4px' }}>
              {isRtl ? 'شحن فوري إلى:' : 'Direct Dispatch:'}
            </span>
            <span className="kz-gcc-badge">QATAR 🇶🇦</span>
            <span className="kz-gcc-badge">KSA 🇸🇦</span>
            <span className="kz-gcc-badge">UAE 🇦🇪</span>
            <span className="kz-gcc-badge">KUWAIT 🇰🇼</span>
            <span className="kz-gcc-badge">OMAN 🇴🇲</span>
            <span className="kz-gcc-badge">BAHRAIN 🇧🇭</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
