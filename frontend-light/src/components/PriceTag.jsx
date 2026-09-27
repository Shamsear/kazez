import React from 'react';
import NumberFlow from '@number-flow/react';
import { useCart } from '../context/CartContext';

export const PriceTag = ({ amountInQar, className = '', showLabel = false }) => {
  const { getPriceParts } = useCart();
  const parts = getPriceParts(amountInQar);

  const formatOptions = parts.currencyCode === 'USD' 
    ? { minimumFractionDigits: 2, maximumFractionDigits: 2 }
    : { maximumFractionDigits: 0 };

  return (
    <span className={`kz-price ${className}`}>
      {parts.isPrefix ? (
        <>
          <span className="kz-currency kz-currency-prefix">{parts.symbol}</span>
          <span className="kz-price-val">
            <NumberFlow 
              value={parts.numericAmount ?? 0} 
              format={formatOptions}
            />
          </span>
        </>
      ) : (
        <>
          <span className="kz-price-val">
            <NumberFlow 
              value={parts.numericAmount ?? 0} 
              format={formatOptions}
            />
          </span>
          <span className="kz-currency kz-currency-suffix">{parts.symbol}</span>
        </>
      )}
      {showLabel && <span className="kz-tax-label"> (incl. VAT)</span>}
    </span>
  );
};
