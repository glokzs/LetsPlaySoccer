import React, {Component} from 'react';
import {connect} from "react-redux";
import {NavLink, Redirect} from "react-router-dom";

class StarterPage extends Component {

    render() {
        return (
            (this.props.user ?
                <Redirect to={{pathname: '/my/matches', state: {from: this.props.location}}}/>
                :
                <div className="container">

                    <div className="logo--start text-center mt-5"/>

                    <p className='text-center text-dark h6 mt-3'>
                        Здраствуй Футболист-приятель! LetsPlaySoccer - это приложение, где ты можешь собрать себе команду.
                    </p>

                    <div className="mt-5 mb-2 text-center">
                        <NavLink to='/login' className='btn--primary mr-3'>Войти</NavLink>
                        <NavLink to='/register' className='btn--secondary'>Зарегистрироваться</NavLink>
                    </div>
                </div>
            )

        )
    }
}


const mapStateToProps = state => {
    return {
        user: state.users.user,
    };
};

export default connect(mapStateToProps)(StarterPage);
