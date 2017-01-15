import { withRouter, browserHistory } from 'react-router';
import SignupForm from '../../components/users/SignupForm.jsx';
import getSignupContainer from '../../../common/containers/users/SignupContainer';

export default getSignupContainer(SignupForm, withRouter, () => browserHistory.push('/'));
