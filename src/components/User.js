import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import logo from '../raspberryred.svg';


import Newgame from './Newgame';

class User extends Component{

  constructor(props){
    super(props);
    this.state ={
      NewGame: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    const API_URL = 'http://192.168.1.192';

    axios.post(`${API_URL}/oauth/token`,
      'grant_type=client_credentials&client_id=3&client_secret=ST8K8Ji3lzSCHRmPkTtemvFIS77J4kTHmh2RLiiN&scope=web-scope',{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
    }).then((res)=>{
    }).catch((error)=>{
      alert("Error in API call ! ! ! ! !")
    });
  }

  handleClick = (e) =>{
    console.log('Clicked ! ! ! ! ! ! ! !')
    this.setState({
      NewGame: true
    })
  }

  render(){
    console.log(this.state);
    if(this.state.NewGame === false) {
        return (
          <div>
            <div>
              <p>Ready ?</p>
              <img src={logo} className="App-logo" alt="logo" />
            </div>
              <Button size="medium" variant="contained" className="User-button" color="primary" onClick={this.handleClick}> Let's do it ! </Button>
            </div>
        );
    } else {
      return(
          <Newgame />
      )
    }
  }
}

export default User;
