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
            buttonPressed: 0,
            rulesets: '',
            gotdata: false,
            open: false
        };
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        const API_URL = 'http://192.168.1.192';

        axios.get(`${API_URL}/api/gameBoardModule/57`
        ).then((res)=>{
            console.log("RES IN RULES PAGE !! ");
            console.log(res);
            this.setState({
                rulesets: res.data.rule_sets,
                gotdata: true
            });
        }).catch((error)=>{
            console.log("Error in API call (Rules) ! ! !");
            console.log(error);
        })
    }

    handleClick = (button) => {
        this.setState({
            open: true
        });
        console.log("state in handleClick");
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

    render(){
        //console.log(this.state.rulesets);

    // outerArray : this.state.rulesets
    //outerElement : id
    // innerElement : name
    // innerArray: modules
    //
    // if (this.state.buttonPressed === 1){
    //     <div>
    //     <ul>
    //     {this.state.rulesets.map(id => {
    //         return id.modules.map(name => (
    //             <li>{name}</li>
    //         ))
    //     })}
    //     </ul>
    //     </div>
    //
    // }else {
    //     return(
    //         console.log("err")
    //     )
    // }
        console.log(this.state.rulesets);
        let rulesets = []
        if (this.state.gotdata){
            for (let rs of this.state.rulesets){
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


        return(
            <div>
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
