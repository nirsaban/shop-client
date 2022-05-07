import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import {Navbar} from 'react-bootstrap'
import { MDBTypography, MDBBox } from 'mdbreact';
const FooterPage = () => {
  return (
    <MDBFooter className="font-small pt-4 mt-4 bg-dark footer" id ="footer">
      <MDBContainer fluid className="text-center text-md-left bg-dark">
        <MDBRow className="bg-dark">
          <MDBCol md="6">
            <h5 className="title">מברוק עליכ</h5>
            <Navbar.Brand href="#">
                <img
                 src="/test.png"
                 width="60"
                 height="60%"
                className="d-inline-block align-top rounded-circle"
                alt="מברוכ עליכ לוגו"
                />
             </Navbar.Brand>
          </MDBCol>
          <MDBCol md="6" className = "bg-dark"> 
            
            <ul className = "mt-2 bg-dark">
              <li className="list-unstyled">
              
                <a href="#!">
                <MDBBox tag="footer" mb={3} className="text-warning">השכרות ציוד</MDBBox>
                </a>
              </li>
              <li className="list-unstyled">
              <a href="#!">
              <MDBBox tag="footer" mb={3} className=" text-warning">
                הפקות חינה 
              </MDBBox>
              </a>
              </li>
              <li className="list-unstyled">
              <a href="#!">
              <MDBBox tag="footer" mb={3} className=" text-warning">
                הפקת אירועים בכל הגדלים
                </MDBBox>
                </a>
              </li>
              <li className="list-unstyled">
                <a href="#!">
              <MDBBox tag="footer" mb={3} className="prod text-warning">
                שמלות ותלבושת עבודת יד
                </MDBBox>
                </a>
              </li>
            </ul>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Copyright: <a href="https://instagram.com/nirsa11?igshid=YmMyMTA2M2Y="> Nirsa11 Media </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;