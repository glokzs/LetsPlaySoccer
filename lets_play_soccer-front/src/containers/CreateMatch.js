import React, { Component, Fragment } from 'react';
import {DatePicker, TimePicker} from 'antd';
import 'moment/locale/ru';

class CreateMatch extends Component {
    state = {
        date: null,
        time: null,
        duration: null
    };

    onDateChange = (date, dateString) => {
        // console.log(moment(date).format('YYYY-MM-DD hh:mm:ss'));
        this.setState({date})
    };
    onTimeChange = time => this.setState({time});
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

    render() {
        const timeWord = this.getHours(this.state.durationValue);
        console.log(timeWord);
        return (
            <Fragment>
                <header className='toolbar__header'>
                    <div className='col-4'/>
                    <div className='toolbar__header__title'>Создание матча</div>
                    <div className='col-4 text-right'>
                        <button className='icon--x toolbar__header__btn--close'/>
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
                <div className='row mt-5'>
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
            </Fragment>
        );
    }
}

export default CreateMatch;