import React,{useState,useEffect} from 'react';
import jsonForm from '../config/formsSchema.json';
import apiRoutes from '../config/routesApi.json'
import FormComponent from '../ui/form/form';
import CardComponent from '../ui/card/card'
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { Form,Button ,Col,Container,Row,Card} from 'react-bootstrap';
import httpRequest from '../classes/httpRequest'
import { setCookies } from '../helpers/functionUtils';
import { useHistory } from 'react-router-dom';
import {withRouter, RouteComponentProps} from "react-router";
import { setCurrentUser } from '../redux/user/user.actions';
import {selectCurrentUser} from '../redux/user/user.selectors'
import { MDBBtn } from "mdbreact";
const Login = ({setCurrentUser}) => {
    const [state,setState] = useState({}) 
    const history = useHistory()

    const handleChange = (e) => {
        const {name,value} = e.target
        setState( p => ({...p,[name]:value}))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await (new httpRequest(apiRoutes.user.LOGIN).post(state))
            const dateToRemoveCookie = new Date().setTime(
                new Date().getTime() + 7 * 24 * 60 * 60 * 1000,
            );
            setCookies("token",response.data.token,dateToRemoveCookie)
            setState( p => ({...p,["error"]:''}))
            setCurrentUser(response.data.user)
            history.push("/")
        } catch (error) {
            setState( p => ({...p,["error"]:error.response.data}))
        }
    }

    return(
        <>
    <Container fluid>
      <Row className ="d-flex justify-content-center mt-3">
      <Col md="4">
       <CardComponent 
        title = {jsonForm.LOGIN.title}
        body = {
            <FormComponent 
                inputs = {jsonForm.LOGIN.fields} 
                handleChange ={handleChange}
                handleSubmit ={handleSubmit}
                error = {state['error']}
            />}
        footer = {
        <>
             <div className='d-flex flex-column align-items-center'>
                                        <Button variant = "dark"  onClick={handleSubmit}>SUBMIT</Button>
                                       
                                       
                                    </div>
        <div>You dont have an account ? <a onClick={() => history.push("/register")} className='link'> register</a></div>
        </>
        } 
        />
      </Col>
      </Row>
      </Container>
      </>
        )


}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
});
  const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Login));