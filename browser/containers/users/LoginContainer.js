import LoginForm from '../../components/users/LoginForm.jsx';
import { withRouter, browserHistory } from 'react-router';
import getLoginContainer from '../../../common/containers/users/LoginContainer.js';

export default getLoginContainer(LoginForm, withRouter, () => browserHistory.push('/'));
