import fetch from 'isomorphic-fetch';
import { checkStatus } from '../../utils/http';

export const REQUEST_COMMENT    = 'REQUEST_COMMENT';
export const SUCCESS_COMMENT    = 'SUCCESS_COMMENT';
export const ERROR_COMMENT      = 'ERROR_COMMENT';
export const TOGGLE_COMMENTS    = 'TOGGLE_COMMENTS';
export const TOGGLE_ADD_COMMENT = 'TOGGLE_ADD_COMMENT';

function requestComment() {
  return {
    type  : REQUEST_COMMENT
  };
}

function successComment(postId) {
  return {
    type    : SUCCESS_COMMENT,
    message : 'Comment saved.',
    postId
  };
}

function errorComment() {
  return {
    type    : ERROR_COMMENT,
    message : 'Error while saving your comment. Please try again.'
  };
}

function requestToggleComment(postId) {
  return {
    type : TOGGLE_COMMENTS,
    postId
  };
}

function requestToggleAddComment(postId) {
  return {
    type : TOGGLE_ADD_COMMENT,
    postId
  };
}

function doComment(newComment, state) {
  return dispatch => {
    dispatch(requestComment());
    return fetch(`/comments/${newComment.postId}`, {
      method  : 'POST',
      headers : {
        Accept         : 'application/json',
        'Content-Type' : 'application/json',
        Authorization  : state.user.user.authHeader
      },
      body    : JSON.stringify(newComment)
    })
      .then(checkStatus)
      .then(() => dispatch(successComment(newComment.postId)))
      .catch(() => dispatch(errorComment()));
  };
}

export function comment(newComment) {
  return (dispatch, getState) => dispatch(doComment(newComment, getState()));
}

function doToggleComments(postId) {
  return dispatch => {
    dispatch(requestToggleComment(postId));
  };
}

export function toggleComments(postId) {
  return (dispatch) => dispatch(doToggleComments(postId));
}

function doToggleAddComment(postId) {
  return dispatch => {
    dispatch(requestToggleAddComment(postId));
  };
}

export function toggleAddComment(postId) {
  return (dispatch) => dispatch(doToggleAddComment(postId));
}
