import { signup } from '../../../common/actions/users/signup';
import { isFetchingUser } from '../../../common/reducers/app/app';
import connect from '../connect.js';

export default (SignupForm, wrapper, redirect) =>
  connect(SignupForm, wrapper,
    state => ({
      isFetching : !!isFetchingUser(state)
    }),
    {
      signup : (user) => signup(user, redirect)
    }
);
