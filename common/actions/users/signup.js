import fetch from 'isomorphic-fetch';
import { checkStatus } from '../../utils/http';
import { getAPIURL } from '../../utils/config';

export const REQUEST_SIGNUP  = 'REQUEST_SIGNUP';
export const SUCCESS_SIGNUP  = 'SUCCESS_SIGNUP';
export const ERROR_SIGNUP    = 'ERROR_SIGNUP';

function requestSignup() {
  return {
    type : REQUEST_SIGNUP
  };
}

function successSignup(user) {
  return {
    type    : SUCCESS_SIGNUP,
    message : 'Account created',
    user
  };
}

function errorSignup() {
  return {
    type    : ERROR_SIGNUP,
    message : 'Username already taken'
  };
}

function doSignup(user, onCompletion, apiURL) {
  return dispatch => {
    dispatch(requestSignup());
    return fetch(`${apiURL}/users/signup`, {
      method  : 'POST',
      headers : {
        Accept         : 'application/json',
        'Content-Type' : 'application/json'
      },
      body    : JSON.stringify(user)
    })
    .then(checkStatus)
    .then(() => {
      // Generate authHeader / It will be save in state & localStorage
      user.authHeader = `Basic ${btoa(`${user.username}:${user.password}`)}`;
    })
    .then(() => dispatch(successSignup(user)))
    .then(onCompletion)
    .catch(() => dispatch(errorSignup()));
  };
}

// Avoid making several signup requests
function shouldSignup(state) {
  const user = state.user;
  if (!user) {
    return true;
  }
  if (user.isFetching) {
    return false;
  }
  return true;
}

export function signup(user, onCompletion) {
  return (dispatch, getState) => {
    if (shouldSignup(getState())) {
      return dispatch(doSignup(user, onCompletion, getAPIURL(getState())));
    }
    return Promise.resolve();
  };
}
