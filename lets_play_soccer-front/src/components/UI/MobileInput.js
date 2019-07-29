import React, {Component, Fragment} from 'react';
import NumberFormat from "react-number-format";

export default class MobileInput extends Component {

    state = {
        validationError: null,
        operators: ["700", "701", "702", "705", "707", "708", "747", "771", "775", "776", "777", "778"]
    };

    updateInputPhone = (e) => {
        if (e.value.length >= 3) {
            const isKzOperator = this.state.operators.includes(e.value.slice(0, 3));
            if (isKzOperator) this.setState({validationError: ''});
            else this.setState({validationError: 'Неправильный оператор'});
        }
        this.props.onChange(e.value);
    };

    render() {
        return (
            <Fragment>
                <NumberFormat
                    value={this.props.phone}
                    format={'+7 (###) ###-##-##'}
                    onValueChange={this.updateInputPhone}
                    className={'input form-control'}
                    allowNegative={false}
                    placeholder={'+7 (___) ___-__-__'}
                    mask={'_'}
                    type={'tel'}
                    onBlur={() => {
                        this.setState({validationError: ''});
                    }}
                />
                {this.state.validationError ?
                    <div style={{color: 'red', fontSize: '10px', marginBottom: '10px'}}>
                        {this.state.validationError}
                    </div>
                    : null
                }
            </Fragment>
        )
    }
}

