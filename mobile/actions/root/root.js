import { loadState } from '../../utils/asyncStorage';
import { enableAutoStateSaving } from '../../utils/configureStore';

export const APP_LOADED = 'APP_LOADED';
export const CONNECT_TO_FEED = 'CONNECT_TO_FEED';

function stateLoaded(state) {
  return {
    type  : APP_LOADED,
    state
  };
}

function feedConnected(feed) {
  return {
    type : CONNECT_TO_FEED,
    url : feed.feedUrl
  };
}

export function loadInitialState() {
  return (dispatch) => loadState()
    .then(state => dispatch(stateLoaded(state)))
    .then(enableAutoStateSaving);
}

export function connectToFeed(feed) {
  return (dispatch) => dispatch(feedConnected(feed));
}
