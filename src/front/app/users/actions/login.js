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
function doLogin(provider) {
  return dispatch => {
    dispatch(requestLogin());
    if (!horizon.hasAuthToken()) {
      horizon.authEndpoint(provider).subscribe((endpoint) => {
        window.location.pathname = endpoint;
      });
    } else {
      return Promise.resolve();
    }
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

export function login(provider) {
  return (dispatch, getState) => {
    if (shouldLogin(getState())) {
      return dispatch(doLogin(provider));
    }
    return Promise.resolve();
  };
}
