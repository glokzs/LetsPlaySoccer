import React, {Component} from 'react';
import {connect} from "react-redux";
import {Form, Button, Container} from 'react-bootstrap';
import {registerUser} from '../store/actions/action';
import FormElement from '../components/FormElement';
import MaskedFormControl from 'react-bootstrap-maskedinput';

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
        let checkNumber = this.state.phone.includes('_')
        const array = ["700", "701", "702", "705", "707", "708", "747", "771", "775", "776", "777", "778"]
        let checkOperator = array.includes(this.state.phone.slice(3, 6));
        if (checkNumber == false && checkOperator == true) {
            if(window.confirm("Убедитесь что номер введён правильно "+this.state.phone)) {
                this.props.registration(this.state);
            }
        } else {
            alert("Вы ввели номер неверно");
        };
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
                                <MaskedFormControl onChange={this.updateInputPhone} className="input" name='phoneNumber' mask='8 (111) 111-11-11' required />
                            </Form.Group>
                            <FormElement onChange={this.updateInputFirstname} type="text" placeholder="Имя"/>
                            <FormElement onChange={this.updateInputLastname} type="text" placeholder="Фамилия" />
                            <FormElement onChange={this.updateInputPassword} type="password" placeholder="Пароль" />
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