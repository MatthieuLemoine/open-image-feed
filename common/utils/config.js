import config from './config.json';

export const isBrowser = window && window.location && window.location.protocol
  && window.location.href.indexOf('debugger') === -1;

if (!isBrowser) {
  window.navigator.userAgent = 'react-native';
}

export const  API_URL = isBrowser ? '' : config.API_URL;
export const  SOCKET_URL = isBrowser ?
  `${window.location.protocol}//${window.location.host}` : config.SOCKET_URL;
