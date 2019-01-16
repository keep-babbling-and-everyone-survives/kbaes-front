import React, { Component } from 'react';
import logo from '../raspberryred.svg';
import User from './User';

class Homepage extends Component {

  constructor(props){
      super(props);
      this.state ={
        NewGame: false,
      };
    }

  render(){
    if (this.state.NewGame === false){
      return(
        <div>
          <div>
            <p>Still Homepage</p>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <User />
        </div>
      );
    } else {
      return(
        <p>Change Homepage </p>
      );
    }
  }
}

export default Homepage;