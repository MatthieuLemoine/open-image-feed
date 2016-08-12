import React from 'react';
import { AppRegistry } from 'react-native';
import configureStore from '../common/utils/configureStore';
import Root from './components/app/Root.jsx';

export function init() {
  const store = configureStore();

  const OpenImageFeed = () => <Root store={store} />;

  AppRegistry.registerComponent('OpenImageFeed', () => OpenImageFeed);
}
