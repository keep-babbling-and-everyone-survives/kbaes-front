import React, { Component } from 'react';
import Tracker from './Tracker';
// import logo from '../raspberryred.svg';
import axios from 'axios';

//import material UI
import Button from '@material-ui/core/Button';

//import component
// import NewGame from './Newgame';
// import User from './User';

var Config = require("../app.conf.json");


class Rules extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonPressed: 0,
            rulesets: '',
            gotdata: false,
            open: false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        const API_URL = Config.API_URL;
        const gameId = localStorage.game_id
        axios.get(`${API_URL}/api/gameBoardModule/${gameId}`)
            .then((res) => {
                this.setState({ rulesets: res.data, gotdata: true })
            }).catch((error) => {
                console.log("Error in API call (Rules) ! ! !");
                console.log(error);
            })
    }

    handleClick = (button) => {
        this.setState({
            open: true
        });
    }

    handleOpen = (button) => {
        this.setState({
            open: true
        });
    };

    handleClose = (button) => {
        this.setState({
            open: false
        });
    };

    render() {
        let rulesets = []
        if (this.state.gotdata) {
            for (let rs of this.state.rulesets) {
                rulesets.push(
                    <li key={rs.id} className="solution-li">
                        <Button
                            value={rs.id}
                            size="medium"
                            variant="contained"
                            className="User-button"
                            color="primary"
                            onClick={this.handleOpen}>
                            {rs.combination}
                        </Button>
                    </li>

                )
            }
        }

        return (
            <div>
                <Tracker />
                <ul>
                    {rulesets}
                </ul>
                <div className="modal-solution"
                    open={this.state.open}
                    onClose={this.handleClose}>
                    <p className="modal-text"> SOLUTION</p>
                </div>
            </div>
        )
    }
}

export default Rules;
