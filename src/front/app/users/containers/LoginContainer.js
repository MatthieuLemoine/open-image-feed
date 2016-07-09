import LoginForm from '../components/LoginForm.jsx';
import { connect } from 'react-redux';
import { login } from '../actions/login';

export default connect(
  null,
  dispatch => ({
    login : user => dispatch(login(user))
  })
)(LoginForm);
