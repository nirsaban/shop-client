import React, { useState, useEffect } from 'react';
import jsonForm from '../../config/formsSchema.json';
import apiRoutes from '../../config/routesApi.json'
import FormComponent from '../../ui/form/form';
import CardComponent from '../../ui/card/card'
import { Form, Button, Col, Container, Row, Card } from 'react-bootstrap';
import httpRequest from '../../classes/httpRequest'
import { useHistory } from 'react-router-dom';
import { withRouter, RouteComponentProps } from "react-router";
import EditTable from '../../components/edit-table/edit-table'
const Package = ({ match }) => {
    const [state, setState] = useState({})
    const history = useHistory()
    const [edit, setEdit] = useState(false)
    useEffect(() => {
        
        (async () => {
            try {
                const response = await (new httpRequest(apiRoutes.product.GET_PRODUCTS)).get();
                const responsePackages = await (new httpRequest(apiRoutes.package.GET_PACKAGES)).get();
                if (response.status == 200 && response.data.length > 0) {
                    setState(p => ({
                        ...p, productsList: response.data.map(({ product_name, id, description, price }) => {
                            return {
                                label: `${product_name}  : ${description}`,
                                value: id,
                                price
                            }
                        }),
                        packagesList: responsePackages.data.result
                    }))
                } else {
                    history.push("/dashboard/category")
                }
            } catch (err) {
               
            }

        })()
    }, [])
    useEffect(() => {

    }, [edit])
    const handleChange = (e) => {
        const { name, value } = e.target

        setState(p => ({ ...p, [name]: value }))
    }
    const handleChangeSelect = (value, name) => {
        let productIds = value.map(({ value }) => value)
        calculatePrice(productIds)
        setState(p => ({ ...p, [name]: productIds }))
    }
    
    
    const calculatePrice = (ids) => {
        let totalPrice = state.productsList.filter(p => ids.includes(p.value)).map(p => p.price).reduce((x, y) => parseInt(x) + parseInt(y))
        setState(p => ({ ...p, ["totalPrice"]: totalPrice }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await (new httpRequest(apiRoutes.package.CREATE_PACKAGE).post(state))
            setState(p => ({ ...p, ["error"]: '',packagesList:response.data.result }))
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
                            title={jsonForm.CREATE_PACKAGE.title}
                            body={
                                <FormComponent
                                    inputs={jsonForm.CREATE_PACKAGE.fields}
                                    handleChange={handleChange}
                                    options={state['productsList']}
                                    handleChangeSelect={handleChangeSelect}
                                />}
                            footer={
                                <>
                                    <div className='d-flex flex-column align-items-center'>
                                        <Button onClick={handleSubmit}>SUBMIT</Button>


                                    </div>

                                    <div className='d-flex justify-content-center'>
                                        <small className='text-danger'>{state['error']}</small>
                                        <span className="text-success"> {state['totalPrice']} $</span>
                                    </div>
                                </>
                            }
                        />
                    </Col>
                </Row>
                <Row>
                {
                    state['packagesList'] &&  state['packagesList']?.length > 0
                ? 
                <EditTable 
                        tds = {state.packagesList}
                        ths = {state.packagesList[0]}
                        path = {apiRoutes.package.DELETE_PACKAGE}
                        setState = {setState}
                        param = {"packagesList"}
                    />   
                :
                null    
                }
                </Row>
            </Container>
        </>
    )


}

export default withRouter(Package)
