import { combineReducers } from 'redux';
import pushReducer from './push/reducers.jsx';
import userReducer from './users/reducers.jsx';

const rootReducer = combineReducers({
  userReducer,
  pushReducer
});

export default rootReducer;
