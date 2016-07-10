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

// isLogged selector
export function isLogged(state) {
  return fromUser.isLogged(state.user);
}
