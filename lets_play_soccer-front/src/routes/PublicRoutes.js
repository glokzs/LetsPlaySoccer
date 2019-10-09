import React from 'react';
import {Route, Switch} from "react-router";
import Register from "../containers/Register";
import Login from "../containers/Login";
import ConfirmPhone from "../containers/ConfirmPhone";
import FontIcons from "../containers/OnlyForDevelopment/FontIcons";
import StarterPage from "../components/StarterPage";

const PublicRoutes = () => (
    <Switch>
        <Route exact path="/register" component={Register}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/confirm" component={ConfirmPhone} />
        <Route exact path="/" component={StarterPage} />

        <Route exact path="/only_for_dev/icons" component={FontIcons}/>
    </Switch>
);
export default PublicRoutes;