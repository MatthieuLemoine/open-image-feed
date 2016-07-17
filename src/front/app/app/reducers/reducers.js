import { combineReducers } from 'redux';
import post, * as fromPost from '../../posts/reducers/reducers';
import user, * as fromUser from '../../users/reducers/reducers';
import { ERROR_LOGIN, SUCCESS_LOGIN } from '../../users/actions/login';
import { ERROR_SIGNUP, SUCCESS_SIGNUP } from '../../users/actions/signup';
import {
  ERROR_ADD_POST, ERROR_GET_POSTS, SUCCESS_ADD_POST, ERROR_LIKE, ERROR_COMMENT, SUCCESS_COMMENT
} from '../../posts/actions/actions';

function root(state = {
  message      : ''
}, action) {
  switch (action.type) {
    case ERROR_GET_POSTS:
    case ERROR_ADD_POST:
    case ERROR_LOGIN:
    case ERROR_SIGNUP:
    case ERROR_LIKE:
    case ERROR_COMMENT:
    case SUCCESS_LOGIN :
    case SUCCESS_SIGNUP :
    case SUCCESS_ADD_POST :
    case SUCCESS_COMMENT :
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

export function hasErrorLike(state) {
  return fromPost.hasErrorLike(state.post);
}

export function hasErrorComment(state) {
  return fromPost.hasErrorComment(state.post);
}

export function isFetchingPosts(state) {
  return fromPost.isFetchingPosts(state.post);
}

export function isPersistingPost(state) {
  return fromPost.isPersistingPost(state.post);
}

export function isLiking(state) {
  return fromPost.isLiking(state.post);
}

export function isCommenting(state) {
  return fromPost.isCommenting(state.post);
}

// Users selectors
export function getUser(state) {
  return fromUser.getUser(state.user);
}

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
