import LoginForm from '../../components/users/LoginForm.js';
import { connect } from 'react-redux';
import { login } from '../../../common/actions/users/login.js';
import { isFetchingUser } from '../../../common/reducers/app/app.js';
import withNavigationBar from '../../components/app/NavigationBar.js';
import { Actions } from 'react-native-router-flux';

export default withNavigationBar(connect(
  state => ({
    isFetching : !!isFetchingUser(state)
  }),
  {
    login : (user) => login(user, () => Actions.feed())
  }
)(LoginForm));
