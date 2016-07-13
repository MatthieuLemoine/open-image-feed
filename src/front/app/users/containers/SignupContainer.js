import SignupForm from '../components/SignupForm.jsx';
import { connect } from 'react-redux';
import { signup } from '../actions/signup';
import { withRouter } from 'react-router';
import { isFetchingUser } from '../../app/reducers/reducers';

export default withRouter(connect(
  state => ({
    isFetching : !!isFetchingUser(state)
  }),
  {
    signup
  }
)(SignupForm));
