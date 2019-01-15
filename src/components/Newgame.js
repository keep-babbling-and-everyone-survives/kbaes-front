import React, { Component } from 'react';
// import logo from '../raspberryred.svg';
import axios from 'axios';
import Socketio from 'socket.io-client';
import Echo from 'laravel-echo';

//import material UI
import Button from '@material-ui/core/Button';

//import component
import Rules from './Rules';

var Config = require("../app.conf.json");


class Newgame extends Component {
    constructor(props) {
            super(props);
        this.state = {
                    NewGame: false,
            Rules: false,
            GameId: 0
            };
            window.Echo = new Echo({
                    broadcaster: 'socket.io',

            host: `${Config.API_URL}:${Config.SOCKETIO_PORT}`,
                    client: Socketio,
                    transports: ['websocket', 'polling', 'flashsocket'], //fix CORS issue
                    auth: {
                        headers: {
                            Authorization: 'Bearer ' + localStorage.id_token,
                        }
                    }
            });
    }

    componentDidMount() {
        const API_URL = Config.API_URL;
        const body = { "game_options": {} };
        const reqConfig = { headers: { "Accept": "application/json", "Authorization": 'Bearer ' + localStorage.id_token } };

        axios.post(`${API_URL}/api/game/start`, body, reqConfig)
                    console.log("Error in API get call (Newgame)! ! ! ! !");
                    console.log(error);
            });
    }

    //Store channel_id
    setChannel= channel_id => {
            localStorage.setItem("channel_id", channel_id);
    }

    handleClick = (e) => {
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
                        <p> Choose wisely ...</p>
                        <Button size="medium" variant="contained" className="User-button" color="primary" onClick={this.handleClick}> Ready now ? </Button>
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
