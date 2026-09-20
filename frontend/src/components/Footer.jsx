import React from 'react';
import { ShieldCheck, Truck, RefreshCw, MessageSquare, ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export const Footer = ({ onNavigate }) => {
  const { currency, setCurrency } = useCart();
  const { t, isRtl } = useLanguage();

  return (
    <footer style={{ background: '#050505', borderTop: '1px solid var(--kz-border)', color: 'var(--kz-text-muted)' }}>
      {/* Upper Value Assurance Strip */}
      <div className="kz-footer-assurance-strip">
        <div className="kz-container">
          <div className="kz-footer-assurance-grid">
            <div className="kz-footer-assurance-tile">
              <div className="kz-assurance-icon-wrap">
                <ShieldCheck size={20} />
              </div>
              <div className="kz-assurance-content">
                <div className="kz-assurance-title">
                  {isRtl ? 'ضمان شامل لمدة عام' : '1-Year Direct Warranty'}
                </div>
                <div className="kz-assurance-desc">
                  {isRtl ? 'تغطية ميكانيكية وكهربائية كاملة' : 'Comprehensive mechanical & electrical coverage'}
                </div>
              </div>
            </div>

            <div className="kz-footer-assurance-tile">
              <div className="kz-assurance-icon-wrap">
                <Truck size={20} />
              </div>
              <div className="kz-assurance-content">
                <div className="kz-assurance-title">
                  {isRtl ? 'شحن سريع لدول الخليج' : 'GCC Express Courier'}
                </div>
                <div className="kz-assurance-desc">
                  {isRtl ? 'توصيل فوري في الدوحة و24-48 ساعة للخليج' : 'Same-day in Doha · 24-48h GCC Express'}
                </div>
              </div>
            </div>

            <div className="kz-footer-assurance-tile">
              <div className="kz-assurance-icon-wrap">
                <RefreshCw size={20} />
              </div>
              <div className="kz-assurance-content">
                <div className="kz-assurance-title">
                  {isRtl ? 'توافق تام مع مختلف السيارات' : 'Guaranteed Vehicle Fitment'}
                </div>
                <div className="kz-assurance-desc">
                  {isRtl ? 'قواعد تثبيت مخصصة لمركبات الدفع الرباعي' : 'Machined vehicle bracket integration'}
                </div>
              </div>
            </div>

            <div className="kz-footer-assurance-tile">
              <div className="kz-assurance-icon-wrap">
                <MessageSquare size={20} />
              </div>
              <div className="kz-assurance-content">
                <div className="kz-assurance-title">
                  {isRtl ? 'خدمة عملاء ومهندسين بالدوحة' : 'Doha Concierge Support'}
                </div>
                <div className="kz-assurance-desc">
                  {isRtl ? 'دعم فني مباشر عبر الواتساب طوال الأسبوع' : 'Direct WhatsApp fitment assistance 7 days/wk'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="kz-container" style={{ padding: '64px clamp(16px, 3vw, 32px)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px'
        }}>
          {/* Brand Col */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <span className="kz-brand-text" style={{ fontSize: '22px' }}>
                KAZEZ<span className="kz-brand-dot">.</span>
              </span>
            </div>

            <p style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.7, color: 'var(--kz-text-muted)', marginBottom: '24px' }}>
              {t.footer.tagline}
            </p>

            <div style={{ fontFamily: 'var(--kz-font-mono)', fontSize: '12px', color: 'var(--kz-text-dim)', letterSpacing: '0.04em' }}>
              {isRtl ? 'المقر الرئيسي: الدوحة، دولة قطر' : 'HEADQUARTERS: DOHA, QATAR'}
            </div>
          </div>

          {/* Editions Col */}
          <div>
            <div style={{ fontFamily: 'var(--kz-font-mono)', fontSize: '12px', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '16px', fontWeight: 500 }}>
              {t.footer.editionsHeader}
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('kazez-black')}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'var(--kz-text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>{t.nav.blackEdition}</span>
                  <ArrowUpRight size={12} color="var(--kz-racing-red)" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('kazez-silver')}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'var(--kz-text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>{t.nav.silverEdition}</span>
                  <ArrowUpRight size={12} color="var(--kz-racing-red)" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('engineering')}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'var(--kz-text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <span>{t.nav.engineeringLab}</span>
                  <ArrowUpRight size={12} color="var(--kz-racing-red)" />
                </button>
              </li>
            </ul>
          </div>

          {/* Technical Specs Col */}
          <div>
            <div style={{ fontFamily: 'var(--kz-font-mono)', fontSize: '12px', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '16px', fontWeight: 500 }}>
              {t.footer.specsHeader}
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('engineering')}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'var(--kz-text-muted)', cursor: 'pointer' }}
                >
                  {isRtl ? 'سبيكة ألمنيوم 6061-T6 الطائرات' : '6061-T6 Monocoque Billet Alloy'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('engineering')}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'var(--kz-text-muted)', cursor: 'pointer' }}
                >
                  {isRtl ? 'اختبارات العزل المائي IP67' : 'IP67 Lab Immersion Testing'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('engineering')}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'var(--kz-text-muted)', cursor: 'pointer' }}
                >
                  {isRtl ? 'عزم التروس الكوكبية 45 ن.م' : '45 Nm Planetary Powertrain'}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate('engineering')}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'var(--kz-text-muted)', cursor: 'pointer' }}
                >
                  {isRtl ? 'استمرارية تأريض RF بنسبة 100%' : 'Zero-Loss RF Ground Continuity'}
                </button>
              </li>
            </ul>
          </div>

          {/* Showroom Contact */}
          <div>
            <div style={{ fontFamily: 'var(--kz-font-mono)', fontSize: '12px', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.04em', marginBottom: '16px', fontWeight: 500 }}>
              {t.nav.showroom}
            </div>
            <div style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--kz-text-muted)', marginBottom: '16px' }}>
              {t.contact.dohaAddress}
            </div>
            <div style={{ fontFamily: 'var(--kz-font-mono)', fontSize: '13px', color: '#ffffff', marginBottom: '16px', direction: 'ltr', textAlign: isRtl ? 'right' : 'left' }}>
              TEL: +974 5512 8900
            </div>
            <button
              type="button"
              onClick={() => onNavigate('contact')}
              className="kz-btn kz-btn-secondary kz-btn-island kz-btn-sm"
            >
              <span>{isRtl ? 'حجز موعد في صالة العرض' : 'Book Showroom Fitment'}</span>
              <span className="kz-btn-island-icon">
                <ArrowUpRight size={12} />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Copyright Bar & Legal Compliance Links */}
      <div style={{ borderTop: '1px solid var(--kz-border)', background: '#030303' }}>
        <div className="kz-container" style={{
          padding: '24px clamp(16px, 3vw, 32px)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ fontFamily: 'var(--kz-font-mono)', fontSize: '12px', color: 'var(--kz-text-dim)', letterSpacing: '0.03em' }}>
              {t.footer.copyright}
            </div>

            {/* Strategic Legal & Compliance Links */}
            <div className="kz-footer-legal-bar">
              <button type="button" className="kz-footer-legal-link" onClick={() => onNavigate('engineering')}>
                {isRtl ? 'معايير الجودة والضمان' : 'Warranty Terms'}
              </button>
              <span style={{ color: 'var(--kz-border)' }}>·</span>
              <button type="button" className="kz-footer-legal-link" onClick={() => onNavigate('contact')}>
                {isRtl ? 'سياسة الخصوصية والتسليم' : 'Privacy & Dispatch'}
              </button>
              <span style={{ color: 'var(--kz-border)' }}>·</span>
              <button type="button" className="kz-footer-legal-link" onClick={() => onNavigate('engineering')}>
                {isRtl ? 'مطابقة مواصفات الخليج' : 'GCC Compliance'}
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontFamily: 'var(--kz-font-mono)', fontSize: '12px', color: 'var(--kz-text-dim)' }}>
              {isRtl ? 'العملة:' : 'CURRENCY:'}
            </span>
            {['QAR', 'SAR', 'AED', 'USD'].map((cur) => (
              <button
                key={cur}
                type="button"
                onClick={() => setCurrency(cur)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  fontFamily: 'var(--kz-font-mono)',
                  fontSize: '12px',
                  fontWeight: currency === cur ? 600 : 400,
                  color: currency === cur ? 'var(--kz-racing-red)' : 'var(--kz-text-dim)',
                  cursor: 'pointer'
                }}
              >
                {cur}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
