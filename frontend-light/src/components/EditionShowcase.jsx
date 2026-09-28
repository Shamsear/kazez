import React, { useState } from 'react';
import { ArrowRight, ShoppingBag, ShieldCheck, Zap, Layers, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { PriceTag } from './PriceTag';

export const EditionShowcase = ({ onSelectEdition }) => {
  const { t, isRtl } = useLanguage();
  const { addToCart } = useCart();
  const [addedSku, setAddedSku] = useState(null);

  const handleAdd = (prod) => {
    addToCart(prod, 1);
    setAddedSku(prod.sku);
    setTimeout(() => setAddedSku(null), 2000);
  };

  return (
    <section className="kz-section kz-editions-section" id="kz-editions">
      <div className="kz-container">
        {/* Section Header */}
        <div className="kz-section-header kz-reveal">
          <h2 className="kz-section-h2">
            {t.editions?.titlePart1 || 'The Two Precision'}{' '}
            <span className="kz-serif-accent" style={{ color: 'var(--kz-crimson)' }}>
              {t.editions?.titlePart2 || 'Editions.'}
            </span>
          </h2>
          <p className="kz-section-sub">
            {t.editions?.subtitle || 'Engineered identically inside. Finished with distinct metallurgical treatments for high-speed desert exploration and luxury automotive contours.'}
          </p>
        </div>

        {/* Editions Grid */}
        <div className="kz-editions-grid">
          {PRODUCTS.map((prod, idx) => {
            const isSilverCard = prod.sku === 'KAZEZ-SLVR';
            return (
              <div key={prod.id} className={`kz-double-bezel kz-reveal kz-delay-${idx + 1} ${isSilverCard ? 'kz-card-silver' : 'kz-card-black'}`}>
                <div className="kz-double-bezel-inner" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  {/* Card Header */}
                  <div className="kz-edition-card-topbar">
                    <span
                      className={isSilverCard ? 'kz-badge-silver' : 'kz-badge-black'}
                      style={{
                        padding: '4px 12px',
                        borderRadius: 'var(--kz-radius-pill)',
                        fontFamily: 'var(--kz-font-mono)',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        textTransform: 'uppercase'
                      }}
                    >
                      {isRtl ? (prod.badgeAr || prod.badge) : prod.badge}
                    </span>

                    <div className="kz-edition-stock-status">
                      <span className="kz-stock-live-dot" aria-hidden="true" />
                      <span className="kz-stock-text">
                        {t.editions?.stockStatus || (isRtl ? 'متوفر · شحن فوري بالدوحة' : 'In Stock · Doha Express')}
                      </span>
                    </div>
                  </div>

                {/* Image Stage */}
                <div
                  className="kz-edition-img-stage"
                  onClick={() => onSelectEdition(prod.slug)}
                >
                  <img
                    src={prod.images[0]}
                    alt={`${prod.name} - ${prod.edition}`}
                    loading="lazy"
                  />
                </div>

                {/* Title & Finish */}
                <h3 className="kz-edition-title">{prod.edition}</h3>
                <div className="kz-edition-finish">{prod.finish}</div>
                <p className="kz-edition-desc">{prod.shortDescription}</p>

                {/* Specs Micro-Strip */}
                <div className="kz-edition-specs-strip">
                  <div className="kz-edition-spec-item">
                    <div className="kz-edition-spec-val">45 Nm</div>
                    <div className="kz-edition-spec-lbl">{isRtl ? 'عزم التثبيت' : 'Holding Torque'}</div>
                  </div>
                  <div className="kz-edition-spec-item">
                    <div className="kz-edition-spec-val">IP67</div>
                    <div className="kz-edition-spec-lbl">{isRtl ? 'عزل الغبار والماء' : 'Ingress Rating'}</div>
                  </div>
                  <div className="kz-edition-spec-item">
                    <div className="kz-edition-spec-val">160 km/h</div>
                    <div className="kz-edition-spec-lbl">{isRtl ? 'ثبات السرعات' : 'Stability Rate'}</div>
                  </div>
                </div>

                {/* Card Footer: Price & Direct Actions */}
                <div className="kz-edition-card-footer" style={{ marginTop: 'auto' }}>
                  <div className="kz-price-display">
                    <span className="kz-price-display-label">{isRtl ? 'السعر الرسمي' : 'Official Retail Price'}</span>
                    <div className="kz-price-display-num">
                      <PriceTag amountInQar={prod.price} />
                    </div>
                  </div>

                  <div className="kz-edition-card-actions">
                    <button
                      type="button"
                      className="kz-btn kz-btn-secondary kz-btn-sm"
                      onClick={() => handleAdd(prod)}
                      aria-label={`Add ${prod.edition} to cart`}
                    >
                      {addedSku === prod.sku ? (
                        <>
                          <Check size={14} color="#15803D" />
                          <span style={{ color: '#15803D' }}>{isRtl ? 'تمت الإضافة' : 'Added'}</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={14} />
                          <span>{isRtl ? 'أضف للسلة' : 'Add to Bag'}</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      className="kz-btn kz-btn-primary kz-btn-sm"
                      onClick={() => onSelectEdition(prod.slug)}
                    >
                      <span>{isRtl ? 'التفاصيل' : 'Configure'}</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </section>
  );
};
