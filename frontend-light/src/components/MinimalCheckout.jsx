import React, { useState } from 'react';
import {
  CreditCard,
  ShieldCheck,
  Check,
  Sparkles,
  Loader2,
  Truck,
  ArrowLeft,
  ArrowRight,
  Lock,
  MessageSquare,
  PackageCheck,
  AlertCircle,
  MapPin,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { PriceTag } from './PriceTag';

const GCC_COUNTRIES = [
  { code: 'QA', name: 'Qatar', arabicName: 'دولة قطر', dialCode: '+974', flag: '🇶🇦' },
  { code: 'SA', name: 'Saudi Arabia', arabicName: 'المملكة العربية السعودية', dialCode: '+966', flag: '🇸🇦' },
  { code: 'AE', name: 'United Arab Emirates', arabicName: 'دولة الإمارات العربية المتحدة', dialCode: '+971', flag: '🇦🇪' },
  { code: 'KW', name: 'Kuwait', arabicName: 'دولة الكويت', dialCode: '+965', flag: '🇰🇼' },
  { code: 'OM', name: 'Oman', arabicName: 'سلطنة عُمان', dialCode: '+968', flag: '🇴🇲' },
  { code: 'BH', name: 'Bahrain', arabicName: 'مملكة البحرين', dialCode: '+973', flag: '🇧🇭' }
];

export const MinimalCheckout = ({ onReturnHome, onOrderComplete }) => {
  const { items, cartTotalQar, formatPrice } = useCart();
  const { isRtl } = useLanguage();

  const [step, setStep] = useState(1);
  const [selectedCountry, setSelectedCountry] = useState(GCC_COUNTRIES[0]);
  const [deliveryMethod, setDeliveryMethod] = useState('express_courier');
  const [formData, setFormData] = useState({
    name: 'Hamad Al-Kuwari',
    phone: '+974 5512 8900',
    email: 'h.alkuwari@domain.qa',
    city: 'Doha',
    address: 'Zone 55, Street 920, Villa 14',
    specialNotes: 'Ring doorbell on arrival',
    paymentMethod: 'card', // 'card' | 'cod' | 'whatsapp'
    cardNumber: '',
    cardExp: '',
    cardCvv: '',
    cardHolder: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationError('');
  };

  const handleCountryChange = (e) => {
    const country = GCC_COUNTRIES.find((c) => c.code === e.target.value) || GCC_COUNTRIES[0];
    setSelectedCountry(country);
    // If phone has a standard format, update dial code
    setFormData((prev) => {
      const rawNum = prev.phone.replace(/^\+\d{3}\s?/, '');
      return {
        ...prev,
        phone: `${country.dialCode} ${rawNum || '5512 8900'}`
      };
    });
  };

  const handleFillTestCard = () => {
    setFormData((prev) => ({
      ...prev,
      cardNumber: '4111 8900 1234 5678',
      cardExp: '11/29',
      cardCvv: '786',
      cardHolder: prev.name.toUpperCase() || 'HAMAD AL-KUWARI'
    }));
  };

  const handleProceedToStep2 = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setValidationError(isRtl ? 'يرجى إدخال الاسم ورقم الجوال للتواصل' : 'Please enter your full name and contact phone number');
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToStep3 = (e) => {
    e.preventDefault();
    if (!formData.city.trim() || !formData.address.trim()) {
      setValidationError(isRtl ? 'يرجى إدخال المدينة وعنوان التوصيل' : 'Please enter your city and delivery street address');
      return;
    }
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (formData.paymentMethod === 'card' && (!formData.cardNumber || !formData.cardExp || !formData.cardCvv)) {
      setValidationError(isRtl ? 'يرجى إكمال بيانات البطاقة البنكية أو النقر على الملء التجريبي' : 'Please complete your card details or click Autofill Test Card');
      return;
    }

    setIsProcessing(true);

    const randomRef = Math.floor(100000 + Math.random() * 900000);
    const orderData = {
      orderNumber: `KZ-${randomRef}`,
      invoiceNumber: `KZ-INV-${randomRef}`,
      date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      paymentMethod: formData.paymentMethod,
      paymentStatus: formData.paymentMethod === 'card' ? 'PAID / AUTHORIZED' : 'COD_PENDING_DISPATCH',
      authCode: `AUTH-${Math.floor(1000000 + Math.random() * 9000000)}-QA`,
      deliveryMethod: deliveryMethod === 'same_day' ? 'Doha Same-Day VIP Courier' : 'GCC Express Priority Air',
      items: items.length > 0 ? items.map((it) => ({
        ...it,
        specs: it.specs || '6061-T6 Billet Alloy · IP67 Hermetic Sealing · 45 Nm Powertrain',
        edition: it.edition || (it.sku?.includes('SLVR') ? 'Silver Edition' : 'Black Edition')
      })) : [
        {
          id: 9,
          sku: 'KAZEZ',
          name: 'Kazez Antenna Motor (Black Edition)',
          edition: 'Black Edition',
          specs: '6061-T6 Billet Alloy · IP67 Hermetic Sealing · 45 Nm Powertrain',
          price: 350,
          quantity: 1,
          image: '/assets/images/motor-black.webp',
          thumbnail: '/assets/images/motor-black.webp'
        }
      ],
      total: cartTotalQar || 350,
      customer: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        city: formData.city,
        country: selectedCountry.name,
        countryFlag: selectedCountry.flag,
        address: formData.address,
        notes: formData.specialNotes
      }
    };

    setTimeout(() => {
      setIsProcessing(false);
      onOrderComplete(orderData);
    }, 1100);
  };

  const currentTotal = cartTotalQar || 350;

  return (
    <div className="kz-checkout-view">
      <div className="kz-container">
        {/* Top return */}
        <div style={{ marginBottom: '28px' }}>
          <button
            type="button"
            className="kz-btn kz-btn-secondary kz-btn-sm"
            onClick={onReturnHome}
          >
            <ArrowLeft size={14} />
            <span>{isRtl ? 'العودة إلى صالة العرض' : 'Return to Showroom'}</span>
          </button>
        </div>

        <div className="kz-checkout-grid">
          {/* Left Column: Form Steps in Double-Bezel Card */}
          <div>
            {/* Stepper Header */}
            <div className="kz-stepper-bar">
              <div className={`kz-step-item ${step >= 1 ? 'active' : ''}`} onClick={() => setStep(1)} style={{ cursor: 'pointer' }}>
                <span className="kz-step-badge">1</span>
                <span className="kz-step-label-desktop">{isRtl ? 'بيانات التواصل' : 'Customer & Contact'}</span>
                <span className="kz-step-label-mobile">{isRtl ? 'التواصل' : 'Contact'}</span>
              </div>
              <div className="kz-step-line" />
              <div className={`kz-step-item ${step >= 2 ? 'active' : ''}`} onClick={() => formData.name && setStep(2)} style={{ cursor: formData.name ? 'pointer' : 'default' }}>
                <span className="kz-step-badge">2</span>
                <span className="kz-step-label-desktop">{isRtl ? 'عنوان التوصيل' : 'Delivery Destination'}</span>
                <span className="kz-step-label-mobile">{isRtl ? 'التوصيل' : 'Delivery'}</span>
              </div>
              <div className="kz-step-line" />
              <div className={`kz-step-item ${step >= 3 ? 'active' : ''}`}>
                <span className="kz-step-badge">3</span>
                <span className="kz-step-label-desktop">{isRtl ? 'وسيلة الدفع' : 'Payment Method'}</span>
                <span className="kz-step-label-mobile">{isRtl ? 'الدفع' : 'Payment'}</span>
              </div>
            </div>

            {/* Error Message */}
            {validationError && (
              <div
                style={{
                  background: '#FEF2F2',
                  border: '1px solid #FCA5A5',
                  color: '#991B1B',
                  padding: '12px 16px',
                  borderRadius: 'var(--kz-radius-md)',
                  marginBottom: '20px',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <AlertCircle size={16} />
                <span>{validationError}</span>
              </div>
            )}

            {/* Double Bezel Form Frame */}
            <div className="kz-double-bezel">
              <div className="kz-double-bezel-inner kz-checkout-card-inner">
                {step === 1 && (
                  <form onSubmit={handleProceedToStep2}>
                    <div className="kz-checkout-step-header">
                      <h2 style={{ fontFamily: 'var(--kz-font-display)', fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
                        {isRtl ? '1. معلومات العميل والاتصال المباشر' : '1. Client Contact & Identification'}
                      </h2>
                      <span className="kz-tag-telemetry">
                        STEP 1 OF 3
                      </span>
                    </div>

                    <div className="kz-form-group">
                      <label className="kz-form-label">{isRtl ? 'الاسم الكامل' : 'Full Recipient Name'} *</label>
                      <input
                        type="text"
                        name="name"
                        className="kz-form-input"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Hamad Al-Kuwari"
                        required
                      />
                    </div>

                    <div className="kz-form-row">
                      <div className="kz-form-group">
                        <label className="kz-form-label">{isRtl ? 'رقم الجوال (واتساب للتتبع)' : 'Mobile Phone (WhatsApp Tracking)'} *</label>
                        <input
                          type="tel"
                          name="phone"
                          className="kz-form-input"
                          style={{ fontFamily: 'var(--kz-font-mono)' }}
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+974 5512 8900"
                          required
                        />
                      </div>
                      <div className="kz-form-group">
                        <label className="kz-form-label">{isRtl ? 'البريد الإلكتروني' : 'Email Address (Invoice PDF)'}</label>
                        <input
                          type="email"
                          name="email"
                          className="kz-form-input"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="client@domain.qa"
                        />
                      </div>
                    </div>

                    <div style={{ marginTop: '24px' }}>
                      <button type="submit" className="kz-btn kz-btn-primary" style={{ width: '100%', padding: '14px' }}>
                        <span>{isRtl ? 'المتابعة إلى وجهة الشحن والتوصيل' : 'Continue to Delivery Destination'}</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </form>
                )}

                {step === 2 && (
                  <form onSubmit={handleProceedToStep3}>
                    <div className="kz-checkout-step-header">
                      <h2 style={{ fontFamily: 'var(--kz-font-display)', fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
                        {isRtl ? '2. وجهة الشحن والتوصيل' : '2. GCC Dispatch Destination'}
                      </h2>
                      <span className="kz-tag-telemetry">
                        STEP 2 OF 3
                      </span>
                    </div>

                    <div className="kz-form-row">
                      <div className="kz-form-group">
                        <label className="kz-form-label">{isRtl ? 'دولة التوصيل' : 'Destination Country'}</label>
                        <select
                          className="kz-form-input"
                          value={selectedCountry.code}
                          onChange={handleCountryChange}
                        >
                          {GCC_COUNTRIES.map((c) => (
                            <option key={c.code} value={c.code}>
                              {c.flag} {isRtl ? c.arabicName : c.name} ({c.dialCode})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="kz-form-group">
                        <label className="kz-form-label">{isRtl ? 'المدينة / المنطقة' : 'City / Area'} *</label>
                        <input
                          type="text"
                          name="city"
                          className="kz-form-input"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder={selectedCountry.code === 'QA' ? 'Doha / Al Rayyan / Lusail' : 'Riyadh / Dubai / Kuwait City'}
                          required
                        />
                      </div>
                    </div>

                    <div className="kz-form-group">
                      <label className="kz-form-label">{isRtl ? 'العنوان التفصيلي (المنطقة، الشارع، المبنى / الفيلا)' : 'Full Street & Villa Address'} *</label>
                      <input
                        type="text"
                        name="address"
                        className="kz-form-input"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="e.g. Zone 55, Street 920, Villa 14"
                        required
                      />
                    </div>

                    {/* Delivery Options */}
                    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
                      <label className="kz-form-label">{isRtl ? 'خدمة الشحن والتسليم' : 'Select Courier Logistics Speed'}</label>

                      <div
                        style={{
                          border: '1px solid',
                          borderColor: deliveryMethod === 'express_courier' ? 'var(--kz-text-primary)' : 'var(--kz-border)',
                          borderRadius: 'var(--kz-radius-md)',
                          padding: '12px 16px',
                          marginBottom: '10px',
                          background: deliveryMethod === 'express_courier' ? 'var(--kz-surface-subtle)' : '#FFFFFF',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                        onClick={() => setDeliveryMethod('express_courier')}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <Truck size={18} color="var(--kz-crimson)" />
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>
                              {selectedCountry.code === 'QA'
                                ? (isRtl ? 'توصيل سريع مباشر (خلال 24 ساعة)' : 'Express Courier Dispatch (Within 24 Hours)')
                                : (isRtl ? 'شحن جوي سريع لدول الخليج (2-3 أيام)' : 'GCC Priority Air Courier (2–3 Days)')}
                            </div>
                            <div style={{ fontSize: '0.78rem', color: 'var(--kz-text-muted)' }}>
                              {isRtl ? 'تتبع مباشر على واتساب مع تأمين كامل' : 'Direct tracking via WhatsApp with full transit insurance'}
                            </div>
                          </div>
                        </div>
                        <span style={{ fontFamily: 'var(--kz-font-mono)', fontWeight: 700, fontSize: '0.84rem', color: '#15803D' }}>
                          FREE
                        </span>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                      <button
                        type="button"
                        className="kz-btn kz-btn-secondary"
                        style={{ flex: 1 }}
                        onClick={() => setStep(1)}
                      >
                        <ArrowLeft size={16} />
                        <span>{isRtl ? 'السابق' : 'Back'}</span>
                      </button>
                      <button
                        type="submit"
                        className="kz-btn kz-btn-primary"
                        style={{ flex: 2 }}
                      >
                        <span>{isRtl ? 'المتابعة إلى اختيار طريقة الدفع' : 'Continue to Payment Method'}</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </form>
                )}

                {step === 3 && (
                  <form onSubmit={handleSubmitOrder}>
                    <div className="kz-checkout-step-header">
                      <h2 style={{ fontFamily: 'var(--kz-font-display)', fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
                        {isRtl ? '3. اختيار وسيلة الدفع والتأكيد' : '3. Payment & Order Execution'}
                      </h2>
                      <span className="kz-tag-telemetry">
                        STEP 3 OF 3
                      </span>
                    </div>

                    {/* Option A: Card */}
                    <div
                      className={`kz-payment-option ${formData.paymentMethod === 'card' ? 'active' : ''}`}
                      onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: 'card' }))}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <CreditCard size={20} color="var(--kz-crimson)" />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>
                            {isRtl ? 'بطاقة بنكية مشفرة (فيزا / ماستركارد / مدى)' : 'Credit or Debit Card (Visa / Mastercard / Mada)'}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--kz-text-muted)' }}>
                            {isRtl ? 'بوابة دفع مصرفية آمنة 256-bit' : 'Encrypted 256-bit secure gateway'}
                          </div>
                        </div>
                      </div>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid', borderColor: formData.paymentMethod === 'card' ? 'var(--kz-text-primary)' : 'var(--kz-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {formData.paymentMethod === 'card' && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--kz-text-primary)' }} />}
                      </div>
                    </div>

                    {formData.paymentMethod === 'card' && (
                      <div style={{ background: 'var(--kz-surface-subtle)', border: '1px solid var(--kz-border)', borderRadius: 'var(--kz-radius-md)', padding: '18px', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--kz-text-muted)', fontFamily: 'var(--kz-font-mono)' }}>
                            ENTER CARD CREDENTIALS
                          </span>
                          <button
                            type="button"
                            className="kz-btn kz-btn-sm kz-btn-secondary"
                            onClick={handleFillTestCard}
                            style={{ fontSize: '0.72rem', padding: '4px 10px', height: 'auto' }}
                          >
                            <Sparkles size={12} />
                            <span>Autofill Test Card</span>
                          </button>
                        </div>

                        <div className="kz-form-group">
                          <label className="kz-form-label">{isRtl ? 'اسم حامل البطاقة' : 'Cardholder Name'}</label>
                          <input
                            type="text"
                            name="cardHolder"
                            className="kz-form-input"
                            placeholder="HAMAD AL-KUWARI"
                            value={formData.cardHolder}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="kz-form-group">
                          <label className="kz-form-label">{isRtl ? 'رقم البطاقة البنكية' : 'Card Number'}</label>
                          <input
                            type="text"
                            name="cardNumber"
                            className="kz-form-input"
                            style={{ fontFamily: 'var(--kz-font-mono)', letterSpacing: '0.04em' }}
                            placeholder="4111 8900 1234 5678"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                          />
                        </div>

                        <div className="kz-form-row">
                          <div className="kz-form-group">
                            <label className="kz-form-label">{isRtl ? 'تاريخ الانتهاء' : 'Expiry (MM/YY)'}</label>
                            <input
                              type="text"
                              name="cardExp"
                              className="kz-form-input"
                              style={{ fontFamily: 'var(--kz-font-mono)' }}
                              placeholder="11/29"
                              value={formData.cardExp}
                              onChange={handleInputChange}
                            />
                          </div>
                          <div className="kz-form-group">
                            <label className="kz-form-label">CVV / CVC</label>
                            <input
                              type="text"
                              name="cardCvv"
                              className="kz-form-input"
                              style={{ fontFamily: 'var(--kz-font-mono)' }}
                              placeholder="786"
                              value={formData.cardCvv}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Option B: Cash on Delivery (COD) */}
                    <div
                      className={`kz-payment-option ${formData.paymentMethod === 'cod' ? 'active' : ''}`}
                      onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: 'cod' }))}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Truck size={20} color="#059669" />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>
                            {isRtl ? 'الدفع عند الاستلام / الشبكة المتنقلة' : 'Cash on Delivery / Mobile POS Terminal'}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--kz-text-muted)' }}>
                            {isRtl ? 'ادفع نقداً أو بالبطاقة عند معاينة واستلام الشحنة' : 'Inspect hardware upon courier handover before payment'}
                          </div>
                        </div>
                      </div>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid', borderColor: formData.paymentMethod === 'cod' ? 'var(--kz-text-primary)' : 'var(--kz-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {formData.paymentMethod === 'cod' && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--kz-text-primary)' }} />}
                      </div>
                    </div>

                    {/* Option C: WhatsApp Direct Concierge */}
                    <div
                      className={`kz-payment-option ${formData.paymentMethod === 'whatsapp' ? 'active' : ''}`}
                      onClick={() => setFormData((prev) => ({ ...prev, paymentMethod: 'whatsapp' }))}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <MessageSquare size={20} color="#25D366" />
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.92rem' }}>
                            {isRtl ? 'تأكيد فوري عبر واتساب كزاز' : 'Instant WhatsApp Concierge Order'}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--kz-text-muted)' }}>
                            {isRtl ? 'تحويل مباشر لفريق خدمة العملاء لإرسال رابط الدفع أو الترتيب المباشر' : 'Direct dispatch handover with our Doha client specialist'}
                          </div>
                        </div>
                      </div>
                      <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '2px solid', borderColor: formData.paymentMethod === 'whatsapp' ? 'var(--kz-text-primary)' : 'var(--kz-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {formData.paymentMethod === 'whatsapp' && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--kz-text-primary)' }} />}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
                      <button
                        type="button"
                        className="kz-btn kz-btn-secondary"
                        style={{ flex: 1 }}
                        onClick={() => setStep(2)}
                        disabled={isProcessing}
                      >
                        <ArrowLeft size={16} />
                        <span>{isRtl ? 'السابق' : 'Back'}</span>
                      </button>
                      <button
                        type="submit"
                        className="kz-btn kz-btn-primary"
                        style={{ flex: 2, padding: '14px' }}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 size={16} className="animate-spin" />
                            <span>{isRtl ? 'جاري تأكيد الطلب...' : 'Processing Order...'}</span>
                          </>
                        ) : (
                          <>
                            <Lock size={15} />
                            <span>{isRtl ? 'تأكيد وإتمام الطلب' : 'Complete & Place Order'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary in Double-Bezel Card */}
          <div>
            <div className="kz-double-bezel" style={{ position: 'sticky', top: '100px' }}>
              <div className="kz-double-bezel-inner kz-checkout-summary-inner">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid var(--kz-border)' }}>
                  <h3 style={{ fontFamily: 'var(--kz-font-display)', fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
                    {isRtl ? 'ملخص الطلب' : 'Order Summary'}
                  </h3>
                  <span style={{ fontFamily: 'var(--kz-font-mono)', fontSize: '0.78rem', color: 'var(--kz-text-muted)' }}>
                    {items.length > 0 ? items.reduce((acc, it) => acc + it.quantity, 0) : 1} ITEM(S)
                  </span>
                </div>

                {items.length > 0 ? (
                  items.map((it) => (
                    <div key={it.sku} style={{ display: 'flex', gap: '14px', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--kz-border-subtle)', alignItems: 'center' }}>
                      <div
                        style={{
                          width: '54px',
                          height: '54px',
                          background: 'radial-gradient(circle at center, #FFFFFF 0%, #F8FAFC 100%)',
                          border: '1px solid var(--kz-border-subtle)',
                          borderRadius: 'var(--kz-radius-md)',
                          padding: '4px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        <img
                          src={it.thumbnail || it.image}
                          alt={it.name}
                          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                        />
                      </div>
                      <div style={{ flexGrow: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--kz-text-primary)' }}>
                          {it.edition || it.name}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--kz-text-muted)' }}>
                          Qty: {it.quantity} · {it.finish}
                        </div>
                      </div>
                      <div style={{ fontFamily: 'var(--kz-font-mono)', fontWeight: 700, fontSize: '0.92rem' }}>
                        <PriceTag amountInQar={it.price * it.quantity} />
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ display: 'flex', gap: '14px', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid var(--kz-border-subtle)', alignItems: 'center' }}>
                    <div
                      style={{
                        width: '54px',
                        height: '54px',
                        background: '#FFFFFF',
                        border: '1px solid var(--kz-border-subtle)',
                        borderRadius: 'var(--kz-radius-md)',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <img
                        src="/assets/images/motor-black.webp"
                        alt="Kazez Black"
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                      />
                    </div>
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>Kazez Antenna Motor (Black Edition)</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--kz-text-muted)' }}>Qty: 1 · Satin Anodized Black</div>
                    </div>
                    <div style={{ fontFamily: 'var(--kz-font-mono)', fontWeight: 700, fontSize: '0.92rem' }}>
                      <PriceTag amountInQar={350} />
                    </div>
                  </div>
                )}

                {/* Subtotal row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', color: 'var(--kz-text-secondary)', marginBottom: '10px' }}>
                  <span>{isRtl ? 'قيمة المنتجات' : 'Subtotal'}</span>
                  <PriceTag amountInQar={currentTotal} />
                </div>

                {/* Shipping row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', color: '#15803D', fontWeight: 600, marginBottom: '16px' }}>
                  <span>{isRtl ? 'الشحن السريع المباشر' : 'Express Courier'}</span>
                  <span>{isRtl ? 'مجاني (0.00)' : 'FREE (0.00)'}</span>
                </div>

                {/* Total row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '16px', borderTop: '1px solid var(--kz-border)', marginBottom: '20px' }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--kz-text-primary)' }}>
                      {isRtl ? 'المجموع النهائي' : 'Total Due'}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--kz-text-muted)' }}>
                      {isRtl ? 'شامل الضمان والشحن' : 'Includes 1-Yr Warranty & Courier'}
                    </div>
                  </div>
                  <span style={{ fontFamily: 'var(--kz-font-mono)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--kz-crimson)' }}>
                    <PriceTag amountInQar={currentTotal} />
                  </span>
                </div>

                {/* Assurance box */}
                <div
                  style={{
                    background: 'var(--kz-surface-subtle)',
                    border: '1px solid var(--kz-border)',
                    borderRadius: 'var(--kz-radius-md)',
                    padding: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                >
                  <ShieldCheck size={18} color="#15803D" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '0.82rem', color: 'var(--kz-text-secondary)', lineHeight: '1.4' }}>
                    {isRtl
                      ? 'جميع منتجات كزاز مشمولة بضمان استبدال مباشر فوري لمدة عام كامل من صالة عرض الدوحة.'
                      : 'Covered by official 1-Year Direct Replacement Warranty from Kazez Doha Desk.'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
