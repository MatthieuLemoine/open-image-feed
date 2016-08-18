import LoginForm from '../../components/users/LoginForm.jsx';
import { connect } from 'react-redux';
import { login } from '../../../common/actions/users/login';
import { withRouter } from 'react-router';
import { isFetchingUser } from '../../../common/reducers/app/app';
import { browserHistory } from 'react-router';

export default withRouter(connect(
  state => ({
    isFetching : !!isFetchingUser(state)
  }),
  {
    login : (user) => login(user, () => browserHistory.push('/'))
  }
)(LoginForm));
