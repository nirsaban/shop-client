import React, { useState } from 'react';
import jsonForm from '../config/formsSchema.json';
import FormComponent from '../ui/form/form';
import CardComponent from '../ui/card/card'
import { Col, Container, Row,Button } from 'react-bootstrap';

import httpRequest from '../classes/httpRequest'
import apiRoutes from '../config/routesApi.json'
import { setCookies } from '../helpers/functionUtils';
import { useHistory } from 'react-router-dom';
import { setCurrentUser } from '../redux/user/user.actions';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {withRouter, RouteComponentProps} from "react-router";
const Register = ({ setCurrentUser }) => {

    const [state, setState] = useState({})
    const history = useHistory()

    const handleChange = (e) => {
        const { name, value } = e.target
        setState(p => ({ ...p, [name]: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await (new httpRequest(apiRoutes.user.REGISTER).post(state))
            const dateToRemoveCookie = new Date().setTime(
                new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
            );
            setCookies("token", response.data.token, dateToRemoveCookie)
            setCurrentUser(response.data.user)
            setState(p => ({ ...p, ["error"]: '' }))
            history.push("/")
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
                            title={jsonForm.REGISTER.title}
                            body={
                                <FormComponent inputs={jsonForm.REGISTER.fields}
                                    handleChange={handleChange}
                                    handleSubmit={handleSubmit}
                                    error={state['error']}
                                />}
                            footer={
                                <>
                                 <div className='d-flex flex-column align-items-center'>
                                        <Button onClick={handleSubmit}>SUBMIT</Button>
                                       
                                       
                                    </div>
                            <div>Already have an account ? <a onClick={() => history.push("/login")} className='link'> Login</a></div>
                            </>
                            }
                        />
                    </Col>
                </Row>
            </Container>
        </>
    )


}


const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default withRouter(connect(null,    mapDispatchToProps
)(Register));