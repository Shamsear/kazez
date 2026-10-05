import { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash } from '@phosphor-icons/react';
import { useLocale } from '../i18n/LocaleContext.jsx';
import { useShop } from '../state/ShopContext.jsx';
import { Qty, Price } from './Bits.jsx';
import s from './CartDrawer.module.css';

export function CartDrawer() {
  const { t, pick, price, currency } = useLocale();
  const { items, subtotal, setQty, remove, drawerOpen, closeDrawer, announce } = useShop();
  const panel = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!drawerOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel.current?.querySelector('[data-autofocus]')?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') closeDrawer();
      if (e.key === 'Tab' && panel.current) {
        const f = panel.current.querySelectorAll('button:not([disabled]), a[href], input, select, [tabindex]:not([tabindex="-1"])');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey); };
  }, [drawerOpen, closeDrawer]);

  return (
    <>
      <div className="visually-hidden" aria-live="polite">{announce ? t.common.added : ''}</div>
      <div className={s.scrim} data-open={drawerOpen} onClick={closeDrawer} aria-hidden="true" />
      <aside
        ref={panel}
        className={s.panel}
        data-open={drawerOpen}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        inert={drawerOpen ? undefined : ''}
      >
        <header className={s.head}>
          <h2 id="cart-title" className={s.title}>{t.cart.title}</h2>
          <button type="button" className={s.close} onClick={closeDrawer} data-autofocus>
            <X size={20} />
            <span className="visually-hidden">{t.nav.close}</span>
          </button>
        </header>

        {items.length === 0 ? (
          <div className={s.empty}>
            <p className={s.emptyTitle}>{t.cart.empty}</p>
            <p className="small">{t.cart.emptyBody}</p>
            <button type="button" className="btn btn-primary" onClick={() => { closeDrawer(); navigate('/fit'); }}>
              {t.common.fit}
            </button>
          </div>
        ) : (
          <>
            <ul className={s.list}>
              {items.map((it) => (
                <li key={it.sku} className={s.item}>
                  <div className={s.thumb}><img src={it.image} alt="" loading="lazy" /></div>
                  <div className={s.info}>
                    <p className={s.name}>{pick(it.name)}</p>
                    <p className="small">{pick(it.variant)}</p>
                    <p className="small mono" dir="ltr">{it.sku}</p>
                    <div className={s.row}>
                      <Qty value={it.qty} min={0} onChange={(q) => setQty(it.sku, q)} />
                      <button
                        type="button"
                        className={s.remove}
                        onClick={() => remove(it.sku)}
                        aria-label={`${t.common.remove} ${pick(it.name)}`}
                        title={t.common.remove}
                      >
                        <Trash size={15} />
                        <span>{t.common.remove}</span>
                      </button>
                    </div>
                  </div>
                  <Price qar={it.price * it.qty} className={`${s.price} num`} />
                </li>
              ))}
            </ul>
            <footer className={s.foot}>
              <div className={s.total}>
                <span>{t.cart.subtotal}</span>
                <Price qar={subtotal} className="num" />
              </div>
              {currency !== 'QAR' && <p className="small">{t.common.chargedInQar}</p>}
              <Link to="/checkout" className="btn btn-primary btn-block" onClick={closeDrawer}>{t.cart.checkout}</Link>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
