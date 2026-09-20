import React, { useState, useEffect, useRef } from 'react';
import { ShoppingBag, ChevronDown, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

const CURRENCY_FLAGS = {
  QAR: '🇶🇦',
  SAR: '🇸🇦',
  AED: '🇦🇪',
  KWD: '🇰🇼',
  BHD: '🇧🇭',
  OMR: '🇴🇲',
  USD: '🇺🇸',
  EUR: '🇪🇺',
  GBP: '🇬🇧'
};

export const MinimalNavbar = ({ activeView, setActiveView }) => {
  const { cartCount, openCart, currency, setCurrency, CURRENCY_RATES } = useCart();
  const { language, toggleLanguage, t, isRtl } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);
  const currencyRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      setIsScrolled(scrollY > 24);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close currency dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (currencyRef.current && !currencyRef.current.contains(e.target)) {
        setCurrencyOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'home', label: t.nav.storefront || (isRtl ? 'الرئيسية' : 'Storefront') },
    { id: 'kazez-black', label: t.nav.blackEdition || (isRtl ? 'الإصدار الأسود' : 'Black Edition') },
    { id: 'kazez-silver', label: t.nav.silverEdition || (isRtl ? 'الإصدار الفضي' : 'Silver Edition') },
    { id: 'engineering', label: t.nav.engineeringLab || (isRtl ? 'المختبر الهندسي' : 'Engineering Lab') },
    { id: 'contact', label: t.nav.showroom || (isRtl ? 'صالة العرض' : 'Showroom') }
  ];

  const handleNavClick = (viewId) => {
    setActiveView(viewId);
  };

  return (
    <header className={`kz-nav-wrap ${isScrolled ? 'kz-nav-scrolled' : ''}`}>
      <nav className={`kz-nav-pill ${isScrolled ? 'kz-nav-pill-shrunk' : ''}`}>
        {/* Brand Link */}
        <button
          type="button"
          className="kz-brand-link"
          onClick={() => handleNavClick('home')}
          aria-label="Kazez Home"
        >
          <div style={{ display: 'flex', alignItems: 'baseline' }}>
            <span className="kz-brand-wordmark">KAZEZ</span>
            <span className="kz-brand-submark">ARCHITECTURAL</span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <div className="kz-nav-links">
          {navItems.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`kz-nav-item-btn ${activeView === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Right Actions: Currency, Language & Cart */}
        <div className="kz-nav-actions">
          {/* Compact Country/Currency Dropdown Selector */}
          <div className="kz-currency-dropdown-wrap" ref={currencyRef}>
            <button
              type="button"
              className="kz-currency-trigger-btn"
              onClick={() => setCurrencyOpen(!currencyOpen)}
              aria-expanded={currencyOpen}
              aria-label={`Currency: ${currency}. Click to switch`}
              title="Select Regional Currency"
            >
              <span className="kz-currency-flag">{CURRENCY_FLAGS[currency] || '🇶🇦'}</span>
              <span className="kz-currency-code">{currency}</span>
              <ChevronDown size={12} className={`kz-currency-chevron ${currencyOpen ? 'open' : ''}`} />
            </button>

            {currencyOpen && (
              <div className="kz-currency-menu">
                {Object.keys(CURRENCY_RATES).map((curr) => (
                  <button
                    key={curr}
                    type="button"
                    className={`kz-currency-menu-item ${currency === curr ? 'active' : ''}`}
                    onClick={() => {
                      setCurrency(curr);
                      setCurrencyOpen(false);
                    }}
                  >
                    <span className="kz-currency-menu-flag">{CURRENCY_FLAGS[curr] || '🇶🇦'}</span>
                    <span className="kz-currency-menu-code">{curr}</span>
                    {currency === curr && (
                      <Check size={13} color="var(--kz-crimson)" style={{ marginLeft: isRtl ? '0' : 'auto', marginRight: isRtl ? 'auto' : '0' }} />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bilingual Language Toggle */}
          <button
            type="button"
            className="kz-icon-circle-btn"
            onClick={toggleLanguage}
            title={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            aria-label="Toggle Language"
            style={{ fontWeight: 700, fontSize: '0.78rem' }}
          >
            {language === 'en' ? 'عربي' : 'EN'}
          </button>

          {/* Cart Bag Trigger */}
          <button
            type="button"
            className="kz-icon-circle-btn"
            onClick={openCart}
            aria-label="Open Cart Bag"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="kz-cart-badge-count">{cartCount}</span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
};
