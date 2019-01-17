import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import logo from '../raspberryred.svg';
import Echo from 'laravel-echo';
import Socketio from 'socket.io-client';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


//import component
// import TokenAuth from '../action/Action';
import Newgame from './Newgame';
var Config = require("../app.conf.json");

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            NewGame: false,
            modules: 5,
            time: 60,
            chances: 2
        };
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        const API_URL = Config.API_URL;
        const params = new URLSearchParams();
        params.append("grant_type", "password");
        params.append("client_id", Config.OAUTH_CLIENT_ID);
        params.append("client_secret", Config.OAUTH_CLIENT_SECRET);
        params.append("scope", "*");
        params.append("username", Config.ADMIN_USER);
        params.append("password", Config.ADMIN_PASSWORD);

        const reqConf = {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };

        window.Connection = axios.post(`${API_URL}/oauth/token`, params, reqConf)
            .then((res) => {
                this.setToken(res.data.access_token);
                this.connectEcho();
                return Promise.resolve()
            }).catch((error) => {
                console.log("Error in API call ! ! ! ! !");
                console.log(error);
            });
    }

    connectEcho() {
        window.Echo = new Echo({
            broadcaster: 'socket.io',

            host: `${Config.SOCKETIO_URL}:${Config.SOCKETIO_PORT}`,
            client: Socketio,
            transports: ['websocket', 'polling', 'flashsocket'], //fix CORS issue
            auth: {
                headers: {
                    Authorization: 'Bearer ' + localStorage.id_token,
                }
            }
        });
    }

    handleClick = (e) => {
        console.log('Clicked ! ! ! ! ! ! ! !')
        this.setState({
            NewGame: true
        })
    }

    setToken = id_token => {
        localStorage.setItem("id_token", id_token);
    }

    handleInputChange = (e) => {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        if (this.state.NewGame === false) {
            return (
                <div>
                    <div>
                        <p>Ready ?</p>
                        <img src={logo} className="App-logo" alt="logo" />
                    </div>
                    <Button size="medium" variant="contained" className="User-button" color="primary" onClick={this.handleClick}> Let's do it ! </Button>
                    <Grid container justify="center" style={{marginTop:"20px"}}>
                        <Grid item xs={4}>
                            <Typography variation="overline" style={{color: "white"}}>Temps:<br/> <input name="time" type="number" value={this.state.time} onChange={this.handleInputChange} style={{width: "80px"}}/></Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variation="overline" style={{color: "white"}}>Chances:<br/> <input name="chances" type="number" value={this.state.chances} onChange={this.handleInputChange} style={{width: "80px"}}/></Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variation="overline" style={{color: "white"}}>Modules:<br/> <input name="modules" type="number" value={this.state.modules} onChange={this.handleInputChange} style={{width: "80px"}}/></Typography>
                        </Grid>
                    </Grid>
                </div>
            );
        } else {
            return (
                <Newgame 
                modules={this.state.modules}
                chances={this.state.chances}
                time={this.state.time}/>
            );
        }
    }
}

// function mapStateToProps(state){
//   const {TokenAuth} = state;
// }


export default User;
