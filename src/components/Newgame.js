import React, { Component } from 'react';
import logo from '../raspberryred.svg';


class Newgame extends Component {
  constructor(props){
      super(props);
      this.state ={
        NewGame: false,
      };
    }

  render(){
    return(
      <div>
          <p> Start the game</p>
      </div>
    );
  }
}

export default Newgame;
