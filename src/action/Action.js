import axios from 'axios';

export const action = {
  TokenAuth,
  StartGame,

};

const API_URL = 'http://192.168.1.192';

function TokenAuth(){

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

function StartGame(){
  axios.get(`http://192.168.1.192/api/game/start`,{
    headers: {
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
  }).then((res)=>{
  }).catch((error)=>{
    alert("Error in API call (Newgame)! ! ! ! !")
  });
}
