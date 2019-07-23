import React from 'react';
import {Route, Switch} from "react-router";
import Register from './container/Register';
import Login from './container/Login';

function App() {
  return (
    <div className="App">
      <Switch>
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login}/>
        </Switch>
    </div>
  );
}

export default App;
