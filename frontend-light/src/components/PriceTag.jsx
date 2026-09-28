import React from 'react';
import NumberFlow from '@number-flow/react';
import { useCart } from '../context/CartContext';

export const PriceTag = ({ amountInQar, className = '', showLabel = false }) => {
  const { getPriceParts } = useCart();
  const parts = getPriceParts(amountInQar);
  const numericAmount = typeof parts.amount === 'number' ? parts.amount : parseFloat(parts.amount) || 0;

  return (
    <span className={`kz-price ${className}`}>
      {parts.isPrefix ? (
        <>
          <span className="kz-currency kz-currency-prefix">{parts.symbol}</span>
          <span className="kz-price-val">
            <NumberFlow value={numericAmount} />
          </span>
        </>
      ) : (
        <>
          <span className="kz-price-val">
            <NumberFlow value={numericAmount} />
          </span>
          <span className="kz-currency kz-currency-suffix">{parts.symbol}</span>
        </>
      )}
      {showLabel && <span className="kz-tax-label"> (incl. VAT)</span>}
    </span>
  );
};
