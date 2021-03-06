import React, { Component } from 'react';
import { Router, Route } from 'react-router';
import history  from '../helpers/History';
// import socketIOclient from "socket.io-client";

import '../style/App.css';

import User from './User.js';


class App extends Component {
  render() {

    return (
      <div className="App">
        <header className="App-header">
        <Router history={history}>
        <Route path="/" component={User}/>
        </Router>
        </header>
      </div>

    );
  }
}

export default App;
