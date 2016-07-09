import {
  REQUEST_ADD_POST, SUCCESS_ADD_POST, NEW_POST_FETCHED, FEED_WATCHED
} from '../actions/actions';

export default function post(state = {
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
