import fetch from 'isomorphic-fetch';

export const REQUEST_LOGIN  = 'REQUEST_LOGIN';
export const SUCCESS_LOGIN  = 'SUCCESS_LOGIN';

function requestLogin() {
  return {
    type : REQUEST_LOGIN
  };
}

function successLogin(user) {
  return {
    type       : SUCCESS_LOGIN,
    user
  };
}

// FIXME
function doLogin(user) {
  return dispatch => {
    dispatch(requestLogin());
    return fetch('/login', user)
      .then(response => response.json())
      .then(() => dispatch(successLogin(user)));
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
