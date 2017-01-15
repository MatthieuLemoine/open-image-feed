import React from 'react';
import { AppRegistry } from 'react-native';
import configureStore from './utils/configureStore';
import Application from './components/app/Application';

export default function init() {
  const store = configureStore();
  const OpenImageFeed = () => <Application store={store} />;
  AppRegistry.registerComponent('OpenImageFeed', () => OpenImageFeed);
}
