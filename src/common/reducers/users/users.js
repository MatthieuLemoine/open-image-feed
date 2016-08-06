import { REQUEST_LOGIN, SUCCESS_LOGIN, ERROR_LOGIN } from '../../actions/users/login';
import { REQUEST_SIGNUP, SUCCESS_SIGNUP, ERROR_SIGNUP } from '../../actions/users/signup';

function user(state = {
  isFetching : false,
  isLogged   : false,
  user       : {}
}, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return Object.assign({}, state, {
        isFetching    : true
      });
    case SUCCESS_LOGIN:
      return Object.assign({}, state, {
        isFetching : false,
        errorLogin : false,
        user       : action.user,
        isLogged   : true
      });
    case ERROR_LOGIN:
      return Object.assign({}, state, {
        isFetching    : false,
        errorLogin    : true
      });
    case REQUEST_SIGNUP:
      return Object.assign({}, state, {
        isFetching    : true
      });
    case SUCCESS_SIGNUP:
      return Object.assign({}, state, {
        isFetching  : false,
        errorSignup : false,
        user        : action.user,
        isLogged    : true
      });
    case ERROR_SIGNUP:
      return Object.assign({}, state, {
        isFetching  : false,
        errorSignup : true
      });
    default:
      return state;
  }
}

export default user;

export function getUser(state) {
  return state.user;
}

export function isLogged(state) {
  return state.isLogged;
}

export function hasErrorLogin(state) {
  return state.errorLogin;
}

export function hasErrorSignup(state) {
  return state.errorSignup;
}

export function isFetching(state) {
  return state.isFetching;
}
