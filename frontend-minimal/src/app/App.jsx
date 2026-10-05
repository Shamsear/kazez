import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useLocale } from '../i18n/LocaleContext.jsx';
import { Nav } from '../components/Nav.jsx';
import { Footer } from '../components/Footer.jsx';
import { CartDrawer } from '../components/CartDrawer.jsx';
import { useReveal } from '../hooks/useReveal.js';
import Home from '../routes/Home.jsx';
import Fit from '../routes/Fit.jsx';
import Motor from '../routes/Motor.jsx';
import Install from '../routes/Install.jsx';
import Contact from '../routes/Contact.jsx';
import Checkout from '../routes/Checkout.jsx';
import Order from '../routes/Order.jsx';
import NotFound from '../routes/NotFound.jsx';

function ScrollManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    const main = document.getElementById('main');
    if (main) main.focus({ preventScroll: true });
  }, [pathname]);
  return null;
}

export function App() {
  const { t } = useLocale();
  const { pathname } = useLocation();
  useReveal(pathname);

  return (
    <>
      <a className="skip-link" href="#main">{t.meta.skip}</a>
      <ScrollManager />
      <Nav />
      <main id="main" tabIndex={-1} style={{ outline: 'none' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fit" element={<Fit />} />
          <Route path="/fit/:make" element={<Fit />} />
          <Route path="/fit/:make/:model" element={<Fit />} />
          <Route path="/motor" element={<Motor />} />
          <Route path="/install" element={<Install />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
