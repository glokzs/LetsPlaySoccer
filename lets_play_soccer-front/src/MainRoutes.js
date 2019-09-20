import React from 'react';
import { Route, Switch } from "react-router";
import Matches from './containers/Matches';
import CreateMatch from "./containers/CreateMatch";
import Fields from "./containers/Fields";
import FieldDetails from "./containers/FieldDetails";
import MatchDetails from "./containers/MatchDetails";
import LeafletMap from "./containers/LeafletMap";


const MainRoutes = () => (
    <Switch>
        <Route exact path='/match/create' component={CreateMatch}/>
        <Route path='/matches/:id' component={MatchDetails} />
        <Route exact path='/fields' component={Fields}/>
        <Route path='/fields/:id' component={FieldDetails}/>
        <Route exact path="/matches" component={Matches}/>
        <Route exact path="/fields-map" component={LeafletMap}/>
    </Switch>
);

export default MainRoutes;
