import { APP_LOADED } from '../actions/root/root';
import rootReducer from '../../common/reducers/app/app';

function app(state = {
  loaded : false
}, action) {
  switch (action.type) {
    case APP_LOADED :
      return Object.assign({}, state, action.state, {
        root : {
          loaded : true
        }
      });
    default:
      return rootReducer(state, action);
  }
}

export default app;
