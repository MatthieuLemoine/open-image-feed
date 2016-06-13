import { combineReducers } from 'redux';
import { REQUEST_NOTIFICATION, SUCCESS_NOTIFICATION, ERROR_NOTIFICATION } from './actions.jsx';

function notification(state = {
  isFetching    : false
}, action) {
  switch (action.type) {
    case REQUEST_NOTIFICATION:
      return Object.assign({}, state, {
        isFetching    : true
      });
    case SUCCESS_NOTIFICATION:
      return Object.assign({}, state, {
        isFetching : false,
        success    : true,
        error      : undefined
      });
    case ERROR_NOTIFICATION:
      return Object.assign({}, state, {
        isFetching : false,
        success    : false,
        error      : action.error
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  notification
});

export default rootReducer;
