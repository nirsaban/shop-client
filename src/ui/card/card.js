import {
    MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter,MDBCol,MDBRow,
    MDBBtn, MDBIcon,MDBBreadcrumb, MDBBreadcrumbItem,
} from 'mdb-react-ui-kit';





const CardComponent = ({title,body,footer}) => {

        return(
            <>
            <MDBCard >
               <MDBCardHeader >
                  <MDBCardTitle as="h4">{title}</MDBCardTitle>
               </MDBCardHeader>
                <MDBCardBody>
                  {body}
               </MDBCardBody>
                <MDBCardFooter >
                    {footer}
                </MDBCardFooter>
            </MDBCard>
            
            </>
        )
}



export default CardComponent