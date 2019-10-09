import React, { Component, Fragment } from 'react';
import {Alert, DatePicker, Input, InputNumber, TimePicker} from 'antd';
import 'moment/locale/ru';
import moment from 'moment';
import {postMatch} from "../store/actions/matchAction";
import {connect} from "react-redux";
import LeafletMap from "./LeafletMap";
import {getFormat, getHoursInCreateMatch, getTeams} from "../helpers/helperMatch";
import Fields from "./Fields";


class CreateMatch extends Component {
    state = {
        date: moment(new Date()),
        time: null,
        duration: 2.5,

        price: '',

        start: '',
        end: '',
        fieldId: '',
        playersInTeam: 5,
        numOfTeams: 2,

        openMap: false,
        openFields: false,
        fieldName: ''
    };

    toggleMap = (fieldId, fieldName) => {
        if (fieldId) this.setState({openMap: !this.state.openMap, fieldId, fieldName, error: ''});
        else this.setState({openMap: !this.state.openMap});
    };

    toggleFields = (fieldId, fieldName) => {
        if (fieldId) this.setState({openFields: !this.state.openFields, fieldId, fieldName, error: ''});
        else this.setState({openFields: !this.state.openFields});
    };

    createMatch = () => {
        if (this.state.date && this.state.time && this.state.duration && this.state.price && this.state.fieldId && this.state.playersInTeam && this.state.numOfTeams) {
            const start = new Date(this.state.date.format('YYYY-MM-DD') + ' ' + this.state.time.format('HH:mm:ss')).toISOString();
            const duration = moment.duration({'minutes' : this.state.duration * 60});
            this.props.postMatch({
                private: false,
                start,
                end: moment(start).add(duration).toISOString(),
                fieldId: this.state.fieldId,
                playersInTeam: this.state.playersInTeam,
                numOfTeams: this.state.numOfTeams,
                price: this.state.price,
            });
        } else {
            this.setState({error: 'Поля не заполнены'});
        }

    };

    onDateChange = date => this.setState({date, error: ''});
    onTimeChange = time => this.setState({time, error: ''});
    onTeamChange = numOfTeams => this.setState({numOfTeams, error: ''});
    onFormatChange = playersInTeam => this.setState({playersInTeam, error: ''});
    onPriceChange = price => this.setState({price, error: ''});
    onDurationChange = duration => this.setState({duration, error: ''});

    getPricePerPerson = () => {
        const price = Math.round(this.state.price / (this.state.playersInTeam * this.state.numOfTeams));
        if (price === Infinity || isNaN(price)) return 0;
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') || 0;
    };

    disabledDate = current => current < moment().startOf('day');

    render() {
        const timeWord = getHoursInCreateMatch(this.state.duration);
        const teamWord = getTeams(this.state.numOfTeams);
        const people = getFormat(this.state.playersInTeam);
        return (
            <Fragment>
                <header className='toolbar__header'>
                    <div className='col-3'/>
                    <div className='col-6 toolbar__header__title'>Создание матча</div>
                    <div className='col-3 text-right'>
                        <button
                            className='icon--x toolbar__header__btn'
                            onClick={() => this.props.history.push('/my/matches')}
                        />
                    </div>
                </header>

                <div className='container'>

                    <div className='row mt-4'>
                        <div className="col">
                            <label className='match__label'>Дата проведения
                                <DatePicker
                                    id='datepicker'
                                    onChange={this.onDateChange}
                                    className='datepicker icon--calendar-b'
                                    placeholder='Выберите дату'
                                    format='DD MMMM, dddd'
                                    value={this.state.date}
                                    allowClear={false}
                                    disabledDate={this.disabledDate}
                                />
                            </label>
                        </div>
                    </div>

                    <div className='row mt-4'>
                        <div className="col-6">
                            <label htmlFor='timepicker' className="match__label">Начало игры</label>
                            <TimePicker
                                id='timepicker'
                                onChange={this.onTimeChange}
                                format='HH:mm'
                                value={this.state.time}
                                placeholder='Выберите время'
                                className='timepicker'
                            />
                        </div>
                        <div className="col-6">
                            <label className="match__label">Длительность игры</label>
                            <div className='position-relative'>
                            <span className='timepicker__word'>
                                {timeWord}
                            </span>
                                <InputNumber
                                    min={0.5}
                                    max={9}
                                    onChange={this.onDurationChange}
                                    value={this.state.duration}
                                    className='match__input--number'
                                    placeholder='В часах'
                                    precision={1}
                                    step={0.5}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="row mt-4">
                        <div className="col">
                            <div className='match__label'>Выберите площадку для игры</div>
                            <div className='position-relative'>
                                <div
                                    onClick={this.toggleMap}
                                    className='icon--map-b match__input__icon'
                                />
                                <Input
                                    placeholder='Выберите поле'
                                    className='match__input'
                                    onFocus={this.toggleFields}
                                    value={this.state.fieldName}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='row mt-4'>
                        <div className="col-6">
                            <div className="match__label">В одной команде</div>
                            <div className='position-relative'>
                            <span className='match__people'>
                                {people}
                            </span>
                                <InputNumber
                                    min={1}
                                    max={11}
                                    onChange={this.onFormatChange}
                                    value={this.state.playersInTeam}
                                    className='match__input--number'
                                    placeholder='Количество игроков'
                                    precision={0}
                                />
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="match__label">Количество команд</div>
                            <div className='position-relative'>
                            <span className='team__word'>
                                {teamWord}
                            </span>
                                <InputNumber
                                    min={2}
                                    max={5}
                                    placeholder='Количество команд'
                                    onChange={this.onTeamChange}
                                    value={this.state.numOfTeams}
                                    className='match__input--number'
                                    precision={0}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='row mt-4'>
                        <div className="col-6">
                            <div className="match__label">Стоимость площадки</div>
                            <div className='position-relative'>
                                <span className='match__input--price__icon'>₸</span>
                                <InputNumber
                                    value={this.state.price}
                                    placeholder='Цена'
                                    formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                                    parser={value => value.replace(/\$\s?|( *)/g, '')}
                                    onChange={this.onPriceChange}
                                    className='match__input--number match__input--price'
                                    min={0}
                                />
                            </div>
                        </div>
                        <div className="col-6 d-flex flex-column justify-content-end">
                            <div className='match__price'>{this.getPricePerPerson()} ₸</div>
                            <div className='match__label text-right'>С каждого игрока по</div>
                        </div>
                    </div>

                    {this.state.error?
                        <div className='mt-5'>
                            <Alert
                                message={this.state.error}
                                type="error"
                                showIcon
                            />
                        </div> : null
                    }

                    <div className="row mt-5 mb-5">
                        <div className="col">
                            <button
                                className='btn--primary'
                                onClick={this.createMatch}
                            >
                                Создать матч
                            </button>
                        </div>
                    </div>

                    При создании матча тебе нужно:
                    <ul className='matches__rule mt-2'>
                        <li className='icon--soccer-ball text-success'>&nbsp;&nbsp;Позвонить владельцу поля</li>
                        <li className='icon--soccer-ball text-success'>&nbsp;&nbsp;Согласовать дату, время и стоимость</li>
                        <li className='icon--soccer-ball text-success'>&nbsp;&nbsp;Подтверждать участие игроков</li>
                        <li className='icon--soccer-ball text-success'>&nbsp;&nbsp;Наслаждаться игрой</li>
                    </ul>

                </div>


                {this.state.openMap?
                    <div className='fixed-page'>
                        <LeafletMap
                            sendFieldId={this.toggleMap}
                        />
                    </div> : null
                }

                {this.state.openFields?
                    <div className='fixed-page overflow-auto'>
                        <Fields
                            sendFieldId={this.toggleFields}
                        />
                    </div> : null
                }


            </Fragment>
        );
    }
}


const mapStateToProps = state => {
    return {
        user: state.users.user,
    };
};
const mapDispatchToProps = dispatch => {
    return {
        postMatch: data => dispatch(postMatch(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateMatch);
