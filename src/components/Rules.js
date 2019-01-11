import React, { Component } from 'react';
// import logo from '../raspberryred.svg';
import axios from 'axios';
import Socketio from 'socket.io-client';
import Echo from 'laravel-echo';

//import material UI
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

//improt component
import NewGame from './Newgame';
import User from './User';

class Rules extends Component {
    constructor(props) {
        super(props);
        this.state ={

        };
    }


    render(){
        return(
            <div>
                <List>
                    <ListItem>
                        <ListItemText primary="Single-line item"/>
                    </ListItem>
                </List>
            </div>
        )
    }
}

export default Rules;
