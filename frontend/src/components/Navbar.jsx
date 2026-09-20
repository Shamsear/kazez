import React, { useState, useRef, useEffect } from 'react';
import { ShoppingBag, Menu, X, Globe, ChevronDown, Check, Languages, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export const Navbar = ({ activeView, setActiveView }) => {
  const { cartCount, openCart, currency, setCurrency, CURRENCY_RATES } = useCart();
  const { language, toggleLanguage, t, isRtl } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const currencyRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (currencyRef.current && !currencyRef.current.contains(e.target)) {
        setCurrencyOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setCurrencyOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleNav = (view) => {
    setActiveView(view);
    setMobileOpen(false);
    setCurrencyOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCurrencySelect = (code) => {
    setCurrency(code);
    setCurrencyOpen(false);
  };

  const arrow = isRtl ? '←' : '→';

  return (
    <header className="kz-header">
      <div className="kz-container kz-header-inner">
        {/* Brand */}
        <div className="kz-brand" onClick={() => handleNav('home')}>
          <div className="kz-brand-text">
            KAZEZ<span className="kz-brand-dot">.</span>
          </div>
        </div>

        {/* Desktop Links */}
        <nav className="kz-nav-desktop" aria-label="Main Navigation">
          <button type="button" className={`kz-nav-link ${activeView === 'home' ? 'active' : ''}`} onClick={() => handleNav('home')}>
            {t.nav.storefront}
          </button>
          <button type="button" className={`kz-nav-link ${activeView === 'kazez-black' ? 'active' : ''}`} onClick={() => handleNav('kazez-black')}>
            {t.nav.blackEdition}
          </button>
          <button type="button" className={`kz-nav-link ${activeView === 'kazez-silver' ? 'active' : ''}`} onClick={() => handleNav('kazez-silver')}>
            {t.nav.silverEdition}
          </button>
          <button type="button" className={`kz-nav-link ${activeView === 'engineering' ? 'active' : ''}`} onClick={() => handleNav('engineering')}>
            {t.nav.engineeringLab}
          </button>
          <button type="button" className={`kz-nav-link ${activeView === 'contact' ? 'active' : ''}`} onClick={() => handleNav('contact')}>
            {t.nav.showroom}
          </button>
        </nav>

        {/* Actions (Language + Currency + Profile + Cart + Mobile Menu) */}
        <div className="kz-header-actions">
          {/* Tactile Language Toggle Switcher */}
          <button
            type="button"
            className="kz-lang-btn"
            onClick={toggleLanguage}
            title={language === 'en' ? 'التحويل إلى اللغة العربية' : 'Switch to English'}
            aria-label={`Current language is ${language === 'en' ? 'English' : 'Arabic'}. Click to switch.`}
          >
            <Languages size={13} style={{ color: 'var(--kz-racing-red)' }} />
            <span className="kz-lang-badge">
              {language === 'en' ? 'عربي' : 'EN'}
            </span>
          </button>

          {/* Custom Luxury Currency Selector Dropdown (Desktop & Tablet) */}
          <div className="kz-currency-dropdown-wrap kz-desktop-only" ref={currencyRef}>
            <button
              type="button"
              className={`kz-currency-pill ${currencyOpen ? 'open' : ''}`}
              onClick={() => setCurrencyOpen(!currencyOpen)}
              aria-expanded={currencyOpen}
              aria-haspopup="listbox"
              aria-label={`Select Currency. Active currency is ${currency}`}
            >
              <Globe size={13} className="kz-currency-icon" />
              <span className="kz-currency-current">{currency}</span>
              <ChevronDown size={11} className={`kz-currency-arrow ${currencyOpen ? 'rotated' : ''}`} />
            </button>

            {currencyOpen && (
              <div className="kz-currency-menu" role="listbox" aria-label="Currency options">
                {Object.entries(CURRENCY_RATES).map(([code, info]) => {
                  const isSelected = currency === code;
                  return (
                    <button
                      key={code}
                      type="button"
                      className={`kz-currency-option ${isSelected ? 'selected' : ''}`}
                      role="option"
                      aria-selected={isSelected}
                      onClick={() => handleCurrencySelect(code)}
                    >
                      <div className="kz-currency-opt-left">
                        <span className="kz-currency-opt-code">{code}</span>
                        <span className="kz-currency-opt-name">{info.name}</span>
                      </div>
                      {isSelected && <Check size={13} className="kz-currency-opt-check" />}
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Profile link button (Desktop & Tablet) */}
          <button
            type="button"
            className={`kz-cart-trigger kz-header-profile-btn kz-desktop-only ${activeView === 'profile' ? 'active' : ''}`}
            onClick={() => handleNav('profile')}
            aria-label="View Customer Profile & Garage"
            title={t.nav.profile || 'Profile'}
            style={{
              borderColor: activeView === 'profile' ? 'var(--kz-racing-red)' : 'var(--kz-border)',
              color: activeView === 'profile' ? 'var(--kz-racing-red)' : '#ffffff'
            }}
          >
            <User size={18} />
          </button>

          {/* Cart trigger button */}
          <button
            type="button"
            className="kz-cart-trigger"
            onClick={openCart}
            aria-label={`View Cart, ${cartCount} items`}
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && <span className="kz-cart-badge">{cartCount}</span>}
          </button>

          {/* Dedicated Mobile Menu Hamburger Toggle */}
          <button
            type="button"
            className={`kz-mobile-menu-btn ${mobileOpen ? 'open' : ''}`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Luxury Cockpit Experience) */}
      <div className={`kz-mobile-drawer ${mobileOpen ? 'open' : ''}`}>
        {/* Customer Profile & Garage Quick-Access Card */}
        <div 
          className="kz-mobile-drawer-card"
          onClick={() => handleNav('profile')}
          style={{ cursor: 'pointer' }}
        >
          <div className="kz-drawer-card-left">
            <div className="kz-drawer-user-avatar">
              <User size={18} />
            </div>
            <div>
              <div className="kz-drawer-user-title">{t.nav.profile || (isRtl ? 'حسابي ومركباتي' : 'Customer Profile')}</div>
              <div className="kz-drawer-user-sub">{isRtl ? 'كراج نخب الدوحة والضمان ←' : 'Qatar VIP Garage & Warranties →'}</div>
            </div>
          </div>
        </div>

        {/* Currency Selector Strip inside Mobile Drawer */}
        <div className="kz-drawer-curr-wrap">
          <div className="kz-drawer-section-lbl">
            <Globe size={12} />
            <span>{isRtl ? `تحديد العملة المعتمدة (${currency})` : `Select Currency (${currency})`}</span>
          </div>
          <div className="kz-drawer-curr-grid">
            {Object.keys(CURRENCY_RATES).map((code) => (
              <button
                key={code}
                type="button"
                className={`kz-drawer-curr-btn ${currency === code ? 'active' : ''}`}
                onClick={() => handleCurrencySelect(code)}
              >
                {code}
              </button>
            ))}
          </div>
        </div>

        {/* Main Navigation Route Links */}
        <div className="kz-drawer-nav-list">
          <button type="button" className={`kz-mobile-nav-link ${activeView === 'home' ? 'active' : ''}`} onClick={() => handleNav('home')}>
            <span>{t.nav.storefront}</span>
            <span className="kz-nav-arrow">{arrow}</span>
          </button>
          <button type="button" className={`kz-mobile-nav-link ${activeView === 'kazez-black' ? 'active' : ''}`} onClick={() => handleNav('kazez-black')}>
            <span>{t.nav.blackEdition}</span>
            <span className="kz-nav-arrow">{arrow}</span>
          </button>
          <button type="button" className={`kz-mobile-nav-link ${activeView === 'kazez-silver' ? 'active' : ''}`} onClick={() => handleNav('kazez-silver')}>
            <span>{t.nav.silverEdition}</span>
            <span className="kz-nav-arrow">{arrow}</span>
          </button>
          <button type="button" className={`kz-mobile-nav-link ${activeView === 'engineering' ? 'active' : ''}`} onClick={() => handleNav('engineering')}>
            <span>{t.nav.engineeringLab}</span>
            <span className="kz-nav-arrow">{arrow}</span>
          </button>
          <button type="button" className={`kz-mobile-nav-link ${activeView === 'contact' ? 'active' : ''}`} onClick={() => handleNav('contact')}>
            <span>{t.nav.showroom}</span>
            <span className="kz-nav-arrow">{arrow}</span>
          </button>
        </div>

        {/* Mobile Language Toggle */}
        <div className="kz-drawer-lang-wrap" style={{ marginTop: '12px' }}>
          <button
            type="button"
            className="kz-btn kz-btn-secondary"
            style={{ width: '100%', justifyContent: 'center', minHeight: '46px', fontSize: '0.85rem' }}
            onClick={() => { toggleLanguage(); setMobileOpen(false); }}
          >
            <Languages size={16} />
            <span>{language === 'en' ? 'التحويل إلى العربية (عربي)' : 'Switch to English (EN)'}</span>
          </button>
        </div>

        {/* Cart Quick-Access Footer */}
        <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--kz-border)' }}>
          <button 
            type="button" 
            className="kz-btn kz-btn-primary" 
            style={{ width: '100%', minHeight: '48px', justifyContent: 'center', fontSize: '0.92rem' }} 
            onClick={() => { setMobileOpen(false); openCart(); }}
          >
            <ShoppingBag size={18} />
            <span>{t.nav.cart} ({cartCount})</span>
          </button>
        </div>
      </div>
    </header>
  );
};
