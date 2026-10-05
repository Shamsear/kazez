import { useLocation, Link } from 'react-router-dom';
import { useLocale } from '../i18n/LocaleContext.jsx';
import s from './Mark.module.css';

// Wordmark with the antenna line. The line folds and rises again on every route change.
export function Mark() {
  const { pathname } = useLocation();
  const { t } = useLocale();
  return (
    <Link to="/" className={s.mark} aria-label={t.nav.home}>
      <span className={s.word} dir="ltr">KAZEZ</span>
      <span key={pathname} className={s.whip} aria-hidden="true" />
    </Link>
  );
}

// Busy indicator: the same line, folding back and forth.
export function Fold({ className = '' }) {
  return <span className={`${s.fold} ${className}`} aria-hidden="true" />;
}
