import React, { useState, useMemo } from 'react';
import { 
  Car, 
  Search, 
  Filter, 
  Scale, 
  Ruler, 
  Layers, 
  ShieldCheck, 
  Wind, 
  Compass, 
  ShoppingBag, 
  Check, 
  Sparkles,
  ArrowRight,
  Maximize2,
  X
} from 'lucide-react';
import { BRACKETS, VEHICLE_MAKES } from '../data/brackets';
import AnimatedTabs from '@/components/forgeui/animated-tabs';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { PriceTag } from './PriceTag';

export const BracketExplorer = ({ onSelectBracketForCart }) => {
  const { t, isRtl } = useLanguage();
  const { addToCart } = useCart();
  const [selectedMake, setSelectedMake] = useState('All Makes');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalBracket, setActiveModalBracket] = useState(null);
  const [addedBracketId, setAddedBracketId] = useState(null);

  const makeCounts = useMemo(() => {
    const counts = { 'All Makes': BRACKETS.length };
    VEHICLE_MAKES.forEach((m) => {
      if (m !== 'All Makes') {
        counts[m] = BRACKETS.filter((b) => b.make === m).length;
      }
    });
    return counts;
  }, []);

  const getMakeLabel = (make) => {
    if (!isRtl) return make;
    const arabicMakes = {
      'All Makes': 'الكل',
      'Toyota': 'تويوتا',
      'Nissan': 'نيسان',
      'Lexus': 'لكزس',
      'GWM': 'GWM',
      'Jetour': 'جيتور',
      'BYD': 'BYD',
      'Universal': 'شامل'
    };
    return arabicMakes[make] || make;
  };

  const bracketTabs = useMemo(() => {
    return VEHICLE_MAKES.map((make) => ({
      id: make,
      label: getMakeLabel(make),
      count: makeCounts[make] || 0
    }));
  }, [makeCounts, isRtl]);

  const filteredBrackets = useMemo(() => {
    return BRACKETS.filter((b) => {
      const matchesMake = selectedMake === 'All Makes' || b.make === selectedMake;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = !q || 
        b.name.toLowerCase().includes(q) || 
        b.model.toLowerCase().includes(q) || 
        b.make.toLowerCase().includes(q) || 
        b.sku.toLowerCase().includes(q) || 
        (b.arabicName && b.arabicName.includes(q)) || 
        (b.mountType && b.mountType.toLowerCase().includes(q));
      return matchesMake && matchesQuery;
    });
  }, [selectedMake, searchQuery]);

  const handleAddBracket = (bracket) => {
    // Treat bracket as an add-to-cart item with its own SKU and price
    const bracketItem = {
      id: bracket.id,
      sku: bracket.sku,
      name: isRtl && bracket.arabicName ? bracket.arabicName : bracket.name,
      edition: bracket.model,
      specs: `${bracket.weight} · ${bracket.thickness} · ${bracket.mountType}`,
      price: bracket.price,
      image: bracket.image,
      thumbnail: bracket.image
    };

    addToCart(bracketItem, 1);
    setAddedBracketId(bracket.id);
    setTimeout(() => setAddedBracketId(null), 2000);
  };

  return (
    <section className="kz-section kz-bracket-explorer-section" id="kz-brackets">
      <div className="kz-container">
        {/* Section Header */}
        <div className="kz-section-head kz-bracket-header kz-reveal">
          <div className="kz-bracket-eyebrow">
            <span className="kz-bracket-eyebrow-icon-box">
              <Car size={13} strokeWidth={2} />
            </span>
            <span className="kz-bracket-eyebrow-text">
              {isRtl ? 'هندسة قواعد سيارات الدفع الرباعي' : 'GCC 4x4 Mount Engineering'}
            </span>
            <span className="kz-bracket-eyebrow-divider" />
            <span className="kz-bracket-eyebrow-sub">
              {isRtl ? '١٤ قاعدة أصلية معتمدة' : '14 Factory Fits'}
            </span>
          </div>

          <h2 className="kz-section-title kz-bracket-title">
            {isRtl ? 'قواعد التثبيت المخصصة لكل سيارة' : 'Precision Vehicle Mount Brackets'}
          </h2>

          <p className="kz-section-sub kz-bracket-subtitle">
            {isRtl 
              ? 'تشكيلة هندسية متكاملة من 14 قاعدة مصممة بأبعاد المصنع الدقيقة لجميع سيارات الدفع الرباعي دون أي ثقب للهيكل.'
              : 'Engineered for 100% factory bolt-on fitment. Laser-cut high-tensile alloy with zero drilling required.'}
          </p>
        </div>

        {/* Filter & Search Bar Deck */}
        <div className="kz-bracket-filter-bar kz-bracket-controls-deck kz-reveal kz-delay-1">
          {/* Make Filter Segmented Capsule with AnimatedTabs */}
          <div className="kz-bracket-pills-wrap kz-bracket-tabs-track-wrap">
            <AnimatedTabs
              tabs={bracketTabs}
              activeTab={selectedMake}
              onChange={(tab, idx, id) => setSelectedMake(id || tab.id || tab)}
              variant="bracket"
              layoutIdPrefix="kz-bracket-tabs-pill"
              className="kz-bracket-tabs-track"
              tabClassName="kz-bracket-tab-btn"
              renderTab={(tab, isActive) => (
                <>
                  <span className="kz-tab-label">{tab.label}</span>
                  <span className={`kz-pill-count kz-tab-count ${isActive ? 'active' : ''}`}>
                    {tab.count}
                  </span>
                </>
              )}
            />
          </div>

          {/* Search Box */}
          <div className="kz-bracket-search-container">
            <div className="kz-bracket-search-box">
              <Search size={14} className="kz-search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isRtl ? 'ابحث بالموديل أو القاعدة (LC300, Patrol, LX600)...' : 'Search model (LC300, Patrol, LX600)...'}
                aria-label="Search bracket models"
              />
              {searchQuery && (
                <button 
                  type="button" 
                  className="kz-search-clear-btn" 
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                >
                  <X size={11} strokeWidth={2.5} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Live Filter Telemetry Status Bar */}
        <div className="kz-bracket-status-bar kz-reveal kz-delay-1">
          <div className="kz-bracket-status-info">
            <span className="kz-status-dot" />
            <span className="kz-status-text">
              {isRtl ? (
                <>عرض <strong>{filteredBrackets.length}</strong> قاعدة تثبيت {selectedMake !== 'All Makes' ? `لمركبات ${getMakeLabel(selectedMake)}` : 'لكافة طرازات الدفع الرباعي'} · تطابق مصنعي 100%</>
              ) : (
                <>Showing <strong>{filteredBrackets.length}</strong> {filteredBrackets.length === 1 ? 'mount bracket' : 'precision brackets'} {selectedMake !== 'All Makes' ? `for ${selectedMake}` : 'across all platforms'} · 100% OEM Bolt-On</>
              )}
            </span>
          </div>

          {(selectedMake !== 'All Makes' || searchQuery) && (
            <button
              type="button"
              className="kz-bracket-reset-inline-btn"
              onClick={() => { setSelectedMake('All Makes'); setSearchQuery(''); }}
            >
              <span>{isRtl ? 'إعادة ضبط الفلاتر' : 'Reset Filters'}</span>
              <X size={12} strokeWidth={2} />
            </button>
          )}
        </div>

        {/* Brackets Grid */}
        <div className="kz-brackets-grid kz-reveal kz-delay-2">
          {filteredBrackets.map((bracket) => {
            const isJustAdded = addedBracketId === bracket.id;
            return (
              <div key={bracket.id} className="kz-bracket-card">
                <div className="kz-bracket-card-top">
                  <div className="kz-bracket-card-image-wrap" onClick={() => setActiveModalBracket(bracket)}>
                    <img src={bracket.image} alt={bracket.name} className="kz-bracket-card-img" />
                    <button 
                      type="button" 
                      className="kz-bracket-inspect-btn" 
                      title="Inspect Full Blueprint"
                    >
                      <Maximize2 size={13} />
                    </button>
                    <span className="kz-bracket-make-badge">{bracket.make}</span>
                  </div>

                  <div className="kz-bracket-card-content">
                    <div className="kz-bracket-card-meta-row">
                      <span className="kz-bracket-years">{bracket.years}</span>
                      <span className="kz-bracket-sku">{bracket.sku}</span>
                    </div>

                    <h3 className="kz-bracket-card-title">
                      {isRtl && bracket.arabicName ? bracket.arabicName : bracket.name}
                    </h3>

                    {/* Spec Telemetry Badges: Weight, Height, Thickness */}
                    <div className="kz-bracket-card-specs">
                      <div className="kz-bracket-chip" title="Weight">
                        <Scale size={13} />
                        <span>{bracket.weight}</span>
                      </div>
                      <div className="kz-bracket-chip" title="Height">
                        <Ruler size={13} />
                        <span>{bracket.height}</span>
                      </div>
                      <div className="kz-bracket-chip" title="Plate Thickness">
                        <Layers size={13} />
                        <span>{bracket.thickness}</span>
                      </div>
                      <div className="kz-bracket-chip" title="Mount Point">
                        <Compass size={13} />
                        <span>{isRtl && bracket.arabicMountType ? bracket.arabicMountType : bracket.mountType}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="kz-bracket-card-bottom">
                  <div className="kz-bracket-card-price">
                    <PriceTag amountInQar={bracket.price} />
                  </div>

                  <div className="kz-bracket-card-actions">
                    <button
                      type="button"
                      className="kz-btn kz-btn-secondary kz-btn-sm"
                      onClick={() => setActiveModalBracket(bracket)}
                    >
                      <span>{isRtl ? 'المواصفات' : 'Details'}</span>
                    </button>

                    <button
                      type="button"
                      className={`kz-btn kz-btn-primary kz-btn-sm ${isJustAdded ? 'kz-btn-added' : ''}`}
                      onClick={() => handleAddBracket(bracket)}
                    >
                      {isJustAdded ? (
                        <>
                          <Check size={14} />
                          <span>{isRtl ? 'تمت الإضافة' : 'Added'}</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag size={14} />
                          <span>{isRtl ? 'أضف للسلة' : 'Add'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredBrackets.length === 0 && (
          <div className="kz-bracket-empty-state">
            <Car size={36} color="var(--kz-text-muted)" />
            <h4>{isRtl ? 'لم يتم العثور على قاعدة مطابقة' : 'No Matching Bracket Found'}</h4>
            <p>{isRtl ? 'جرب البحث باسم صانع مختلف أو اختر القاعدة الشاملة لكافة الصدامات.' : 'Try selecting another make or explore the Universal Heavy-Duty Clamp.'}</p>
            <button 
              type="button" 
              className="kz-btn kz-btn-secondary"
              onClick={() => { setSelectedMake('All Makes'); setSearchQuery(''); }}
            >
              {isRtl ? 'إعادة ضبط البحث' : 'Reset Filters'}
            </button>
          </div>
        )}
      </div>

      {/* Detailed Blueprint Modal */}
      {activeModalBracket && (
        <div 
          className="kz-modal-backdrop"
          onClick={() => setActiveModalBracket(null)}
        >
          <div 
            className="kz-bracket-blueprint-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="kz-blueprint-modal-header">
              <div className="kz-blueprint-modal-title-wrap">
                <span className="kz-blueprint-tag">{activeModalBracket.sku}</span>
                <h3>{isRtl && activeModalBracket.arabicName ? activeModalBracket.arabicName : activeModalBracket.name}</h3>
              </div>
              <button 
                type="button" 
                className="kz-blueprint-close-btn"
                onClick={() => setActiveModalBracket(null)}
              >
                <X size={18} />
              </button>
            </div>

            <div className="kz-blueprint-modal-body">
              <div className="kz-blueprint-img-wrap">
                <img src={activeModalBracket.image} alt={activeModalBracket.name} />
              </div>

              <div className="kz-blueprint-details">
                <div className="kz-blueprint-specs-table">
                  <div className="kz-blueprint-spec-row">
                    <span className="kz-bp-key">{isRtl ? 'الوزن الصافي' : 'Net Weight'}</span>
                    <span className="kz-bp-val">{activeModalBracket.weight}</span>
                  </div>
                  <div className="kz-blueprint-spec-row">
                    <span className="kz-bp-key">{isRtl ? 'الارتفاع الكامل' : 'Full Height'}</span>
                    <span className="kz-bp-val">{activeModalBracket.height}</span>
                  </div>
                  <div className="kz-blueprint-spec-row">
                    <span className="kz-bp-key">{isRtl ? 'عرض القاعدة' : 'Bracket Width'}</span>
                    <span className="kz-bp-val">{activeModalBracket.width}</span>
                  </div>
                  <div className="kz-blueprint-spec-row">
                    <span className="kz-bp-key">{isRtl ? 'سُمك الصفيحة' : 'Plate Thickness'}</span>
                    <span className="kz-bp-val">{activeModalBracket.thickness}</span>
                  </div>
                  <div className="kz-blueprint-spec-row">
                    <span className="kz-bp-key">{isRtl ? 'مادة التصنيع' : 'Material Alloy'}</span>
                    <span className="kz-bp-val">{activeModalBracket.material}</span>
                  </div>
                  <div className="kz-blueprint-spec-row">
                    <span className="kz-bp-key">{isRtl ? 'نوع ونقطة التثبيت' : 'Mount Location'}</span>
                    <span className="kz-bp-val">{isRtl && activeModalBracket.arabicMountType ? activeModalBracket.arabicMountType : activeModalBracket.mountType}</span>
                  </div>
                  <div className="kz-blueprint-spec-row">
                    <span className="kz-bp-key">{isRtl ? 'نطاق كلبس السكة' : 'Rail Grip Range'}</span>
                    <span className="kz-bp-val">{activeModalBracket.clampRange}</span>
                  </div>
                  <div className="kz-blueprint-spec-row">
                    <span className="kz-bp-key">{isRtl ? 'تحمل الرياح والسرعة' : 'Dynamic Load Rating'}</span>
                    <span className="kz-bp-val">{activeModalBracket.loadRating}</span>
                  </div>
                  <div className="kz-blueprint-spec-row">
                    <span className="kz-bp-key">{isRtl ? 'زمن التركيب' : 'Installation Time'}</span>
                    <span className="kz-bp-val">{activeModalBracket.installTime}</span>
                  </div>
                </div>

                <div className="kz-blueprint-notes-box">
                  <p>{isRtl && activeModalBracket.arabicNotes ? activeModalBracket.arabicNotes : activeModalBracket.notes}</p>
                </div>

                <div className="kz-blueprint-footer-row">
                  <div className="kz-blueprint-price">
                    <PriceTag amountInQar={activeModalBracket.price} />
                  </div>
                  <button
                    type="button"
                    className="kz-btn kz-btn-primary kz-btn-lg"
                    onClick={() => {
                      handleAddBracket(activeModalBracket);
                      setActiveModalBracket(null);
                    }}
                  >
                    <ShoppingBag size={16} />
                    <span>{isRtl ? 'إضافة إلى سلة المشتريات' : 'Add Bracket to Bag'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
