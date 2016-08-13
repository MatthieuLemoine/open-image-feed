import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../../common/reducers/app/app';

export default function configureStore() {
  const middlewares = [
    thunkMiddleware // lets us dispatch() functions
  ];
  // Log actions and states in development mode
  if (process.env.NODE_ENV !== 'production') {
    const loggerMiddleware = createLogger(); // neat middleware that logs actions
    middlewares.push(loggerMiddleware);
  }

  const store = createStore(
    rootReducer,
    {},
    applyMiddleware(...middlewares)
  );

  return store;
}
