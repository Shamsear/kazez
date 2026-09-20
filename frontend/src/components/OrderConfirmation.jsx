import React, { useEffect } from 'react';
import { CheckCircle2, Printer, ArrowRight, Clock, ShieldCheck, Mail, MapPin, Car, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useLanguage } from '../context/LanguageContext';
import { PriceTag } from './PriceTag';

export const OrderConfirmation = ({ order: propOrder, onReturnHome }) => {
  const { t, isRtl } = useLanguage();

  const now = new Date();
  const demoFallback = {
    orderNumber: 'KZ-942817',
    invoiceNumber: 'KZ-INV-942817',
    date: now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }),
    paymentMethod: 'card',
    paymentStatus: 'PAID',
    items: [
      {
        id: 9,
        sku: 'KZ-ACT-BLK',
        name: 'Kazez Precision Antenna Actuator',
        edition: 'Black Edition',
        specs: '6061-T6 Billet Alloy · IP67 Hermetic Seal · 45 Nm Powertrain',
        price: 350,
        quantity: 1,
        image: '/assets/images/motor-black.webp',
        thumbnail: '/assets/images/motor-black.webp'
      }
    ],
    total: 350,
    customer: {
      name: 'Sheikh Hamad Al-Thani',
      phone: '+974 5512 8900',
      email: 'hamad.althani@example.qa',
      city: 'Doha',
      country: 'Qatar',
      address: 'Zone 55, Street 920, Villa 14',
      vehicleMake: 'Toyota',
      vehicleModel: 'Land Cruiser LC300 GR-S',
      vehicleYear: '2024'
    }
  };

  const rawOrder = propOrder || demoFallback;
  const order = {
    orderNumber: rawOrder.orderNumber || 'KZ-942817',
    invoiceNumber: rawOrder.invoiceNumber || (rawOrder.orderNumber ? `KZ-INV-${rawOrder.orderNumber.replace('KZ-', '')}` : 'KZ-INV-942817'),
    date: rawOrder.date || now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
    time: rawOrder.time || now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }),
    paymentMethod: rawOrder.paymentMethod || 'card',
    paymentStatus: rawOrder.paymentStatus || (rawOrder.paymentMethod === 'cod' ? 'COD_PENDING' : 'PAID'),
    total: rawOrder.total || 350,
    items: (rawOrder.items && rawOrder.items.length > 0) ? rawOrder.items : demoFallback.items,
    customer: {
      name: rawOrder.customer?.name || 'Sheikh Hamad Al-Thani',
      phone: rawOrder.customer?.phone || '+974 5512 8900',
      email: rawOrder.customer?.email || 'hamad.althani@example.qa',
      city: rawOrder.customer?.city || 'Doha',
      country: rawOrder.customer?.country || 'Qatar',
      address: rawOrder.customer?.address || 'Zone 55, Street 920, Villa 14',
      vehicleMake: rawOrder.customer?.vehicleMake || 'Toyota',
      vehicleModel: rawOrder.customer?.vehicleModel || 'Land Cruiser LC300 GR-S',
      vehicleYear: rawOrder.customer?.vehicleYear || '2024'
    }
  };
  const isPaid = (order.paymentMethod === 'card' || order.paymentStatus === 'PAID');
  const orderTime = order.time;
  const orderDate = order.date;

  useEffect(() => {
    try {
      confetti({
        particleCount: 70,
        spread: 65,
        origin: { y: 0.55 },
        colors: ['#cc001b', '#ffffff', '#e5e5e5', '#22c55e']
      });
    } catch (e) {
      // confetti fallback
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────────────────
          1. CLEAN, MINIMAL & ELEGANT SCREEN VIEW (NO CLUTTER)
          ───────────────────────────────────────────────────────────────────────── */}
      <div className="kz-container kz-order-confirm-container kz-print-hide">
        <div className="kz-success-minimal-card">
          
          {/* Animated Glow Checkmark */}
          <div className="kz-success-icon-wrap">
            <CheckCircle2 size={40} />
          </div>

          {/* Status Tag */}
          <div className="kz-success-tag">
            {t.orderConfirm.badge}
          </div>

          {/* Customer Headline */}
          <h1 className="kz-success-title">
            {t.orderConfirm.title}, {order.customer?.name?.split(' ')[0] || ''}
          </h1>
          
          {/* Simple Confirmation Subtitle */}
          <p className="kz-success-desc">
            {t.orderConfirm.subtitle}
          </p>

          {/* Structured 3-Slot Reference Telemetry Grid */}
          <div className="kz-success-telemetry-grid">
            <div className="kz-telemetry-slot">
              <span className="kz-telemetry-lbl">{t.orderConfirm.orderNumber}</span>
              <span className="kz-telemetry-val">{order.orderNumber}</span>
            </div>
            <div className="kz-telemetry-slot">
              <span className="kz-telemetry-lbl">{t.orderConfirm.orderDate}</span>
              <span className="kz-telemetry-val">{orderDate}</span>
            </div>
            <div className="kz-telemetry-slot">
              <span className="kz-telemetry-lbl" style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                <Clock size={10} /> {isRtl ? 'وقت التأكيد' : 'Confirmed At'}
              </span>
              <span className="kz-telemetry-val" style={{ color: 'var(--kz-racing-red)' }}>{orderTime}</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="kz-success-actions">
            <button
              type="button"
              onClick={handlePrint}
              className="kz-btn kz-btn-primary kz-success-action-btn"
            >
              <Printer size={16} />
              <span>{t.orderConfirm.downloadPdf}</span>
            </button>

            <button
              type="button"
              onClick={onReturnHome}
              className="kz-btn kz-btn-secondary kz-success-action-btn"
            >
              <span>{t.orderConfirm.returnHome}</span>
              <ArrowRight size={16} style={{ transform: isRtl ? 'rotate(180deg)' : 'none' }} />
            </button>
          </div>

        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────────────
          2. FULL OFFICIAL COMMERCIAL TAX INVOICE & RECEIPT (PRINT / PDF ONLY)
          100% Separate Standalone Element with Zero Impact on Screen Layout
          ───────────────────────────────────────────────────────────────────────── */}
      <div id="kz-print-receipt-sheet" className="kz-receipt-document kz-print-only-sheet">
        
        {/* Letterhead Header */}
        <div className="kz-receipt-header">
          <div className="kz-receipt-header-brand">
            <div className="kz-receipt-brand-title">
              KAZEZ MOTORS<span>.</span>
            </div>
            <div className="kz-receipt-brand-tag">
              {isRtl ? 'شركة كازيز موتورز ذ.م.م · مشغلات وهوائيات السيارات الفائقة' : 'Precision Motorized Radio Antenna Actuators'}
            </div>
            <div className="kz-receipt-company-info">
              <div><strong>{isRtl ? 'السجل التجاري:' : 'CR No:'}</strong> 184920/QA &middot; <strong>{isRtl ? 'الرقم الضريبي:' : 'TIN:'}</strong> 000109482910001</div>
              <div>{isRtl ? 'برج لوسيل مارينا، المنطقة 57، شارع 24، الدوحة، دولة قطر' : 'Lusail Marina Hub · Zone 57, Street 24, Doha, State of Qatar'}</div>
              <div>support@kazezmotors.qa &middot; www.kazezmotors.qa</div>
            </div>
          </div>

          <div className="kz-receipt-header-meta">
            <div className="kz-receipt-badge-doc">
              {isRtl ? 'فاتورة شراء رسمية' : 'OFFICIAL PURCHASE RECEIPT'}
            </div>
            <div className="kz-receipt-ref-num">
              <span className="kz-lbl">{isRtl ? 'رقم الطلب:' : 'REF:'}</span>
              <span className="kz-val">{order.orderNumber}</span>
            </div>
            <div className="kz-receipt-meta-row">
              <span>{isRtl ? 'التاريخ:' : 'Date:'}</span>
              <strong>{orderDate}</strong>
            </div>
            <div className="kz-receipt-meta-row">
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={11} /> {isRtl ? 'وقت الطلب:' : 'Order Time:'}
              </span>
              <strong style={{ color: '#111827', fontFamily: 'monospace' }}>{orderTime}</strong>
            </div>
            <div className="kz-receipt-meta-row" style={{ marginTop: '2px' }}>
              <span>{isRtl ? 'حالة السداد:' : 'Payment:'}</span>
              <span className={isPaid ? 'kz-status-paid' : 'kz-status-cod'}>
                {isPaid ? (isRtl ? '✓ تم السداد إلكترونياً' : '✓ PAID IN FULL (Online)') : (isRtl ? 'الدفع عند الاستلام' : 'CASH ON DELIVERY')}
              </span>
            </div>
          </div>
        </div>

        {/* Customer, Destination & Vehicle Grid */}
        <div className="kz-receipt-section">
          <div className="kz-receipt-info-grid">
            
            <div className="kz-receipt-card-block">
              <div className="kz-block-header">
                <Mail size={11} /> {t.orderConfirm.customerDetails}
              </div>
              <div className="kz-customer-name">{order.customer?.name}</div>
              <div className="kz-customer-contact" style={{ direction: 'ltr', textAlign: isRtl ? 'right' : 'left' }}>
                {order.customer?.phone}
              </div>
              {order.customer?.email && (
                <div className="kz-customer-contact">{order.customer?.email}</div>
              )}
            </div>

            <div className="kz-receipt-card-block">
              <div className="kz-block-header">
                <MapPin size={11} /> {t.orderConfirm.shippingAddress}
              </div>
              <div className="kz-customer-name">{order.customer?.city || 'Doha'}, {order.customer?.country || 'Qatar'}</div>
              <div className="kz-customer-contact">{order.customer?.address}</div>
              <div className="kz-courier-note">
                {isRtl ? 'شحن كازيز إكسبريس السريع (توصيل مباشر لباب المنزل)' : 'Kazez Express VIP Next-Day Doorstep Courier'}
              </div>
            </div>

            <div className="kz-receipt-card-block">
              <div className="kz-block-header">
                <Car size={11} /> {t.orderConfirm.vehicleInfo}
              </div>
              <div className="kz-customer-name">
                {order.customer?.vehicleMake ? `${order.customer.vehicleMake} ${order.customer.vehicleModel || ''}` : (isRtl ? 'قاعدة تثبيت مخصصة' : 'Custom Chassis Mount')}
              </div>
              <div className="kz-customer-contact">
                {isRtl ? 'سنة الصنع المعتمدة:' : 'Model Year:'} {order.customer?.vehicleYear || '2024+'}
              </div>
              <div className="kz-fitment-guarantee">
                {isRtl ? 'مطابقة 100% لمقاييس الهيكل' : '100% OEM Fitment Verified'}
              </div>
            </div>

          </div>
        </div>

        {/* Itemized Table */}
        <div className="kz-receipt-section">
          <table className="kz-receipt-table">
            <thead>
              <tr>
                <th style={{ width: '6%', textAlign: 'center' }}>#</th>
                <th style={{ textAlign: isRtl ? 'right' : 'left' }}>{t.orderConfirm.itemDesc}</th>
                <th style={{ width: '16%', textAlign: 'center' }}>{t.orderConfirm.sku}</th>
                <th style={{ width: '8%', textAlign: 'center' }}>{t.orderConfirm.qty}</th>
                <th style={{ width: '18%', textAlign: isRtl ? 'left' : 'right' }}>{t.orderConfirm.unitPrice}</th>
                <th style={{ width: '18%', textAlign: isRtl ? 'left' : 'right' }}>{t.orderConfirm.totalAmount}</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={idx}>
                  <td style={{ textAlign: 'center', fontFamily: 'monospace' }}>{idx + 1}</td>
                  <td>
                    <div className="kz-item-desc-title">{item.name || `Kazez Antenna Actuator (${item.edition})`}</div>
                    <div className="kz-item-desc-spec">
                      {item.specs || '6061-T6 Billet Alloy · IP67 Hermetic Sealing · 45 Nm Powertrain'}
                    </div>
                  </td>
                  <td style={{ textAlign: 'center', fontFamily: 'var(--kz-font-mono)' }}>{item.sku || 'KZ-ACT-BLK'}</td>
                  <td style={{ textAlign: 'center', fontWeight: 600 }}>{item.quantity}</td>
                  <td style={{ textAlign: isRtl ? 'left' : 'right' }}>{item.price} QAR</td>
                  <td style={{ textAlign: isRtl ? 'left' : 'right', fontWeight: 600 }}>{item.price * item.quantity} QAR</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="kz-receipt-calc-wrap">
            <div className="kz-receipt-calc-table">
              <div className="kz-calc-row">
                <span>{t.checkout.subtotal}</span>
                <span>{order.total} QAR</span>
              </div>
              <div className="kz-calc-row">
                <span>{isRtl ? 'الشحن والتوصيل الفوري (داخل قطر)' : 'Express Doorstep Delivery (Qatar)'}</span>
                <span style={{ color: '#059669', fontWeight: 600 }}>{isRtl ? 'مجاني (0 ر.ق)' : 'FREE (0.00 QAR)'}</span>
              </div>
              <div className="kz-calc-row kz-calc-grand-total">
                <span>{t.checkout.totalAmount}</span>
                <span>{order.total} QAR</span>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate & Verification Note */}
        <div className="kz-receipt-section">
          <div className="kz-cert-grid">
            <div className="kz-cert-box">
              <ShieldCheck size={22} color="#cc001b" />
              <div>
                <strong>{t.orderConfirm.warrantyTitle}</strong>
                <p>{t.orderConfirm.warrantyDesc}</p>
              </div>
            </div>

            <div className="kz-auth-stamp-box">
              <div className="kz-stamp-text">
                <div className="kz-stamp-seal">KAZEZ QUALITY CERTIFIED</div>
                <div className="kz-stamp-audit">
                  {orderDate} · {orderTime} · DOHA HUB
                </div>
                <div className="kz-stamp-ref">REF: {order.orderNumber}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Official Commercial Invoice Footer & Legal Notice */}
        <div className="kz-receipt-footer-section">
          <div className="kz-receipt-terms">
            <div><strong>{isRtl ? 'الشروط والأحكام والضمان:' : 'Warranty & Terms of Sale:'}</strong> {isRtl ? 'تخضع جميع مشغلات كازيز الميكانيكية لضمان استبدال رسمي لمدة عام كامل ضد أي عيوب تصنيعية أو تآكل تحت أقصى الظروف المناخية.' : 'All Kazez precision motorized actuators are backed by a comprehensive 1-year official direct replacement warranty covering planetary powertrain and weather seals.'}</div>
            <div style={{ marginTop: '4px' }}>{isRtl ? 'تم إصدار هذه الوثيقة إلكترونياً من قِبل شركة كازيز موتورز ذ.م.م - الدوحة، دولة قطر.' : 'Official electronic tax invoice issued by Kazez Motors W.L.L. · Doha, State of Qatar · CR: 184920/QA.'}</div>
          </div>
          <div className="kz-receipt-thankyou">
            <div className="kz-thankyou-lead">{isRtl ? 'شكراً لاختياركم كازيز موتورز' : 'Thank You for Choosing Kazez'}</div>
            <div className="kz-thankyou-sub">Doha · State of Qatar &middot; www.kazezmotors.qa</div>
          </div>
        </div>

      </div>

    </>
  );
};
