import React, { useEffect } from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, Truck, ShieldCheck, Plus, Sparkles, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { PriceTag } from './PriceTag';
import { PRODUCTS } from '../data/products';

export const CartDrawerMinimal = ({ onProceedToCheckout }) => {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    addToCart,
    cartTotalQar,
    cartCount
  } = useCart();
  const { isRtl } = useLanguage();

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  // Lock body scroll when drawer open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const handleCheckoutClick = () => {
    closeCart();
    onProceedToCheckout();
  };

  // Free shipping threshold: 700 QAR (or 2 units)
  const FREE_SHIPPING_THRESHOLD = 700;
  const progressPercent = Math.min(100, Math.round((cartTotalQar / FREE_SHIPPING_THRESHOLD) * 100));
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotalQar);

  // Identify complementary item if cart has 1 product
  const complementaryProduct = items.length === 1
    ? PRODUCTS.find((p) => p.sku !== items[0].sku)
    : null;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`kz-cart-backdrop ${isCartOpen ? 'open' : ''}`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`kz-cart-drawer ${isCartOpen ? 'open' : ''}`}
        role="dialog"
        aria-label={isRtl ? 'حقيبة الطلبات' : 'Shopping Cart'}
        aria-modal="true"
      >
        {/* Header */}
        <div className="kz-cart-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--kz-radius-sm)',
                background: 'var(--kz-surface-subtle)',
                border: '1px solid var(--kz-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--kz-text-primary)'
              }}
            >
              <ShoppingBag size={16} />
            </div>
            <div>
              <p className="kz-cart-title" style={{ margin: 0, lineHeight: 1.2 }}>
                {isRtl ? 'حقيبة الطلبات' : 'Order Bag'}
              </p>
              <span style={{ fontFamily: 'var(--kz-font-mono)', fontSize: '0.78rem', color: 'var(--kz-text-muted)' }}>
                {cartCount} {cartCount === 1 ? (isRtl ? 'قطعة' : 'unit') : (isRtl ? 'قطع' : 'units')}
              </span>
            </div>
          </div>

          <button
            type="button"
            className="kz-icon-circle-btn"
            onClick={closeCart}
            aria-label="Close cart drawer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div
          style={{
            background: progressPercent >= 100 ? '#F0FDF4' : 'var(--kz-surface-subtle)',
            borderBottom: '1px solid var(--kz-border)',
            padding: '12px 24px',
            transition: 'background 300ms ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.78rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 600, color: progressPercent >= 100 ? '#15803D' : 'var(--kz-text-primary)' }}>
              <Truck size={14} color={progressPercent >= 100 ? '#15803D' : 'var(--kz-crimson)'} />
              <span>
                {progressPercent >= 100 ? (
                  isRtl ? 'مؤهل للشحن السريع المجاني داخل قطر والخليج' : 'Unlocked: Free Express GCC Courier Delivery'
                ) : (
                  <>
                    {isRtl ? 'أضف ' : 'Add '}
                    <PriceTag amountInQar={remainingForFreeShipping} />
                    {isRtl ? ' إضافية للشحن السريع المجاني' : ' more for Free Express GCC Shipping'}
                  </>
                )}
              </span>
            </div>
            <span style={{ fontFamily: 'var(--kz-font-mono)', fontSize: '0.72rem', fontWeight: 700, color: progressPercent >= 100 ? '#15803D' : 'var(--kz-text-muted)' }}>
              {progressPercent}%
            </span>
          </div>

          {/* Progress track — GPU-composited via scaleX, no layout thrash */}
          <div
            style={{
              width: '100%',
              height: '5px',
              background: '#E2E8F0',
              borderRadius: '999px',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                background: progressPercent >= 100 ? '#16A34A' : 'var(--kz-crimson)',
                borderRadius: '999px',
                transform: `scaleX(${progressPercent / 100})`,
                transformOrigin: 'left center',
                transition: 'transform 400ms var(--kz-ease-spring)'
              }}
            />
          </div>
        </div>

        {/* Items Scroll Area */}
        <div className="kz-cart-items-scroll">
          {items.length > 0 ? (
            <>
              {items.map((item) => (
                <div key={item.sku} className="kz-double-bezel" style={{ padding: '3px', borderRadius: 'var(--kz-radius-lg)' }}>
                  <div
                    className="kz-double-bezel-inner"
                    style={{
                      padding: '14px',
                      borderRadius: 'calc(var(--kz-radius-lg) - 3px)',
                      display: 'flex',
                      gap: '14px',
                      alignItems: 'center'
                    }}
                  >
                    {/* Item Image Stage */}
                    <div
                      style={{
                        width: '74px',
                        height: '74px',
                        background: 'radial-gradient(circle at center, #FFFFFF 0%, #F8FAFC 100%)',
                        border: '1px solid var(--kz-border-subtle)',
                        borderRadius: 'var(--kz-radius-md)',
                        padding: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <img
                        src={item.thumbnail || item.image}
                        alt={item.name}
                        style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                      />
                    </div>

                    {/* Item Content */}
                    <div style={{ flexGrow: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--kz-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {item.edition || item.name}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: 'var(--kz-text-muted)', marginTop: '2px' }}>
                            {item.finish}
                          </div>
                        </div>

                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.sku)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--kz-text-muted)',
                            cursor: 'pointer',
                            padding: '4px',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'color 150ms ease'
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--kz-crimson)')}
                          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--kz-text-muted)')}
                          title="Remove item"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      {/* Quantity Stepper and Line Price */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '12px' }}>
                        <div className="kz-qty-stepper" style={{ padding: '2px' }}>
                          <button
                            type="button"
                            className="kz-qty-btn"
                            style={{ width: '24px', height: '24px', fontSize: '0.85rem' }}
                            onClick={() => updateQuantity(item.sku, -1)}
                            aria-label="Decrease quantity"
                          >
                            -
                          </button>
                          <span className="kz-qty-value" style={{ width: '28px', fontSize: '0.82rem' }}>
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="kz-qty-btn"
                            style={{ width: '24px', height: '24px', fontSize: '0.85rem' }}
                            onClick={() => updateQuantity(item.sku, 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <div style={{ fontFamily: 'var(--kz-font-mono)', fontWeight: 800, fontSize: '0.96rem', color: 'var(--kz-text-primary)' }}>
                          <PriceTag amountInQar={item.price * item.quantity} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Quick Upsell Complementary Edition */}
              {complementaryProduct && (
                <div
                  style={{
                    marginTop: '8px',
                    padding: '14px',
                    background: 'var(--kz-surface-subtle)',
                    border: '1px dashed var(--kz-border)',
                    borderRadius: 'var(--kz-radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img
                      src={complementaryProduct.thumbnail || complementaryProduct.images?.[0] || '/assets/images/motor-silver.webp'}
                      alt={complementaryProduct.edition}
                      style={{ width: '38px', height: '38px', objectFit: 'contain', background: '#FFFFFF', borderRadius: '4px', padding: '2px', border: '1px solid var(--kz-border-subtle)' }}
                    />
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--kz-text-primary)' }}>
                        {isRtl ? `إضافة ${complementaryProduct.edition}` : `Add ${complementaryProduct.edition}`}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--kz-text-muted)', fontFamily: 'var(--kz-font-mono)' }}>
                        <PriceTag amountInQar={complementaryProduct.price} />
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="kz-btn kz-btn-secondary kz-btn-sm"
                    style={{ padding: '6px 12px', fontSize: '0.74rem' }}
                    onClick={() => addToCart(complementaryProduct, 1)}
                  >
                    <Plus size={12} />
                    <span>{isRtl ? 'إضافة' : 'Add'}</span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '64px 20px', color: 'var(--kz-text-muted)' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  background: 'var(--kz-surface-subtle)',
                  border: '1px solid var(--kz-border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  color: 'var(--kz-text-muted)'
                }}
              >
                <ShoppingBag size={28} strokeWidth={1.4} />
              </div>
              <h4 style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--kz-text-primary)', marginBottom: '4px' }}>
                {isRtl ? 'حقيبة الطلبات فارغة' : 'Your Bag is Empty'}
              </h4>
              <p style={{ fontSize: '0.84rem', color: 'var(--kz-text-secondary)', maxWidth: '28ch', margin: '0 auto 20px', lineHeight: '1.5' }}>
                {isRtl ? 'اختر إصدار كزاز (الأسود أو الفضي) لبدء التجهيز والشحن.' : 'Select a Kazez Actuator Edition to prepare direct courier dispatch.'}
              </p>
              <button
                type="button"
                className="kz-btn kz-btn-primary kz-btn-sm"
                onClick={() => {
                  addToCart(PRODUCTS[0], 1);
                }}
              >
                <Plus size={14} />
                <span>{isRtl ? 'إضافة الإصدار الأسود (Black Edition)' : 'Quick Add Black Edition'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Footer & Checkout Action */}
        {items.length > 0 && (
          <div className="kz-cart-footer">
            <div className="kz-cart-total-row" style={{ marginBottom: '8px' }}>
              <span className="kz-cart-total-lbl">{isRtl ? 'المجموع الإجمالي' : 'Cart Subtotal'}</span>
              <span className="kz-cart-total-val">
                <PriceTag amountInQar={cartTotalQar} />
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', color: '#15803D', fontWeight: 600, marginBottom: '16px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={14} />
                <span>{isRtl ? 'ضمان رسمي شامل لمدة عام' : '1-Year Official Warranty Included'}</span>
              </span>
              <span>{isRtl ? 'شحن سريع مجاني' : 'Express Courier'}</span>
            </div>

            <button
              type="button"
              className="kz-btn kz-btn-primary"
              style={{ width: '100%', padding: '16px', fontSize: '0.96rem' }}
              onClick={handleCheckoutClick}
            >
              <span>{isRtl ? 'متابعة إلى إتمام الطلب' : 'Proceed to Checkout'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}
      </aside>
    </>
  );
};
