import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { MOTOR } from '../data/motor.js';

const ShopContext = createContext(null);

const load = (k, fallback) => {
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
};
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } };

export const motorLine = (finishKey) => {
  const f = MOTOR.finishes[finishKey];
  return {
    sku: f.sku, kind: 'motor', finish: finishKey, price: MOTOR.price, image: f.images[0],
    name: MOTOR.name, variant: f.label
  };
};

export const bracketLine = (b) => ({
  sku: b.sku, kind: 'bracket', price: b.price, image: b.image,
  name: { en: `${b.mount.en} bracket`, ar: `قاعدة ${b.mount.ar}` },
  variant: { en: `${b.make} ${b.model}`, ar: `${b.make} ${b.model}` }
});

export function ShopProvider({ children }) {
  const [items, setItems] = useState(() => load('kzm_cart', []));
  const [vehicle, setVehicleState] = useState(() => load('kzm_vehicle', null));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [announce, setAnnounce] = useState('');
  const lastTrigger = useRef(null);

  useEffect(() => save('kzm_cart', items), [items]);

  const setVehicle = useCallback((v) => { setVehicleState(v); save('kzm_vehicle', v); }, []);

  const add = useCallback((lines, { open = true, qty = 1 } = {}) => {
    const list = Array.isArray(lines) ? lines : [lines];
    setItems((prev) => {
      const next = [...prev];
      for (const line of list) {
        const i = next.findIndex((x) => x.sku === line.sku);
        if (i > -1) next[i] = { ...next[i], qty: next[i].qty + qty };
        else next.push({ ...line, qty });
      }
      return next;
    });
    setAnnounce(String(Date.now()));
    if (open) {
      lastTrigger.current = document.activeElement;
      setDrawerOpen(true);
    }
  }, []);

  const setQty = useCallback((sku, qty) => {
    setItems((prev) => (qty <= 0 ? prev.filter((x) => x.sku !== sku) : prev.map((x) => (x.sku === sku ? { ...x, qty } : x))));
  }, []);

  const remove = useCallback((sku) => setItems((prev) => prev.filter((x) => x.sku !== sku)), []);
  const clear = useCallback(() => setItems([]), []);

  const openDrawer = useCallback(() => { lastTrigger.current = document.activeElement; setDrawerOpen(true); }, []);
  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    const el = lastTrigger.current;
    if (el && typeof el.focus === 'function') requestAnimationFrame(() => el.focus());
  }, []);

  const saveOrder = useCallback((order) => {
    const all = load('kzm_orders', {});
    all[order.id] = order;
    save('kzm_orders', all);
  }, []);
  const getOrder = useCallback((id) => load('kzm_orders', {})[id] || null, []);

  const count = items.reduce((n, x) => n + x.qty, 0);
  const subtotal = items.reduce((n, x) => n + x.qty * x.price, 0);

  const value = useMemo(
    () => ({
      items, count, subtotal, add, setQty, remove, clear,
      drawerOpen, openDrawer, closeDrawer,
      vehicle, setVehicle, saveOrder, getOrder, announce
    }),
    [items, count, subtotal, add, setQty, remove, clear, drawerOpen, openDrawer, closeDrawer, vehicle, setVehicle, saveOrder, getOrder, announce]
  );

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export const useShop = () => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used inside ShopProvider');
  return ctx;
};
