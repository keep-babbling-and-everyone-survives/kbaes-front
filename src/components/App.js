import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import history  from '../helpers/History';
// import socketIOclient from "socket.io-client";

import '../style/App.css';

//import material UI
import{ MuiThemeProvider, createMuiTheme }from '@material-ui/core/styles';

import { AUTH_USER } from '../action/Types';

import User from './User.js';
import Rules from './Rules.js';


class App extends Component {
  render() {

    return (
      <div className="App">
        <header className="App-header">
        <Router history={history}>
        <Route path="/" component={Rules}/>
        </Router>
        </header>
      </div>

    );
  }
}

export default App;
