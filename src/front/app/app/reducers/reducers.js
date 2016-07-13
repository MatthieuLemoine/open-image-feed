import { combineReducers } from 'redux';
import post, * as fromPost from '../../posts/reducers/reducers';
import user, * as fromUser from '../../users/reducers/reducers';

const rootReducer = combineReducers({
  user,
  post
});

export default rootReducer;

// Posts selector
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

// Users selector
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
