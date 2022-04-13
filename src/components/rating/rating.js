
import {
    MDBIcon,

} from 'mdb-react-ui-kit';
import { useState } from 'react'
const Rating = ({ rate }) => {
    
    const renderStars = () => {
        let stars = []
        for (let i = 0; i < 5; i++) {
            if (i < rate)
                stars.push(<MDBIcon fas icon="star" color='warning' key ={i} />)
            else
                stars.push(<MDBIcon fas icon="star"  key ={i} />)
        }
        return stars
    }
    return (
      
         <div>{renderStars()}</div>  
    )
}


export default Rating