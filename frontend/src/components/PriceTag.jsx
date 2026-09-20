import React from 'react';
import { useCart } from '../context/CartContext';

export const PriceTag = ({ amount = 0, size = 'normal', className = '', style = {} }) => {
  const { getPriceParts } = useCart();
  const { amount: formattedAmount, symbol, isPrefix } = getPriceParts(amount);

  return (
    <span className={`kz-price-tag kz-price-${size} ${className}`} style={style}>
      {isPrefix && <span className="kz-price-unit kz-price-prefix">{symbol}</span>}
      <span className="kz-price-num">{formattedAmount}</span>
      {!isPrefix && <span className="kz-price-unit kz-price-suffix">{symbol}</span>}
    </span>
  );
};
