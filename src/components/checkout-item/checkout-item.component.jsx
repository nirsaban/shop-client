import React from 'react';
import { connect } from 'react-redux';

import {
  clearItemFromCart,
  addItem,
  removeItem
} from '../../redux/cart/cart.actions';
import Rating from '../rating/rating'
import {
  CheckoutItemContainer,
  ImageContainer,
  TextContainer,
  QuantityContainer,
  RemoveButtonContainer
} from './checkout-item.styles';

export const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
  const { product_name, description,images, price, quantity,rate } = cartItem;
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        {
          images[0] ? 
          (<img src={images[0]} alt='item' />)
          :
          (<Rating rate={rate} />)

        }  
      </ImageContainer>
      <TextContainer>
      {product_name} 
      <br/>
      <small>
      {description}
      </small>
      </TextContainer>
      <QuantityContainer>
        <div onClick={() => removeItem(cartItem)}>&#10094;</div>
        <span>{quantity}</span>
      {
        !cartItem.package_name ? 
        <div onClick={ () => addItem(cartItem)}>&#10095;</div>
        : null
      }
      </QuantityContainer>
      <TextContainer>{price}</TextContainer>
      <RemoveButtonContainer onClick={() => clearItem(cartItem)}>
        &#10005;
      </RemoveButtonContainer>
    </CheckoutItemContainer>
  );
};

const mapDispatchToProps = dispatch => ({
  clearItem: item => dispatch(clearItemFromCart(item)),
  addItem: item => dispatch(addItem(item)),
  removeItem: item => dispatch(removeItem(item))
});

export default connect(
  null,
  mapDispatchToProps
)(CheckoutItem);
