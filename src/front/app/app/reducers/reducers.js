import { combineReducers } from 'redux';
import post from '../../posts/reducers/reducers';
import user from '../../users/reducers/reducers';

const rootReducer = combineReducers({
  user,
  post
});

export default rootReducer;
