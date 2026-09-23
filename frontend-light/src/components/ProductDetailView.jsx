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
  Check,
  Car,
  Search,
  Play
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { PRODUCTS } from '../data/products';
import { BRACKETS } from '../data/brackets';
import { PriceTag } from './PriceTag';
import { VehicleBracketConfigurator } from './VehicleBracketConfigurator';

export const ProductDetailView = ({ initialSku = 'KAZEZ', onBack, onSelectOtherEdition, onInstantCheckout }) => {
  const currentProduct = PRODUCTS.find((p) => p.sku === initialSku) || PRODUCTS[0];
  const { addToCart } = useCart();
  const { isRtl } = useLanguage();
  useScrollReveal('.kz-pdp-container .kz-reveal', [initialSku]);

  const [quantity, setQuantity] = useState(1);
  const [selectedBracket, setSelectedBracket] = useState(BRACKETS[0]);
  const [includeBracket, setIncludeBracket] = useState(true);
  const [selectedMake, setSelectedMake] = useState('all');
  const [fitmentSearch, setFitmentSearch] = useState('');
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [isFullWidth, setIsFullWidth] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const [openAccordions, setOpenAccordions] = useState({
    specs: true,
    fitment: false,
    box: true,
    install: false
  });

  const vehicles = [
    { make: 'Toyota', model: 'Land Cruiser LC300 / GR-Sport', years: '2022 - 2026', type: isRtl ? 'قاعدة وكالة مباشرة (A-Pillar / Fender)' : 'Direct Bolt-On (A-Pillar / Fender)' },
    { make: 'Toyota', model: 'Land Cruiser LC200 / VXR / GXR', years: '2008 - 2021', type: isRtl ? 'قاعدة هيكل مخصصة' : 'Direct Chassis Mount' },
    { make: 'Toyota', model: 'Land Cruiser LC70 / LC79 / LC76', years: '1984 - 2026', type: isRtl ? 'قاعدة تكتيكية للمهام الشاقة' : 'Heavy-Duty Tactical Mount' },
    { make: 'Nissan', model: 'Patrol Y62 / NISMO / Titanium', years: '2010 - 2026', type: isRtl ? 'تثبيت مباشر على براغي الهيكل' : 'Direct OEM Bolt-On' },
    { make: 'Nissan', model: 'Patrol Super Safari Y61', years: '1998 - 2026', type: isRtl ? 'قاعدة رالي صحراوي صلبة' : 'Desert Spec Rally Mount' },
    { make: 'Lexus', model: 'LX600 / LX500d F-Sport', years: '2022 - 2026', type: isRtl ? 'قاعدة كروم فاخرة بدون ثقب' : 'Zero-Drill Luxury Mount' },
    { make: 'Lexus', model: 'LX570 / Supercharger', years: '2008 - 2021', type: isRtl ? 'تثبيت متطابق مع الوكالة' : 'OEM Precision Mount' },
    { make: 'Ford', model: 'F-150 / F-150 Raptor / Tremor', years: '2015 - 2026', type: isRtl ? 'قاعدة تثبيت زاوية الكبوت' : 'Cowl / Hood Mount' },
    { make: 'GMC', model: 'Sierra 1500 / AT4 / Denali', years: '2019 - 2026', type: isRtl ? 'قاعدة ألمنيوم مخصصة' : 'Custom Billet Cowl Bracket' }
  ];

  const filteredVehicles = vehicles.filter((v) => {
    const matchesMake = selectedMake === 'all' || v.make.toLowerCase() === selectedMake.toLowerCase();
    const query = fitmentSearch.trim().toLowerCase();
    if (!query) return matchesMake;
    const matchesQuery =
      v.make.toLowerCase().includes(query) ||
      v.model.toLowerCase().includes(query) ||
      v.years.toLowerCase().includes(query) ||
      v.type.toLowerCase().includes(query);
    return matchesMake && matchesQuery;
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
            
            // The gallery unpins and stops sticking when its bottom edge scrolls past the viewport bottom area
            const floatEnded = galleryRect.bottom <= (window.innerHeight - 80);

            if (floatEnded !== isFullWidthRef.current) {
              isFullWidthRef.current = floatEnded;
              setIsFullWidth(floatEnded);
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
    if (includeBracket && selectedBracket) {
      addToCart({
        id: selectedBracket.id,
        sku: selectedBracket.sku,
        name: isRtl && selectedBracket.arabicName ? selectedBracket.arabicName : selectedBracket.name,
        edition: selectedBracket.model,
        specs: `${selectedBracket.weight} · ${selectedBracket.thickness} · ${selectedBracket.mountType}`,
        price: selectedBracket.price,
        image: selectedBracket.image,
        thumbnail: selectedBracket.image
      }, 1);
    }
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2200);
  };

  const handleInstantCheckout = () => {
    addToCart(currentProduct, quantity, false);
    if (includeBracket && selectedBracket) {
      addToCart({
        id: selectedBracket.id,
        sku: selectedBracket.sku,
        name: isRtl && selectedBracket.arabicName ? selectedBracket.arabicName : selectedBracket.name,
        edition: selectedBracket.model,
        specs: `${selectedBracket.weight} · ${selectedBracket.thickness} · ${selectedBracket.mountType}`,
        price: selectedBracket.price,
        image: selectedBracket.image,
        thumbnail: selectedBracket.image
      }, 1, false);
    }
    onInstantCheckout(currentProduct, quantity);
  };

  const isSilver = currentProduct.sku === 'KAZEZ-SLVR';
  const images = currentProduct.images || [];

  return (
    <div className="kz-pdp-container">
      <div className="kz-container">
        {/* Back Navigation Bar */}
        <div className="kz-pdp-back-bar kz-reveal" style={{ marginBottom: '16px' }}>
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
          {/* Left Column: Direct High-Definition Video Stage */}
          <div className="kz-pdp-gallery-wrap kz-reveal kz-delay-1" ref={galleryRef}>
            <div className="kz-double-bezel kz-pdp-video-bezel">
              <div className="kz-double-bezel-inner kz-pdp-video-bezel-inner">
                <div className="kz-pdp-video-stage">
                  <video
                    src="/assets/video/kazez-video-2.mp4"
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="kz-pdp-direct-video"
                  />
                  <div className="kz-pdp-video-badge">
                    <span className="kz-rec-pulse" />
                    <span>{isRtl ? 'فيديو الأداء الميداني // قطر' : 'FIELD PERFORMANCE VIDEO // QATAR'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Product Details, Switcher, Vehicle Configurator, CTAs & Specs */}
          <div className="kz-pdp-info-col kz-reveal kz-delay-2">
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

            <p style={{ fontSize: '0.95rem', color: 'var(--kz-text-secondary)', lineHeight: '1.7', marginBottom: '24px' }}>
              {currentProduct.description}
            </p>

            {/* Edition Switcher */}
            <div style={{ marginBottom: '10px', fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--kz-text-muted)' }}>
              {isRtl ? 'اختر الطلاء الهندسي للمحرك' : 'Select Motor Finish'}
            </div>
            <div className="kz-edition-toggle-bar" style={{ marginBottom: '24px' }}>
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

            {/* Vehicle & Mount Bracket Selector with Weight/Height/Thickness Specs */}
            <div style={{ marginBottom: '24px' }}>
              <VehicleBracketConfigurator
                selectedBracket={selectedBracket}
                onSelectBracket={(bracket) => setSelectedBracket(bracket)}
                includeBracket={includeBracket}
                onToggleIncludeBracket={() => setIncludeBracket(!includeBracket)}
              />
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
                onClick={handleInstantCheckout}
              >
                <span>{isRtl ? 'الشراء الفوري' : 'Instant Checkout'}</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Accordions */}
            <div className="kz-accordion-wrap kz-reveal kz-delay-3">
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

              {/* 2. Chassis Fitment Guide */}
              <div className="kz-accordion-item">
                <button
                  type="button"
                  className="kz-accordion-header"
                  onClick={() => toggleAccordion('fitment')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Car size={18} color="var(--kz-crimson)" />
                    <span>{isRtl ? 'دليل توافق المركبات وقواعد التثبيت' : 'Chassis Fitment Guide'}</span>
                  </div>
                  <ChevronDown
                    size={16}
                    style={{
                      transform: openAccordions.fitment ? 'rotate(180deg)' : 'rotate(0)',
                      transition: 'transform var(--kz-transition-fast)'
                    }}
                  />
                </button>

                {openAccordions.fitment && (
                  <div className="kz-accordion-body">
                    {/* Search & Filter */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--kz-surface-subtle)', border: '1px solid var(--kz-border)', borderRadius: 'var(--kz-radius-pill)', padding: '6px 14px', marginBottom: '12px' }}>
                      <Search size={14} color="var(--kz-text-muted)" style={{ flexShrink: 0 }} />
                      <input
                        type="text"
                        value={fitmentSearch}
                        onChange={(e) => setFitmentSearch(e.target.value)}
                        placeholder={isRtl ? 'ابحث عن سيارتك أو الموديل (مثال: LC300, Patrol, Raptor)...' : 'Search model or year (e.g. LC300, Patrol, Raptor)...'}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          outline: 'none',
                          color: 'var(--kz-text-primary)',
                          fontSize: '0.82rem',
                          fontFamily: 'inherit',
                          width: '100%'
                        }}
                      />
                      {fitmentSearch && (
                        <button
                          type="button"
                          onClick={() => setFitmentSearch('')}
                          style={{ background: 'transparent', border: 'none', color: 'var(--kz-text-muted)', cursor: 'pointer', fontSize: '11px', padding: '2px 6px' }}
                        >
                          ✕
                        </button>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '14px' }}>
                      {['all', 'Toyota', 'Nissan', 'Lexus', 'Ford', 'GMC'].map((make) => (
                        <button
                          key={make}
                          type="button"
                          className={`kz-filter-pill ${selectedMake === make ? 'active' : ''}`}
                          onClick={() => setSelectedMake(make)}
                          style={{
                            padding: '4px 10px',
                            borderRadius: '12px',
                            border: '1px solid var(--kz-border)',
                            background: selectedMake === make ? 'var(--kz-text-primary)' : 'var(--kz-surface)',
                            color: selectedMake === make ? '#FFFFFF' : 'var(--kz-text-secondary)',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            cursor: 'pointer'
                          }}
                        >
                          {make === 'all' ? (isRtl ? 'الكل' : 'All') : make}
                        </button>
                      ))}
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                      {filteredVehicles.map((veh, idx) => (
                        <div key={idx} style={{ padding: '10px 14px', background: 'var(--kz-surface-subtle)', border: '1px solid var(--kz-border-subtle)', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--kz-text-primary)' }}>{veh.make} {veh.model}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--kz-text-muted)' }}>{veh.years}</div>
                          </div>
                          <span style={{ fontSize: '0.75rem', background: '#FFFFFF', padding: '3px 8px', borderRadius: '6px', border: '1px solid var(--kz-border)', color: 'var(--kz-crimson)', fontWeight: 600 }}>
                            {veh.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* 3. What's in the Box */}
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
    </div>
  );
};
