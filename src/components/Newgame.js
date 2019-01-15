import React, { Component } from 'react';
// import logo from '../raspberryred.svg';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';

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
    }

    componentDidMount() {
        const API_URL = Config.API_URL;
        const body = { "game_options": {
            "time": 60,
            "modules": 3,
            "errors": 1,
        } };
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
        console.log("Listening to channel : game." + localStorage.game_id);
        const gameStatus = res.data.status;
        if (gameStatus === "running") {
            this.setState({ Rules: true });
        }
        if (window.Echo !== undefined) {
            window.Echo.private('game.' + localStorage.game_id)
                .listen('Website\\GameCreatedSuccess', this.confirmGame);
        } else {
            window.Connection.then(() => {
                window.Echo.private('game.' + localStorage.game_id)
                .listen('Website\\GameCreatedSuccess', this.confirmGame);
            });
        }
    }

    confirmGame = e => {
        console.log(e);
        console.log(`Got confirmation for game ${localStorage.game_id}`);
        this.setState({
            Rules: true
        })
    }

    //Store channel_id
    setGameId = id => {
        localStorage.setItem("game_id", id);
    }

    render() {
        if (this.state.Rules === false) {
            return (
                <div>
                    <CircularProgress />
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
