import { combineReducers } from 'redux';
import post, * as fromPost from '../../posts/reducers/reducers';
import user, * as fromUser from '../../users/reducers/reducers';
import { ERROR_LOGIN, SUCCESS_LOGIN } from '../../users/actions/login';
import { ERROR_SIGNUP, SUCCESS_SIGNUP } from '../../users/actions/signup';
import {
  ERROR_ADD_POST, ERROR_GET_POSTS, SUCCESS_ADD_POST
} from '../../posts/actions/actions';

function root(state = {
  message      : ''
}, action) {
  switch (action.type) {
    case ERROR_GET_POSTS:
    case ERROR_ADD_POST:
    case ERROR_LOGIN:
    case ERROR_SIGNUP:
    case SUCCESS_LOGIN :
    case SUCCESS_SIGNUP :
    case SUCCESS_ADD_POST :
      return Object.assign({}, state, {
        message      : action.message
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  root,
  user,
  post
});

export default rootReducer;

// Root selectors
export function message(state) {
  return state.root.message;
}

// Posts selectors
export function getPosts(state) {
  return fromPost.getPosts(state.post);
}

export function hasErrorAddPost(state) {
  return fromPost.hasErrorAddPost(state.post);
}

export function hasErrorGetPosts(state) {
  return fromPost.hasErrorGetPosts(state.post);
}

export function isFetchingPosts(state) {
  return fromPost.isFetchingPosts(state.post);
}

export function isPersistingPost(state) {
  return fromPost.isPersistingPost(state.post);
}

// Users selectors
export function isLogged(state) {
  return fromUser.isLogged(state.user);
}

export function hasErrorLogin(state) {
  return fromUser.hasErrorLogin(state.user);
}

export function hasErrorSignup(state) {
  return fromUser.hasErrorSignup(state.user);
}

export function isFetchingUser(state) {
  return fromUser.isFetching(state.user);
}
