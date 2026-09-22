import React, { useState, useEffect } from 'react';
import { MinimalNavbar } from './components/MinimalNavbar';
import { EditorialHero } from './components/EditorialHero';
import { TelemetryTicker } from './components/TelemetryTicker';
import { CinematicVideoShowcase } from './components/CinematicVideoShowcase';
import { EditionShowcase } from './components/EditionShowcase';
import { BracketExplorer } from './components/BracketExplorer';
import { ProductDetailView } from './components/ProductDetailView';
import { EngineeringLabView } from './components/EngineeringLabView';
import { ShowroomContact } from './components/ShowroomContact';
import { CartDrawerMinimal } from './components/CartDrawerMinimal';
import { MinimalCheckout } from './components/MinimalCheckout';
import { OrderSuccessReceipt } from './components/OrderSuccessReceipt';
import { MinimalFooter } from './components/MinimalFooter';
import { FloatingBottomNav } from './components/FloatingBottomNav';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useCart } from './context/CartContext';
import { useLanguage } from './context/LanguageContext';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { PRODUCTS } from './data/products';

export const App = () => {
  const { t, isRtl } = useLanguage();

  const getInitialView = () => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'kz-editions') return 'home';
    const validViews = ['home', 'kazez-black', 'kazez-silver', 'engineering', 'contact', 'checkout', 'order-success'];
    return validViews.includes(hash) ? hash : 'home';
  };

  const [activeView, setActiveView] = useState(getInitialView);
  const [completedOrder, setCompletedOrder] = useState(null);
  const { clearCart, openCart, closeCart, addToCart, items } = useCart();

  useSmoothScroll(activeView);
  useScrollReveal('.kz-reveal', [activeView]);

  useEffect(() => {
    if (window.location.hash === '#kz-editions') {
      setTimeout(() => {
        document.getElementById('kz-editions')?.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    }

    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'kz-editions') {
        setActiveView('home');
        setTimeout(() => {
          document.getElementById('kz-editions')?.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      } else if (hash === 'cart') {
        if (items.length === 0) {
          addToCart(PRODUCTS[0], 1);
        }
        openCart();
      } else if (hash === 'checkout') {
        setActiveView('checkout');
      } else if (hash === 'order-success') {
        if (!completedOrder) {
          const now = new Date();
          setCompletedOrder({
            orderNumber: 'KZ-942817',
            invoiceNumber: 'KZ-INV-942817',
            date: now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            paymentMethod: 'card',
            paymentStatus: 'PAID',
            authCode: 'AUTH-8921471-QA',
            items: [
              {
                id: 9,
                sku: 'KAZEZ',
                name: 'Kazez Antenna Motor (Black Edition)',
                edition: 'Black Edition',
                specs: '6061-T6 Billet Alloy · IP67 Hermetic Seal · 45 Nm Powertrain',
                price: 350,
                quantity: 1,
                image: '/assets/images/motor-black.webp',
                thumbnail: '/assets/images/motor-black.webp'
              }
            ],
            total: 350,
            customer: {
              name: 'Hamad Al-Kuwari',
              phone: '+974 5512 8900',
              email: 'h.alkuwari@domain.qa',
              city: 'Doha',
              country: 'Qatar',
              address: 'Zone 55, Street 920, Villa 14',
              vehicleMake: 'Toyota',
              vehicleModel: 'Land Cruiser LC300 GR-S',
              vehicleYear: '2024'
            }
          });
        }
        setActiveView('order-success');
      } else if (['home', 'kazez-black', 'kazez-silver', 'engineering', 'contact', 'checkout'].includes(hash)) {
        setActiveView(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [items, completedOrder]);

  const navigateTo = (view) => {
    setActiveView(view);
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderComplete = (orderData) => {
    setCompletedOrder(orderData);
    setActiveView('order-success');
    window.location.hash = 'order-success';
    clearCart();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReturnHome = () => {
    setCompletedOrder(null);
    navigateTo('home');
  };

  return (
    <div className="kz-app-root">
      {/* Skip link for accessibility */}
      <a href="#main-content" className="kz-skip-link">
        Skip to content
      </a>

      {/* Floating Minimal Navbar */}
      <MinimalNavbar activeView={activeView} setActiveView={navigateTo} />

      {/* Main View Router */}
      <main id="main-content">
        <ErrorBoundary>
          {activeView === 'home' && (
            <>
              <EditorialHero
                onSelectEdition={(slug) => navigateTo(slug)}
                onExploreEditions={() => {
                  const el = document.getElementById('kz-editions');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else navigateTo('kazez-black');
                }}
              />
              <TelemetryTicker />
              <CinematicVideoShowcase />
              <EditionShowcase onSelectEdition={(slug) => navigateTo(slug)} />
              <BracketExplorer onSelectBracketForCart={(b) => openCart()} />
            </>
          )}

          {activeView === 'kazez-black' && (
            <ProductDetailView
              initialSku="KAZEZ"
              onBack={() => navigateTo('home')}
              onSelectOtherEdition={(sku) => navigateTo(sku === 'KAZEZ-SLVR' ? 'kazez-silver' : 'kazez-black')}
              onInstantCheckout={(prod, qty) => {
                addToCart(prod, qty, false);
                closeCart();
                navigateTo('checkout');
              }}
            />
          )}

          {activeView === 'kazez-silver' && (
            <ProductDetailView
              initialSku="KAZEZ-SLVR"
              onBack={() => navigateTo('home')}
              onSelectOtherEdition={(sku) => navigateTo(sku === 'KAZEZ-SLVR' ? 'kazez-silver' : 'kazez-black')}
              onInstantCheckout={(prod, qty) => {
                addToCart(prod, qty, false);
                closeCart();
                navigateTo('checkout');
              }}
            />
          )}

          {activeView === 'engineering' && (
            <EngineeringLabView onSelectEdition={(slug) => navigateTo(slug)} />
          )}

          {activeView === 'contact' && (
            <ShowroomContact />
          )}

          {activeView === 'checkout' && (
            <MinimalCheckout
              onReturnHome={() => navigateTo('home')}
              onOrderComplete={handleOrderComplete}
            />
          )}

          {activeView === 'order-success' && (
            <OrderSuccessReceipt
              order={completedOrder}
              onReturnHome={handleReturnHome}
            />
          )}
        </ErrorBoundary>
      </main>

      {/* Slide-out Cart Drawer */}
      <CartDrawerMinimal onProceedToCheckout={() => navigateTo('checkout')} />

      {/* Minimal Clean Footer */}
      {activeView !== 'order-success' && (
        <MinimalFooter onNavigate={navigateTo} />
      )}

      {/* Floating Bottom Navigation Bar with Links */}
      {activeView !== 'checkout' && activeView !== 'order-success' && (
        <FloatingBottomNav
          activeView={activeView}
          setActiveView={navigateTo}
        />
      )}
    </div>
  );
};
