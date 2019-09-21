import React, {Component, Fragment} from 'react';
import {Route, Switch, withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import {Redirect} from "react-router";
import Matches from "./Matches";
import CreateMatch from "./CreateMatch";
import MatchDetails from "./MatchDetails";
import Fields from "./Fields";
import FieldDetails from "./FieldDetails";
import Profile from "./Profile";


class MainPrivate extends Component {
  
  render() {
    return (
      <Fragment>
        {
          this.props.user && this.props.user.token?
            (
              <Switch>
                <Route exact path="/" component={Matches}/>
                <Route exact path='/match/create' component={CreateMatch}/>
                <Route path='/matches/:id' component={MatchDetails} />
                <Route exact path='/fields' component={Fields}/>
                <Route path='/fields/:id' component={FieldDetails}/>
                <Route exact path="/profile/:id" component={Profile}/>
              </Switch>
            ) :
            <Redirect to={{ pathname: '/login', state: { from: this.props.location } }} />
        }
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.users.user
  }
};


export default withRouter(connect(mapStateToProps, null)(MainPrivate));



