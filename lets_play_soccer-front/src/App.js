import React, {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import Register from "./containers/Register";
import Login from "./containers/Login";
import Tutorial from "./containers/Tutorial";
import MainPrivate from "./containers/MainPrivate";
import FontIcons from './containers/OnlyForDevelopment/FontIcons';
import Menu from './components/Menu';
import CreateMatch from './containers/CreateMatch';


class App extends Component {

    render() {
        return (
<<<<<<< HEAD
            <Switch>
                <Route exact path="/register" component={Register}/>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/tutorial" component={Tutorial}/>
                <Route exact path="/only_for_dev/icons" component={FontIcons}/>
                <Route path="/" component={MainPrivate} />
            </Switch>
=======
            <Fragment>
                <Switch>
                    <Route exact path="/register" component={Register}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/tutorial" component={Tutorial}/>
                    <Route exact path="/only_for_dev/icons" component={FontIcons}/>
                    <Route exact path="/createMatch" component={CreateMatch}/>
                    <Route exact path="/" render={props =>
                        this.props.user?
                         (
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
                        ) :
                            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
                    } />

                </Switch>
            </Fragment>
>>>>>>> #36 Front: добавил появление подалки с полями
        );
    }
}


export default App;



