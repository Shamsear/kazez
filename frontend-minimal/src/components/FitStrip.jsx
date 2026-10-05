import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocale } from '../i18n/LocaleContext.jsx';
import { useShop } from '../state/ShopContext.jsx';
import { FITMENT, findMake } from '../data/fitment.js';
import s from './FitStrip.module.css';

// Inline vehicle picker: Make -> Model -> /fit/:make/:model
export function FitStrip() {
  const { t, pick } = useLocale();
  const { vehicle } = useShop();
  const navigate = useNavigate();
  const [make, setMake] = useState(vehicle?.make || '');
  const [model, setModel] = useState(vehicle?.model || '');
  const models = findMake(make)?.models || [];

  const submit = (e) => {
    e.preventDefault();
    if (make && model) navigate(`/fit/${make}/${model}`);
    else if (make) navigate(`/fit/${make}`);
    else navigate('/fit');
  };

  return (
    <section className={s.strip} aria-labelledby="fit-strip-label">
      <form className={`container ${s.form}`} onSubmit={submit}>
        <h2 id="fit-strip-label" className={s.label}>{t.home.stripLabel}</h2>

        <div className="field">
          <label className="field-label" htmlFor="strip-make">{t.home.make}</label>
          <select
            id="strip-make"
            className="select"
            value={make}
            onChange={(e) => { setMake(e.target.value); setModel(''); }}
          >
            <option value="">{t.home.pickMake}</option>
            {FITMENT.map((m) => <option key={m.slug} value={m.slug}>{pick(m.name)}</option>)}
          </select>
        </div>

        <div className="field">
          <label className="field-label" htmlFor="strip-model">{t.home.model}</label>
          <select
            id="strip-model"
            className="select"
            value={model}
            disabled={!make}
            onChange={(e) => setModel(e.target.value)}
          >
            <option value="">{t.home.pickModel}</option>
            {models.map((m) => <option key={m.slug} value={m.slug}>{m.name} ({m.years})</option>)}
          </select>
        </div>

        <button type="submit" className={`btn btn-primary ${s.submit}`}>{t.home.showKit}</button>
      </form>
    </section>
  );
}
