import SignupForm from '../../components/users/SignupForm.js';
import { connect } from 'react-redux';
import { signup } from '../../../common/actions/users/signup.js';
import { isFetchingUser } from '../../../common/reducers/app/app.js';
import withNavigationBar from '../../components/app/NavigationBar.js';

export default withNavigationBar(connect(
  state => ({
    isFetching : !!isFetchingUser(state)
  }),
  {
    signup
  }
)(SignupForm));
