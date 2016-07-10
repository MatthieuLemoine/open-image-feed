import { render } from 'react-dom';
import configureStore from './utils/configureStore';
import Root from './app/components/Root.jsx';
import Horizon from '@horizon/client';

// Horizon
const horizon = Horizon({ authType: 'token' });
horizon.connect();

// Require material light
require('../../../node_modules/material-design-lite/material.min.js');
// CSS
require('../assets/css/material.min.css');
require('../assets/css/style.css');

const store = configureStore();

// Render initial state
render(
  <Root store={store} />,
  document.getElementById('react-app')
);
