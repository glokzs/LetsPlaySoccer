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
        let checkNumber = this.state.phone.includes('_')
        const array = ["700", "701", "702", "705", "707", "708", "747", "771", "775", "776", "777", "778"]
        let checkOperator = array.includes(this.state.phone.slice(3, 6));
        if (checkNumber == false && checkOperator == true) {
            if(window.confirm("Убедитесь что номер введён правильно "+this.state.phone)) {
                this.props.loginUser(this.state);
            }
        } else {
            alert("Вы ввели номер неверно");
        }
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
        console.log(this.state.phone.slice(3, 6));

        return (
            <>
                <div className="container-login">
                    <div className="logo text-center">
                        <img className="border-bottom border-secondary" src=""/>
                    </div>
                    <h1 className="text-center title">Вход в систему</h1>
                    {
                        this.props.error ? <span>Введён неверный логин или пароль</span> : null
                    }
                    <Form onSubmit={this.onSubmitHandler} >
                        <Form.Group controlId="formGroupPhone">
                            <MaskedFormControl onChange={this.updateInputPhone} className="input" name='phoneNumber' mask='8 (111) 111-11-11' required />
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
                </div>
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