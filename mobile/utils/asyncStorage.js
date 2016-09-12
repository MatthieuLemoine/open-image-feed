import { AsyncStorage } from 'react-native';
export const initialState = {
  root : {},
  user : {},
  post : {}
};
// Load state from AsyncStorage
export function loadState() {
  return AsyncStorage
    .getItem('state')
    .then(serializedState => {
      if (!serializedState) {
        return initialState;
      }
      return JSON.parse(serializedState);
    })
    .catch(() => initialState);
}

// Save state to AsyncStorage
export function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    AsyncStorage.setItem('state', serializedState);
  } catch (err) {
    // Ignore write errors;
  }
}
