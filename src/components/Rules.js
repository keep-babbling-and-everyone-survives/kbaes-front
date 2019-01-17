import React, { Component } from 'react';
import Tracker from './Tracker';
// import logo from '../raspberryred.svg';
import axios from 'axios';

//import material UI
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import { parse } from 'path';

var Config = require("../app.conf.json");


class Rules extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonPressed: 0,
            rulesets: {},
            gotdata: false,
            open: false,
            anchorEl: null,
            currentSolution: []
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

    handleOpen = (e) => {
        this.setState({
            anchorEl: e.currentTarget,
            open: true,
            currentSolution: this.renderSolution(e.currentTarget.value)
        });
    };

    handleClose = (button) => {
        this.setState({
            anchorEl: null,
            open: false
        });
    };

    renderSolution(solutionId) {
        let solutions = [];
        for (let rs of this.state.rulesets) {
            if (rs.id === parseInt(solutionId))  {
                solutions = rs.modules.map(el => el.solution);
            }
        }
        let parsedSln=[];
        for (let psn of solutions) {
            parsedSln.push(psn===1?(<span>&#9746;</span>):(<span>&#9744;</span>));
        }
        return (
            <div style={{color: '#222', display: 'flex', justifyContent: 'space-around', fontSize: 3+"rem", width:"300px", padding:"20px 0"}}>{parsedSln}</div>
        );
    }

    render() {
        const { anchorEl } = this.state;
        const openApp = Boolean(anchorEl);
        let rulesets = []

        function shuffle(a) {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }

        if (this.state.gotdata) {
            for (let rs of this.state.rulesets) {
                var colors = [
                    rs.combination[0] ? 'green' : 'grey',
                    rs.combination[1] ? 'yellow' : 'grey',
                    rs.combination[2] ? 'red' : 'grey',
                    rs.combination[3] ? 'blue' : 'grey'
                ]
                var leds = []

                for (let [index, color] of colors.entries()) {
                    leds.push(
                        <span key={index} style={{ color: color, fontSize: 2 + 'em' }}>&#9679;</span>
                    )
                }

                leds = shuffle(leds);

                rulesets.push(
                    <li key={rs.id} className="solution-li">
                        <Button
                            value={rs.id}
                            size="medium"
                            variant="contained"
                            className="User-button"
                            color="primary"
                            onClick={this.handleOpen}>
                            {leds}
                        </Button>
                    </li>
                )
            }
        }

        return (
            <div>
                <Tracker />
                <ul style={{display: "flex", width: "600px", flexWrap: "wrap"}}>
                    {rulesets}
                </ul>
                <div className="modal-solution"
                    open={this.state.open}
                    onClose={this.handleClose}>
                    <p className="modal-text"> SOLUTION</p>
                </div>
                
                <Popover
                    open={openApp}
                    anchorEl={anchorEl}
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}>
                    {this.state.currentSolution}
                </Popover>
            </div>
        )
    }
}

export default Rules;
