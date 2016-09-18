import { APP_LOADED, CONNECT_TO_FEED } from '../actions/root/root';
import rootReducer from '../../common/reducers/app/app';

function app(state = {
  root : {
    loaded : false,
    feedURL : ''
  }
}, action) {
  switch (action.type) {
    case APP_LOADED :
      return Object.assign({}, state, action.state, {
        root : {
          loaded : true,
          feedURL : action.state.root.feedURL
        }
      });
    case CONNECT_TO_FEED :
      return Object.assign({}, state, {
        root : {
          feedURL : action.url
        },
        user : {
          user : {}
        }
      });
    default:
      return rootReducer(state, action);
  }
}

export default app;

export function isAppLoaded(state) {
  return state.root.loaded || false;
}

export function getFeedURL(state) {
  return state.root.feedURL || '';
}

export function hasFeedURL(state) {
  return !!state.root.feedURL;
}
