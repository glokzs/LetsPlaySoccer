import React, {Component} from 'react';
import {connect} from "react-redux";
import {Form, Button, Container} from 'react-bootstrap';
import {registerUser} from '../store/actions/action';

class Register extends Component {
    state = {
        phone: '',
        username: '',
        password: ''
    }

    updateInputPhone = (e) => {
        e.preventDefault()
        this.setState({ phone: e.target.value })
    }
    updateInputUsername = (e) => {
        e.preventDefault()
        this.setState({ username: e.target.value })
    }
    updateInputPassword = (e) => {
        e.preventDefault()
        this.setState({ password: e.target.value })
    }

    submitFormHandler = (e) => {
        e.preventDefault();
        this.props.registration(this.state)
    };

    render() {
        return (
            <>
                <Container>
                    <div className="logo">
                        <img className="border-bottom border-secondary" src=""/>
                    </div>
                    <h1 className="text-center">Регистрация</h1>
                    <div>
                        <Form onSubmit={this.submitFormHandler} >
                            <Form.Group controlId="formGroupPhone">
                                <Form.Label>Phone number</Form.Label>
                                <Form.Control onChange={this.updateInputPhone} type="phone" placeholder="Phone" required />
                            </Form.Group>
                            <Form.Group controlId="formGroupUsername">
                                <Form.Label>Your name</Form.Label>
                                <Form.Control onChange={this.updateInputUsername} type="text" placeholder="Username" required />
                            </Form.Group>
                            <Form.Group controlId="formGroupPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control onChange={this.updateInputPassword} type="password" placeholder="Password" required />
                            </Form.Group>
                            <div>
                                <Button type="submit" variant="primary" size="lg" block>Accept</Button>
                            </div>
                        </Form>
                    </div>

                </Container>
            </>
        );
    };
};

const mapDispatchToProps = dispatch => {
    return {
        registration: (data)=>{ dispatch(registerUser(data))}
    };
};

export default connect(null, mapDispatchToProps)(Register);