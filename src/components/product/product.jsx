import React, { useState, useEffect } from 'react'
import {
    MDBCarousel,
    MDBCarouselInner,
    MDBCarouselItem,
    MDBCarouselElement,
    MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter,
    MDBBtn, MDBIcon
} from 'mdb-react-ui-kit';
import { Form, Button, Col, Container, Row, Card } from 'react-bootstrap';
import 'react-slideshow-image/dist/styles.css'
import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions';
import 'react-slideshow-image/dist/styles.css'

const Product = ({ product, addItem }) => {
    const [productItem, setProductItem] = useState(product);
    return (
        <>
            <MDBCard alignment='left' style={{ maxWidth: '17rem' }} className='shadow-lg rounded-2 border-bottom-0 '>
                <MDBCarousel showControls>
                    <MDBCarouselInner>
                        {
                            
                            product?.images?.map((image, index) => {
                                    return (
                                        <MDBCarouselItem className={index == 0 ? 'active' : ""} key={index}  >
                                            <MDBCarouselElement
                                                className="d-block w-100 h-100 product-img pattern-2"
                                                src={`${image}`}     
                                            />
                                        </MDBCarouselItem>
                                    )
                                })
                        }
                    </MDBCarouselInner>
                </MDBCarousel>

                <MDBCardBody>
                    <MDBCardTitle>{product.product_name}</MDBCardTitle>
                    <MDBCardText>
                        {product.description} <br />
                        <span className="badge  bg-primary">
                        {/* {product.price} $ */}
                         </span>
                      
                    </MDBCardText>
                </MDBCardBody>
              
                <MDBCardFooter className='text-muted'>
                    <div className='d-flex justify-content-between w-100'>
                        <Button   size='sm' variant='outline-secondary' onClick={() =>  addItem(product)}>Add To Cart <MDBIcon fas icon="cart-plus" />
                        </Button>
                        <Button size='sm' variant='outline-primary'>See More <MDBIcon far icon="eye" /></Button>
                    </div>
                </MDBCardFooter>
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
