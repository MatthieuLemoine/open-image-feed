import { render } from 'react-dom';
import Application from './components/Application.jsx';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { createStore, applyMiddleware } from 'redux';
import { closePostDialog, openPostDialog, persistPostIfNeeded } from './push/actions.jsx';
import { fetchUsersIfNeeded } from './users/actions.jsx';
import rootReducer from './reducers.jsx';

// Require material light
require('../../../node_modules/material-design-lite/material.min.js');
require('../assets/css/material.min.css');
// Dialog polyfill
require('../../../node_modules/dialog-polyfill/dialog-polyfill.js');
require('../../../node_modules/dialog-polyfill/dialog-polyfill.css');
require('../assets/css/style.css');

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
    <Application
      close={(dialog) =>
        store.dispatch(closePostDialog(dialog))
      }
      open={(dialog) =>
        store.dispatch(openPostDialog(dialog))
      }
      addPost={(dialog, post) =>
        store.dispatch(persistPostIfNeeded(dialog, post))
      }
      posts={store.getState().post.posts}
    />,
    document.getElementById('react-app')
  );
}
