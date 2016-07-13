import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';

export const REQUEST_SIGNUP  = 'REQUEST_SIGNUP';
export const SUCCESS_SIGNUP  = 'SUCCESS_SIGNUP';

function requestSignup() {
  return {
    type : REQUEST_SIGNUP
  };
}

function successSignup(user) {
  return {
    type : SUCCESS_SIGNUP,
    user
  };
}

function doSignup(user) {
  return dispatch => {
    dispatch(requestSignup());
    return fetch('/users/signup', {
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
    .then(() => dispatch(successSignup(user)))
    .then(() => browserHistory.push('/'));
  };
}

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

export function signup(user) {
  return (dispatch, getState) => {
    if (shouldSignup(getState())) {
      return dispatch(doSignup(user));
    }
    return Promise.resolve();
  };
}
