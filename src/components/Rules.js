import React, { Component } from 'react';
import Tracker from './Tracker';
// import logo from '../raspberryred.svg';
import axios from 'axios';

//import material UI
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';

var Config = require("../app.conf.json");


class Rules extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buttonPressed: 0,
            rulesets: '',
            gotdata: false,
            open: false,
            anchorEl: null,
            soluce: [ ]
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
        });
        console.log("test " + this)
        
    };

    handleClose = (button) => {
        this.setState({
            anchorEl: null,
            open: false
        });
    };

    render() {
        const { anchorEl } = this.state;
        const openApp = Boolean(anchorEl);
        let rulesets = []
        if (this.state.gotdata) {
            console.log(this.state.rulesets)
            for (let rs of this.state.rulesets) {
                var colors = [
                    rs.combination[0]? 'green': 'grey',
                    rs.combination[1]? 'yellow': 'grey',
                    rs.combination[2]? 'red': 'grey',
                    rs.combination[3]? 'blue': 'grey'            
                ]
                var leds= []

                for (let [index, color] of colors.entries()){
                    leds.push(
                        <span key={index} style={{color: color}}>&#9899;</span>
                    )
                }
                var soluce = [
                    rs.modules[0].solution == 1 ? 'true': 'false',
                    rs.modules[1].solution == 1 ? 'true': 'false',
                    rs.modules[2].solution == 1 ? 'true': 'false'
                ]
                
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
                  
                </Popover>
                </li>
                )

                
                // if (soluce !== undefined){
                //  return(
                //      <p> {soluce}</p>
                //  )
                // } else {
                //     return(
                //     <p> Don't Press</p>

                //     )
                // }
                // console.log(soluce);     
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
