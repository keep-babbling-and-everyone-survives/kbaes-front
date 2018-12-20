import React, { Component } from 'react';
import logo from '../raspberryred.svg';
import axios from 'axios';


class Newgame extends Component {
  constructor(props){
      super(props);
      this.state ={
        NewGame: false,
      };
    }

    componentDidMount(){
      const API_URL = 'http://192.168.1.192';

      axios.get(`http://192.168.1.192/api/game/start`,{
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
      }).then((res)=>{
      }).catch((error)=>{
        alert("Error in API call (Newgame)! ! ! ! !")
      });
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
