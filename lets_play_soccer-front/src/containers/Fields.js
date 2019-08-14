import React, { Component, Fragment } from 'react';
import {DatePicker, Input, InputNumber, TimePicker} from 'antd';
import 'moment/locale/ru';

class Fields extends Component {
    state = {
        date: null,
        time: null,
        duration: null,
        team: null,
        format: null,
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


    onDurationChange = (duration, durationValue) => this.setState({duration, durationValue});

    getHours = hours => {
        switch (hours) {
            case '1,0':
                return 'час';
            case '0,5':
            case '1,5':
            case '2,0':
            case '2,5':
            case '3,0':
            case '3,5':
            case '4,0':
            case '4,5':
                return 'часа';
            case '5,0':
            case '5,5':
            case '6,0':
            case '6,5':
            case '7,0':
            case '7,5':
            case '8,0':
            case '8,5':
            case '9,0':
            case '9,5':
            case '10,0':
            case '10,5':
            case '11,0':
            case '11,5':
            case '12,0':
            case '12,5':
            case '13,0':
            case '13,5':
            case '14,0':
            case '14,5':
            case '15,0':
            case '15,5':
            case '16,0':
            case '16,5':
            case '17,0':
            case '17,5':
            case '18,0':
            case '18,5':
            case '19,0':
            case '19,5':
            case '20,0':
            case '20,5':
            case '21,0':
            case '21,5':
            case '22,0':
            case '22,5':
            case '23,0':
            case '23,5':
                return 'часов';
            default:
                return '';
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

    render() {
        const timeWord = this.getHours(this.state.durationValue);
        const people = this.getFormat(this.state.format);
        return (
            <Fragment>
                <header className='toolbar__header'>
                    <div className='col-4'>
                        <button className='icon--arrow-right toolbar__header__btn--close'/>
                    </div>
                    <div className='toolbar__header__title'>Площадки</div>
                    <div className='col-4 d-flex align-items-center justify-content-end'>
                        <button className='icon--search toolbar__header__btn--close'/>
                        <button className='icon--map-o toolbar__header__btn--close'/>
                    </div>
                </header>

                <div className='row mt-4'>
                    <div className="col">
                        <div className='match__label'>Дата проведения</div>
                        <DatePicker
                            onChange={this.onDateChange}
                            className='datepicker icon--calendar-b'
                            placeholder='Выберите дату'
                            format='DD MMMM, dddd'
                            value={this.state.date}
                        />
                    </div>
                </div>

                <div className='row mt-4'>
                    <div className="col-6">
                        <div className="match__label">Начало игры</div>
                        <TimePicker
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
                            <TimePicker
                                onChange={this.onDurationChange}
                                format='H,m'
                                value={this.state.duration}
                                placeholder='В часах'
                                className='timepicker'
                                minuteStep={5}
                                hideDisabledOptions={true}
                                disabledMinutes={() => [10,15,20,25,30,35,40,45,50,55]}
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
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="match__label">Количество команд</div>
                        <div className='position-relative'>
                            <span className='timepicker__word'>
                                {timeWord}
                            </span>
                            <InputNumber
                                min={2}
                                max={5}
                                placeholder='Количество команд'
                                onChange={this.onTeamChange}
                                value={this.state.team}
                                className='match__input--number'
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
                                placeholder='Введите цену'
                                formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                                parser={value => value.replace(/\$\s?|( *)/g, '')}
                                onChange={this.onPriceChange}
                                className='match__input--number match__input--price'
                                min={0}
                            />
                        </div>
                    </div>
                    <div className="col-6 d-flex flex-column justify-content-end">
                        <div className='match__price'>{1200} ₸</div>
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

export default Fields;