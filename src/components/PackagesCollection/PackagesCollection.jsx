import React from 'react';
import Package from '../package/package'
import { MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';


const PackagesCollection = ({ packages }) => {

    return(
    
        <MDBRow className='mb-5' >
            {
                packages.map((packagesRow, index) => {
                    return (
                            <MDBCol col="4"  key={index} >
                                <Package packageItem={packagesRow} />
                            </MDBCol>
                        )
                })
            }
            
        </MDBRow>
    )
}


export default PackagesCollection