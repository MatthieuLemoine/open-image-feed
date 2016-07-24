import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../app/reducers/reducers';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';

export default function configureStore() {
  const persistedState = loadState();
  const middlewares = [
    thunkMiddleware // lets us dispatch() functions
  ];
  if (process.env.NODE_ENV !== 'production') {
    const loggerMiddleware = createLogger(); // neat middleware that logs actions
    middlewares.push(loggerMiddleware);
  }
  const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(...middlewares)
  );

  // Makes sure that saveState is not call more often than one in second
  store.subscribe(throttle(() => saveState({
    user : {
      isLogged   : store.getState().user.isLogged,
      user       : store.getState().user.user,
      isFetching : false,
    }
  }), 1000));

  return store;
}
