import React from 'react';

import {
  CartItemContainer,
  ItemDetailsContainer,
  CartItemImage
} from './cart-item.styles';

const CartItem = ({ item: { images, price, product_name, quantity } }) => (
  <CartItemContainer>
    <CartItemImage src={images[Math.floor(Math.random() * images.length)]} alt='item' />
    <ItemDetailsContainer>
      <span>{product_name}</span>
      <span>
        {quantity} x ${price}
      </span>
    </ItemDetailsContainer>
  </CartItemContainer>
);

export default React.memo(CartItem);
