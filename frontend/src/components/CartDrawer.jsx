import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Plus, ShieldCheck, Zap, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { PRODUCTS } from '../data/products';
import { PriceTag } from './PriceTag';

export const CartDrawer = ({ onProceedToCheckout }) => {
  const {
    items,
    isCartOpen,
    closeCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotalQar
  } = useCart();
  const { t, isRtl } = useLanguage();

  return (
    <>
      {/* Backdrop */}
      <div className={`kz-cart-backdrop ${isCartOpen ? 'open' : ''}`} onClick={closeCart} />

      {/* Slide-out Drawer */}
      <aside className={`kz-cart-drawer ${isCartOpen ? 'open' : ''}`} aria-label={t.cart.title}>
        {/* Header */}
        <div className="kz-cart-header">
          <h3 className="kz-cart-title">{t.cart.title}</h3>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {items.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="kz-cart-clear-btn"
                aria-label={isRtl ? 'تفريغ السلة' : 'Clear Cart'}
              >
                <Trash2 size={13} />
                <span>{isRtl ? 'تفريغ السلة' : 'Clear'}</span>
              </button>
            )}
            <button type="button" className="kz-cart-close" onClick={closeCart} aria-label="Close cart">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Item List */}
        <div className="kz-cart-items-wrap">
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '36px 16px', color: 'var(--kz-text-muted)' }}>
              <ShoppingBag size={36} style={{ opacity: 0.3, margin: '0 auto 10px' }} />
              <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: '6px', fontSize: '0.94rem' }}>{t.cart.emptyTitle}</h4>
              <p style={{ fontSize: '0.82rem', fontWeight: 300, marginBottom: '24px' }}>{t.cart.emptySub}</p>

              {/* Quick Add Recommendations */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', textAlign: isRtl ? 'right' : 'left' }}>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--kz-text-muted)', fontWeight: 600 }}>
                  {isRtl ? 'إصدارات هوائي كزاز الفاخرة' : 'Recommended Editions'}
                </div>
                {PRODUCTS.map((prod) => (
                  <button
                    key={prod.sku}
                    type="button"
                    onClick={() => addToCart(prod, 1)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 14px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid var(--kz-border)',
                      borderRadius: '12px',
                      color: '#FFFFFF',
                      cursor: 'pointer',
                      transition: 'all 160ms ease'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={prod.images[0]} alt={prod.edition} style={{ width: '36px', height: '36px', objectFit: 'contain', borderRadius: '6px', background: 'rgba(255, 255, 255, 0.05)' }} />
                      <div>
                        <div style={{ fontSize: '0.84rem', fontWeight: 600 }}>{prod.edition}</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--kz-text-muted)' }}><PriceTag amount={prod.price} size="card" /></div>
                      </div>
                    </div>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', background: 'var(--kz-racing-red)', padding: '5px 10px', borderRadius: 'var(--kz-radius-pill)', fontWeight: 600 }}>
                      <Plus size={12} /> {isRtl ? 'أضف' : 'Add'}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.sku} className="kz-cart-item">
                <div className="kz-cart-item-img">
                  <img src={item.image} alt={item.edition} />
                </div>

                <div className="kz-cart-item-info">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <h4 className="kz-cart-item-title">{item.edition}</h4>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.sku)}
                      className="kz-cart-remove-btn"
                      aria-label="Remove item"
                      title={isRtl ? 'حذف العنصر' : 'Remove item'}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="kz-cart-item-sku">SKU: {item.sku}</div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                    {/* Enhanced Tactile Stepper */}
                    <div className="kz-cart-stepper">
                      <button
                        type="button"
                        className="kz-stepper-btn"
                        onClick={() => updateQuantity(item.sku, -1)}
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="kz-stepper-val">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="kz-stepper-btn"
                        onClick={() => updateQuantity(item.sku, 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <PriceTag amount={item.price * item.quantity} size="cart" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Compact Space-Efficient Footer */}
        {items.length > 0 && (
          <div className="kz-cart-footer">
            <div className="kz-cart-subtotal-row">
              <span style={{ fontSize: '0.84rem', fontWeight: 400, color: 'var(--kz-text-muted)' }}>{t.cart.subtotal}</span>
              <PriceTag amount={cartTotalQar} size="subtotal" />
            </div>

            <button
              type="button"
              className="kz-btn kz-btn-primary kz-btn-island"
              style={{ width: '100%', marginTop: '8px' }}
              onClick={() => { closeCart(); onProceedToCheckout(); }}
            >
              <span>{t.cart.proceedCheckout}</span>
              <span className="kz-btn-island-icon">
                {isRtl ? '←' : '→'}
              </span>
            </button>

            {/* Regional Payment Badges & Dispatch Trust Strip */}
            <div style={{ marginTop: '14px', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--kz-text-muted)', border: '1px solid var(--kz-border)', fontWeight: 600 }}>Apple Pay</span>
                <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--kz-text-muted)', border: '1px solid var(--kz-border)', fontWeight: 600 }}>Mada</span>
                <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--kz-text-muted)', border: '1px solid var(--kz-border)', fontWeight: 600 }}>KNET</span>
                <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(255, 255, 255, 0.05)', color: 'var(--kz-text-muted)', border: '1px solid var(--kz-border)', fontWeight: 600 }}>Visa / Master</span>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--kz-text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={12} color="var(--kz-racing-red)" />
                <span>{isRtl ? 'شحن سريع مؤمن وضمان استبدال مباشر لمدة عام' : 'Insured GCC Express & 1-Year Direct Warranty'}</span>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};
