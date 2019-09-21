import React, {Component} from 'react';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import {connect} from "react-redux";
import PrivateRoutes from "./routes/PrivateRoutes";
import PublicRoutes from "./routes/PublicRoutes";

const PrivateRoute = ({isAllowed, ...props}) => isAllowed ? <Route {...props} /> : <Redirect to="/login"/>;

const PublicRoute = ({isAllowed, ...props}) => isAllowed ? <Route {...props} /> : <Redirect to="/my/matches" />;

class App extends Component {

    render() {
        return (
            <Switch>
                <PrivateRoute
                    path="/my/"
                    // exact
                    component={PrivateRoutes}
                    isAllowed={this.props.user && this.props.user.token}
                />
                <PublicRoute
                    path="/"
                    // exact
                    component={PublicRoutes}
                    isAllowed={!this.props.user || (this.props.user && !this.props.user.token)}
                />

            </Switch>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.users.user
    }
};


export default withRouter(connect(mapStateToProps, null)(App));



