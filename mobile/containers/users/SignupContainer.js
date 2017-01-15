import { Actions } from 'react-native-router-flux';
import SignupForm from '../../components/users/SignupForm';
import withNavigationBar from '../../components/app/NavigationBar';
import getSignupContainer from '../../../common/containers/users/SignupContainer';

export default getSignupContainer(SignupForm, withNavigationBar, () => Actions.feed());
