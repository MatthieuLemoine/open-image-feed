import deepFreeze from 'deep-freeze';
import postReducer, {
  getPosts,
  hasMorePosts,
  getOffset,
  hasErrorAddPost,
  hasErrorGetPosts,
  hasErrorLike,
  hasErrorComment,
  isFetchingPosts,
  isFetchingCount,
  isPersistingPost,
  isLiking,
  isCommenting
} from '../posts';
import {
  REQUEST_ADD_POST, SUCCESS_ADD_POST, REQUEST_FETCH_POSTS, NEW_POST_FETCHED,
  FEED_WATCHED, ERROR_ADD_POST, ERROR_GET_POSTS, POST_UPDATED, POSTS_FETCHED,
  REQUEST_POSTS_COUNT
} from '../../../actions/posts/posts';
import {
  REQUEST_LIKE, SUCCESS_LIKE, ERROR_LIKE
} from '../../../actions/posts/likes';
import {
  REQUEST_COMMENT, SUCCESS_COMMENT, ERROR_COMMENT, TOGGLE_COMMENTS,
  TOGGLE_ADD_COMMENT
} from '../../../actions/posts/comments';

describe('Post reducer', () => {
  const postState = {
    errorAddPost    : false,
    errorGetPosts   : false,
    errorLike       : true,
    errorComment    : true,
    isFetching      : false,
    isFetchingCount : false,
    isLiking        : true,
    isCommenting    : false,
    isPersisting    : false,
    isWatched       : true,
    offset          : 1,
    posts           : [
      {
        id : 1,
        title : 'Junk Title'
      }
    ],
    totalPosts      : 12
  };
  deepFreeze(postState);
  it('should return posts', () => {
    expect(getPosts(postState)).toEqual(postState.posts);
  });
  it('should return hasMorePosts', () => {
    expect(hasMorePosts(postState)).toEqual(postState.totalPosts > postState.offset);
  });
  it('should return offset', () => {
    expect(getOffset(postState)).toEqual(postState.offset);
  });
  it('should return hasErrorAddPost', () => {
    expect(hasErrorAddPost(postState)).toEqual(postState.errorAddPost);
  });
  it('should return hasErrorGetPosts', () => {
    expect(hasErrorGetPosts(postState)).toEqual(postState.errorGetPosts);
  });
  it('should return hasErrorLike', () => {
    expect(hasErrorLike(postState)).toEqual(postState.errorLike);
  });
  it('should return hasErrorComment', () => {
    expect(hasErrorComment(postState)).toEqual(postState.errorComment);
  });
  it('should return isFetchingPosts', () => {
    expect(isFetchingPosts(postState)).toEqual(postState.isFetching);
  });
  it('should return isFetchingCount', () => {
    expect(isFetchingCount(postState)).toEqual(postState.isFetchingCount);
  });
  it('should return isPersistingPost', () => {
    expect(isPersistingPost(postState)).toEqual(postState.isPersisting);
  });
  it('should return isLiking', () => {
    expect(isLiking(postState)).toEqual(postState.isLiking);
  });
  it('should return isCommenting', () => {
    expect(isCommenting(postState)).toEqual(postState.isCommenting);
  });

  it('should set persisting on new post request', () => {
    expect(postReducer(postState, { type : REQUEST_ADD_POST }).isPersisting).toBe(true);
  });
  it('should reset error and persisting on new post success', () => {
    const state = postReducer(postState,  { type : SUCCESS_ADD_POST });
    expect(state.isPersisting).toBe(false);
    expect(state.errorAddPost).toBe(false);
  });
  it('should set error and reset persisting on new post error', () => {
    const state = postReducer(postState,  { type : ERROR_ADD_POST });
    expect(state.isPersisting).toBe(false);
    expect(state.errorAddPost).toBe(true);
  });
  it('should set fetching on fetch posts request', () => {
    expect(postReducer(postState, { type : REQUEST_FETCH_POSTS }).isFetching).toBe(true);
  });
  it('should append new post and update offset/totalPosts when a new post is fetched', () => {
    const newPost = { id : 2, title : 'Another post' };
    const state = postReducer(postState,  { type : NEW_POST_FETCHED, post : newPost });
    expect(state.posts).toEqual([newPost].concat(postState.posts));
    expect(state.offset).toEqual(postState.offset + 1);
    expect(state.totalPosts).toEqual(postState.totalPosts + 1);
  });
  it('should update posts on a post update', () => {
    const updatedPost = { id : 1, title : 'Another title' };
    const state = postReducer(postState,  { type : POST_UPDATED, post : updatedPost });
    expect(state.posts).toEqual([updatedPost]);
  });
  it('should set fetchingCount on posts count request', () => {
    expect(postReducer(postState, { type : REQUEST_POSTS_COUNT }).isFetchingCount).toBe(true);
  });
  it('should set watched, totalPosts, reset fetchingCount on feed watched', () => {
    const state = postReducer(postState,  { type : FEED_WATCHED, count : 10 });
    expect(state.isWatched).toBe(true);
    expect(state.totalPosts).toEqual(10);
    expect(state.isFetchingCount).toBe(false);
  });
  it('should add new posts, update offset, reset isFetching and errorGetPosts on posts fetched',
    () => {
      const newPosts = [{ id : 2, title : 'Junk Title' }, { id : 3, title : 'Title title' }];
      const state = postReducer(postState,  { type : POSTS_FETCHED, posts : newPosts });
      expect(state.isFetching).toBe(false);
      expect(state.posts).toEqual(postState.posts.concat(newPosts));
      expect(state.offset).toEqual(postState.offset + newPosts.length);
      expect(state.errorGetPosts).toBe(false);
    });
  it('should reset isFetching and set errorGetPosts on error fetching posts', () => {
    const state = postReducer(postState,  { type : ERROR_GET_POSTS });
    expect(state.isFetching).toBe(false);
    expect(state.errorGetPosts).toBe(true);
  });
  it('should set isLiking on post like request', () => {
    expect(postReducer(postState, { type : REQUEST_LIKE }).isLiking).toBe(true);
  });
  it('should reset isLiking and errorLike on success liking post', () => {
    const state = postReducer(postState,  { type : SUCCESS_LIKE });
    expect(state.isLiking).toBe(false);
    expect(state.errorLike).toBe(false);
  });
  it('should reset isLiking and set errorLike on error liking post', () => {
    const state = postReducer(postState,  { type : ERROR_LIKE });
    expect(state.isLiking).toBe(false);
    expect(state.errorLike).toBe(true);
  });
  it('should set isCommenting on post comment request', () => {
    expect(postReducer(postState, { type : REQUEST_COMMENT }).isCommenting).toBe(true);
  });
  it('should reset isCommenting, errorComment and hide comment form on success comment post',
    () => {
      const postToggled = postState.posts[0];
      const state = postReducer(postState,  { type : SUCCESS_COMMENT, postId : postToggled.id });
      const expectedPost = Object.assign({}, postState.posts[0], {
        displayAddComment : !postToggled.displayAddComment
      });
      expect(state.isCommenting).toBe(false);
      expect(state.errorComment).toBe(false);
      expect(state.posts[0]).toEqual(expectedPost);
    });
  it('should reset isCommenting and set errorComment on error comment post', () => {
    const state = postReducer(postState,  { type : ERROR_COMMENT });
    expect(state.isCommenting).toBe(false);
    expect(state.errorComment).toBe(true);
  });
  it('should toggle comments view', () => {
    const postToggled = postState.posts[0];
    const state = postReducer(postState,  { type : TOGGLE_COMMENTS, postId :  postToggled.id  });
    const expectedPost = Object.assign({}, postState.posts[0], {
      displayComments : !postToggled.displayComments
    });
    expect(state.posts[0]).toEqual(expectedPost);
  });
  it('should toggle new comment form view', () => {
    const postToggled = postState.posts[0];
    const state = postReducer(postState,  { type : TOGGLE_ADD_COMMENT, postId :  postToggled.id  });
    const expectedPost = Object.assign({}, postState.posts[0], {
      displayAddComment : !postToggled.displayAddComment
    });
    expect(state.posts[0]).toEqual(expectedPost);
  });
});
