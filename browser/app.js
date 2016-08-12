import { render } from 'react-dom';
import configureStore from '../common/utils/configureStore';
import Root from './components/app/Root.jsx';

// Require material light
require('../node_modules/material-design-lite/material.min.js');
require('./styles/material.min.css');
// Custom CSS
require('./styles/style.css');

const store = configureStore();

// Render initial state
render(
  <Root store={store} />,
  document.getElementById('react-app')
);
