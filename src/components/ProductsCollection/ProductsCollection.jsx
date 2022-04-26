import React from 'react';
import Product from '../product/product'
import { MDBContainer, MDBRow, MDBCol,MDBBadge } from 'mdb-react-ui-kit';
import { Carousel } from 'react-bootstrap';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
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
const colors = ["dark","secondary","danger","warning","success"];
const ProductsCollection = ({ products }) => {

    return(
        
        products.map((productRow, index) => {
            return (
                <>
                <div className='d-flex justify-content-center h3'> 
                <MDBBadge tag="a" color={colors[Math.floor(Math.random() * colors.length)]} >
                 
                    {productRow[0].cat_name}
                
                </MDBBadge>
                </div>
                <Swiper 
                        breakpoints={{
          // when window width is >= 640px
          640: {
            width: 640,
            slidesPerView: 1,
          },
          // when window width is >= 768px
            768: {
            width: 768,
            slidesPerView: 2,
             },
             }}
                 modules={[Navigation, Pagination, Scrollbar, A11y]}
                 spaceBetween={50}
                 slidesPerView={1}
                 navigation
                 pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}

                >
               
                    {
                        productRow.map((product, x) => {
                               
                            return (
                                <SwiperSlide className='d-flex justify-content-center'>
                                <MDBCol  key={x} className='mb-3 d-flex justify-content-center direction-rtl ' dir="rtl">
                                    <Product product={product} />
                                </MDBCol>
                                </SwiperSlide>
                            )
                        })
                    }
               
                </Swiper>
            </>
            )
        })
    )
}


export default ProductsCollection