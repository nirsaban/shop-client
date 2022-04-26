import React, { useState, useEffect } from 'react';
import jsonForm from '../../config/formsSchema.json';
import apiRoutes from '../../config/routesApi.json'
import FormComponent from '../../ui/form/form';
import CardComponent from '../../ui/card/card'
import { Form, Button, Col, Container, Row, Card } from 'react-bootstrap';
import httpRequest from '../../classes/httpRequest'
import { useHistory } from 'react-router-dom';
import { MDBTable, MDBTableHead, MDBTableBody,  MDBIcon } from 'mdb-react-ui-kit';
import EditTable from '../../components/edit-table/edit-table'
const Product = () => {

    const [state, setState] = useState({})
    const history = useHistory()
    useEffect(() => {
        (async () => {
            try {
                const response = await (new httpRequest(apiRoutes.category.GET_CATEGORIES)).get();
                const responseProducts = await (new httpRequest(apiRoutes.product.GET_PRODUCTS)).get();
                if (response.status == 200 && response.data.result.length > 0) {
                    setState(p => ({
                        ...p, categories: response.data.result.map(({ category_name, id }) => {
                            return {
                                label: category_name,
                                value: id
                            }
                        }),
                        productList:responseProducts.data
                    }))
                } else {
                    history.push("/dashboard/category")
                }
            } catch (err){
                alert(err)
            }

        })()
    }, [])
    const handleChange = (e) => {
        const { name, value, files } = e.target ? e.target : e
        setState(p => ({ ...p, [name]: name == 'images' ? files : value }))
    }
    const handleChangeSelect = (value, name) => {
        setState(p => ({ ...p, [name]: value.value }))
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
            const response = await (new httpRequest(apiRoutes.product.CREATE_PRODUCT).postForm(formData)) 
            setState(p => ({ ...p, ["error"]: '',productList:response.data.result }))
        } catch (error) {
            setState(p => ({ ...p, ["error"]: error.response.data }))
        }
    }
    const deleteItem = async ({id}) => {
        console.log(id)
        try {
            const response = await (new httpRequest(apiRoutes.product.DELETE_PRODUCT)).delete(id);
            setState(p => ({
             ...p, 
             productList: response.data
         }))
         } catch (error) {
            
        } 
    }
    if (!state['categories']) {
        return (
            <div>steal loading</div>
        )
    }
    return (
        <>
            <Container fluid>
                <Row className="d-flex justify-content-center mt-3">
                    <Col md="4">
                        <CardComponent
                            title={jsonForm.CREATE_PRODUCT.title}
                            body={
                                <FormComponent
                                    inputs={jsonForm.CREATE_PRODUCT.fields}
                                    handleChange={handleChange}
                                    options={state['categories']}
                                    handleChangeSelect={handleChangeSelect}

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
                    state['productList'] &&  state['productList']?.length > 0 
                    ?
                    <EditTable 
                        tds = {state.productList}
                        ths = {state.productList[0]}
                        path = {apiRoutes.product.DELETE_PRODUCT}
                        setState = {setState}
                        param = {"productList"}
                    />   

                    :
                    null
                }
                
                </Row>
            </Container>
        </>
    )


}

export default Product
