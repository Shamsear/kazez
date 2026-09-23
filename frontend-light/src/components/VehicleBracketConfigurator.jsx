import React, { useState, useMemo } from 'react';
import { 
  Car, 
  Check, 
  ShieldCheck, 
  Scale, 
  Ruler, 
  Layers, 
  Compass, 
  Wind, 
  Clock, 
  Plus, 
  CheckCircle2, 
  Info,
  ChevronDown
} from 'lucide-react';
import { BRACKETS, VEHICLE_MAKES } from '../data/brackets';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { PriceTag } from './PriceTag';

export const VehicleBracketConfigurator = ({ 
  selectedBracket, 
  onSelectBracket, 
  includeBracket = false, 
  onToggleIncludeBracket,
  compact = false 
}) => {
  const { t, isRtl } = useLanguage();
  const { currency } = useCart();

  const [selectedMake, setSelectedMake] = useState('Toyota');

  // Filter brackets by selected make
  const availableBrackets = useMemo(() => {
    if (!selectedMake || selectedMake === 'All Makes') return BRACKETS;
    return BRACKETS.filter((b) => b.make === selectedMake || b.make === 'Universal');
  }, [selectedMake]);

  const currentBracket = selectedBracket || availableBrackets[0] || BRACKETS[0];

  const handleMakeChange = (make) => {
    setSelectedMake(make);
    const firstMatch = BRACKETS.find((b) => b.make === make) || BRACKETS[0];
    if (onSelectBracket) {
      onSelectBracket(firstMatch);
    }
  };

  const handleModelSelect = (bracket) => {
    if (onSelectBracket) {
      onSelectBracket(bracket);
    }
  };

  return (
    <div className={`kz-bracket-configurator ${compact ? 'compact' : ''}`}>
      {/* Header */}
      <div className="kz-bracket-config-head">
        <div className="kz-bracket-config-title-wrap">
          <div className="kz-badge-accent">
            <Car size={13} />
            <span>{isRtl ? 'مطابقة الهيكل والمركبة' : 'Chassis & Fitment Matcher'}</span>
          </div>
          <h4 className="kz-bracket-config-heading">
            {isRtl ? 'اختر سيارتك لاستعراض قاعدة التثبيت الدقيقة' : 'Select Vehicle & Inspect Mount Specs'}
          </h4>
        </div>
        <div className="kz-bracket-oem-badge">
          <ShieldCheck size={14} color="#10B981" />
          <span>{isRtl ? '100% بدون ثقب للهيكل' : '100% Zero-Drill OEM Fit'}</span>
        </div>
      </div>

      {/* Step 1: Vehicle Make Pills */}
      <div className="kz-bracket-step">
        <label className="kz-bracket-step-label">
          <span>{isRtl ? '1. اختر صانع المركبة:' : '1. Select Vehicle Make:'}</span>
        </label>
        <div className="kz-make-pills-row">
          {VEHICLE_MAKES.filter(m => m !== 'All Makes').map((make) => {
            const isSelected = selectedMake === make;
            return (
              <button
                key={make}
                type="button"
                className={`kz-make-pill ${isSelected ? 'active' : ''}`}
                onClick={() => handleMakeChange(make)}
              >
                <span>{make}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: Model Selector Grid */}
      <div className="kz-bracket-step">
        <label className="kz-bracket-step-label">
          <span>{isRtl ? '2. اختر الموديل وفئة الهيكل:' : '2. Select Model & Body Code:'}</span>
        </label>
        <div className="kz-model-cards-grid">
          {availableBrackets.map((bracket) => {
            const isSelected = currentBracket.id === bracket.id;
            return (
              <button
                key={bracket.id}
                type="button"
                className={`kz-model-card ${isSelected ? 'active' : ''}`}
                onClick={() => handleModelSelect(bracket)}
              >
                <div className="kz-model-card-header">
                  <span className="kz-model-card-name">
                    {isRtl && bracket.arabicName ? bracket.model : bracket.model}
                  </span>
                  <span className="kz-model-card-check">
                    {isSelected ? <CheckCircle2 size={15} color="var(--kz-crimson)" /> : <span className="kz-check-dot" />}
                  </span>
                </div>
                <div className="kz-model-card-body">
                  <span className="kz-model-card-years">{bracket.years}</span>
                  <span className="kz-model-card-mount">
                    {isRtl && bracket.arabicMountType ? bracket.arabicMountType : bracket.mountType}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 3: Verified Technical Spec Display Card */}
      {currentBracket && (
        <div className="kz-paired-bracket-display">
          <div className="kz-paired-bracket-top">
            <div className="kz-paired-bracket-photo-wrap">
              <img 
                src={currentBracket.image} 
                alt={currentBracket.name} 
                className="kz-paired-bracket-img" 
              />
              <div className="kz-paired-bracket-sku-tag">{currentBracket.sku}</div>
            </div>

            <div className="kz-paired-bracket-info">
              <div className="kz-paired-bracket-status">
                <span className="kz-stock-dot" />
                <span className="kz-stock-text">{isRtl ? 'متوفر للتسليم الفوري' : 'In Stock · Fast Dispatch'}</span>
              </div>
              <h5 className="kz-paired-bracket-name">
                {isRtl && currentBracket.arabicName ? currentBracket.arabicName : currentBracket.name}
              </h5>
              <p className="kz-paired-bracket-notes">
                {isRtl && currentBracket.arabicNotes ? currentBracket.arabicNotes : currentBracket.notes}
              </p>
              <div className="kz-paired-bracket-price-row">
                <div className="kz-bracket-price-label">{isRtl ? 'سعر القاعدة:' : 'Bracket Price:'}</div>
                <div className="kz-bracket-price-val">
                  <PriceTag amountInQar={currentBracket.price} />
                </div>
              </div>
            </div>
          </div>

          {/* Technical Dimensions & Physical Specs Grid */}
          <div className="kz-bracket-specs-grid">
            {/* Weight */}
            <div className="kz-bracket-spec-item">
              <div className="kz-bracket-spec-icon">
                <Scale size={15} />
              </div>
              <div className="kz-bracket-spec-text">
                <span className="kz-bracket-spec-key">{isRtl ? 'الوزن الدقيق' : 'Net Weight'}</span>
                <span className="kz-bracket-spec-val">{currentBracket.weight}</span>
              </div>
            </div>

            {/* Height & Width */}
            <div className="kz-bracket-spec-item">
              <div className="kz-bracket-spec-icon">
                <Ruler size={15} />
              </div>
              <div className="kz-bracket-spec-text">
                <span className="kz-bracket-spec-key">{isRtl ? 'الارتفاع × العرض' : 'Height × Width'}</span>
                <span className="kz-bracket-spec-val">{currentBracket.height} × {currentBracket.width}</span>
              </div>
            </div>

            {/* Plate Thickness */}
            <div className="kz-bracket-spec-item">
              <div className="kz-bracket-spec-icon">
                <Layers size={15} />
              </div>
              <div className="kz-bracket-spec-text">
                <span className="kz-bracket-spec-key">{isRtl ? 'سُمك الصفيحة' : 'Plate Thickness'}</span>
                <span className="kz-bracket-spec-val">{currentBracket.thickness} (CNC Gusseted)</span>
              </div>
            </div>

            {/* Material */}
            <div className="kz-bracket-spec-item">
              <div className="kz-bracket-spec-icon">
                <ShieldCheck size={15} />
              </div>
              <div className="kz-bracket-spec-text">
                <span className="kz-bracket-spec-key">{isRtl ? 'مادة التصنيع' : 'Material'}</span>
                <span className="kz-bracket-spec-val">{currentBracket.material}</span>
              </div>
            </div>

            {/* Mount Location & Clamp Range */}
            <div className="kz-bracket-spec-item">
              <div className="kz-bracket-spec-icon">
                <Compass size={15} />
              </div>
              <div className="kz-bracket-spec-text">
                <span className="kz-bracket-spec-key">{isRtl ? 'نطاق التثبيت' : 'Clamp Range'}</span>
                <span className="kz-bracket-spec-val">{currentBracket.clampRange}</span>
              </div>
            </div>

            {/* Load & Wind Rating */}
            <div className="kz-bracket-spec-item">
              <div className="kz-bracket-spec-icon">
                <Wind size={15} />
              </div>
              <div className="kz-bracket-spec-text">
                <span className="kz-bracket-spec-key">{isRtl ? 'تحمل الرياح والراليات' : 'Wind / Load Rating'}</span>
                <span className="kz-bracket-spec-val">{currentBracket.loadRating}</span>
              </div>
            </div>
          </div>

          {/* Smart Bundle Option Toggle */}
          {onToggleIncludeBracket && (
            <div 
              className={`kz-bracket-bundle-toggle ${includeBracket ? 'selected' : ''}`}
              onClick={onToggleIncludeBracket}
            >
              <div className="kz-bundle-checkbox-wrap">
                <div className={`kz-custom-checkbox ${includeBracket ? 'checked' : ''}`}>
                  {includeBracket && <Check size={14} color="#FFFFFF" strokeWidth={3} />}
                </div>
              </div>
              <div className="kz-bundle-toggle-text">
                <div className="kz-bundle-toggle-title">
                  {includeBracket 
                    ? (isRtl ? 'تم تضمين هذه القاعدة في حزمة طلبك' : 'Compatible Bracket Bundled with Order')
                    : (isRtl ? 'إضافة قاعدة التثبيت المتوافقة مع المحرك' : 'Bundle This Compatible Bracket with Antenna Motor')
                  }
                </div>
                <div className="kz-bundle-toggle-sub">
                  {isRtl 
                    ? `إضافة (+${currentBracket.price} ر.ق) لتشمل الحزمة المحرك والقاعدة والمسامير كاملة` 
                    : `Add (+${currentBracket.price} QAR) to receive the complete plug-and-play kit.`}
                </div>
              </div>
              <div className="kz-bundle-price-badge">
                +<PriceTag amountInQar={currentBracket.price} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
