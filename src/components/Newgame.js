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
            .then(this.initGame)
            .catch((error) => {
                console.log("Error in API get call (Newgame)! ! ! ! !");
                console.log(error);
            });
    }

    initGame = (res) => {
        this.setGameId(res.data.channel_id); //have to store channel_id
        console.log(localStorage);
        console.log("Listening to channel : game." + localStorage.channel_id);
        window.Echo.private('game.' + localStorage.game_id)
            .listen('Website\\GameCreatedSuccess', (e) => {
                // React Logic here
                //Game's info (number of ruleset, and for each ruleset true or false)
                console.log(e);
                console.log(`Got confirmation for game`);
                this.setState({
                    Rules: true
                })
            });
    }

    //Store channel_id
    setGameId = id => {
        localStorage.setItem("game_id", id);
    }

    render() {
        if (this.state.Rules === false) {
            return (
                <div>
                    <svg className="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
                        <circle class="path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
                    </svg>
                </div>
            );
        } else {
            return (
                <div>
                    <Rules />
                </div>
            );
        }
    }
}

export default Newgame;
