import React from 'react';
import { useEffect,useState } from "react";
import { useLocation } from "react-router-dom";
import {motion, MotionConfig} from "framer-motion";
import AnimatedText from 'react-animated-text-content';
import { MDBTypography,MDBBox  } from 'mdbreact'
import './viewProduct.css';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import {
    MDBCarousel,
    MDBCarouselInner,
    MDBCarouselItem,
    MDBCarouselElement,
    MDBCarouselCaption,
    MDBIcon
  } from 'mdb-react-ui-kit';
  import { addItem } from '../../redux/cart/cart.actions';
  import { Form, Button, Col, Container, Row, Card } from 'react-bootstrap';
const ViewProduct = ({addItem}) => {
    const location = useLocation();
    const [product,setProduct] = useState({})
     useEffect(() => {
       console.log(location.pathname); // result: '/secondpage'
       console.log(location.search); // result: '?query=abc'
       console.log(location.state.product); // result: 'some_value'
      setProduct(location.state.product)
    }, [location])
    const history = useHistory();
    return(
<Container className  ="d-flex justify-content-center flex-column align-items-center mt-3" >
 <div className='d-flex w-100 justify-content-end'>
  <Button className = " bg-dark button-card p-2" onClick={() => history.goBack()}>Back</Button>
 </div>
  <Col md="5" lg ="8" sm ="3"> 
    <MDBCarousel showIndicators showControls fade className='about-section' >
      <MDBCarouselInner>
      {
        product?.images?.map((image,index) => {
           return (
        <MDBCarouselItem className={index == 0 ? 'active' : ""}>
        <MDBCarouselCaption>
            <AnimatedText 
            type="words" // animate words or chars
            animation={{
                x: '200px',
                y: '-20px',
                scale: 1.1,
                ease: 'ease-in-out',
            }}
            animationType="float"
            interval={0.06}
            duration={0.8}
            tag="p"
            className="animated-paragraph"
            includeWhiteSpaces
            threshold={0.1}
            rootMargin="20%"
        >
        {product?.content}
        </AnimatedText>
          </MDBCarouselCaption>
          <MDBCarouselElement 
          
          className="d-block w-100 h-100 product-img pattern-2"
          
          src={`${image}`} alt='...' 
          
           />
          
        </MDBCarouselItem>
            )

          })
      }
      </MDBCarouselInner>
    </MDBCarousel>
  </Col>
  <Col md="5" lg ="8" sm ="3"> 
  <MDBTypography tag='h5' variant="h5">{product.cat_name}/{product.product_name}</MDBTypography>
    <MDBTypography blockquote className="text-right">
        <MDBBox tag="footer" mb={3} className="blockquote-footer">{product.description}</MDBBox>
        <MDBBox tag="footer" mb={3} className="blockquote-footer">{product.price} ש"ח</MDBBox>
    </MDBTypography>
    <Button size="sm" className='text-black button-card p-3   dusty-grass-gradient color-block-5  mx-auto  m-1' onClick={() => addItem(product)} > Add To Cart <MDBIcon fas icon="cart-plus" /></Button>
    
  </Col>
</Container>
    )


}

const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
});

export default connect(
    null,
    mapDispatchToProps
)(ViewProduct);