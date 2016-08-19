import SignupForm from '../../components/users/SignupForm.js';
import { Actions } from 'react-native-router-flux';
import withNavigationBar from '../../components/app/NavigationBar.js';
import getSignupContainer from '../../../common/containers/users/SignupContainer.js';

export default getSignupContainer(SignupForm, withNavigationBar, () => Actions.feed());
