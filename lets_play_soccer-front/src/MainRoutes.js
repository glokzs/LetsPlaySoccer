import React from 'react';
import { Route, Switch} from "react-router";
import Matches from './containers/Matches';
import CreateMatch from "./containers/CreateMatch";


const MainRoutes = () => (
    <Switch>
        <Route exact path="/" component={Matches}/>
        <Route exact path='/matches/create' component={CreateMatch}/>
    </Switch>
);

export default MainRoutes;
