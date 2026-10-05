import { Link } from 'react-router-dom';
import { useLocale } from '../i18n/LocaleContext.jsx';
import { SHOP, waLink } from '../data/shop.js';
import s from './Footer.module.css';

export function Footer() {
  const { t, pick } = useLocale();
  const year = new Date().getFullYear();
  return (
    <footer className={`${s.footer} no-print`}>
      <div className={`container ${s.grid}`}>
        <div className={s.brand}>
          <p className={s.word} dir="ltr">KAZEZ</p>
          <p className="small">{t.footer.blurb}</p>
        </div>

        <nav aria-label={t.footer.shop}>
          <h2 className={s.head}>{t.footer.shop}</h2>
          <ul className={s.list}>
            <li><Link to="/motor">{t.nav.motor}</Link></li>
            <li><Link to="/fit">{t.nav.fit}</Link></li>
          </ul>
        </nav>

        <nav aria-label={t.footer.help}>
          <h2 className={s.head}>{t.footer.help}</h2>
          <ul className={s.list}>
            <li><Link to="/install">{t.nav.install}</Link></li>
            <li><Link to="/contact">{t.nav.contact}</Link></li>
            <li className={s.plain}>{t.footer.warranty}</li>
            <li className={s.plain}>{t.footer.returns}</li>
          </ul>
        </nav>

        <div>
          <h2 className={s.head}>{t.footer.visit}</h2>
          <ul className={s.list}>
            <li className={s.plain}>{pick(SHOP.address)}</li>
            <li className={s.plain}>{pick(SHOP.hours)}</li>
            <li><a href={SHOP.phoneHref} dir="ltr">{SHOP.phone}</a></li>
            <li><a href={waLink('Hello Kazez')} target="_blank" rel="noreferrer">{t.common.whatsapp}</a></li>
          </ul>
        </div>
      </div>
      <div className={`container ${s.base}`}>
        <p className="small">© {year} {t.footer.rights}</p>
      </div>
    </footer>
  );
}
