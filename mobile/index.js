import React from 'react';
import { AppRegistry } from 'react-native';
import configureStore from './utils/configureStore.js';
import Application from './components/app/Application.js';

export function init() {
  const store = configureStore();

  const OpenImageFeed = () => <Application store={store} />;

  AppRegistry.registerComponent('OpenImageFeed', () => OpenImageFeed);
}
