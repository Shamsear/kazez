import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Printer, MessageSquare, ArrowRight, ShieldCheck, Truck, Package, Clock, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PriceTag } from './PriceTag';

export const OrderSuccessReceipt = ({ order, onReturnHome }) => {
  const { isRtl } = useLanguage();

  useEffect(() => {
    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  }, []);

  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  const whatsappMessage = encodeURIComponent(
    `*KAZEZ OFFICIAL DISPATCH LOG*%0A` +
    `Ref Number: ${order.orderNumber}%0A` +
    `Client: ${order.customer?.name}%0A` +
    `Phone: ${order.customer?.phone}%0A` +
    `Location: ${order.customer?.city}, ${order.customer?.country || 'Qatar'}%0A` +
    `Address: ${order.customer?.address}%0A` +
    `Total: ${order.total} QAR%0A` +
    `Status: ${order.paymentStatus}`
  );

  const whatsappUrl = `https://wa.me/97455128900?text=${whatsappMessage}`;

  return (
    <div className="kz-pdp-container">
      <div className="kz-container">
        {/* Double-Bezel Receipt Card */}
        <div className="kz-double-bezel" style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div className="kz-double-bezel-inner" style={{ padding: '40px' }}>
            {/* Header / Success Indicator */}
            <div className="kz-receipt-header">
              <div className="kz-receipt-check-icon">
                <CheckCircle2 size={32} />
              </div>
              <div className="kz-tag-telemetry" style={{ marginBottom: '8px' }}>
                <span className="kz-live-indicator" />
                <span>{isRtl ? 'تم تسجيل الطلب وتأكيد الحجز' : 'TRANSACTION LOGGED & VERIFIED'}</span>
              </div>
              <h2 style={{ fontFamily: 'var(--kz-font-display)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--kz-text-primary)', margin: '6px 0' }}>
                {isRtl ? 'شكراً لطلبك من كزاز' : 'Order Successfully Logged'}
              </h2>
              <div className="kz-receipt-order-id" style={{ letterSpacing: '0.04em', margin: '4px 0', fontSize: '1.6rem' }}>
                {order.orderNumber}
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--kz-text-muted)', fontFamily: 'var(--kz-font-mono)', marginTop: '4px' }}>
                {order.date} · {order.time} · {order.authCode}
              </p>
            </div>

            {/* Live Fulfillment Tracker */}
            <div
              style={{
                background: 'var(--kz-surface-subtle)',
                border: '1px solid var(--kz-border)',
                borderRadius: 'var(--kz-radius-lg)',
                padding: '20px',
                marginBottom: '28px'
              }}
            >
              <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--kz-text-muted)', marginBottom: '16px' }}>
                {isRtl ? 'مراحل التجهيز والشحن المباشر' : 'Direct Dispatch Timeline'}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', position: 'relative' }}>
                {/* Step 1 */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#16A34A', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>
                    <Check size={14} />
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--kz-text-primary)' }}>
                    {isRtl ? 'تم التأكيد' : 'Confirmed'}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#16A34A', fontWeight: 600 }}>Active</div>
                </div>

                {/* Step 2 */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#FFFFFF', border: '2px solid var(--kz-border)', color: 'var(--kz-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontSize: '0.78rem', fontFamily: 'var(--kz-font-mono)' }}>
                    2
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--kz-text-secondary)' }}>
                    {isRtl ? 'فحص الجودة' : 'QC Inspection'}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--kz-text-muted)' }}>Pending</div>
                </div>

                {/* Step 3 */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#FFFFFF', border: '2px solid var(--kz-border)', color: 'var(--kz-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontSize: '0.78rem', fontFamily: 'var(--kz-font-mono)' }}>
                    3
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--kz-text-secondary)' }}>
                    {isRtl ? 'التغليف الآمن' : 'Packaging'}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--kz-text-muted)' }}>Queue</div>
                </div>

                {/* Step 4 */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#FFFFFF', border: '2px solid var(--kz-border)', color: 'var(--kz-text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px', fontSize: '0.78rem', fontFamily: 'var(--kz-font-mono)' }}>
                    4
                  </div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--kz-text-secondary)' }}>
                    {isRtl ? 'التسليم المباشر' : 'Delivery'}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--kz-text-muted)' }}>Courier</div>
                </div>
              </div>
            </div>

            {/* Customer & Shipping Details Grid */}
            <div className="kz-receipt-details-grid">
              <div style={{ background: 'var(--kz-surface-subtle)', padding: '16px', borderRadius: 'var(--kz-radius-md)', border: '1px solid var(--kz-border-subtle)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.78rem', color: 'var(--kz-text-muted)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.04em' }}>
                  {isRtl ? 'بيانات المستلم والتوصيل' : 'Recipient & Logistics'}
                </div>
                <div style={{ fontWeight: 700, color: 'var(--kz-text-primary)', fontSize: '0.92rem' }}>{order.customer?.name}</div>
                <div style={{ color: 'var(--kz-text-secondary)', fontSize: '0.82rem', fontFamily: 'var(--kz-font-mono)', marginTop: '2px' }}>
                  {order.customer?.phone}
                </div>
                <div style={{ color: 'var(--kz-text-secondary)', fontSize: '0.82rem', marginTop: '4px', lineHeight: '1.4' }}>
                  {order.customer?.address}, {order.customer?.city} ({order.customer?.country || 'Qatar'})
                </div>
              </div>

              <div style={{ background: 'var(--kz-surface-subtle)', padding: '16px', borderRadius: 'var(--kz-radius-md)', border: '1px solid var(--kz-border-subtle)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.78rem', color: 'var(--kz-text-muted)', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.04em' }}>
                  {isRtl ? 'حالة السداد والخدمة' : 'Payment & Security'}
                </div>
                <div style={{ fontWeight: 700, color: 'var(--kz-text-primary)', fontSize: '0.92rem' }}>
                  {isRtl ? 'وسيلة السداد:' : 'Payment:'} {order.paymentMethod?.toUpperCase()}
                </div>
                <div style={{ color: 'var(--kz-text-secondary)', fontSize: '0.82rem', marginTop: '2px' }}>
                  {isRtl ? 'الشحن والتوصيل:' : 'Service:'} {order.deliveryMethod || 'Express Courier'}
                </div>
                <div style={{ color: '#15803D', fontWeight: 700, fontSize: '0.8rem', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={14} />
                  <span>STATUS: {order.paymentStatus}</span>
                </div>
              </div>
            </div>

            {/* Itemized Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--kz-border)', textAlign: isRtl ? 'right' : 'left', color: 'var(--kz-text-muted)', fontSize: '0.78rem', textTransform: 'uppercase' }}>
                  <th style={{ padding: '10px 0' }}>{isRtl ? 'المنتج والمواصفات' : 'Item & Specifications'}</th>
                  <th style={{ padding: '10px 0', textAlign: 'center' }}>{isRtl ? 'الكمية' : 'Qty'}</th>
                  <th style={{ padding: '10px 0', textAlign: isRtl ? 'left' : 'right' }}>{isRtl ? 'المجموع' : 'Amount'}</th>
                </tr>
              </thead>
              <tbody>
                {order.items?.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--kz-border-subtle)' }}>
                    <td style={{ padding: '14px 0' }}>
                      <div style={{ fontWeight: 700, color: 'var(--kz-text-primary)' }}>{item.name || item.edition}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--kz-text-muted)', marginTop: '2px' }}>{item.specs}</div>
                    </td>
                    <td style={{ padding: '14px 0', textAlign: 'center', fontFamily: 'var(--kz-font-mono)', fontWeight: 600 }}>
                      {item.quantity}
                    </td>
                    <td style={{ padding: '14px 0', textAlign: isRtl ? 'left' : 'right', fontFamily: 'var(--kz-font-mono)', fontWeight: 700 }}>
                      <PriceTag amountInQar={item.price * item.quantity} />
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={2} style={{ padding: '18px 0', fontWeight: 700, fontSize: '1.05rem', color: 'var(--kz-text-primary)' }}>
                    {isRtl ? 'المجموع الإجمالي النهائي' : 'Total Amount Paid'}
                  </td>
                  <td style={{ padding: '18px 0', textAlign: isRtl ? 'left' : 'right', fontFamily: 'var(--kz-font-mono)', fontWeight: 800, fontSize: '1.4rem', color: 'var(--kz-crimson)' }}>
                    <PriceTag amountInQar={order.total} />
                  </td>
                </tr>
              </tfoot>
            </table>

            {/* Actions Bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="kz-btn kz-btn-whatsapp"
                style={{ width: '100%', padding: '14px' }}
              >
                <MessageSquare size={16} />
                <span>{isRtl ? 'إرسال بيانات الطلب إلى خدمة عملاء كزاز (واتساب)' : 'Forward Receipt to WhatsApp Concierge'}</span>
              </a>

              <div className="kz-receipt-action-row">
                <button
                  type="button"
                  className="kz-btn kz-btn-secondary"
                  style={{ flex: 1 }}
                  onClick={handlePrint}
                >
                  <Printer size={15} />
                  <span>{isRtl ? 'طباعة الفاتورة الرسمية' : 'Print Official Invoice'}</span>
                </button>

                <button
                  type="button"
                  className="kz-btn kz-btn-primary"
                  style={{ flex: 1 }}
                  onClick={onReturnHome}
                >
                  <span>{isRtl ? 'العودة إلى المتجر الرئيسي' : 'Return to Storefront'}</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
