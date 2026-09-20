import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { VideoHero } from './components/VideoHero';
import { Marquee } from './components/Marquee';
import { StatsBar } from './components/StatsBar';
import { ProductCard } from './components/ProductCard';
import { ProductDetail } from './components/ProductDetail';
import { StoryPanels } from './components/StoryPanels';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutPage } from './components/CheckoutPage';
import { OrderConfirmation } from './components/OrderConfirmation';
import { EngineeringPage } from './components/EngineeringPage';
import { ContactPage } from './components/ContactPage';
import { ProfilePage } from './components/ProfilePage';
import { Footer } from './components/Footer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useCart } from './context/CartContext';
import { useLanguage } from './context/LanguageContext';
import { useScrollReveal } from './hooks/useScrollReveal';
import { PRODUCTS } from './data/products';

export const App = () => {
  const { t } = useLanguage();
  const getInitialView = () => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'kz-editions') return 'home';
    const validViews = ['home', 'kazez-black', 'kazez-silver', 'engineering', 'contact', 'checkout', 'order-success', 'profile'];
    return validViews.includes(hash) ? hash : 'home';
  };

  const [activeView, setActiveView] = useState(getInitialView);
  useScrollReveal('.kz-reveal', [activeView]);
  const [completedOrder, setCompletedOrder] = useState(null);
  const { clearCart, openCart, closeCart, addToCart, items } = useCart();

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
      } else if (hash === 'checkout' || hash === 'checkout-payment') {
        setActiveView('checkout');
      } else if (hash === 'order-success') {
        if (!completedOrder) {
          const now = new Date();
          setCompletedOrder({
            orderNumber: 'KZ-942817',
            invoiceNumber: 'KZ-INV-942817',
            date: now.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
            time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true }),
            paymentMethod: 'card',
            paymentStatus: 'PAID',
            items: [
              {
                id: 9,
                sku: 'KAZEZ',
                name: 'Kazez Precision Antenna Actuator (Black Edition)',
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
      } else if (['home', 'kazez-black', 'kazez-silver', 'engineering', 'contact', 'checkout', 'profile'].includes(hash)) {
        setActiveView(hash);
        window.scrollTo(0, 0);
      }
    };
    onHashChange();
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

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
      {/* Accessible Skip Link for Keyboard Navigation */}
      <a href="#main-content" className="kz-skip-link">
        Skip to content
      </a>

      {/* Fixed Sticky Header Navbar with Bilingual Switcher */}
      <Navbar activeView={activeView} setActiveView={navigateTo} />

      {/* Main View Router */}
      <main id="main-content">
        <ErrorBoundary>
          {activeView === 'home' && (
            <>
              {/* Cinematic Video Hero Section with Controls */}
              <VideoHero
                onExploreProducts={() => {
                  const el = document.getElementById('kz-editions');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else navigateTo('kazez-black');
                }}
                onSelectEdition={(slug) => navigateTo(slug)}
              />

              {/* Industrial Telemetry Ticker Marquee */}
              <Marquee />

              {/* Engineering Metric Stats Strip */}
              <StatsBar />

              {/* Dual Editions Product Showcase */}
              <section className="kz-section kz-section-screen" id="kz-editions">
                <div className="kz-container">
                  <div className="kz-editions-header kz-reveal">
                    <h2 className="kz-editions-title">
                      {t.editions.titlePart1}
                      <span style={{ color: 'var(--kz-racing-red)' }}>{t.editions.titlePart2}</span>
                    </h2>
                    <p className="kz-editions-sub">
                      {t.editions.subtitle}
                    </p>
                  </div>

                  <div className="kz-grid-products">
                    {PRODUCTS.map((prod, idx) => (
                      <ProductCard
                        key={prod.id}
                        product={prod}
                        index={idx}
                        onSelectProduct={(slug) => navigateTo(slug)}
                      />
                    ))}
                  </div>
                </div>
              </section>

              {/* High-Resolution Story & Metallurgy Panels */}
              <StoryPanels />
            </>
          )}

          {activeView === 'kazez-black' && (
            <ProductDetail
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
            <ProductDetail
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
            <EngineeringPage
              onSelectEdition={(slug) => navigateTo(slug)}
            />
          )}

          {activeView === 'contact' && (
            <ContactPage />
          )}

          {activeView === 'profile' && (
            <ProfilePage
              onNavigateHome={() => navigateTo('home')}
              onSelectEdition={(slug) => navigateTo(slug)}
            />
          )}

          {activeView === 'checkout' && (
            <CheckoutPage
              onReturnHome={() => navigateTo('home')}
              onOrderComplete={handleOrderComplete}
            />
          )}

          {activeView === 'order-success' && (
            <div className="kz-order-success-view-wrapper">
              <OrderConfirmation
                order={completedOrder}
                onReturnHome={handleReturnHome}
              />
            </div>
          )}
        </ErrorBoundary>
      </main>

      {/* Slide-out Cart Drawer with Proceed to Dedicated Checkout */}
      <CartDrawer
        onProceedToCheckout={() => navigateTo('checkout')}
      />

      {/* Luxury Brand Footer (Hidden on focused order-success screen) */}
      {activeView !== 'order-success' && (
        <Footer onNavigate={navigateTo} />
      )}
    </div>
  );
};

