import deepFreeze from 'deep-freeze';
import userReducer, {
  getUser,
  isLogged,
  hasErrorLogin,
  hasErrorSignup,
  isFetching
} from '../users';
import { REQUEST_LOGIN, SUCCESS_LOGIN, ERROR_LOGIN } from '../../../actions/users/login';
import { REQUEST_SIGNUP, SUCCESS_SIGNUP, ERROR_SIGNUP } from '../../../actions/users/signup';

describe('User reducer', () => {
  const userState = {
    isFetching     : false,
    isLogged       : true,
    errorLogin  : false,
    errorSignup : false,
    user           : {
      authHeader : 'Basic DSKF?LKDF?LDSFK?SFqsldm',
      password   : 'password',
      username   : 'username'
    }
  };
  deepFreeze(userState);
  it('should return user', () => {
    expect(getUser(userState)).toEqual(userState.user);
  });
  it('should return isLogged', () => {
    expect(isLogged(userState)).toEqual(userState.isLogged);
  });
  it('should return isFetching', () => {
    expect(isFetching(userState)).toEqual(userState.isFetching);
  });
  it('should return hasErrorSignup', () => {
    expect(hasErrorSignup(userState)).toEqual(userState.errorSignup);
  });
  it('should return hasErrorLogin', () => {
    expect(hasErrorLogin(userState)).toEqual(userState.errorLogin);
  });

  it('should set fetching on login request', () => {
    expect(userReducer(userState, { type : REQUEST_LOGIN }).isFetching).toBe(true);
  });
  it('should reset error and fetching, set isLogged and save user credentials on login success',
    () => {
      const state = userReducer(userState,  { type : SUCCESS_LOGIN, user : userState.user });
      expect(state.isFetching).toBe(false);
      expect(state.errorLogin).toBe(false);
      expect(state.user).toEqual(userState.user);
      expect(state.isLogged).toBe(true);
    });
  it('should set error and reset fetching on login error', () => {
    const state = userReducer(userState,  { type : ERROR_LOGIN });
    expect(state.isFetching).toBe(false);
    expect(state.errorLogin).toBe(true);
  });
  it('should set fetching on signup request', () => {
    expect(userReducer(userState, { type : REQUEST_SIGNUP }).isFetching).toBe(true);
  });
  it('should reset error and fetching, set isLogged and save user credentials on signup success',
    () => {
      const state = userReducer(userState,  { type : SUCCESS_SIGNUP, user : userState.user });
      expect(state.isFetching).toBe(false);
      expect(state.errorSignup).toBe(false);
      expect(state.user).toEqual(userState.user);
      expect(state.isLogged).toBe(true);
    });
  it('should set error and reset fetching on signup error', () => {
    const state = userReducer(userState,  { type : ERROR_SIGNUP });
    expect(state.isFetching).toBe(false);
    expect(state.errorSignup).toBe(true);
  });
});
