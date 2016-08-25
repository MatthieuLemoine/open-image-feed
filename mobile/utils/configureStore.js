import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { root } from '../../common/reducers/app/app';
import post from '../../common/reducers/posts/posts';
import user from '../../common/reducers/users/users';
import * as asyncInitialState from 'redux-async-initial-state';
import { loadState, saveState, initialState } from './asyncStorage';
import throttle from 'lodash/throttle';
import { AsyncStorage } from 'react-native';

export default function configureStore() {
  const reducer = asyncInitialState.outerReducer(combineReducers({
    root,
    post,
    user,
    asyncInitialState : asyncInitialState.innerReducer
  }));
  const middlewares = [
    asyncInitialState.middleware(loadState),
    thunkMiddleware // lets us dispatch() functions
  ];
  // Log actions and states in development mode
  if (process.env.NODE_ENV !== 'production') {
    const loggerMiddleware = createLogger(); // neat middleware that logs actions
    middlewares.push(loggerMiddleware);
  }

  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middlewares)
  );

  // Makes sure that saveState is not call more often than one in second
  store.subscribe(throttle(() => saveState({
    // Save user info
    user : {
      isLogged   : store.getState().user.isLogged,
      user       : store.getState().user.user,
      isFetching : false
    }
  }), 1000));


  AsyncStorage.getItem('state', (err, st) => console.log(err, st))
    .then(state => console.log(state));

  return store;
}
