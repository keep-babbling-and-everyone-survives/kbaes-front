import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Axios from 'axios';

const Config = require("../app.conf.json");

class Tracker extends Component {

    constructor(props) {
        super(props);
        this.state = {
            GameQueried: false,
            Errors: 0,
            Solved: 0,
            Modules: 0,
            Chances: 0,
            HasNext: true,
            Failed: false
        };
    }

    componentDidMount() {
        if (window.Echo !== undefined) {
            window.Echo.private('game.' + localStorage.game_id)
                .listen('Website\\GameUpdate', this.updateGame);
        } else {
            window.Connection.then(() => {
                window.Echo.private('game.' + localStorage.game_id)
                    .listen('Website\\GameUpdate', this.updateGame)
            });
        }
        this.getGameStatus();
    }

    getGameStatus() {
        Axios.get(`${Config.API_URL}/api/game/${localStorage.game_id}`)
            .then(res => {
                this.setState({
                    GameQueried: true,
                    Errors: res.data.errors,
                    Modules: res.data.modules,
                    Solved: res.data.solved,
                    Chances: parseInt(res.data.chances),
                })
            }).catch(error => {
                console.log(error);
            });
    }

    updateGame = e => {
        // React Logic here
        //Game's info (number of ruleset, and for each ruleset true or false)
        console.log(`Got update from game ${localStorage.game_id}`);
        const update = e.update;
        const game = e.game;

        if (!update.hasNext) {
            this.setState({
                HasNext: false,
                Status: game.status,
                Failed: update.failed
            });
        }
        this.setState({
            Errors: update.errors,
            Solved: update.solved
        });
    }

    render() {
        let errorsDisplay;
        if (!this.state.GameQueried) {
            errorsDisplay = <CircularProgress />;
        } else {
            errorsDisplay = <div style={{display:"flex", alignItems: 'baseline', justifyContent: 'center'}}><Typography component="h2" variant="h1" >{this.state.Errors}</Typography><Typography variant="overline">/{this.state.Chances}</Typography></div>
        }
        let remainingDisplay;
        if (!this.state.GameQueried) {
            remainingDisplay = <CircularProgress />;
        } else {
            remainingDisplay = <Typography component="h2" variant="h1" >{this.state.Modules - this.state.Solved}</Typography>
        }

        if (! this.state.HasNext) {
            if (this.state.Failed) {
                return ( <div>
                    Perdu !
                </div>);
            } else {
                return ( <div>
                    Gagné !
                </div>);
            }
            // return Gagné/Perdu
        }
        return (
            <div>
                <Card>
                    <CardContent>
                        <Typography variant="overline">
                            Erreurs
                        </Typography>
                        {errorsDisplay}
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography variant="overline">
                            Restant
                        </Typography>
                        {remainingDisplay}
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default Tracker;
