import React from 'react';
import { ShoppingBag, Eye } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { PriceTag } from './PriceTag';

export const ProductCard = ({ product, index = 0, onSelectProduct }) => {
  const { t, isRtl } = useLanguage();
  const { addToCart, openCart } = useCart();
  useScrollReveal('.kz-product-card');

  const isSilver = product.slug === 'kazez-silver';
  const editionTitle = isSilver ? t.nav.silverEdition : t.nav.blackEdition;
  const finishTag = isSilver ? t.pdp.silverChrome : t.pdp.blackChrome;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
    openCart();
  };

  return (
    <div
      className={`kz-product-card ${isSilver ? 'theme-silver' : 'theme-black'} kz-reveal kz-delay-${(index % 2) + 1}`}
      onClick={() => onSelectProduct(product.slug)}
    >
      {/* Top badge row */}
      <div className="kz-card-badge-row">
        <span style={{ fontFamily: 'var(--kz-font-mono)', fontSize: '12px', letterSpacing: '0.04em', color: 'var(--kz-text-muted)', textTransform: 'uppercase' }}>
          {product.sku}
        </span>
        <span className="kz-chip" style={{ fontSize: '12px' }}>
          {product.stock} {t.editions.inStock}
        </span>
      </div>

      {/* Product image container with interactive inspect pill */}
      <div className="kz-product-img-wrap">
        <img
          src={product.images[0]}
          alt={`${product.name} ${product.edition}`}
          className="kz-product-card-img"
          loading="lazy"
        />
        <div className="kz-card-inspect-pill" aria-hidden="true">
          <Eye size={13} />
          <span>{isRtl ? 'استكشف المواصفات' : 'Inspect Specs'}</span>
        </div>
      </div>

      {/* Card body */}
      <div className="kz-card-body">
        <h3 className="kz-card-title">{editionTitle}</h3>
        <div className="kz-card-finish-tag">{finishTag}</div>

        {/* Feature Highlight Badges */}
        <div className="kz-card-features">
          <span className="kz-card-feat-chip">
            {t.editions.chipBillet}
          </span>
          <span className="kz-card-feat-chip">
            {t.editions.chipGear}
          </span>
          <span className="kz-card-feat-chip">
            {t.editions.chipSealed}
          </span>
        </div>

        {/* Footer with price & actions */}
        <div className="kz-card-footer">
          <PriceTag amount={product.price} size="card" />

          <button
            type="button"
            className="kz-btn kz-btn-primary kz-btn-island kz-btn-sm"
            onClick={handleAddToCart}
            aria-label={`${t.editions.addToCart || 'Add to Cart'} - ${product.edition}`}
          >
            <span>{t.editions.addToCart || 'Add to Cart'}</span>
            <span className="kz-btn-island-icon">
              <ShoppingBag size={13} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
