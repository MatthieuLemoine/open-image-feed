import { login } from '../../../common/actions/users/login';
import { isFetchingUser } from '../../../common/reducers/app/app';
import connect from '../connect';

export default (LoginForm, wrapper, redirect) =>
  connect(LoginForm, wrapper,
    state => ({
      isFetching : !!isFetchingUser(state)
    }),
    {
      login : (user) => login(user, redirect)
    }
);
