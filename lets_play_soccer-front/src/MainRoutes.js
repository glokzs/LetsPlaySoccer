import React from 'react';
import { Route, Switch} from "react-router";
import Matches from './containers/Matches';


const MainRoutes = () => (
    <Switch>
        <Route exact path="/" component={Matches}/>
    </Switch>
);

export default MainRoutes;
