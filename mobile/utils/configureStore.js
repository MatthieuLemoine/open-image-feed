import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import throttle from 'lodash/throttle';
import rootReducer from '../reducers/app';
import { initialState, saveState } from './asyncStorage';

let store;

export default function configureStore() {
  const middlewares = [
    thunkMiddleware // lets us dispatch() functions
  ];
  // Log actions and states in development mode
  if (process.env.NODE_ENV !== 'production') {
    const loggerMiddleware = createLogger(); // neat middleware that logs actions
    middlewares.push(loggerMiddleware);
  }

  store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );
  return store;
}

export function enableAutoStateSaving() {
  store.subscribe(throttle(() => saveState({
    // Save user info
    root : {
      loaded : false,
      feedURL : store.getState().root.feedURL
    },
    user : {
      isLogged   : store.getState().user.isLogged,
      user       : store.getState().user.user,
      isFetching : false
    }
  }), 10000));
}
