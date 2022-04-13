import React from 'react';
import Product from '../product/product'
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 2 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };

const ProductsCollection = ({ products }) => {

    console.log(products)
    return(

        products.map((productRow, index) => {
            return (
                <>
                <h3>
                   {productRow[0].cat_name}
                </h3>
                <Carousel
                title  = "test"
                responsive={responsive}
                >
               
                    {
                        productRow.map((product, x) => {
                            
                            return (
                                <MDBCol  key={x} className='mb-3 d-flex justify-content-center'>
                                    <Product product={product} />
                                </MDBCol>
                            )
                        })
                    }
               
                </Carousel>
            </>
            )
        })
    )
}


export default ProductsCollection