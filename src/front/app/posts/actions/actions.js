export const REQUEST_ADD_POST  = 'REQUEST_ADD_POST';
export const SUCCESS_ADD_POST  = 'SUCCESS_ADD_POST';
export const NEW_POST_FETCHED  = 'NEW_POST_FETCHED';
export const FEED_WATCHED      = 'FEED_WATCHED';
export const DIALOG_REGISTERED = 'DIALOG_REGISTERED';

const feed = horizon('posts');

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

function persistPost(post) {
  return dispatch => {
    dispatch(requestAddPost());
    feed.store(post);
    dispatch(successAddPost());
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
    if (shouldPersistPost(getState())) {
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
    if (shouldWatchFeed(getState())) {
      return dispatch(watchFeed());
    }
    return Promise.resolve();
  };
}
