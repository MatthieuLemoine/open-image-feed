import LoginForm from '../components/LoginForm.jsx';
import { connect } from 'react-redux';
import { login } from '../actions/login';
import { withRouter } from 'react-router';
import { isFetchingUser } from '../../app/reducers/reducers';

export default withRouter(connect(
  state => ({
    isFetching : !!isFetchingUser(state)
  }),
  {
    login
  }
)(LoginForm));
