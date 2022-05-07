import React, { useState, useEffect } from 'react'
import {
    MDBCarousel,
    MDBCarouselInner,
    MDBCarouselItem,
    MDBCarouselElement,
    MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter,
    MDBBtn, MDBIcon
    , MDBBadge

} from 'mdb-react-ui-kit';
import { MDBTypography, MDBBox } from 'mdbreact';
import { Form, Button, Col, Container, Row, Card } from 'react-bootstrap';
import 'react-slideshow-image/dist/styles.css'
import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions';
import 'react-slideshow-image/dist/styles.css'
import { useHistory } from 'react-router-dom';
const Product = ({ product, addItem }) => {
    const [productItem, setProductItem] = useState(product);
    const history = useHistory()
    return (
        <>
            <MDBCard alignment='right' style={{ maxWidth: '17rem' }} className='border-bottom-2 border-right-0 border-left-0 mb-2 '>
                <MDBCarousel showControls >
                    <MDBCarouselInner>
                        {

                            product?.images?.map((image, index) => {
                                return (
                                    <>
                                        
                                            <MDBCarouselItem className={index == 0 ? 'active' : ""} key={index}  >
                                                <MDBCarouselElement
                                                    className="d-block w-100 h-100 product-img pattern-2"
                                                    src={`${image}`}
                                                />
                                          
                                            {/* <Card.Img variant="top" src={`${image}`}   className = "d-block w-100 h-100 product-img pattern-2 "   />  */}
                                        </MDBCarouselItem>
                                    </>
                                )
                            })
                        }
                    </MDBCarouselInner>
                </MDBCarousel>

                <MDBCardBody className='cloudy-knoxville-gradient color-block-5 mb-3 rounded-5'>
                    <MDBCardTitle className="text-right  h4">{product.product_name}</MDBCardTitle>
                    <MDBCardText className="text-right">
                        <MDBBox tag="p">
                            <u>{product.description}</u>
                        </MDBBox>
                    </MDBCardText>
                    <div className='d-flex justify-content-between' >

                        <Button size="sm" className='text-black button-card  dusty-grass-gradient color-block-5  mx-auto  m-1' onClick={() => addItem(product)} > Add To Cart <MDBIcon fas icon="cart-plus" /></Button>
                        <Button size="sm" className='text-black  button-card  aqua-gradient color-block-5  mx-auto m-1' 
                            onClick= { () => history.push({
                                pathname: '/view-product',
                                state: { product}
                                })}>
                                View More 
                        <MDBIcon far icon="eye" /></Button>
                </div>
            </MDBCardBody>

        </MDBCard>

        </>
    )

}


const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
});

export default connect(
    null,
    mapDispatchToProps
)(Product);
