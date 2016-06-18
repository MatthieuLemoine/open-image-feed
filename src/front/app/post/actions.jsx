export const OPEN_POST_DIALOG  = 'OPEN_POST_DIALOG';
export const CLOSE_POST_DIALOG = 'CLOSE_POST_DIALOG';
export const REQUEST_ADD_POST  = 'REQUEST_ADD_POST';
export const SUCCESS_ADD_POST  = 'SUCCESS_ADD_POST';
export const NEW_POST_FETCHED  = 'NEW_POST_FETCHED';

const feed = horizon('posts');

function openPostDialog(dialog) {
  dialog.open();
  return {
    type : OPEN_POST_DIALOG
  };
}

function closePostDialog(dialog) {
  dialog.close();
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

function persistPost(dialog, post) {
  return dispatch => {
    dispatch(requestAddPost());
    feed.store(post);
    dispatch(successAddPost());
    dispatch(closePostDialog(dialog));
  };
}

function shouldPersistPost(state) {
  const post = state.post;
  if (!post) {
    return true;
  }
  if (post.isFetching) {
    return false;
  }
  return true;
}

export function persistPostIfNeeded(post) {
  return (dispatch, getState) => {
    if (shouldPersistPost(getState())) {
      return dispatch(persistPost(post));
    }
    return Promise.resolve();
  };
}
