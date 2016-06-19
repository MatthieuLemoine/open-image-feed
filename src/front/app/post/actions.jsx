import dialogPolyfill from 'dialog-polyfill';

export const OPEN_POST_DIALOG  = 'OPEN_POST_DIALOG';
export const CLOSE_POST_DIALOG = 'CLOSE_POST_DIALOG';
export const REQUEST_ADD_POST  = 'REQUEST_ADD_POST';
export const SUCCESS_ADD_POST  = 'SUCCESS_ADD_POST';
export const NEW_POST_FETCHED  = 'NEW_POST_FETCHED';
export const FEED_WATCHED      = 'FEED_WATCHED';
export const DIALOG_REGISTERED = 'DIALOG_REGISTERED';

const feed = horizon('posts');

function openPostDialog() {
  return {
    type : OPEN_POST_DIALOG
  };
}

function closePostDialog() {
  return {
    type    : CLOSE_POST_DIALOG
  };
}

function requestAddPost() {
  return {
    type  : REQUEST_ADD_POST
  };
}

function successAddPost() {
  return {
    type  : SUCCESS_ADD_POST
  };
}

function newPostFetched(posts) {
  return {
    type  : NEW_POST_FETCHED,
    posts
  };
}

function feedWatched() {
  return {
    type : FEED_WATCHED
  };
}

function dialogRegistered(dialog) {
  return {
    type : DIALOG_REGISTERED,
    dialog
  };
}

function persistPost(post) {
  return dispatch => {
    dispatch(requestAddPost());
    feed.store(post);
    dispatch(successAddPost());
    dispatch(closePostDialog());
  };
}

function shouldPersistPost(state) {
  const post = state.post;
  if (!post) {
    return true;
  }
  if (post.isPersisting) {
    return false;
  }
  return true;
}

export function persistPostIfNeeded(post) {
  return (dispatch, getState) => {
    if (shouldPersistPost(getScopeState(getState()))) {
      return dispatch(persistPost(post));
    }
    return Promise.resolve();
  };
}

function watchFeed() {
  return dispatch => {
    feed
      .watch()
      .subscribe((docs) => dispatch(newPostFetched(docs)));
    dispatch(feedWatched());
  };
}

function shouldWatchFeed(state) {
  const post = state.post;
  if (!post) {
    return true;
  }
  if (post.isFetching) {
    return false;
  }
  return true;
}

export function watchFeedIfNeeded() {
  return (dispatch, getState) => {
    if (shouldWatchFeed(getScopeState(getState()))) {
      return dispatch(watchFeed());
    }
    return Promise.resolve();
  };
}


function registerDialog(dialog) {
  console.log(dialog);
  dialogPolyfill.registerDialog(dialog);
  return dispatch => dispatch(dialogRegistered(dialog));
}

function shouldRegisterDialog(state) {
  const dialog = state.dialog;
  if (!dialog || dialog.isRegistered) {
    return false;
  }
  return true;
}

export function registerDialogIfNeeded(dialog) {
  return (dispatch, getState) => {
    if (shouldRegisterDialog(getScopeState(getState()))) {
      return dispatch(registerDialog(dialog));
    }
    return Promise.resolve();
  };
}

function openDialog(dialog) {
  dialog.open();
  return dispatch => dispatch(openPostDialog());
}

function shouldOpenDialog(state) {
  const dialog = state.dialog;
  if (!dialog || !dialog.isRegistered || dialog.isOpened) {
    return false;
  }
  return true;
}

export function openDialogIfNeeded() {
  return (dispatch, getState) => {
    if (shouldOpenDialog(getScopeState(getState()))) {
      return dispatch(openDialog(getScopeState(getState()).dialog.ref));
    }
    return Promise.resolve();
  };
}

function closeDialog(dialog) {
  dialog.close();
  return dispatch => dispatch(closePostDialog());
}

function shouldCloseDialog(state) {
  const dialog = state.dialog;
  if (!dialog || !dialog.isRegistered || !dialog.isOpened) {
    return false;
  }
  return true;
}

export function closeDialogIfNeeded() {
  return (dispatch, getState) => {
    if (shouldCloseDialog(getScopeState(getState()))) {
      return dispatch(closeDialog(getScopeState(getState()).dialog.ref));
    }
    return Promise.resolve();
  };
}

function getScopeState(state) {
  return state.postReducer;
}
