import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

export const REQUEST_LOGIN  = 'REQUEST_LOGIN';
export const SUCCESS_LOGIN  = 'SUCCESS_LOGIN';

function requestLogin() {
  return {
    type : REQUEST_LOGIN
  };
}

function successLogin(user) {
  return {
    type : SUCCESS_LOGIN,
    user
  };
}

// FIXME
function doLogin(user) {
  return dispatch => {
    dispatch(requestLogin());
    return fetch('/users/login', {
      method  : 'POST',
      headers : {
        Accept         : 'application/json',
        'Content-Type' : 'application/json'
      },
      body    : JSON.stringify(user)
    })
    .then(() => {
      user.authHeader = `Basic ${btoa(`${user.username}:${user.password}`)}`;
    })
    .then(() => dispatch(successLogin(user)))
    .then(() => browserHistory.push('/'));
  };
}

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

export function login(user) {
  return (dispatch, getState) => {
    if (shouldLogin(getState())) {
      return dispatch(doLogin(user));
    }
    return Promise.resolve();
  };
}
