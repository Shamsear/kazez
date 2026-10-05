import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Printer, WhatsappLogo, ArrowRight } from '@phosphor-icons/react';
import { Rise } from 'cube-motion/react';
import { useLocale, fill } from '../i18n/LocaleContext.jsx';
import { useShop } from '../state/ShopContext.jsx';
import { Price, NumFlow } from '../components/Bits.jsx';
import { waLink } from '../data/shop.js';
import s from './Order.module.css';

export default function Order() {
  const { id } = useParams();
  const { t, pick, price } = useLocale();
  const { getOrder } = useShop();

  const order = getOrder(id);

  useEffect(() => {
    document.title = order ? `${t.order.number} #${order.id} | Kazez` : `Order | Kazez`;
  }, [order, t]);

  const handlePrint = () => {
    window.print();
  };

  if (!order) {
    return (
      <div className="container section">
        <div className={s.notFoundBox}>
          <h1 className="h1">{t.order.notFound}</h1>
          <p className="body">{t.order.notFoundBody}</p>
          <Link to="/" className="btn btn-primary">
            {t.order.continue}
          </Link>
        </div>
      </div>
    );
  }

  const statusLabel =
    order.status === 'paid'
      ? t.order.paid
      : order.status === 'due'
      ? t.order.due
      : t.order.pending;

  const waReceiptText = `Hello Kazez, my order number is #${order.id}. Total: QAR ${order.grandTotal}. Deliver to: ${order.customer.name}, ${order.customer.city}.`;

  return (
    <div className="container section">
      <div className={s.orderContainer}>
        {/* Header Confirmation */}
        <Rise>
          <div className={s.head}>
            <CheckCircle size={44} className={s.checkIcon} />
            <h1 className="h1">
              {fill(t.order.title, { name: order.customer.name })}
            </h1>
            <p className="lede">
              {fill(t.order.sub, { phone: order.customer.phone })}
            </p>
          </div>
        </Rise>

        {/* Receipt Paper Card */}
        <Rise delay={0.08}>
          <div className={s.receiptCard}>
          <div className={s.receiptHeader}>
            <div>
              <span className={s.orderNumLabel}>{t.order.number}</span>
              <p className={`${s.orderNum} mono`} dir="ltr">#{order.id}</p>
            </div>
            <div style={{ textAlign: 'end' }}>
              <span className={s.orderNumLabel}>{t.order.date}</span>
              <p className="num" style={{ fontWeight: 600 }}>{order.date}</p>
            </div>
          </div>

          {/* Delivery & Customer Info */}
          <div className={s.customerDetails}>
            <div className={s.detailBlock}>
              <span className={s.blockLabel}>{t.order.deliverTo}</span>
              <p className="body">
                <strong>{order.customer.name}</strong><br />
                {order.customer.address}, {order.customer.city}<br />
                {order.customer.country}<br />
                <span dir="ltr">{order.customer.phone}</span>
              </p>
            </div>

            <div className={s.detailBlock}>
              <span className={s.blockLabel}>{t.order.payment}</span>
              <p className="body">
                <span className={s.statusBadge} data-status={order.status}>
                  {statusLabel}
                </span><br />
                {order.paymentMethod === 'card'
                  ? t.checkout.card
                  : order.paymentMethod === 'cod'
                  ? t.checkout.cod
                  : t.checkout.wa}
              </p>
            </div>
          </div>

          {/* Line items list */}
          <div className={s.itemsSection}>
            <h3 className="h3">{t.order.items}</h3>
            <ul className={s.itemsList}>
              {order.items.map((it) => (
                <li key={it.sku} className={s.orderItem}>
                  <div className={s.itemThumb}>
                    <img src={it.image} alt="" />
                  </div>
                  <div className={s.itemMeta}>
                    <span className={s.itemName}>{pick(it.name)}</span>
                    <span className="small">{pick(it.variant)}</span>
                    <span className="small num">Qty: <NumFlow value={it.qty} /></span>
                  </div>
                  <Price qar={it.price * it.qty} className={`${s.itemPrice} num`} />
                </li>
              ))}
            </ul>
          </div>

          {/* Calculations Total */}
          <div className={s.calcBox}>
            <div className={s.calcRow}>
              <span>{t.cart.subtotal}</span>
              <Price qar={order.subtotal} className="num" />
            </div>
            <div className={s.calcRow}>
              <span>{t.checkout.shipping}</span>
              {order.shippingFee === 0 ? (
                <span className="num">{t.checkout.free}</span>
              ) : (
                <Price qar={order.shippingFee} className="num" />
              )}
            </div>
            <div className={`${s.calcRow} ${s.calcTotal}`}>
              <span>{t.checkout.total}</span>
              <Price qar={order.grandTotal} className="num" />
            </div>
          </div>

          {/* Action buttons */}
          <div className={`${s.actions} no-print`}>
            <button type="button" className="btn btn-secondary" onClick={handlePrint}>
              <Printer size={18} />
              <span>{t.order.print}</span>
            </button>

            <a
              href={waLink(waReceiptText)}
              target="_blank"
              rel="noreferrer"
              className="btn btn-secondary"
            >
              <WhatsappLogo size={18} />
              <span>{t.order.share}</span>
            </a>

            <Link to="/" className="btn btn-primary" style={{ marginInlineStart: 'auto' }}>
              <span>{t.order.continue}</span>
              <ArrowRight size={16} className="flip" />
            </Link>
          </div>
        </div>
        </Rise>
      </div>
    </div>
  );
}
