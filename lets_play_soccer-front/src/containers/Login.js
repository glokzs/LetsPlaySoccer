import React, {Component} from 'react';
import {connect} from "react-redux";
import {Form, Button, Alert} from 'react-bootstrap';
import {clearUserErrors, loginUser} from '../store/actions/userAction';
import { NavLink } from "react-router-dom";
import FormElement from '../components/UI/FormElement';
import MobileInput from "../components/UI/MobileInput";
import Spinner from "../components/UI/Spinner";

class Login extends Component {

    state = {
        phone: '',
        password: '',
        loading: false
    };

    updateInput = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
        this.props.clearUserErrors()
    };
    updatePhoneInput = phone => {
        this.setState({phone});
        this.props.clearUserErrors()
    };

    onSubmitHandler = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('phoneNumber', '+7'+this.state.phone);
        formData.append('password', this.state.password);

        this.props.loginUser(formData);
    };

    render() {
        let form;
        if(this.state.loading){
            form = <Spinner />
        } else {
            form = (
                <div className="container-login">

                    <div className="logo text-center" />
                    <h1 className="text-center title">Вход в систему</h1>
                    {
                        this.props.error ? <Alert variant={'danger'}>{this.props.error.message}</Alert> : null
                    }
                    <Form onSubmit={this.onSubmitHandler} >
                        <MobileInput
                            value={this.state.phone}
                            onChange={this.updatePhoneInput}
                        />
                        <FormElement
                            onChange={this.updateInput}
                            type="password"
                            placeholder="Пароль"
                            name="password"
                            value={this.state.password}
                        />
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
            );
        }
        return (
            <div>
                {form}
            </div>
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
        loginUser: (userData) => dispatch(loginUser(userData)),
        clearUserErrors: () => dispatch(clearUserErrors()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
