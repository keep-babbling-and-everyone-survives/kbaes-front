import {combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';

//import Reducers files
import Authreducer from './Authreducers';

const AllReducers = combineReducers ({
    auth: Authreducer,
    form: formReducer,

});

export default AllReducers;
