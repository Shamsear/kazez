import React, { useState } from 'react';
import { X, CreditCard, ShieldCheck, Check, Sparkles, Loader2, Truck, ArrowLeft, ArrowRight, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PriceTag } from './PriceTag';

export const CheckoutModal = ({ isOpen, onClose, onOrderComplete, initialStep = 1 }) => {
  const { items, cartTotalQar, formatPrice } = useCart();

  const [step, setStep] = useState(initialStep); // 1: Contact, 2: Vehicle & Address, 3: Payment
  
  React.useEffect(() => {
    if (initialStep) setStep(initialStep);
  }, [initialStep, isOpen]);
  const [formData, setFormData] = useState({
    name: 'Sheikh Hamad Al-Thani',
    phone: '+974 5512 8900',
    email: 'hamad.althani@example.qa',
    city: 'Doha',
    address: 'Zone 55, Street 920, Villa 14',
    vehicleMake: 'Toyota',
    vehicleModel: 'Land Cruiser LC300',
    vehicleYear: '2024',
    paymentMethod: 'card', // 'card' | 'cod' | 'whatsapp'
    cardNumber: '',
    cardExp: '',
    cardCvv: '',
    cardHolder: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFillTestCard = () => {
    setFormData((prev) => ({
      ...prev,
      cardNumber: '4111 8900 1234 5678',
      cardExp: '11/29',
      cardCvv: '786',
      cardHolder: prev.name || 'TEST CARDHOLDER'
    }));
  };

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate realistic 2-second bank authorization gateway
    setTimeout(() => {
      setIsProcessing(false);
      const orderNumber = `KZ-${Math.floor(100000 + Math.random() * 900000)}`;
      onOrderComplete({
        orderNumber,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
        items: [...items],
        total: cartTotalQar,
        customer: { ...formData }
      });
    }, 2200);
  };

  return (
    <div className="kz-modal-backdrop" onClick={onClose}>
      <div className="kz-checkout-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: 'var(--kz-text-muted)', cursor: 'pointer' }}
          aria-label="Close checkout"
        >
          <X size={20} />
        </button>

        {/* Step Indicator */}
        <div className="kz-step-indicator">
          <div className={`kz-step-dot ${step >= 1 ? 'active' : ''}`}>
            <span>01</span> Contact Details
          </div>
          <div className={`kz-step-dot ${step >= 2 ? 'active' : ''}`}>
            <span>02</span> Vehicle &amp; Delivery
          </div>
          <div className={`kz-step-dot ${step >= 3 ? 'active' : ''}`}>
            <span>03</span> Demo Payment
          </div>
        </div>

        {/* STEP 1: Contact Information */}
        {step === 1 && (
          <div>
            <h3 style={{ fontFamily: 'var(--kz-font-display)', fontSize: '1.25rem', fontWeight: 500, textTransform: 'uppercase', marginBottom: '8px' }}>
              Customer Details
            </h3>
            <p style={{ fontSize: '0.84rem', fontWeight: 300, color: 'var(--kz-text-secondary)', marginBottom: '24px' }}>
              Provide your delivery contact details for dispatch confirmation.
            </p>

            <div className="kz-form-group">
              <label className="kz-form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="kz-form-input"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="kz-form-group">
              <label className="kz-form-label">Mobile Number (WhatsApp Enabled)</label>
              <input
                type="tel"
                name="phone"
                className="kz-form-input"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="kz-form-group">
              <label className="kz-form-label">Email Address (Optional)</label>
              <input
                type="email"
                name="email"
                className="kz-form-input"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <button
              type="button"
              className="kz-btn kz-btn-primary"
              style={{ width: '100%', marginTop: '12px' }}
              onClick={() => setStep(2)}
            >
              Continue to Vehicle Fitment <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 2: Vehicle & Shipping */}
        {step === 2 && (
          <div>
            <h3 style={{ fontFamily: 'var(--kz-font-display)', fontSize: '1.25rem', fontWeight: 500, textTransform: 'uppercase', marginBottom: '8px' }}>
              Vehicle &amp; Delivery Address
            </h3>
            <p style={{ fontSize: '0.84rem', fontWeight: 300, color: 'var(--kz-text-secondary)', marginBottom: '24px' }}>
              Ensures bracket compatibility before shipping to your location.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginBottom: '16px' }}>
              <div>
                <label className="kz-form-label">Vehicle Make</label>
                <input
                  type="text"
                  name="vehicleMake"
                  className="kz-form-input"
                  placeholder="e.g. Toyota"
                  value={formData.vehicleMake}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="kz-form-label">Model</label>
                <input
                  type="text"
                  name="vehicleModel"
                  className="kz-form-input"
                  placeholder="e.g. Land Cruiser"
                  value={formData.vehicleModel}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <label className="kz-form-label">Year</label>
                <input
                  type="text"
                  name="vehicleYear"
                  className="kz-form-input"
                  placeholder="e.g. 2024"
                  value={formData.vehicleYear}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="kz-form-group">
              <label className="kz-form-label">City / Region</label>
              <select
                name="city"
                className="kz-form-input"
                value={formData.city}
                onChange={handleInputChange}
              >
                <option value="Doha">Doha, Qatar (Same Day Delivery)</option>
                <option value="Al Rayyan">Al Rayyan, Qatar</option>
                <option value="Al Wakrah">Al Wakrah, Qatar</option>
                <option value="Al Khor">Al Khor, Qatar</option>
                <option value="GCC Shipping">Riyadh / Dubai / GCC Express</option>
              </select>
            </div>

            <div className="kz-form-group">
              <label className="kz-form-label">Street / Villa Address</label>
              <input
                type="text"
                name="address"
                className="kz-form-input"
                placeholder="Zone, Street, Building/Villa"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
              <button
                type="button"
                className="kz-btn kz-btn-secondary"
                onClick={() => setStep(1)}
              >
                <ArrowLeft size={16} /> Back
              </button>
              <button
                type="button"
                className="kz-btn kz-btn-primary"
                style={{ flex: 1 }}
                onClick={() => setStep(3)}
              >
                Proceed to Payment <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Payment Gateway Simulation */}
        {step === 3 && (
          <form onSubmit={handleSubmitPayment}>
            <h3 style={{ fontFamily: 'var(--kz-font-display)', fontSize: '1.25rem', fontWeight: 500, textTransform: 'uppercase', marginBottom: '8px' }}>
              Demo Payment Gateway
            </h3>
            <div style={{ fontSize: '0.84rem', fontWeight: 300, color: 'var(--kz-text-secondary)', marginBottom: '20px', display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span>Total Order Amount:</span> <PriceTag amount={cartTotalQar} size="subtotal" />
            </div>

            {/* Payment method switcher */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
              <button
                type="button"
                className={`kz-finish-btn ${formData.paymentMethod === 'card' ? 'active' : ''}`}
                style={{ padding: '10px', justifyContent: 'center' }}
                onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'card' }))}
              >
                <CreditCard size={16} /> Credit / Debit
              </button>

              <button
                type="button"
                className={`kz-finish-btn ${formData.paymentMethod === 'cod' ? 'active' : ''}`}
                style={{ padding: '10px', justifyContent: 'center' }}
                onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'cod' }))}
              >
                <Truck size={16} /> Cash on Delivery
              </button>

              <button
                type="button"
                className={`kz-finish-btn ${formData.paymentMethod === 'whatsapp' ? 'active' : ''}`}
                style={{ padding: '10px', justifyContent: 'center' }}
                onClick={() => setFormData((p) => ({ ...p, paymentMethod: 'whatsapp' }))}
              >
                WhatsApp Pay
              </button>
            </div>

            {formData.paymentMethod === 'card' && (
              <div className="kz-demo-gateway-box">
                {/* 1-Click Auto Fill Banner for Client Demo */}
                <div className="kz-autofill-banner">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', color: '#ffb3c0' }}>
                    <Sparkles size={14} color="var(--kz-racing-red)" />
                    <span>Client Demo Mode: Simulated Gateway</span>
                  </div>
                  <button
                    type="button"
                    className="kz-btn kz-btn-secondary kz-btn-sm"
                    style={{ fontSize: '0.68rem', padding: '4px 10px' }}
                    onClick={handleFillTestCard}
                  >
                    1-Click Fill Test Card
                  </button>
                </div>

                <div className="kz-form-group">
                  <label className="kz-form-label">Card Number</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      name="cardNumber"
                      className="kz-form-input"
                      placeholder="4000 1234 5678 9010"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      required
                    />
                    <Lock size={14} color="var(--kz-text-muted)" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="kz-form-label">Cardholder</label>
                    <input
                      type="text"
                      name="cardHolder"
                      className="kz-form-input"
                      placeholder="NAME ON CARD"
                      value={formData.cardHolder}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="kz-form-label">Exp (MM/YY)</label>
                    <input
                      type="text"
                      name="cardExp"
                      className="kz-form-input"
                      placeholder="12/28"
                      value={formData.cardExp}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="kz-form-label">CVV</label>
                    <input
                      type="password"
                      name="cardCvv"
                      className="kz-form-input"
                      placeholder="•••"
                      maxLength={4}
                      value={formData.cardCvv}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {formData.paymentMethod === 'cod' && (
              <div style={{ background: 'var(--kz-panel-elevated)', padding: '20px', borderRadius: 'var(--kz-radius-md)', border: '1px solid var(--kz-border)', margin: '20px 0', fontSize: '0.86rem' }}>
                <p style={{ color: 'var(--kz-text-secondary)', marginBottom: '8px' }}>
                  Pay cash or card upon technician delivery &amp; fitting anywhere in Qatar.
                </p>
                <p style={{ fontSize: '0.78rem', color: 'var(--kz-text-muted)' }}>
                  Our driver carries a portable contactless POS machine (Visa, Mastercard, QPAY).
                </p>
              </div>
            )}

            {formData.paymentMethod === 'whatsapp' && (
              <div style={{ background: 'var(--kz-panel-elevated)', padding: '20px', borderRadius: 'var(--kz-radius-md)', border: '1px solid var(--kz-border)', margin: '20px 0', fontSize: '0.86rem' }}>
                <p style={{ color: 'var(--kz-text-secondary)' }}>
                  Complete order authorization directly with our Kazez concierge desk on WhatsApp.
                </p>
              </div>
            )}

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button
                type="button"
                className="kz-btn kz-btn-secondary"
                onClick={() => setStep(2)}
                disabled={isProcessing}
              >
                <ArrowLeft size={16} /> Back
              </button>

              <button
                type="submit"
                className="kz-btn kz-btn-primary"
                style={{ flex: 1 }}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Authorizing Payment (3D Secure)...
                  </>
                ) : (
                  <>
                    Authorize &amp; Complete Order ({formatPrice(cartTotalQar)})
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
