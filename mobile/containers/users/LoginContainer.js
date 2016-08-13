import LoginForm from '../../components/users/LoginForm.js';
import { connect } from 'react-redux';
import { login } from '../../../common/actions/users/login.js';
import { isFetchingUser } from '../../../common/reducers/app/app.js';

export default connect(
  state => ({
    isFetching : !!isFetchingUser(state)
  }),
  {
    login
  }
)(LoginForm);
