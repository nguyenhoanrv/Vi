
import "./App.css";

import React, { Component } from "react";
import Home from './components/Home';
import Todo from './components/Todo';
import Login from './components/Login';
import Logout from './components/Logout';
import Update from './components/Update';
import Delete from './components/Delete';
import UpdateStatus from './components/UpdateStatus';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/todo/update_status/:id" component={UpdateStatus} />
        <Route path="/todo" component={Todo} />
        <Route path="/update/:id" component={Update} />
        <Route path="/delete/:id" component={Delete} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
      </Switch>
    );
  }
}
export default App;
