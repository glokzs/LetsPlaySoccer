import React, {Component} from 'react';
import {connect} from "react-redux";
import {Form, Button, Container} from 'react-bootstrap';
import {registerUser} from '../store/actions/action';

class Register extends Component {
    state = {
        phone: '',
        password: '',
        firstname: '',
        lastname: ''
    }

    updateInputPhone = (e) => {
        e.preventDefault()
        this.setState({ phone: e.target.value })
    }
    updateInputFirstname = (e) => {
        e.preventDefault()
        this.setState({ firstname: e.target.value })
    }
    updateInputLastname = (e) => {
        e.preventDefault()
        this.setState({ lastname: e.target.value })
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
                    <h1 className="text-center title">Регистрация</h1>
                    <div>
                        <Form onSubmit={this.submitFormHandler} >
                            <Form.Group controlId="formGroupPhone">
                                {/* <Form.Label>Phone number</Form.Label> */}
                                <Form.Control className="input" onChange={this.updateInputPhone} type="phone" placeholder="Номер телефона" required />
                            </Form.Group>
                            <Form.Group controlId="formGroupUsername">
                                {/* <Form.Label>Your name</Form.Label> */}
                                <Form.Control className="input" onChange={this.updateInputFirstname} type="text" placeholder="Имя" required />
                            </Form.Group>
                            <Form.Group controlId="formGroupUsername">
                                {/* <Form.Label>Your name</Form.Label> */}
                                <Form.Control className="input" onChange={this.updateInputLastname} type="text" placeholder="Фамилия" required />
                            </Form.Group>
                            <Form.Group controlId="formGroupPassword">
                                {/* <Form.Label>Password</Form.Label> */}
                                <Form.Control className="input" onChange={this.updateInputPassword} type="password" placeholder="Пароль" required />
                            </Form.Group>
                            <div>
                                <Button type="submit" variant="primary" size="lg" block>Создать</Button>
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