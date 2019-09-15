import React from 'react';
import { Route, Switch} from "react-router";
import Matches from './containers/Matches';
import CreateMatch from "./containers/CreateMatch";
import Fields from "./containers/Fields";
import FieldDetails from "./containers/FieldDetails";
import MatchDetails from "./containers/MatchDetails";


const MainRoutes = () => (
    <Switch>
        <Route exact path="/" component={Matches}/>
        <Route exact path='/match/create' component={CreateMatch}/>
        <Route exact path='/matches/:id' component={MatchDetails} />
        <Route exact path='/fields' component={Fields}/>
        <Route exact path='/fields/:id' component={FieldDetails}/>
    </Switch>
);

export default MainRoutes;
