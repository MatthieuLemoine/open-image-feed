import fetch from 'isomorphic-fetch';
import io from 'socket.io-client';
import { browserHistory } from 'react-router';
import { checkStatus, parseJSON } from '../../utils/http';

const socket = io(`${window.location.protocol}//${window.location.host}`);

export const REQUEST_ADD_POST  = 'REQUEST_ADD_POST';
export const SUCCESS_ADD_POST  = 'SUCCESS_ADD_POST';
export const ERROR_ADD_POST    = 'ERROR_ADD_POST';
export const NEW_POST_FETCHED  = 'NEW_POST_FETCHED';
export const FEED_WATCHED      = 'FEED_WATCHED';
export const ERROR_GET_POSTS   = 'ERROR_GET_POSTS';


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

function errorAddPost() {
  return {
    type  : ERROR_ADD_POST
  };
}

function newPostFetched(post) {
  return {
    type  : NEW_POST_FETCHED,
    post
  };
}

function errorGetPosts() {
  return {
    type  : ERROR_GET_POSTS
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
      .then(checkStatus)
      .then(() => dispatch(successAddPost()))
      .then(() => browserHistory.push('/'))
      .catch(() => dispatch(errorAddPost()));
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
    // TODO Listen for updated / deleted documents
    socket
      .on('post-created', (data) => {
        dispatch(newPostFetched(data));
      });
    // Get initial POSTS
    return fetch('/posts')
      .then(checkStatus)
      .then(parseJSON)
      .then(posts => dispatch(feedWatched(posts)))
      .catch(() => dispatch(errorGetPosts()));
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
