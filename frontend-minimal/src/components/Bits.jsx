import NumberFlow from '@number-flow/react';
import { Minus, Plus } from '@phosphor-icons/react';
import { useLocale } from '../i18n/LocaleContext.jsx';
import { CURRENCIES } from '../data/shop.js';
import s from './Bits.module.css';

export function Price({ qar, code, className, digits, prefix, suffix }) {
  const { lang, currency } = useLocale();
  const activeCode = code || currency;
  const c = CURRENCIES[activeCode] || CURRENCIES.QAR;
  const rawVal = (qar ?? 0) * (c.rate ?? 1);
  const fracDigits = digits !== undefined ? digits : (c.digits ?? 0);
  const locales = lang === 'ar' ? 'ar-QA-u-nu-latn' : 'en-QA';

  return (
    <NumberFlow
      value={rawVal}
      locales={locales}
      prefix={prefix}
      suffix={suffix}
      format={{
        style: 'currency',
        currency: activeCode,
        currencyDisplay: 'code',
        minimumFractionDigits: fracDigits,
        maximumFractionDigits: fracDigits
      }}
      className={className}
      willChange
    />
  );
}

export function NumFlow({ value, locales, prefix, suffix, format, className, trend }) {
  const { lang } = useLocale();
  const activeLocales = locales || (lang === 'ar' ? 'ar-QA-u-nu-latn' : 'en-QA');

  return (
    <NumberFlow
      value={value ?? 0}
      locales={activeLocales}
      prefix={prefix}
      suffix={suffix}
      format={format}
      trend={trend}
      className={className}
      willChange
    />
  );
}

export function Qty({ value, onChange, min = 1, max = 50, label }) {
  const { t } = useLocale();
  return (
    <div className={s.qty} role="group" aria-label={label || t.common.qty}>
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        aria-label={t.common.decrease}
        disabled={value <= min}
      >
        <Minus size={16} />
      </button>
      <output className="num" aria-live="polite">
        <NumFlow value={value} />
      </output>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        aria-label={t.common.increase}
        disabled={value >= max}
      >
        <Plus size={16} />
      </button>
    </div>
  );
}

export function FinishToggle({ finishes, value, onChange, legend }) {
  const { pick } = useLocale();
  return (
    <fieldset className={s.finish}>
      <legend className="field-label">{legend}</legend>
      <div className={s.finishRow}>
        {finishes.map((f) => (
          <label key={f.key} className={s.finishOpt} data-checked={value === f.key}>
            <input type="radio" name={`finish-${legend}`} value={f.key} checked={value === f.key} onChange={() => onChange(f.key)} />
            <span className={s.swatch} style={{ background: f.swatch }} aria-hidden="true" />
            <span className={s.finishText}>
              <span>{pick(f.label)}</span>
              <span className={s.finishDetail}>{pick(f.detail)}</span>
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function SpecSheet({ groups }) {
  const { pick } = useLocale();
  return (
    <div className={s.specs}>
      {groups.map((g) => (
        <section key={g.title.en} className={s.specGroup}>
          <h3 className={s.specTitle}>{pick(g.title)}</h3>
          <dl>
            {g.rows.map((r) => (
              <div key={r.label.en} className={s.specRow}>
                <dt>{pick(r.label)}</dt>
                <dd className="num">{pick(r.value)}</dd>
              </div>
            ))}
          </dl>
        </section>
      ))}
    </div>
  );
}
