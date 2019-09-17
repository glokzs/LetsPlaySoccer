import React, { Component } from 'react';
import {Form, Button, Alert} from 'react-bootstrap';
import {Redirect} from "react-router-dom";
import Spinner from "../components/UI/Spinner";

const CODE_LENGTH = new Array(4).fill(0);

class ConfirmPhone extends Component {
    input = React.createRef();
    state = {
        value: "",
        focused: false,
        loading: false
    };
    updateInput = (e) => {
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
        this.props.clearUserErrors();
    };

    handleClick = () => {
        this.input.current.focus();
    };
    handleFocus = () => {
        this.setState({ focused: true });
    };
    handleBlur = () => {
        this.setState({
          focused: false,
        });
    };
    handleKeyUp = e => {
        if (e.key === "Backspace") {
            this.setState(state => {
                return {
                value: state.value.slice(0, state.value.length - 1),
                };
            });
        }
    };
    handleChange = e => {
        const value = e.target.value;

        this.setState(state => {
            if (state.value.length >= CODE_LENGTH.length) return null;
            return {
                value: (state.value + value).slice(0, CODE_LENGTH.length),
            };
        });
    };

    render() {
        const { value, focused } = this.state;

        const values = value.split("");
    
        const selectedIndex = values.length < CODE_LENGTH.length ? values.length : CODE_LENGTH.length - 1;

        const hideInput = !(values.length < CODE_LENGTH.length);

        let form;
        if(this.state.loading){
            form = <Spinner />
        } else {
            form = (
                <div className="container-login">

                    <div className="logo text-center" />
                    <h1 className="text-center title mb-3">Подтверждение номера</h1>
                    <span className="text-center d-block mb-4" >Это поможет нам аутентифицировать <br/> каждого пользователя сервиса, для вашей же безопасности.</span>
                    {
                        this.props.error ? <Alert variant={'danger'}>{this.props.error.message}</Alert> : null
                    }
                    <Form onSubmit={this.onSubmitHandler} >
                        <div className="wrap" onClick={this.handleClick}>
                            <input
                                value=""
                                ref={this.input}
                                onChange={this.handleChange}
                                onKeyUp={this.handleKeyUp}
                                onFocus={this.handleFocus}
                                onBlur={this.handleBlur}
                                className="input-confirm"
                                style={{
                                    width: "32px",
                                    top: "0px",
                                    bottom: "0px",
                                    left: `${selectedIndex * 32}px`,
                                    opacity: hideInput ? 0 : 1,
                                }}
                            />
                            {CODE_LENGTH.map((v, index) => {
                                const selected = values.length === index;
                                const filled = values.length === CODE_LENGTH.length && index === CODE_LENGTH.length - 1;

                                return (
                                    <div className="display" key={index}>
                                        {values[index]}
                                        {(selected || filled) && focused && <div className="shadows" />}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-5 mb-2">
                            <Button type="submit" variant="primary" size="lg" block>Подтвердить</Button>
                        </div>
                    </Form>
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
        )
    }
}

export default ConfirmPhone;