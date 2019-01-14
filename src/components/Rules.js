import React, { Component } from 'react';
// import logo from '../raspberryred.svg';
import axios from 'axios';
import Socketio from 'socket.io-client';
import Echo from 'laravel-echo';

//import material UI
import Button from '@material-ui/core/Button';

//import component
// import NewGame from './Newgame';
// import User from './User';


class Rules extends Component {
    constructor(props) {
        super(props);
        this.state ={

        };
    }
    componentDidMount() {
        const API_URL = 'http://192.168.1.192';
        axios.get(`${API_URL}/api/gameBoardModule/57`
        ).then((res)=>{
            console.log("RES IN RULES PAGE !! ");
            console.log(res);
            this.setState({rulesets: res.data})
        }).catch((error)=>{
            console.log("Error in API call (Rules) ! ! !");
            console.log(error);
        })
    }


    render(){
        console.log(this.state.rulesets);
        return(
            <div>
                <ul>
                    <li className="solution-li">
                        <Button size="medium" variant="contained" className="User-button" color="primary" onClick={this.handleClick}> Solution 1 </Button>
                    </li>
                    <li className="solution-li">
                        <Button size="medium" variant="contained" className="User-button" color="primary" onClick={this.handleClick}> Solution 2 </Button>
                    </li>
                    <li className="solution-li">
                        <Button size="medium" variant="contained" className="User-button" color="primary" onClick={this.handleClick}> Solution 3 </Button>
                    </li>
                    <li className="solution-li">
                        <Button size="medium" variant="contained" className="User-button" color="primary" onClick={this.handleClick}> Solution 4 </Button>
                    </li>
                    <li className="solution-li">
                        <Button size="medium" variant="contained" className="User-button" color="primary" onClick={this.handleClick}> Solution 5 </Button>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Rules;
