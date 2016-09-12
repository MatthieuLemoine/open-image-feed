import { loadState } from '../../utils/asyncStorage';

export const APP_LOADED = 'APP_LOADED';

export function stateLoaded(state) {
  return {
    type  : APP_LOADED,
    state
  };
}

export function loadInitialState() {
  return (dispatch) => loadState().then(state => dispatch(stateLoaded(state)));
}
