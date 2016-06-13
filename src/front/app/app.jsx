import { render } from 'react-dom';
import Application from './components/Application.jsx';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { sendNotificationIfNeeded } from './push/actions.jsx';
import { fetchUsersIfNeeded } from './users/actions.jsx';
import rootReducer from './reducers.jsx';

// Require material light
require('../assets/css/material.min.css');

const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
);

store.subscribe(renderApplication);
// Render initial state
renderApplication();
store.dispatch(fetchUsersIfNeeded());

// Root node Application rendering
function renderApplication() {
  render(
    // <Application
    //   state={store.getState()}
    //   onSendNotification={(sendNotification) =>
    //     store.dispatch(sendNotificationIfNeeded(sendNotification))
    //   }
    // />
    <div></div>,
    document.getElementById('react-app')
  );
}
