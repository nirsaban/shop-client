import { Form, Button, Col, Container, Row, Card } from 'react-bootstrap';
import MultiSelect from '../select/select'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";

const FormComponent = ({ inputs, handleChange, handleChangeSelect, handleSubmit, error, options }) => {

    return (
        <form>
            {
                inputs.map(input => {
                    if (input.type == "select") {
                        return (<MultiSelect
                            key={input.name}
                            options={options}
                            label={input.name.split("_")[0].toUpperCase()}
                            handleChangeSelect={handleChangeSelect}
                            multi={input.multiple}
                            name={input.name}
                        />)
                    } else {
                        return (
                            <Col md={12} >
                                <MDBInput
                                    onChange={handleChange}
                                    name={input.name}
                                    label={input.name.toUpperCase().replaceAll("_", " ")}
                                    icon={input.icon ? input.icon : ''}
                                    group
                                    type={input.type}
                                    validate
                                    multiple
                                />
                            </Col>
                    )
                    }
                })
            }

            <div className="text-center">
                <small className='text-danger text-center'>{error}</small>
            </div>
        </form>
    )
}



export default FormComponent