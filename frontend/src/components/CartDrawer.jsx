import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { PriceTag } from './PriceTag';

export const CartDrawer = ({ onProceedToCheckout }) => {
  const {
    items,
    isCartOpen,
    closeCart,
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
            <div style={{ textAlign: 'center', padding: '48px 20px', color: 'var(--kz-text-muted)' }}>
              <ShoppingBag size={40} style={{ opacity: 0.3, margin: '0 auto 12px' }} />
              <h4 style={{ color: '#fff', fontWeight: 500, marginBottom: '6px', fontSize: '0.94rem' }}>{t.cart.emptyTitle}</h4>
              <p style={{ fontSize: '0.82rem', fontWeight: 300 }}>{t.cart.emptySub}</p>
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
          </div>
        )}
      </aside>
    </>
  );
};
