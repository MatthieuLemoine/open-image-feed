import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../app/reducers/reducers';
import { loadState, saveState } from './localStorage';
import throttle from 'lodash/throttle';

export default function configureStore() {
  const loggerMiddleware = createLogger();
  const persistedState = loadState();
  const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      loggerMiddleware // neat middleware that logs actions
    )
  );

  // Makes sure that saveState is not call more often than one in second
  store.subscribe(throttle(() => saveState({
    post : {
      posts        : store.getState().post.posts,
      isFetching   : false,
      isPersisting : false
    },
    user : {
      isLogged   : store.getState().user.isLogged,
      user       : store.getState().user.user,
      isFetching : false,
    }
  }), 1000));

  return store;
}
