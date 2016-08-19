import LoginForm from '../../components/users/LoginForm.js';
import { Actions } from 'react-native-router-flux';
import withNavigationBar from '../../components/app/NavigationBar.js';
import getLoginContainer from '../../../common/containers/users/LoginContainer.js';

export default getLoginContainer(LoginForm, withNavigationBar, () => Actions.feed());
