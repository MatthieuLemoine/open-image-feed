import fetch from 'isomorphic-fetch';
import io from 'socket.io-client';

const socket = io(`${window.location.protocol}//${window.location.host}`);

export const REQUEST_ADD_POST  = 'REQUEST_ADD_POST';
export const SUCCESS_ADD_POST  = 'SUCCESS_ADD_POST';
export const NEW_POST_FETCHED  = 'NEW_POST_FETCHED';
export const FEED_WATCHED      = 'FEED_WATCHED';
export const DIALOG_REGISTERED = 'DIALOG_REGISTERED';


function requestAddPost() {
  return {
    type  : REQUEST_ADD_POST
  };
}

function successAddPost() {
  return {
    type  : SUCCESS_ADD_POST
  };
}

function newPostFetched(post) {
  return {
    type  : NEW_POST_FETCHED,
    post
  };
}

function feedWatched(posts) {
  return {
    type : FEED_WATCHED,
    posts
  };
}

function persistPost(post, state) {
  return dispatch => {
    post.author = state.user.user.username;
    dispatch(requestAddPost());
    return fetch('/posts', {
      method  : 'POST',
      headers : {
        Accept         : 'application/json',
        'Content-Type' : 'application/json',
        Authorization  : state.user.user.authHeader
      },
      body    : JSON.stringify(post)
    })
      .then(() => dispatch(successAddPost()));
  };
}

function shouldPersistPost(state) {
  const post = state.post;
  if (!post) {
    return true;
  }
  if (post.isPersisting) {
    return false;
  }
  return true;
}

export function persistPostIfNeeded(post) {
  return (dispatch, getState) => {
    if (shouldPersistPost(getState())) {
      return dispatch(persistPost(post, getState()));
    }
    return Promise.resolve();
  };
}

function watchFeed() {
  return dispatch => {
    // Watch feed
    socket
      .on('post-change', (data) => {
        dispatch(newPostFetched(data.new_val));
      });
    // Get initial POSTS
    return fetch('/posts')
      .then(response => response.json())
      .then(posts => dispatch(feedWatched(posts)));
  };
}

function shouldWatchFeed(state) {
  const post = state.post;
  if (!post) {
    return true;
  }
  if (post.isFetching) {
    return false;
  }
  return true;
}

export function watchFeedIfNeeded() {
  return (dispatch, getState) => {
    if (shouldWatchFeed(getState())) {
      return dispatch(watchFeed(getState));
    }
    return Promise.resolve();
  };
}
