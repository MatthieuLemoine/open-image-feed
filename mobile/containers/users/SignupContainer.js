import SignupForm from '../../components/users/SignupForm.js';
import { connect } from 'react-redux';
import { signup } from '../../../common/actions/users/signup.js';
import { isFetchingUser } from '../../../common/reducers/app/app.js';
import withNavigationBar from '../../components/app/NavigationBar.js';
import { Actions } from 'react-native-router-flux';

export default withNavigationBar(connect(
  state => ({
    isFetching : !!isFetchingUser(state)
  }),
  {
    signup : (user) => signup(user, () => Actions.feed())
  }
)(SignupForm));
