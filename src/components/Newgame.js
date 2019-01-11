import React, { Component } from 'react';
// import logo from '../raspberryred.svg';
import axios from 'axios';
import Socketio from 'socket.io-client';
import Echo from 'laravel-echo';
import Button from '@material-ui/core/Button';

//import component
import Rules from './Rules';
import User from './User';

class Newgame extends Component {
    constructor(props){
            super(props);
            this.state ={
                    NewGame: false,
                    Rules: false
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
            this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
            const API_URL = 'http://192.168.1.192';
            // const socket = socketIOclient(this.state);

            axios.post(`${API_URL}/api/game/start`,{
                    "game_options": {}
                    },
                    {
                    headers: {
                            Accept: "application/json",
                            "Authorization": 'Bearer ' + localStorage.id_token,
                    },
            }).then((res)=>{
                    this.setChannel('game.' + res.data.channel_id); //have to store channel_id
                    console.log(localStorage);
                    console.log("setChannel done !");
                    window.Echo.private('game.' + res.data.channel_id ).listen('GameStarted', (e)=>{
                            console.log(e);
                    })
            }).catch((error)=>{
                    console.log("Error in API get call (Newgame)! ! ! ! !");
                    console.log(error);
            });
    }

    //Store channel_id
    setChannel= channel_id => {
            localStorage.setItem("channel_id", channel_id);
    }

    handleClick(e){
            console.log("You've cliked !!");
            //connect to the private
            window.Echo.private(localStorage.channel_id)
            .listen('Website\\GameCreatedSuccess', (e) => {
                    // React Logic here
                    //Game's info (number of ruleset, and for each ruleset true or false)
                    console.log(e);
                    console.log("Channel works in the handleClick !! ");
                    this.setState({
                        Rules: true
                    })
            });
    }

    render(){
        if(this.state.Rules === false) {
            return(
                    <div>
                        <p> Really nigga ??</p>
                        <Button size="medium" variant="contained" className="User-button" color="primary" onClick={this.handleClick}> Click </Button>
                    </div>
            );
        } else {
            return(
                <div>
                    <Rules />
                </div>
            );
        }
    }
}

export default Newgame;
