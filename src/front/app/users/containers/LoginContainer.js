import LoginForm from '../components/LoginForm.jsx';
import { connect } from 'react-redux';
import { login } from '../actions/login';
import { withRouter } from 'react-router';

export default withRouter(connect(
  null,
  {
    login
  }
)(LoginForm));
