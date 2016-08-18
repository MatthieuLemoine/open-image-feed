import SignupForm from '../../components/users/SignupForm.jsx';
import { connect } from 'react-redux';
import { signup } from '../../../common/actions/users/signup';
import { withRouter } from 'react-router';
import { isFetchingUser } from '../../../common/reducers/app/app';
import { browserHistory } from 'react-router';

export default withRouter(connect(
  state => ({
    isFetching : !!isFetchingUser(state)
  }),
  {
    signup : (user) => signup(user, () => browserHistory.push('/'))
  }
)(SignupForm));
