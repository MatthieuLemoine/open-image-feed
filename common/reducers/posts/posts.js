import {
  REQUEST_ADD_POST, SUCCESS_ADD_POST, REQUEST_FETCH_POSTS, NEW_POST_FETCHED,
  FEED_WATCHED, ERROR_ADD_POST, ERROR_GET_POSTS, POST_UPDATED, POSTS_FETCHED,
  REQUEST_POSTS_COUNT
} from '../../actions/posts/posts';
import {
  REQUEST_LIKE, SUCCESS_LIKE, ERROR_LIKE
} from '../../actions/posts/likes';
import {
  REQUEST_COMMENT, SUCCESS_COMMENT, ERROR_COMMENT, TOGGLE_COMMENTS,
  TOGGLE_ADD_COMMENT
} from '../../actions/posts/comments';

export default function post(state = {
  isFetching      : false,
  isPersisting    : false,
  isFetchingCount : false,
  posts           : [],
  offset          : 0
}, action) {
  switch (action.type) {
    case REQUEST_ADD_POST:
      return Object.assign({}, state, {
        isPersisting : true
      });
    case SUCCESS_ADD_POST:
      return Object.assign({}, state, {
        isPersisting : false,
        errorAddPost : false
      });
    case ERROR_ADD_POST:
      return Object.assign({}, state, {
        isPersisting : false,
        errorAddPost : true
      });
    case REQUEST_FETCH_POSTS:
      return Object.assign({}, state, {
        isFetching : true
      });
    case NEW_POST_FETCHED:
      return Object.assign({}, state, {
        posts      : [action.post].concat(state.posts),
        offset     : state.offset + 1,
        totalPosts : state.totalPosts + 1
      });
    case POST_UPDATED:
      return Object.assign({}, state, {
        posts : updatePosts(action.post, state.posts)
      });
    case REQUEST_POSTS_COUNT:
      return Object.assign({}, state, {
        isFetchingCount : true
      });
    case FEED_WATCHED:
      return Object.assign({}, state, {
        isWatched       : true,
        totalPosts      : action.count,
        isFetchingCount : false
      });
    case POSTS_FETCHED:
      return Object.assign({}, state, {
        isFetching    : false,
        posts         : state.posts.concat(action.posts),
        offset        : state.offset + action.posts.length,
        errorGetPosts : false
      });
    case ERROR_GET_POSTS:
      return Object.assign({}, state, {
        isFetching    : false,
        errorGetPosts : true
      });
    case REQUEST_LIKE:
      return Object.assign({}, state, {
        isLiking : true
      });
    case SUCCESS_LIKE:
      return Object.assign({}, state, {
        isLiking  : false,
        errorLike : false
      });
    case ERROR_LIKE:
      return Object.assign({}, state, {
        isLiking : false,
        errorLike    : true
      });
    case REQUEST_COMMENT:
      return Object.assign({}, state, {
        isCommenting : true
      });
    case SUCCESS_COMMENT:
      return Object.assign({}, state, {
        isCommenting : false,
        errorComment : false,
        // Hide add comment form
        posts : toggleAddComment(action.postId, state.posts)
      });
    case ERROR_COMMENT:
      return Object.assign({}, state, {
        isCommenting : false,
        errorComment : true
      });
    case TOGGLE_COMMENTS:
      return Object.assign({}, state, {
        posts : toggleComments(action.postId, state.posts)
      });
    case TOGGLE_ADD_COMMENT:
      return Object.assign({}, state, {
        posts : toggleAddComment(action.postId, state.posts)
      });
    default:
      return state;
  }
}

function updatePosts(updatedPost, posts) {
  const { foundPost, index } = getPostWithIndex(updatedPost.id, posts);

  if (index !== -1) {
    return [
      ...posts.slice(0, index),
      Object.assign({}, foundPost, updatedPost),
      ...posts.slice(index + 1, posts.size)
    ];
  }
  return posts;
}

// Hide/Show comment form
function toggleAddComment(postId, posts) {
  const { foundPost, index } = getPostWithIndex(postId, posts);

  if (index !== -1) {
    return [
      ...posts.slice(0, index),
      Object.assign({}, foundPost, {
        displayAddComment : !foundPost.displayAddComment
      }),
      ...posts.slice(index + 1, posts.size)
    ];
  }
  return posts;
}

// Hide/Show comments list
function toggleComments(postId, posts) {
  const { foundPost, index } = getPostWithIndex(postId, posts);

  if (index !== -1) {
    return [
      ...posts.slice(0, index),
      Object.assign({}, foundPost, {
        displayComments : !foundPost.displayComments
      }),
      ...posts.slice(index + 1, posts.size)
    ];
  }
  return posts;
}

function getPostWithIndex(postId, posts) {
  return posts.reduce((prev, item, idx) => {
    if (postId === item.id) {
      prev.foundPost = item;
      prev.index     = idx;
    }
    return prev;
  }, {
    index     : -1,
    foundPost : undefined
  });
}

// Posts selector
export function getPosts(state) {
  return state.posts || [];
}

export function hasMorePosts(state) {
  if (!state.totalPosts) {
    return false;
  }
  return state.offset < state.totalPosts;
}

export function getOffset(state) {
  return state.offset || 0;
}

export function hasErrorAddPost(state) {
  return !!state.errorAddPost;
}

export function hasErrorGetPosts(state) {
  return !!state.errorGetPosts;
}

export function hasErrorLike(state) {
  return !!state.errorLike;
}

export function hasErrorComment(state) {
  return !!state.errorComment;
}

export function isFetchingPosts(state) {
  return !!state.isFetching;
}

export function isFetchingCount(state) {
  return !!state.isFetchingCount;
}

export function isPersistingPost(state) {
  return !!state.isPersisting;
}

export function isLiking(state) {
  return !!state.isLiking;
}

export function isCommenting(state) {
  return !!state.isCommenting;
}
