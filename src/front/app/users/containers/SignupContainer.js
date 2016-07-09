import SignupForm from '../components/SignupForm.jsx';
import { connect } from 'react-redux';
import { signup } from '../actions/signup';

export default connect(
  null,
  dispatch => ({
    signup : user => dispatch(signup(user))
  })
)(SignupForm);
