import React from 'react';
import ReactDOM from 'react-dom';
import './style/Index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

/////////   REDUX AND REDUCERS   /////////
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import AllReducers from './reducers/Allreducers.js';
// import store from './helpers/store.js';

/////////   MATERIAL UI   /////////
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';


const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: {
      main: '#ec407a',
    },
  },
});


const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(AllReducers);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

serviceWorker.unregister();
