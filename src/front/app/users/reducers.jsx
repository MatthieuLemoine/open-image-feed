import { combineReducers } from 'redux';
import {
  INVALIDATE_USERS,
  REQUEST_USERS, RECEIVE_USERS
} from './actions.jsx';

function users(state = {
  isFetching    : false,
  didInvalidate : false,
  items         : []
}, action) {
  switch (action.type) {
    case INVALIDATE_USERS:
      return Object.assign({}, state, {
        didInvalidate : true
      });
    case REQUEST_USERS:
      return Object.assign({}, state, {
        isFetching    : true,
        didInvalidate : false
      });
    case RECEIVE_USERS:
      return Object.assign({}, state, {
        isFetching    : false,
        didInvalidate : false,
        items         : action.users,
        lastUpdated   : action.receivedAt
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  users
});

export default rootReducer;
