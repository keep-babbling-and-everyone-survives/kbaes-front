import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import logo from '../raspberryred.svg';
import TokenAuth from '../action/Action';

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
      'grant_type=password&client_id=2&client_secret=IhF7xsFlyQDFqucpZpxjcgelza8pPkCZrMRJHl3Y&scope=*&username=admin@admin.com&password=000000',{
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
      },
    }).then((res)=>{
      console.log(res);
      this.setToken(res.data.access_token);
      console.log("RESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");
      console.log(localStorage);
      return Promise.resolve(res);

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

  setToken = id_token => {
    localStorage.setItem("id_token", id_token);
  }


  render(){
    console.log(this.state);
    console.log("localStorage");
    console.log(localStorage);
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

// function mapStateToProps(state){
//   const {TokenAuth} = state;
// }


export default User;
