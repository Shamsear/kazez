import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { STRINGS } from './strings.js';
import { CURRENCIES } from '../data/shop.js';

const LocaleContext = createContext(null);

const read = (k, fallback) => {
  try { return localStorage.getItem(k) || fallback; } catch { return fallback; }
};
const write = (k, v) => { try { localStorage.setItem(k, v); } catch { /* storage unavailable */ } };

export function LocaleProvider({ children }) {
  const [lang, setLang] = useState(() => read('kzm_lang', 'en'));
  const [currency, setCurrency] = useState(() => read('kzm_currency', 'QAR'));

  useEffect(() => {
    const dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    write('kzm_lang', lang);
  }, [lang]);

  useEffect(() => { write('kzm_currency', currency); }, [currency]);

  const t = STRINGS[lang];
  const pick = useCallback((obj) => (obj && typeof obj === 'object' ? obj[lang] ?? obj.en : obj), [lang]);

  const formatters = useMemo(() => {
    const locale = lang === 'ar' ? 'ar-QA-u-nu-latn' : 'en-QA';
    const out = {};
    for (const [code, c] of Object.entries(CURRENCIES)) {
      out[code] = new Intl.NumberFormat(locale, {
        style: 'currency', currency: code, currencyDisplay: 'code',
        minimumFractionDigits: c.digits, maximumFractionDigits: c.digits
      });
    }
    return out;
  }, [lang]);

  const price = useCallback(
    (qar, code = currency) => {
      const c = CURRENCIES[code] || CURRENCIES.QAR;
      return formatters[code].format(qar * c.rate).replace(/\u00A0/g, ' ');
    },
    [currency, formatters]
  );

  const value = useMemo(
    () => ({
      lang, dir: lang === 'ar' ? 'rtl' : 'ltr', isRtl: lang === 'ar', t, pick,
      toggleLang: () => setLang((l) => (l === 'ar' ? 'en' : 'ar')),
      currency, setCurrency, price
    }),
    [lang, t, pick, currency, price]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export const useLocale = () => {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used inside LocaleProvider');
  return ctx;
};

export const fill = (str, vars) => str.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? '');
