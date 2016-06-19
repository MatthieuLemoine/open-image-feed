import { combineReducers } from 'redux';
import {
  OPEN_POST_DIALOG, CLOSE_POST_DIALOG, REQUEST_ADD_POST,
  SUCCESS_ADD_POST, NEW_POST_FETCHED, FEED_WATCHED, DIALOG_REGISTERED
} from './actions.jsx';

function dialog(state = {
  isOpened     : false,
  isRegistered : false
}, action) {
  switch (action.type) {
    case OPEN_POST_DIALOG:
      return Object.assign({}, state, {
        isOpened : true
      });
    case CLOSE_POST_DIALOG:
      return Object.assign({}, state, {
        isOpened : false
      });
    case DIALOG_REGISTERED:
      return Object.assign({}, state, {
        isRegistered : true,
        ref          : action.dialog
      });
    default:
      return state;
  }
}

function post(state = {
  isFetching   : false,
  isPersisting : false,
  posts        : []
}, action) {
  switch (action.type) {
    case REQUEST_ADD_POST:
      return Object.assign({}, state, {
        isPersisting    : true
      });
    case SUCCESS_ADD_POST:
      return Object.assign({}, state, {
        isPersisting : false,
        success    : true
      });
    case NEW_POST_FETCHED:
      return Object.assign({}, state, {
        posts      : action.posts
      });
    case FEED_WATCHED:
      return Object.assign({}, state, {
        isFetching : true
      });
    default:
      return state;
  }
}
const rootReducer = combineReducers({
  dialog,
  post
});

export default rootReducer;
