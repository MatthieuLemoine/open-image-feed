export const isBrowser = window && window.location && window.location.protocol
  && window.location.href.indexOf('debugger') === -1;

if (!isBrowser) {
  window.navigator.userAgent = 'react-native';
}

const  DEFAULT_SOCKET_URL = isBrowser ?
  `${window.location.protocol}//${window.location.host}` : '';

export function getAPIURL(state) {
  return state.root && state.root.feedURL ? state.root.feedURL : '';
}

export function getFeedURL(state) {
  return state.root && state.root.feedURL ? state.root.feedURL : DEFAULT_SOCKET_URL;
}
