import React from 'react';
import {Route, Switch} from "react-router";
import Matches from "../containers/Matches";
import CreateMatch from "../containers/CreateMatch";
import MatchDetails from "../containers/MatchDetails";
// import Fields from "../containers/Fields";
// import FieldDetails from "../containers/FieldDetails";
import Profile from "../containers/Profile";
import Tutorial from "../containers/Tutorial";

const PrivateRoute = () => (
    <Switch>
        <Route exact path="/my/matches" component={Matches}/>
        <Route exact path="/my/tutorial" component={Tutorial}/>
        <Route exact path='/my/matches/create' component={CreateMatch}/>
        <Route exact path='/my/matches/:id' component={MatchDetails} />
        {/*<Route exact path='/my/fields' component={Fields}/>*/}
        {/*<Route exact path='/my/fields/:id' component={FieldDetails}/>*/}
        <Route exact path="/my/profile/:id" component={Profile}/>
    </Switch>
);
export default PrivateRoute;