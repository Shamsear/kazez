import React, { useState, useEffect } from 'react';
import { Home, Shield, Sparkles, Cpu, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const FloatingBottomNav = ({ activeView, setActiveView }) => {
  const { t, isRtl } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      setIsScrolled(scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    {
      id: 'home',
      label: t.nav.storefront || (isRtl ? 'الرئيسية' : 'Storefront'),
      shortLabel: isRtl ? 'الرئيسية' : 'Home',
      icon: Home
    },
    {
      id: 'kazez-black',
      label: t.nav.blackEdition || (isRtl ? 'الأسود الشبح' : 'Black Edition'),
      shortLabel: isRtl ? 'الأسود' : 'Black',
      icon: Shield
    },
    {
      id: 'kazez-silver',
      label: t.nav.silverEdition || (isRtl ? 'الفضي الكروم' : 'Silver Edition'),
      shortLabel: isRtl ? 'الفضي' : 'Silver',
      icon: Sparkles
    },
    {
      id: 'engineering',
      label: t.nav.engineeringLab || (isRtl ? 'المختبر الهندسي' : 'Engineering'),
      shortLabel: isRtl ? 'الهندسة' : 'Lab',
      icon: Cpu
    },
    {
      id: 'contact',
      label: t.nav.showroom || (isRtl ? 'صالة العرض' : 'Showroom'),
      shortLabel: isRtl ? 'تواصل' : 'Showroom',
      icon: MapPin
    }
  ];

  return (
    <nav
      className={`kz-floating-bottom-nav ${isScrolled ? 'kz-bottom-nav-liquid' : ''}`}
      aria-label={isRtl ? 'شريط التنقل السفلي العائم' : 'Floating Navigation Bar'}
    >
      <div className="kz-floating-bottom-inner">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              className={`kz-bottom-nav-btn ${isActive ? 'active' : ''}`}
              onClick={() => setActiveView(item.id)}
              aria-current={isActive ? 'page' : undefined}
            >
              <span className="kz-bottom-nav-icon-wrap">
                <Icon size={18} strokeWidth={isActive ? 2.4 : 1.9} />
              </span>
              <span className="kz-bottom-nav-label">{item.shortLabel}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
