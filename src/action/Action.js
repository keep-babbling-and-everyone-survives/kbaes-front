import axios from 'axios';
import history from '../helpers/History';

const API_URL = 'http://192.168.1.192';



// axios.request({
//   url: `${API_URL}/oauth/token`,
//   method: "post",
//   headers: {
//         "Content-Type": "application/json"
//   },
//   data: {
//     "grant_type": "client_credentials",
//     "scope": "public"
//   }.then(function(res) {
//     console.log(res);
//   }).catch(function(error) {
//     console.log(error);
//     getKeyError();
//   })
// });


// export function Access() {
//   return function() {
//     axios.post(`${API_URL}/oauth/token`, {
//
//     })
//   }
// }
//
// //////// GET ////////
// export function User(){
//   return function(dispatch) {
//     axios.get(`${API_URL}/oauth/token`, {
//       Authorization: 'Bearer ' + token
//     })
//   }
// }
