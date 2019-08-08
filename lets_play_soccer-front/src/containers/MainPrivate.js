import React, {Component, Fragment} from 'react';
import {withRouter} from "react-router-dom";
import {connect} from 'react-redux';
import Toolbar from "../components/UI/Toolbar";
import {logoutUser} from "../store/actions/userAction";
import MainRoutes from '../MainRoutes';
import {Redirect} from "react-router";


class MainPrivate extends Component {
  
  render() {
    return (
      <Fragment>
        {
          this.props.user?
            (
              <Fragment>
                <header>
                  <Toolbar user={this.props.user} logout={this.props.onLogoutUser} />
                </header>
                <main>
                  <div className='container'>
                     <MainRoutes />
                  </div>
                </main>
              </Fragment>
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

const mapDispatchToProps = dispatch => ({
  onLogoutUser: () => dispatch(logoutUser())
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainPrivate));



