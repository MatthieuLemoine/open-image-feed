import fetch from 'isomorphic-fetch';

export const REQUEST_SIGNUP = 'REQUEST_SIGNUP';
export const SUCCESS_SIGNUP = 'SUCCESS_SIGNUP';

function requestSignup() {
  return {
    type : REQUEST_SIGNUP
  };
}

function successSignup(user) {
  return {
    type       : SUCCESS_SIGNUP,
    user
  };
}

// FIXME
function doSignup(user) {
  return dispatch => {
    dispatch(requestSignup());
    return fetch('/signup', user)
      .then(response => response.json())
      .then(() => dispatch(successSignup(user)));
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

export function login(user) {
  return (dispatch, getState) => {
    if (shouldSignup(getState())) {
      return dispatch(doSignup(user));
    }
    return Promise.resolve();
  };
}
