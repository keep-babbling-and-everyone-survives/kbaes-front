import React, { Component } from 'react';
// import logo from '../raspberryred.svg';
import axios from 'axios';
import Socketio from 'socket.io-client';
import Echo from 'laravel-echo';

class Newgame extends Component {
  constructor(props){
      super(props);
      this.state ={
        NewGame: false,
      };
      window.Echo = new Echo({
           broadcaster: 'socket.io',
           host: 'http://192.168.1.192:6001',
           client: Socketio,
           transports: ['websocket', 'polling', 'flashsocket'], //fix CORS issue
           auth: {
              headers: {
                Authorization: 'Bearer ' + localStorage.id_token,
              }
            }
       });
       
    }

    componentDidMount(){
      const API_URL = 'http://192.168.1.192';
      // const socket = socketIOclient(this.state);

      axios.post(`${API_URL}/api/game/start`,{
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: {
          "game_options": {},
        }
      }).then((res)=>{
        console.log(res);
        console.log('game.'+ res.data.channel_id);
        window.Echo.private('game.' + res.data.channel_id ).listen('GameStarted', (e)=>{
          console.log(e);
        })
      }).catch((error)=>{
        console.log("Error in API get call (Newgame)! ! ! ! !");
        console.log(error);

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


/*
function ActionLink() {
  function handleClick('game.${gameId}') {
    console.log('The gameId was called.');
  }
*/
