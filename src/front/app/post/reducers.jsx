import { combineReducers } from 'redux';
import {
  OPEN_POST_DIALOG, CLOSE_POST_DIALOG, REQUEST_ADD_POST, SUCCESS_ADD_POST, NEW_POST_FETCHED
} from './actions.jsx';

function notification(state = {
  isFetching    : false
}, action) {
  switch (action.type) {
    case REQUEST_ADD_POST:
      return Object.assign({}, state, {
        isFetching    : true
      });
    case SUCCESS_ADD_POST:
      return Object.assign({}, state, {
        isFetching : false,
        success    : true
      });
    case NEW_POST_FETCHED:
      return Object.assign({}, state, {
        isFetching : false,
        posts      : action.posts
      });
    case OPEN_POST_DIALOG:
      return Object.assign({}, state, {
        isFetching : false
      });
    case CLOSE_POST_DIALOG:
      return Object.assign({}, state, {
        isFetching : false
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  notification
});

export default rootReducer;
