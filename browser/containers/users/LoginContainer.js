import { withRouter, browserHistory } from 'react-router';
import LoginForm from '../../components/users/LoginForm.jsx';
import getLoginContainer from '../../../common/containers/users/LoginContainer';

export default getLoginContainer(LoginForm, withRouter, () => browserHistory.push('/'));
