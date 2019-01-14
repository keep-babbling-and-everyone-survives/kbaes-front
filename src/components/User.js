import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import logo from '../raspberryred.svg';

//import component
// import TokenAuth from '../action/Action';
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
                'grant_type=password&client_id=1&client_secret=o7aYR3hvkuYFlpR6YEQWtmKdeKZc0yBy9mXi8dLO&scope=*&username=admin@admin.com&password=000000',{
                headers: {
                      Accept: "application/json",
                      "Content-Type": "application/x-www-form-urlencoded"
                },
          }).then((res)=>{
                this.setToken(res.data.access_token);
                return Promise.resolve(res);
          }).catch((error)=>{
                console.log("Error in API call ! ! ! ! !");
                console.log(error);
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
                );
          }
  }
}

// function mapStateToProps(state){
//   const {TokenAuth} = state;
// }


export default User;
