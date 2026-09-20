import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Activity, ArrowLeft, Car, Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, FileCheck, Layers, Maximize2, Package, Search, Shield, ShoppingBag, Sliders, Truck, Wrench, X, Zap } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { PRODUCTS } from '../data/products';
import { PriceTag } from './PriceTag';

export const ProductDetail = ({ initialSku = 'KAZEZ', onBack, onSelectOtherEdition, onInstantCheckout }) => {
  const currentProduct = PRODUCTS.find((p) => p.sku === initialSku) || PRODUCTS[0];
  const { addToCart, openCart } = useCart();
  const { t, isRtl } = useLanguage();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('specs'); // kept for legacy reference
  const [selectedMake, setSelectedMake] = useState('all');
  const [fitmentSearch, setFitmentSearch] = useState('');
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [openSections, setOpenSections] = useState({ specs: false, fitment: false, box: false, install: false });
  const sectionRefs = useRef({});

  // Entrance mount animation & scroll reveal binding
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(false);
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 30);
    return () => clearTimeout(timer);
  }, [currentProduct.sku]);

  useScrollReveal('.kz-pdp-section .kz-reveal', [currentProduct.sku]);

  const toggleSection = (key) => {
    const isCurrentlyOpen = !!openSections[key];
    const willOpen = !isCurrentlyOpen;

    // Identify which section is currently open (and about to collapse)
    const currentlyOpenKey = Object.keys(openSections).find((k) => openSections[k]);
    const clickedEl = sectionRefs.current[key];
    const closingEl = currentlyOpenKey ? sectionRefs.current[currentlyOpenKey] : null;

    // Calculate height that will collapse above the clicked item
    let heightShrinkAbove = 0;
    if (willOpen && closingEl && clickedEl && currentlyOpenKey !== key) {
      const isClosingAbove = (closingEl.compareDocumentPosition(clickedEl) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
      if (isClosingAbove) {
        const closingBody = closingEl.querySelector('.kz-content-block-body');
        if (closingBody) {
          heightShrinkAbove = closingBody.getBoundingClientRect().height;
        }
      }
    }

    setOpenSections({
      specs: false,
      fitment: false,
      box: false,
      install: false,
      [key]: willOpen,
    });

    if (willOpen && clickedEl) {
      const navHeader = document.querySelector('.kz-header');
      const navOffset = (navHeader ? navHeader.offsetHeight : 72) + 16;
      const clickedRect = clickedEl.getBoundingClientRect();
      const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;

      const targetScrollY = Math.max(0, currentScrollY + clickedRect.top - heightShrinkAbove - navOffset);

      window.scrollTo({
        top: targetScrollY,
        behavior: 'smooth',
      });

      // Refinement pass after CSS grid transition (300ms) to ensure exact alignment
      setTimeout(() => {
        const target = sectionRefs.current[key];
        if (target) {
          const finalRect = target.getBoundingClientRect();
          if (Math.abs(finalRect.top - navOffset) > 8) {
            const refinedY = Math.max(0, (window.pageYOffset || document.documentElement.scrollTop) + finalRect.top - navOffset);
            window.scrollTo({
              top: refinedY,
              behavior: 'smooth',
            });
          }
        }
      }, 340);
    }
  };

  const totalImages = currentProduct.images.length;

  const nextImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev + 1) % totalImages);
  }, [totalImages]);

  const prevImage = useCallback(() => {
    setActiveImageIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  }, [totalImages]);

  // Visual Left & Right click handlers
  // In LTR: Left is previous, Right is next
  // In RTL: Thumbnails flow Right-to-Left, so clicking the left arrow points towards the next images
  const handleLeftClick = useCallback((e) => {
    e.stopPropagation();
    if (isRtl) {
      nextImage();
    } else {
      prevImage();
    }
  }, [isRtl, nextImage, prevImage]);

  const handleRightClick = useCallback((e) => {
    e.stopPropagation();
    if (isRtl) {
      prevImage();
    } else {
      nextImage();
    }
  }, [isRtl, nextImage, prevImage]);

  // --------------------------------------------------------------------------
  // TOUCH SCREEN SWIPE SUPPORT
  // --------------------------------------------------------------------------
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchEndX = useRef(0);
  const touchEndY = useRef(0);
  const hasSwipedRef = useRef(false);

  const handleTouchStart = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
    hasSwipedRef.current = false;
  };

  const handleTouchMove = (e) => {
    if (!e.touches || e.touches.length === 0) return;
    touchEndX.current = e.touches[0].clientX;
    touchEndY.current = e.touches[0].clientY;
    const diffX = touchEndX.current - touchStartX.current;
    const diffY = touchEndY.current - touchStartY.current;
    if (Math.abs(diffX) > 12 && Math.abs(diffX) > Math.abs(diffY)) {
      hasSwipedRef.current = true;
    }
  };

  const handleTouchEnd = () => {
    const diffX = touchEndX.current - touchStartX.current;
    const diffY = touchEndY.current - touchStartY.current;
    const absX = Math.abs(diffX);
    const absY = Math.abs(diffY);

    if (absX > 35 && absX > absY * 1.1) {
      hasSwipedRef.current = true;
      if (diffX < 0) {
        // Swiped finger left
        if (isRtl) {
          prevImage();
        } else {
          nextImage();
        }
      } else {
        // Swiped finger right
        if (isRtl) {
          nextImage();
        } else {
          prevImage();
        }
      }
    }

    // Reset swipe flag after brief delay so synthetic click event won't open lightbox
    setTimeout(() => {
      hasSwipedRef.current = false;
    }, 120);
  };

  const handleTouchCancel = () => {
    hasSwipedRef.current = false;
  };

  // --------------------------------------------------------------------------
  // TOUCHPAD (PRECISION TRACKPAD) HORIZONTAL SWIPE SUPPORT
  // --------------------------------------------------------------------------
  const mainViewRef = useRef(null);
  const wheelCooldownRef = useRef(false);
  const wheelAccumulatorRef = useRef(0);

  useEffect(() => {
    const el = mainViewRef.current;
    if (!el) return;

    let wheelTimer = null;

    const handleWheel = (e) => {
      const absX = Math.abs(e.deltaX);
      const absY = Math.abs(e.deltaY);

      // Trigger only when horizontal trackpad swipe dominates
      if (absX > absY && absX > 8) {
        e.preventDefault();
        e.stopPropagation();

        if (wheelCooldownRef.current) return;

        wheelAccumulatorRef.current += e.deltaX;

        if (Math.abs(wheelAccumulatorRef.current) >= 28) {
          if (wheelAccumulatorRef.current > 0) {
            // Two-finger flick left / scroll right
            if (isRtl) {
              prevImage();
            } else {
              nextImage();
            }
          } else {
            // Two-finger flick right / scroll left
            if (isRtl) {
              nextImage();
            } else {
              prevImage();
            }
          }

          wheelCooldownRef.current = true;
          wheelAccumulatorRef.current = 0;

          setTimeout(() => {
            wheelCooldownRef.current = false;
          }, 360);
        }

        clearTimeout(wheelTimer);
        wheelTimer = setTimeout(() => {
          wheelAccumulatorRef.current = 0;
        }, 180);
      } else {
        wheelAccumulatorRef.current = 0;
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheel);
      clearTimeout(wheelTimer);
    };
  }, [isRtl, nextImage, prevImage]);

  // Keyboard navigation when Lightbox is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === 'ArrowLeft') {
        if (isRtl) {
          nextImage();
        } else {
          prevImage();
        }
      } else if (e.key === 'ArrowRight') {
        if (isRtl) {
          prevImage();
        } else {
          nextImage();
        }
      } else if (e.key === 'Escape') {
        setLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, isRtl, nextImage, prevImage]);

  const primaryActionsRef = useRef(null);

  useEffect(() => {
    const updateStickyVisibility = () => {
      if (!primaryActionsRef.current) return;
      const rect = primaryActionsRef.current.getBoundingClientRect();
      // Show sticky bar only when user has scrolled past the bottom edge of the primary Add to Cart section
      setShowStickyBar(rect.bottom < 15);
    };

    window.addEventListener('scroll', updateStickyVisibility, { passive: true });
    window.addEventListener('resize', updateStickyVisibility, { passive: true });
    updateStickyVisibility();

    return () => {
      window.removeEventListener('scroll', updateStickyVisibility);
      window.removeEventListener('resize', updateStickyVisibility);
    };
  }, []);

  const handleFinishSwitch = (sku) => {
    setActiveImageIndex(0);
    onSelectOtherEdition(sku);
  };

  const handleAddToCart = () => {
    addToCart(currentProduct, quantity);
    openCart();
  };

  const handleInstantCheckout = () => {
    addToCart(currentProduct, quantity, false);
    if (onInstantCheckout) {
      onInstantCheckout(currentProduct, quantity);
    } else {
      window.location.hash = 'checkout';
    }
  };

  const isSilver = currentProduct.sku === 'KAZEZ-SLVR';
  const finishLabel = isSilver ? t.pdp.silverChrome : t.pdp.blackChrome;
  const finishSub = isSilver ? t.pdp.silverChromeSub : t.pdp.blackChromeSub;

  // Localized Specs Data with bidi-safe values
  const localizedSpecs = [
    {
      label: t.pdp.specTorque,
      value: isRtl ? '45 ن.م (تروس كوكبية صلبة)' : '45 Nm (Planetary Gear Reduction)',
      bidi: '45 Nm'
    },
    {
      label: t.pdp.specMaterial,
      value: isRtl ? 'ألمنيوم الطائرات 6061-T6 المشكّل' : '6061-T6 Aircraft-Grade Forged Billet Alloy',
      bidi: '6061-T6'
    },
    {
      label: t.pdp.specSealing,
      value: isRtl ? 'عزل IP67 محكم ضد الماء والغبار' : 'IP67 Hermetically Sealed (Dustproof & 1m Submersion)',
      bidi: 'IP67'
    },
    {
      label: t.pdp.specVoltage,
      value: isRtl ? '12V - 14.4V تيار مستمر (متوافق مع ضفيرة المركبة)' : '12V – 14.4V DC (Automotive Loom Compatible)',
      bidi: '12V - 14.4V DC'
    },
    {
      label: t.pdp.specControl,
      value: isRtl ? 'ريموت لاسلكي 433 ميجاهرتز + مفتاح داخلي' : 'Wireless RF 433 MHz Remote + In-Cabin Switch',
      bidi: 'RF 433 MHz'
    },
    {
      label: t.pdp.specFrequency,
      value: isRtl ? '136 ميجاهرتز - 470 ميجاهرتز (بدون أي فقد للإشارة)' : '136 MHz – 470 MHz (0.0 dB Insertion Loss)',
      bidi: '136 MHz - 470 MHz'
    },
    {
      label: t.pdp.specCycle,
      value: isRtl ? '1.8 ثانية (حركة كاملة 90 درجة)' : '1.8 Seconds (Full 90° Deployment Stroke)',
      bidi: '1.8s'
    },
    {
      label: t.pdp.specOrigin,
      value: isRtl ? 'تشغيل CNC خماسي المحاور عالي الدقة' : '5-Axis Precision CNC Machined · Quality Audited',
      bidi: '5-Axis CNC'
    }
  ];

  // Vehicles for Fitment Tab
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

  // Box Items for Tab 3
  const boxItems = [
    {
      title: t.pdp.boxItem1Title,
      desc: t.pdp.boxItem1Desc,
      icon: <Layers size={22} color="var(--kz-racing-red)" />
    },
    {
      title: t.pdp.boxItem2Title,
      desc: t.pdp.boxItem2Desc,
      icon: <Car size={22} color="var(--kz-racing-red)" />
    },
    {
      title: t.pdp.boxItem3Title,
      desc: t.pdp.boxItem3Desc,
      icon: <Sliders size={22} color="var(--kz-racing-red)" />
    },
    {
      title: t.pdp.boxItem4Title,
      desc: t.pdp.boxItem4Desc,
      icon: <Package size={22} color="var(--kz-racing-red)" />
    },
    {
      title: t.pdp.boxItem5Title,
      desc: t.pdp.boxItem5Desc,
      icon: <FileCheck size={22} color="var(--kz-racing-red)" />
    }
  ];

  // Installation Steps for Tab 4
  const installSteps = [
    {
      step: '01',
      title: t.pdp.installStep1Title,
      desc: t.pdp.installStep1Desc,
      tag: isRtl ? 'وقت التركيب: 5 دقائق' : 'Est. Time: 5 Mins'
    },
    {
      step: '02',
      title: t.pdp.installStep2Title,
      desc: t.pdp.installStep2Desc,
      tag: isRtl ? 'مسمار الهوائي القياسي M16 / 3/8-24' : 'Standard M16 / 3/8-24 Stud'
    },
    {
      step: '03',
      title: t.pdp.installStep3Title,
      desc: t.pdp.installStep3Desc,
      tag: isRtl ? 'توصيل مباشر Plug & Play' : 'Plug & Play 12V Loom'
    }
  ];

  return (
    <div className={`kz-pdp-section ${isMounted ? 'is-mounted' : ''}`}>
      <div className="kz-pdp-container">
        
        {/* Topbar Navigation */}
        <div className="kz-pdp-topbar">
          <button
            type="button"
            className="kz-btn kz-btn-secondary kz-btn-sm"
            onClick={onBack}
          >
            <ArrowLeft size={14} style={{ transform: isRtl ? 'rotate(180deg)' : 'none' }} /> {t.pdp.backToStorefront}
          </button>
        </div>

        <div className={`kz-pdp-layout ${isSilver ? 'pdp-silver-stage' : 'pdp-black-stage'}`}>
          
          {/* Left Column: Responsive Gallery */}
          <div className={`kz-gallery-container ${isSilver ? 'theme-silver' : 'theme-black'}`}>
            <div
              ref={mainViewRef}
              className="kz-main-view"
              onClick={() => {
                if (hasSwipedRef.current) return;
                setLightboxOpen(true);
              }}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onTouchCancel={handleTouchCancel}
              tabIndex={0}
              role="region"
              aria-label="Interactive Product Image Gallery"
            >
              {/* Left Arrow Button */}
              <button
                type="button"
                className="kz-gallery-nav-btn kz-gallery-prev"
                onClick={handleLeftClick}
                aria-label={isRtl ? 'الصورة التالية' : 'Previous Image'}
              >
                <ChevronLeft size={18} />
              </button>

              <img
                key={`${currentProduct.sku}-${activeImageIndex}`}
                src={currentProduct.images[activeImageIndex]}
                alt={`${currentProduct.name} ${currentProduct.edition} - View ${activeImageIndex + 1}`}
                className="kz-pdp-main-img"
                loading="eager"
              />

              {/* Right Arrow Button */}
              <button
                type="button"
                className="kz-gallery-nav-btn kz-gallery-next"
                onClick={handleRightClick}
                aria-label={isRtl ? 'الصورة السابقة' : 'Next Image'}
              >
                <ChevronRight size={18} />
              </button>

              {/* Image Counter Pill */}
              <div className="kz-gallery-counter" dir="ltr">
                <span>{activeImageIndex + 1}</span> <span className="kz-counter-sep">/</span> <span>{totalImages}</span>
              </div>

              {/* Inspect pill */}
              <button
                type="button"
                className="kz-control-pill kz-gallery-inspect-btn"
                onClick={(e) => { e.stopPropagation(); setLightboxOpen(true); }}
                aria-label={t.pdp.clickToInspect}
              >
                <Maximize2 size={12} /> {t.pdp.clickToInspect}
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="kz-thumb-strip">
              {currentProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`kz-thumb-btn ${activeImageIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveImageIndex(idx)}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <img src={img} alt="Thumbnail preview" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Title, Seamless Price & CTAs Up Front */}
          <div className="kz-pdp-info">
            
            {/* Tag & Product Title */}
            {/* Product Title & Metadata Subtitle */}
            <div className="kz-pdp-header-block kz-pdp-entry kz-pdp-entry-1">
              <h1 className="kz-hero-title kz-pdp-title">
                {currentProduct.name}
              </h1>

              <div className="kz-pdp-finish-sub">
                <span style={{ fontFamily: 'var(--kz-font-mono)', fontWeight: 600, color: 'var(--kz-racing-red)', marginRight: isRtl ? 0 : '6px', marginLeft: isRtl ? '6px' : 0 }}>{currentProduct.sku}</span> &middot; {finishLabel} &middot; {finishSub}
              </div>
            </div>

            {/* ⚡ SEAMLESS PRICE DISPLAY (NO CONTAINER BOX) */}
            <div className="kz-pdp-seamless-price-row kz-pdp-entry kz-pdp-entry-2">
              <PriceTag amount={currentProduct.price} size="pdp" />
            </div>

            {/* CNC Billet Finish Switcher */}
            <div className="kz-finish-selector-box kz-pdp-entry kz-pdp-entry-3">
              <span className="kz-finish-label">{t.pdp.housingFinish}</span>
              <div className="kz-finish-options">
                <button
                  type="button"
                  className={`kz-finish-btn ${currentProduct.sku === 'KAZEZ' ? 'active' : ''}`}
                  onClick={() => handleFinishSwitch('KAZEZ')}
                >
                  <span className="kz-finish-swatch black" />
                  <div style={{ textAlign: isRtl ? 'right' : 'left' }}>
                    <div className="kz-finish-name">{t.pdp.blackChrome}</div>
                    <div className="kz-finish-desc">{t.pdp.blackChromeSub}</div>
                  </div>
                </button>

                <button
                  type="button"
                  className={`kz-finish-btn ${currentProduct.sku === 'KAZEZ-SLVR' ? 'active' : ''}`}
                  onClick={() => handleFinishSwitch('KAZEZ-SLVR')}
                >
                  <span className="kz-finish-swatch silver" />
                  <div style={{ textAlign: isRtl ? 'right' : 'left' }}>
                    <div className="kz-finish-name">{t.pdp.silverChrome}</div>
                    <div className="kz-finish-desc">{t.pdp.silverChromeSub}</div>
                  </div>
                </button>
              </div>
            </div>

            {/* ⚡ PRIMARY PURCHASE CTAS (Right Above-The-Fold) */}
            <div ref={primaryActionsRef} className="kz-pdp-actions kz-pdp-entry kz-pdp-entry-4">
              {/* Row 1: Quantity stepper + Add to Cart */}
              <div className="kz-pdp-actions-row">
                <div className="kz-stepper">
                  <button
                    type="button"
                    className="kz-stepper-btn"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <div className="kz-stepper-val">{quantity}</div>
                  <button
                    type="button"
                    className="kz-stepper-btn"
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="kz-btn kz-btn-secondary kz-btn-add-cart"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag size={16} /> {t.pdp.addToCart}
                </button>
              </div>

              {/* Row 2: Instant Checkout — full width, prominent */}
              <button
                type="button"
                className="kz-btn kz-btn-primary kz-btn-instant"
                onClick={handleInstantCheckout}
              >
                <Zap size={18} /> {t.pdp.instantCheckout}
              </button>
            </div>

            {/* Trust Badges Strip */}
            <div className="kz-trust-strip kz-pdp-entry kz-pdp-entry-5">
              <div className="kz-trust-item">
                <Truck size={15} color="var(--kz-racing-red)" />
                <span>{t.pdp.deliveryBadge}</span>
              </div>
              <div className="kz-trust-item">
                <Shield size={15} color="var(--kz-racing-red)" />
                <span>{t.pdp.warrantyBadge}</span>
              </div>
              <div className="kz-trust-item">
                <Wrench size={15} color="var(--kz-racing-red)" />
                <span>{t.pdp.fittingBadge}</span>
              </div>
            </div>

            {/* Short Engineering Overview */}
            <div className="kz-pdp-desc-box kz-pdp-entry kz-pdp-entry-6">
              <p className="kz-pdp-desc-text">
                {isRtl
                  ? 'مشكّل من سبيكة ألمنيوم الطائرات 6061-T6 مع طلاء كهربائي متعدد المراحل. مزود بنظام تروس كوكبية فولاذي يوفر عزم تثبيت 45 ن.م لضمان ثبات الهوائيات الثقيلة عند سرعات 160 كم/س دون أي اهتزاز. معزول كلياً بمعيار IP67 ضد الغبار الناعم والرطوبة وحرارة الصيف الشديدة.'
                  : currentProduct.description
                }
              </p>
            </div>

            {/* ── TECHNICAL SPECIFICATIONS & COMPREHENSIVE FITMENT (Right-Side Column Flow) ── */}
            <div className="kz-pdp-sections">

            {/* ── SECTION 1: ENGINEERING SPECS ── */}
            <div
              ref={(el) => { sectionRefs.current.specs = el; }}
              className={`kz-content-block kz-reveal kz-delay-1 ${openSections.specs ? 'is-open' : ''}`}
            >
              <button type="button" className="kz-content-block-header" onClick={() => toggleSection('specs')} aria-expanded={openSections.specs}>
                <h2 className="kz-content-block-title">
                  <Activity size={15} className="kz-content-block-icon" />
                  <span>{isRtl ? 'المواصفات التقنية' : 'Engineering Specs'}</span>
                </h2>
                <div className="kz-content-block-actions">
                  {openSections.specs && (
                    <span className="kz-content-block-status-pill">{isRtl ? 'مفتوح' : 'ACTIVE'}</span>
                  )}
                  <ChevronDown size={16} className={`kz-content-block-chevron ${openSections.specs ? 'open' : ''}`} />
                </div>
              </button>

              <div className={`kz-content-block-body ${openSections.specs ? 'open' : ''}`}>
              <div className="kz-content-block-inner">

              {/* Hero Stat Cards */}
              <div className="kz-spec-hero-grid">
                <div className="kz-spec-hero-card">
                  <div className="kz-spec-hero-value">45 Nm</div>
                  <div className="kz-spec-hero-label">{isRtl ? 'عزم الدوران' : 'Holding Torque'}</div>
                  <div className="kz-spec-hero-sub">{isRtl ? 'تروس كوكبية' : 'Planetary Gear'}</div>
                </div>
                <div className="kz-spec-hero-card">
                  <div className="kz-spec-hero-value">IP67</div>
                  <div className="kz-spec-hero-label">{isRtl ? 'درجة الحماية' : 'Sealing Grade'}</div>
                  <div className="kz-spec-hero-sub">{isRtl ? 'مقاوم للماء' : 'Dust & Water'}</div>
                </div>
                <div className="kz-spec-hero-card">
                  <div className="kz-spec-hero-value">1.8s</div>
                  <div className="kz-spec-hero-label">{isRtl ? 'دورة التشغيل' : 'Cycle Time'}</div>
                  <div className="kz-spec-hero-sub">{isRtl ? '90 درجة' : 'Full 90° Stroke'}</div>
                </div>
                <div className="kz-spec-hero-card">
                  <div className="kz-spec-hero-value">6061</div>
                  <div className="kz-spec-hero-label">{isRtl ? 'سبيكة الألمنيوم' : 'Alloy Grade'}</div>
                  <div className="kz-spec-hero-sub">{isRtl ? 'طيران T6' : 'Aircraft-Grade T6'}</div>
                </div>
                <div className="kz-spec-hero-card">
                  <div className="kz-spec-hero-value">433</div>
                  <div className="kz-spec-hero-label">{isRtl ? 'تردد RF' : 'RF Frequency'}</div>
                  <div className="kz-spec-hero-sub">MHz</div>
                </div>
                <div className="kz-spec-hero-card">
                  <div className="kz-spec-hero-value">12V</div>
                  <div className="kz-spec-hero-label">{isRtl ? 'الجهد' : 'Operating Voltage'}</div>
                  <div className="kz-spec-hero-sub">{isRtl ? 'حتى 14.4V' : 'Up to 14.4V DC'}</div>
                </div>
              </div>

              {/* Full Spec Detail Table */}
              <div className="kz-spec-detail-grid">
                {localizedSpecs.map((spec, idx) => (
                  <div key={idx} className="kz-spec-detail-row" style={{ '--row-idx': idx }}>
                    <div className="kz-spec-detail-label">{spec.label}</div>
                    <div className="kz-spec-detail-value">
                      <bdi dir={isRtl ? 'rtl' : 'ltr'} className="kz-bidi-value">{spec.value}</bdi>
                    </div>
                  </div>
                ))}
              </div>

              <div className="kz-spec-badge-footer">
                <span className="kz-spec-badge-pill"><Wrench size={12} /> {isRtl ? '5 محاور CNC' : '5-Axis CNC Machined'}</span>
                <span className="kz-spec-badge-pill"><Shield size={12} /> {isRtl ? 'مدقق الجودة' : 'Quality Audited'}</span>
                <span className="kz-spec-badge-pill"><Activity size={12} /> {isRtl ? 'دقة عالية' : 'Precision Engineered'}</span>
              </div>
              </div>{/* end kz-content-block-inner */}
              </div>{/* end kz-content-block-body */}
            </div>{/* end kz-content-block specs */}

            {/* ── SECTION 2: CHASSIS FITMENT ── */}
            <div
              ref={(el) => { sectionRefs.current.fitment = el; }}
              className={`kz-content-block kz-reveal kz-delay-2 ${openSections.fitment ? 'is-open' : ''}`}
            >
              <button type="button" className="kz-content-block-header" onClick={() => toggleSection('fitment')} aria-expanded={openSections.fitment}>
                <h2 className="kz-content-block-title">
                  <Car size={15} className="kz-content-block-icon" />
                  <span>{isRtl ? 'دليل التوافق' : 'Chassis Fitment Guide'}</span>
                </h2>
                <div className="kz-content-block-actions">
                  {openSections.fitment && (
                    <span className="kz-content-block-status-pill">{isRtl ? 'مفتوح' : 'ACTIVE'}</span>
                  )}
                  <ChevronDown size={16} className={`kz-content-block-chevron ${openSections.fitment ? 'open' : ''}`} />
                </div>
              </button>

              <div className={`kz-content-block-body ${openSections.fitment ? 'open' : ''}`}>
              <div className="kz-content-block-inner">
              <div className="kz-fitment-pane-header">
                <p className="kz-fitment-sub">
                  <CheckCircle2 size={15} color="var(--kz-racing-red)" style={{ flexShrink: 0 }} />
                  <span>{t.pdp.fitmentSubtitle}</span>
                </p>

                {/* Instant Vehicle Search Bar */}
                <div className="kz-fitment-search-bar" style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.04)', border: '1px solid var(--kz-border)', borderRadius: 'var(--kz-radius-pill)', padding: '6px 14px', marginBottom: '14px' }}>
                  <Search size={14} color="var(--kz-text-muted)" style={{ flexShrink: 0 }} />
                  <input
                    type="text"
                    value={fitmentSearch}
                    onChange={(e) => setFitmentSearch(e.target.value)}
                    placeholder={isRtl ? 'ابحث عن طراز سيارتك أو سنة الصنع (مثال: LC300, Y62, Raptor)...' : 'Search chassis model or year (e.g. LC300, Patrol, Raptor)...'}
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

                <div className="kz-fitment-pills">
                  {['all', 'Toyota', 'Nissan', 'Lexus', 'Ford', 'GMC'].map((make) => (
                    <button
                      key={make}
                      type="button"
                      className={`kz-filter-pill ${selectedMake === make ? 'active' : ''}`}
                      onClick={() => setSelectedMake(make)}
                    >
                      {make === 'all' ? t.pdp.fitmentAll : make}
                    </button>
                  ))}
                </div>
              </div>

              <div className="kz-fitment-grid">
                {filteredVehicles.map((veh, idx) => (
                  <div key={idx} className="kz-fitment-card">
                    <div className="kz-fitment-card-top">
                      <span className="kz-fitment-make-badge">{veh.make}</span>
                      <span className="kz-fitment-year-badge" dir="ltr">{veh.years}</span>
                    </div>
                    <div className="kz-fitment-model">{veh.model}</div>
                    <div className="kz-fitment-mount-badge">
                      <CheckCircle2 size={13} className="kz-fitment-mount-icon" />
                      <span className="kz-fitment-type">{veh.type}</span>
                    </div>
                  </div>
                ))}
              </div>
              </div>{/* end kz-content-block-inner */}
              </div>{/* end kz-content-block-body */}
            </div>{/* end kz-content-block fitment */}

            {/* ── SECTION 3: WHAT'S IN THE BOX ── */}
            <div
              ref={(el) => { sectionRefs.current.box = el; }}
              className={`kz-content-block kz-reveal kz-delay-3 ${openSections.box ? 'is-open' : ''}`}
            >
              <button type="button" className="kz-content-block-header" onClick={() => toggleSection('box')} aria-expanded={openSections.box}>
                <h2 className="kz-content-block-title">
                  <Package size={15} className="kz-content-block-icon" />
                  <span>{isRtl ? 'محتويات العلبة' : "What's In The Box"}</span>
                </h2>
                <div className="kz-content-block-actions">
                  {openSections.box && (
                    <span className="kz-content-block-status-pill">{isRtl ? 'مفتوح' : 'ACTIVE'}</span>
                  )}
                  <ChevronDown size={16} className={`kz-content-block-chevron ${openSections.box ? 'open' : ''}`} />
                </div>
              </button>
              <div className={`kz-content-block-body ${openSections.box ? 'open' : ''}`}>
                <div className="kz-content-block-inner">
                <div className="kz-box-items-grid">
                  {boxItems.map((item, idx) => (
                    <div key={idx} className="kz-box-item-card">
                      <div className="kz-box-icon-wrap">{item.icon}</div>
                      <div>
                        <div className="kz-box-item-title">{item.title}</div>
                        <div className="kz-box-item-desc">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>{/* end kz-box-items-grid */}
                </div>{/* end kz-content-block-inner */}
              </div>{/* end kz-content-block-body */}
            </div>{/* end kz-content-block box */}

            {/* ── SECTION 4: INSTALLATION GUIDE ── */}
            <div
              ref={(el) => { sectionRefs.current.install = el; }}
              className={`kz-content-block kz-reveal kz-delay-4 ${openSections.install ? 'is-open' : ''}`}
            >
              <button type="button" className="kz-content-block-header" onClick={() => toggleSection('install')} aria-expanded={openSections.install}>
                <h2 className="kz-content-block-title">
                  <Wrench size={15} className="kz-content-block-icon" />
                  <span>{isRtl ? 'دليل التركيب' : 'Installation Guide'}</span>
                </h2>
                <div className="kz-content-block-actions">
                  {openSections.install && (
                    <span className="kz-content-block-status-pill">{isRtl ? 'مفتوح' : 'ACTIVE'}</span>
                  )}
                  <ChevronDown size={16} className={`kz-content-block-chevron ${openSections.install ? 'open' : ''}`} />
                </div>
              </button>
              <div className={`kz-content-block-body ${openSections.install ? 'open' : ''}`}>
                <div className="kz-content-block-inner">
                <div className="kz-install-steps-list">
                  {installSteps.map((st, idx) => (
                    <div key={idx} className="kz-install-step-card">
                      <div className="kz-step-num-badge">{st.step}</div>
                      <div className="kz-step-info">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '6px' }}>
                          <h3 className="kz-step-title">{st.title}</h3>
                          <span className="kz-step-tag">{st.tag}</span>
                        </div>
                        <p className="kz-step-desc">{st.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                </div>{/* end kz-content-block-inner */}
              </div>{/* end kz-content-block-body */}
            </div>{/* end kz-content-block install */}

          </div>{/* end kz-pdp-sections */}
        </div>{/* end kz-pdp-info (Right Column) */}
      </div>{/* end kz-pdp-layout */}
    </div>{/* end kz-pdp-container */}

      {/* ─────────────────────────────────────────────────────────────────────────
          MOBILE STICKY QUICK BUY BAR
          ───────────────────────────────────────────────────────────────────────── */}
      <div className={`kz-mobile-sticky-buy-bar ${showStickyBar ? 'visible' : ''}`}>
        <div className="kz-sticky-bar-inner">
          {/* Product preview / click to scroll back up */}
          <div
            className="kz-sticky-product-meta"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            role="button"
            tabIndex={0}
            aria-label="Back to product view"
          >
            <div className="kz-sticky-thumb-wrap">
              <img
                src={currentProduct.thumbnail || currentProduct.images[0]}
                alt={currentProduct.name}
                className="kz-sticky-thumb"
              />
            </div>
            <div className="kz-sticky-title-col">
              <span className="kz-sticky-edition-tag">
                {finishLabel}
              </span>
              <div className="kz-sticky-price-row">
                <PriceTag amount={currentProduct.price} size="sm" />
              </div>
            </div>
          </div>

          {/* Action buttons with 44px touch targets */}
          <div className="kz-sticky-actions">
            <button
              type="button"
              className="kz-sticky-cart-btn"
              onClick={handleAddToCart}
              aria-label={t.pdp.addToCart}
              title={t.pdp.addToCart}
            >
              <ShoppingBag size={18} />
            </button>
            <button
              type="button"
              className="kz-sticky-buy-btn"
              onClick={handleInstantCheckout}
            >
              <Zap size={15} />
              <span>{t.pdp.instantCheckout}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Lightbox inspection modal */}
      {lightboxOpen && (
        <div className="kz-modal-backdrop" onClick={() => setLightboxOpen(false)}>
          <div
            className="kz-lightbox-content"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onTouchCancel={handleTouchCancel}
          >
            <button
              type="button"
              className="kz-control-pill kz-lightbox-close-btn"
              onClick={() => setLightboxOpen(false)}
            >
              <X size={16} /> {isRtl ? 'إغلاق المعاينة' : 'Close Preview'}
            </button>

            {/* Left Button in Lightbox */}
            <button
              type="button"
              className="kz-gallery-nav-btn kz-gallery-prev kz-lightbox-nav"
              onClick={handleLeftClick}
              aria-label={isRtl ? 'الصورة التالية' : 'Previous Image'}
            >
              <ChevronLeft size={24} />
            </button>

            <img
              key={`lightbox-${currentProduct.sku}-${activeImageIndex}`}
              src={currentProduct.images[activeImageIndex]}
              alt="Expanded view"
              className="kz-lightbox-img"
            />

            {/* Right Button in Lightbox */}
            <button
              type="button"
              className="kz-gallery-nav-btn kz-gallery-next kz-lightbox-nav"
              onClick={handleRightClick}
              aria-label={isRtl ? 'الصورة السابقة' : 'Next Image'}
            >
              <ChevronRight size={24} />
            </button>

            <div className="kz-lightbox-counter" dir="ltr">
              <span>{activeImageIndex + 1}</span> / <span>{totalImages}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
