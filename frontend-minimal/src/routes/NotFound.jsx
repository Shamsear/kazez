import React from 'react';
import { Link } from 'react-router-dom';
import { useLocale } from '../i18n/LocaleContext.jsx';

export default function NotFound() {
  const { t } = useLocale();

  return (
    <div className="container section" style={{ textAlign: 'center', paddingBlock: 'var(--s-8)' }}>
      <h1 className="h1" style={{ marginBottom: 'var(--s-3)' }}>{t.notFound.title}</h1>
      <p className="body" style={{ marginInline: 'auto', marginBottom: 'var(--s-5)' }}>
        {t.notFound.body}
      </p>
      <Link to="/" className="btn btn-primary">
        {t.notFound.home}
      </Link>
    </div>
  );
}
