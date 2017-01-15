import fetch from 'isomorphic-fetch';
import { checkStatus } from '../../utils/http';
import { getAPIURL } from '../../utils/config';

export const REQUEST_LOGIN  = 'REQUEST_LOGIN';
export const SUCCESS_LOGIN  = 'SUCCESS_LOGIN';
export const ERROR_LOGIN    = 'ERROR_LOGIN';

function requestLogin() {
  return {
    type : REQUEST_LOGIN
  };
}

function successLogin(user) {
  return {
    type    : SUCCESS_LOGIN,
    message : 'You are now logged in',
    user
  };
}

function errorLogin() {
  return {
    type    : ERROR_LOGIN,
    message : 'Invalid credentials'
  };
}

function doLogin(user, onCompletion, apiURL) {
  return dispatch => {
    dispatch(requestLogin());
    return fetch(`${apiURL}/users/login`, {
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
    .then(() => dispatch(successLogin(user)))
    .then(onCompletion)
    .catch(() => dispatch(errorLogin()));
  };
}

// Avoid making several login requests
function shouldLogin(state) {
  const user = state.user;
  if (!user) {
    return true;
  }
  if (user.isFetching) {
    return false;
  }
  return true;
}

export function login(user, onCompletion) {
  return (dispatch, getState) => {
    if (shouldLogin(getState())) {
      return dispatch(doLogin(user, onCompletion, getAPIURL(getState())));
    }
    return Promise.resolve();
  };
}
