import React,{useState} from 'react';
import jsonForm from '../../config/formsSchema.json';
import FormComponent from '../../ui/form/form';
import CardComponent from '../../ui/card/card'
import { Form, Button, Col, Container, Row, Card } from 'react-bootstrap';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
 
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
    <div className="grey-text">
    <FormComponent 
                inputs = {jsonForm.CONTACT.fields} 
                handleChange ={handleChange}
                handleSubmit ={handleSubmit}
                error = {state['error']}
        />
        </div>
    <div className="text-center">
              <Button outline color="dark" onClick = {handleSubmit}>
                Send
                <MDBIcon far icon="paper-plane" color = "dark" className="ml-1" />
              </Button>
    </div>
    </MDBCol>
    </MDBRow>
    </Container>
    )
}

export default Contact