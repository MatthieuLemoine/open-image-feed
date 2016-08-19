import SignupForm from '../../components/users/SignupForm.jsx';
import { withRouter, browserHistory } from 'react-router';
import getSignupContainer from '../../../common/containers/users/SignupContainer.js';

export default getSignupContainer(SignupForm, withRouter, () => browserHistory.push('/'));
