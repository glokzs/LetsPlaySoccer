import React, {Component} from 'react';
import {connect} from "react-redux";
import {Form, Button, Container} from 'react-bootstrap';
import { loginUser } from '../store/actions/action';
import { NavLink } from "react-router-dom";
import FormElement from '../components/FormElement';
import MaskedFormControl from 'react-bootstrap-maskedinput';
import './Login.css';


class Login extends Component {

    state = {
        phone: '',
        password: ''
    }

    onSubmitHandler = e => {
        e.preventDefault();
        if (this.state.phone[16] !== "_") {
            this.props.loginUser(this.state);
        } else {
            alert("Вы ввели номер неверно")
        };
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
                            <MaskedFormControl onChange={this.updateInputPhone} className="input" name='phoneNumber' mask='8 (111) 111 11 11' required />
                        </Form.Group>
                        <FormElement onChange={this.updateInputPassword} type="password" placeholder="Пароль" />
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