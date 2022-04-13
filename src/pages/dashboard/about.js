import React, { useState, useEffect } from 'react';
import jsonForm from '../../config/formsSchema.json';
import apiRoutes from '../../config/routesApi.json'
import FormComponent from '../../ui/form/form';
import CardComponent from '../../ui/card/card'
import { Form, Button, Col, Container, Row, Card } from 'react-bootstrap';
import httpRequest from '../../classes/httpRequest'
import { useHistory } from 'react-router-dom';


const AboutUs = () => {

    const [state, setState] = useState({})
    const history = useHistory()

    const handleChange = (e) => {

        const { name, value, files } = e.target ? e.target : e

        setState(p => ({ ...p, [name]: name == 'images' ? files : value }))

    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        var formData = new FormData();
        for (const key of Object.keys(state.images)) {
            formData.append('images', state.images[key])
        }
        for (let i in state) {
            formData.append(i, state[i])
        }

        try {
            const response = await (new httpRequest(apiRoutes.about.CREATE_ABOUT).postForm(formData))
          
            setState(p => ({ ...p, ["error"]: '' }))
        } catch (error) {
            setState(p => ({ ...p, ["error"]: error.response.data }))
        }
    }

    return (
        <>
            <Container fluid>
                <Row className="d-flex justify-content-center mt-3">
                    <Col md="4">
                        <CardComponent
                            title={jsonForm.CREATE_ABOUT.title}
                            body={
                                <FormComponent
                                    inputs={jsonForm.CREATE_ABOUT.fields}
                                    handleChange={handleChange}
                                />}
                            footer={
                                <>
                                    <div className='d-flex justify-content-center'>
                                        <Button onClick={handleSubmit}>SUBMIT</Button>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <small className='text-danger'>{state['error']}</small>
                                    </div>
                                </>
                            }
                        />
                    </Col>
                </Row>

            </Container>
        </>
    )


}

export default AboutUs
