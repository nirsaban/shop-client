import React, { useState } from 'react'
import './package.style.css'
import {
    MDBListGroup, MDBListGroupItem,
    MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter,
    MDBBtn, MDBIcon,

} from 'mdb-react-ui-kit';
import Rating from '../rating/rating'
import { Form, Button, Col, Container, Row, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addItem } from '../../redux/cart/cart.actions';


const Package = ({ packageItem, addItem }) => {
    
    const preperItem = (packageItem) => {
        packageItem.product_name = packageItem.package_name
        packageItem.images = [];
        return packageItem
    }
    return (

        <MDBCard style={{ width: '18rem' }} className='shadow-lg rounded mt-2 ' > 
            <MDBCardHeader className='bg-dark text-white'>
                <MDBCardTitle>
                    {packageItem.package_name}
                </MDBCardTitle>
                <MDBCardTitle>
                    <Rating rate={packageItem.rate} />
                </MDBCardTitle>
            </MDBCardHeader>
            <MDBCardBody bgColor='dark'>
                <MDBCardText className='border-dark shadow-2-strong'>
                    {packageItem.description}
                </MDBCardText>
                <MDBListGroup flush>
                    {
                        packageItem.products.map((product, index) => {
                            if (index < 5)
                                return (
                                    <MDBListGroupItem key={index}>
                                        {product.product_name}
                                    </MDBListGroupItem>
                                )
                        })
                    }
                </MDBListGroup>
                <MDBCardText>
                    <span className="badge rounded-pill bg-success ">
                        {packageItem.price} $
                    </span>
                </MDBCardText>
            </MDBCardBody>
            <MDBCardFooter className='text-muted' >
                <div className='d-flex justify-content-between w-100'>
                    <Button size='sm' variant='outline-dark' className="badge badge-pill badge-light " onClick={() => addItem(preperItem(packageItem))}>Buy now!! <MDBIcon fas icon="cart-plus" />
                    </Button>
                     <Button size='sm' variant='outline-dark' className="badge badge-pill badge-light border-right-0 border-dark ">
                        See more
                        <MDBIcon far icon="eye" />
                    </Button>
                </div>
            </MDBCardFooter>
        </MDBCard>

    )
}
const mapDispatchToProps = dispatch => ({
    addItem: item => dispatch(addItem(item))
});

export default connect(
    null,
    mapDispatchToProps
)(Package);
