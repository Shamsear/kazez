import React, { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Zap,
  Layers,
  Radio,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  Maximize2,
  X,
  Package,
  Wrench,
  Truck,
  Check
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { PRODUCTS } from '../data/products';
import { PriceTag } from './PriceTag';

export const ProductDetailView = ({ initialSku = 'KAZEZ', onBack, onSelectOtherEdition, onInstantCheckout }) => {
  const currentProduct = PRODUCTS.find((p) => p.sku === initialSku) || PRODUCTS[0];
  const { addToCart } = useCart();
  const { isRtl } = useLanguage();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [isFullWidth, setIsFullWidth] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const [openAccordions, setOpenAccordions] = useState({
    specs: true,
    box: true,
    install: false
  });

  const actionsRowRef = useRef(null);
  const galleryRef = useRef(null);
  const gridRef = useRef(null);
  const isFullWidthRef = useRef(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (actionsRowRef.current) {
            const rect = actionsRowRef.current.getBoundingClientRect();
            // Show sticky bar when the primary actions row has scrolled above the top of the viewport
            setShowStickyBar(rect.bottom < 0);
          }

          if (galleryRef.current) {
            const galleryRect = galleryRef.current.getBoundingClientRect();
            
            // Expected sticky top position from CSS (navHeight 70px + 14px = 84px)
            const computedStyle = window.getComputedStyle(galleryRef.current);
            const stickyTop = parseFloat(computedStyle.top) || 84;
            
            const wasFull = isFullWidthRef.current;
            
            // The left gallery float has ended ONLY when:
            // 1. The gallery has unpinned from its sticky top and scrolled up (top < stickyTop - 20)
            // 2. AND the gallery bottom is completely above the bottom floating bar (bottom <= innerHeight - 85)
            const floatEnded = galleryRect.top < (stickyTop - 20) && galleryRect.bottom <= (window.innerHeight - 85);
            
            // Float is restored when scrolling back up and either the gallery returns to its sticky top or enters the bottom area
            const floatRestored = galleryRect.top >= (stickyTop - 8) || galleryRect.bottom > (window.innerHeight - 65);

            let nextFull = wasFull;
            if (!wasFull && floatEnded) {
              nextFull = true;
            } else if (wasFull && floatRestored) {
              nextFull = false;
            }

            if (nextFull !== wasFull) {
              isFullWidthRef.current = nextFull;
              setIsFullWidth(nextFull);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleAddToCart = () => {
    addToCart(currentProduct, quantity);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2200);
  };

  const isSilver = currentProduct.sku === 'KAZEZ-SLVR';
  const images = currentProduct.images || [];

  return (
    <div className="kz-pdp-container">
      <div className="kz-container">
        {/* Back Navigation Bar */}
        <div className="kz-pdp-back-bar" style={{ marginBottom: '16px' }}>
          <button
            type="button"
            className="kz-btn kz-btn-secondary kz-btn-sm"
            onClick={onBack}
          >
            <ArrowLeft size={14} />
            <span>{isRtl ? 'العودة إلى المتجر' : 'Back to Showcase'}</span>
          </button>
        </div>

        {/* Main PDP Grid */}
        <div className={`kz-pdp-grid ${isSilver ? 'kz-pdp-edition-silver' : 'kz-pdp-edition-black'}`} ref={gridRef}>
          {/* Left Column: Visual Stage & Gallery */}
          <div className="kz-pdp-gallery-wrap" ref={galleryRef}>
            <div className="kz-double-bezel">
              <div className="kz-double-bezel-inner">
                <div
                  className="kz-pdp-main-stage"
                  onClick={() => setLightboxOpen(true)}
                  title="Click to expand high-resolution view"
                >
                  <button
                    type="button"
                    className="kz-pdp-zoom-btn"
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'var(--kz-surface-subtle)',
                      border: '1px solid var(--kz-border)',
                      borderRadius: '50%',
                      width: '34px',
                      height: '34px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--kz-text-muted)',
                      cursor: 'pointer',
                      zIndex: 2
                    }}
                    aria-label="Zoom image"
                  >
                    <Maximize2 size={15} />
                  </button>

                  <img
                    src={images[activeImageIndex] || images[0]}
                    alt={`${currentProduct.name} - View ${activeImageIndex + 1}`}
                    className="kz-pdp-main-img"
                  />
                </div>

                {/* Thumbnails */}
                <div className="kz-pdp-thumb-strip">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`kz-pdp-thumb-card ${activeImageIndex === idx ? 'active' : ''}`}
                      onClick={() => setActiveImageIndex(idx)}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Product Details, Switcher, CTAs & Specs */}
          <div className="kz-pdp-info-col">
            {/* Title */}
            <h1 className="kz-pdp-title">{currentProduct.edition}</h1>

            {/* Price Box */}
            <div className="kz-pdp-price-box">
              <span className="kz-pdp-price-amount">
                <PriceTag amountInQar={currentProduct.price} />
              </span>
              <span className="kz-pdp-tax-note">
                {isRtl ? 'شامل الضريبة والشحن السريع في قطر' : 'Includes Qatar Express Courier Dispatch'}
              </span>
            </div>

            <p style={{ fontSize: '0.95rem', color: 'var(--kz-text-secondary)', lineHeight: '1.7', marginBottom: '28px' }}>
              {currentProduct.description}
            </p>

            {/* Edition Switcher */}
            <div style={{ marginBottom: '10px', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--kz-text-muted)' }}>
              {isRtl ? 'اختر الطلاء الهندسي' : 'Select Metallurgical Finish'}
            </div>
            <div className="kz-edition-toggle-bar">
              <button
                type="button"
                className={`kz-edition-toggle-btn kz-toggle-black ${currentProduct.sku === 'KAZEZ' ? 'active' : ''}`}
                onClick={() => onSelectOtherEdition('KAZEZ')}
              >
                <span className="kz-toggle-edition-name">{isRtl ? 'الإصدار الأسود الشبح' : 'Black Edition'}</span>
                <span className="kz-toggle-edition-sub">Hard-Anodized Stealth Chrome</span>
              </button>

              <button
                type="button"
                className={`kz-edition-toggle-btn kz-toggle-silver ${currentProduct.sku === 'KAZEZ-SLVR' ? 'active' : ''}`}
                onClick={() => onSelectOtherEdition('KAZEZ-SLVR')}
              >
                <span className="kz-toggle-edition-name">{isRtl ? 'الإصدار الفضي الكلاسيكي' : 'Silver Edition'}</span>
                <span className="kz-toggle-edition-sub">Mirror Electroplated Chrome</span>
              </button>
            </div>

            {/* Actions: Quantity Stepper + Add to Cart + Instant Buy */}
            <div className="kz-pdp-actions-row" ref={actionsRowRef}>
              <div className="kz-qty-stepper">
                <button
                  type="button"
                  className="kz-qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="kz-qty-value">{quantity}</span>
                <button
                  type="button"
                  className="kz-qty-btn"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="kz-btn kz-btn-secondary"
                style={{ flex: 1 }}
                onClick={handleAddToCart}
              >
                {justAdded ? (
                  <>
                    <Check size={16} color="#15803D" />
                    <span style={{ color: '#15803D' }}>{isRtl ? 'تمت الإضافة' : 'Added to Bag'}</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} />
                    <span>{isRtl ? 'أضف إلى السلة' : 'Add to Bag'}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                className="kz-btn kz-btn-primary"
                style={{ flex: 1.2 }}
                onClick={() => onInstantCheckout(currentProduct, quantity)}
              >
                <span>{isRtl ? 'الشراء الفوري' : 'Instant Checkout'}</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Accordions */}
            <div className="kz-accordion-wrap">
              {/* 1. Engineering Specifications */}
              <div className="kz-accordion-item">
                <button
                  type="button"
                  className="kz-accordion-header"
                  onClick={() => toggleAccordion('specs')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Layers size={18} color="var(--kz-crimson)" />
                    <span>{isRtl ? 'المواصفات الهندسية الدقيقة' : 'Technical Specifications'}</span>
                  </div>
                  <ChevronDown
                    size={16}
                    style={{
                      transform: openAccordions.specs ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform var(--kz-transition-fast)'
                    }}
                  />
                </button>

                {openAccordions.specs && (
                  <div className="kz-accordion-body">
                    <table className="kz-specs-table">
                      <tbody>
                        {currentProduct.specs.map((s, idx) => (
                          <tr key={idx}>
                            <td>{s.label}</td>
                            <td>{s.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* 2. What's in the Box */}
              <div className="kz-accordion-item">
                <button
                  type="button"
                  className="kz-accordion-header"
                  onClick={() => toggleAccordion('box')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Package size={18} color="var(--kz-crimson)" />
                    <span>{isRtl ? 'محتويات الصندوق الهندسي' : "In The Box"}</span>
                  </div>
                  <ChevronDown
                    size={16}
                    style={{
                      transform: openAccordions.box ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform var(--kz-transition-fast)'
                    }}
                  />
                </button>

                {openAccordions.box && (
                  <div className="kz-accordion-body">
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {currentProduct.inTheBox.map((item, idx) => (
                        <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.86rem' }}>
                          <CheckCircle2 size={15} color="#10B981" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* 3. Installation & Calibration */}
              <div className="kz-accordion-item">
                <button
                  type="button"
                  className="kz-accordion-header"
                  onClick={() => toggleAccordion('install')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Wrench size={18} color="var(--kz-crimson)" />
                    <span>{isRtl ? 'إرشادات التركيب والضمان' : 'Installation & 1-Year Direct Warranty'}</span>
                  </div>
                  <ChevronDown
                    size={16}
                    style={{
                      transform: openAccordions.install ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform var(--kz-transition-fast)'
                    }}
                  />
                </button>

                {openAccordions.install && (
                  <div className="kz-accordion-body">
                    <p style={{ marginBottom: '10px' }}>
                      {isRtl
                        ? 'يأتي المحرك بظفيرة كهربائية كاملة 12 فولت مع فيوز مدمج لمنع أي التماس كهربائي. التركيب يستغرق أقل من 20 دقيقة.'
                        : 'Includes pre-loomed 12V DC waterproof wiring loom with integrated inline fuse. 100% plug-and-play installation without wire splicing.'}
                    </p>
                    <div style={{ fontWeight: 600, color: 'var(--kz-text-primary)' }}>
                      {isRtl ? 'الضمان: استبدال فوري مباشر لمدة عام كامل.' : 'Warranty: 1-Year Direct Hassle-Free Replacement.'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Sticky Buy Bar (Smart Expand from Right Column to Full Width) */}
      <div className={`kz-sticky-bar-wrapper ${showStickyBar ? 'visible' : ''} ${isFullWidth ? 'kz-sticky-bar-full-width' : ''}`}>
        <div className="kz-sticky-bar-container">
          <div className="kz-sticky-buy-bar">
            <div className="kz-sticky-buy-product">
              <div className="kz-sticky-buy-thumb-wrap">
                <img
                  src={images[0]}
                  alt={currentProduct.name}
                  className="kz-sticky-buy-thumb"
                />
              </div>
              <div className="kz-sticky-buy-meta">
                <div className="kz-sticky-buy-title">{currentProduct.edition}</div>
                <div className="kz-sticky-buy-price">
                  <PriceTag amountInQar={currentProduct.price} />
                </div>
              </div>
            </div>

            <div className="kz-sticky-buy-actions">
              <button
                type="button"
                className="kz-btn kz-btn-secondary kz-sticky-buy-btn"
                onClick={handleAddToCart}
              >
                <ShoppingBag size={14} />
                <span>{isRtl ? 'أضف للسلة' : 'Add to Bag'}</span>
              </button>
              <button
                type="button"
                className="kz-btn kz-btn-primary kz-sticky-buy-btn"
                onClick={() => onInstantCheckout(currentProduct, quantity)}
              >
                <span>{isRtl ? 'الشراء الآن' : 'Checkout'}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(16px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px'
          }}
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              background: 'var(--kz-surface-subtle)',
              border: '1px solid var(--kz-border)',
              borderRadius: '50%',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            onClick={() => setLightboxOpen(false)}
            aria-label="Close image viewer"
          >
            <X size={20} />
          </button>

          <img
            src={images[activeImageIndex] || images[0]}
            alt="Expanded view"
            style={{
              maxWidth: '90vw',
              maxHeight: '85vh',
              objectFit: 'contain',
              filter: 'drop-shadow(0 30px 50px rgba(0, 0, 0, 0.12))'
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};
