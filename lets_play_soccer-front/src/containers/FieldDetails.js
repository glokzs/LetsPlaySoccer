import React, { Component, Fragment } from 'react';
import LoadingWrapper from "../components/UI/LoadingWrapper";
import {Carousel, Collapse, Tabs} from 'antd';
import config from "../config";

const { Panel } = Collapse;
const { TabPane } = Tabs;

class FieldDetails extends Component {
    state = {
        loading: false,
        isDescriptionOpen: true,
        isTimetableOpen: false,
        isContactsOpen: false
    };
    getFormatText = format => {
        if (format === 1) {
            return 'вариант';
        } else if (format > 1 && format < 5) {
            return 'варианта';
        } else {
            return 'вариантов';
        }
    };

    onDescriptionChange = () => {
        this.setState({isDescriptionOpen: !this.state.isDescriptionOpen});
    };
    onTimetableChange = () => {
        this.setState({isTimetableOpen: !this.state.isTimetableOpen});
    };
    onContactsChange = e => {
        // console.log(e);
        if (e.length) {
            e.forEach(item => {
                if (item === '1') {

                }
            });
        }
        this.setState({isContactsOpen: !this.state.isContactsOpen});
    };
    render() {
        const field = this.props.location.state;
        return (
            <Fragment>
                <LoadingWrapper loading={this.state.loading}>
                    {field?
                        <div className='field__card field__card--details'>
                            <Carousel className='field__carousel--details'>
                                {
                                    field.images.map((image, inx) => {
                                        return (
                                            <div key={inx} className='w-100'>
                                                <img
                                                    src={config.publicFieldFolder + image}
                                                    alt="field"
                                                    className='w-100 d-block'
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </Carousel>
                            <div className='field__images icon--camera'>
                                {field.images.length}
                            </div>
                            <div className='p-3'>
                                <div className='d-flex justify-content-between p-1'>
                                    <div>
                                        <b>{field.name}</b>
                                        <div className='field__address icon--map-s'>{field.address}</div>
                                    </div>
                                    <div>
                                        <button className='btn--primary'>Выбрать</button>
                                    </div>
                                </div>
                            </div>
                            <button className='btn--map'>Показать на карте</button>
                            <Collapse
                                bordered={false}
                                defaultActiveKey={['1']}
                                onChange={this.onContactsChange}
                            >
                                <Panel
                                    header="Описание"
                                    key="1"
                                    className='field__icon--description mt-2'
                                    onChange={this.onDescriptionChange}
                                >
                                    <div>
                                        <p>{field.description}</p>
                                        <div className='field__format'>
                                            <div>
                                                <div className='field__label'>Формат</div>
                                                <div className='field__text'>
                                                    {field.formats.length}&nbsp;{this.getFormatText(field.formats.length)}
                                                </div>
                                            </div>
                                            <div>
                                                {
                                                    field.formats.map((format, index) => {
                                                        return (
                                                            <span className='field__format--t-shirt' key={index}>
                                                                {format}&nbsp;<span className='icon--t-shirt-s'/>
                                                            </span>
                                                        );
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <div className='mt-3'>
                                            <div className="field__label">Тип</div>
                                            <div className="field__text">{field.type.name}</div>
                                        </div>
                                        <div className='mt-3'>
                                            <div className="field__label">Душ</div>
                                            <div className="field__text">{field.shower? 'Имеется' : 'Не имеется'}</div>
                                        </div>
                                        <div className='mt-3'>
                                            <div className="field__label">Покрытие</div>
                                            <div className="field__text">{field.cover.name}</div>
                                        </div>
                                    </div>
                                </Panel>
                                <Panel
                                    header="Режим работы"
                                    key="2"
                                    className='field__icon--timetable mt-2'
                                    onChange={this.onTimetableChange}
                                >
                                    <div>
                                        <Tabs defaultActiveKey="1" type="card">
                                            <TabPane tab="Пн" key="1">
                                                {field.timetable.monday.length > 0 ?
                                                    field.timetable.monday.map((item, inx) => {
                                                        return (
                                                            <div key={inx}>
                                                                <span>{item.from}</span>&nbsp;-&nbsp;
                                                                <span>{item.to}</span>&nbsp;
                                                                <span className='icon--dash' />&nbsp;
                                                                <span>{item.price}&nbsp;₸/час</span>
                                                            </div>
                                                        );
                                                    }) : 'выходной'
                                                }
                                            </TabPane>
                                            <TabPane tab="Вт" key="2">
                                                {field.timetable.tuesday.length > 0 ?
                                                    field.timetable.tuesday.map((item, inx) => {
                                                        return (
                                                            <div key={inx}>
                                                                <span>{item.from}</span>&nbsp;-&nbsp;
                                                                <span>{item.to}</span>&nbsp;
                                                                <span className='icon--dash' />&nbsp;
                                                                <span>{item.price}&nbsp;₸/час</span>
                                                            </div>
                                                        );
                                                    }) : 'выходной'
                                                }
                                            </TabPane>
                                            <TabPane tab="Ср" key="3">
                                                {field.timetable.wednesday.length > 0 ?
                                                    field.timetable.wednesday.map((item, inx) => {
                                                        return (
                                                            <div key={inx}>
                                                                <span>{item.from}</span>&nbsp;-&nbsp;
                                                                <span>{item.to}</span>&nbsp;
                                                                <span className='icon--dash' />&nbsp;
                                                                <span>{item.price}&nbsp;₸/час</span>
                                                            </div>
                                                        );
                                                    }) : 'выходной'
                                                }
                                            </TabPane>
                                            <TabPane tab="Чт" key="4">
                                                {field.timetable.thursday.length > 0 ?
                                                    field.timetable.thursday.map((item, inx) => {
                                                        return (
                                                            <div key={inx}>
                                                                <span>{item.from}</span>&nbsp;-&nbsp;
                                                                <span>{item.to}</span>&nbsp;
                                                                <span className='icon--dash' />&nbsp;
                                                                <span>{item.price}&nbsp;₸/час</span>
                                                            </div>
                                                        );
                                                    }) : 'выходной'
                                                }
                                            </TabPane>
                                            <TabPane tab="Пт" key="5">
                                                {field.timetable.friday.length > 0 ?
                                                    field.timetable.friday.map((item, inx) => {
                                                        return (
                                                            <div key={inx}>
                                                                <span>{item.from}</span>&nbsp;-&nbsp;
                                                                <span>{item.to}</span>&nbsp;
                                                                <span className='icon--dash' />&nbsp;
                                                                <span>{item.price}&nbsp;₸/час</span>
                                                            </div>
                                                        );
                                                    }) : 'выходной'
                                                }
                                            </TabPane>
                                            <TabPane tab="Сб" key="6">
                                                {field.timetable.saturday.length > 0 ?
                                                    field.timetable.saturday.map((item, inx) => {
                                                        return (
                                                            <div key={inx}>
                                                                <span>{item.from}</span>&nbsp;-&nbsp;
                                                                <span>{item.to}</span>&nbsp;
                                                                <span className='icon--dash' />&nbsp;
                                                                <span>{item.price}&nbsp;₸/час</span>
                                                            </div>
                                                        );
                                                    }) : 'выходной'
                                                }
                                            </TabPane>
                                            <TabPane tab="Вс" key="7">
                                                {field.timetable.sunday.length > 0 ?
                                                    field.timetable.sunday.map((item, inx) => {
                                                        return (
                                                            <div key={inx}>
                                                                <span>{item.from}</span>&nbsp;-&nbsp;
                                                                <span>{item.to}</span>&nbsp;
                                                                <span className='icon--dash' />&nbsp;
                                                                <span>{item.price}&nbsp;₸/час</span>
                                                            </div>
                                                        );
                                                    }) : 'выходной'
                                                }
                                            </TabPane>
                                        </Tabs>
                                    </div>
                                </Panel>
                                <Panel
                                    header="Контакты"
                                    key="3"
                                    className={'field__icon--contacts mt-2 ' + (this.state.isContactsOpen? null : 'rotate-icon')}
                                >
                                    <div>
                                        <div className='mt-3'>
                                            <div className="field__label">Телефон</div>
                                            <div className="field__text field__text--phone">
                                                {field.phoneNumber.length > 0?
                                                    field.phoneNumber.map((number, index) => {
                                                        return (
                                                            <a href={'tel:'+number} key={index}>
                                                                {number}
                                                                {index === (field.phoneNumber.length - 1) ? null : ','}
                                                                &nbsp;
                                                            </a>
                                                        );
                                                    })
                                                    :
                                                    'Не имеется'
                                                }
                                            </div>
                                        </div>
                                        <div className='mt-3'>
                                            <div className="field__label">Почта</div>
                                            <a href={'mailto:'+field.email} className="field__text">{field.email}</a>
                                        </div>
                                        <div className='mt-3 mb-5'>
                                            <div className="field__label">Сайт</div>
                                            <a href={'http://'+field.webSite} className="field__text field__text--site">{field.webSite}</a>
                                        </div>
                                    </div>
                                </Panel>
                            </Collapse>
                        </div> : null
                    }
                </LoadingWrapper>
            </Fragment>
        );
    }
}


export default FieldDetails;