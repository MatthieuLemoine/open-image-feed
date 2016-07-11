import { REQUEST_LOGIN, SUCCESS_LOGIN } from '../actions/login';
import { REQUEST_SIGNUP, SUCCESS_SIGNUP } from '../actions/signup';

function user(state = {
  isFetching : false,
  isLogged   : false
}, action) {
  switch (action.type) {
    case REQUEST_LOGIN:
      return Object.assign({}, state, {
        isFetching    : true
      });
    case SUCCESS_LOGIN:
      return Object.assign({}, state, {
        isFetching : false,
        user       : action.user,
        isLogged   : true
      });
    case REQUEST_SIGNUP:
      return Object.assign({}, state, {
        isFetching    : true
      });
    case SUCCESS_SIGNUP:
      return Object.assign({}, state, {
        isFetching : false,
        user       : action.user,
        isLogged   : true
      });
    default:
      return state;
  }
}

export default user;

export function isLogged(state) {
  return state.isLogged;
}
