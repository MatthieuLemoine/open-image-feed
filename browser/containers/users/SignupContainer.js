import SignupForm from '../../components/users/SignupForm.jsx';
import { connect } from 'react-redux';
import { signup } from '../../../common/actions/users/signup';
import { withRouter } from 'react-router';
import { isFetchingUser } from '../../../common/reducers/app/app';

export default withRouter(connect(
  state => ({
    isFetching : !!isFetchingUser(state)
  }),
  {
    signup
  }
)(SignupForm));
