import React,{useState} from 'react';
import jsonForm from '../../config/formsSchema.json';
import FormComponent from '../../ui/form/form';
import CardComponent from '../../ui/card/card'
import { Form, Button, Col, Container, Row, Card } from 'react-bootstrap';
import { FacebookLoginButton ,InstagramLoginButton} from "react-social-login-buttons";
import FloatingWhatsApp from 'react-floating-whatsapp'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBadge,
    MDBIcon,
  MDBInput,
} from "mdbreact";
import httpRequest from '../../classes/httpRequest'
import apiRoutes from '../../config/routesApi.json'

const Contact = () => {
    const [state, setState] = useState({})
    const handleChange = (e) => {
        const { name, value } = e.target
        setState(p => ({ ...p, [name]: value }))
    }   
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await (new httpRequest(apiRoutes.contact.CREATE).post(state))
            const dateToRemoveCookie = new Date().setTime(
                new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
            );
            setState(p => ({ ...p, ["error"]: '' }))
        } catch (error) {
            setState(p => ({ ...p, ["error"]: error.response.data }))
        }
    }
    return (
        
    <Container fluid  id = "contact">
    <MDBRow className = "d-flex justify-content-center mt-3">
    <MDBCol md="8">
    
    <p className="h2 text-center mb-4">כתבו לנו</p>
    <div className='d-flex justify-content-center '>

    <div className='d-flex'>
                 <FacebookLoginButton onClick={() => window.location.href ="https://www.facebook.com/%D7%9E%D7%91%D7%A8%D7%95%D7%A7-%D7%A2%D7%9C%D7%99%D7%9B%D6%BC-%D7%97%D7%99%D7%A0%D7%94-111882314674808/"}  className = "rounded-circle text-center">  </FacebookLoginButton>
                 <InstagramLoginButton onClick={() => window.location.href  = "https://instagram.com/mabruk_alik_hina?igshid=YmMyMTA2M2Y="} className = "text-center rounded-circle"> </InstagramLoginButton>
    </div>
    </div>
    <div className="grey-text">
    <FormComponent 
                inputs = {jsonForm.CONTACT.fields} 
                handleChange ={handleChange}
                handleSubmit ={handleSubmit}
                error = {state['error']}
        />
        </div>
    <div className="text-center d-flex flex-column align-items-center">
              <Button outline color="dark" onClick = {handleSubmit}>
                Send
                <MDBIcon far icon="paper-plane" color = "dark" className="ml-1" />
                
              </Button>
               
    </div>
    </MDBCol>
    </MDBRow>
    <FloatingWhatsApp
      phoneNumber='+972525937260'
      allowClickAway
      styles={{zIndex:'100000'}}
      notification
      notificationSound
      notificationDelay={30000}
      darkMode
      defaultMessage={"היי יש לי שאלה :)"}
      accountName=" מברוכ עליכ"
      placeholder='כתוב.י לנו משהו ☺'
     chatMessage = "אנחנו כאן לשירותך"
     statusMessage = {"Typically replies within 1/2 hour"}

    />
    </Container>
    
    )
}

export default Contact