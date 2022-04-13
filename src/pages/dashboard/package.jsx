import React, { useState, useEffect } from 'react';
import jsonForm from '../../config/formsSchema.json';
import apiRoutes from '../../config/routesApi.json'
import FormComponent from '../../ui/form/form';
import CardComponent from '../../ui/card/card'
import { Form, Button, Col, Container, Row, Card } from 'react-bootstrap';
import httpRequest from '../../classes/httpRequest'
import { useHistory } from 'react-router-dom';
import {withRouter, RouteComponentProps} from "react-router";
import { MDBTable, MDBTableHead, MDBTableBody, MDBIcon } from 'mdb-react-ui-kit';
import EditTable from '../../components/edit-table/edit-table'
const Package = ({match}) => {
    const [state, setState] = useState({})
    const history = useHistory()
    const [edit, setEdit] = useState({})
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
                        packagesList:responsePackages.data
                    }))
                } else {
                    history.push("/dashboard/category")
                }
            } catch(err) {
                console.log(err)
                history.push("/login")
            }

        })()
    }, [])
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
            setState(p => ({ ...p, ["error"]: '' }))
        } catch (error) {
            setState(p => ({ ...p, ["error"]: error.response.data }))
        }
    }
    if (!state['productsList']) {
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
                            title={jsonForm.CREATE_PACKAGE.title }
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
                <MDBTable striped className='border' responsive>
            <MDBTableHead>
                <tr>
                    {Object.keys(state.packagesList).map(col => {
                        return (
                            <th key={col} className='text-center'>{col}</th>
                        )
                    })}
                    <th>EDIT</th>
                    <th>DELETE</th>
                </tr>
            </MDBTableHead>
            <MDBTableBody>
                {Object.values(state.packagesList).map((row, index) => {
                    return (
                        <tr>

                            {
                                Object.values(row).map((td,x) => {
                                    if(!Array.isArray(td)){
                                        
                                    let content = !edit[index] ? (<td >{td}</td>) :
                                        (<td><input onChange={(event) => handleChange(event ,index,Object.keys(row)[x])}
                                         className="w-50" 
                                         type={!isNaN(td) ? "number" : "text"} defaultValue={td}/></td>)
                                    return (
                                        content
                                    )
                                    }
                                })
                            }
                            <td><MDBIcon icon="trash" ></MDBIcon></td>
                        </tr>
                    )
                })}
            </MDBTableBody>
        </MDBTable>
                </Row>
            </Container>
        </>
    )


}

export default withRouter(Package)
