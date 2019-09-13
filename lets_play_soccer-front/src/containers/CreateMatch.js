import React, { Component, Fragment } from 'react';
import {DatePicker, Input, InputNumber, TimePicker} from 'antd';
import 'moment/locale/ru';
import moment from 'moment';

class CreateMatch extends Component {
    state = {
        date: moment(new Date()),
        time: null,
        duration: 2.5,
        team: 2,
        format: 5,
        price: null
    };

    onDateChange = (date, dateString) => {
        // console.log(moment(date).format('YYYY-MM-DD hh:mm:ss'));
        this.setState({date})
    };
    onTimeChange = time => this.setState({time});
    onTeamChange = team => this.setState({team});
    onFormatChange = format => this.setState({format});
    onPriceChange = price => this.setState({price});
    onDurationChange = duration => this.setState({duration});

    getHours = hours => {
        if (hours === 1) {
            return 'час';
        } else if (hours >= 0.5 && hours < 5) {
            return 'часа';
        } else if (hours >= 5 ) {
            return 'часов';
        }
    };
    getFormat = people => {
        switch (people) {
            case 1:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
                return 'человек';
            case 2:
            case 3:
            case 4:
                return 'человека';
            default:
                return '';
        }
    };
    getTeams = team => {
        switch (team) {
            case 1:
                return 'команда';
            case 5:
                return 'команд';
            case 2:
            case 3:
            case 4:
                return 'команды';
            default:
                return '';
        }
    };
    getPricePerPerson = () => {
        const price = Math.round(this.state.price / (this.state.format * this.state.team));
        if (price === Infinity) return 0;
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') || 0;
    };

    disabledDate = current => current < moment().startOf('day');

    render() {
        const timeWord = this.getHours(this.state.duration);
        const teamWord = this.getTeams(this.state.team);
        const people = this.getFormat(this.state.format);
        return (
            <Fragment>
                <header className='toolbar__header'>
                    <div className='col-3'/>
                    <div className='col-6 toolbar__header__title'>Создание матча</div>
                    <div className='col-3 text-right'>
                        <button className='icon--x toolbar__header__btn--close'/>
                    </div>
                </header>

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
                        <div className="match__label">Длительность игры</div>
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
                            <div className='icon--map-b match__input__icon'/>
                            <Input
                                placeholder='Выберите поле'
                                className='match__input'
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
                                value={this.state.format}
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
                                value={this.state.team}
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
                <div className="row mt-5">
                    <div className="col">
                        <button className='btn--primary'>Создать матч</button>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default CreateMatch;