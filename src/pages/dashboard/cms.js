import React, { useState, useEffect } from 'react';
import jsonForm from '../../config/formsSchema.json';
import apiRoutes from '../../config/routesApi.json'
import FormComponent from '../../ui/form/form';
import CardComponent from '../../ui/card/card'
import { Form, Button, Col, Container, Row, Card } from 'react-bootstrap';
import httpRequest from '../../classes/httpRequest'
import EditTable from '../../components/edit-table/edit-table'

const Category = () => {

    const [state, setState] = useState({})
    useEffect(() => {
        (async () => {
            try {
                const response = await (new httpRequest(apiRoutes.category.GET_CATEGORIES)).get();
                if (response.status == 200 && response.data.result.length > 0) {
                    setState(p => ({
                        ...p, categories: response.data.result
                    }))
                } else {
                   
                }
            } catch (err){
               
            }
        })()
    }, [])
    const handleChange = (e) => {

        const { name, value } = e.target

        setState(p => ({ ...p, [name]: value }))

    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await (new httpRequest(apiRoutes.category.CREATE_CATEGORY).post(state))
            setState(p => ({
                ...p, categories: response.data.result
            }))
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
                <Row>
                {
                    state['categories'] &&  state['categories']?.length > 0
                ? 
                <EditTable 
                        tds = {state.categories}
                        ths = {state.categories[0]}
                        path = {apiRoutes.category.DELETE_CATEGORY}
                        setState = {setState}
                        param = {"categories"}
                    />   
                :
                null
                }
                </Row>
            </Container>
        </>
    )


}

export default Category
