import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { List, X } from '@phosphor-icons/react';
import { useLocale } from '../i18n/LocaleContext.jsx';
import { useShop } from '../state/ShopContext.jsx';
import { CURRENCIES } from '../data/shop.js';
import { Mark } from './Mark.jsx';
import { NumFlow } from './Bits.jsx';
import s from './Nav.module.css';

export function Nav() {
  const { t, toggleLang, currency, setCurrency, lang } = useLocale();
  const { count, openDrawer } = useShop();
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const links = [
    { to: '/motor', label: t.nav.motor },
    { to: '/fit', label: t.nav.fit },
    { to: '/install', label: t.nav.install },
    { to: '/contact', label: t.nav.contact }
  ];

  const tools = (
    <>
      <button type="button" className={s.tool} onClick={toggleLang} aria-label={t.nav.languageLabel} lang={lang === 'ar' ? 'en' : 'ar'}>
        {t.nav.language}
      </button>
      <label className={s.currency}>
        <span className="visually-hidden">{t.nav.currency}</span>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)} className={s.currencySelect}>
          {Object.keys(CURRENCIES).map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </label>
    </>
  );

  return (
    <header className={`${s.bar} no-print`}>
      <div className={`container ${s.inner}`}>
        <Mark />

        <nav className={s.links} aria-label="Primary">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => `${s.link} ${isActive ? s.active : ''}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className={s.right}>
          <div className={s.desktopTools}>{tools}</div>
          <button type="button" className={s.cart} onClick={openDrawer}>
            {t.nav.cart} <span className="num">(<NumFlow value={count} />)</span>
          </button>
          <button
            type="button"
            className={s.menuBtn}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} weight="regular" /> : <List size={22} weight="regular" />}
            <span className="visually-hidden">{open ? t.nav.close : t.nav.menu}</span>
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={s.sheet} data-open={open} hidden={!open}>
        <nav className="container" aria-label="Mobile">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} className={({ isActive }) => `${s.sheetLink} ${isActive ? s.sheetActive : ''}`}>
              {l.label}
            </NavLink>
          ))}
          <div className={s.sheetTools}>{tools}</div>
        </nav>
      </div>
    </header>
  );
}
