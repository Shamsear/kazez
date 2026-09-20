import React, { useState } from 'react';
import { CreditCard, ShieldCheck, Check, Sparkles, Loader2, Truck, ArrowLeft, ArrowRight, Lock, MessageCircle, DollarSign, PackageCheck, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { PriceTag } from './PriceTag';

export const CheckoutPage = ({ onReturnHome, onOrderComplete }) => {
  const { items, cartTotalQar, openCart, formatPrice, currency } = useCart();
  const { t, isRtl } = useLanguage();

  const [step, setStep] = useState(1); // 1: Contact, 2: Vehicle & Address, 3: Payment
  const [formData, setFormData] = useState({
    name: 'Sheikh Hamad Al-Thani',
    phone: '+974 5512 8900',
    email: 'hamad.althani@example.qa',
    vehicleMake: 'Toyota',
    vehicleModel: 'Land Cruiser LC300 GR-S',
    vehicleYear: '2024',
    country: 'Qatar',
    city: 'Doha',
    address: 'Zone 55, Street 920, Villa 14',
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

  const handleFillTestCard = () => {
    setFormData((prev) => ({
      ...prev,
      cardNumber: '4111 8900 1234 5678',
      cardExp: '11/29',
      cardCvv: '786',
      cardHolder: prev.name || 'SHEIKH HAMAD AL-THANI'
    }));
  };

  const handleProceedToStep2 = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setValidationError(isRtl ? 'يرجى إدخال الاسم ورقم الجوال للتواصل' : 'Please enter your name and phone number');
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProceedToStep3 = (e) => {
    e.preventDefault();
    if (!formData.city.trim() || !formData.address.trim()) {
      setValidationError(isRtl ? 'يرجى إدخال المدينة وعنوان التسليم' : 'Please enter your city and delivery address');
      return;
    }
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    if (formData.paymentMethod === 'card' && (!formData.cardNumber || !formData.cardExp || !formData.cardCvv)) {
      setValidationError(isRtl ? 'يرجى إكمال بيانات البطاقة أو استخدام الزر التجريبي' : 'Please complete card details or use the Autofill button');
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
      paymentStatus: formData.paymentMethod === 'card' ? 'PAID' : 'COD_PENDING',
      authCode: `AUTH-${Math.floor(1000000 + Math.random() * 9000000)}-QA`,
      items: items.length > 0 ? items.map((it) => ({
        ...it,
        specs: it.specs || '6061-T6 Billet Alloy · IP67 Hermetic Sealing · 45 Nm Powertrain',
        edition: it.edition || (it.sku?.includes('SLVR') ? 'Silver Edition' : 'Black Edition')
      })) : [
        {
          id: 9,
          sku: 'KZ-ACT-BLK',
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
      customer: { ...formData }
    };

    // Simulate realistic 2-second bank authorization gateway
    setTimeout(() => {
      setIsProcessing(false);
      onOrderComplete(orderData);
    }, 1800);
  };

  return (
    <div className="kz-checkout-page" style={{ paddingTop: '100px', paddingBottom: '90px', minHeight: '100vh', background: 'var(--kz-obsidian)' }}>
      <div className="kz-container">
        {/* Top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '12px' }}>
          <button
            type="button"
            className="kz-btn kz-btn-secondary kz-btn-sm"
            onClick={onReturnHome}
          >
            <ArrowLeft size={15} style={{ transform: isRtl ? 'rotate(180deg)' : 'none' }} /> {t.checkout.backToStorefront}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--kz-text-muted)', fontSize: '0.82rem', fontFamily: isRtl ? 'var(--kz-font-arabic)' : 'var(--kz-font-mono)' }}>
            <Lock size={14} color="var(--kz-racing-red)" />
            <span>{t.checkout.securityNote}</span>
          </div>
        </div>

        {/* Page Header */}
        <div style={{ marginBottom: '36px' }}>
          <div className="kz-tag-telemetry" style={{ marginBottom: '12px' }}>
            <span>CHECKOUT PIPELINE // QATAR LOGISTICS</span>
          </div>
          <h1 className="kz-hero-title" style={{ fontSize: 'clamp(2rem, 3.8vw, 3.2rem)', margin: '0 0 8px' }}>
            {t.checkout.pageTitle}
          </h1>
          <p style={{ color: 'var(--kz-text-secondary)', fontSize: '1rem', fontWeight: 300, margin: 0 }}>
            {t.checkout.pageSubtitle}
          </p>
        </div>

        {/* Step Progression Indicator */}
        <div className="kz-step-indicator" style={{ background: 'var(--kz-panel)', padding: '18px 24px', borderRadius: 'var(--kz-radius-md)', marginBottom: '32px' }}>
          <div className={`kz-step-dot ${step >= 1 ? 'active' : ''}`} onClick={() => setStep(1)} style={{ cursor: 'pointer' }}>
            <span className="kz-step-num">01</span>
            <span className="kz-step-dot-text">{t.checkout.step1Title}</span>
          </div>
          <div className={`kz-step-dot ${step >= 2 ? 'active' : ''}`} onClick={() => setStep(2)} style={{ cursor: step > 2 ? 'pointer' : 'default' }}>
            <span className="kz-step-num">02</span>
            <span className="kz-step-dot-text">{t.checkout.step2Title}</span>
          </div>
          <div className={`kz-step-dot ${step >= 3 ? 'active' : ''}`}>
            <span className="kz-step-num">03</span>
            <span className="kz-step-dot-text">{t.checkout.step3Title}</span>
          </div>
        </div>

        {/* Validation Error Alert */}
        {validationError && (
          <div style={{
            background: 'rgba(204, 0, 27, 0.12)',
            border: '1px solid var(--kz-racing-red)',
            borderRadius: 'var(--kz-radius-sm)',
            padding: '12px 18px',
            marginBottom: '24px',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.88rem'
          }}>
            <AlertCircle size={18} color="var(--kz-racing-red)" />
            <span>{validationError}</span>
          </div>
        )}

        {/* 2-Column Checkout Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 1fr)',
          gap: '36px',
          alignItems: 'start'
        }} className="kz-checkout-layout">
          {/* LEFT: Step Form Stage */}
          <div style={{
            background: 'var(--kz-panel)',
            border: '1px solid var(--kz-border)',
            borderRadius: 'var(--kz-radius-lg)',
            padding: 'clamp(24px, 3vw, 36px)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}>
            {/* STEP 1: Contact Information */}
            {step === 1 && (
              <form onSubmit={handleProceedToStep2}>
                <h2 style={{ fontFamily: 'var(--kz-font-display)', fontSize: '1.45rem', fontWeight: 500, textTransform: 'uppercase', marginBottom: '8px' }}>
                  01 / {t.checkout.step1Title}
                </h2>
                <p style={{ fontSize: '0.88rem', fontWeight: 300, color: 'var(--kz-text-secondary)', marginBottom: '28px' }}>
                  {isRtl ? 'أدخل بيانات التواصل لتأكيد حجز واستلام الشحنة من مستودعات الدوحة.' : 'Provide your contact details for instant dispatch confirmation and live telemetry.'}
                </p>

                <div className="kz-form-group">
                  <label className="kz-form-label">{t.checkout.fullName} *</label>
                  <input
                    type="text"
                    name="name"
                    className="kz-form-input"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t.checkout.fullNamePlaceholder}
                    required
                  />
                </div>

                <div className="kz-form-group">
                  <label className="kz-form-label">{t.checkout.phone} *</label>
                  <input
                    type="tel"
                    name="phone"
                    className="kz-form-input"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder={t.checkout.phonePlaceholder}
                    required
                  />
                </div>

                <div className="kz-form-group">
                  <label className="kz-form-label">{t.checkout.email}</label>
                  <input
                    type="email"
                    name="email"
                    className="kz-form-input"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t.checkout.emailPlaceholder}
                  />
                </div>

                <button
                  type="submit"
                  className="kz-btn kz-btn-primary kz-btn-island"
                  style={{ width: '100%', marginTop: '16px' }}
                >
                  <span>{t.checkout.btnToStep2}</span>
                  <span className="kz-btn-island-icon">
                    {isRtl ? '←' : '→'}
                  </span>
                </button>
              </form>
            )}

            {/* STEP 2: Vehicle & Shipping Address */}
            {step === 2 && (
              <form onSubmit={handleProceedToStep3}>
                <h2 style={{ fontFamily: 'var(--kz-font-display)', fontSize: '1.45rem', fontWeight: 500, textTransform: 'uppercase', marginBottom: '8px' }}>
                  02 / {t.checkout.step2Title}
                </h2>
                <p style={{ fontSize: '0.88rem', fontWeight: 300, color: 'var(--kz-text-secondary)', marginBottom: '28px' }}>
                  {isRtl ? 'حدد نوع وموديل سيارتك وعنوان التسليم لضمان التوافق التام وسرعة التوصيل.' : 'Specify your vehicle model and Gulf delivery location for verified hardware compatibility.'}
                </p>

                {/* Vehicle 3-column row */}
                <div className="kz-checkout-vehicle-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '20px' }}>
                  <div>
                    <label className="kz-form-label">{t.checkout.vehicleMake}</label>
                    <input
                      type="text"
                      name="vehicleMake"
                      className="kz-form-input"
                      value={formData.vehicleMake}
                      onChange={handleInputChange}
                      placeholder="Toyota / Nissan / GMC"
                    />
                  </div>
                  <div>
                    <label className="kz-form-label">{t.checkout.vehicleModel}</label>
                    <input
                      type="text"
                      name="vehicleModel"
                      className="kz-form-input"
                      value={formData.vehicleModel}
                      onChange={handleInputChange}
                      placeholder="Land Cruiser / Patrol"
                    />
                  </div>
                  <div>
                    <label className="kz-form-label">{t.checkout.vehicleYear}</label>
                    <input
                      type="text"
                      name="vehicleYear"
                      className="kz-form-input"
                      value={formData.vehicleYear}
                      onChange={handleInputChange}
                      placeholder="2024"
                    />
                  </div>
                </div>

                {/* Country & City */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '20px' }}>
                  <div>
                    <label className="kz-form-label">{t.checkout.country}</label>
                    <select
                      name="country"
                      className="kz-form-input"
                      value={formData.country}
                      onChange={handleInputChange}
                      style={{ background: 'var(--kz-panel-elevated)' }}
                    >
                      <option value="Qatar">Qatar (قطر)</option>
                      <option value="Saudi Arabia">Saudi Arabia (المملكة العربية السعودية)</option>
                      <option value="United Arab Emirates">United Arab Emirates (الإمارات)</option>
                      <option value="Kuwait">Kuwait (الكويت)</option>
                      <option value="Oman">Oman (عُمان)</option>
                      <option value="Bahrain">Bahrain (البحرين)</option>
                    </select>
                  </div>
                  <div>
                    <label className="kz-form-label">{t.checkout.city} *</label>
                    <input
                      type="text"
                      name="city"
                      className="kz-form-input"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder={t.checkout.cityPlaceholder}
                      required
                    />
                  </div>
                </div>

                <div className="kz-form-group">
                  <label className="kz-form-label">{t.checkout.address} *</label>
                  <input
                    type="text"
                    name="address"
                    className="kz-form-input"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder={t.checkout.addressPlaceholder}
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: '14px', marginTop: '24px' }}>
                  <button
                    type="button"
                    className="kz-btn kz-btn-secondary"
                    style={{ flex: '0 0 auto' }}
                    onClick={() => setStep(1)}
                  >
                    {t.checkout.btnBack}
                  </button>
                  <button
                    type="submit"
                    className="kz-btn kz-btn-primary kz-btn-island"
                    style={{ flex: 1 }}
                  >
                    <span>{t.checkout.btnToStep3}</span>
                    <span className="kz-btn-island-icon">
                      {isRtl ? '←' : '→'}
                    </span>
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: Payment Method & Simulation */}
            {step === 3 && (
              <form onSubmit={handleSubmitOrder}>
                <h2 style={{ fontFamily: 'var(--kz-font-display)', fontSize: '1.45rem', fontWeight: 500, textTransform: 'uppercase', marginBottom: '8px' }}>
                  03 / {t.checkout.step3Title}
                </h2>
                <p style={{ fontSize: '0.88rem', fontWeight: 300, color: 'var(--kz-text-secondary)', marginBottom: '24px' }}>
                  {isRtl ? 'اختر طريقة الدفع المناسبة لإتمام حجز طلبك بأعلى معايير الأمان.' : 'Select your payment preference. All transactions are backed by official Kazez warranty.'}
                </p>

                {/* Payment Option Selector */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                  {/* Option 1: Credit Card */}
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '16px',
                    background: formData.paymentMethod === 'card' ? 'rgba(204, 0, 27, 0.08)' : 'var(--kz-panel-elevated)',
                    border: `1.5px solid ${formData.paymentMethod === 'card' ? 'var(--kz-racing-red)' : 'var(--kz-border)'}`,
                    borderRadius: 'var(--kz-radius-md)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleInputChange}
                      style={{ accentColor: 'var(--kz-racing-red)', width: '18px', height: '18px' }}
                    />
                    <CreditCard size={20} color={formData.paymentMethod === 'card' ? 'var(--kz-racing-red)' : 'var(--kz-text-muted)'} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.92rem', fontWeight: 500, color: '#fff' }}>{t.checkout.payCard}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--kz-text-muted)', fontWeight: 300 }}>Visa, MasterCard, Mada, Qatar Debit</div>
                    </div>
                  </label>

                  {/* Option 2: Cash on Delivery */}
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '16px',
                    background: formData.paymentMethod === 'cod' ? 'rgba(204, 0, 27, 0.08)' : 'var(--kz-panel-elevated)',
                    border: `1.5px solid ${formData.paymentMethod === 'cod' ? 'var(--kz-racing-red)' : 'var(--kz-border)'}`,
                    borderRadius: 'var(--kz-radius-md)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleInputChange}
                      style={{ accentColor: 'var(--kz-racing-red)', width: '18px', height: '18px' }}
                    />
                    <DollarSign size={20} color={formData.paymentMethod === 'cod' ? 'var(--kz-racing-red)' : 'var(--kz-text-muted)'} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.92rem', fontWeight: 500, color: '#fff' }}>{t.checkout.payCod}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--kz-text-muted)', fontWeight: 300 }}>{t.checkout.payCodDesc}</div>
                    </div>
                  </label>

                  {/* Option 3: WhatsApp Concierge */}
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    padding: '16px',
                    background: formData.paymentMethod === 'whatsapp' ? 'rgba(37, 211, 102, 0.08)' : 'var(--kz-panel-elevated)',
                    border: `1.5px solid ${formData.paymentMethod === 'whatsapp' ? '#25d366' : 'var(--kz-border)'}`,
                    borderRadius: 'var(--kz-radius-md)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}>
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="whatsapp"
                      checked={formData.paymentMethod === 'whatsapp'}
                      onChange={handleInputChange}
                      style={{ accentColor: '#25d366', width: '18px', height: '18px' }}
                    />
                    <MessageCircle size={20} color={formData.paymentMethod === 'whatsapp' ? '#25d366' : 'var(--kz-text-muted)'} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.92rem', fontWeight: 500, color: '#fff' }}>{t.checkout.payWhatsapp}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--kz-text-muted)', fontWeight: 300 }}>{t.checkout.payWhatsappDesc}</div>
                    </div>
                  </label>
                </div>

                {/* Card Gateway Simulation Box (if card selected) */}
                {formData.paymentMethod === 'card' && (
                  <div className="kz-demo-gateway-box" style={{ marginBottom: '24px' }}>
                    <div className="kz-autofill-banner">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: 'var(--kz-text-secondary)' }}>
                        <Sparkles size={14} color="var(--kz-racing-red)" />
                        <span>Interactive Gateway Sandbox</span>
                      </div>
                      <button
                        type="button"
                        className="kz-btn kz-btn-secondary kz-btn-sm"
                        onClick={handleFillTestCard}
                        style={{ fontSize: '0.7rem', padding: '4px 10px' }}
                      >
                        {t.checkout.autofillTestCard}
                      </button>
                    </div>

                    <div className="kz-form-group">
                      <label className="kz-form-label">{t.checkout.cardNumber}</label>
                      <input
                        type="text"
                        name="cardNumber"
                        className="kz-form-input"
                        placeholder="•••• •••• •••• ••••"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required={formData.paymentMethod === 'card'}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '14px' }}>
                      <div>
                        <label className="kz-form-label">{t.checkout.cardHolder}</label>
                        <input
                          type="text"
                          name="cardHolder"
                          className="kz-form-input"
                          placeholder="NAME ON CARD"
                          value={formData.cardHolder}
                          onChange={handleInputChange}
                          required={formData.paymentMethod === 'card'}
                        />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                        <div>
                          <label className="kz-form-label">{t.checkout.cardExp}</label>
                          <input
                            type="text"
                            name="cardExp"
                            className="kz-form-input"
                            placeholder="MM/YY"
                            value={formData.cardExp}
                            onChange={handleInputChange}
                            required={formData.paymentMethod === 'card'}
                          />
                        </div>
                        <div>
                          <label className="kz-form-label">{t.checkout.cardCvv}</label>
                          <input
                            type="password"
                            name="cardCvv"
                            className="kz-form-input"
                            placeholder="CVV"
                            maxLength={4}
                            value={formData.cardCvv}
                            onChange={handleInputChange}
                            required={formData.paymentMethod === 'card'}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '14px', marginTop: '24px' }}>
                  <button
                    type="button"
                    className="kz-btn kz-btn-secondary"
                    style={{ flex: '0 0 auto' }}
                    onClick={() => setStep(2)}
                    disabled={isProcessing}
                  >
                    {t.checkout.btnBack}
                  </button>

                  <button
                    type="submit"
                    className={`kz-btn kz-btn-island ${formData.paymentMethod === 'whatsapp' ? 'kz-btn-whatsapp' : 'kz-btn-primary'}`}
                    style={{ flex: 1 }}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Loader2 size={18} className="kz-spin" />
                        <span>{t.checkout.processing}</span>
                      </span>
                    ) : (
                      <>
                        <span>
                          {formData.paymentMethod === 'card' && t.checkout.btnSubmitCard}
                          {formData.paymentMethod === 'cod' && t.checkout.btnSubmitCod}
                          {formData.paymentMethod === 'whatsapp' && t.checkout.btnSubmitWhatsapp}
                        </span>
                        <span className="kz-btn-island-icon">
                          {formData.paymentMethod === 'card' && <Lock size={14} />}
                          {formData.paymentMethod === 'cod' && <PackageCheck size={14} />}
                          {formData.paymentMethod === 'whatsapp' && <MessageCircle size={14} />}
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* RIGHT: Live Sticky Order Summary Card */}
          <div style={{
            background: 'var(--kz-panel)',
            border: '1px solid var(--kz-border)',
            borderRadius: 'var(--kz-radius-lg)',
            padding: '28px',
            position: 'sticky',
            top: '110px',
            boxShadow: '0 16px 36px rgba(0,0,0,0.45)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--kz-border)', paddingBottom: '16px', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: 'var(--kz-font-display)', fontSize: '1.15rem', fontWeight: 500, textTransform: 'uppercase', margin: 0 }}>
                {t.checkout.orderSummary}
              </h3>
              <span className="kz-chip" style={{ fontSize: '0.68rem' }}>
                {items.length > 0 ? items.length : 1} {t.checkout.itemsInOrder}
              </span>
            </div>

            {/* Item list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px', maxHeight: '280px', overflowY: 'auto' }}>
              {items.length > 0 ? (
                items.map((item) => {
                  const fallbackImg = item.sku === 'KAZEZ-SLVR' ? '/assets/images/motor-silver.webp' : '/assets/images/motor-black.webp';
                  const itemImgSrc = item.image || item.thumbnail || fallbackImg;
                  return (
                    <div key={item.id || item.sku} style={{ display: 'flex', gap: '14px', alignItems: 'center', background: 'var(--kz-panel-elevated)', padding: '12px', borderRadius: 'var(--kz-radius-md)', border: '1px solid var(--kz-border)' }}>
                      <div style={{ width: '56px', height: '56px', background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--kz-radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <img
                          src={itemImgSrc}
                          alt={item.name || item.edition}
                          style={{ maxHeight: '88%', maxWidth: '88%', objectFit: 'contain' }}
                          onError={(e) => { e.target.src = fallbackImg; }}
                        />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.86rem', fontWeight: 500, color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.name || item.edition}
                        </div>
                        <div style={{ fontSize: '0.80rem', color: 'var(--kz-text-muted)', fontFamily: 'var(--kz-font-mono)' }}>
                          {t.cart.qty}: {item.quantity} · {item.sku}
                        </div>
                      </div>
                      <div style={{ textAlign: isRtl ? 'left' : 'right', flexShrink: 0 }}>
                        <PriceTag amount={item.price * item.quantity} size="sm" />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center', background: 'var(--kz-panel-elevated)', padding: '12px', borderRadius: 'var(--kz-radius-md)', border: '1px solid var(--kz-border)' }}>
                  <div style={{ width: '56px', height: '56px', background: 'rgba(0,0,0,0.3)', borderRadius: 'var(--kz-radius-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <img src="/assets/images/motor-black.webp" alt="Kazez Black" style={{ maxHeight: '85%', maxWidth: '85%', objectFit: 'contain' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.86rem', fontWeight: 500, color: '#fff' }}>Kazez Antenna Motor (Black Edition)</div>
                    <div style={{ fontSize: '0.80rem', color: 'var(--kz-text-muted)', fontFamily: 'var(--kz-font-mono)' }}>Qty: 1 · KAZEZ</div>
                  </div>
                  <PriceTag amount={350} size="sm" />
                </div>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div style={{ borderTop: '1px solid var(--kz-border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', color: 'var(--kz-text-secondary)' }}>
                <span>{t.checkout.subtotal}</span>
                <PriceTag amount={cartTotalQar || 350} size="sm" />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', color: 'var(--kz-text-secondary)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Truck size={14} color="#25d366" /> {t.checkout.shipping}
                </span>
                <span style={{ color: '#25d366', fontWeight: 500, fontFamily: 'var(--kz-font-mono)' }}>{t.checkout.shippingFree}</span>
              </div>

              <div style={{ borderTop: '1px solid var(--kz-border)', paddingTop: '14px', marginTop: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontFamily: 'var(--kz-font-display)', fontSize: '1.05rem', fontWeight: 500, textTransform: 'uppercase' }}>
                  {t.checkout.totalAmount}
                </span>
                <PriceTag amount={cartTotalQar || 350} size="total" />
              </div>
            </div>

            {/* Guarantee Note */}
            <div style={{
              marginTop: '22px',
              padding: '12px 14px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: 'var(--kz-radius-sm)',
              border: '1px solid var(--kz-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontSize: '0.76rem',
              color: 'var(--kz-text-secondary)'
            }}>
              <ShieldCheck size={18} color="var(--kz-racing-red)" style={{ flexShrink: 0 }} />
              <span>{t.checkout.warrantyNote}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
