import { Actions } from 'react-native-router-flux';
import LoginForm from '../../components/users/LoginForm';
import withNavigationBar from '../../components/app/NavigationBar';
import getLoginContainer from '../../../common/containers/users/LoginContainer';

export default getLoginContainer(LoginForm, withNavigationBar, () => Actions.feed());
