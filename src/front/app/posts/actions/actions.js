import fetch from 'isomorphic-fetch';
import io from 'socket.io-client';
import { browserHistory } from 'react-router';
import { checkStatus, parseJSON } from '../../utils/http';

const socket = io(`${window.location.protocol}//${window.location.host}`);

export const REQUEST_ADD_POST = 'REQUEST_ADD_POST';
export const SUCCESS_ADD_POST = 'SUCCESS_ADD_POST';
export const ERROR_ADD_POST   = 'ERROR_ADD_POST';
export const NEW_POST_FETCHED = 'NEW_POST_FETCHED';
export const POST_UPDATED     = 'POST_UPDATED';
export const FEED_WATCHED     = 'FEED_WATCHED';
export const ERROR_GET_POSTS  = 'ERROR_GET_POSTS';
export const REQUEST_LIKE     = 'REQUEST_LIKE';
export const SUCCESS_LIKE     = 'SUCCESS_LIKE';
export const ERROR_LIKE       = 'ERROR_LIKE';


function requestAddPost() {
  return {
    type  : REQUEST_ADD_POST
  };
}

function successAddPost() {
  return {
    type    : SUCCESS_ADD_POST,
    message : 'Post created'
  };
}

function errorAddPost() {
  return {
    type    : ERROR_ADD_POST,
    message : 'Error while saving your post. Please check the form before submitting again'
  };
}

function newPostFetched(post) {
  return {
    type  : NEW_POST_FETCHED,
    message : 'New post fetched',
    post
  };
}

function postUpdated(post) {
  return {
    type    : POST_UPDATED,
    message : 'Post updated',
    post
  };
}

function errorGetPosts() {
  return {
    type  : ERROR_GET_POSTS,
    message : 'Error while fetching the posts. Please check your internet connection'
  };
}

function feedWatched(posts) {
  return {
    type : FEED_WATCHED,
    posts
  };
}

function requestLike() {
  return {
    type  : REQUEST_LIKE
  };
}

function successLike(postId) {
  return {
    type    : SUCCESS_LIKE,
    postId
  };
}

function errorLike() {
  return {
    type    : ERROR_LIKE,
    message : 'Error while liking/unliking this post. Please try again'
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
    socket
      .on('post-updated', (data) => {
        dispatch(postUpdated(data));
      });
    socket
      .on('post-deleted', () => {
        // Not handled yet
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
      return dispatch(watchFeed());
    }
    return Promise.resolve();
  };
}

function doLike(postId, state) {
  return dispatch => {
    dispatch(requestLike());
    return fetch(`/likes/${postId}`, {
      method  : 'POST',
      headers : {
        Accept         : 'application/json',
        'Content-Type' : 'application/json',
        Authorization  : state.user.user.authHeader
      }
    })
      .then(checkStatus)
      .then(() => dispatch(successLike(postId)))
      .catch(() => dispatch(errorLike()));
  };
}

export function like(postId) {
  return (dispatch, getState) => dispatch(doLike(postId, getState()));
}