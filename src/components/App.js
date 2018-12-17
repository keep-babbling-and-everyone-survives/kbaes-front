import React, { Component } from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { history } from '../helpers/history';
import '../style/App.css';
import Homepage from './homepage.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Router history={history}>
            <Route path="/" component={Homepage}/>
          </Router>
        </header>
      </div>
    );
  }
}

export default App;
