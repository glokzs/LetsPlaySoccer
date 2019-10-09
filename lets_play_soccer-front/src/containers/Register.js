import React, {Component} from 'react';
import {connect} from "react-redux";
import {Form, Button, Alert} from 'react-bootstrap';
import {clearUserErrors, confirmedPhoneNumber, loginUser} from '../store/actions/userAction';
import FormElement from '../components/UI/FormElement';
import MobileInput from "../components/UI/MobileInput";
import Spinner from "../components/UI/Spinner";
import {Redirect} from "react-router";
import {NavLink} from "react-router-dom";

class Register extends Component {
    state = {
        phone: '',
        password: '',
        displayName: '',
        loading: false
    };

    updateInput = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
        this.props.clearUserErrors();
    };
    updatePhoneInput = phone => {
        this.setState({phone});
        this.props.clearUserErrors();
    };

    submitFormHandler = (e) => {
        e.preventDefault();
        const user = {};

        user.phoneNumber = '+7'+this.state.phone;
        user.password = this.state.password;
        user.displayName = this.state.displayName;

        this.props.sendToValidateAndGenerateCode(user);
    };

    render() {
        let form;
        if(this.state.loading){
            form = <Spinner />
        } else {
            form = (
                <div className="container-login" >
                    <div className="logo text-center" />
                    <h1 className="text-center title">Регистрация</h1>
                    <div>
                        <Form onSubmit={this.submitFormHandler} >
                            <FormElement
                                onChange={this.updateInput}
                                type="text"
                                placeholder="ФИО"
                                name="displayName"
                                value={this.state.displayName}
                            />
                            <MobileInput
                                value={this.state.phone}
                                onChange={this.updatePhoneInput}
                            />
                            {(this.props.registerError && this.props.registerError.message) ?
                                <Alert variant={'danger'}>{this.props.registerError.message}</Alert>: null
                            }
                            <FormElement
                                onChange={this.updateInput}
                                type="password"
                                placeholder="Пароль"
                                name="password"
                                value={this.state.password}
                            />
                            <div>
                                <Button type="submit" variant="primary" size="lg" block>Зарегистрироваться</Button>
                            </div>
                            <div className='mt-3 text-right'>
                                <span>Есть уже аккаунт? <NavLink to="/login">Войти </NavLink></span>
                            </div>
                        </Form>
                    </div>
                </div>
            );
        }
        return (
          (this.props.user ?
              <Redirect to={{ pathname: '/', state: { from: this.props.location } }} />
              :
              <div>
                  {form}
              </div>
          )

        );
    };
}

const mapStateToProps = state => {
    return {
        user: state.users.user,
        registerError: state.users.registerError
    };
};
const mapDispatchToProps = dispatch => {
    return {
        sendToValidateAndGenerateCode: (data)=> dispatch(confirmedPhoneNumber(data)),
        clearUserErrors: () => dispatch(clearUserErrors()),
        loginUser: data => dispatch(loginUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
