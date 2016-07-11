import SignupForm from '../components/SignupForm.jsx';
import { connect } from 'react-redux';
import { signup } from '../actions/signup';
import { withRouter } from 'react-router';

export default withRouter(connect(
  null,
  {
    signup
  }
)(SignupForm));
