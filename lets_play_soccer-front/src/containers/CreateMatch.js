import React, { Component } from 'react';
import { Container, Form, Button} from 'react-bootstrap';
import FormElement from '../components/UI/FormElement';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import NumberFormat from 'react-number-format';
import ModalFields from '../components/ModalFields';
import { th } from 'date-fns/esm/locale';

class CreateMatch extends Component {
    state = {
        startDate: '',
        startTime: '',
        durationGame: 1,
        field: '',
        humanesInOneComand: 1,
        quantityComands: 1,
        priceField: 1,
        showModal: false
    };
    
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
    };
    handleChange(date) {
        this.setState({
            startDate: date
        });
    };
    updateInput = (e) => {
        e.preventDefault();

        if( e.target.value >= 0 ) {
            this.setState({[e.target.name]: e.target.value});
        } else {
            e.target.value = 0;
        };
    };
    modalActive = () => {
        this.setState({ showModal: true })
    }
       
    render() {
        console.log(this.state.showModal);

        return(
            <div className="create-match_container" >
                {
                    this.state.showModal ? <ModalFields/>  : null
                }
                    
                <div className="create-match_header text-center" >
                    <div className="clearFix">
                        <span>Создание матча</span>
                        <button className="close-btn" >X</button>
                    </div>
                </div>
                <Form>
                    <div className="create-match_main">
                        <Form.Label className="text-uppercase">Дата проведения</Form.Label>
                        <div>
                            <DatePicker 
                                className="input form-control" 
                                format="dd/mm" 
                                selected={this.state.startDate} 
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="d-flex flex-wrap justify-content-between" >
                            <div>
                                <Form.Label className="text-uppercase">Начало игры</Form.Label>
                                <NumberFormat className="input form-control" format="##:##" name="startTime" onChange={this.updateInput} />
                                {/* <FormElement type="number" format="hh:mm" name="startTime" onChange={this.updateInput} /> */}
                            </div>
                            <div>
                                <Form.Label className="text-uppercase">Длительность игры</Form.Label>
                                <FormElement type="number" name="durationGame" onChange={this.updateInput} />
                            </div>
                        </div>
                        <Form.Label className="text-uppercase">Выберите площадку для игры</Form.Label>
                        <select className="input form-control" name="field" onChange={ this.updateInput } onClick={this.modalActive} >
                            {}
                        </select>
                    </div>
                    <div id="field" ></div>
                    <div className="create-match_main">
                        <div className="d-flex flex-wrap justify-content-between" >
                            <div>
                                <Form.Label className="text-uppercase">в одной команде</Form.Label>
                                <FormElement type="number" name="humanesInOneComand" onChange={this.updateInput} />
                            </div>
                            <div>
                                <Form.Label className="text-uppercase">количество команд</Form.Label>
                                <FormElement type="number" name="quantityComands" onChange={ this.updateInput }  />
                            </div>
                        </div>
                        <div className="d-flex flex-wrap justify-content-between" >
                            <div>
                                <Form.Label className="text-uppercase">стоимость площадки</Form.Label>
                                <div className="bg--T">
                                    <FormElement type="number" name="priceField" onChange={this.updateInput} value={ 10000 } />
                                </div>
                            </div>
                            <div>
                                <span className="d-block price-per-person text-right" >
                                    {
                                        isNaN(( ( parseInt(this.state.priceField) * parseInt(this.state.durationGame) ) / ( parseInt(this.state.quantityComands) * parseInt(this.state.humanesInOneComand) ) ))
                                        ? 0 
                                        : ( ( parseInt(this.state.priceField) * parseInt(this.state.durationGame) ) / ( parseInt(this.state.quantityComands) * parseInt(this.state.humanesInOneComand) ) ) + " ₸"
                                    }
                                </span>
                                <Form.Label className="text-uppercase">с каждого игрока</Form.Label>
                            </div>
                            <Button className="btn-block btn-lg" >Создать матч</Button>
                        </div>
                    </div>
                </Form>
            </div>
        );
    }
}

export default CreateMatch