import React, {Component} from 'react';
import {Carousel} from "react-bootstrap";
import {Link} from "react-router-dom";

class Tutorial extends Component {

    render() {
        return (
            <div className='tutorial__wrap'>
                <div className='tutorial'>
                    <Carousel
                        fade={true}
                        interval={null}
                        touch={'false'}
                        wrap={false}
                        nextIcon={
                            <span aria-hidden="true" className="d-flex align-items-center">
                                Дальше
                                <span className='icon--arrow-right'/>
                            </span>
                        }
                    >
                        <Carousel.Item>
                            <div className='tutorial__page'>
                                <div className='tutorial__circle'>
                                    <div className='tutorial__icon icon--teamwork' />
                                </div>
                            </div>
                            <Carousel.Caption>
                                <h3 className='tutorial__title'>Собственная команда</h3>
                                <p className='tutorial__text'>Создайте свою команду из опытных игроков</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className='tutorial__page'>
                                <div className='tutorial__circle'>
                                    <div className='tutorial__icon icon--soccer-field' />
                                </div>
                            </div>

                            <Carousel.Caption>
                                <h3 className='tutorial__title'>Лучшие поля и газоны</h3>
                                <p className='tutorial__text'>Выбирайте поля по отзывам и рейтингу</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div className='tutorial__page'>
                                <div className='tutorial__circle'>
                                    <div className='tutorial__icon icon--soccer-ball' />
                                </div>
                            </div>

                            <Carousel.Caption>
                                <h3 className='tutorial__title'>Турниры и соревнования</h3>
                                <p className='tutorial__text'>Выигрывайте матчи среди лучших команд</p>
                                <Link
                                    exact={'true'}
                                    to={'/'}
                                    className="tutorial__next"
                                >
                                    Дальше
                                    <span className='icon--arrow-right'/>
                                </Link>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
            </div>
        );
    };
}

export default Tutorial;


