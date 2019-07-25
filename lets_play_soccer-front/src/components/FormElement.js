import React from 'react';
import { Form } from 'react-bootstrap';

const FormElement = (props) => {
    return (
        <>
            <Form.Group controlId="formGroupPhone">
                <Form.Control className="input" onChange={props.onChange} type={props.type} placeholder={props.placeholder} required />
            </Form.Group>
        </>
    );
};

export default FormElement;