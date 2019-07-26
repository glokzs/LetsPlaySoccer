import React, {Component, Fragment} from 'react';
import {Route, Switch, withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import Toolbar from "./components/UI/Toolbar";
import {logoutUser} from "./store/actions/userAction";
import MainRoutes from './Routes';
import Register from "./containers/Register";
import Login from "./containers/Login";
import Tutorial from "./containers/Tutorial";


class App extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route exact path="/" render={props => {
                        return (
                            <Fragment>
                                <header>
                                    <Toolbar user={props.user} logout={props.onLogoutUser} />
                                </header>
                                <main>
                                    <div className='container'>
                                        <MainRoutes user={props.user} />
                                    </div>
                                </main>
                            </Fragment>
                        );
                    }} />
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/tutorial" component={Tutorial}/>
                </Switch>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.users.user
    }
};

const mapDispatchToProps = dispatch => ({
    onLogoutUser: () => dispatch(logoutUser())
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));



