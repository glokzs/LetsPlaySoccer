import React, { Component, Fragment } from 'react';
import { DatePicker } from 'antd';
import ruRU from 'antd/lib/locale-provider/ru_RU';

class CreateMatch extends Component {
    state = {
        date: ''
    };

    onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    render() {
        return (
            <Fragment>
                <header className='toolbar__header'>
                    <div className='col-4'/>
                    <div className='toolbar__header__title'>Создание матча</div>
                    <div className='col-4 text-right'>
                        <button className='icon--x toolbar__header__btn--close'/>
                    </div>
                </header>
                <div className='row'>
                    <DatePicker
                        onChange={this.onChange}
                        className={'datepicker'}
                        locale={ruRU}
                        placeholder={'Выберите дату'}
                        format={'DD MMMM, dddd'}
                    />
                </div>
            </Fragment>
        );
    }
}

export default CreateMatch;