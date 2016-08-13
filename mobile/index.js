import React from 'react';
import { AppRegistry } from 'react-native';
import configureStore from './utils/configureStore.js';
import Root from './components/app/Root.js';

export function init() {
  const store = configureStore();

  const OpenImageFeed = () => <Root store={store} />;

  AppRegistry.registerComponent('OpenImageFeed', () => OpenImageFeed);
}
