import React, {Fragment} from 'react';
import { Route } from "react-router";
import Matches from './containers/Matches';
import CreateMatch from "./containers/CreateMatch";
import Fields from "./containers/Fields";
import FieldDetails from "./containers/FieldDetails";
import MatchDetails from "./containers/MatchDetails";


const MainRoutes = () => (
    <Fragment>
        <Route exact path='/match/create' component={CreateMatch}/>
        <Route path='/matches/:id' component={MatchDetails} />
        <Route exact path='/fields' component={Fields}/>
        <Route path='/fields/:id' component={FieldDetails}/>
        <Route path="/matches" component={Matches}/>
    </Fragment>
);

export default MainRoutes;
