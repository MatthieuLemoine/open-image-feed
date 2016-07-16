import {
  REQUEST_ADD_POST, SUCCESS_ADD_POST, NEW_POST_FETCHED,
  FEED_WATCHED, ERROR_ADD_POST, ERROR_GET_POSTS,
  REQUEST_LIKE, SUCCESS_LIKE, ERROR_LIKE, POST_UPDATED
} from '../actions/actions';

export default function post(state = {
  isFetching   : false,
  isPersisting : false,
  posts        : []
}, action) {
  switch (action.type) {
    case REQUEST_ADD_POST:
      return Object.assign({}, state, {
        isPersisting : true
      });
    case SUCCESS_ADD_POST:
      return Object.assign({}, state, {
        isPersisting : false,
        errorAddPost : false
      });
    case ERROR_ADD_POST:
      return Object.assign({}, state, {
        isPersisting : false,
        errorAddPost : true
      });
    case NEW_POST_FETCHED:
      return Object.assign({}, state, {
        posts : [action.post].concat(state.posts)
      });
    case POST_UPDATED:
      return Object.assign({}, state, {
        posts : updatePosts(action.post, state.posts)
      });
    case FEED_WATCHED:
      return Object.assign({}, state, {
        isFetching    : false,
        posts         : action.posts,
        errorGetPosts : false
      });
    case ERROR_GET_POSTS:
      return Object.assign({}, state, {
        isFetching    : false,
        errorGetPosts : true
      });
    case REQUEST_LIKE:
      return Object.assign({}, state, {
        isLiking : true
      });
    case SUCCESS_LIKE:
      return Object.assign({}, state, {
        isLiking  : false,
        errorLike : false
      });
    case ERROR_LIKE:
      return Object.assign({}, state, {
        isLiking : false,
        errorLike    : true
      });
    default:
      return state;
  }
}

function updatePosts(updatedPost, posts) {
  const index = posts.reduce((prev, item, idx) => {
    if (updatedPost.id === item.id) {
      return idx;
    }
    return prev;
  }, -1);

  return [
    ...posts.slice(0, index),
    updatedPost,
    ...posts.slice(index + 1, posts.size)
  ];
}

// Posts selector
export function getPosts(state) {
  return state.posts;
}

export function hasErrorAddPost(state) {
  return state.errorAddPost;
}

export function hasErrorGetPosts(state) {
  return state.errorGetPosts;
}

export function hasErrorLike(state) {
  return state.errorLike;
}

export function isFetchingPosts(state) {
  return state.isFetching;
}

export function isPersistingPost(state) {
  return state.isPersisting;
}

export function isLiking(state) {
  return state.isLiking;
}
