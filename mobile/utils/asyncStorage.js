import { AsyncStorage } from 'react-native';
export const initialState = {
  root : {},
  user : {},
  post : {}
};
// Load state from AsyncStorage
export function loadState() {
  console.log('loadState');
  return AsyncStorage
    .getItem('state')
    .then(serializedState => {
      console.log('Load', serializedState);
      if (!serializedState) {
        return initialState;
      }
      return JSON.parse(serializedState);
    })
    .catch((err) => {
      console.log(err);
      return initialState;
    });
}

// Save state to AsyncStorage
export function saveState(state) {
  console.log('save');
  try {
    const serializedState = JSON.stringify(state);
    AsyncStorage.setItem('state', serializedState);
  } catch (err) {
    // Ignore write errors;
  }
}
