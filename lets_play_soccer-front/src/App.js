import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import Register from "./containers/Register";
import Login from "./containers/Login";
import Tutorial from "./containers/Tutorial";
import MainPrivate from "./containers/MainPrivate";
import FontIcons from './containers/OnlyForDevelopment/FontIcons';
import Profile from './containers/Profile';
import ConfirmPhone from './containers/ConfirmPhone';


class App extends Component {

    render() {
        return (
            <Switch>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/tutorial" component={Tutorial}/>
                <Route exact path="/only_for_dev/icons" component={FontIcons}/>
                <Route exact path="/profile/:id" component={Profile}/>
                <Route exact path="/confirm" component={ConfirmPhone} />
                <Route path="/:page" component={MainPrivate} />
            </Switch>
        );
    }
}


export default App;



