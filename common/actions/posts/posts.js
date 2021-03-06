import fetch from 'isomorphic-fetch';
import io from 'socket.io-client';
import { browserHistory } from 'react-router';
import { getAPIURL, getFeedURL, isBrowser } from '../../utils/config';
import { checkStatus, parseJSON } from '../../utils/http';

let socket;

const POSTS_BATCH_SIZE = 10;

export const REQUEST_ADD_POST    = 'REQUEST_ADD_POST';
export const SUCCESS_ADD_POST    = 'SUCCESS_ADD_POST';
export const ERROR_ADD_POST      = 'ERROR_ADD_POST';
export const REQUEST_FETCH_POSTS = 'REQUEST_FETCH_POSTS';
export const NEW_POST_FETCHED    = 'NEW_POST_FETCHED';
export const POST_UPDATED        = 'POST_UPDATED';
export const FEED_WATCHED        = 'FEED_WATCHED';
export const ERROR_GET_POSTS     = 'ERROR_GET_POSTS';
export const POSTS_FETCHED       = 'POSTS_FETCHED';
export const REQUEST_POSTS_COUNT = 'REQUEST_POSTS_COUNT';

function requestAddPost() {
  return {
    type  : REQUEST_ADD_POST
  };
}

function successAddPost() {
  return {
    type    : SUCCESS_ADD_POST,
    message : 'Post created.'
  };
}

function errorAddPost() {
  return {
    type    : ERROR_ADD_POST,
    message : 'Error while saving your post. Please check the form before submitting again.'
  };
}

function requestFetchPosts() {
  return {
    type  : REQUEST_FETCH_POSTS
  };
}

function newPostFetched(post) {
  return {
    type  : NEW_POST_FETCHED,
    message : 'New post fetched.',
    post
  };
}

function postUpdated(post) {
  return {
    type    : POST_UPDATED,
    message : 'Post updated.',
    post
  };
}

function errorGetPosts() {
  return {
    type  : ERROR_GET_POSTS,
    message : 'Error while fetching the posts. Please check your internet connection.'
  };
}

function feedWatched(count) {
  return {
    type : FEED_WATCHED,
    count
  };
}

function postsFetched(posts) {
  return {
    type : POSTS_FETCHED,
    posts
  };
}

function requestPostsCount() {
  return {
    type  : REQUEST_POSTS_COUNT
  };
}

function persistPost(post, state, apiURL) {
  return dispatch => {
    dispatch(requestAddPost());
    const data = new FormData();
    data.append('image', post.image);
    data.append('imageHeight', post.imageHeight);
    data.append('imageWidth', post.imageWidth);
    data.append('title', post.title);
    return fetch(`${apiURL}/posts`, {
      method  : 'POST',
      headers : {
        Authorization  : state.user.user.authHeader
      },
      body    : data
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
      return dispatch(persistPost(post, getState(), getAPIURL(getState())));
    }
    return Promise.resolve();
  };
}

function watchFeed(feedURL, apiURL) {
  return dispatch => {
    // Watch feed
    socket = isBrowser ? io(feedURL) :
      io(feedURL, {
        jsonp      : false,
        transports : ['websocket']
      });
    socket
      .on('post-created', (data) => {
        if (!isBrowser) {
          data.image = `${apiURL}${data.image}`;
        }
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
    // Fetch posts count for infinite feed
    dispatch(requestPostsCount());
    return fetch(`${apiURL}/posts/count`)
      .then(checkStatus)
      .then(parseJSON)
      .then(count => dispatch(feedWatched(count.count)))
      .catch(() => dispatch(errorGetPosts()));
  };
}

function isNotWatched(state) {
  const post = state.post;
  if (!post) {
    return true;
  }
  if (post.isWatched) {
    return false;
  }
  return true;
}

export function watchFeedIfNeeded() {
  return (dispatch, getState) => {
    if (isNotWatched(getState())) {
      return dispatch(watchFeed(getFeedURL(getState()), getAPIURL(getState())));
    }
    return Promise.resolve();
  };
}


function isNotFetching(state) {
  const post = state.post;
  if (!post) {
    return true;
  }
  if (post.isFetching) {
    return false;
  }
  return true;
}

function doFetchPosts({ start, end, apiURL }) {
  return dispatch => {
    dispatch(requestFetchPosts());
    // Get initial POSTS
    return fetch(`${apiURL}/posts?start=${start}&end=${end}`)
      .then(checkStatus)
      .then(parseJSON)
      .then(posts => {
        if (!isBrowser) {
          return posts.map(post => {
            post.image = `${apiURL}${post.image}`;
            return post;
          });
        }
        return posts;
      })
      .then(posts => dispatch(postsFetched(posts)))
      .catch(() => dispatch(errorGetPosts()));
  };
}

export function fetchPosts() {
  return (dispatch, getState) => {
    if (isNotFetching(getState())) {
      const start = getState().post.offset || 0;
      const end   = start + POSTS_BATCH_SIZE;
      return dispatch(doFetchPosts({ start, end, apiURL : getAPIURL(getState()) }));
    }
    return Promise.resolve();
  };
}
