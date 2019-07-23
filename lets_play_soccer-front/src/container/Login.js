import React, {Component} from 'react';
import {connect} from "react-redux";
import {Form, Button, Container} from 'react-bootstrap';
import { loginUser } from '../store/actions/action';
import { NavLink } from "react-router-dom";
import './Login.css';


class Login extends Component {

    state = {
        phone: '',
        password: ''
    }

    onSubmitHandler = e => {
        e.preventDefault();
        this.props.loginUser(this.state);
    };
    updateInputPhone = (e) => {
        e.preventDefault();
        this.setState({ phone: e.target.value });
    };
    updateInputPassword = (e) => {
        e.preventDefault();
        this.setState({ password: e.target.value });
    };
    render() {
        return (
            <>
                <Container>
                    <div className="logo">
                        <img className="border-bottom border-secondary" src=""/>
                    </div>
                    <h1 className="text-center title">Вход в систему</h1>
                    {
                        this.props.error ? <span>Введён неверный логин или пароль</span> : null
                    }
                    <Form onSubmit={this.onSubmitHandler} >
                        <Form.Group controlId="formGroupPhone">
                            {/* <Form.Label>Phone number</Form.Label> */}
                            <Form.Control className="input" maxLength="11" onChange={this.updateInputPhone} type="phone" placeholder="Номер телефона" required />
                        </Form.Group>
                        <Form.Group controlId="formGroupPassword">
                            {/* <Form.Label>Password</Form.Label> */}
                            <Form.Control className="input" onChange={this.updateInputPassword} type="password" placeholder="Пароль" required />
                        </Form.Group>
                        <div className="text-right">
                            <NavLink to="">Забыли пароль?</NavLink>
                        </div>
                        <div className="mt-5 mb-2">
                            <Button type="submit" variant="primary" size="lg" block>Войти</Button>
                        </div>
                    </Form>
                    <div>
                        <span>Ещё нет аккаунта? <NavLink to="/register">Создайте </NavLink>прямо сейчас</span>
                    </div>
                </Container>
            </>
        )
    }    
}


const mapStateToProps = state => {
    return {
        error: state.users.loginError,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        loginUser: (userData) => dispatch(loginUser(userData))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);