import React, { useState, useEffect } from 'react';
import jsonForm from '../../config/formsSchema.json';
import apiRoutes from '../../config/routesApi.json'
import FormComponent from '../../ui/form/form';
import CardComponent from '../../ui/card/card'
import { Form, Button, Col, Container, Row, Card } from 'react-bootstrap';
import httpRequest from '../../classes/httpRequest'


const Category = () => {

    const [state, setState] = useState({})

    const handleChange = (e) => {

        const { name, value } = e.target

        setState(p => ({ ...p, [name]: value }))

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await (new httpRequest(apiRoutes.category.CREATE_CATEGORY).post(state))
           
        } catch (error) {

        }
    }

    return (
        <>
            <Container fluid>
                <Row className="d-flex justify-content-center mt-3">
                    <Col md="4">
                        <CardComponent
                            title={jsonForm.CREATE_CATEGORY.title}
                            body={
                                <FormComponent
                                    inputs={jsonForm.CREATE_CATEGORY.fields}
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

export default Category
