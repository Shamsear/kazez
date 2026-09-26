import React from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  Plus, 
  Car, 
  Compass, 
  ArrowRight, 
  ExternalLink,
  MessageCircle,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const AntennaBracketAdvisory = ({ currentProduct, onBrowseBrackets }) => {
  const { isRtl } = useLanguage();

  const motorImage = currentProduct?.sku === 'KAZEZ-SLVR'
    ? '/assets/images/motor-silver.webp'
    : '/assets/images/motor-black.webp';

  const bracketImage = '/assets/images/antenna-bracket.png';

  const scrollToConfigurator = () => {
    if (onBrowseBrackets) {
      onBrowseBrackets();
      return;
    }
    const el = document.querySelector('.kz-bracket-configurator') || document.getElementById('kz-brackets');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section className="kz-bracket-advisory-card kz-reveal" aria-label="Installation Prerequisite Notice">
      {/* Top Advisory Banner */}
      <div className="kz-advisory-head">
        <div className="kz-advisory-badge">
          <AlertTriangle size={13} strokeWidth={2.2} />
          <span>{isRtl ? 'متطلب أساسي للتركيب' : 'Installation Prerequisite'}</span>
        </div>
        <h3 className="kz-advisory-title">
          {isRtl ? 'تنبيه هام: قاعدة تثبيت الهوائي مطلوبة' : 'Important: Antenna Bracket Required'}
        </h3>
        <p className="kz-advisory-sub">
          {isRtl 
            ? 'يرجى قراءة هذه المعلومات والتعليمات بعناية قبل إتمام عملية الشراء'
            : 'Please read this information before purchasing'}
        </p>
      </div>

      {/* Visual Synergy Schematic: Motor + Bracket = Needed */}
      <div className="kz-advisory-schematic">
        <div className="kz-schematic-flow">
          {/* Motor Item */}
          <div className="kz-schematic-item">
            <div className="kz-schematic-img-box">
              <img src={motorImage} alt="Kazez Antenna Motor" />
            </div>
            <div className="kz-schematic-meta">
              <span className="kz-schematic-label">
                {isRtl ? 'محرك الهوائي' : 'Kazez Antenna Motor'}
              </span>
              <span className="kz-schematic-tag">
                {currentProduct?.edition || (isRtl ? 'محرك كزاز' : 'Motor Actuator')}
              </span>
            </div>
          </div>

          {/* Plus Indicator */}
          <div className="kz-schematic-operator">
            <span className="kz-schematic-plus">
              <Plus size={16} strokeWidth={3} />
            </span>
            <span className="kz-schematic-needed-tag">
              {isRtl ? 'مطلوب' : 'Needed'}
            </span>
          </div>

          {/* Bracket Item */}
          <div className="kz-schematic-item">
            <div className="kz-schematic-img-box">
              <img src={bracketImage} alt="Kazez Antenna Bracket" />
            </div>
            <div className="kz-schematic-meta">
              <span className="kz-schematic-label">
                {isRtl ? 'قاعدة التثبيت' : 'Kazez Antenna Bracket'}
              </span>
              <span className="kz-schematic-tag">
                {isRtl ? 'حسب طراز سيارتك' : 'Per Vehicle Model'}
              </span>
            </div>
          </div>
        </div>

        {/* Required Outcome Pill */}
        <div className="kz-schematic-required-bar">
          <CheckCircle2 size={15} color="#10B981" />
          <span>
            {isRtl 
              ? 'كلاهما مطلوب لإتمام التركيب بنجاح دون أي ثقب للهيكل'
              : 'Both required for complete installation'}
          </span>
        </div>
      </div>

      {/* Two Step Pathway: 01 Availability & 02 Custom Bracket */}
      <div className="kz-advisory-steps-grid">
        {/* Step 01: Check Availability */}
        <div className="kz-advisory-step-card">
          <div className="kz-step-num-pill">01</div>
          <h4 className="kz-step-card-title">
            {isRtl ? 'فحص توفر قاعدة تثبيت الهوائي' : 'Check Antenna Bracket Availability'}
          </h4>
          <p className="kz-step-card-desc">
            {isRtl
              ? 'لهذا المحرك، يلزمك شراء قاعدة تثبيت مخصصة بحسب طراز سيارتك. يرجى التحقق من توفر القاعدة لطراز سيارتك لدى فروعنا وموزعينا أو عبر خيارات التوافق أعلاه.'
              : 'For this antenna motor, you need to purchase an antenna bracket according to your car model. Please check at our different branches if the antenna bracket is available for your car model.'}
          </p>
          <button 
            type="button" 
            className="kz-step-card-btn"
            onClick={scrollToConfigurator}
          >
            <Car size={13} />
            <span>{isRtl ? 'اختر سيارتك من القائمة أعلاه' : 'Check 14 Supported Models'}</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* Step 02: Custom Bracket */}
        <div className="kz-advisory-step-card">
          <div className="kz-step-num-pill">02</div>
          <h4 className="kz-step-card-title">
            {isRtl ? 'تصنيع قاعدة مخصصة لسيارتك' : 'Custom Bracket For Your Car'}
          </h4>
          <p className="kz-step-card-desc">
            {isRtl
              ? 'في حال عدم توفر قاعدة تثبيت جاهزة لسيارتك، يرجى زيارة مقرنا الرئيسي وطلب قاعدة مخصصة. سنقوم بتصميم وتصنيع قاعدة جديدة خصيصاً لمركبتك.'
              : 'If there is no antenna bracket available for your car, please visit our head office and order a custom antenna bracket. We will manufacture a new one specifically for your car.'}
          </p>
          <a 
            href="https://wa.me/97450115975?text=Hello%2C%20I%20would%20like%20to%20order%20a%20custom%20Kazez%20antenna%20bracket%20for%20my%20car" 
            target="_blank" 
            rel="noopener noreferrer"
            className="kz-step-card-btn custom-accent"
          >
            <MessageCircle size={13} />
            <span>{isRtl ? 'طلب تفصيل قاعدة مخصصة' : 'Order Custom Bracket via WhatsApp'}</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>

      {/* Thabt Head Office & Contact Deck */}
      <div className="kz-advisory-office-deck">
        <div className="kz-office-header">
          <div className="kz-office-badge">
            <ShieldCheck size={13} />
            <span>{isRtl ? 'المقر الرئيسي ومركز الأبحاث' : 'Thabt Head Office & Research Center'}</span>
          </div>
          <div className="kz-office-company">
            {isRtl ? 'حلول الخليج الرقمية (ثَبْت)' : 'Gulf Digital Solution (Thabt)'}
          </div>
        </div>

        {/* Address */}
        <div className="kz-office-address-row">
          <div className="kz-office-icon-wrap">
            <MapPin size={16} />
          </div>
          <div className="kz-office-address-text">
            <span>Building 185, Unit 37, Street 100, Zone 56, Doha, Qatar</span>
            <a 
              href="https://maps.google.com/?q=Building+185+Street+100+Zone+56+Doha+Qatar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="kz-office-map-link"
            >
              <Compass size={12} />
              <span>{isRtl ? 'عرض على خرائط جوجل ↗' : 'Google Maps ↗'}</span>
            </a>
          </div>
        </div>

        {/* Call Us Section */}
        <div className="kz-office-phones-block">
          <div className="kz-phones-label">
            <Phone size={13} />
            <span>{isRtl ? 'اتصل بنا / الدعم الهاتفي المباشر:' : 'Call Us:'}</span>
          </div>
          <div className="kz-phones-grid">
            {/* Phone 1 */}
            <div className="kz-phone-chip">
              <a href="tel:+97450115975" className="kz-phone-link" aria-label="Call +974 5011 5975">
                <span className="kz-phone-num">+974 5011 5975</span>
              </a>
              <a 
                href="https://wa.me/97450115975" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="kz-phone-wa"
                title="WhatsApp"
              >
                WA ↗
              </a>
            </div>

            {/* Phone 2 */}
            <div className="kz-phone-chip">
              <a href="tel:+97450152425" className="kz-phone-link" aria-label="Call +974 5015 2425">
                <span className="kz-phone-num">+974 5015 2425</span>
              </a>
              <a 
                href="https://wa.me/97450152425" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="kz-phone-wa"
                title="WhatsApp"
              >
                WA ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AntennaBracketAdvisory;
