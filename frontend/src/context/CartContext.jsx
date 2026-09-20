import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CURRENCY_RATES = {
  QAR: { rate: 1.0, symbol: 'QAR', name: 'Qatari Riyal' },
  SAR: { rate: 1.03, symbol: 'SAR', name: 'Saudi Riyal' },
  AED: { rate: 1.01, symbol: 'AED', name: 'UAE Dirham' },
  USD: { rate: 0.274, symbol: '$', name: 'US Dollar' }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('kz_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currency, setCurrency] = useState('QAR');
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('kz_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const addToCart = (product, quantity = 1) => {
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.sku === product.sku);
      let updatedItems = [...prevItems];

      if (existingIndex > -1) {
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + quantity
        };
      } else {
        const itemImage = Array.isArray(product.images) && product.images.length > 0
          ? product.images[0]
          : (product.image || product.thumbnail || (product.sku === 'KAZEZ-SLVR' ? '/assets/images/motor-silver.webp' : '/assets/images/motor-black.webp'));

        updatedItems.push({
          id: product.id,
          sku: product.sku,
          name: product.name,
          edition: product.edition || product.name,
          finish: product.finish || 'Custom',
          price: product.price,
          quantity: quantity,
          image: itemImage,
          thumbnail: itemImage
        });
      }

      return updatedItems;
    });

    showToast(`Added ${product.edition || product.name} to cart`);
    setIsCartOpen(true);
  };

  const removeFromCart = (sku) => {
    setItems((prev) => prev.filter((item) => item.sku !== sku));
  };

  const updateQuantity = (sku, delta) => {
    setItems((prev) =>
      prev
        .map((item) => {
          if (item.sku === sku) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  // Totals calculation
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotalQar = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const getPriceParts = (amountInQar = 0) => {
    const curInfo = CURRENCY_RATES[currency] || CURRENCY_RATES.QAR;
    const converted = amountInQar * curInfo.rate;
    if (currency === 'USD') {
      return {
        isPrefix: true,
        symbol: '$',
        amount: converted.toFixed(2),
        currencyCode: 'USD'
      };
    }
    return {
      isPrefix: false,
      symbol: curInfo.symbol,
      amount: Math.round(converted).toLocaleString(),
      currencyCode: currency
    };
  };

  const formatPrice = (amountInQar) => {
    const parts = getPriceParts(amountInQar);
    if (parts.isPrefix) {
      return `${parts.symbol}${parts.amount}`;
    }
    return `${parts.amount} ${parts.symbol}`;
  };

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotalQar,
        currency,
        setCurrency,
        formatPrice,
        getPriceParts,
        CURRENCY_RATES,
        toastMessage
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
