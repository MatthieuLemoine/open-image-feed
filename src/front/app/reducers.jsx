import { combineReducers } from 'redux';
import postReducer from './post/reducers.jsx';
import userReducer from './users/reducers.jsx';

const rootReducer = combineReducers({
  userReducer,
  postReducer
});

export default rootReducer;
