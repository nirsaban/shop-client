import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Form, Button, Col, Container, Row, Card } from 'react-bootstrap';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import httpRequest from '../../classes/httpRequest'
import apiRoutes from '../../config/routesApi.json'
import { selectCurrentUser } from '../../redux/user/user.selectors'
import FormComponent from '../../ui/form/form';
import CardComponent from '../../ui/card/card'
import jsonForm from '../../config/formsSchema.json';
import { useState, useEffect } from 'react';
import {
  selectCartItems,
  selectCartTotal
} from '../../redux/cart/cart.selectors';
import cities from '../../helpers/cities.json';
import {
  CheckoutPageContainer,
  CheckoutHeaderContainer,
  HeaderBlockContainer,
  TotalContainer,
  WarningContainer
} from './checkout.styles';

export const CheckoutPage = ({ cartItems, total, user }) => {
  const [state, setState] = useState({})

    const handleChange = (e) => {

        const { name, value } = e.target

        setState(p => ({ ...p, [name]: value }))

    }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        cartItems  = orderCartItems(cartItems)
        const response = await (new httpRequest(apiRoutes.order.CREATE_ORDER)).post({ cartItems, total, userId: user.id,...state });
        setState( p => ({...p,["error"]:''}))
      } catch (error) {
      console.log(error)
      setState( p => ({...p,["error"]:error.response.data}))
    }
  }
  useEffect(() => {
      setState(p => ({...p,['cities']:cities.map((city,index) => {
        return {
          label: city.name,
          value: city.name
      }
      })}))
  },[])
  const orderCartItems = cartItems => {
    
    let new_obj = {};
    new_obj["packages"] = cartItems.filter(cItem => cItem.package_name)
    new_obj["products"] = cartItems.filter(cItem => !cItem.package_name).sort((a,b) => a.category_id - b.category_id)
    
    return new_obj
  }
  const handleChangeSelect = (value, name) => {
    setState(p => ({ ...p, [name]: value.value }))
}

  return (
    <CheckoutPageContainer>
      <CheckoutHeaderContainer>
        <HeaderBlockContainer>
          <span>Product</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Description</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Quantity</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Price</span>
        </HeaderBlockContainer>
        <HeaderBlockContainer>
          <span>Remove</span>
        </HeaderBlockContainer>
      </CheckoutHeaderContainer>
      {cartItems.map(cartItem => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <TotalContainer>TOTAL: ${total}</TotalContainer>
      <Container fluid>
        <Row className="d-flex justify-content-center mt-3">
          <Col md="12">
            <CardComponent
              title={jsonForm.CREATE_ORDER.title}
              body={
                <FormComponent
                  inputs={jsonForm.CREATE_ORDER.fields}
                  handleChange={handleChange}
                  options={state['cities']}
                  handleChangeSelect={handleChangeSelect}
                  
                />}
              footer={
                <>
                  <div className='d-flex justify-content-center'>
                    <Button onClick={handleSubmit}>SEND ME THE ORDER</Button>
                  </div>
                  <div className='d-flex justify-content-center'>
                    <small className='text-danger'>{state['error']}</small>
                  </div>
                </>
              }
            />
          </Col>
        </Row>
      </Container>
     
    </CheckoutPageContainer>
  );

}
const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  total: selectCartTotal,
  user: selectCurrentUser
});

export default connect(mapStateToProps)(CheckoutPage);
