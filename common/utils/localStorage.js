// Load state from localStorage
export function loadState() {
  try {
    const serializedState = localStorage.getItem('state');
    if (!serializedState) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

// Save state to localStorage
export function saveState(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // Ignore write errors;
  }
}
