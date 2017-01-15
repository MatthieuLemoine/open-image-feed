import fetch from 'isomorphic-fetch';
import { checkStatus } from '../../utils/http';
import { getAPIURL } from '../../utils/config';

export const REQUEST_LIKE = 'REQUEST_LIKE';
export const SUCCESS_LIKE = 'SUCCESS_LIKE';
export const ERROR_LIKE   = 'ERROR_LIKE';

function requestLike() {
  return {
    type  : REQUEST_LIKE
  };
}

function successLike() {
  return {
    type    : SUCCESS_LIKE
  };
}

function errorLike() {
  return {
    type    : ERROR_LIKE,
    message : 'Error while liking/unliking this post. Please try again.'
  };
}

function doLike(postId, state) {
  return dispatch => {
    dispatch(requestLike());
    return fetch(`${getAPIURL(state)}/likes/${postId}`, {
      method  : 'POST',
      headers : {
        Accept         : 'application/json',
        'Content-Type' : 'application/json',
        Authorization  : state.user.user.authHeader
      }
    })
      .then(checkStatus)
      .then(() => dispatch(successLike()))
      .catch(() => dispatch(errorLike()));
  };
}

export function like(postId) {
  return (dispatch, getState) => dispatch(doLike(postId, getState()));
}
