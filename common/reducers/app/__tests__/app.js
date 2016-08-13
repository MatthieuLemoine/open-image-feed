jest.unmock('../app');
jest.unmock('../../../actions/users/login');
jest.unmock('../../../actions/users/signup');
jest.unmock('../../../actions/posts/posts');
jest.unmock('../../../actions/posts/likes');
jest.unmock('../../../actions/posts/comments');
jest.unmock('../../../reducers/posts/posts');
jest.unmock('../../../reducers/users/users');

import deepFreeze from 'deep-freeze';
import rootReducer, {
  message,
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
  isCommenting,
  getUser,
  isLogged,
  hasErrorLogin,
  hasErrorSignup,
  isFetchingUser
} from '../app';
import { ERROR_LOGIN, SUCCESS_LOGIN } from '../../../actions/users/login';
import { ERROR_SIGNUP, SUCCESS_SIGNUP } from '../../../actions/users/signup';
import { ERROR_ADD_POST, ERROR_GET_POSTS, SUCCESS_ADD_POST } from '../../../actions/posts/posts';
import { ERROR_LIKE } from '../../../actions/posts/likes';
import { ERROR_COMMENT, SUCCESS_COMMENT } from '../../../actions/posts/comments';

describe('Root reducer', () => {
  [
    ERROR_LOGIN,
    SUCCESS_LOGIN,
    ERROR_SIGNUP,
    SUCCESS_SIGNUP,
    ERROR_ADD_POST,
    ERROR_GET_POSTS,
    SUCCESS_ADD_POST,
    ERROR_LIKE,
    ERROR_COMMENT,
    SUCCESS_COMMENT
  ].forEach((type) => {
    it(`should update state with message on ${type} and be pure`, () => {
      const state = {
        root : {
          message : `MESSAGE_${type}`
        }
      };
      const action = {
        type,
        message : `ERROR_${type}`
      };
      // Root reducer should be pure
      deepFreeze(state);
      deepFreeze(action);
      const newState = rootReducer(state, action);
      expect(newState.root.message).toEqual(action.message);
    });
  });

  const rootState = {
    root : {
      message : 'junk'
    },
    post : {
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
    },
    user : {
      isFetching : false,
      isLogged   : true,
      user       : {
        authHeader : 'Basic DSKF?LKDF?LDSFK?SFqsldm',
        password   : 'password',
        username   : 'username'
      }
    }
  };
  deepFreeze(rootState);

  it('should return message', () => {
    expect(message(rootState)).toEqual(rootState.root.message);
  });
  it('should return posts', () => {
    expect(getPosts(rootState)).toEqual(rootState.post.posts);
  });
  it('should return hasMorePosts', () => {
    expect(hasMorePosts(rootState)).toEqual(rootState.post.totalPosts > rootState.post.offset);
  });
  it('should return offset', () => {
    expect(getOffset(rootState)).toEqual(rootState.post.offset);
  });
  it('should return hasErrorAddPost', () => {
    expect(hasErrorAddPost(rootState)).toEqual(rootState.post.errorAddPost);
  });
  it('should return hasErrorGetPosts', () => {
    expect(hasErrorGetPosts(rootState)).toEqual(rootState.post.errorGetPosts);
  });
  it('should return hasErrorLike', () => {
    expect(hasErrorLike(rootState)).toEqual(rootState.post.errorLike);
  });
  it('should return hasErrorComment', () => {
    expect(hasErrorComment(rootState)).toEqual(rootState.post.errorComment);
  });
  it('should return isFetchingPosts', () => {
    expect(isFetchingPosts(rootState)).toEqual(rootState.post.isFetching);
  });
  it('should return isFetchingCount', () => {
    expect(isFetchingCount(rootState)).toEqual(rootState.post.isFetchingCount);
  });
  it('should return isPersistingPost', () => {
    expect(isPersistingPost(rootState)).toEqual(rootState.post.isPersisting);
  });
  it('should return isLiking', () => {
    expect(isLiking(rootState)).toEqual(rootState.post.isLiking);
  });
  it('should return isCommenting', () => {
    expect(isCommenting(rootState)).toEqual(rootState.post.isCommenting);
  });
  it('should return user info', () => {
    expect(getUser(rootState)).toEqual(rootState.user.user);
  });
  it('should return isLogged', () => {
    expect(isLogged(rootState)).toEqual(rootState.user.isLogged);
  });
  it('should return hasErrorLogin', () => {
    expect(hasErrorLogin(rootState)).toEqual(false);
  });
  it('should return hasErrorSignup', () => {
    expect(hasErrorSignup(rootState)).toEqual(false);
  });
  it('should return isFetchingUser', () => {
    expect(isFetchingUser(rootState)).toEqual(rootState.user.isFetching);
  });
});
