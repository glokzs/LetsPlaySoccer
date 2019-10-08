import React from 'react';
import { Form } from 'react-bootstrap';

const FormElement = (props) => {
    return (
        <>
            <Form.Group>
                <Form.Control
                    id={props.id}
                    className={"input " + props.className}
                    onChange={props.onChange}
                    type={props.type}
                    placeholder={props.placeholder}
                    required
                    name={props.name}
                />
            </Form.Group>
        </>
    );
};

export default FormElement;