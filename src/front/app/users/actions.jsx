import fetch from 'isomorphic-fetch';

export const REQUEST_USERS    = 'REQUEST_USERS';
export const RECEIVE_USERS    = 'RECEIVE_USERS';
export const INVALIDATE_USERS = 'INVALIDATE_USERS';

export function invalidateUsers() {
  return {
    type : INVALIDATE_USERS
  };
}

function requestUsers() {
  return {
    type : REQUEST_USERS
  };
}

function receiveUsers(json) {
  return {
    type       : RECEIVE_USERS,
    users      : json,
    receivedAt : Date.now()
  };
}

function fetchUsers() {
  return dispatch => {
    dispatch(requestUsers());
    return fetch('/users')
      .then(response => response.json())
      .then(response =>
        [{
          _id       : '_all',
          email     : '_all',
          firstname : '_all',
          lastname  : '_all'
        }].concat(response)
      )
      .then(json => dispatch(receiveUsers(json)));
  };
}

function shouldFetchUsers(state) {
  const users = state.users;
  if (!users) {
    return true;
  }
  if (users.isFetching) {
    return false;
  }
  return users.didInvalidate;
}

export function fetchUsersIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchUsers(getState())) {
      return dispatch(fetchUsers());
    }
    return Promise.resolve();
  };
}
